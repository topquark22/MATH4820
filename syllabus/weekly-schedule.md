# Weekly Schedule

## Draft Course Syllabus (14 Weeks)

### Part I: Mathematical Foundations and Geometric Transformations (Weeks 1–3)

#### Week 1: Continuous vs. Discrete Image Spaces
- Model images as $f: \mathbb{R}^2 \to \mathbb{R}^k$ and discrete arrays $I \in \mathbb{Z}^{M \times N \times k}$.
- Injective, surjective, and bijective operators in image processing.
- Resampling, coordinate grids, and interpolation kernels (nearest-neighbor, bilinear, bicubic) as low-pass filters.

#### Week 2: Geometric Warping and Permutation Ciphers
- Affine and nonlinear coordinate mappings (swirl, twirl, perspective homographies).
- Case study: *Operation Vico* (2007), radial swirl filters, and parameter estimation via edge continuity.
- **Lab 1:** Implement forward swirl distortion and automated inverse grid search in Python / OpenCV.

#### Week 3: Compression, Quantization, and Information Loss
- Color spaces (RGB, YCbCr), chroma subsampling, and Discrete Cosine Transform (DCT) block quantization in JPEG.
- How lossy compression turns invertible continuous transforms into noisy, non-injective mappings.
- Detecting double-JPEG compression and resampling traces in forensic images.

### Part II: Convolution, Blur, and Ill-Posed Inverse Problems (Weeks 4–7)

#### Week 4: Spatial Convolution and the 2D Fourier Transform
- Point spread functions (PSFs) for linear motion blur, out-of-focus bokeh disks, and atmospheric turbulence.
- The 2D Convolution Theorem; frequency-domain zeros and attenuation.

#### Week 5: Why Naive Inversion Fails
- Hadamard's definition of well-posed vs. ill-posed problems.
- Gaussian smoothing, exponential frequency-domain decay, and amplification of sensor and quantization noise.
- **Lab 2:** Demonstrate naive inverse filtering and noise explosion on synthetic and noisy blurred images.

#### Week 6: Regularized and Iterative Deconvolution
- Tikhonov regularization and Wiener deconvolution (incorporating Signal-to-Noise Ratio priors).
- Iterative Bayesian restoration: Richardson–Lucy for Poisson and Gaussian noise models.
- Blind deconvolution: estimating unknown PSFs from blurred image gradients.

#### Week 7: Midterm Exam and Applied Reconstruction Challenge
- Practical benchmark: recover obscured text and license plates from motion-blurred vs. Gaussian-blurred test sets under controlled noise levels.

### Part III: Digital Forensics and Evidentiary Admissibility (Weeks 8–10)

#### Week 8: Forensic Integrity and Chain of Custody
- Bit-stream acquisition, write-blocking, and cryptographic hashing (SHA-256) of raw digital media.
- Audit trails, reproducible pipelines, and investigative intelligence vs. courtroom evidence.

#### Week 9: Scientific Validation and Legal Standards
- Legal frameworks for scientific evidence (*Daubert*, *Mohan* criteria in Canada, ISO/IEC 17025, and SWGDE guidelines).
- Forward-and-reverse control validation to test whether enhancement introduces structural artifacts or false identifying features.

#### Week 10: The Generative AI Boundary in Court
- Deterministic signal recovery vs. neural super-resolution and diffusion-based face restoration (for example, GFPGAN and CodeFormer).
- Hallucinated high-frequency priors, admissibility concerns, and detecting AI-upscaled evidence.

### Part IV: Privacy Engineering and Irreversible Redaction (Weeks 11–14)

#### Week 11: Redaction Failures and Forward-Matching Attacks
- Why pixelation, mosaicking, and low-radius Gaussian blur can fail against modern attacks.
- Dictionary / brute-force forward-blur matching on constrained domains and neural unblurring attacks.
- Government and enterprise redaction standards (NSA, NIST).

