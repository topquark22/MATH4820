# Course Overview

## MATH 4820 (Cross-Listed: CS 6820) — Computational Image Forensics, Inverse Problems, and Visual Privacy

- **Credits:** 3.0 (3 lecture hours and 1 lab hour per week; confirm locally)
- **Level:** Senior undergraduate / graduate
- **Offered:** Fall / Winter (confirm locally)

### Course Description

An advanced interdisciplinary course examining the mathematical foundations of digital image reconstruction, forensic image analysis, and visual privacy engineering. Topics include discrete image representations, geometric transformations, interpolation, Fourier analysis, convolution, ill-posed inverse problems, statistical observation models, regularized deconvolution, and generative image restoration.

The course develops mathematical and computational methods for assessing the recoverability, reliability, and evidentiary significance of degraded imagery. Students investigate scientific validation, reproducibility, information-theoretic privacy, generative anonymization, temporal consistency, and multi-objective privacy–utility optimization.

Instruction combines mathematical derivations, numerical experiments, laboratory investigations, and an integrated capstone project. Particular emphasis is placed on distinguishing information supported by observations from information inferred through mathematical models or synthesized by learned generative systems.

### Course Learning Outcomes

Upon successful completion of this course, students will be able to:

1. **Analyze invertibility:** Classify spatial and frequency-domain image operators as injective, surjective, or destructive, and quantify information loss caused by resampling interpolation and lossy compression.
2. **Solve ill-posed inverse problems:** Implement deterministic geometric unwarping and regularized deconvolution algorithms in Python to recover degraded visual signals under realistic noise constraints.
3. **Validate forensic evidence:** Design reproducible, hash-verified image enhancement workflows with control-group validation suitable for scientific and legal scrutiny.
4. **Engineer privacy pipelines:** Evaluate visual redaction schemes against dictionary/forward-matching and neural reconstruction attacks, and deploy generative anonymization models that decouple personal identity from downstream computer vision utility.

### Prerequisites

- **Mathematics:** Linear algebra (eigenvalues, matrix decompositions, vector spaces) and multivariable calculus (partial derivatives, Jacobians, change of variables in $\mathbb{R}^2$).
- **Signals and systems / imaging:** Introductory digital image processing or signals and systems (familiarity with 2D convolution and the Discrete Fourier Transform is helpful but not assumed: Week 4 develops the DFT/FFT, spatial convolution, and the Convolution Theorem from first principles), or permission of the instructor.
- **Computing:** Proficiency in Python and scientific libraries (`NumPy`, `SciPy`, `OpenCV`), and basic familiarity with `PyTorch` for the final module.
- **Recommended, not required:** Introductory probability and statistics (Bayesian inference, Gaussian and Poisson noise models) or information security fundamentals.
