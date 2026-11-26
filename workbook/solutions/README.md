# Workbook — Instructor Answer Sketches

These sketches provide answers or evaluation guidance, not complete worked solutions for every open-ended exercise. The workbook is separate from graded assessments. This directory is publicly visible in the current repository; it is not access-controlled.

## Week 1

1. $(2^b)^{MN}=2^{bMN}$; the example gives $2^{2048}$.
2. Take $f=0$ and $g(x,y)=\sin(\pi x)$. They agree on the sampling lattice but differ elsewhere.
3. (a) Bijective on arrays of the fixed shape and alphabet. (b) On real-valued arrays of more than one pixel, neither injective nor surjective onto all arrays; surjective onto constant arrays. (c) Neither on the full 8-bit alphabet: several inputs clip to 255, and outputs 0 through 19 are missing.
4. Kernel $=\{(-2t,t):t\in\mathbb R\}$; image is the span of $(3,1)$. Preimages of $(6,2)$ satisfy $x+2y=2$.
5. The interpolant is $20+40(0.25)+80(0.75)=90$.
6. Between consecutive integers only two translates have nonzero weights, summing to one; at an integer the corresponding weight is one. Constants are preserved.
7. The alternating signal becomes constant 0.5 after the first shift; the second cannot restore it. Constants are unchanged. The sinusoid is attenuated; compare its amplitude before and after.
8. A continuous rotation is bijective; an integer-grid permutation is exactly reversible; interpolation may lose information even when the coordinate map is bijective.

## Week 2

1. The rotation matrix maps $(x,y)$ to $(-y,x)$; $t=(5,-1)$. The point maps to $(3,3)$. Apply the opposite rotation about $(3,2)$ to recover $(4,2)$.
2. $U(T(x))=BAx+Bt+s$. Its inverse sends $y$ to $A^{-1}(B^{-1}(y-s)-t)$. Matrix products and translations need not commute.
3. The image is $(10/3,2)$. The excluded line is $x=-10$. For output $(u,v)$, the inverse is $(u/(1-u/10),v/(1-u/10))$, excluding $u=10$.
4. The radius is preserved, and each circle is rotated bijectively. Negate the angle at the same radius; the center is fixed and the warp is the identity at and beyond $R$.
5. $9!$ versus $36!$.
6. $20^4=160000$ and $5^4=625$, total 160625. The coarse objective may favor a different basin, or the true optimum may lie outside the refined region.
7. Compare known-parameter recovery and displaced-center results under identical settings. Examine edge continuity, residual artifacts and whether the calibrated score ranks plausible alternatives correctly.
8. Different parameters can yield nearly identical observations or scores; interpolation and compression introduce ambiguity. Use independent targets with known distortion and assess the parameter errors and false matches.

## Week 3

1. For example, $(0,0,0,4)$ and $(1,1,1,1)$ both have mean one. Rank is one and nullity is three.
2. The normalized DC basis has value $1/8$ at every sample, so the DC coefficient is 96; AC coefficients vanish.
3. Stored integers: $(-2,-1,-1,0,0,1,1,2)$; decoded values: $(-20,-10,-10,0,0,10,10,20)$.
4. Squared error is at most $16(2^2)+48(5^2)=1264$; MSE at most 19.75.
5. Once a value is an integer multiple of the step, the same scalar quantizer leaves it unchanged. JPEG includes inverse transforms, sample rounding, possible clipping and color processing, which can move coefficients on re-encoding.
6. For two-stage quantization the final values 0, 6, 12, 18 have counts 2, 8, 4, 6, respectively. Direct step-6 quantization yields counts 3, 6, 6, 5. Both total 20.
7. Compare coefficient histograms and alignment effects; decoded-block DCT estimates are affected by sample rounding and are not necessarily the stored coefficients.
8. Examples include messaging-platform recompression, editing or cropping for publication, and conversion during archiving. Traces support a processing-history hypothesis, not intent.

## Week 4

1. DFT $(4,0,4,0)$; inverse gives the stated input.
2. DFT $(0,-2i,0,2i)$. The conjugate pair follows from real input. Spatial energy is 2; frequency energy divided by four is also 2.
3. Substitute the shifted index in the DFT sum to obtain the factor $\exp(-2\pi i k n_0/N)$; its modulus is one.
4. Linear output $(2,5,2,0)$; length-three circular output $(2,5,2)$, equal here to the nonzero portion because the last linear sample is zero. In general the excess tail wraps to the beginning; for this specific input there is no nonzero wraparound discrepancy.
5. DFT $(1,(1-i)/2,0,(1+i)/2)$. A kernel vector is $(1,-1,1,-1)$.
6. Minimum $320\times410$. The origin convention determines phase and alignment; extract the appropriate full or cropped result.
7. $\exp(-\pi^2/2)\approx0.00719$, gain approximately 139.
8. Direct and FFT results should agree under matching conventions up to numerical error. Insufficient padding introduces wraparound; asymmetric kernels expose reversal or origin mistakes.

