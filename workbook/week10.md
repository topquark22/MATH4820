# Week 10 — Learned Restoration and Generative Artifacts

*Companion exercises for [Day 1](../lectures/week10-day1.md) and [Day 2](../lectures/week10-day2.md). See [Workbook](README.md) for conventions.*

## Mathematical Exercises

1. For $g=Hf+n$, derive the MAP objective under isotropic Gaussian noise with variance $\sigma^2$ and a proper Gaussian prior with precision $\gamma L^*L$. State the equivalent Tikhonov parameter.
2. A linear grayscale imaging operator maps a 128-by-128 raster to a 32-by-32 raster. Give a lower bound on its null-space dimension and explain what a neural prior can and cannot resolve.
3. Three scalar originals, 0, 1, and 3, have conditional probabilities 0.2, 0.5, and 0.3 given the same observation. Compute the conditional mean, a MAP estimate, and the expected squared error for each.
4. For two distinct originals with identical observations, prove that at least one of the two reconstruction errors is at least half their separation in a normed space.
5. Let $\alpha_1=0.8$ and $\alpha_2=0.9$ in the forward diffusion model. Compute $\bar\alpha_2$ and the conditional mean and variance of $x_2$ given scalar $x_0$.
6. Two unit-normalized image embeddings have cosine similarity 0.8. Compute their Euclidean distance. Explain why neither score, alone, proves identity preservation.

## Computational Exercise

7. Compare bicubic upsampling with a conventional regularized method and an available learned restoration method on independent synthetic or appropriately consented adult reference imagery. Record model and checkpoint identifiers, settings, failures, feature-specific errors and reference metrics. Use precomputed instructor outputs if model execution is unavailable. Do not select the visually best output retrospectively as the reported test result.

## Discussion

8. Distinguish detection of generative processing from attribution of individual synthesized features. Explain how the same generative capacity can be problematic for forensic restoration but potentially useful for privacy engineering.
