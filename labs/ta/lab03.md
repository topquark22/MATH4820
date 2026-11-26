# TA Guide — Lab 3: Naive Deconvolution

[Student specification](../lab03.md) · [Week 4 Day 1](../../lectures/week04-day1.md) · [Day 2](../../lectures/week04-day2.md) · [Week 5 Day 1](../../lectures/week05-day1.md) · [Day 2](../../lectures/week05-day2.md) · [Workbook Week 4](../../workbook/week04.md) and [Week 5](../../workbook/week05.md).

## Preparation

Provide a small asymmetric kernel and array for direct convolution checks, an impulse, constant field, and independently generated sharp-edged synthetic targets. Use float64 normalized intensities; distinguish a normalized sampled/truncated Gaussian PSF from the ideal continuous transfer function. For circular convolution, place the stated PSF origin at index zero before FFT. For full linear convolution, pad each axis to at least the sum of the corresponding input and kernel sizes minus one. State cropping explicitly.

Use the specified blur strengths and propose a noise standard-deviation sweep of 0, 0.001, 0.005, 0.01, 0.02 on the normalized scale, subject to instructor approval. Use independent seeded noise realizations and document the observation order: blur, additive noise, then quantization/clipping where applicable. Do not silently clip floating-point observations.

## Week 4 session

| Minutes | Activity |
|---------|----------|
| 0–10 | DFT normalization and origin |
| 10–25 | Direct versus FFT convolution |
| 25–40 | Generate and inspect motion and Gaussian kernels |
| 40–50 | Compare boundary conventions |
| 50–60 | Verify and record forward model |

## Week 5 session

| Minutes | Activity |
|---------|----------|
| 0–10 | Predict inverse gain and null directions |
| 10–25 | Noiseless and noisy checks |
| 25–40 | Quantization and noise sweep |
| 40–50 | Model/boundary mismatch |
| 50–60 | Record configuration; plan independent scoring |

## Reference checkpoints

- Linear convolution of (1,2,3,4) with (1,1) is (1,3,5,7,4); length-four circular convolution is (5,3,5,7).
- Circular convolution of a unit impulse reproduces the correctly positioned PSF; a unit-sum kernel preserves a constant field under circular boundaries.
- The length-four kernel (1/2,1/2,0,0) has an exact null at frequency index 2. The alternating vector is annihilated.
- At transfer magnitude 0.02, a noise magnitude 0.004 gives inverse error magnitude 0.2; at 0.0002 it gives 20.
- Compare direct and FFT convolution to a declared float64 tolerance. Inspect imaginary residuals before discarding them; a significant imaginary component can signal an incorrect frequency model.
- An exact zero is not merely a small denominator. Mark unavailable components explicitly; report any threshold or truncation and treat it as a modified inverse.
- Record error and residual before display clipping. A lower residual alone does not establish a better reconstruction.

## Diagnostic assistance

Shifted output suggests PSF origin error. Wraparound suggests a boundary mismatch. A constant-field change suggests normalization error. Unexpected complex output suggests lost conjugate symmetry. Huge values may be legitimate instability, not a software defect: compare the measured amplification with the transfer magnitude. In a mismatched case distinguish signal-model error from noise amplification.

## Suggested marking

Forward model and sanity tests 25%; inversion and documented numerical safeguards 25%; controlled comparisons 30%; Hadamard analysis and reproducibility 20%.

Optional extension: compare the ideal Gaussian log-gain curves in the lecture with sampled kernel responses. CPU-only; reduce image dimensions or use precomputed forward observations if needed.
