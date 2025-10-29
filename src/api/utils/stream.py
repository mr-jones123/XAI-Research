import json
from typing import Dict, List
from google import genai
from ..clime.clime import CLIME
from ..clime.gemini_wrapper import GeminiModelWrapper


def stream_chat(
    client: genai.Client,
    messages: List[Dict[str, str]],
    system_prompt: str,
    enable_lime: bool = True
):
    """Stream chat responses using Google Genai with SSE format and LIME explanations."""
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

        # Collect the full response text for LIME
        full_response = ""

        # Stream text chunks
        for chunk in response:
            if chunk.text:
                full_response += chunk.text
                yield format_sse({"type": "content", "text": chunk.text})

        # Send done event
        yield format_sse({"type": "done"})

        # LIME Explanation
        if enable_lime and messages and full_response:
            # Get the last user message as input for LIME
            user_messages = [msg for msg in messages if msg["role"] == "user"]
            if user_messages:
                last_user_input = user_messages[-1]["content"]

                # Send lime-start event
                print(f"[LIME] Starting LIME processing for input: {last_user_input[:50]}...")
                yield format_sse({"type": "lime-start"})

                # Create model wrapper
                model_wrapper = GeminiModelWrapper(
                    client=client,
                    model="gemini-2.5-flash",
                    system_prompt=system_prompt
                )

                # Initialize CLIME explainer
                print("[LIME] Initializing CLIME explainer...")
                explainer = CLIME(model=model_wrapper, segmenter="en_core_web_sm")

                # Adaptive segment selection based on input length
                # Count sentences in input
                import re
                sentences = re.split(r'[.!?]+', last_user_input.strip())
                sentences = [s.strip() for s in sentences if s.strip()]
                num_sentences = len(sentences)

                # Count words in input
                words = last_user_input.split()
                num_words = len(words)

                # Decision logic: Use word-level for short inputs, sentence-level for long
                if num_sentences <= 1 or num_words < 15:
                    segment_type = "w"  # Word-level for short inputs
                    oversampling_factor = 1  # Fewer perturbations for word-level (can be many words)
                    print(f"[LIME] Using WORD-level segmentation (input: {num_words} words, {num_sentences} sentence)")
                else:
                    segment_type = "s"  # Sentence-level for longer inputs
                    oversampling_factor = 2  # More perturbations for sentence-level
                    print(f"[LIME] Using SENTENCE-level segmentation (input: {num_words} words, {num_sentences} sentences)")

                # Generate explanation
                # OPTIMIZATION: Lower values = faster but less accurate
                # - oversampling_factor: Number of perturbations per unit (2-3 = fast, 5-10 = accurate)
                # - segment_type: "w" for words (more units) or "s" for sentences (fewer units, faster)
                # - max_units_replace: How many units to mask at once (1 = fastest)
                print("[LIME] Generating explanation (this will make multiple API calls)...")
                import time
                start_time = time.time()
                lime_result = explainer.explain_instance(
                    input_text=last_user_input,
                    output_text=full_response,
                    segment_type=segment_type,  # Adaptive: "w" for short inputs, "s" for long
                    oversampling_factor=oversampling_factor,  # Adaptive based on segment type
                    max_units_replace=1,  # Keep at 1 for speed
                    num_nonzeros=10  # Show top 10 features (more relevant for word-level)
                )

                elapsed_time = time.time() - start_time
                print(f"[LIME] Explanation complete in {elapsed_time:.2f} seconds")
                print(f"[LIME] Number of units analyzed: {len(lime_result['attributions']['units'])}")

                # Convert LIME output to frontend format
                # Frontend expects: { original_output: string, explanation: [[unit, score], ...], intercept?: number }
                units = lime_result["attributions"]["units"]
                scores = lime_result["attributions"]["scores"]

                # Create explanation array as [unit, score] pairs
                explanation = [[unit, score] for unit, score in zip(units, scores)]

                lime_data = {
                    "original_output": lime_result["output"],
                    "explanation": explanation,
                    "intercept": lime_result.get("intercept")
                }

                # Send lime-complete event with data
                yield format_sse({"type": "lime-complete", "data": lime_data})

    except Exception as e:
        # Send error event
        yield format_sse({"type": "error", "error": str(e)})
        raise