## Week 5

1. Uniqueness, existence, and stability, respectively.
2. $\hat F=B/H=F+N/H$. Error magnitudes: 0.02, 0.2, 20.
3. $\hat F-F=(H_t/H_a-1)F+N/H_a$.
4. Take unit-norm Fourier perturbations supported in frequency bands moving outward. The inverse multiplier grows exponentially, so inverse norms are unbounded. On a fixed finite grid with nonzero coefficients the gain is finite but may be extremely large; exact zeros imply non-injectivity.
5. Variances 16 and 625; standard deviations 4 and 25; relative standard deviations 25% and 4%. The conditional distributions depend on intensity.
6. If $Hv=su$, then the inverse sends $\eta u$ to $(\eta/s)v$ on that singular direction. Small singular values amplify perturbations.
7. Assess both noise and model mismatch; retain unclipped metrics and documented thresholds. The test reference cannot be used to choose the threshold.
8. Null-space components leave the residual unchanged; nearly invisible components can produce materially different features with almost identical residuals.

## Week 6

1. $(H^*H+\lambda L^*L)f=H^*g$. Uniqueness holds when the common kernel of $H$ and $L$ is trivial.
2. Naive gain 20; Tikhonov gains $0.05/(0.0025+0.0025)=10$ and $0.05/(0.0025+0.01)=4$.
3. The expected error is $(ah-1)^2S+a^2V$. Differentiation yields $a=hS/(h^2S+V)$ when the denominator is positive.
4. Up to constants, the Poisson objective is $\sum_i(\mu_i-b_i\log\mu_i)$. Gaussian fixed-variance fitting gives a scaled squared residual; Poisson variance depends on the mean.
5. The predicted counts are $(4,4)$ and ratio is $(0.5,1.5)$. The adjoint and normalization are identity and ones, respectively. The update is $(2,6)$.
6. Scaling the image by $c>0$ and the kernel by $1/c$ leaves convolution unchanged. Unit-sum PSF normalization fixes this scaling but not other ambiguities.
7. Compare on the appropriate observation models with consistent conventions and independent evaluation. Include a simple baseline and parameter-selection records.
8. Regularization can avoid fitting noise or weakly measured components even at the cost of a larger residual.

## Week 7

1. An ideal bijective warp can be inverted; discrete interpolation may not be. Blur may have zeros or unstable inverse; unknown noise cannot generally be removed exactly; quantization is many-to-one. Known additive noise could be subtracted in the ideal model.
2. $(HW)^{-1}=W^{-1}H^{-1}$. For example, a shear and unequal diagonal scaling do not commute.
3. Naive estimate $(1,2)$. Tikhonov estimate $(1/1.01,0.0002/0.0101)$, approximately $(0.9901,0.01980)$. A 0.01 perturbation changes the naive second coordinate by 1, but the regularized one by about 0.00990.
4. Selecting on the test reference makes the reported test error optimistically biased; choose on independent calibration data or use a predeclared observation-only criterion.
5. Gaussian observations use a squared residual with appropriate covariance; Poisson observations use a count likelihood with intensity-dependent variance.
6. For the stated forward order, deconvolution then unwarping is the formal reverse order. Compare alternatives with recorded settings and independent evaluation; sequential approximate inverses may behave differently.
7. Use two distinct vectors differing by a nonzero kernel component. A shared observation cannot identify the correct original from that observation alone.
8. Document the pipeline and alternatives; use independent positive and negative controls representative of the degradation. Seek corroboration rather than asserting an unsupported identification.

## Week 8

1. There are $2^{257}$ inputs and $2^{256}$ outputs; collisions exist by pigeonhole, but this gives no efficient collision-finding algorithm.
2. With $K=2^n$, multiply successive probabilities $1-j/K$. The logarithm is approximately $-q(q-1)/(2K)$ near the birthday scale. Median threshold approximately $\sqrt{2K\log2}$.
3. About 75 distinct inputs for a 50% collision probability. A fixed-target search has expected 4096 trials under the ideal model.
4. Different encoded bytes can produce identical decoded arrays. File hashes concern encoded bytes; raster hashes concern a specified serialization. Neither authenticates metadata or proves scene truth.
5. The small increment is lost when added to the large negative number; the two expressions give 1 and 0 under ordinary binary64 rounding. Different operation orders can change numerical output.
6. The difference exceeds the tolerance. Numerical agreement would not establish file-byte equality.
7. Verify before processing, reject the altered copy, preserve every source and prior derivative, and record actual run metadata. Compare repeated results at the declared level of agreement.
8. The digest supports byte integrity relative to a trustworthy reference. It cannot establish the missing custody history or truth of assertions; protected records and independent corroboration matter.

