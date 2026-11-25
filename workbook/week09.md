# Week 9 — Scientific Validation and Evidentiary Standards

*Companion exercises for [Day 1](../lectures/week09-day1.md) and [Day 2](../lectures/week09-day2.md). See [Workbook](README.md) for conventions.*

## Conceptual and Mathematical Exercises

1. Explain how implementation verification, method validation, and case-specific applicability differ. Give an image-processing example of each.
2. Distinguish the functions of US Federal Rule of Evidence 702, the Canadian Mohan framework, ISO/IEC 17025, and SWGDE technical guidance. Why is laboratory accreditation not a judicial ruling?
3. A reconstruction of a 512-by-512 normalized grayscale image differs from its reference only at 32 pixels, by 0.25 at each. Calculate MSE and explain why this may conceal an evidentially important error.
4. A binary feature detector produces TP = 45, FN = 5, FP = 3, and TN = 57. Calculate sensitivity, specificity, and the false-positive rate.
5. Derive the exact one-sided upper 95% binomial confidence bound for zero false positives in 200 independent negative controls. Compare with the rule of three.
6. A detector has sensitivity 90% and false-positive probability 2%. Under a specified population model with feature prevalence 1%, compute the positive predictive value. Explain why the prevalence cannot simply be taken from a balanced control dataset.

## Computational Exercise

7. Use independent synthetic reference targets with and without a predefined stroke. Apply matched degradations and a fixed reconstruction method, evaluate a threshold chosen on calibration data, and report confusion counts, uncertainty and inconclusive cases. Include a degraded baseline and a mismatched forward model. Explain the independent sampling unit and whether the binomial assumptions are defensible.

## Discussion

8. An expert reports a zero false-positive count in 40 tests, all derived from the same reference image. Critique the interpretation of the result, the applicability of the method, and the scientific basis of a proposed identification. Keep legal conclusions conditional on the relevant jurisdiction.
