# QuickRev Web Demo

This is a mini web demo of the QuickRev app.

## Features
- Upload an image of any textbook page
- OCR extracts the text
- Sends to backend (OpenAI) for MCQ generation
- Returns 1–2 sample questions

## How to Run Locally

1. Start backend:
```
cd backend
pip install -r requirements.txt
python app.py
```

2. Open `frontend/index.html` in your browser

Replace `"https://your-backend-url/api/generate"` in `script.js` with your hosted backend URL after deployment.
