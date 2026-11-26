# TA Guide — Lab 6: Privacy Engineering and Generative Anonymization

[Student specification](../lab06.md) · Week 11 [Day 1](../../lectures/week11-day1.md) and [Day 2](../../lectures/week11-day2.md) · Week 12 [Day 1](../../lectures/week12-day1.md) and [Day 2](../../lectures/week12-day2.md) · Week 13 [Day 1](../../lectures/week13-day1.md) and [Day 2](../../lectures/week13-day2.md) · Workbook [11](../../workbook/week11.md), [12](../../workbook/week12.md), [13](../../workbook/week13.md).

## Preparation and scope

Use independently generated abstract numerical arrays and artificial labels for privacy tests. Public redacted street photographs are visual examples only. Do not attempt to recover actual protected identifiers. The student specification's synthetic candidate task is an instructional model of distinguishability; the TA may use nonidentifying geometric signals to teach the same mathematical concepts.

Prepare independent calibration and test targets, a prior-only baseline, a fixed independent replacement baseline, predefined masks, simulated detection scores, and synthetic sequences with known motion. For the model-based portion, arrange authorized inputs, a tested DeepPrivacy2 environment and checkpoint terms, or a precomputed bundle. No model execution or dataset preparation has yet been validated by this manual.

## Session allocation

| Minutes | Week 11 — Part A | Week 12 — Part B | Week 13 — Part C |
|---------|------------------|------------------|------------------|
| 0–10 | Define protected artificial label | Define coverage and utility | Review conditioning and release boundary |
| 10–25 | Check restricted-domain distinction | Check deterministic and randomized releases | Inspect masking and model provenance |
| 25–40 | Compare label dependence with baseline | Compare coverage and unnecessary masking | Evaluate synthetic temporal sequence |
| 40–50 | Discuss uncertainty and failed tests | Inspect alpha and replacement assumptions | Assess valid correspondences and missed regions |
| 50–60 | Record evaluation protocol | Compare privacy and utility | Review integrated report |

## Part A — information leakage

The sum map on two coordinates is non-injective on the ambient space but distinguishes the artificial points (0,0), (1,0), (1,1), with minimum output separation one. This illustrates the difference between losing arbitrary input information and protecting a restricted label.

For conditional output distributions P = (0.7,0.3) and Q = (0.3,0.7), total variation is 0.4 and optimal equal-prior error is 0.3. This is an analytic public control, not an estimate of a real system's attack resistance.

Use contingency tables for artificial label dependence and compare with a baseline using permitted prior knowledge alone. Empirical mutual information may be biased with sparse counts; a small estimate does not prove independence. Record test sample sizes, uncertainty and assumptions. A failed inference test cannot establish irreversible redaction.

## Part B — detection and randomized releases

Distinguish per-object recall, reference-region coverage, IoU and unnecessary masked area. A reference area of 100, prediction area of 140 and intersection of 80 gives coverage 0.8 and IoU 0.5. Use fixed artificial masks or simulated detections for transparent evaluation.

Treat the noise parameter as a standard deviation, so the Gaussian variance is its square. The Week 12 release model is a teaching abstraction, not a verified description of current Google software. Compare measured properties with a fixed independent replacement baseline. Do not infer privacy from visual uniformity.

Under fixed independent replacement, the original contribution in an alpha blend is 1 minus alpha. If the replacement depends on the protected source, full opacity alone does not establish noninterference. Coverage and the complete release boundary must also be checked.

## Part C — generative and temporal evaluation

Inspect mask coverage, removed source coordinates, retained context, and permitted conditioning. With a fixed mask, fixed conditioning and fixed independent latent state, two artificial source arrays differing only inside the mask give the same masked input. This is a direct dependence check, not proof of identity independence for the full system.

Use a synthetic moving shape sequence with known correspondence. The signals (0,1,1,0) and (0,0,1,1) have unaligned MSE 0.5 and zero MSE after the stated exact circular shift. Record valid correspondence support; empty support is undefined rather than zero error.

For model-based outputs record detection and tracking failures, invalid correspondences, model revision, checkpoint, preprocessing, masks and temporal settings. Stable synthetic appearance can preserve association without providing unlinkability. Adjacent frames are not independent subjects. Where hardware prevents execution, assess the supplied provenance and output bundle using identical evaluation criteria.

## Diagnostic assistance

If a privacy metric looks excellent, first inspect whether missed regions were removed from the denominator, whether the label baseline is appropriate, and whether test labels informed settings. If temporal error is low, verify that the output still preserves legitimate motion and valid coverage. If fixed-mask invariance passes but a broader claim fails, inspect contextual and conditioning dependencies. Report failures without trying to infer private information from real redactions.

## Suggested marking

Artificial-label evaluation and interpretation 30%; randomized release and coverage analysis 30%; masking and temporal evaluation 25%; reproducibility and limitations 15%. Additional information-theoretic and coverage exercises are recommended teaching extensions pending instructor approval, not newly compulsory student deliverables.
