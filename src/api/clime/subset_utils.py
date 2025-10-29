
from itertools import combinations
from math import ceil, inf
from random import sample
import numpy as np


def sample_subsets(idx_replace, max_units_replace, oversampling_factor=None,
                   empty_subset=False, return_weights=False):
    """
    Sample subsets of input units that can be replaced.

    Args:
        idx_replace: Indices of units that can be replaced.
        max_units_replace: Maximum number of units to replace at one time.
        oversampling_factor: Ratio of perturbed inputs to units that can be replaced.
        empty_subset: Whether to include the empty subset.
        return_weights: Whether to return weights associated with subsets.

    Returns:
        subsets: List of subsets (each subset is a list of unit indices).
        weights: Weights associated with subsets (if return_weights==True).
    """
    num_replace = len(idx_replace)

    # Number of subsets to sample
    if oversampling_factor is not None:
        num_subsets_remaining = ceil(oversampling_factor * num_replace)
    else:
        num_subsets_remaining = inf

    # Weight given to each subset size
    weight_k = num_subsets_remaining / (max_units_replace + empty_subset)

    # Initialize
    if empty_subset:
        subsets, weights = [[]], [weight_k]
    else:
        subsets, weights = [], []

    # Iterate over subset sizes
    for k in range(1, min(max_units_replace, num_replace) + 1):
        # Number of subsets of this size
        num_subsets_k = round(num_subsets_remaining / (max_units_replace + 1 - k)) if num_subsets_remaining < inf else inf

        # Enumerate subsets of size k
        subsets_new = np.array(list(combinations(range(num_replace), k)))
        num_subsets_new = len(subsets_new)

        if num_subsets_new > num_subsets_k:
            # Subsample to specified number
            subsets_new = subsets_new[sample(range(num_subsets_new), num_subsets_k)]
            num_subsets_new = len(subsets_new)

        # Convert to subsets of unit indices
        subsets_new = idx_replace[subsets_new]

        # Add to subsets
        subsets.extend(subsets_new.tolist())
        weights.extend([weight_k / num_subsets_new] * num_subsets_new)
        num_subsets_remaining -= num_subsets_new

        if num_subsets_remaining <= 0:
            break

    if return_weights:
        return subsets, weights
    else:
        return subsets


def mask_subsets(units, subsets_replace, replacement_str):
    """
    Mask subsets of units with a fixed replacement string.

    Args:
        units: Original sequence of units.
        subsets_replace: List of subsets to replace (each is a list of unit indices).
        replacement_str: String to replace units with (default "" for dropping units).

    Returns:
        input_masked: List of masked versions of units.
    """
    units = np.array(units)
    input_masked = []

    for subset_replace in subsets_replace:
        units_masked = units.copy()
        units_masked[subset_replace] = replacement_str
        input_masked.append(units_masked.tolist())

    return input_masked