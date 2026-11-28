# Core Concepts and Technical Notes

This document summarizes the principal mathematical models, results, assumptions, and limitations of MATH 4820 / CS 6820. It follows the four parts of the developed curriculum and serves as a reference alongside the [lecture notes](../lectures/README.md), rather than repeating their proofs and exercises.

See also the [weekly schedule](weekly-schedule.md), [workbook](../workbook/README.md), [laboratory specifications](../labs/lab-specifications.md), [TA experimental protocol](../labs/ta/experimental-protocol.md), and [assessment framework](../assessment/README.md).

## Part I — Mathematical Foundations and Geometric Transformations (Weeks 1–3)

### Image spaces and operators

Model continuous-coordinate images as functions $f:\mathbb{R}^2\to\mathbb{R}^k$, or functions on specified subsets of the plane; continuity is not assumed. Digital images are finite arrays with specified grids, channel counts, intensity scales, and numerical representations. Distinguish integer-valued encoded samples from floating-point working arrays.

Injectivity means distinct inputs give distinct outputs; surjectivity depends on the specified codomain. Bijectivity establishes a set-theoretic inverse, not necessarily a stable numerical inverse. An operator may be non-injective on the full image space but injective on a restricted domain.

### Geometric transformations

For bijective $T$, the ideal warp is $W_T f=f\circ T^{-1}$. An affine map $T(x)=Ax+b$ is invertible precisely when $\det A\ne0$. An invertible homogeneous matrix represents a projective homography, up to nonzero scale, with finite-coordinate formulas restricted to points having nonzero projective denominator.

**Radial swirl.** For center $(x_0,y_0)$, let $r$ be the distance from that center and rotate each circle through $\theta(r)$:

$$
\begin{pmatrix}
x'\\
y'
\end{pmatrix} = \begin{pmatrix}
x_0\\
y_0
\end{pmatrix} + \begin{pmatrix}
\cos\theta(r)&-\sin\theta(r)\\
\sin\theta(r)&\cos\theta(r)
\end{pmatrix} \begin{pmatrix}
x-x_0\\
y-y_0
\end{pmatrix}.
$$

Radius is preserved, so the inverse uses $-\theta(r)$ and the center is fixed. Pixel permutations are exactly invertible on a finite grid; general resampled warps are not.

The historical *Operation Vico* (2007) case motivates geometric parameter estimation. Distinguish the documented reversal of a swirl from the course's illustrative edge-continuity search; the exact historical implementation requires primary-source verification.

### Sampling, interpolation, and quantization

For unit grid spacing, an interpolated image has the form

$$
\widehat f(x,y)=\sum_{m,n}I[m,n]h(x-m,y-n).
$$

Separable two-dimensional kernels are products of one-dimensional kernels. Nearest-neighbor, linear, and Keys cubic interpolation differ in support, smoothness, and frequency response; cubic kernels can overshoot. Repeated resampling can lose detail even when the composed continuous map is the identity.

Use backward mapping and explicit pixel-center, axis, and boundary conventions. Account separately for resampling, cropping, clipping, and quantization.

JPEG uses color conversion (typically RGB to YCbCr), possible chroma subsampling, block DCT, coefficient quantization, and entropy coding. The ideal DCT is invertible; quantization and subsampling can be many-to-one. For step $q>0$, an illustrative scalar quantizer is $Q_q(t)=q\lfloor t/q+1/2\rfloor$. Tie conventions matter. Double-JPEG and resampling traces are diagnostic observations, not unique proofs of editing history.

**Lectures:** [Week 1](../lectures/week01-day1.md), [Week 2](../lectures/week02-day1.md), [Week 3](../lectures/week03-day1.md). **Labs:** 1–2.

## Part II — Convolution, Blur, and Ill-Posed Inverse Problems (Weeks 4–7)

### Fourier analysis and convolution

With the forward-unscaled DFT convention used in NumPy, for length $N$,

$$
F[k]=\sum_{n=0}^{N-1}f[n]e^{-2\pi i kn/N}.
$$

