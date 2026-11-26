# Teaching Assistant Laboratory Manual

MATH 4820 / CS 6820 — Computational Image Forensics, Inverse Problems, and Visual Privacy.

This manual accompanies the [student laboratory specifications](../lab-specifications.md), [lectures](../../lectures/README.md), and [workbook](../../workbook/README.md). It supplies preparation, checkpoints, diagnostic guidance, and suggested marking criteria. It does not replace the student specifications or set new compulsory deliverables. Proposed extensions require instructor approval.

**Status:** instructional draft. Dataset recipes, reference checks, timings, and software suggestions must be trialled before formal delivery. The repository is public: do not store confidential assessment data, hidden labels, or private student records here.

## Contents

| Guide | Scheduled teaching weeks |
|-------|--------------------------|
| [Environment and preparation](environment.md) | Before Week 1 and model-based labs |
| [Experimental protocol](experimental-protocol.md) | All weeks |
| [Lab 1 — Resampling](lab01.md) | 1 |
| [Lab 2 — Geometric unwarping](lab02.md) | 2–3 |
| [Lab 3 — Naive deconvolution](lab03.md) | 4–5 |
| [Lab 4 — Regularized restoration](lab04.md) | 6; due in Week 7 |
| [Lab 5 — Forensic validation](lab05.md) | 8–10 |
| [Lab 6 — Privacy engineering](lab06.md) | 11–13 |
| [Capstone — Evaluation and defense](capstone.md) | 13–14 |

## Session model

The scheduled lab is one hour, not the total expected implementation time. For multi-week labs, use each session to introduce a new experiment and check the preceding work. Provide tested starter infrastructure for routine data loading, plotting, and bookkeeping, without supplying implementations of the algorithms being assessed. Lab 4 in particular needs preparation and follow-up work; do not expect all methods to be completed in one hour.

Before each session, check the relevant lecture has been taught, announce permitted resources, run the reference controls, and prepare an offline fallback. During the session, prioritize reasoning and the first reliable checkpoint over completing every optional comparison. Afterward, record common difficulties and revise future preparation.

## Assistance and marking

Use progressive hints: ask students to state the model and assumptions; request a minimal reproducible example; suggest an invariant or control; then isolate the failing stage. Avoid giving the finished assessed algorithm. Distinguish implementation errors from legitimate non-identifiability, instability, model mismatch, or insufficient evidence.

The percentage allocations in individual lab guides are suggestions for marking within each lab, not course-grade weights or binding rubrics. Confirm them with the instructor before publication. Apply the same criteria to hardware-independent alternatives. A scientifically supported negative result can earn full credit for the relevant reasoning and evaluation criteria.

## Templates

- [Experiment report](../templates/experiment-report.md)
- [Mock forensic examination report](../templates/forensic-examination-report.md)
- [Audit manifest example](../templates/audit-manifest.json)
- [Benchmark results CSV header](../templates/benchmark-results.csv)

Keep the templates separate from confidential records. Do not include secrets, real personal identifiers, or unnecessary source paths in submitted reports.