## Week 9

1. Verification checks correct implementation; validation measures intended-task performance; applicability assesses whether case conditions match the validated domain. Examples: FFT versus direct convolution; stroke detection on independent controls; checking the case PSF and noise regime.
2. Rule 702 and Mohan concern expert-evidence admissibility in their respective legal systems. ISO/IEC 17025 concerns laboratory competence; SWGDE supplies technical guidance. Accreditation does not decide admissibility.
3. $32(0.25)^2/512^2=1/131072$, approximately 0.0000076294. A localized feature may matter despite small global error.
4. Sensitivity 90%; specificity 95%; false-positive rate 5%.
5. $1-0.05^{1/200}\approx0.014867$, or 1.4867%; rule of three gives 1.5%.
6. $0.9(0.01)/(0.9(0.01)+0.02(0.99))=0.3125$. The 31.25% result is conditional on that population model; a control design does not establish prevalence.
7. Report counts, independent units, threshold provenance, comparison with baseline, mismatch failures and uncertainty. Do not exclude inconclusive cases silently.
8. Replicates share the same reference and may be dependent; generalization to other targets is unestablished. A zero count does not imply zero error probability or a reliable particular identification.

## Week 10

1. Up to constants, the objective is $\|Hf-g\|^2/(2\sigma^2)+\gamma\|Lf\|^2/2$. Multiplying by $2\sigma^2$ gives $\lambda=\gamma\sigma^2$.
2. At least $128^2-32^2=15360$. A learned prior can prefer plausible alternatives but does not measure arbitrary missing components.
3. Mean $=1.4$; MAP $=1$. Expected squared errors are 1.24 and 1.4, respectively.
4. By the triangle inequality, the sum of the two errors is at least the separation; at least one is at least half the separation.
5. $\bar\alpha_2=0.72$; conditional mean $\sqrt{0.72}x_0$; variance 0.28.
6. Distance $\sqrt{2(1-0.8)}=\sqrt{0.4}\approx0.6325$. Both metrics depend on the same representation and do not independently validate identity.
7. Use matched observations, record model settings and failures, retain independent references, and report feature errors and limitations without cherry-picking.
8. Processing provenance concerns whether a model was used; feature attribution requires evidence that a particular detail was synthesized or altered. Anonymization may intentionally replace details, but privacy and utility must be tested independently.

## Week 11

1. Rank one; kernel consists of vectors whose coordinates sum to zero, with dimension two. For example $(0,0,0),(1,0,0),(1,1,0),(1,1,1)$ have sums 0, 1, 2, 3. No nonzero difference of these candidates lies in the kernel.
2. If $s=b\circ A$, equal outputs imply equal labels. Conversely define $b(Ax)=s(x)$; the implication ensures this is well-defined. For example, take $A$ to be a block mean and $s$ the indicator that this mean exceeds a fixed threshold.
3. Initial entropy is 1 bit, conditional entropy is 0.7 bits, and mutual information is 0.3 bits.
4. Without $Z$, the exclusive-or output is independent of $X$, so mutual information is zero. Given $Z$, the output determines $X$, giving conditional mutual information of 1 bit.
5. Minimum separation 0.8. Radius 0.3 gives disjoint intervals; radius 0.5 gives overlapping intervals for the first two centers.
6. Total variation is $(0.4+0+0.4)/2=0.4$. Equal-prior error is 0.3. For unequal priors the summed smaller weighted masses are $0.05+0.075+0.075=0.2$.
7. Report the release mechanism and label distribution, contingency counts and uncertainty, comparison against the baseline, and utility. Finite empirical estimates can be biased, especially with sparse categories; absence of measured dependence is not proof of independence.
8. The protected coordinates may be absent from the rendered raster while present in another representation. Verify the complete independent release artifact, including previews, layers, metadata and associated files, and withhold the release if requirements are not satisfied.

## Week 12

