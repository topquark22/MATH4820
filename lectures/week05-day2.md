# Week 5, Day 2 — Wiener Filtering, Richardson–Lucy, and Blind Deconvolution

*90-minute lecture. Week 5 Day 2 introduces these restoration methods; Week 6 develops them further for regularized and iterative restoration. See `syllabus/weekly-schedule.md` for the clarified sequence.*

> **Assumptions and cautions:**
> - Wiener filtering below is the linear minimum-mean-square-error (LMMSE) estimator for a stationary signal and additive, uncorrelated noise with known power spectra. Practical spectra are estimated, not known exactly.
> - Standard Richardson–Lucy (RL) is derived for nonnegative data under a Poisson observation model and a known, nonnegative, normalized PSF. It is not the standard solution for additive Gaussian noise; use a Gaussian likelihood / least-squares method or a model designed for mixed Poisson–Gaussian noise.
> - Blind deconvolution is underdetermined unless the image and PSF are constrained. A plausible-looking output is not proof that the unknown image or PSF was uniquely recovered.
> - These methods manage the instability from Day 1 by introducing statistical assumptions, constraints, or priors. They do not reconstruct information that the measurement has completely erased.

## Learning Objectives

By the end of this session students can:

1. Explain how Wiener filtering trades inverse gain against a signal-to-noise prior and interpret its frequency response.
2. State the assumptions behind standard Richardson–Lucy and carry out one iteration on a small example.
3. Explain why RL stopping time affects noise and why standard RL is not a generic Gaussian-noise solver.
4. Identify the ambiguities in blind deconvolution and describe constraints that make estimation more meaningful.
5. Choose a method based on the blur, noise model, and availability of the PSF, and state what remains uncertain.

## Timed Outline (90 min)

| Min | Segment |
|-----|---------|
| 5 | Recap: ill-posedness and naive inversion (Day 1) |
| 20 | Wiener filtering and the SNR-dependent inverse |
| 5 | Worked frequency-bin example |
| 5 | Break |
| 20 | Richardson–Lucy: Poisson model and iteration |
| 20 | Blind deconvolution and identifiability |
| 15 | Method comparison, case-selection activity, and wrap-up |
| **90** | **Total** |

## Content Notes

### 1. Recap: regularization as a response to instability (5 min)

For the forward model `b = h * f + n`, naive inverse filtering gives `F̂ = B/H` and amplifies noise wherever `|H|` is small. Day 1 established that this is a stability failure. Today’s methods do not simply divide by `H`: they use noise statistics, physical constraints, or prior information to avoid trusting frequencies that the observation cannot support.

### 2. Wiener filtering (25 min)

Assume a spatially stationary image and additive noise, with the image and noise uncorrelated. Let `S_f(ν)` and `S_n(ν)` denote their power spectral densities. The frequency-domain LMMSE Wiener estimate is

$$
\widehat F_{\mathrm W}(\nu) =
\frac{H^*(\nu)}{|H(\nu)|^2 + S_n(\nu)/S_f(\nu)}\,B(\nu).
$$

Here `H*` is the complex conjugate transfer function. The ratio `S_n/S_f` is the noise-to-signal power ratio at each frequency. Where the signal is strong relative to noise and `H` is reliable, the filter behaves approximately like an inverse. Where the signal is weak or noise dominates, it suppresses the frequency instead of applying an arbitrarily large inverse gain.

For a simplified model with a constant ratio `K`, a commonly used form is

$$
\widehat F_{\mathrm W} = \frac{H^*}{|H|^2+K}B.
$$

This is not an exact universal choice of `K`: it approximates the spectral ratio and its performance depends on the image, blur, noise, and frequency. Increasing `K` makes the estimate more conservative (less noise amplification, more residual blur); decreasing it makes the estimate sharper but more sensitive to noise. The result is a bias–variance trade-off.

**Connection to Tikhonov regularization:** minimizing `||h*f-b||_2^2 + λ||f||_2^2` gives, frequency by frequency,

