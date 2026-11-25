# Week 8 — Forensic Integrity and Reproducibility

*Companion exercises for [Day 1](../lectures/week08-day1.md) and [Day 2](../lectures/week08-day2.md). See [Workbook](README.md) for conventions.*

## Mathematical Exercises

1. Explain why a 256-bit hash cannot be injective on all 257-bit strings. Does this imply that a collision can easily be found?
2. For an ideal $n$-bit hash, derive the probability of no collision after $q$ distinct inputs, and obtain the square-root approximation to the median collision threshold.
3. For an ideal 12-bit truncated hash, estimate the number of distinct inputs needed for a 50% collision probability. Contrast collision search with search for a specified digest.
4. Two files have identical decoded pixel arrays but different metadata. Explain what can and cannot be concluded from comparing their file digests and raster digests.
5. Explain why $(10^{16}-10^{16})+1$ and $10^{16}+(-10^{16}+1)$ may differ in binary64 arithmetic. Relate this to reproducibility of an FFT-based workflow.
6. An examiner obtains two same-shaped normalized arrays differing at one sample by 0.0002. Under a predeclared absolute tolerance of 0.0001 and zero relative tolerance, do they agree? Would passing the numerical tolerance establish file-byte equality?

## Computational Exercise

7. Generate a synthetic image file, preserve it, and verify a working copy against a separately recorded SHA-256 digest. Create a separate altered copy and demonstrate rejection. Then apply a documented transformation to the verified working copy, write a new output, and record input and output digests, software version, parameters, timestamps and outcome. Repeat without overwriting earlier results.

## Discussion

8. A working-copy digest matches the acquisition record but a custody transfer is undocumented. What is supported by the hash, and what remains unknown? Explain why neither a hash nor an audit manifest alone guarantees authenticity.
