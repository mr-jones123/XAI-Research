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

    def explain(self, input_text: str, original_output: str, predict_fn, num_samples: int = 30) -> dict:
        try:
            if len(input_text.split()) <= 20:
                explainer = LimeTextExplainer(split_expression='\\s+', bow=False)  # word-level
            else:
                explainer = LimeTextExplainer(split_expression='\\n|\\.', bow=False)  # sentence-level

            def wrapped_predict(perturbed_texts: List[str]) -> np.ndarray:
                try:
                    responses = predict_fn(perturbed_texts)
                    sims = [self.scalarizer(original_output, r) for r in responses]
                    return np.array([[sim, 1 - sim] for sim in sims])  # LIME expects a 2D prob array
                except Exception as e:
                    logger.error(f"Error in wrapped_predict: {e}")
                    # Return default predictions if there's an error
                    return np.array([[0.5, 0.5] for _ in perturbed_texts])

            exp = explainer.explain_instance(
                input_text,
                wrapped_predict,
                num_samples=num_samples,
                labels=(0,)
            )

            explanation = exp.as_list(label=0)
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
