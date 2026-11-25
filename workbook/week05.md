# Week 5 — Ill-Posedness and Inverse-Filter Failure

*Companion exercises for [Day 1](../lectures/week05-day1.md) and [Day 2](../lectures/week05-day2.md). See [Workbook](README.md) for conventions.*

## Mathematical Exercises

1. Classify the following in Hadamard's terminology: two different originals produce the same noiseless observation; no exact solution exists for a noisy observation; small observation errors cause large changes in the inverse.
2. For $B=HF+N$ with $H\ne0$, derive the naive inverse estimate and its error. Evaluate the error magnitude for $|N|=0.002$ and $|H|=0.1,0.01,0.0001$.
3. Let $B=H_t F+N$ and reconstruct with an assumed nonzero $H_a$. Derive the decomposition of reconstruction error into model mismatch and noise terms.
4. In the ideal continuous Gaussian model, construct a sequence of frequency-localized perturbations showing that inverse gain is unbounded as frequency increases. Explain how the finite sampled case differs.
5. A photon-count observation has expected counts 16 and 625 at two pixels. Find the variances, standard deviations, and relative standard deviations. Explain why the centered errors are not identically distributed.
6. For a nonzero singular value $s$, a perturbation of magnitude $\eta$ along the corresponding left singular vector is amplified to magnitude $\eta/s$ by exact inversion. Derive this statement and relate it to the smallest singular value.

## Computational Exercise

7. Generate synthetic observations of a fixed target using several Gaussian blur strengths and additive Gaussian noise levels. Compare exact-PSF naive inverse filtering with a mismatched PSF. Record denominator thresholds, floating-point error, and residuals before clipping. Choose thresholds on separate calibration targets, and report held-out performance without retuning.

## Discussion

8. A reconstruction has a near-zero forward residual but contains a false feature. Explain how this can occur even if the forward model is correct.
