# TA Guide — Lab 4: Regularized and Iterative Deconvolution

[Student specification](../lab04.md) · [Week 6 Day 1](../../lectures/week06-day1.md) · [Day 2](../../lectures/week06-day2.md) · [Workbook Week 6](../../workbook/week06.md) and [Week 7](../../workbook/week07.md).

## Preparation and workload

Reuse Lab 3's verified forward operator and adjoint, plotting, and synthetic target infrastructure. Separate Gaussian and Poisson observations. Prepare small public calibration arrays and independent test observations. Provide a tested harness for parameter sweeps, not the assessed algorithm. The following three components organize the existing tasks; the one-hour session cannot reasonably cover all implementation.

- A: Tikhonov and Wiener restoration.
- B: Richardson–Lucy for Poisson counts.
- C: constrained blind PSF comparison on artificial targets, primarily take-home.

## One-hour session (Week 6)

| Minutes | Activity |
|---------|----------|
| 0–10 | Confirm forward model, adjoint and observation scale |
| 10–25 | Compare scalar gains and linear restoration |
| 25–40 | Poisson likelihood and one RL update |
| 40–50 | Discuss calibration-only parameter and stopping selection |
| 50–60 | Explain blind ambiguity and take-home checkpoints |

## Reference checks

For identity-penalty Tikhonov and real transfer value 0.05, naive gain is 20; regularized gains at lambda = 0.0025 and 0.01 are 10 and 4. Constant-ratio Wiener and identity-penalty Tikhonov coincide when the parameters are equal; this is a formula check, not evidence that the two modeling assumptions are identical.

Verify the adjoint identity using small real arrays and matched boundaries. For positive lambda, uniqueness of the normal-equation solution requires a trivial common kernel of the forward and penalty operators.

For Poisson experiments, choose and record a count scale, generate nonnegative means from the forward model, and draw counts from these means. Do not add independent Poisson samples to a blurred image. For H = I, observations (2,6) and positive initialization (4,4), one normalized RL update yields (2,6). Handle zero predicted means and zero counts using a documented convention. General RL needs the adjoint normalization where the boundary model requires it.

Measure Poisson deviance and reference MSE separately; increasing iteration count need not improve reference accuracy. Select stopping on calibration or a predeclared observation-only rule. For blind cases, check nonnegativity, kernel sum one, and sensitivity to initialization; normalizing the PSF fixes positive scale ambiguity, not every ambiguity.

## Troubleshooting

- Unexpected gain: check whether lambda is squared by the implementation and whether the Wiener parameter is a power ratio rather than an amplitude ratio.
- Ringing: compare residual, boundary and parameter choice before declaring an error.
- RL negative values or division errors: inspect nonnegative input, PSF, initialization and denominator conventions.
- Poor blind result: distinguish ambiguity from implementation failure; use independent references only for final scoring.

## Suggested marking

Linear regularization 30%; Poisson/RL formulation and checks 30%; blind comparison and limitations 20%; independent evaluation and reproducibility 20%. Do not reward oracle tuning or require a unique blind solution.

Hardware fallback: small CPU arrays, bounded iterations, or instructor-supplied observations for the larger comparisons. The Week 7 practical challenge is separate from the midterm; do not expose its hidden references during assistance.