$$
f[n]=\frac1N\sum_{k=0}^{N-1}F[k]e^{2\pi i kn/N}.
$$

Orthogonality establishes invertibility; separability gives the two-dimensional DFT by successive transforms along each axis. The radix-2 FFT reduces the one-dimensional operation count from quadratic to order $N\log N$. Frequency indices are not physical frequencies without a sampling scale. Parseval's identity is $\sum_n|f[n]|^2=N^{-1}\sum_k|F[k]|^2$.

A point spread function (PSF) describes the response to an impulse. For an integrable PSF and bounded measurable image,

$$
(f*h)(x,y)=\iint f(x-s,y-t)h(s,t) ds dt.
$$

A normalized nonnegative PSF preserves total mass for integrable inputs on the full plane, or for finite circular arrays; cropping and boundary rules may change measured sums. Circular convolution is diagonalized by the DFT:

$$
\mathcal F(f\circledast h)=\mathcal F(f)\mathcal F(h).
$$

Linear convolution requires padding to at least the sum of input and kernel lengths minus one along each axis, with consistent PSF origin and output extraction.

Convolution commutes with translations, but a fixed blur need not commute with a warp. For an invertible affine map with linear part $A$,

$$
W_T H_h=H_{h_A}W_T,
\qquad h_A(x)=\frac{h(A^{-1}x)}{|\det A|}.
$$

Here $H_h$ denotes convolution with $h$. Rotations commute with radially symmetric PSFs on the full plane; nonlinear warps may induce spatially varying blur.

### Point spread functions and recoverability

Uniform motion blur, a uniform defocus disk, and Gaussian blur are idealized PSFs. Motion and disk models can have spectral zeros; exact zeros on the sampled frequency grid erase corresponding components of a circular observation. An ideal continuous Gaussian of standard deviation $\sigma$ has frequency response (frequencies in cycles per spatial unit)

$$
H_\sigma(\nu)=\exp(-2\pi^2\sigma^2\|\nu\|^2).
$$

There are no finite-frequency zeros, but the reciprocal grows without bound. A sampled and truncated PSF has its own discrete response, which need not equal the continuous formula.

Hadamard well-posedness requires existence, uniqueness, and stability. Distinguish null spaces (non-uniqueness), an unbounded inverse in the continuous model, ill-conditioning in finite dimensions, and actual information loss through quantization.

### Observation models and regularization

The original blur-plus-noise model $B=(I*G)+N$ is useful for a known PSF and additive errors. In operator notation write $b=Hf+n$. Composite models can include warping, blur, sampling, quantization, compression, and noise; order matters. Compression and quantization errors need not be independent additive noise.

For compatible circular convolution, naive inversion at nonzero transfer values gives

$$
\widehat F(\nu)=\frac{B(\nu)}{H(\nu)}
=F(\nu)+\frac{N(\nu)}{H(\nu)}.
$$

Noise and PSF mismatch may dominate the estimate. A small residual or sharper appearance does not establish recovery.

For additive Gaussian errors of common variance, Tikhonov regularization minimizes

$$
J_\lambda(f)=\|Hf-b\|_2^2+\lambda\|Lf\|_2^2,
\qquad \lambda>0.
$$

The normal equations are

$$
(H^*H+\lambda L^*L)\widehat f=H^*b.
$$

In finite dimensions uniqueness requires $\ker H\cap\ker L=\{0\}$. For $L=I$ and compatible circular convolution,

$$
\widehat F_\lambda=\frac{\overline H}{|H|^2+\lambda}B.
$$

Here $H$ denotes the transfer function in the frequency-domain expression. Under stationary, uncorrelated signal/noise assumptions, the Wiener formula uses the noise-to-signal power spectral ratio $S_n/S_f$ in place of $\lambda$, where defined. Both methods trade bias against variance; neither establishes the true value of missing components.

For independent Poisson observations $b_i$ with means $\mu_i=(Hf)_i$, the negative log-likelihood up to data-only constants is

