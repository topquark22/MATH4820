# Lab 1: Discrete Grids, Interpolation, and Resampling Artifacts

*Working specification. See [Laboratory Curriculum](lab-specifications.md) for the overview and [Weekly Schedule](../syllabus/weekly-schedule.md) for milestones.*

- **Aligned lecture:** Week 1 (Continuous vs. Discrete Image Spaces)
- **Objective:** Quantify how mapping continuous coordinates $(x, y) \in \mathbb{R}^2$ onto discrete pixel grids $\mathbb{Z}^2$ introduces irreversible high-frequency loss.
- **Tasks:**
  - Implement nearest-neighbor, bilinear, and bicubic resampling kernels from scratch in `NumPy`.
  - Apply repeated sub-pixel translations and rotations (for example, 36 increments of $10^\circ$) to a test target and measure cumulative Peak Signal-to-Noise Ratio (PSNR) and Structural Similarity (SSIM) decay.
- **Deliverable:** Python module and a short analytical plot comparing spatial-frequency attenuation across interpolation kernels.
