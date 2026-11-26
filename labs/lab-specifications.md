# Laboratory Curriculum

[Teaching Assistant Laboratory Manual](ta/README.md) — preparation, numerical checks, diagnostic guidance, and report templates.

## Detailed Laboratory Specifications

The source draft describes six labs, alternating between guided implementation and evaluation / red-teaming / validation, and a two-week capstone project. Each scheduled lab session is one hour; multi-part labs span several weeks and may require preparation and work outside the scheduled session. The individual specifications linked below are working drafts for further development; this file retains the curriculum overview.

**Experimental protocol (Labs 2–4):** Known-reference exercises may be used for development and calibration. For independent reconstruction evaluation, reserve separate synthetic test images and withhold clean references, hidden degradation parameters (in blind cases), and noise realizations from the reconstruction procedure. Select settings on calibration data or by a predeclared observation-only rule, record the estimates and settings, then reveal ground truth for scoring. Label reference-tuned results as exploratory or oracle benchmarks, not held-out performance.

### Lab 1: Discrete Grids, Interpolation, and Resampling Artifacts

[Individual specification](lab01.md)

- **Aligned lecture:** Week 1 (Continuous vs. Discrete Image Spaces)
- **Objective:** Quantify how mapping continuous coordinates $(x, y) \in \mathbb{R}^2$ onto discrete pixel grids $\mathbb{Z}^2$ introduces irreversible high-frequency loss.
- **Tasks:**
  - Implement nearest-neighbor, bilinear, and bicubic resampling kernels from scratch in `NumPy`.
  - Apply repeated sub-pixel translations and rotations (for example, 36 increments of $10^\circ$) to a test target and measure cumulative Peak Signal-to-Noise Ratio (PSNR) and Structural Similarity (SSIM) decay.
- **Deliverable:** Python module and a short analytical plot comparing spatial-frequency attenuation across interpolation kernels.

### Lab 2: Geometric Unwarping and Blind Parameter Estimation (*Operation Vico* Simulation)

[Individual specification](lab02.md)

- **Aligned lectures:** Weeks 2–3 (Geometric Warping, Swirl Ciphers, and JPEG Quantization)
- **Objective:** Reverse a nonlinear radial swirl when center $(x_0, y_0)$, radius $R$, and twist angle $\theta_{\max}$ are unknown.
- **Tasks:**
  - Implement forward and inverse radial swirl transformation $T: \mathbb{R}^2 \to \mathbb{R}^2$.
  - Build a coarse-to-fine optimization search using Sobel gradient magnitudes and bilateral facial / object symmetry metrics to estimate unknown swirl parameters automatically.
  - Repeat after saving the swirled image at JPEG quality factors $Q = 95, 75, 50$ to observe how $8 \times 8$ DCT block quantization degrades inversion.
- **Deliverable:** Automated unwarping script and error-surface heatmap showing parameter convergence under clean vs. JPEG-compressed inputs.

### Lab 3: The Noise Explosion in Naive Deconvolution

[Individual specification](lab03.md)

- **Aligned lectures:** Weeks 4–5 (Days 1–2 of each week) (DFT/convolution foundations, ill-posedness, and naive-inversion failure analysis)
- **Objective:** Demonstrate empirically why naive inverse filtering fails on blurred digital images and relate the failure to noise amplification, PSF mismatch, and boundary assumptions.
- **Part A — Week 4:** Generate synthetic motion-blurred and Gaussian-blurred images ($\sigma = 1.5, 3.0, 5.0$) using 2D Fast Fourier Transforms (`numpy.fft.fft2`). Inspect the PSFs and transfer-function magnitudes, and compare the forward blur under the documented boundary convention.
- **Part B — Week 5:** Apply naive frequency-domain division to floating-point noiseless images, then repeat with 8-bit quantization and increasing Gaussian sensor noise ($\sigma_{\text{noise}} = 0.01$). Sweep blur strength, test a slightly mismatched PSF and boundary convention, and report any denominator threshold used.
- **Deliverable:** Jupyter notebook with paired Part A/Part B experiments, inverse-gain and reconstruction plots, reference-based error measurements, and a short Hadamard stability / model-mismatch analysis. Keep clipped display images separate from reported floating-point metrics.

### Lab 4: Regularized and Iterative Deconvolution

[Individual specification](lab04.md)

