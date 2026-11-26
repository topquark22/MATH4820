# Week 11 — Visual Redaction and Information Leakage

*Companion exercises for [Day 1](../lectures/week11-day1.md) and [Day 2](../lectures/week11-day2.md). See [Workbook](README.md) for conventions.*

## Mathematical Exercises

1. Let $A(x_1,x_2,x_3)=x_1+x_2+x_3$. Determine its kernel and rank. Construct four distinct artificial candidates on which $A$ is injective, and prove injectivity using the difference-set criterion.
2. Prove that an attribute function $s$ factors through a release map $A$ on a candidate set if and only if equality of released values implies equality of attributes. Give an example where $s$ is recoverable although $A$ is not injective on the candidate set.
3. For a fair binary label $X$, a randomized mechanism releases the label with probability 0.3 and an erasure symbol otherwise, independently of $X$. Compute $H(X)$, $H(X\mid Y)$, and $I(X;Y)$ in bits.
4. Let $X$ and $Z$ be independent fair binary variables, and let $Y$ be their exclusive-or. Compute $I(X;Y)$ and $I(X;Y\mid Z)$. Explain the implication for evaluating side information.
5. Three artificial scalar outputs are $0,0.8,2$. Compute their minimum separation. Are their closed uncertainty intervals of radius 0.3 disjoint? What about radius 0.5?
6. Let $P=(0.6,0.3,0.1)$ and $Q=(0.2,0.3,0.5)$. Compute total variation distance and the optimal equal-prior binary classification error. Repeat the error calculation for priors 0.75 and 0.25.

## Computational Exercise

7. Generate small artificial numeric arrays with predefined binary labels. Compare block averaging and fixed replacement as release mechanisms. Measure label dependence using empirical contingency tables on independent artificial targets, and compare with a label-prior baseline. Specify retained utility, sample counts and the limitations of empirical mutual information estimates. Do not use actual redacted material or personal identifiers.

## Discussion

8. A published image has its sensitive region replaced by an opaque rectangle, but the original is retained in an embedded preview. Explain why raster-level noninterference does not establish release-level privacy. Describe appropriate checks for a defensive release workflow.
