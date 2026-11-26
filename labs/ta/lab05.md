# TA Guide — Lab 5: Forensic Validation and Generative Artifacts

[Student specification](../lab05.md) · [Week 8](../../lectures/week08-day1.md) and [reproducibility](../../lectures/week08-day2.md) · [Week 9](../../lectures/week09-day1.md) and [validation](../../lectures/week09-day2.md) · [Week 10](../../lectures/week10-day1.md) and [generative artifacts](../../lectures/week10-day2.md) · Workbook [8](../../workbook/week08.md), [9](../../workbook/week09.md), [10](../../workbook/week10.md).

## Preparation

Prepare a synthetic lossless source file, a working copy, a deliberately altered copy, and a separately protected acquisition digest. Use independent artificial reference targets with predefined positive and negative feature labels, including a relevant forward-model mismatch. Keep calibration and test labels separate. For Part C, prepare authorized synthetic or appropriately consented adult portraits, conventional baseline outputs, and a tested model environment or precomputed output bundle with the relevant licensing and provenance records.

Use the [shared protocol](experimental-protocol.md), [audit manifest](../templates/audit-manifest.json), and [mock report](../templates/forensic-examination-report.md). Public sanity checks below are not hidden assessment data.

## Session allocation

| Minutes | Week 8 — Part A | Week 9 — Part B | Week 10 — Part C |
|---------|-----------------|-----------------|------------------|
| 0–10 | Source vs. working copy | Define task and labels | Model assumptions and provenance |
| 10–25 | Verify digest and reject alteration | Check independent controls | Baseline and model output inspection |
| 25–40 | Record derivative and manifest | Compute confusion counts | Feature-specific evaluation |
| 40–50 | Repeat and compare | Interpret uncertainty and mismatch | Record failures and limitations |
| 50–60 | Review audit trail | Freeze or review evaluation | Review mock report |

## Part A — integrity and repeatability

The SHA-256 of the three ASCII bytes abc (no newline) is:

~~~text
ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad
~~~

Check this standard public test vector before hashing files. The altered working copy must be rejected before a derivative is produced. A matching digest establishes byte agreement relative to the trusted acquisition record; it does not establish authenticity, truth of metadata, or completeness of custody.

Distinguish byte-level reproducibility from numerical agreement. Fix an absolute/relative tolerance before comparing arrays, and report the compared representation. Do not overwrite the source or silently replace prior outputs. Repeated runs with differing timestamps may produce distinct manifests while raster output remains identical.

## Part B — feature validation

Use the Week 9 framework: implementation verification, method validation, and applicability to the intended domain. Define feature presence and the decision rule before evaluating independent targets. Include degraded and conventional baselines. Record true positives, false positives, true negatives, false negatives and abstentions, with explicit denominators and treatment of inconclusives.

Example: TP = 45, FN = 5, FP = 3, TN = 57 implies sensitivity 0.90 and false-positive rate 0.05. With zero observed false positives in 100 independent negative controls, the upper one-sided 95% binomial bound is approximately 0.02951. The same formula is not justified by 100 correlated variants of one source.

If an extra stroke appears after restoration, ask whether independent reference data support it. A small global MSE may hide a task-critical feature error. A low forward residual is not independent proof of that feature.

## Part C — learned restoration

Keep observations and comparison grids consistent across the conventional and learned methods. Record model/checkpoint digest, face detection, alignment, preprocessing, fidelity settings, output encoding and failures. Do not select the best-looking held-out result after revealing truth.

Assess global fidelity and separately defined feature errors. If an embedding distance is used, interpret it as model-dependent representation drift, not proof of identity. No real-world identification exercise is required. The student may report that a feature is unresolved, demonstrably false in a control, or not independently supported.

## Diagnostic assistance

- Unexpected digest: check byte domain, newline, encoding, and whether an editor changed the file.
- Reproducibility mismatch: compare pipeline stages and numerical environment; do not alter the recorded digest to make a check pass.
- High apparent accuracy: inspect class balance, threshold selection, independence, and excluded failures.
- Model failure: retain it in the evaluation; use precomputed authorized outputs for hardware limitations.
- Overstated legal conclusion: distinguish scientific validation, applicability, evidentiary weight and admissibility under the relevant jurisdiction. Do not claim accreditation or universal admissibility.

## Suggested marking

Integrity and reproducibility 30%; control design and statistical interpretation 30%; learned-restoration assessment 20%; report and qualified conclusions 20%. Do not require a predetermined hallucination rate or a positive finding.
