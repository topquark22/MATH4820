# TA Guide — Lab 1: Resampling

[Student specification](../lab01.md) · [Week 1 Day 1](../../lectures/week01-day1.md) · [Day 2](../../lectures/week01-day2.md) · [Workbook Week 1](../../workbook/week01.md), especially Exercises 5–8.

## Preparation

Prepare float64 grayscale arrays: a constant 0.4 field, a checkerboard, a horizontal ramp, sampled sinusoids at several frequencies, and a centered asymmetric geometric target on a 128-by-128 or larger grid. These are public calibration examples. State pixel-center convention, boundary rule, Keys cubic parameter (a = -0.5), and whether repeated operations are measured on a common valid interior or full canvas. Pretest SSIM with the declared data range and a sufficiently large image; introduce PSNR using the shared protocol rather than presupposing Fourier analysis.

Students implement nearest, linear and cubic weights in NumPy; OpenCV may provide an independent comparison, not replace the assessed implementation. Define nearest-neighbor tie handling explicitly.

## One-hour session

| Minutes | Activity |
|---------|----------|
| 0–10 | Coordinate convention, interpolation and metric definitions |
| 10–25 | Kernel support and small hand-calculated checks |
| 25–40 | Backward mapping and constant/ramp tests |
| 40–50 | Repeated translations and rotations |
| 50–60 | Inspect plots, distinguish boundary loss, plan completion |

Complete the longer rotation sweep outside the session.

## Reference checkpoints

- Bilinear interpolation of corner values 20, 60, 100, 140 in the workbook's coordinate convention at (0.25, 0.75) gives 90.
- Integer sample positions reproduce the samples. Interior constant fields are preserved for partition-of-unity kernels.
- A half-sample periodic linear shift of alternating zeros and ones produces a constant 0.5 field; the opposite shift cannot undo the loss. MSE against the original is 0.25; PSNR with L = 1 is approximately 6.0206 dB.
- Compare 36 successive ten-degree rotations with one composed 360-degree rotation on the same grid. The latter is mathematically the identity; roundoff and boundary handling must be documented.
- Measure amplitude of a sampled sinusoid by fitting its sine and cosine components, including phase and offset. This requires no formal DFT. Compare input and output amplitudes on matched support; constant and Nyquist special cases need separate treatment. Do not assert monotone decay of every metric for every kernel and target.

## Diagnostic assistance

| Symptom | Check |
|---------|-------|
| Transposed or rotated wrong way | Row/column versus x/y, inverse coordinate map, screen y direction |
| Constant changes in interior | Weight sum, support, normalization |
| Identity transform changes samples | Pixel-center offset, rounding, incorrect integer-index handling |
| Dark corners dominate error | Padding/cropping and common evaluation support |
| Cubic overshoots | Negative lobes may be expected; inspect unclipped values |
| SSIM error | Window size, channel axis, floating-point data range |

Progressive hints: ask for four weights at a hand-computed point; inspect a one-dimensional ramp; use a constant image to separate kernel errors from mapping errors; only then inspect the rotation code.

## Suggested marking

Kernel implementation 30%; mapping and controls 25%; quantitative experiments 25%; interpretation and reproducibility 20%. Assess correct diagnostics, not a prescribed ordering of kernel performance.

Optional extension: compare integer shifts, half shifts, and one composed transform; connect to Week 4 frequency response later. CPU-only execution is sufficient.
