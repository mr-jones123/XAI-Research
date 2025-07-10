from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from concurrent.futures import ThreadPoolExecutor
from c_lime import CLIMEWithLIME
from google import genai
from google.genai import types
from dotenv import load_dotenv
import os
import asyncio
import time
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

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
# Load Gemini client
try:
    API_KEY_GEMINI = os.environ.get("GEMINI_API_KEY")
    if not API_KEY_GEMINI:
        raise ValueError("GEMINI_API_KEY environment variable not set")
    gemini_client = genai.Client(api_key=API_KEY_GEMINI)
    logger.info("Gemini client initialized successfully")
except Exception as e:
    logger.error(f"Failed to initialize Gemini client: {e}")
    gemini_client = None

# Initialize CLIME with better error handling
clime = None

@app.on_event("startup")
async def startup_event():
    global clime
    try:
        logger.info("Initializing CLIME model...")
        clime = CLIMEWithLIME()
        logger.info("CLIME model initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize CLIME: {e}")
        clime = None

@app.post("/")
async def gemini_response(request: Request):
    start_time = time.time()

    # Check if services are available
    if not gemini_client:
        raise HTTPException(status_code=503, detail="Gemini service unavailable")

    if not clime:
        raise HTTPException(status_code=503, detail="CLIME service unavailable")

    try:
        data = await request.json()
        prompt = data.get("prompt", "")

        if not prompt:
            raise HTTPException(status_code=400, detail="Prompt is required")

        logger.info(f"Processing request with prompt length: {len(prompt)}")

        # Generate content configuration
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

        # Generate original response with timeout
        try:
            response = await asyncio.wait_for(
                asyncio.to_thread(
                    lambda: gemini_client.models.generate_content(
                        model="gemini-2.5-flash",
                        contents=prompt,
                        config=generate_content_config,
                    )
                ),
                timeout=30.0  # 30 second timeout for original response
            )
            original_output = response.text
            logger.info("Original response generated successfully")
        except asyncio.TimeoutError:
            raise HTTPException(status_code=408, detail="Request timeout while generating response")

        # Async predict function with reduced samples for faster processing
        async def async_predict_fn(texts):
            try:
                # Limit concurrent requests to avoid overwhelming the API
                semaphore = asyncio.Semaphore(3)

                async def generate_single(txt):
                    async with semaphore:
                        try:
                            return await asyncio.wait_for(
                                asyncio.to_thread(
                                    lambda: gemini_client.models.generate_content(
                                        model="gemini-2.5-flash",
                                        contents=txt
                                    ).text
                                ),
                                timeout=15.0  # Shorter timeout for perturbations
                            )
                        except asyncio.TimeoutError:
                            logger.warning(f"Timeout generating perturbation for text: {txt[:50]}...")
                            return original_output  # Fallback to original
                        except Exception as e:
                            logger.warning(f"Error generating perturbation: {e}")
                            return original_output  # Fallback to original

                tasks = [generate_single(txt) for txt in texts]
                results = await asyncio.gather(*tasks, return_exceptions=True)

                # Handle exceptions in results
                final_results = []
                for result in results:
                    if isinstance(result, Exception):
                        logger.warning(f"Exception in prediction: {result}")
                        final_results.append(original_output)
                    else:
                        final_results.append(result)

                return final_results
            except Exception as e:
                logger.error(f"Error in async_predict_fn: {e}")
                return [original_output] * len(texts)

        # Convert async function for CLIME (which expects sync)
        def sync_predict_fn(texts):
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            try:
                return loop.run_until_complete(async_predict_fn(texts))
            finally:
                loop.close()

        # Generate explanation with timeout and reduced samples
        try:
            explanation = await asyncio.wait_for(
                asyncio.to_thread(
                    lambda: clime.explain(
                        prompt,
                        original_output,
                        sync_predict_fn,
                        num_samples=5  # Reduced from 10 to 5 for faster processing
                    )
                ),
                timeout=60.0  # 60 second timeout for explanation
            )
            logger.info("Explanation generated successfully")
        except asyncio.TimeoutError:
            logger.warning("Explanation generation timed out, returning response without explanation")
            explanation = {
                "original_output": original_output,
                "explanation": [("Explanation generation timed out", 0.0)]
            }

        total_time = time.time() - start_time
        logger.info(f"Request completed in {total_time:.2f} seconds")

        return {
            "response": original_output,
            "explanation": {
                "original_output": original_output,
                "explanation": explanation["explanation"]
            },
            "processing_time": round(total_time, 2)
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error processing request: {e}")
        return {"error": f"Failed to process request: {str(e)}"}

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint to verify service status"""
    try:
        status = {
            "status": "healthy",
            "gemini_client": gemini_client is not None,
            "clime_model": clime is not None,
            "timestamp": time.time()
        }

        if not gemini_client or not clime:
            status["status"] = "degraded"

        return status
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return {
            "status": "unhealthy",
            "error": str(e),
            "timestamp": time.time()
        }
