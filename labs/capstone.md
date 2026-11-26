# Capstone Project

*Working specification. See [Laboratory Curriculum](lab-specifications.md) for the overview and [Weekly Schedule](../syllabus/weekly-schedule.md) for milestones.*

The Week 14 capstone culminates in a demonstration and final red-team evaluation of an end-to-end anonymization pipeline. Evaluate both re-identification resistance and downstream computer-vision utility (for example, mAP or pose-estimation accuracy).

## Scope and Deliverables

Develop an end-to-end defensive anonymization pipeline on synthetic or appropriately consented and authorized imagery. Specify the protected attributes, permitted conditioning and auxiliary knowledge, independent sampling units, and complete release boundary. Use controlled artificial attributes for adversarial evaluation rather than attempting to recover real protected identifiers.

Submit a reproducible implementation or documented executable workflow, configuration and dependency records, a technical report with architecture and mathematical assumptions, independent privacy and utility evaluation, and a presentation or recorded demonstration. Include negative results, missed detections, inconclusive cases, and the limitations of the claimed protection.

Keep held-out reference labels unavailable during configuration selection. Select thresholds and settings on calibration material, then record the selected configuration before evaluating independent test data. If redesign follows test evaluation, obtain a fresh independent test set for the revised configuration.

## Provisional Assessment Rubric

| Component | Weight | Evaluation criterion |
|-----------|-------:|----------------------|
| Mathematical formulation and threat model | 20% | Explicit protected attributes, assumptions, release boundary, and defensible mathematical model |
| Implementation and system architecture | 20% | Correctly documented pipeline, appropriate baselines, failure handling, and integration |
| Privacy evaluation | 20% | Independent tests, coverage and residual leakage, statistical uncertainty, and qualified conclusions |
| Downstream utility evaluation | 15% | Appropriate task metrics, fixed conventions, comparative results, and trade-off analysis |
| Reproducibility and scientific integrity | 15% | Provenance, settings, software and model versions, independent test design, and honest reporting |
| Presentation and critical defense | 10% | Clear exposition, defensible interpretations, and recognition of limitations |
| **Total** | **100%** | |

The weights are provisional pending institutional assessment requirements. They grade the capstone itself, not its contribution to the final course grade. A well-supported negative result can earn full credit for the relevant evaluation criteria; apparent anonymity is not an assessment requirement.

See [Week 14, Day 1](../lectures/week14-day1.md) for metrics and evaluation methodology and [Week 14, Day 2](../lectures/week14-day2.md) for presentation guidance.