$$
\mathcal L_{\mathrm P}(f;b)=\sum_i(\mu_i-b_i\log\mu_i).
$$

Under a nonnegative known blur with $H^*\mathbf1=\mathbf1$, the standard Richardson–Lucy iteration is

$$
f^{(k+1)}=f^{(k)}\odot H^*\left(\frac{b}{Hf^{(k)}}\right).
$$

Division and $\odot$ are elementwise. Positive initialization, boundary handling, small predicted counts, and stopping time matter. A general sensitivity map requires division by $H^*\mathbf1$ where positive. Standard RL is not the additive-Gaussian maximum-likelihood algorithm.

Blind deconvolution jointly estimates the image and PSF. Scale, shift, and trivial-fit ambiguities require constraints such as PSF normalization, nonnegativity, physical support, and external calibration. A plausible joint fit does not imply identifiability.

**Lectures:** [Week 4](../lectures/week04-day1.md), [Week 5](../lectures/week05-day1.md), [Week 6](../lectures/week06-day1.md), [Week 7 reconstruction challenge](../lectures/week07-day2.md). **Labs:** 3–4. The [assessment framework](../assessment/README.md) specifies the provisional Week 7 midterm format.

## Part III — Digital Forensics and Evidentiary Standards (Weeks 8–10)

### Evidence integrity and reproducible pipelines

Distinguish forensic storage images, encoded picture files, and decoded pixel arrays. Physical, logical, and live acquisition have different scopes and limitations. Preserve source bytes; use appropriate write-blocking, verified working copies, separately protected SHA-256 digests, and documented chain of custody. Matching digests support byte-stream integrity relative to the reference digest, not authenticity of a depicted scene or scientific validity of reconstruction.

For an ideal $b$-bit hash and $n$ independent uniformly distributed outputs, the approximate probability of at least one collision is

$$
1-\exp\left(-\frac{n(n-1)}{2^{b+1}}\right).
$$

The birthday calculation is distinct from preimage and second-preimage resistance.

An enhancement pipeline is a composition of explicitly parameterized operators. Record source and intermediate artifacts, software versions, dependencies, numerical conventions, parameter provenance, seeds, and output digests in an audit manifest. Deterministic mathematics does not imply bitwise-identical results across computing environments; specify tolerances and reproducibility limitations.

### Scientific validation and legal context

Verification asks whether implementation behaves as specified; validation asks whether a method is suitable for its intended scientific use. Legal admissibility is separate. The course discusses US Federal Rule of Evidence 702 and the Daubert framework, Canadian Mohan criteria and subsequent case law, ISO/IEC 17025 laboratory competence, and SWGDE technical guidance. The EU accreditation instrument listed in [references](references.md) has limited DNA and fingerprint scope and is not a general expert-evidence admissibility rule.

Forward-and-reverse controls start with known $f$, generate $g=A_\theta(f;\xi)$, and reconstruct $\widehat f=R_\lambda(g)$. Include positive and negative controls, nuisance variation, model mismatch, and independent held-out targets. Measure both image error and errors in specific features relevant to the claim.

For identical evaluated grids and scales,

$$
\mathrm{MSE}=\frac1N\sum_i(f_i-\widehat f_i)^2.
$$

$$
\mathrm{PSNR}=10\log_{10}\frac{L^2}{\mathrm{MSE}}.
$$

Here $N$ counts scalar samples and $L$ is the declared intensity range; zero MSE gives infinite PSNR. Specify support, channel aggregation, and SSIM implementation settings. No such metric proves the correctness of an individual feature.

Report sensitivity, specificity, false-positive rates, and denominators. With zero observed failures in $N$ independent Bernoulli trials of common failure probability, the exact one-sided upper confidence bound at confidence $1-\alpha$ is

$$
p_{\mathrm{upper}}=1-\alpha^{1/N}.
$$

At 95% confidence it is approximately $3/N$ for large $N$. Dependence between variants, frames, or subjects invalidates a naive independent-trial interpretation.

