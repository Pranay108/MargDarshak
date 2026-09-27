import re

import streamlit as st

from llm import generate_response

st.set_page_config(page_title="BIS Sathi", page_icon="🏛", layout="wide")

NAV_ITEMS = ["💬 Chat", "📚 Standards", "🏛 Certification", "💎 Hallmarking", "🧪 Laboratories"]
LANGUAGES = ["English", "हिन्दी", "मराठी", "বাংলा", "தமிழ்", "తెలుగు"]


def init_session_state():
    defaults = {
        "messages": [],
        "conversations": [],
        "active_conversation_index": None,
        "chat_title": "New chat",
        "selected_language": "English",
        "response_style": "Concise",
        "selected_nav": "💬 Chat",
    }
    for key, value in defaults.items():
        if key not in st.session_state:
            st.session_state[key] = value


def get_conversation_title(messages):
    for item in messages:
        if item.get("role") == "user":
            title = item.get("content", "").strip()
            return (title[:30] + "...") if len(title) > 30 else title
    return "New chat"


def save_active_conversation():
    if not st.session_state.messages:
        return

    title = get_conversation_title(st.session_state.messages)
    snapshot = {"title": title, "messages": st.session_state.messages.copy()}
    history = st.session_state.conversations

    if st.session_state.active_conversation_index is not None:
        if 0 <= st.session_state.active_conversation_index < len(history):
            history[st.session_state.active_conversation_index] = snapshot
    else:
        history.insert(0, snapshot)
        st.session_state.active_conversation_index = 0

    st.session_state.conversations = history[:8]
    st.session_state.chat_title = title


def clear_chat():
    st.session_state.messages = []
    st.session_state.chat_title = "New chat"
    st.session_state.active_conversation_index = None


def render_assistant_card(content):
    if not content:
        return

    blocks = content.split("\n\n")
    body = content
    reference = None
    for idx, block in enumerate(blocks):
        if "source" in block.lower() or "reference" in block.lower():
            if idx > 0:
                body = "\n\n".join(blocks[:idx])
            reference = block
            break

    with st.container():
        st.markdown(
            """
            <div class="assistant-card">
                <div class="assistant-meta">BIS Sathi</div>
                <div class="assistant-body">%s</div>
            </div>
            """ % (body.replace("\n", "<br>")),
            unsafe_allow_html=True,
        )
        if reference:
            st.caption("LLM-provided reference")
            st.info(reference)


def render_page_header(title, subtitle):
    st.markdown(f"<h2 style='margin:0; color:#132a4f;'>{title}</h2>", unsafe_allow_html=True)
    st.caption(subtitle)
    st.markdown(
        """
        <div style='display:flex; align-items:center; gap:8px; margin-top:8px; margin-bottom:20px;'>
            <span style='width:10px; height:10px; border-radius:50%; background:#21bf73; display:inline-block;'></span>
            <span style='font-size:13px; color:#2c3a46;'>Online</span>
        </div>
        """,
        unsafe_allow_html=True,
    )


