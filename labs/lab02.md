# Lab 2: Geometric Unwarping and Blind Parameter Estimation (*Operation Vico* Simulation)

*Working specification. See [Laboratory Curriculum](lab-specifications.md) for the overview and [Weekly Schedule](../syllabus/weekly-schedule.md) for milestones.*

- **Aligned lectures:** Weeks 2–3 (Geometric Warping, Swirl Ciphers, and JPEG Quantization)
- **Objective:** Reverse a nonlinear radial swirl when center $(x_0, y_0)$, radius $R$, and twist angle $\theta_{\max}$ are unknown.
- **Tasks:**
  - Implement forward and inverse radial swirl transformation $T: \mathbb{R}^2 \to \mathbb{R}^2$.
  - Build a coarse-to-fine optimization search using Sobel gradient magnitudes and bilateral facial / object symmetry metrics to estimate unknown swirl parameters automatically.
  - Repeat after saving the swirled image at JPEG quality factors $Q = 95, 75, 50$ to observe how $8 \times 8$ DCT block quantization degrades inversion.
- **Deliverable:** Automated unwarping script and error-surface heatmap showing parameter convergence under clean vs. JPEG-compressed inputs.

## Experimental Protocol

Known-reference exercises may be used for development and calibration. For independent reconstruction evaluation, reserve separate synthetic test images and withhold clean references, hidden degradation parameters (in blind cases), and noise realizations from the reconstruction procedure. Select settings on calibration data or by a predeclared observation-only rule, record the estimates and settings, then reveal ground truth for scoring. Label reference-tuned results as exploratory or oracle benchmarks, not held-out performance.