$$
\widehat F(\nu) = \frac{H^*(\nu)}{|H(\nu)|^2+\lambda}B(\nu).
$$

This has the same algebraic form as the constant-`K` Wiener filter, but the rationale differs: Tikhonov specifies a penalty, while Wiener filtering specifies a statistical estimator and a signal/noise model. Replacing `||f||_2^2` with a smoothness penalty such as `||∇f||_2^2` changes the frequency weighting and encodes a different prior.

**Worked frequency-bin example:** let `|H|=0.1`, `B=H F+N`, and use constant `K=0.01`. Naive inversion has gain `10`. The Wiener factor has magnitude `|H|/(|H|^2+K)=0.1/0.02=5`; it accepts less of the noisy measurement. If `|H|=0.01`, naive gain is `100`, while the Wiener factor is approximately `0.01/(0.0001+0.01)≈0.99`. The weakly transmitted bin is strongly down-weighted rather than exploded.

### 3. Richardson–Lucy (20 min)

For photon-limited imaging, model each observed pixel as a Poisson count with expected value `(Hf)_i`, where `H` is the blur operator and `f` is nonnegative. Given a known nonnegative PSF, standard RL iterates

$$
f^{(k+1)} = f^{(k)} \odot H^*\!\left(\frac{b}{Hf^{(k)}}\right),
$$

where division and `⊙` are elementwise, and `H*` is the adjoint blur operator (convolution with the flipped PSF, plus the corresponding boundary convention). For a normalized PSF and suitable boundary handling, this update is the standard Poisson maximum-likelihood iteration. Initialize with a positive image; a zero-valued prediction in the denominator requires careful numerical handling, not an arbitrary claim of recovered data.

Interpretation: compare observed counts `b` to the counts predicted by the current estimate `Hf`; back-project this ratio through the adjoint PSF and multiply it into the estimate. The method preserves nonnegativity. It can sharpen edges without an explicit Fourier division, but its behavior still depends on the assumed PSF and likelihood.

- **Stopping is regularization:** early iterations often give a useful compromise. Continued iterations can fit noise and model error, so more iterations do not guarantee a better reconstruction.
- **Poisson versus Gaussian:** standard RL is appropriate for Poisson counts, not arbitrary additive Gaussian noise. Gaussian-noise restoration is commonly posed as a least-squares data term plus a regularizer. Low-light sensors may have both photon (Poisson) and read (approximately Gaussian) noise; use a corresponding mixed-noise model or state the approximation.
- **PSF errors matter:** a mismatched kernel can cause ringing, artifacts, or biased structure, even when the iteration is implemented correctly.

A small board exercise: students apply one iteration to a three-pixel observation with a short normalized blur kernel. Focus on the predicted counts, observed-to-predicted ratios, and back-projection; do not treat arithmetic repetition as evidence that the estimate is correct.

### 4. Blind deconvolution (20 min)

When the PSF is unknown, both the image and blur kernel must be estimated:

$$
\min_{f,h}\;\mathcal L(h*f,b) + \lambda_f R_f(f) + \lambda_h R_h(h),
$$

subject to constraints such as `h ≥ 0`, `sum(h)=1`, and finite support. `L` is a data-fit term selected for the noise model; `R_f` and `R_h` encode image and kernel priors.

The problem is intrinsically ambiguous without constraints. For example:

- **Scale ambiguity:** multiplying `f` by a constant and dividing `h` by the same constant leaves the convolution unchanged. Normalizing `sum(h)=1` removes this particular ambiguity.
- **Shift ambiguity:** shifting one factor and oppositely shifting the other can leave the observation unchanged, subject to boundaries.
- **Trivial solutions:** a delta-like kernel paired with the blurred observation, or an overly flexible kernel that absorbs image structure, may fit the data but not represent the physical blur.

