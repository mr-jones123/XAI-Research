import json
from typing import Dict, List
from google import genai


def stream_chat(
    client: genai.Client,
    messages: List[Dict[str, str]],
    system_prompt: str 
):
    """Stream chat responses using Google Genai with SSE format."""
    try:
        def format_sse(data: dict) -> str:
            """Format data as Server-Sent Event."""
            return f"data: {json.dumps(data)}\n\n"

        # Send start event
        yield format_sse({"type": "start"})

        # Convert messages to Gemini format
        gemini_contents = []
        for msg in messages:
            role = "user" if msg["role"] == "user" else "model"
            gemini_contents.append({
                "role": role,
                "parts": [{"text": msg["content"]}]
            })

        # Stream response from Gemini
        response = client.models.generate_content_stream(
            model="gemini-2.5-flash",
            contents=gemini_contents,
            config={
                "system_instruction": system_prompt
            }
        )

        # Stream text chunks
        for chunk in response:
            if chunk.text:
                yield format_sse({"type": "content", "text": chunk.text})

        # Send done event
        yield format_sse({"type": "done"})

    except Exception as e:
        # Send error event
        yield format_sse({"type": "error", "error": str(e)})
        raise