# Course Overview

## MATH 4820 (Cross-Listed: CS 6820) — Computational Image Forensics, Inverse Problems, and Visual Privacy

- **Credits:** 3.0 (3 lecture hours and 1 lab hour per week; confirm locally)
- **Level:** Senior undergraduate / graduate
- **Offered:** Fall / Winter (confirm locally)

### Course Description

An advanced study of the mathematical, algorithmic, and legal principles governing the reconstruction and irreversible redaction of digital visual media. Treating digital images both as continuous functions on $\\mathbb{R}^2$ and quantized discrete arrays on $\\mathbb{Z}^2$, this course examines the boundary between invertible and destructive image operators. Topics include bijective geometric warping and parameter estimation, spatial convolution, the 2D Fourier transform, and ill-posed inverse problems such as motion and Gaussian deconvolution via Wiener and Richardson–Lucy regularization. Students will investigate how lossy compression, sensor noise, and integer quantization limit signal recovery, and how forensic laboratories validate deterministic enhancement pipelines to meet legal evidentiary standards (*Daubert*, *Mohan*, ISO/IEC 17025, and SWGDE guidelines) without introducing generative artifacts. The final third of the course shifts from forensic recovery to privacy engineering, analyzing forward-matching attacks against naive redaction, web-scale noise-injected blurring architectures, and conditional generative models (GANs and diffusion) for face and full-body anonymization in images and video.

### Course Learning Outcomes

Upon successful completion of this course, students will be able to:

1. **Analyze invertibility:** Classify spatial and frequency-domain image operators as injective, surjective, or destructive, and quantify information loss caused by resampling interpolation and lossy compression.
2. **Solve ill-posed inverse problems:** Implement deterministic geometric unwarping and regularized deconvolution algorithms in Python to recover degraded visual signals under realistic noise constraints.
3. **Validate forensic evidence:** Design reproducible, hash-verified image enhancement workflows with control-group validation suitable for scientific and legal scrutiny.
4. **Engineer privacy pipelines:** Evaluate visual redaction schemes against dictionary/forward-matching and neural reconstruction attacks, and deploy generative anonymization models that decouple personal identity from downstream computer vision utility.

### Prerequisites

- **Mathematics:** Linear algebra (eigenvalues, matrix decompositions, vector spaces) and multivariable calculus (partial derivatives, Jacobians, change of variables in $\\mathbb{R}^2$).
- **Signals and systems / imaging:** Introductory digital image processing or signals and systems (familiarity with 2D convolution and the Discrete Fourier Transform), or permission of the instructor.
- **Computing:** Proficiency in Python and scientific libraries (`NumPy`, `SciPy`, `OpenCV`), and basic familiarity with `PyTorch` for the final module.
- **Recommended, not required:** Introductory probability and statistics (Bayesian inference, Gaussian and Poisson noise models) or information security fundamentals.
