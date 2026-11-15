# Core Concepts and Technical Notes

## Geometric Transformations ($T: \\mathbb{R}^2 \\to \\mathbb{R}^2$)

- **Bijective mappings:** Radial swirl transforms permute spatial coordinates around a center $(x_0, y_0)$ by an angle $\\theta(r)$ while preserving pixel intensity values:

  $$
  \\begin{pmatrix} x' \\\\ y' \\end{pmatrix} = \\begin{pmatrix} x_0 \\\\ y_0 \\end{pmatrix} + \\begin{pmatrix} \\cos\\theta(r) & -\\sin\\theta(r) \\\\ \\sin\\theta(r) & \\cos\\theta(r) \\end{pmatrix} \\begin{pmatrix} x - x_0 \\\\ y - y_0 \\end{pmatrix}
  $$

- **Historical benchmark (*Operation Vico*, 2007):** The source material describes forensic specialists with Germany's BKA reversing a digital swirl filter by estimating its center, radius, and twist angle via edge continuity and applying the inverse rotation $-\\theta(r)$.
- **Discrete hurdles ($\\mathbb{Z}^2$ vs. $\\mathbb{R}^2$):** Continuous swirl transforms can be invertible, while digital images introduce interpolation blurring and JPEG block quantization, making practical inverses noisy approximations.

## Convolution, Blur, and Deconvolution

- **Forward degradation model:** $B = (I * G) + N$, where $I$ is the true image, $G$ is the point spread function (PSF), and $N$ is sensor or quantization noise.
- **Why naive Gaussian deconvolution fails:** In the Fourier domain, division by near-zero values of $\\mathcal{F}(G)$ can amplify sensor and rounding noise exponentially because the Fourier transform of a Gaussian decays at high spatial frequencies.
- **Motion / defocus blur vs. Gaussian blur:** Motion and out-of-focus kernels have structured frequency responses and can be partially recoverable with regularized methods such as Wiener deconvolution and Richardson–Lucy. Strong Gaussian smoothing can destroy high-frequency structure below 8-bit quantization.
- **Forward-matching attacks:** Even when mathematical inversion fails, low-radius blur or pixelation of constrained domains (such as passwords, cards, or license plates) may be vulnerable to candidate-generation and forward-comparison attacks.

## Digital Forensics and Evidentiary Standards

- **Investigative lead vs. courtroom evidence:** Reconstructed imagery may generate investigative leads, while courtroom use must meet applicable scientific reliability standards, including *Daubert*, *Mohan*, ISO/IEC 17025, and SWGDE guidance.
- **Validation protocols:**
  1. **Bit-stream preservation:** Work from cryptographically verified copies (for example, SHA-256), not original evidence.
  2. **Forward-and-reverse control testing:** Apply identical filters to reference images and invert them to quantify interpolation artifacts and assess whether false identifying features are introduced.
  3. **Deterministic transparency:** Prefer closed-form, reproducible methods over generative enhancement that may hallucinate plausible details.

## Irreversible Redaction and Generative Privacy

- **Web-scale privacy:** The source material describes combining aggressive Gaussian blur with synthetic noise injection, alpha-blending, pre-panorama-stitching redaction, high-recall detection, and permanent raster overwrites to reduce reversibility.
- **Generative anonymization:** The source discusses conditional GAN pipelines for face and full-body anonymization, with the original person region masked before synthesizing a replacement using contextual information and pose keypoints.
- **Video support:** Frame-by-frame synthesis and object tracking can support video anonymization, while per-frame latent sampling may produce temporal flicker.

> Claims about mathematical guarantees, specific deployments, and legal admissibility are summarized from the source syllabus draft and should be checked against primary sources and applicable institutional/legal guidance before use.
