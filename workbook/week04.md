# Week 4 — Discrete Fourier Transforms and Convolution

*Companion exercises for [Day 1](../lectures/week04-day1.md) and [Day 2](../lectures/week04-day2.md). See [Workbook](README.md) for conventions.*

Use the unnormalized forward DFT and inverse normalization $1/N$ (or $1/(MN)$ in two dimensions).

## Mathematical Exercises

1. Compute the four-point DFT of $(2,0,2,0)$ and recover the input using the inverse DFT.
2. Compute the four-point DFT of $(0,1,0,-1)$. Explain the conjugate symmetry and verify Parseval's identity.
3. Show that a circular shift of an input multiplies each Fourier coefficient by a unit-modulus phase factor. Explain why magnitude alone does not identify the shift.
4. Compute linear convolution of $f=(2,1,0)$ and $h=(1,2)$. Compute their length-three circular convolution after zero-padding $h$, and explain the discrepancy.
5. For $h=(1/2,1/2,0,0)$, find its four-point DFT and a nonzero vector in the kernel of circular convolution by $h$.
6. A $300\times400$ image is convolved with a $21\times11$ kernel. Find the minimum padded dimensions needed to obtain the full linear convolution by FFT. Explain why kernel placement and output extraction still matter.
7. An ideal Gaussian PSF has transfer magnitude $\exp(-2\pi^2\sigma^2\rho^2)$. For $\sigma=2$ and $\rho=0.25$ cycles/pixel, calculate its attenuation and reciprocal gain.

## Computational Exercise

8. Generate a small synthetic array and compare direct circular convolution with FFT-based convolution to numerical precision. Then compare direct full linear convolution with zero-padded FFT convolution. Deliberately omit padding and explain the observed discrepancy. Use asymmetric kernels as well as symmetric kernels to expose indexing errors.
