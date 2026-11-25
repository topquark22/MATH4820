# Week 2 — Geometric Warping and Parameter Estimation

*Companion exercises for [Day 1](../lectures/week02-day1.md) and [Day 2](../lectures/week02-day2.md). See [Workbook](README.md) for conventions.*

## Mathematical Exercises

1. Derive the affine translation vector for rotation by $90^\circ$ counterclockwise about $(3,2)$. Find the image of $(4,2)$ and verify its inverse.
2. Suppose $T(x)=Ax+t$ and $U(x)=Bx+s$ on $\mathbb R^2$. Derive $U\circ T$ and its inverse when $A,B$ are nonsingular. Explain why order matters.
3. A homography maps $(x,y)$ to $(x/(1+x/10),y/(1+x/10))$. Find the image of $(5,3)$, the excluded source line, and the inverse on its affine-chart domain.
4. A radial warp rotates by angle $\theta(r)=\pi(1-r/R)$ for $r<R$ and zero otherwise. Prove that the warp is bijective, including at the center and boundary. Derive its inverse.
5. For a $6\times6$ image partitioned into nine $2\times2$ blocks, count the permutations of blocks when internal pixel order is fixed. Compare with unrestricted pixel permutation.
6. A four-parameter swirl search uses 20 candidates per parameter, followed by a local refinement of 5 candidates per parameter. Count the candidate evaluations for an exhaustive coarse stage and one refinement stage. Discuss when refinement might miss the true solution.

## Computational Exercise

7. On a synthetic grid with horizontal and vertical lines, implement a radial swirl and backward-mapped inverse. Compare exact parameters with a center displaced by one pixel. Use a separate calibration target to choose an edge-continuity score; report its limitations on the test grid. Record interpolation, boundary conventions, and the parameter search range.

## Discussion

8. Is a visually convincing inverse warp evidence of a unique parameter estimate? Give two reasons why not and propose an independent control.