1. IoU = 90/150 = 0.6; coverage = 0.75. With full containment by area 240, IoU = 0.5 and coverage = 1.
2. Expected TP = 1990, FN = 10, FP = 4990. Precision from expected counts is 1990/6980, approximately 28.51%; this is the population conditional probability under the model, not necessarily the expected finite-sample ratio.
3. Final recall = 0.98802; false-positive probability = 0.003. Multiply the proposal probability by conditional retention.
4. Under independence, $1-0.998^{500}\approx0.63249$. Expected misses = 1 without needing independence; the union bound is 1.
5. Each protected view is unchanged by the specified perturbation; fixed warps and weights preserve equality under composition and summation. Geometry or weights derived from the original sensitive pixels may violate the invariance assumption.
6. With independent fixed replacement, the Jacobian is $\mathrm{diag}(1-\alpha)$. With linear replacement $Hf$, add $\mathrm{diag}(\alpha)H$. At full opacity the second term may remain nonzero.
7. Document threshold selection, independent scene-level units, matching criteria and utility definitions. Distinguish geometric coverage from effective protection; report both false-negative and unnecessary masking outcomes.
8. The street photograph illustrates actual plate redaction and preserved context; the linked Google examples illustrate other redaction styles. Appearance alone does not establish the transformation parameters, exact original content, or statistical privacy guarantees.

## Week 13

1. Conditional on $C=c$, the output law is the pushforward of the independent law of $Z$ under $G(c,\cdot)$ and does not depend on $X$. Expanding $I(X;C,Y)$ in two orders gives $I(X;C)=I(X;Y)+I(X;C\mid Y)$, hence the bound.
2. The binary symmetric channel preserves a fair marginal, so $I(X;C)=1-h_2(0.2)\approx0.278072$ bits, where $h_2(p)=-p\log_2p-(1-p)\log_2(1-p)$. The same leakage remains for $Y=C$; a constant output leaks zero bits in this model.
3. For fixed mask, conditioning and randomness, $(1-M)\odot V=0$ makes the retained raster and generator input identical. For a counterexample, let the two-pixel source be $(1,1)$ and select mask $(1,0)$ or $(0,1)$ according to a protected bit. Replacing the masked coordinate by zero discloses the bit through the location of the zero.
4. Apply data processing to $X\to Y\to U$. With the stated binary channel the lower bound is $1-h_2(0.25)\approx0.188722$ bits.
5. Predicted state $(5,5.5,2,-3)$; position $(5,5.5)$. Missing observations leave localization uncertainty and may require conservative protection or withholding, rather than treating an undetected region as safe.
6. Unaligned squared error is $1+0.25=1.25$, so MSE = 0.25. The shifted signal is $(0,0,1,1,0)$, giving compensated MSE = 0.05. Excluding the fourth sample leaves four valid samples with zero error.
7. Use independent synthetic sequences and seeded randomness; compare matched motion conditions, distinguish missing coverage from zero error, and report how the chosen metric reflects appearance rather than identity protection. A fixed independent replacement is a useful baseline.
8. Each marginal mutual information is zero; the pair determines $X$, so joint mutual information is one bit. Evaluate the complete sequence and permitted side information; consistent synthetic appearance may support tracking yet undermine an unlinkability requirement.

## Week 14

1. Nondominated: A, B, C, E. C dominates D. Under budget 0.25 choose B; under budget 0.5 choose C.
2. B must beat or tie A, requiring $0.5-0.2\lambda\ge0.3-0.1\lambda$, hence $\lambda\le2$. It must beat or tie C, requiring $0.5-0.2\lambda\ge0.8-0.3\lambda$, hence $\lambda\ge3$. These cannot both hold.
3. Precision at successive ranks: $1,1/2,2/3,3/4,3/5,2/3$; recall: $1/5,1/5,2/5,3/5,3/5,4/5$. AP is $(1+2/3+3/4+2/3)/5=37/60\approx0.616667$. Maximum recall 0.8.
4. Original mAP 0.6; anonymized mAP 0.55. Absolute decrease 0.05 (five percentage points), relative decrease approximately 8.33%. The aggregation must use the same evaluated classes and conventions.
5. PCK at 0.05 is 1/5 = 0.2; at 0.10 it is 3/5 = 0.6.
6. $N\ge\log(0.05)/\log(0.99)$, hence 299 independent trials. Adjacent frames share subjects and acquisition conditions and are generally dependent.
7. Verify dominance by pairwise comparison. Record the calibration-only selection rule and evaluate the fixed choice on the separate test table. Artificial point estimates illustrate the method but do not establish deployment performance.
8. Under independent Bernoulli sampling with common failure probability, the exact upper 95% bound is $1-0.05^{1/40}\approx0.07216$. Without justified independence or applicability even that bound need not describe deployment risk. Specify threat model, coverage, leakage baseline, held-out references, utility evaluator, uncertainty and reproducible release records. A small mAP decrease is not proof of privacy.
