# Week 7, Day 1 — Midterm Examination

*90-minute examination. Source: Week 7 of `syllabus/weekly-schedule.md` ("Midterm Exam and Applied Reconstruction Challenge"). Covers Weeks 1–6. This is an instructor-facing assessment plan, not the student-facing examination paper.*

## Learning Objectives

The examination assesses whether students can:

1. Distinguish continuous and discrete image operators, including invertibility and information loss.
2. Analyze geometric transformations, resampling, quantization, and lossy compression.
3. Apply the DFT and Convolution Theorem to image degradation models.
4. Distinguish non-uniqueness from instability in inverse problems.
5. Derive and interpret regularized reconstruction methods under stated assumptions.

## Timed Outline (90 min)

| Min | Segment |
|-----|---------|
| 5 | Examination instructions |
| 20 | Geometric transformations, invertibility, and resampling |
| 15 | Quantization, compression, and information loss |
| 20 | DFT, convolution, and point spread functions |
| 25 | Ill-posed inverse problems and regularized reconstruction |
| 5 | Final review and submission |
| **90** | **Total** |

The topic allocations are suggested working times, not separately timed sections.

## Content Notes

### 1. Examination instructions (5 min)

Prepare a written examination emphasizing derivation, interpretation, and mathematical reasoning rather than formula memorization. State the permitted aids, notation, total marks, and expectations for showing work on the student-facing paper. Confirm accommodations and examination policies locally.

### 2. Geometric transformations, invertibility, and resampling (20 min)

Assess continuous coordinate mappings and their discrete implementations. Students should be able to reason about the inverse of an affine or radial swirl transformation and explain how finite sampling, interpolation, and cropping can compromise invertibility. Distinguish an inverse coordinate mapping from exact recovery of the original raster.

### 3. Quantization, compression, and information loss (15 min)

Assess the distinction between invertible transforms and non-injective quantization. Use small numerical or conceptual examples involving DCT coefficients, JPEG quantization, or chroma subsampling. Students should be able to explain why an inverse transform cannot restore information discarded by quantization.

### 4. DFT, convolution, and point spread functions (20 min)

Assess the relationship between spatial convolution and multiplication in the frequency domain. Include a tractable transfer-function calculation or interpretation of frequency-domain zeros. Require students to state the convolution and boundary conventions when relevant.

### 5. Ill-posed inverse problems and regularized reconstruction (25 min)

Assess Hadamard well-posedness, noise amplification by naive inversion, and the distinction between injectivity and stable inversion. Students should be able to derive the Tikhonov normal equations, discuss uniqueness, and interpret the regularization parameter. Include comparison of Wiener filtering and Richardson–Lucy under their respective signal/noise assumptions. Assess blind-deconvolution ambiguity conceptually where appropriate.

### 6. Final review and submission (5 min)

Allow students to check derivations, assumptions, and notation. Collect examination papers according to institutional procedures.

## Instructor Preparation and Marking

- Use only material covered in Weeks 1–6; avoid requiring additional theorems or software not introduced in the course.
- Supply any conventions, constants, or reference formulas needed to make the problems unambiguous.
- Prepare a separate marking scheme with partial credit for correct reasoning, even when an arithmetic error affects the final result.
- Reward explicit distinctions between non-injectivity, poor conditioning, and irreversible information loss.
- Check that the paper is realistically solvable within the allocated time and that its marks reflect the relative difficulty of the questions.

## Tutorial and Lab Coordination

Use the preceding tutorial sessions for cumulative review and representative practice problems, without disclosing the examination questions. Lab 4 is due in Week 7; its reconstruction methods will also support Day 2's applied challenge.

## Assessment Materials

The student-facing midterm paper and its marking scheme are to be maintained separately under `assessment/`. Do not include the actual examination questions or solutions in this lecture plan. Set the course-level assessment weighting in accordance with the final syllabus.
