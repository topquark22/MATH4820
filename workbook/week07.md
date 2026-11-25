# Week 7 — Synthesis and Reconstruction Challenges

*Companion exercises for [Day 1](../lectures/week07-day1.md) and [Day 2](../lectures/week07-day2.md). See [Workbook](README.md) for conventions.*

## Review Exercises

1. Classify the stages of $g=Q(HW_\theta f+n)$ by invertibility in the ideal continuous model and in the actual discrete model. State the assumptions needed for each classification.
2. Suppose $W$ and $H$ are invertible linear operators. Derive the inverse of $HW$. Construct a two-dimensional matrix example for which the opposite order gives a different result.
3. Let $H$ be diagonal with entries 1 and 0.01, and let $g=(1,0.02)$. Compute the naive inverse and the identity-penalty Tikhonov estimate with $\lambda=0.01$. Discuss the effect of perturbing the second observation by 0.01.
4. Explain how the choice of a denominator threshold or a stopping rule can inadvertently leak held-out ground truth into an experiment.
5. Distinguish additive Gaussian noise from Poisson-count observations. Specify a suitable objective for each and explain why their residual statistics differ.

## Computational Challenge

6. Create a synthetic text or geometric target and degrade it using a warp, motion blur, and noise. Use a separate calibration target to select restoration parameters. Compare two operator orderings and report residuals and reference error only after recording the test outputs.
7. Construct two distinct targets that yield the same degraded observation using a non-injective linear operator. Apply a reconstruction method to the shared observation and explain what cannot be inferred.

## Discussion

8. A reconstruction appears to reveal an extra character stroke. Describe how you would distinguish an investigative hypothesis from a scientifically supported conclusion. This is a practice question, not a midterm examination question.
