import numpy as np
from sklearn.linear_model import LinearRegression, lars_path


def compute_linear_model_features(subsets_replace, num_units):
    """
    Compute features for explanatory linear model.

    Args:
        subsets_replace: List of subsets (each is a list of indices of replaced units).
        num_units: Total number of units.

    Returns:
        features: Binary feature matrix (num_perturb x num_units).
                 1 if unit is replaced, 0 otherwise.
    """
    num_perturb = len(subsets_replace)
    features = np.zeros((num_perturb, num_units))

    for s, subset_replace in enumerate(subsets_replace):
        features[s, subset_replace] = 1.0

    return features


def fit_linear_model(features, target, sample_weights, num_nonzeros=None, debias=True):
    """
    Fit explanatory linear model.

    Args:
        features: Feature matrix (num_perturb x num_units).
        target: Target values to predict (num_perturb,).
        sample_weights: Sample weights (num_perturb,).
        num_nonzeros: Number of non-zero coefficients (None means dense model).
        debias: Refit model with no penalty after selecting features.

    Returns:
        coef: Coefficients of linear model (num_units,).
        intercept: Intercept of linear model.
        num_nonzeros: Actual number of non-zero coefficients.
    """
    num_units = features.shape[1]

    if num_nonzeros is None:
        # Fit dense linear model on units that were perturbed
        active = features.any(axis=0).nonzero()[0]
        coef = np.zeros(num_units)
        lr = LinearRegression()
        lr.fit(features[:, active], target, sample_weight=sample_weights)
        coef[active] = lr.coef_
        intercept = lr.intercept_

    else:
        # Fit sparse linear model

        # Center features and target
        features_mean = features.mean(axis=0)
        target_mean = target.mean()
        features_centered = features - features_mean
        target_centered = target - target_mean

        # Use LARS to obtain sparse model with num_nonzeros coefficients
        alphas, active, coef = lars_path(
            np.sqrt(sample_weights)[:, None] * features_centered,
            np.sqrt(sample_weights) * target_centered,
            max_iter=num_nonzeros,
            method="lasso",
            return_path=False
        )

        if debias:
            coef = np.zeros(num_units)
            if len(active):
                # Refit on selected features with no penalty
                lr = LinearRegression()
                lr.fit(features[:, active], target, sample_weight=sample_weights)
                coef[active] = lr.coef_
                intercept = lr.intercept_
            else:
                intercept = target_mean
        else:
            # Compute intercept accounting for centering
            intercept = target_mean - coef @ features_mean

    # Negate coefficients so important units have positive scores
    return -coef, intercept, len(active) if num_nonzeros is None else len(active)