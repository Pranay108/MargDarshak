"""
BIS Sathi — FastAPI Backend Server
Serves as the API gateway between the React frontend and the Gemini/Mistral LLM.
Keeps API keys server-side for security.
"""

import os
import json
from pathlib import Path
from typing import Optional
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

# Load env from the project root .env file
load_dotenv(dotenv_path=os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env'))
load_dotenv()  # Also load local .env if present

app = FastAPI(
    title="BIS Sathi API",
    description="Bureau of Indian Standards Intelligence Backend",
    version="2.0.0"
)

# CORS - Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── System Prompt ───────────────────────────────────────────────
SYSTEM_PROMPT = """You are AI SATHI, the official virtual assistant for the Bureau of Indian Standards (BIS), Ministry of Consumer Affairs, Food & Public Distribution, Government of India.

Your mandate is to provide precise, authoritative, evidence-backed, and reliable assistance on:
1. Indian Standards (IS Codes) and mandatory Quality Control Orders (QCOs)
2. Product Certification Schemes (ISI Mark - Scheme I, CRS - Scheme II, FMCS - Foreign Manufacturers, ECO Mark)
3. Gold and Silver Hallmarking, 6-digit HUID (Hallmark Unique Identification) validation
4. BIS Central & Regional Laboratories, LIMS, and testing parameters
5. GFR Rule 144(i) compliant tender specification drafting for public procurement
6. Citizen consumer protection, BIS Care verification of CM/L and R-numbers

Tone & Style:
- Professional, official, polite, objective, structured.
- Structure responses with clean headings, markdown lists, and parameter tables where helpful.
- Cite exact standard numbers (e.g., IS 10500:2012 for Drinking Water, IS 456:2000 for Concrete).
- Answer in the user's requested language.
- When drafting tender clauses, ensure compliance with GFR 2017 Rule 144(i) non-bias specifications."""


def _language_instruction(language: str) -> str:
    language_map = {
        "en": "Respond in English.",
        "hi": "Respond in Hindi (हिन्दी).",
        "mr": "Respond in Marathi (मराठी).",
        "bn": "Respond in Bengali (বাংলা).",
        "ta": "Respond in Tamil (தமிழ்).",
        "te": "Respond in Telugu (తెలుగు).",
        "gu": "Respond in Gujarati (ગુજરાતી).",
        "kn": "Respond in Kannada (ಕನ್ನಡ).",
        "pa": "Respond in Punjabi (ਪੰਜਾਬੀ).",
        "ml": "Respond in Malayalam (മലയാളം).",
        "or": "Respond in Odia (ଓଡ଼ିଆ).",
        "as": "Respond in Assamese (অসমীয়া).",
        "ur": "Respond in Urdu (اردو).",
    }
    return language_map.get(language, "Respond in English.")


# ─── Request/Response Models ────────────────────────────────────
class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    query: str
    history: list[ChatMessage] = []
    language: str = "en"
    context: str = "general"
    stream: bool = True

class ChatResponse(BaseModel):
    response: str
    provider: str
    model: str


# ─── Gemini API Call ─────────────────────────────────────────────
async def call_gemini_streaming(query: str, history: list[ChatMessage], language: str):
    """Stream response from Gemini API using httpx"""
    import httpx

    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("VITE_GEMINI_API_KEY") or os.getenv("LLM_API_KEY", "")
    model = os.getenv("VITE_GEMINI_MODEL") or os.getenv("LLM_MODEL", "gemini-3.8-flash")

    if not api_key:
        raise HTTPException(status_code=500, detail="Gemini API key not configured on server")

    endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:streamGenerateContent?alt=sse&key={api_key}"

    # Build conversation
    contents = []
    for msg in history[-6:]:
        if msg.content and msg.content.strip():
            contents.append({
                "role": "model" if msg.role == "assistant" else "user",
                "parts": [{"text": msg.content}]
            })
    contents.append({
        "role": "user",
        "parts": [{"text": query}]
    })

    payload = {
        "systemInstruction": {
            "parts": [{"text": f"{SYSTEM_PROMPT}\n\n{_language_instruction(language)}"}]
        },
        "contents": contents,
        "generationConfig": {
            "temperature": 0.3,
            "maxOutputTokens": 4096
        }
    }

    async with httpx.AsyncClient(timeout=60.0) as client:
        async with client.stream("POST", endpoint, json=payload, headers={"Content-Type": "application/json"}) as response:
            if response.status_code != 200:
                error_body = await response.aread()
                error_text = error_body.decode("utf-8", errors="replace")
                raise HTTPException(status_code=response.status_code, detail=f"Gemini API error: {error_text}")

            async for line in response.aiter_lines():
                if line.startswith("data: "):
                    try:
                        data = json.loads(line[6:])
                        text = data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")
                        if text:
                            yield f"data: {json.dumps({'text': text})}\n\n"
                    except (json.JSONDecodeError, IndexError, KeyError):
                        pass

    yield "data: [DONE]\n\n"


async def call_gemini_non_streaming(query: str, history: list[ChatMessage], language: str) -> dict:
    """Non-streaming Gemini API call"""
    import httpx

    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("VITE_GEMINI_API_KEY") or os.getenv("LLM_API_KEY", "")
    model = os.getenv("VITE_GEMINI_MODEL") or os.getenv("LLM_MODEL", "gemini-3.8-flash")

    if not api_key:
        raise HTTPException(status_code=500, detail="Gemini API key not configured on server")

    endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"

    contents = []
    for msg in history[-6:]:
        if msg.content and msg.content.strip():
            contents.append({
                "role": "model" if msg.role == "assistant" else "user",
                "parts": [{"text": msg.content}]
            })
    contents.append({
        "role": "user",
        "parts": [{"text": query}]
    })

    payload = {
        "systemInstruction": {
            "parts": [{"text": f"{SYSTEM_PROMPT}\n\n{_language_instruction(language)}"}]
        },
        "contents": contents,
        "generationConfig": {
            "temperature": 0.3,
            "maxOutputTokens": 4096
        }
    }

    async with httpx.AsyncClient(timeout=60.0) as client:
        resp = await client.post(endpoint, json=payload, headers={"Content-Type": "application/json"})
        if resp.status_code != 200:
            raise HTTPException(status_code=resp.status_code, detail=f"Gemini API error: {resp.text}")

        data = resp.json()
        text = data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")
        return {"response": text, "provider": "gemini", "model": model}


# ─── API Routes ──────────────────────────────────────────────────
@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("VITE_GEMINI_API_KEY") or os.getenv("LLM_API_KEY", "")
    return {
        "status": "online",
        "service": "BIS Sathi API",
        "version": "2.0.0",
        "gemini_configured": bool(api_key and len(api_key) > 10),
        "model": os.getenv("VITE_GEMINI_MODEL") or "gemini-3.8-flash"
    }


@app.post("/api/chat")
async def chat(request: ChatRequest):
    """Main chat endpoint — streams responses from Gemini"""
    if not request.query or not request.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")

    if request.stream:
        return StreamingResponse(
            call_gemini_streaming(request.query, request.history, request.language),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "X-Accel-Buffering": "no"
            }
        )
    else:
        result = await call_gemini_non_streaming(request.query, request.history, request.language)
        return result