def page_chat():
    render_page_header("BIS Sathi", "Ask questions about Indian Standards and BIS services.")

    if not st.session_state.messages:
        st.markdown(
            """
            <div style='padding: 1.25rem 1rem; border:1px solid #e3e8ef; border-radius:16px; background:#f7f9fc; margin: 1rem 0 1.5rem;'>
                <h3 style='margin:0 0 0.3rem; color:#132a4f;'>Welcome to BIS Sathi</h3>
                <p style='margin:0; color:#4a596b;'>I can help you understand Indian Standards, certification, hallmarking and BIS services.</p>
            </div>
            """,
            unsafe_allow_html=True,
        )

        suggestions = [
            "What Indian Standard applies to cement?",
            "What is the BIS certification process?",
            "How does BIS hallmarking work?",
            "Which BIS laboratory can test my product?",
        ]

        cols = st.columns(2)
        for index, prompt in enumerate(suggestions):
            with cols[index % 2]:
                if st.button(prompt, use_container_width=True, key=f"suggest-{index}"):
                    st.session_state.user_prompt = prompt
                    st.rerun()

    for message in st.session_state.messages:
        with st.chat_message(message["role"]):
            if message["role"] == "user":
                st.markdown(message["content"])
            else:
                render_assistant_card(message["content"])

    prompt = st.chat_input("Ask BIS Sathi anything about Indian Standards...")
    if prompt:
        st.session_state.messages.append({"role": "user", "content": prompt})
        save_active_conversation()
        with st.spinner("BIS Sathi is thinking..."):
            try:
                answer = generate_response(st.session_state.messages, st.session_state.selected_language)
            except ValueError as exc:
                answer = str(exc)
                if "Missing API key" in answer or "Invalid API key" in answer:
                    answer = "Sorry, BIS Sathi could not connect to the AI service. Please configure the API key and try again."
                else:
                    answer = "Sorry, BIS Sathi could not connect to the AI service. Please try again."
            except TimeoutError:
                answer = "Sorry, BIS Sathi could not connect to the AI service. Please try again."
            except ConnectionError:
                answer = "Sorry, BIS Sathi could not connect to the AI service. Please try again."
            except RuntimeError:
                answer = "Sorry, BIS Sathi could not connect to the AI service. Please try again."
            except Exception:
                answer = "Sorry, BIS Sathi could not connect to the AI service. Please try again."

        st.session_state.messages.append({"role": "assistant", "content": answer})
        save_active_conversation()
        st.rerun()


def page_standards():
    render_page_header("Indian Standards", "Demo data only — not official BIS data")
    search_term = st.text_input("Search for a standard...", value="")

    demo_standards = [
        {"code": "IS 269", "title": "Ordinary Portland Cement", "category": "Construction Materials", "status": "Demo data"},
        {"code": "IS 456", "title": "Plain and Reinforced Concrete", "category": "Civil Engineering", "status": "Demo data"},
        {"code": "IS 8112", "title": "43 Grade Ordinary Portland Cement", "category": "Construction Materials", "status": "Demo data"},
        {"code": "IS 1786", "title": "High Strength Deformed Steel Bars", "category": "Metallurgy", "status": "Demo data"},
    ]

    filtered = [item for item in demo_standards if search_term.lower() in item["code"].lower() or search_term.lower() in item["title"].lower()]

    cols = st.columns(2)
    for index, item in enumerate(filtered):
        with cols[index % 2]:
            st.markdown(
                """
                <div class="card-demo">
                    <div class="card-header">%s</div>
                    <div class="card-title">%s</div>
                    <div class="card-meta">Category: %s</div>
                    <div class="card-badge">%s</div>
                </div>
                """ % (item["code"], item["title"], item["category"], item["status"]),
                unsafe_allow_html=True,
            )


def page_certification():
    render_page_header("BIS Certification", "Demo information — verify with official BIS sources.")
    cards = [
        ("Certification Overview", "Overview of schemes, products and regulatory intent."),
        ("Application Process", "Application preparation, documentation and submission flow."),
        ("Testing", "Sample testing, lab coordination and compliance checks."),
        ("Documentation", "Forms, declarations and compliance records required for filing."),
        ("Licensing", "Grant, renewal and monitoring steps after approval."),
    ]

    cols = st.columns(2)
    for index, (title, desc) in enumerate(cards):
        with cols[index % 2]:
            st.markdown(
                """
                <div class="card-demo">
                    <div class="card-header">%s</div>
                    <div class="card-meta">%s</div>
                    <div class="card-badge">Demo information — verify with official BIS sources.</div>
                </div>
                """ % (title, desc),
                unsafe_allow_html=True,
            )