### Bayesian reconstruction and generative restoration

Bayesian inference combines an observation likelihood with a prior:

$$
p(f\mid g)=\frac{p(g\mid f)p(f)}{p(g)}.
$$

A MAP estimate minimizes the negative log-likelihood plus negative log-prior; quadratic Gaussian models connect this to Tikhonov regularization. The conditional mean minimizes conditional expected squared error when second moments exist.

Super-resolution can be modeled by $g=SHf+n$, with sampling operator $S$. If distinct images yield the same observation, no observation-only estimate can distinguish them with certainty. For $Af_1=Af_2=g$, the triangle inequality gives

$$
\max_{i=1,2}\|\widehat f-f_i\|_2
\ge\frac12\|f_1-f_2\|_2.
$$

GANs use adversarial objectives to encourage distributional realism; diffusion models learn to reverse a noise process. GFPGAN and CodeFormer illustrate learned facial restoration. Pixel, perceptual, and adversarial losses measure different objectives; realistic synthesized details may not be supported by the observation.

Assess feature alteration, identity drift, and observation consistency in controlled experiments. Embedding distances and similarity scores depend on the evaluation model. Forensic provenance and scientific validation are necessary even for deterministic methods. Distinguish observed facts, model-dependent inferences, investigative leads, and generated hypotheses.

**Lectures:** [Week 8](../lectures/week08-day1.md), [Week 9](../lectures/week09-day1.md), [Week 10](../lectures/week10-day1.md). **Lab:** 5.

## Part IV — Privacy Engineering and Irreversible Redaction (Weeks 11–14)

### Threat models, restricted-domain injectivity, and leakage

Privacy concerns a specified secret or identity $X$, released observation $Y$, and adversarial side information $Z$. State the candidate domain, adversarial knowledge, release mechanism, and evaluation assumptions. Non-injectivity on the full image space is not a privacy guarantee.

For a linear operator $A$ and candidate domain $\mathcal C$, the restriction is injective exactly when

$$
\ker A\cap(\mathcal C-\mathcal C)=\{0\}.
$$

Forward matching on controlled synthetic candidate domains illustrates this distinction even when unrestricted reconstruction is ill-posed. In a finite candidate domain with at least two elements, minimum output separation measures distinguishability under perturbation.

For discrete variables,

$$
H(X)=-\sum_x p(x)\log_2 p(x).
$$

$$
I(X;Y)=H(X)-H(X\mid Y).
$$

Conditional leakage is $I(X;Y\mid Z)=H(X\mid Z)-H(X\mid Y,Z)$ when the entropies are finite. Zero mutual information means independence under the specified joint distribution, not a universal guarantee for every threat model.

For discrete output distributions $P,Q$,

$$
d_{\mathrm{TV}}(P,Q)=\frac12\sum_y|P(y)-Q(y)|.
$$

The optimal binary classification error for equal priors is

$$
P_e^*=\frac{1-d_{\mathrm{TV}}(P,Q)}2.
$$

Randomization can reduce distinguishability but does not automatically eliminate leakage. The data-processing inequality bounds information through a Markov chain; it does not imply zero information.

### Web-scale detection and redaction

Study the historical Google Street View system through the published research cited in [references](references.md). Distinguish documented historical architecture, illustrative mathematical models, and claims about present deployments.

Detection evaluation must include object-level recall, precision, localization, and coverage of sensitive regions. Intersection over union and sensitive-region coverage are distinct metrics. Precision depends on prevalence as well as sensitivity and false-positive rate. Cascaded detection requires conditional stage rates; independent errors cannot be assumed.

For a fixed alpha mask and replacement $c$,

$$
g=(1-\alpha)\odot f+\alpha\odot c.
$$

A partial blend retains direct dependence on original pixels; full masking removes that direct contribution but does not rule out leakage through context, mask geometry, or other retained information. Randomized blur and quantization are evaluated as release channels rather than declared irreversible by appearance alone.

