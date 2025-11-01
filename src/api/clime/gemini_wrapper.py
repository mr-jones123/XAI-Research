"""
Gemini model wrapper for C-LIME explainer.
"""

from typing import List, Dict, Any
from google import genai
import numpy as np


class GeminiModelWrapper:
    """
    Wrapper for Gemini model to work with C-LIME explainer.

    Attributes:
        client: Google Genai client.
        model: Model name to use.
        system_prompt: System instruction for the model.
        original_input: Store original input for context.
        original_output: Store original output for probability computation.
    """

    def __init__(
        self,
        client: genai.Client,
        model: str = "gemini-2.5-flash",
        system_prompt: str = None
    ):
        """
        Initialize Gemini model wrapper.

        Args:
            client: Google Genai client instance.
            model: Model name to use.
            system_prompt: System instruction for generation.
        """
        self.client = client
        self.model = model
        self.system_prompt = system_prompt
        self.original_input = None
        self.original_output = None

    def generate(self, units: List[str], **kwargs) -> str:
        """
        Generate text from input units.

        Args:
            units: List of text units (sentences or words).
            **kwargs: Additional generation parameters.

        Returns:
            Generated text as string.
        """
        # Join units to form complete input text
        input_text = "".join(units)

        # Store original input if this is the first call
        if self.original_input is None:
            self.original_input = input_text

        # Prepare contents for Gemini
        contents = [{
            "role": "user",
            "parts": [{"text": input_text}]
        }]

        # Generate response
        config = {}
        if self.system_prompt:
            config["system_instruction"] = self.system_prompt

        response = self.client.models.generate_content(
            model=self.model,
            contents=contents,
            config=config
        )

        output_text = response.text

        # Store original output if this is the first call
        if self.original_output is None:
            self.original_output = output_text

        return output_text

    def compute_probabilities(
        self,
        perturbed_inputs: List[List[str]],
        output_text: str,
        **kwargs
    ) -> np.ndarray:
        """
        Compute probability scores for perturbed inputs.

        For each perturbed input, we measure how similar the generated output
        is to the target output_text. This serves as a "probability" score.

        Args:
            perturbed_inputs: List of perturbed input units.
            output_text: Target output text to compare against.
            **kwargs: Additional generation parameters.

        Returns:
            Array of probability scores (similarity scores).
        """
        scores = []
        total_perturbations = len(perturbed_inputs)
        print(f"[LIME] Computing probabilities for {total_perturbations} perturbed inputs...")

        for idx, perturbed_units in enumerate(perturbed_inputs, 1):
            # Join units to form perturbed input
            perturbed_text = "".join(perturbed_units)

            # Generate output for perturbed input
            contents = [{
                "role": "user",
                "parts": [{"text": perturbed_text}]
            }]

            config = {}
            if self.system_prompt:
                config["system_instruction"] = self.system_prompt

            try:
                print(f"[LIME] API call {idx}/{total_perturbations}: Generating for perturbed input...")
                response = self.client.models.generate_content(
                    model=self.model,
                    contents=contents,
                    config=config
                )

                perturbed_output = response.text
                print(f"[LIME] API call {idx}/{total_perturbations}: Response received ({len(perturbed_output)} chars)")

                # Compute similarity score (simple word overlap / Jaccard similarity)
                # This is a simplified approach - you could use more sophisticated metrics
                target_words = set(output_text.lower().split())
                perturbed_words = set(perturbed_output.lower().split())

                if len(target_words) == 0:
                    score = 0.0
                else:
                    # Jaccard similarity
                    intersection = target_words.intersection(perturbed_words)
                    union = target_words.union(perturbed_words)
                    score = len(intersection) / len(union) if len(union) > 0 else 0.0

                scores.append(score)
                print(f"[LIME] Similarity score: {score:.4f}")

            except Exception as e:
                # If generation fails, assign low score
                print(f"[LIME] ERROR on API call {idx}/{total_perturbations}: {e}")
                scores.append(0.0)

        print(f"[LIME] All {total_perturbations} API calls completed")
        return np.array(scores)