def page_hallmarking():
    render_page_header("Hallmarking", "Demo content for understanding service flow.")
    cards = [
        ("Hallmarking", "Jewellery purity certification and consumer assurance."),
        ("Jeweller Registration", "Registration and compliance requirements for jewellers."),
        ("Assaying & Hallmarking Centres", "Service centres and hallmarking infrastructure."),
        ("Consumer Information", "How consumers verify hallmarking and purity marks."),
    ]

    cols = st.columns(2)
    for index, (title, desc) in enumerate(cards):
        with cols[index % 2]:
            st.markdown(
                """
                <div class="card-demo">
                    <div class="card-header">%s</div>
                    <div class="card-meta">%s</div>
                    <div class="card-badge">Demo data</div>
                </div>
                """ % (title, desc),
                unsafe_allow_html=True,
            )


def page_laboratories():
    render_page_header("Laboratory Explorer", "Demo laboratory data only.")
    search_term = st.text_input("Search laboratory...", value="")
    location_filter = st.selectbox("Location", ["All", "Delhi", "Mumbai", "Kolkata", "Chennai", "Bengaluru"])
    capability_filter = st.selectbox("Testing Capability", ["All", "Mechanical", "Chemical", "Electrical", "Metallurgical"])

    labs = [
        {"name": "Regional Testing Lab A", "location": "Delhi", "capability": "Chemical", "status": "Demo data"},
        {"name": "Metrology Lab Centre", "location": "Mumbai", "capability": "Mechanical", "status": "Demo data"},
        {"name": "Material Analysis Lab", "location": "Kolkata", "capability": "Metallurgical", "status": "Demo data"},
        {"name": "Electronics Test Facility", "location": "Bengaluru", "capability": "Electrical", "status": "Demo data"},
    ]

    filtered = []
    for lab in labs:
        if search_term.lower() in lab["name"].lower() and (location_filter == "All" or lab["location"] == location_filter) and (capability_filter == "All" or lab["capability"] == capability_filter):
            filtered.append(lab)

    if not filtered:
        st.info("No demo laboratory matches the current filters.")

    cols = st.columns(2)
    for index, lab in enumerate(filtered):
        with cols[index % 2]:
            st.markdown(
                """
                <div class="card-demo">
                    <div class="card-header">%s</div>
                    <div class="card-title">%s</div>
                    <div class="card-meta">Location: %s</div>
                    <div class="card-meta">Capability: %s</div>
                    <div class="card-badge">%s</div>
                </div>
                """ % (lab["name"], lab["name"], lab["location"], lab["capability"], lab["status"]),
                unsafe_allow_html=True,
            )


def render_sidebar():
    with st.sidebar:
        st.markdown("<h1 style='margin:0; color:#132a4f; font-size:2rem;'>BIS Sathi</h1>", unsafe_allow_html=True)
        st.caption("AI Assistant")

        st.session_state.selected_nav = st.radio(
            "Navigation",
            NAV_ITEMS,
            index=NAV_ITEMS.index(st.session_state.selected_nav if st.session_state.selected_nav in NAV_ITEMS else "💬 Chat"),
            label_visibility="collapsed",
            key="nav_selector",
        )

        st.markdown("<div style='height:18px;'></div>", unsafe_allow_html=True)
        st.caption("Language")
        st.session_state.selected_language = st.selectbox(
            "Language",
            LANGUAGES,
            index=LANGUAGES.index(st.session_state.selected_language),
            label_visibility="collapsed",
        )

        st.markdown("<div style='height:14px;'></div>", unsafe_allow_html=True)
        st.caption("Settings")
        st.session_state.response_style = st.radio(
            "Response Style",
            ["Concise", "Detailed"],
            index=0 if st.session_state.response_style == "Concise" else 1,
            horizontal=True,
        )

        if st.button("Clear Chat", use_container_width=True):
            clear_chat()
            st.rerun()

        st.markdown("<div style='margin-top:1.5rem; border-top:1px solid #e3e8ef; padding-top:0.8rem;'></div>", unsafe_allow_html=True)
        st.markdown("<div style='display:flex; align-items:center; gap:8px; color:#2f3e57;'><span style='width:10px; height:10px; border-radius:50%; background:#21bf73; display:inline-block;'></span> AI Service Connected</div>", unsafe_allow_html=True)

        st.markdown("<div style='height:18px;'></div>", unsafe_allow_html=True)
        st.caption("Recent conversations")
        if st.session_state.conversations:
            for index, conversation in enumerate(st.session_state.conversations):
                if st.button(conversation["title"], key=f"conv-{index}", use_container_width=True):
                    st.session_state.messages = conversation["messages"].copy()
                    st.session_state.active_conversation_index = index
                    st.session_state.chat_title = conversation["title"]
                    st.rerun()
        else:
            st.caption("No recent conversations yet.")


