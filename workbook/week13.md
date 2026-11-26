# Week 13 — Generative Anonymization and Temporal Consistency

*Companion exercises for [Day 1](../lectures/week13-day1.md) and [Day 2](../lectures/week13-day2.md). See [Workbook](README.md) for conventions.*

## Mathematical Exercises

1. Suppose $Z$ is independent of $(X,C)$ and $Y=G(C,Z)$. Prove conditional independence of $X$ and $Y$ given $C$, and derive $I(X;Y)\le I(X;C)$ from the chain rule.
2. Let $X$ be a fair bit and let $C$ equal $X$ with probability 0.8 and its complement otherwise, with independent flipping. Compute $I(X;C)$ in bits. If $Y=C$, what leakage remains? If $Y$ is constant, what changes?
3. Prove noninterference of the fixed-mask inpainting equation for perturbations supported on the mask. Give a counterexample in which a mask computed from a sensitive input leaks a protected bit even though the replacement itself is constant.
4. Let an authorized utility feature $U=u(Y)$ be a deterministic function of the output. Prove $I(X;Y)\ge I(X;U)$. Evaluate this lower bound when $X$ is fair and $U$ equals $X$ with probability 0.75 under independent bit flipping.
5. A constant-velocity state is $(4,7,2,-3)$ with time increment 0.5 and zero process noise. Calculate the predicted state and positional observation. Explain why a missed observation does not establish that the corresponding region is safe to release.
6. For circular signals $a=(0,1,1,0,0)$ and $b=(0,0,1,0.5,0)$, compute the unaligned MSE and the MSE after a right circular shift of $a$ by one sample. Recalculate the compensated MSE when the fourth sample is excluded by a validity mask.

## Computational Exercise

7. Construct a short synthetic sequence of moving geometric shapes. Compare frame-wise randomized color replacement with persistent track-wise replacement, using independently assigned artificial labels and a fixed mask convention. Compute known-motion-compensated error, report valid correspondence coverage, and demonstrate how a missed mask changes protection. Do not use real identifiers or infer identities from existing redacted media.

## Discussion

8. Let independent fair bits $X,Z$ generate two releases $Y_1=Z$ and $Y_2=X\mathbin{\mathrm{xor}}Z$. Calculate the marginal and joint mutual information. Explain the implications for evaluating an anonymized video and for distinguishing synthetic-track consistency from unlinkability.
