# Lab 3: The Noise Explosion in Naive Deconvolution

*Working specification. See [Laboratory Curriculum](lab-specifications.md) for the overview and [Weekly Schedule](../syllabus/weekly-schedule.md) for milestones.*

- **Aligned lectures:** Weeks 4–5 (Days 1–2 of each week) (DFT/convolution foundations, ill-posedness, and naive-inversion failure analysis)
- **Objective:** Demonstrate empirically why naive inverse filtering fails on blurred digital images and relate the failure to noise amplification, PSF mismatch, and boundary assumptions.
- **Part A — Week 4:** Generate synthetic motion-blurred and Gaussian-blurred images ($\sigma = 1.5, 3.0, 5.0$) using 2D Fast Fourier Transforms (`numpy.fft.fft2`). Inspect the PSFs and transfer-function magnitudes, and compare the forward blur under the documented boundary convention.
- **Part B — Week 5:** Apply naive frequency-domain division to floating-point noiseless images, then repeat with 8-bit quantization and increasing Gaussian sensor noise ($\sigma_{\text{noise}} = 0.01$). Sweep blur strength, test a slightly mismatched PSF and boundary convention, and report any denominator threshold used.
- **Deliverable:** Jupyter notebook with paired Part A/Part B experiments, inverse-gain and reconstruction plots, reference-based error measurements, and a short Hadamard stability / model-mismatch analysis. Keep clipped display images separate from reported floating-point metrics.

## Experimental Protocol

Known-reference exercises may be used for development and calibration. For independent reconstruction evaluation, reserve separate synthetic test images and withhold clean references, hidden degradation parameters (in blind cases), and noise realizations from the reconstruction procedure. Select settings on calibration data or by a predeclared observation-only rule, record the estimates and settings, then reveal ground truth for scoring. Label reference-tuned results as exploratory or oracle benchmarks, not held-out performance.
