import spacy


class SpaCySegmenter:
    """
    Segment input text into units using a spaCy model.
    """

    def __init__(self, spacy_model="en_core_web_sm"):
        """
        Initialize SpaCySegmenter.

        Args:
            spacy_model: Name of spaCy model to use.
        """
        try:
            self.model = spacy.load(spacy_model)
        except OSError:
            # Model not installed, download it
            import subprocess
            subprocess.run(["python", "-m", "spacy", "download", spacy_model], check=True)
            self.model = spacy.load(spacy_model)

    def segment_text(self, text, segment_type="s"):
        """
        Segment text into units.

        Args:
            text: Input text as string.
            segment_type: Type of segmentation - "s" for sentences, "w" for words.

        Returns:
            units: List of text units.
            unit_types: List of unit types (all same type).
        """
        if isinstance(text, list):
            # Already segmented
            return text, ["s"] * len(text)

        doc = self.model(text)

        if segment_type == "s":
            # Segment into sentences
            units = [sent.text_with_ws for sent in doc.sents]
            unit_types = ["s"] * len(units)
        elif segment_type == "w":
            # Segment into words
            units = [token.text_with_ws for token in doc]
            unit_types = ["w"] * len(units)
        else:
            raise ValueError(f"Unsupported segment_type: {segment_type}")

        return units, unit_types


def exclude_non_alphanumeric(unit_types, units):
    """
    Mark units without alphanumeric characters as not to be perturbed.

    Args:
        unit_types: List of unit types.
        units: List of text units.

    Returns:
        Updated unit_types where non-alphanumeric units are marked as "n".
    """
    updated_types = []
    for unit, utype in zip(units, unit_types):
        if not any(c.isalnum() for c in unit):
            updated_types.append("n")
        else:
            updated_types.append(utype)
    return updated_types