# TA Guide — Lab 2: Geometric Unwarping

[Student specification](../lab02.md) · [Week 2 Day 1](../../lectures/week02-day1.md) · [Day 2](../../lectures/week02-day2.md) · [Week 3 Day 1](../../lectures/week03-day1.md) · [Day 2](../../lectures/week03-day2.md) · [Workbook Week 2](../../workbook/week02.md) and [Week 3](../../workbook/week03.md).

## Preparation

Use only synthetic geometric patterns, not actual redacted images or identity-bearing targets. The historical Operation Vico example is assigned viewing, not experimental input. Prepare separate calibration and evaluation targets, with different layouts and symmetry properties. Include clean and JPEG-degraded observations; keep held-out source arrays and parameters in instructor-controlled storage. Supply documented bounds for the synthetic task, coordinate conventions, interpolation and padding. Trial the computational cost before setting the assessed scope.

## Week 2 — one-hour session

| Minutes | Activity |
|---------|----------|
| 0–10 | Review radius-preserving coordinate mapping |
| 10–25 | Known-parameter synthetic round trip |
| 25–40 | Inspect a predefined geometric consistency measure on calibration targets |
| 40–50 | Discuss parameter ambiguity and evaluation cost |
| 50–60 | Freeze the planned evaluation protocol |

## Week 3 — one-hour session

| Minutes | Activity |
|---------|----------|
| 0–10 | Verify JPEG encoding settings and decoded array scale |
| 10–25 | Compare matched clean and compressed synthetic observations |
| 25–40 | Record estimates before revealing independent references |
| 40–50 | Compare geometric and raster errors |
| 50–60 | Discuss quantization and limitations |

## Reference checkpoints

For the continuous model, radius is invariant and the inverse uses the negative angle at the same radius. At the center the map is the identity; at and outside the support radius it is also the identity. Test coordinates independently of raster resampling. For a point at radius R/2 with central angle pi, the illustrative linear twist profile rotates it by pi/2. Floating-point coordinate round trips should meet an appropriate tolerance on the stated scale; raster round trips need not.

The workbook's coarse and refinement counts are 20^4 = 160000 and 5^4 = 625. These are operation-count exercises, not required image-size search benchmarks. Do not interpret a local optimum as proof of unique parameters.

JPEG quality is encoder-dependent, not a scalar DCT step. Record encoder, quality, chroma settings if applicable, and alignment. Compare on identical evaluation support. An error surface using clean references is an oracle diagnostic after evaluation, not an objective available during blind estimation.

## Diagnostic assistance

Check the sign of the rotation, coordinate center, axis order and support radius before adjusting a score. If a symmetric or repetitive target admits competing explanations, ask the student to document ambiguity rather than force agreement with a hidden parameter. If compression changes the selected result, separate resampling, quantization and objective sensitivity. Avoid comparing outputs selected using test truth.

## Suggested marking

Coordinate implementation and controls 30%; calibration and documented estimation 25%; JPEG comparison 20%; independent evaluation and limitations 25%.

Optional Week 3 extension: estimate DCT coefficient histograms of independently created grayscale synthetic targets before and after two JPEG encodings, with and without block-grid alignment. Distinguish decoded-block estimates from bitstream coefficients. No real redacted material is required. CPU execution suffices; use smaller synthetic targets if necessary.
