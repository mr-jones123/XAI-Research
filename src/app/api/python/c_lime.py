# c_lime.py with dynamic split strategy
from lime.lime_text import LimeTextExplainer
from sklearn.linear_model import Ridge
from sentence_transformers import SentenceTransformer, util
import requests
from typing import List
import numpy as np
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class CLIMEWithLIME:
    def __init__(self, sentence_encoder: str = "all-MiniLM-L6-v2"):
        try:
            logger.info(f"Initializing SentenceTransformer with model: {sentence_encoder}")
            self.encoder = SentenceTransformer(sentence_encoder)
            logger.info("SentenceTransformer initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize SentenceTransformer: {e}")
            raise

    def scalarizer(self, ref_output: str, perturbed_output: str) -> float:
        try:
            emb_ref = self.encoder.encode(ref_output, convert_to_tensor=True)
            emb_pert = self.encoder.encode(perturbed_output, convert_to_tensor=True)
            return float(util.pytorch_cos_sim(emb_ref, emb_pert))
        except Exception as e:
            logger.error(f"Error in scalarizer: {e}")
            # Return a default similarity score if encoding fails
            return 0.5

    def explain(self, input_text: str, original_output: str, predict_fn, num_samples: int = 20) -> dict:
        try:
            # Use shorter text splitting for faster processing
            if len(input_text.split()) <= 15:  # Reduced threshold
                explainer = LimeTextExplainer(split_expression='\\s+', bow=False)  # word-level
            else:
                explainer = LimeTextExplainer(split_expression='\\n|\\.', bow=False)  # sentence-level

            def wrapped_predict(perturbed_texts: List[str]) -> np.ndarray:
                try:
                    # Limit the number of texts processed at once
                    if len(perturbed_texts) > 20:
                        logger.warning(f"Large batch size: {len(perturbed_texts)}, limiting to 20")
                        perturbed_texts = perturbed_texts[:20]

                    responses = predict_fn(perturbed_texts)
                    sims = []

                    for i, r in enumerate(responses):
                        try:
                            sim = self.scalarizer(original_output, r)
                            sims.append(sim)
                        except Exception as e:
                            logger.warning(f"Scalarizer error for response {i}: {e}")
                            sims.append(0.5)  # Default similarity

                    return np.array([[sim, 1 - sim] for sim in sims])
                except Exception as e:
                    logger.error(f"Error in wrapped_predict: {e}")
                    # Return default predictions if there's an error
                    return np.array([[0.5, 0.5] for _ in perturbed_texts])

            exp = explainer.explain_instance(
                input_text,
                wrapped_predict,
                num_samples=min(num_samples, 10),  # Cap at 10 samples
                labels=(0,)
            )

            explanation = exp.as_list(label=0)
            logger.info(f"Generated explanation with {len(explanation)} features")

            return {
                "original_output": original_output,
                "explanation": explanation
            }
        except Exception as e:
            logger.error(f"Error in explain method: {e}")
            return {
                "original_output": original_output,
                "explanation": [("Error generating explanation", 0.0)]
            }
