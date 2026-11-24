# Week 6, Day 2 — Richardson–Lucy and Blind Deconvolution

*90-minute lecture. Source: Week 6 of `syllabus/weekly-schedule.md` ("Regularized and Iterative Deconvolution in Practice"). Applies model-aware iterative restoration and addresses the case where the PSF is unknown.*

> **Assumptions and cautions:**
> - Standard Richardson–Lucy (RL) is derived for nonnegative data under a Poisson observation model and a known, nonnegative, normalized PSF. It is not the standard solution for additive Gaussian noise.
> - Blind deconvolution is underdetermined unless the image and PSF are constrained. A plausible fit does not prove that the recovered image or PSF is unique or physically correct.
> - Boundary handling, PSF normalization, noise model, and stopping criteria affect the result. State them when comparing reconstructions.

## Learning Objectives

By the end of this session students can:

1. Derive the standard RL update from the Poisson blur model and explain the role of the adjoint PSF.
2. Explain how initialization and stopping time act as practical constraints on RL estimates.
3. Distinguish the Poisson likelihood used by standard RL from additive-Gaussian restoration objectives.
4. Identify scale, shift, and trivial-solution ambiguities in blind deconvolution.
5. Describe how constraints, priors, and external calibration can make blind estimation more meaningful without guaranteeing uniqueness.

## Timed Outline (90 min)

| Min | Segment |
|-----|---------|
| 5 | Recap: Week 6 regularized inverse filters |
| 20 | Poisson observation model and RL derivation |
| 15 | One iteration and stopping behavior |
| 5 | Break |
| 20 | Blind deconvolution and identifiability |
| 15 | Compare noise models and controlled restoration workflow |
| 10 | Lab 4 planning and synthesis |
| **90** | **Total** |

## Content Notes

### 1. From a known PSF to an iterative model (5 min)

Tikhonov and Wiener filtering in Day 1 assume a known PSF and stabilize the inverse using a penalty or signal/noise statistics. Today starts with a different observation model and then removes the known-PSF assumption.

### 2. Richardson–Lucy for Poisson data (20 min)

For photon-limited imaging, model each observed pixel as a Poisson count with expected value `(Hf)_i`, where `H` is the blur operator and `f` is nonnegative. Under a known nonnegative PSF, standard RL iterates

$$
f^{(k+1)}=f^{(k)}\odot H^*\!\left(\frac{b}{Hf^{(k)}}\right),
$$

where division and `⊙` are elementwise, and `H*` is the adjoint blur (convolution with the flipped PSF, under the corresponding boundary convention). For a normalized PSF and suitable boundary handling, this is the standard Poisson maximum-likelihood update. Initialize with a positive image; near-zero predicted counts need careful numerical handling.

The update has three steps: blur the current estimate to predict counts; form observed-to-predicted ratios; back-project the ratios through the adjoint and multiply the estimate by the correction. Positivity is preserved. If the PSF or observation model is wrong, the iteration can converge to a biased or artifact-filled estimate.

### 3. Iterations, noise models, and stopping (15 min)

More iterations do not always mean a better reconstruction. Early stopping can act as regularization; later iterations can fit noise and PSF error. On synthetic data, compare multiple iteration counts against the known reference and inspect residuals.

Standard RL is not a generic method for additive Gaussian noise. Gaussian-noise restoration is commonly posed with a squared-error data term and a regularizer. Low-light sensor data may combine Poisson photon counts with approximately Gaussian read noise; use a mixed-noise likelihood or explicitly state the approximation. Do not silently use standard RL and describe it as a Gaussian-noise estimator.

For a board exercise, take a small nonnegative image, apply a short normalized blur, and perform one RL update. Track the predicted counts, ratio, adjoint back-projection, and updated estimate. Discuss why the result alone does not establish that the model assumptions hold.

### 4. Blind deconvolution and identifiability (20 min)