#### Week 12: Web-Scale Visual Privacy Pipelines
- High-recall automated detection vs. false-positive trade-offs.
- Case study: Google Street View privacy architecture, including blur, synthetic noise injection, alpha-blending, and pre-stitching redaction.

#### Week 13: Zero-Leakage Generative Anonymization
- Decoupling identity from utility by masking original pixels before synthesis.
- Case studies: DeepPrivacy and DeepPrivacy2 conditional GANs for face and full-body replacement while preserving pose and scene context.
- Video anonymization: object tracking, temporal flickering, and video diffusion models.

#### Week 14: Capstone Presentations and Privacy-Utility Evaluation
- Build and red-team an end-to-end anonymization pipeline.
- Evaluate re-identification resistance and downstream computer-vision utility (mAP / pose-estimation accuracy).

## Integrated Lecture and Lab Timeline

| Week | Module | Lecture Topic | Lab / Assessment Milestone |
| :--- | :--- | :--- | :--- |
| **1** | **I. Geometric Foundations** | Continuous ($\mathbb{R}^2$) vs. Discrete ($\mathbb{Z}^2$) Image Spaces; Injective Mappings | **Lab 1:** Resampling & Interpolation Decay |
| **2** | **I. Geometric Foundations** | Non-Linear Warping, Swirl Ciphers & *Operation Vico* Case Study | **Lab 2 (Part A):** Forward/Inverse Swirl & Grid Search |
| **3** | **I. Geometric Foundations** | JPEG DCT Quantization, Chroma Subsampling & Resampling Traces | **Lab 2 (Part B):** Unwarping Under JPEG Compression *(Lab 1–2 Due)* |
| **4** | **II. Inverse Problems** | Spatial Convolution, Point Spread Functions & 2D Fourier Transform | **Lab 3 (Part A):** Synthetic Motion vs. Gaussian Blur |
| **5** | **II. Inverse Problems** | Hadamard Ill-Posedness & Frequency-Domain Noise Explosion | **Lab 3 (Part B):** Naive Inversion Failure Analysis *(Lab 3 Due)* |
| **6** | **II. Inverse Problems** | Wiener Filtering, Richardson–Lucy & Blind Deconvolution | **Lab 4:** Regularized Text & Plate Restoration |
| **7** | **II. Inverse Problems** | Review & Forensic Limits of Deconvolution | **Midterm Exam + Practical Reconstruction Challenge** *(Lab 4 Due)* |
| **8** | **III. Forensic Standards** | Bit-Stream Integrity, SHA-256 Hashing & Investigative vs. Court Evidence | **Lab 5 (Part A):** Hash-Verified Forensic Pipeline Setup |
| **9** | **III. Forensic Standards** | *Daubert* / *Mohan* Admissibility, ISO 17025 & SWGDE Control Validation | **Lab 5 (Part B):** Forward-and-Reverse Control Testing |
| **10** | **III. Forensic Standards** | Deterministic Math vs. Neural Super-Resolution & Hallucination Detection | **Lab 5 (Part C):** Auditing Generative Face Restoration *(Lab 5 Due)* |
| **11** | **IV. Visual Privacy** | Why Pixelation & Blur Fail: Dictionary & Forward-Matching Attacks | **Lab 6 (Part A):** Forward-Blur Brute-Force Attack |
| **12** | **IV. Visual Privacy** | Web-Scale Privacy Engineering (*Google Street View* Architecture) | **Lab 6 (Part B):** Noise-Injected Irreversible Blurring |
| **13** | **IV. Visual Privacy** | Zero-Leakage GAN/Diffusion Anonymization (*DeepPrivacy2*) & Video Jitter | **Lab 6 (Part C):** Deploying DeepPrivacy2 on Video *(Lab 6 Due)* |
| **14** | **IV. Visual Privacy** | Privacy-Utility Trade-Offs, Re-Identification Metrics & Course Synthesis | **Capstone Project Demos & Final Red-Team Evaluation** |
