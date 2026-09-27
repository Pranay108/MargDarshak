import os

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

SYSTEM_PROMPT = """You are BIS Sathi, an AI assistant designed to help users understand Indian Standards and BIS services.

Answer questions clearly and professionally.

The user may ask about:
- Indian Standards
- BIS certification
- Hallmarking
- Testing laboratories
- BIS procedures
- Technical questions
- Consumer information

Respond in the selected language.

Do not fabricate Indian Standard numbers, clauses, certification requirements, laboratory information or official BIS policies.

If you are uncertain, clearly state that the information should be verified from the official BIS source.

Preserve technical identifiers such as IS numbers, clause numbers and scheme names.

Do not claim that information is officially verified unless an official source has actually been provided to you.
"""


def _language_instruction(language: str) -> str:
    language_map = {
        "English": "Respond in English.",
        "हिन्दी": "Respond in Hindi.",
        "मराठी": "Respond in Marathi.",
        "বাংলা": "Respond in Bengali.",
        "தமிழ்": "Respond in Tamil.",
        "తెలుగు": "Respond in Telugu.",
    }
    return language_map.get(language, "Respond in English.")


def generate_response(messages, language):
    api_key = os.getenv("LLM_API_KEY")
    model = os.getenv("LLM_MODEL", "gpt-4o-mini")
    base_url = os.getenv("LLM_BASE_URL")

    if not api_key:
        raise ValueError("Missing API key.")

    if not isinstance(messages, list):
        raise ValueError("Messages must be a list.")

    client = OpenAI(api_key=api_key, base_url=base_url)

    llm_messages = [
        {"role": "system", "content": f"{SYSTEM_PROMPT}\n\n{_language_instruction(language)}"}
    ]

    for item in messages:
        role = item.get("role")
        content = item.get("content", "")
        if role in {"user", "assistant", "system"} and content:
            llm_messages.append({"role": role, "content": content})

    try:
        response = client.chat.completions.create(
            model=model,
            messages=llm_messages,
            temperature=0.3,
            max_tokens=600,
        )
        answer = response.choices[0].message.content
        if not answer or not answer.strip():
            raise ValueError("Empty response from AI service.")
        return answer.strip()
    except Exception as exc:
        if "401" in str(exc) or "Incorrect API key" in str(exc) or "authentication" in str(exc).lower():
            raise ValueError("Invalid API key.")
        if "429" in str(exc) or "rate limit" in str(exc).lower():
            raise TimeoutError("API rate limit reached.")
        if "timed out" in str(exc).lower() or "timeout" in str(exc).lower():
            raise TimeoutError("API timeout.")
        if "connection" in str(exc).lower() or "network" in str(exc).lower():
            raise ConnectionError("Network error.")
        raise RuntimeError("Unable to generate response.")