A common strategy alternates: hold `h` fixed and estimate `f`, then hold `f` fixed and estimate `h`, repeating with constraints and priors. This can settle in local minima and is sensitive to initialization, kernel support, noise, and the chosen prior. Additional information—calibration images, multiple observations, known motion limits, or a plausible kernel family—can greatly reduce ambiguity. Report uncertainty and assumptions rather than presenting a single blind estimate as uniquely determined.

### 5. Compare and choose (15 min)

| Method | PSF known? | Typical model / prior | Main benefit | Main limitation |
|--------|------------|-----------------------|--------------|-----------------|
| Wiener | Yes | Stationary signal/noise spectra; linear MMSE | Fast frequency-wise filtering; attenuates unreliable bands | Requires useful spectral estimates; may leave blur or suppress real detail |
| Richardson–Lucy | Yes | Nonnegative Poisson counts | Iterative likelihood-based restoration with positivity | Standard form mismatches Gaussian noise; late iterations fit noise; PSF errors propagate |
| Blind deconvolution | No | Data fit plus image/kernel constraints | Can estimate blur and image jointly | Underdetermined, initialization-sensitive, and prior-dependent |

**Case-selection activity:** assign groups three situations: (a) calibrated Gaussian blur with estimated stationary noise power; (b) a low-light photon-count image and calibrated PSF; (c) a single photograph with unknown camera motion. Ask each group to select a method or combination, name the key assumption, and identify one failure mode. Reasonable first choices are Wiener for (a), standard RL for (b), and constrained blind estimation for (c), while emphasizing that (c) is the least identifiable and no method guarantees recovery of lost detail.

Wrap-up: regularization stabilizes an inverse by deciding which solutions are plausible; it does not reveal what the data never measured. Week 6 will deepen this introduction through regularization choices, parameter selection, and practical restoration. The syllabus schedules regularized text/plate restoration as Lab 4 in Week 6.

## Key Definitions Summary

- **Wiener filter:** an LMMSE frequency-domain estimator weighted by the signal-to-noise power ratio.
- **Richardson–Lucy:** a multiplicative Poisson-likelihood iteration for nonnegative data with a known PSF.
- **Blind deconvolution:** joint estimation of an image and its unknown blur kernel.
- **Regularization:** assumptions or penalties that stabilize an ill-posed estimate by preferring some solutions over others.

## Exercises

1. For `|H|=0.05` and constant `K=0.0025`, compare the magnitudes of the naive inverse gain and Wiener gain `|H|/(|H|^2+K)`. Which filter is more conservative?
2. In words, interpret each term in one RL update. Why is the adjoint blur used to back-project the ratio?
3. A camera image has additive Gaussian read noise. Is standard RL automatically the right likelihood model? What would you change or verify?
4. Give one scale ambiguity and one shift ambiguity in blind deconvolution. Name a constraint that removes the scale ambiguity and an additional source of information that can help identify the PSF.
5. An RL result becomes increasingly grainy as iterations continue. Explain why more iterations may worsen the estimate and suggest one evaluation method that does not rely only on visual sharpness.

## Instructor Answer Sketch

1. Naive gain is `1/0.05=20`. Wiener gain is `0.05/(0.0025+0.0025)=10`; Wiener is more conservative.
2. Blur the current estimate to predict the observation; divide observed counts by predicted counts; apply the adjoint PSF to back-project the discrepancy; multiply the current estimate by that correction. The adjoint maps observation-space corrections back to image space consistently with the forward operator.
3. No. Standard RL assumes Poisson counts. Use an additive-Gaussian data term/regularized least squares, or a model that accounts for both Poisson and Gaussian components; validate the noise model.
4. Scale: `f' = c f`, `h' = h/c` gives the same convolution; `sum(h)=1` fixes this scale. Shift: shift `f` one way and `h` the other. Calibration, known motion bounds, or multiple observations can help constrain the kernel.
5. Iterations can fit noise and PSF/model mismatch as well as signal. With a known test image, compare error metrics and residuals across iteration counts; for real evidence, preserve and report the method and assumptions, and do not infer correctness from sharpness alone.
