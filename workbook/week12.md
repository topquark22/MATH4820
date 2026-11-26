# Week 12 — Web-Scale Visual Privacy Pipelines

*Companion exercises for [Day 1](../lectures/week12-day1.md) and [Day 2](../lectures/week12-day2.md). See [Workbook](README.md) for conventions.*

## Mathematical Exercises

1. Two boxes each have area 120, with intersection area 90. Compute intersection over union and reference coverage. Compare with a prediction containing the entire reference and having area 240.
2. In a population of one million independent candidate regions, prevalence is 0.002, recall is 0.995, and false-positive probability is 0.005. Compute expected true positives, false negatives, false positives, and precision.
3. A proposal detector has recall 0.998 and false-positive probability 0.06. A post-processor retains 99% of true positives and 5% of false positives. Compute final rates using conditional probability, and explain why no independence assumption is needed.
4. With independent per-object miss probability 0.002, find the probability of at least one miss among 500 objects. Give the expected number of misses and a union bound when independence is not assumed.
5. Suppose two protected source views are invariant to changes in designated sensitive coordinates. Prove that a fixed weighted stitching operation preserves this property. Identify an assumption that could fail if weights were estimated from original source pixels.
6. For a fixed mask and fixed independent replacement, derive the Jacobian of alpha blending. Repeat for a linear blur replacement, and explain why full opacity alone does not imply noninterference.

## Computational Exercise

7. Construct a synthetic collection with artificial sensitive-region annotations, and a fixed set of simulated prediction scores. Evaluate coverage, recall, precision, and unnecessary masked area across predeclared thresholds on independent evaluation scenes. Report the independent sampling unit, uncertainty, and the utility cost of unnecessary masking. Compare with a complete independent replacement baseline.

## Photographic Discussion

8. View the [openly licensed redacted street photograph](../media/samples/README.md) and the linked Google Street View privacy examples in Day 1. Discuss the visible plate redaction, retained scene utility, and what cannot be established without independent reference data. Do not attempt to infer the concealed identities or identifiers.