@app.post("/api/recommend")
async def recommend_standards(request: ChatRequest):
    """Generate structured standard recommendations (non-streaming)"""
    import httpx

    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("VITE_GEMINI_API_KEY") or os.getenv("LLM_API_KEY", "")
    model = os.getenv("VITE_GEMINI_MODEL") or "gemini-3.8-flash"

    if not api_key:
        raise HTTPException(status_code=500, detail="API key not configured")

    system_prompt = """You are the official Bureau of Indian Standards (BIS) AI recommendation engine.
Analyze the user's product description or tender technical requirement and recommend the exact applicable Indian Standards (IS Codes), mandatory Quality Control Order (QCO) requirements, and a tender compliance clause.

Return ONLY a valid JSON object (no extra commentary) with this structure:
{
  "productType": "Standardized product name",
  "confidence": 96,
  "category": { "name": "...", "sector": "...", "mandatoryCertification": { "isMandatory": true, "scheme": "...", "qcoNotification": "...", "penaltyClause": "..." } },
  "primaryStandards": [{ "is_code": "IS XXXX:YEAR", "title": "...", "year": "...", "active_status": "Active", "summary": "..." }],
  "alliedStandards": { "normativeReferences": [], "testMethods": [] },
  "ambiguityAnalysis": [{ "parameter": "...", "severity": "high", "issue": "...", "recommendation": "..." }],
  "tenderClause": "Complete GFR 144(i) compliant clause..."
}"""

    endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"

    payload = {
        "contents": [{
            "role": "user",
            "parts": [{"text": f"{system_prompt}\n\nProduct / Tender Requirement: \"{request.query}\"\nLanguage: {request.language}\nGenerate full structured recommendation."}]
        }],
        "generationConfig": {
            "temperature": 0.1,
            "responseMimeType": "application/json"
        }
    }

    async with httpx.AsyncClient(timeout=60.0) as client:
        resp = await client.post(endpoint, json=payload, headers={"Content-Type": "application/json"})
        if resp.status_code != 200:
            raise HTTPException(status_code=resp.status_code, detail=f"Gemini API error: {resp.text}")

        data = resp.json()
        text = data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")

        try:
            clean_json = text.strip().removeprefix("```json").removesuffix("```").strip()
            parsed = json.loads(clean_json)
            return parsed
        except json.JSONDecodeError:
            return {"raw_response": text}


# ─── Serve React Frontend Static Files (Production) ─────────────
DIST_DIR = Path(__file__).resolve().parent.parent / "dist"

if DIST_DIR.exists():
    # Mount static assets (JS, CSS, images)
    app.mount("/assets", StaticFiles(directory=str(DIST_DIR / "assets")), name="assets")

    # Serve static files from dist root (favicon, etc.)
    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        """Serve React SPA — all non-API routes fall back to index.html"""
        file_path = DIST_DIR / full_path
        if file_path.exists() and file_path.is_file():
            return FileResponse(str(file_path))
        return FileResponse(str(DIST_DIR / "index.html"))


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port, reload=True)
