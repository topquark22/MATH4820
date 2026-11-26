# Week 14 — Integrated Privacy–Utility Evaluation

*Companion exercises for [Day 1](../lectures/week14-day1.md) and [Day 2](../lectures/week14-day2.md). See [Workbook](README.md) for conventions.*

## Mathematical Exercises

1. Consider feasible leakage–utility pairs A = (0.1,0.3), B = (0.2,0.5), C = (0.3,0.8), D = (0.5,0.7), E = (0.6,0.9). Identify all nondominated points. Which configuration maximizes utility subject to leakage at most 0.25? At most 0.5?
2. Prove that B in Exercise 1 cannot maximize $U-\lambda P$ for any $\lambda>0$, even though it is nondominated.
3. A fixed detector produces ranked outcomes TP, FP, TP, TP, FP, TP against five reference objects. Calculate precision and recall at every rank and non-interpolated AP. State the maximum recall.
4. Three evaluated classes have AP values 0.8, 0.6, 0.4 before anonymization and 0.75, 0.55, 0.35 afterward. Compute class-average mAP in each condition and its absolute and relative change. Explain why a different class set would invalidate a direct comparison.
5. Five eligible reference keypoints have normalized errors 0.03, 0.08, 0.1, 0.15, and one missing prediction. Calculate PCK for thresholds 0.05 and 0.10, using inclusive thresholds and counting a missing prediction as incorrect.
6. Determine the minimum number of independent zero-failure trials needed to obtain an exact one-sided 95% upper confidence bound of at most 0.01. Explain why 300 adjacent frames from one video do not automatically qualify as 300 independent trials.

## Computational Exercise

7. Construct an artificial table of at least eight privacy–utility configurations, including dominated and unsupported nondominated points. Compute the nondominated set and choose a configuration subject to a predeclared leakage budget on calibration data. Supply a separate simulated test table, evaluate the chosen configuration without retuning, and discuss sampling uncertainty and the limitations of the example.

## Discussion

8. A team reports perfect anonymization because no privacy failures were observed in 40 trials and detection mAP decreased only slightly. Critically assess the claim. Specify the additional assumptions, measurements, confidence bounds, provenance records and evidence that would be needed for a defensible conclusion.
