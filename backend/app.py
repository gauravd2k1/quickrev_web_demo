from flask import Flask, request, jsonify
import openai
from flask_cors import CORS
from openai import OpenAI
import os


app = Flask(__name__)
CORS(app)

openai.api_key = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=openai.api_key)



@app.route('/api/generate', methods=['POST'])
def generate_mcq():
    data = request.get_json()
    input_text = data.get("text", "")

    prompt = f"Generate 2 multiple-choice questions with 4 options and answers from this passage:\n\n{input_text}"

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
        )

    result = response.choices[0].message.content
    return jsonify({"questions": result})

@app.route('/')
def home():
    return "QuickRev backend is running."

if __name__ == '__main__':
    app.run(debug=True)