Panorama stitching and multiple views can combine information across releases. Redact before publication, verify coverage across overlapping views, and consider original layers, thumbnails, metadata, caches, and other retained representations. Synthetic noise and permanent raster replacement are distinct mechanisms with different guarantees.

### Generative anonymization and temporal privacy

Conditional generative inpainting replaces masked pixels with synthetic content based on retained conditioning $C$ and independent randomness $Z$. If the release depends on identity $X$ only through $C$, then $X\to C\to Y$ is a Markov chain and

$$
I(X;Y)\le I(X;C).
$$

If $C$ is independent of $X$ under the specified model, the release has zero mutual information with $X$. Masking alone does not establish this premise. Pose, clothing, background, mask shape, and auxiliary information may remain identifying; retained utility itself can impose a lower bound on leakage.

DeepPrivacy and DeepPrivacy2 illustrate face and full-body replacement. Distinguish invariance to changes confined to a fixed masked region from statistical independence of the entire published image and identity.

Video extends the problem to tracking, temporal association, motion-compensated consistency, and temporally conditioned generation. Constant-velocity state-space models and Kalman prediction illustrate tracking. Temporal flicker and identity drift affect utility, but temporal stability is not a privacy guarantee. Sequence leakage obeys the chain rule

$$
I(X;Y_1,\ldots,Y_T)
=\sum_{t=1}^T I(X;Y_t\mid Y_1,\ldots,Y_{t-1}).
$$

A frame-level assessment cannot certify sequence-level privacy. Evaluate independent subjects or sequences rather than treating adjacent frames as independent trials.

### Privacy–utility evaluation and synthesis

Let $P(\theta)$ be a specified privacy risk (smaller is better) and $U(\theta)$ a utility measure (larger is better). A configuration is Pareto optimal if no feasible alternative is at least as good on both objectives and strictly better on one. One constrained formulation is

$$
\max_\theta U(\theta)
\quad\text{subject to}\quad P(\theta)\le\epsilon.
$$

Weighted scalar objectives are useful but need not recover every Pareto-optimal point for a nonconvex attainable set.

Utility measures include detection average precision (AP), mean AP across specified classes or evaluation conditions, and percentage of correct keypoints (PCK) with declared normalization and threshold. For the uninterpolated ranked precision-recall convention,

$$
\mathrm{AP}=\sum_k(r_k-r_{k-1})p_k.
$$

Specify matching rules, IoU thresholds, class aggregation, and keypoint visibility handling. Evaluate privacy with the stated threat model, empirical attack performance, uncertainty bounds, and failure analysis. No observed successful attack is not proof of zero leakage.

**Lectures:** [Week 11](../lectures/week11-day1.md), [Week 12](../lectures/week12-day1.md), [Week 13](../lectures/week13-day1.md), [Week 14](../lectures/week14-day1.md). **Lab:** 6 and the [capstone](../labs/capstone.md).

## Shared experimental conventions

- Declare the observation or release model, coordinate and boundary conventions, intensity or count scale, numerical precision, and independent sampling unit.
- Preserve unclipped numerical estimates separately from display images. Use appropriate residuals and likelihoods for the observation model.
- Separate implementation checks, calibration, parameter selection, and held-out evaluation. Freeze algorithms and outputs before revealing withheld truth.
- Record every predeclared condition, including failures and abstentions. Report uncertainty, model limitations, and provenance.
- Use synthetic or appropriately authorized data; public redacted photographs are illustrative only. Keep withheld references, sensitive data, and confidential assessment material outside the public repository.

The midterm, applied reconstruction challenge, laboratories, capstone, and cumulative final examination are distinct assessment activities; see the [assessment framework](../assessment/README.md). Examination dates, duration, and institutional arrangements remain provisional.

> Mathematical claims are conditional on their stated assumptions. Historical deployments, bibliographic details, and legal admissibility require primary-source verification and applicable institutional/legal guidance. These notes summarize the developed curriculum; they are not an independent mathematical peer review or a substitute for the detailed lectures.
