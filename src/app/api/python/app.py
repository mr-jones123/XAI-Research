from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from concurrent.futures import ThreadPoolExecutor
from c_lime import CLIMEWithLIME
from google import genai
from google.genai import types
from dotenv import load_dotenv
import os

load_dotenv()


app = FastAPI()
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://xai-research.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# load gemini
try:
    API_KEY_GEMINI = os.environ.get("GEMINI_API_KEY")
    if not API_KEY_GEMINI:
        raise ValueError("GEMINI_API_KEY environment variable not set")
    gemini_client = genai.Client(api_key=API_KEY_GEMINI)
except Exception as e:
    print(f"Warning: Failed to initialize Gemini client: {e}")
    gemini_client = None


clime = CLIMEWithLIME()

@app.post("/")
async def gemini_response(request:Request):

    data = await request.json()
    prompt = data.get("prompt", "")
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
        response = gemini_client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=generate_content_config,
        )
        original_output = response.text

        def predict_fn(texts):
            with ThreadPoolExecutor() as executor:
                results = list(executor.map(
                    lambda txt: gemini_client.models.generate_content(
                        model="gemini-2.5-flash",
                        contents=txt
                    ).text,
                    texts
                ))
            return results


        explanation = clime.explain(prompt, original_output, predict_fn)


        return {
            "response": original_output,
            "explanation": {
                "original_output": original_output,
                "explanation": explanation["explanation"]
            }
        }
    except Exception as e:
        return {"error": f"Failed to process request: {str(e)}"}
