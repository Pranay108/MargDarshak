# BIS Sathi

A frontend-only Streamlit application for BIS information assistance.

## Run

```bash
cd bis_sathi
pip install -r requirements.txt
streamlit run app.py
```

## Notes

- The application uses a direct LLM API call only.
- API credentials must be placed in the `.env` file.
- No RAG, database, or backend server is included.