- **Aligned lectures:** Week 6 Days 1–2 (Tikhonov/Wiener regularization, Richardson–Lucy, and blind deconvolution); results support the Week 7 practical challenge.
- **Objective:** Compare stabilized restoration methods under stated PSF and noise assumptions, and test how uncertainty about the PSF changes the result.
- **Tasks:**
  - Implement Tikhonov and Wiener deconvolution; sweep regularization parameter / inverse SNR across noise levels and compare the bias–variance trade-off.
  - Apply Richardson–Lucy to nonnegative Poisson-count data with a known PSF. Compare Gaussian-noise cases with a Gaussian data-fit objective (such as Tikhonov); do not treat standard RL as a generic Gaussian-noise method. Examine iteration count and residuals.
  - Generate Poisson observations by sampling counts with mean $(Hf)_i$ (using a documented count scale), rather than adding an independent Poisson draw to the blurred image. Contrast the intensity-dependent count variance with fixed-variance additive Gaussian noise. Choose iteration counts and regularization parameters on calibration examples or by a predeclared observation-only rule before scoring held-out cases.
  - Run a small constrained blind-deconvolution experiment with unknown motion-blur kernel support. Enforce nonnegativity and PSF normalization, compare the estimated kernel with ground truth, and document ambiguity or initialization sensitivity. This is a controlled comparison, not a claim of unique recovery.
  - Compare method limits on linear motion blur versus Gaussian blur of similar support.
- **Deliverable:** Comparative benchmark table and restored-image gallery for text / synthetic plate targets, including parameter or stopping choices, noise-model assumptions, reference metrics, residuals, and a blind-PSF estimate with limitations.

### Lab 5: Forensic Validation and Detecting AI Hallucinations

[Individual specification](lab05.md)

- **Aligned lectures:** Weeks 8–10 (Chain of Custody, SWGDE Standards, and Generative Boundaries)
- **Objective:** Build an evidentiary audit pipeline and test whether generative restoration introduces unsupported identifying features; assess the implications for evidentiary reliability.
- **Tasks:**
  - **Part A — Week 8:** Create a reproducible forensic wrapper in Python that verifies a working copy against a protected acquisition digest, records SHA-256 output hashes, logs transformation parameters and execution details, and compares repeated runs.
  - **Part B — Week 9:** Run automated forward-and-reverse control tests on independent reference images, informed by SWGDE guidance; measure artifacts and false identifying features.
  - **Part C — Week 10:** Run an open-source neural face-restoration model (for example, GFPGAN or CodeFormer) on heavily downsampled / blurred synthetic or appropriately consented portraits of distinct individuals and assess identity drift and unsupported features against ground truth.
- **Deliverable:** Mock Forensic Examination Report documenting integrity, reproducibility, validation results, limitations, and their implications under the legal frameworks and technical guidance discussed in Weeks 9–10. No single report format guarantees admissibility.

### Lab 6: Red-Teaming Naive Redaction and Deploying DeepPrivacy2

[Individual specification](lab06.md)

- **Aligned lectures:** Weeks 11–13 (Forward-Matching Attacks, Street View Pipelines, and Zero-Leakage GANs)
- **Objective:** Break weak redaction via forward-matching, then deploy a privacy pipeline intended to prevent recovery.
- **Tasks:**
  - **Part A — Attack:** Given a Gaussian-blurred or pixelated seven-character license plate rendered in a known font, write a forward-blur matcher over a tractable, explicitly defined synthetic candidate set and measure recovery accuracy without inverting the blur.
  - **Part B — Defense:** Implement a Street View-style noise-injected blur (Gaussian blur plus $N(0, \sigma_{\text{noise}})$ noise and alpha-blending) and measure whether and under what conditions the forward-matching attack fails. Failure of one tested attack does not establish irreversible redaction.
  - **Part C — Generative anonymization:** Deploy DeepPrivacy2 on a sample street-scene image and short video clip; verify pixel masking in the protected region and inspect frame-to-frame temporal consistency.
- **Deliverable:** Attack / defense benchmark script and anonymized-video output analysis.

### Capstone Project

[Individual specification](capstone.md)

The Week 14 capstone culminates in a demonstration and final red-team evaluation of an end-to-end anonymization pipeline. Evaluate both re-identification resistance and downstream computer-vision utility (for example, mAP or pose-estimation accuracy).
