# Shared Experimental Protocol

## Design and independence

Define the scientific question, forward/release model, parameter choices, metrics, independent sampling unit, and intended operating domain before collecting results. Separate known-reference implementation checks, calibration data, and independent test observations. Partition by source target, subject, or sequence before creating variants. Adjacent frames and multiple crops from the same target are not independent subjects.

For blind reconstruction, withhold the clean references, hidden parameters and noise realizations. For privacy or feature tests, withhold relevant reference labels. Students may inspect only the information specified by the exercise. Freeze the algorithm, configuration and output records before revealing test truth. Any later tuning is exploratory and requires a new independent test for a final performance claim.

The public repository must not contain withheld labels, generation seeds that reveal them, or confidential answer keys. Keep those in instructor-controlled storage. Public sanity checks in this manual are development examples, not held-out assessments.

## Numerical checks

Use small analytic examples before large experiments. State tolerances in terms of absolute and relative error and the data scale. For ordinary small float64 identity and convolution checks, an initial absolute tolerance of 1e-10 is reasonable; adjust only with a documented numerical justification. It is not a universal bound for ill-conditioned inversions.

For reference images on identical grids and scales,

$$
\mathrm{MSE}=\frac{1}{N}\sum_i(f_i-\hat f_i)^2.
$$

$$
\mathrm{PSNR}=10\log_{10}\frac{L^2}{\mathrm{MSE}}.
$$

Here $N$ counts evaluated scalar samples and $L$ is the declared intensity range (1 for normalized imagery). Zero MSE gives infinite PSNR. Specify any valid-region mask and channel aggregation; compare on the same support. For SSIM, use a tested library implementation and record data range, window and channel handling. Neither metric establishes correctness of an individual feature.

Preserve unclipped estimates and evaluate data-fit residuals using the specified forward model and appropriate noise likelihood. For Poisson counts, use a count likelihood or deviance, not a fixed-variance Gaussian interpretation.

## Reporting and uncertainty

Record every predeclared condition, including failures, abstentions and unavailable results. Use confusion counts with explicit denominators. Report uncertainty under the appropriate sampling assumptions. For zero failures in N independent Bernoulli trials with common failure probability, the one-sided upper 95% bound is

$$
p_{\mathrm{upper}}=1-0.05^{1/N}.
$$

For dependent or clustered observations, use suitable independent-unit analysis and state limitations. No observed failure is not proof of zero risk. A low residual, plausible image, or successful hash verification establishes only its respective limited claim.

## Integrity and ethics

Use synthetic or appropriately consented and authorized data. Public redacted photographs are illustrative only; do not try to identify protected subjects or reverse actual privacy redactions. Record source attribution and permissions. Preserve source bytes, use working copies, verify against a separately protected digest, and write new derivatives. Never store credentials, personal identifiers, or unnecessary sensitive metadata in public reports.

Use the [experiment report](../templates/experiment-report.md) and [benchmark header](../templates/benchmark-results.csv). For Lab 5, use the [forensic report](../templates/forensic-examination-report.md) and [audit manifest](../templates/audit-manifest.json).
