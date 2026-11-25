# Week 1 — Discrete Images, Linear Maps, and Interpolation

*Companion exercises for [Day 1](../lectures/week01-day1.md) and [Day 2](../lectures/week01-day2.md). See [Workbook](README.md) for conventions.*

## Mathematical Exercises

1. A grayscale image has $M\times N$ pixels and $b$ bits per pixel. Derive the cardinality of the space of such images. Evaluate it as a power of two for a $16\times16$ image with 8-bit samples.
2. Consider point sampling at integer coordinates. Construct two distinct continuous functions on $\mathbb R^2$ that agree at every point of $\mathbb Z^2$. Explain why increasing intensity precision does not resolve this ambiguity.
3. For a finite pixel grid, classify the following maps as injective, surjective, both, or neither, specifying the codomain: (a) a fixed permutation of pixels; (b) replacing every pixel by the mean of the image; (c) mapping an 8-bit pixel $x$ to $\min(x+20,255)$ on the 8-bit alphabet.
4. The linear map $T(x,y)=(3x+6y,x+2y)$ acts on $\mathbb R^2$. Find its kernel and image. Describe all preimages of $(6,2)$.
5. A unit square has corner values $I(0,0)=20$, $I(1,0)=60$, $I(0,1)=100$, $I(1,1)=140$. Compute the bilinear interpolant at $(0.25,0.75)$.
6. Let $h(t)=\max(1-|t|,0)$. Prove that the integer translates of $h$ sum to one for every real $t$. What does this imply for interpolation of a constant signal?

## Computational Exercise

7. Use the one-dimensional periodic signal $x=(0,1,0,1,0,1,0,1)$. Perform a half-sample shift using linear interpolation, then the opposite shift. Compare the result with the original and explain the loss. Repeat with a constant signal and a smooth sinusoid sampled on the same grid. Document the periodic convention.

## Discussion

8. Distinguish continuous coordinate invertibility, exact discrete pixel permutation, and invertibility of interpolation. Give an example of each relevant distinction and explain its forensic significance.
