# Laboratory Curriculum

## Detailed Laboratory Specifications

The source draft describes six labs, alternating between guided implementation and evaluation / red-teaming / validation, and a two-week capstone project. Each lab is designed around a one-hour weekly lab session.

### Lab 1: Discrete Grids, Interpolation, and Resampling Artifacts

- **Aligned lecture:** Week 1 (Continuous vs. Discrete Image Spaces)
- **Objective:** Quantify how mapping continuous coordinates $(x, y) \in \mathbb{R}^2$ onto discrete pixel grids $\mathbb{Z}^2$ introduces irreversible high-frequency loss.
- **Tasks:**
  - Implement nearest-neighbor, bilinear, and bicubic resampling kernels from scratch in `NumPy`.
  - Apply repeated sub-pixel translations and rotations (for example, 36 increments of $10^\circ$) to a test target and measure cumulative Peak Signal-to-Noise Ratio (PSNR) and Structural Similarity (SSIM) decay.
- **Deliverable:** Python module and a short analytical plot comparing spatial-frequency attenuation across interpolation kernels.

### Lab 2: Geometric Unwarping and Blind Parameter Estimation (*Operation Vico* Simulation)

- **Aligned lectures:** Weeks 2–3 (Geometric Warping, Swirl Ciphers, and JPEG Quantization)
- **Objective:** Reverse a nonlinear radial swirl when center $(x_0, y_0)$, radius $R$, and twist angle $\theta_{\max}$ are unknown.
- **Tasks:**
  - Implement forward and inverse radial swirl transformation $T: \mathbb{R}^2 \to \mathbb{R}^2$.
  - Build a coarse-to-fine optimization search using Sobel gradient magnitudes and bilateral facial / object symmetry metrics to estimate unknown swirl parameters automatically.
  - Repeat after saving the swirled image at JPEG quality factors $Q = 95, 75, 50$ to observe how $8 \times 8$ DCT block quantization degrades inversion.
- **Deliverable:** Automated unwarping script and error-surface heatmap showing parameter convergence under clean vs. JPEG-compressed inputs.

### Lab 3: The Noise Explosion in Naive Deconvolution

- **Aligned lectures:** Week 4 Days 1–2 and Weeks 5 Days 1–2 (DFT/convolution foundations, ill-posedness, and naive-inversion failure analysis)
- **Objective:** Demonstrate empirically why naive inverse filtering fails on blurred digital images and relate the failure to noise amplification, PSF mismatch, and boundary assumptions.
- **Part A — Week 4:** Generate synthetic motion-blurred and Gaussian-blurred images ($\sigma = 1.5, 3.0, 5.0$) using 2D Fast Fourier Transforms (`numpy.fft.fft2`). Inspect the PSFs and transfer-function magnitudes, and compare the forward blur under the documented boundary convention.
- **Part B — Week 5:** Apply naive frequency-domain division to floating-point noiseless images, then repeat with 8-bit quantization and increasing Gaussian sensor noise ($\sigma_{\text{noise}} = 0.01$). Sweep blur strength, test a slightly mismatched PSF and boundary convention, and report any denominator threshold used.
- **Deliverable:** Jupyter notebook with paired Part A/Part B experiments, inverse-gain and reconstruction plots, reference-based error measurements, and a short Hadamard stability / model-mismatch analysis. Keep clipped display images separate from reported floating-point metrics.

### Lab 4: Regularized and Iterative Deconvolution

- **Aligned lectures:** Week 6 Days 1–2 (Tikhonov/Wiener regularization, Richardson–Lucy, and blind deconvolution); results support the Week 7 practical challenge.
- **Objective:** Compare stabilized restoration methods under stated PSF and noise assumptions, and test how uncertainty about the PSF changes the result.
- **Tasks:**
  - Implement Tikhonov and Wiener deconvolution; sweep regularization parameter / inverse SNR across noise levels and compare the bias–variance trade-off.
  - Apply Richardson–Lucy to nonnegative Poisson-count data with a known PSF. Compare Gaussian-noise cases with a Gaussian data-fit objective (such as Tikhonov); do not treat standard RL as a generic Gaussian-noise method. Examine iteration count and residuals.
  - Run a small constrained blind-deconvolution experiment with unknown motion-blur kernel support. Enforce nonnegativity and PSF normalization, compare the estimated kernel with ground truth, and document ambiguity or initialization sensitivity. This is a controlled comparison, not a claim of unique recovery.
  - Compare method limits on linear motion blur versus Gaussian blur of similar support.
- **Deliverable:** Comparative benchmark table and restored-image gallery for text / synthetic plate targets, including parameter or stopping choices, noise-model assumptions, reference metrics, residuals, and a blind-PSF estimate with limitations.

### Lab 5: Forensic Validation and Detecting AI Hallucinations

- **Aligned lectures:** Weeks 8–10 (Chain of Custody, SWGDE Standards, and Generative Boundaries)
- **Objective:** Build an evidentiary audit pipeline and test why generative super-resolution fails courtroom reliability standards.
- **Tasks:**
  - Create a reproducible forensic wrapper in Python that verifies SHA-256 input / output hashes, logs deterministic transformation parameters, and runs automated forward-and-reverse control tests on reference images (per SWGDE guidelines).
  - Run an open-source neural face-restoration model (for example, GFPGAN or CodeFormer) on heavily downsampled / blurred portraits of distinct individuals and demonstrate identity drift (hallucinated features that match training priors rather than ground truth).
- **Deliverable:** Mock Forensic Examination Report formatted to *Daubert* / *Mohan* / SWGDE admissibility standards.

### Lab 6: Red-Teaming Naive Redaction and Deploying DeepPrivacy2

- **Aligned lectures:** Weeks 11–13 (Forward-Matching Attacks, Street View Pipelines, and Zero-Leakage GANs)
- **Objective:** Break weak redaction via forward-matching, then deploy a privacy pipeline intended to prevent recovery.
- **Tasks:**
  - **Part A — Attack:** Given a Gaussian-blurred or pixelated seven-character license plate rendered in a known font, write a brute-force forward-blur matcher that recovers the plate string without inverting the blur.
  - **Part B — Defense:** Implement a Street View-style noise-injected blur (Gaussian blur plus $N(0, \sigma_{\text{noise}})$ noise and alpha-blending) and verify that the forward-matching attack fails.
  - **Part C — Generative anonymization:** Deploy DeepPrivacy2 on a sample street-scene image and short video clip; verify pixel masking in the protected region and inspect frame-to-frame temporal consistency.
- **Deliverable:** Attack / defense benchmark script and anonymized-video output analysis.

### Capstone Project

The Week 14 capstone culminates in a demonstration and final red-team evaluation of an end-to-end anonymization pipeline. Evaluate both re-identification resistance and downstream computer-vision utility (for example, mAP or pose-estimation accuracy).