When the PSF is unknown, estimate both image and kernel:

$$
\min_{f,h}\;\mathcal L(h*f,b)+\lambda_f R_f(f)+\lambda_h R_h(h),
$$

subject to constraints such as `h ≥ 0`, `sum(h)=1`, and finite support. The loss `L` should reflect the observation noise; `R_f` and `R_h` encode image and kernel priors.

Without constraints the problem has ambiguities:

- **Scale:** `f'=c f`, `h'=h/c` gives the same convolution. A normalization such as `sum(h)=1` removes this particular ambiguity.
- **Shift:** shifting the image and oppositely shifting the kernel can leave the convolution unchanged, subject to boundaries.
- **Trivial fits:** a delta kernel with the blurred observation as the image, or an over-flexible kernel that absorbs image structure, can fit data without identifying the physical blur.

A common algorithm alternates between estimating `f` with `h` fixed and estimating `h` with `f` fixed. Constraints such as known kernel support, nonnegativity, normalization, and plausible motion limits reduce the solution space. Calibration images, multiple observations, or known camera-motion information can help further. Alternating optimization can still be initialization-sensitive and settle in local minima; communicate uncertainty and assumptions.

### 5. Controlled method comparison and Lab 4 (25 min)

Compare methods using a known test image and matched synthetic degradations:

| Method | PSF known? | Observation model / prior | Main limitation |
|--------|------------|---------------------------|-----------------|
| Tikhonov / Wiener (Day 1) | Yes | Quadratic penalty or stationary signal/noise spectra | Parameter or spectrum mismatch; residual bias |
| Richardson–Lucy | Yes | Nonnegative Poisson counts | Noise-model mismatch, late-iteration noise, PSF error |
| Blind deconvolution | No | Data fit plus image/kernel constraints | Ambiguity, local minima, prior dependence |

Have students choose which method fits (a) calibrated blur with stationary noise estimates, (b) photon counts with a calibrated PSF, and (c) a single image with unknown motion blur. Require them to state assumptions and one failure mode. Lab 4 should compare regularized text/plate restoration under controlled blur and noise, using reference metrics where the original is known. Report PSF knowledge, noise model, parameter/iteration choice, residuals, and artifacts—not just visual sharpness.

## Key Definitions Summary

- **Richardson–Lucy:** a multiplicative maximum-likelihood iteration for nonnegative Poisson data with a known PSF.
- **Adjoint PSF:** maps observation-space corrections back into image space in an update consistent with the forward blur operator.
- **Blind deconvolution:** joint estimation of an image and its unknown blur kernel.
- **Identifiability:** whether the observations and assumptions determine a unique image/kernel pair.

## Exercises

1. In one RL update, what does `b/(Hf^(k))` measure, and why is it back-projected with `H*`?
2. A blurred camera image has additive Gaussian read noise. Is standard RL automatically appropriate? Name a better model or objective.
3. Explain the scale ambiguity in blind deconvolution and how PSF normalization addresses it.
4. Give one way to reduce shift or trivial-solution ambiguity, and one reason the resulting estimate may still depend on initialization.
5. Why can early stopping improve a noisy RL estimate? How would you select an iteration count on synthetic data?

## Instructor Answer Sketch

1. It is the observed-to-predicted count ratio; the adjoint maps that correction back to the latent image grid consistently with the forward operator.
2. No. Standard RL assumes Poisson counts. Use a Gaussian least-squares data term plus regularization, or a validated Poisson–Gaussian model for mixed noise.
3. Scaling `f` by `c` and `h` by `1/c` leaves `h*f` unchanged. Requiring `sum(h)=1` fixes this scale degree of freedom.
4. Fix kernel support/centroid or add calibration/motion information; alternating optimization remains nonconvex and can settle in local minima.
5. Later iterations may fit noise and PSF mismatch. With a known reference, compare error and residuals over iteration count on validation examples, not just apparent sharpness.
