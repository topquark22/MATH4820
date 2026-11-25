# Week 6 — Regularization and Iterative Deconvolution

*Companion exercises for [Day 1](../lectures/week06-day1.md) and [Day 2](../lectures/week06-day2.md). See [Workbook](README.md) for conventions.*

## Mathematical Exercises

1. Minimize $\|Hf-g\|_2^2+\lambda\|Lf\|_2^2$ for real finite-dimensional arrays. Derive the normal equations and state a condition for uniqueness when $\lambda>0$.
2. For a scalar frequency component with real positive transfer value $h=0.05$, compare naive inverse gain with identity-penalty Tikhonov gain at $\lambda=0.0025$ and $0.01$.
3. For a scalar model $g=hf+n$ with independent zero-mean signal and noise of variances $S$ and $V$, derive the real scalar linear estimator $ag$ minimizing expected squared error. Relate the result to the Wiener formula.
4. Let independent counts have Poisson means $\mu_i=(Hf)_i$. Derive the negative log-likelihood up to constants, for positive means. Contrast it with the fixed-variance Gaussian objective.
5. Perform one Richardson–Lucy update for $H=I$, observation $b=(2,6)$, and initial estimate $(4,4)$. State the normalization and positivity assumptions.
6. Show the scale ambiguity of blind convolution. Explain how normalization of a nonnegative PSF removes the positive scale ambiguity without ensuring unique image/PSF recovery.

## Computational Exercise

7. Compare Tikhonov and Wiener restoration on synthetic Gaussian-noise observations, and Richardson–Lucy on synthetic Poisson counts. Document count scaling, PSF normalization, and boundary handling. Select regularization strengths and stopping rules on calibration examples, then test on independent targets.

## Discussion

8. Explain why a regularized reconstruction can have greater data residual yet lower reference error than naive inversion. What does this tell us about the interpretation of residuals?
