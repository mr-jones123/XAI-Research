
from flask import Flask, jsonify, request
from flask_cors import CORS 
from google import genai
from google.genai import types
from dotenv import load_dotenv
import os
from c_lime import CLIMEWithLIME
from concurrent.futures import ThreadPoolExecutor

load_dotenv()

app = Flask(__name__)
CORS(app)

try:
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY environment variable not set")
    client = genai.Client(api_key=api_key)
    clime = CLIMEWithLIME()
except Exception as e:
    print(f"Warning: Failed to initialize services: {e}")
    client = None
    clime = None

@app.route("/health", methods=["GET"])
def health_check():
    """Health check endpoint for Cloud Run"""
    return jsonify({"status": "healthy"}), 200

@app.route("/general", methods=["POST"])
def ai_response():    
    if not client or not clime:
        return jsonify({"error": "Services not properly initialized"}), 500
    
    data = request.get_json()
    prompt = data.get("prompt", "")
    
    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400

    try:
        generate_content_config = types.GenerateContentConfig(
            system_instruction=
            """"
                You are a helpful,fun, conversational AI chatbot. You will answer whatever the user asks you. 
                You have a specific way of answering questions. Please refer to <INSTRUCTIONS>.
                
                <INSTRUCTIONS>
                  - Always start with a friendly greeting.
                  - Provide clear and concise answers unless the user says it wants detailed explanation.
                  - Try to avoid answering in a bullet point format unless the user specifies it.
                  - Be conversational and engaging.
                </INSTRUCTIONS>                
            """
        )
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=generate_content_config,
        )
        original_output = response.text

        def predict_fn(texts):
            with ThreadPoolExecutor() as executor:
                results = list(executor.map(
                    lambda txt: client.models.generate_content(
                        model="gemini-2.5-flash",
                        contents=txt
                    ).text,
                    texts
                ))
            return results


        explanation = clime.explain(prompt, original_output, predict_fn)
        
        return jsonify({
            "ai_response": original_output,
            "explanation": {
                "original_output": original_output,
                "explanation": explanation["explanation"]
            }
        })
    except Exception as e:
        return jsonify({"error": f"Failed to process request: {str(e)}"}), 500

if __name__ == "__main__":
    print("Starting Flask app in development mode...")
    print(f"GEMINI_API_KEY set: {'Yes' if os.environ.get('GEMINI_API_KEY') else 'No'}")
    print(f"MODEL_INFERENCE_ENDPOINT set: {'Yes' if os.environ.get('MODEL_INFERENCE_ENDPOINT') else 'No'}")
    app.run(host='0.0.0.0', port=8080, debug=False)
