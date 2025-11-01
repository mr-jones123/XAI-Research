"""
C-LIME explainer for text generation models.
"""

import numpy as np
from typing import List, Dict, Any, Union

from clime.segmenter import SpaCySegmenter, exclude_non_alphanumeric
from clime.subset_utils import sample_subsets, mask_subsets
from clime.linear_model import compute_linear_model_features, fit_linear_model


class CLIME:
    """
    C-LIME (Conditional LIME) explainer for text generation.

    Attributes:
        model: Generative model to explain.
        segmenter: Text segmenter.
    """

    def __init__(self, model, segmenter="en_core_web_sm"):
        """
        Initialize C-LIME explainer.

        Args:
            model: Model to explain (should have generate() and compute_probabilities() methods).
            segmenter: Name of spaCy model for segmentation.
        """
        self.model = model
        self.segmenter = SpaCySegmenter(segmenter)

    def explain_instance(
        self,
        input_text: Union[str, List[str]],
        output_text: str = None,
        segment_type: str = "s",
        oversampling_factor: float = 10,
        max_units_replace: int = 2,
        empty_subset: bool = True,
        replacement_str: str = "",
        num_nonzeros: int = None,
        debias: bool = True,
        **model_params
    ) -> Dict[str, Any]:
        """
        Explain model output by attributing it to parts of input text.

        Args:
            input_text: Input text (string or list of text units).
            output_text: Output text to explain (if None, generates from input).
            segment_type: Type of segmentation ("s" for sentences, "w" for words).
            oversampling_factor: Ratio of perturbed inputs to number of units.
            max_units_replace: Maximum units to replace at once.
            empty_subset: Whether to include empty subset.
            replacement_str: String to replace units with (empty = drop).
            num_nonzeros: Number of non-zero coefficients (None = dense model).
            debias: Refit model after feature selection.
            **model_params: Additional parameters for model generation.

        Returns:
            Dictionary with:
                - "output": Generated output text
                - "attributions": Dict with "units", "scores", "unit_types"
                - "intercept": Linear model intercept
        """
        # 1. Segment input text
        units, unit_types = self.segmenter.segment_text(input_text, segment_type)
        unit_types = exclude_non_alphanumeric(unit_types, units)
        num_units = len(units)

        # 2. Generate output for original input if not provided
        if output_text is None:
            output_text = self.model.generate(units, **model_params)

        # 3. Sample subsets of units to perturb
        idx_replace = (np.array(unit_types) != "n").nonzero()[0]
        subsets_replace, subset_weights = sample_subsets(
            idx_replace,
            max_units_replace,
            oversampling_factor,
            empty_subset=empty_subset,
            return_weights=True
        )

        # 4. Create perturbed inputs by masking subsets
        perturbed_inputs = mask_subsets(units, subsets_replace, replacement_str)

        # 5. Compute scores for perturbed inputs
        scores = self.model.compute_probabilities(
            perturbed_inputs,
            output_text,
            **model_params
        )

        # 6. Compute features for linear model
        features = compute_linear_model_features(subsets_replace, num_units)

        # 7. Fit linear model
        coef, intercept, num_nonzeros_out = fit_linear_model(
            features,
            scores,
            np.array(subset_weights),
            num_nonzeros,
            debias
        )

        # 8. Construct output dictionary
        output_dict = {
            "output": output_text,
            "attributions": {
                "units": units,
                "scores": coef.tolist(),
                "unit_types": unit_types
            },
            "intercept": float(intercept)
        }

        return output_dict