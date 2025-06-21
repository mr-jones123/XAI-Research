from flask import Flask, jsonify, request
from flask_cors import CORS 
from google import genai
from dotenv import load_dotenv
import os

load_dotenv()


app = Flask(__name__)
CORS(app)


client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

@app.route("/", methods=["POST"])
def hello():
    data = request.get_json()
    prompt = data.get("prompt", "")
    response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=prompt,
)
    ai_response = {
        "response" : response.text
    }
    return jsonify(ai_response)
if __name__ == "__main__":
    app.run()


