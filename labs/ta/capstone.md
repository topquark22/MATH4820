# TA Guide — Capstone Evaluation and Scientific Defense

[Capstone specification](../capstone.md) · [Week 14 Day 1](../../lectures/week14-day1.md) · [Day 2](../../lectures/week14-day2.md) · [Workbook Week 14](../../workbook/week14.md).

## Preparation

Confirm the provisional rubric and presentation allocation before assessment. Arrange tested environments or approved recorded demonstrations; establish equivalent assessment criteria for hardware-independent alternatives. Require a documented threat model and authorized inputs. Keep confidential test data, labels and assessment records outside the public repository.

## Week 13 checkpoint (suggested one-hour lab)

| Minutes | Activity |
|---------|----------|
| 0–10 | Confirm scope, protected attributes, and authorized inputs |
| 10–25 | Inspect pipeline and baseline design |
| 25–40 | Review calibration/test partition and metrics |
| 40–50 | Review failure handling and provenance |
| 50–60 | Agree remaining work and presentation plan |

## Week 14 assessment

Use the actual presentation arrangements in Week 14 Day 2. Five projects at eight minutes plus two minutes of questions fit the proposed 50-minute presentation block. For larger cohorts arrange additional time or panels, not a silent reduction of assessment opportunity.

Check that the configuration was selected without held-out labels. Inspect evidence of coverage, residual artificial-label leakage, downstream utility, temporal consistency where applicable, and processing feasibility. A recorded run must disclose failures and configuration changes. A negative result can be scientifically rigorous.

## Public reference checks

In the Week 14 six-point table, A, B, C and D are nondominated; B is unsupported by positive weighted scalarization. A hard leakage constraint is not equivalent to a weighted preference.

For four reference objects and ranked detections TP, FP, TP, TP, FP, non-interpolated AP is 29/48, approximately 0.60417. Verify the evaluator convention, class set and matching rules before comparing mAP. Missing eligible keypoints remain in the PCK denominator. Report absolute and relative utility changes with their units.

Zero failures in 300 independent Bernoulli trials gives an upper one-sided 95% bound of approximately 0.009936. It is not proof of zero leakage or of applicability outside the tested domain.

## Rubric interpretation

Use the weights already in the [capstone specification](../capstone.md): mathematical formulation 20%, implementation 20%, privacy evaluation 20%, utility evaluation 15%, reproducibility 15%, presentation and defense 10%. They are provisional and apply to the capstone itself.

Award credit for explicit assumptions, valid controls, justified metrics, reproducible records, honest failure analysis and precise conclusions. Do not award success solely for attractive generated imagery, a high mAP score, or the failure of one tested inference procedure. Compare projects numerically only when evaluation domains and definitions are genuinely comparable.

Ask the student to identify one theorem whose assumptions actually hold in the implementation and one unresolved empirical question. Record feedback against the rubric rather than introducing new criteria during the defense.