def main():
    init_session_state()
    render_sidebar()

    st.markdown(
        """
        <style>
            :root {
                --bg: #f4f7fb;
                --panel: #ffffff;
                --primary: #0f3b74;
                --primary-soft: #eaf2ff;
                --text: #1d2736;
                --muted: #58687a;
                --border: #dde5ef;
                --success: #2dbf8c;
                --shadow: 0 10px 28px rgba(18, 38, 63, 0.06);
            }
            .stApp {
                background: var(--bg);
            }
            .main .block-container {
                padding-top: 1.75rem;
                padding-left: 1.5rem;
                padding-right: 1.5rem;
            }
            .assistant-card {
                background: #ffffff;
                border: 1px solid var(--border);
                border-radius: 16px;
                padding: 1rem 1.1rem;
                box-shadow: var(--shadow);
                margin-bottom: 0.9rem;
            }
            .assistant-meta {
                color: var(--primary);
                font-size: 0.76rem;
                font-weight: 700;
                letter-spacing: 0.04em;
                text-transform: uppercase;
                margin-bottom: 0.75rem;
            }
            .assistant-body {
                color: var(--text);
                line-height: 1.7;
                font-size: 0.98rem;
            }
            .card-demo {
                background: #ffffff;
                border: 1px solid var(--border);
                border-radius: 16px;
                padding: 1rem 1rem 0.9rem;
                box-shadow: var(--shadow);
                margin: 0.5rem 0 1rem;
            }
            .card-header {
                color: var(--primary);
                font-weight: 700;
                font-size: 0.8rem;
                letter-spacing: 0.04em;
                margin-bottom: 0.6rem;
            }
            .card-title {
                color: var(--text);
                font-size: 1.1rem;
                font-weight: 600;
                margin-bottom: 0.4rem;
            }
            .card-meta {
                color: var(--muted);
                font-size: 0.9rem;
                margin-top: 0.15rem;
            }
            .card-badge {
                display: inline-block;
                margin-top: 0.8rem;
                background: var(--primary-soft);
                color: var(--primary);
                border-radius: 999px;
                padding: 0.35rem 0.7rem;
                font-size: 0.75rem;
                font-weight: 600;
            }
            .stChatInput {
                border: 1px solid var(--border);
                border-radius: 16px;
            }
            .stButton > button {
                border-radius: 12px;
                border: 1px solid var(--border);
                color: var(--primary);
                background: #fff;
                padding: 0.65rem 0.8rem;
                font-weight: 600;
            }
            .stButton > button:hover {
                border-color: #c9d7ee;
                background: #f7faff;
            }
        </style>
        """,
        unsafe_allow_html=True,
    )

    if st.session_state.selected_nav == "💬 Chat":
        page_chat()
    elif st.session_state.selected_nav == "📚 Standards":
        page_standards()
    elif st.session_state.selected_nav == "🏛 Certification":
        page_certification()
    elif st.session_state.selected_nav == "💎 Hallmarking":
        page_hallmarking()
    elif st.session_state.selected_nav == "🧪 Laboratories":
        page_laboratories()


main()
