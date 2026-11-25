# Lab 4: Regularized and Iterative Deconvolution

*Working specification. See [Laboratory Curriculum](lab-specifications.md) for the overview and [Weekly Schedule](../syllabus/weekly-schedule.md) for milestones.*

- **Aligned lectures:** Week 6 Days 1–2 (Tikhonov/Wiener regularization, Richardson–Lucy, and blind deconvolution); results support the Week 7 practical challenge.
- **Objective:** Compare stabilized restoration methods under stated PSF and noise assumptions, and test how uncertainty about the PSF changes the result.
- **Tasks:**
  - Implement Tikhonov and Wiener deconvolution; sweep regularization parameter / inverse SNR across noise levels and compare the bias–variance trade-off.
  - Apply Richardson–Lucy to nonnegative Poisson-count data with a known PSF. Compare Gaussian-noise cases with a Gaussian data-fit objective (such as Tikhonov); do not treat standard RL as a generic Gaussian-noise method. Examine iteration count and residuals.
  - Generate Poisson observations by sampling counts with mean $(Hf)_i$ (using a documented count scale), rather than adding an independent Poisson draw to the blurred image. Contrast the intensity-dependent count variance with fixed-variance additive Gaussian noise. Choose iteration counts and regularization parameters on calibration examples or by a predeclared observation-only rule before scoring held-out cases.
  - Run a small constrained blind-deconvolution experiment with unknown motion-blur kernel support. Enforce nonnegativity and PSF normalization, compare the estimated kernel with ground truth, and document ambiguity or initialization sensitivity. This is a controlled comparison, not a claim of unique recovery.
  - Compare method limits on linear motion blur versus Gaussian blur of similar support.
- **Deliverable:** Comparative benchmark table and restored-image gallery for text / synthetic plate targets, including parameter or stopping choices, noise-model assumptions, reference metrics, residuals, and a blind-PSF estimate with limitations.

## Experimental Protocol

Known-reference exercises may be used for development and calibration. For independent reconstruction evaluation, reserve separate synthetic test images and withhold clean references, hidden degradation parameters (in blind cases), and noise realizations from the reconstruction procedure. Select settings on calibration data or by a predeclared observation-only rule, record the estimates and settings, then reveal ground truth for scoring. Label reference-tuned results as exploratory or oracle benchmarks, not held-out performance.
