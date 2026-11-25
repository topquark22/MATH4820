# Week 10, Day 2 — Generative Artifacts and Forensic Reliability

*90-minute lecture. Source: Week 10 of syllabus/weekly-schedule.md ("The Generative AI Boundary in Court"). Completes Part III and prepares students for Lab 5 (Part C) and the privacy engineering module.*

> **Scope:** Examine learned restoration using controlled synthetic or appropriately consented adult reference imagery. Do not use actual disputed identities for classroom tests. The objective is to assess what the method can support, not to establish a predetermined finding that every generative output is erroneous.

## Learning Objectives

By the end of this lecture students can:

1. Distinguish supported reconstruction, uncertain inference, and demonstrably false synthesized features.
2. Explain why forward-model consistency does not establish fidelity to an original image.
3. Design blinded comparative restoration experiments using independent reference images and appropriate conventional baselines.
4. Quantify feature alteration and representation drift while recognizing the limitations of embedding metrics.
5. Distinguish processing provenance from statistical detection of AI enhancement and explain the resulting limitations on forensic conclusions.

## Timed Outline (90 min)

| Min | Segment |
|-----|---------|
| 10 | Defining hallucination and unsupported image features |
| 15 | Non-identifiability and observation-consistent alternatives |
| 20 | Controlled experiments on facial restoration |
| 5 | Break |
| 15 | Quantifying feature alteration and identity drift |
| 15 | Detecting AI enhancement and establishing provenance |
| 10 | Evidentiary implications and transition to privacy engineering |
| **90** | **Total** |

## Content Notes

### 1. Hallucination and unsupported image features (10 min)

Recall the distinction from Day 1 between perceptual realism and fidelity to the particular reference image. A learned model may return a realistic face while changing the shape of an eye, introducing a skin marking, or removing a genuine feature.

Use the word "hallucination" carefully. In a controlled experiment with independently known ground truth, an introduced feature that is absent from the reference can be classified as a false feature under a predefined measurement rule. In an examination without ground truth, a feature may be unsupported or uncertain without being demonstrably false. An output may also happen to reproduce a genuine feature even when the observation cannot resolve it.

Distinguish:

- Measured information: structure supported by the acquired observation under stated conditions.
- Model-dependent inference: a feature estimated using a reconstruction model and its assumptions.
- Unsupported detail: structure for which sufficient observational or independent corroborating evidence has not been established.
- Demonstrably incorrect detail: a feature shown by independent reference information to disagree with the original.

These categories describe the evidential status of claims, not necessarily disjoint sets of pixels. Conventional restoration can introduce false features through ringing, interpolation, or regularization as well. Deterministic neural inference does not eliminate the problem.

### 2. Non-identifiability and observation-consistent alternatives (15 min)

**Exact ambiguity (7 min).** Let $A$ be a linear degradation operator. Suppose two distinct images satisfy

$$
Af_1=Af_2=g.
$$

For an estimator $R$ that has access only to $g$, the output $R(g)$ is identical for either possible original if the estimator is deterministic. For a randomized estimator with randomness independent of the original conditional on $g$, its output distribution is the same in the two cases.

~~~mermaid
flowchart TD
    A["Possible original f1"] --> C["Information-losing degradation"]
    B["Different possible original f2"] --> C
    C --> D["Identical observation g"]
    D --> E["Conditional restoration"]
    F["Prior or learned image distribution"] --> E
    E --> G["Plausible estimated image"]
~~~

*Figure 1. An observation that is compatible with distinct originals cannot uniquely identify which one occurred. The prior can prefer an alternative without providing an additional measurement.*

A useful quantitative consequence follows from the triangle inequality:

$$
\|f_1-f_2\|_2
\le\|f_1-\hat f\|_2+\|\hat f-f_2\|_2.
$$

Therefore

$$
\max_{i=1,2}\|\hat f-f_i\|_2
\ge\frac{1}{2}\|f_1-f_2\|_2.
$$

Every fixed estimate must incur at least this much error for one of the two originals. For randomized estimates, taking expectations gives the analogous lower bound on the larger of the two expected errors, assuming the same output distribution.

A simple example averages pairs of scalar samples. The vectors $(0,1)$ and $(1,0)$ both produce the observation 0.5. A realistic prior might favor one pattern; the conditional mean under equal probabilities is $(0.5,0.5)$. All three candidates satisfy the measurement equation. None is established as the particular original by the average alone.

**Approximate ambiguity (8 min).** For noisy observations, a candidate may satisfy

$$
\|A\hat f-g\|_2\le\epsilon.
$$

If $v$ lies in the exact null space of $A$, then $\hat f+v$ has the same forward residual, provided the perturbed image is an admissible candidate. If $\|Av\|_2$ is small, then

$$
\|A(\hat f+v)-g\|_2
\le\|A\hat f-g\|_2+\|Av\|_2.
$$

Differences in approximately unobservable directions can therefore be difficult to distinguish at a realistic noise level. Quantization and compression may further enlarge the set of indistinguishable candidates.

~~~mermaid
flowchart TD
    A["Candidate reconstruction"] --> B["Apply specified forward model"]
    C["Candidate plus an unobservable component"] --> D["Apply same forward model"]
    B --> E["Compare to observed image"]
    D --> E
    E --> F["Both candidates may have small residuals"]
    F --> G["Independent feature evidence is still required"]
~~~

*Figure 2. Forward consistency is a useful diagnostic, but it does not establish that missing detail has been recovered.*

Use a noise-appropriate data-fit measure; a raw Euclidean residual is not a universal statistical test. For Poisson data, a count likelihood or appropriate deviance may be more informative. For nonlinear or quantized observation operators, the null-space argument is not directly applicable, although non-identifiability can still occur.

Variation across multiple conditional samples or restoration settings can reveal instability. Agreement across those outputs does not establish reliability if they share the same learned assumptions or biases. Nor does sampling alone provide calibrated feature uncertainty.

### 3. Controlled experiments on facial restoration (20 min)

**Reference dataset and method selection (8 min).** Extend the Week 9 validation design. Use distinct synthetic or appropriately consented adult reference portraits, with independently established feature labels. Synthetic targets permit deliberate control of feature presence and absence; their representativeness of real photographic conditions must be assessed separately.

Partition the reference identities before generating degraded variants, so that images of the same subject or near-duplicates do not cross the calibration/test boundary. Keep clean test references and feature labels unavailable to the reconstruction and decision procedures until outputs are recorded.

Generate observations with documented blur, downsampling, noise, and compression. Include different degradation strengths and at least one relevant mismatch. Keep the available metadata and hidden parameters consistent with the intended task.

Compare at least the following methods:

| Method | Purpose |
|--------|---------|
| Bicubic upsampling | Simple non-generative reference baseline |
| Conventional regularized restoration | Comparison with the inverse methods of Weeks 5–6 under an appropriate forward model |
| GFPGAN | Learned generative facial prior |
| CodeFormer | Learned codebook-based restoration with several predefined fidelity settings |

A conventional method need not support exactly the same degradation model as every learned method. State the assumptions and provide comparable output grids, intensity scales, and evaluation regions. If the classical reconstruction includes a sampling operator, use a suitable solver for that composite operator rather than applying a convolution-only inverse formula indiscriminately.

For CodeFormer, a suggested illustrative grid is $w=0,0.5,1$; the exact settings and implementation revision must be recorded. Treat these as experimental conditions, not opportunities to choose the most convincing held-out output.

~~~mermaid
flowchart TD
    A["Independent reference portraits and feature labels"] --> B["Controlled degradation"]
    B --> C["Available low-resolution observations"]
    C --> D["Bicubic baseline"]
    C --> E["Conventional restoration"]
    C --> F["GFPGAN"]
    C --> G["CodeFormer: predefined fidelity settings"]
    D --> H["Record all outputs and settings"]
    E --> H
    F --> H
    G --> H
    H --> I["Reveal held-out reference and labels"]
    A --> I
    I --> J["Measure fidelity, feature errors and representation drift"]
~~~

*Figure 3. Comparative facial-restoration experiment with independent references and predefined method settings.*

**Execution and controls (8 min).** Use the Week 8 hash-verified wrapper for each method. Record the software revision, model checkpoint SHA-256 digest, preprocessing, face detection and alignment, cropping and paste-back behavior, output encoding, fidelity setting, device and relevant execution environment. Record the generator seed and sampling settings for stochastic methods. A deterministic restoration model does not require invented seed variability.

Face detection or alignment failure is part of the observed performance. Record failures, unchanged outputs, and inconclusive cases; do not silently remove them from comparisons. If a model changes the crop, alignment, or output scale, apply a predefined comparison procedure so that coordinate mismatch is not confused with feature alteration.

Use positive and negative controls for specified features, such as the presence of an artificial skin marking or a particular controlled geometric structure. Test whether restoration introduces a missing feature, suppresses a genuine feature, or changes its measured geometry. Define these features and their detection criteria before inspecting held-out results.

A model output may be useful even when an individual feature remains unresolved. Avoid requiring students to demonstrate identity drift in every case or to obtain a predetermined error rate.

**Discussion (4 min).** Compare the unprocessed observation, conventional estimate, and learned outputs using consistent display conventions. What changes are genuinely supported? Which could be evaluated against the hidden reference, and which would remain uncertain in an actual examination without a reference? The in-class example demonstrates methodology, not operational performance of the named models.

### 4. Quantifying feature alteration and identity drift (15 min)

**Feature-specific measurements (6 min).** Reuse the Week 9 feature functional $\Phi$ and binary decision rules. Evaluate PSNR and SSIM as descriptive reference metrics, along with measurements more directly connected to the intended inference.

| Measurement | What it evaluates |
|-------------|------------------|
| PSNR and SSIM | Global or structural agreement with a reference |
| Feature displacement | Change in registered landmark or geometric position |
| False-positive and false-negative rates | Introduction or suppression of a predefined feature |
| Embedding distance | Change in a specified learned representation |
| Forward-model residual | Compatibility with the specified degradation |
| Variation across settings or seeds | Sensitivity to reconstruction choices |

The measurement pipeline is itself part of the experiment. Landmark estimators and learned feature detectors can fail on both degraded and restored images. Use independent reference labels and validate the measurement process where possible.

For binary feature detection, report the confusion counts and uncertainty from Week 9. Count independent subjects or target units, not simply the number of correlated crops, settings, or generated samples. Treat repeated conditions as paired or clustered measurements.

**Representation drift (6 min).** Let

$$
\Phi:\mathcal I\longrightarrow\mathbb R^d
$$

be a specified image embedding. One measure of representation drift is

$$
d_{\Phi}(f,\hat f)=\|\Phi(f)-\Phi(\hat f)\|_2.
$$

For nonzero embeddings, cosine similarity is

$$
s_{\Phi}(f,\hat f)=
\frac{\langle\Phi(f),\Phi(\hat f)\rangle}
{\|\Phi(f)\|_2\|\Phi(\hat f)\|_2}.
$$

If both embeddings are normalized to unit length, then

$$
d_{\Phi}^2=2(1-s_{\Phi}).
$$

Derive this equality by expanding the squared norm. Under this normalization the two metrics carry the same ordering information, so reporting both is not independent corroboration.

The embedding is a learned representation, not a direct measurement of identity. Its behavior can depend on training distribution, image quality, demographic representation, alignment, and the restoration artifacts themselves. A model trained for visual similarity may fail to distinguish relevant identifying details. A low distance does not prove that the subject's identity is preserved, and a high distance does not prove that the subject is different.

Use the terms "embedding drift" or "representation drift" when that is what was measured. Claims about identity preservation require independent, appropriately validated evidence. In the classroom, avoid using embedding scores to identify unknown people.

**Paired comparisons (3 min).** For each reference target, compare the feature error of a learned method against the conventional baseline under the same degraded observation. Report distributions and differences across targets rather than only the visually best result or a pooled average. Uncertainty estimates must account for repeated measurements of the same target.

### 5. Detecting AI enhancement and establishing provenance (15 min)

**Separate detection from attribution (7 min).** Ask two distinct questions:

1. Is there reliable evidence that a particular image underwent generative processing?
2. Which individual features, if any, were introduced or altered by that processing?

A documented processing history can establish that a specific model was used without establishing which output pixels disagree with the unknown original. Conversely, an unusual-looking feature may be caused by conventional processing, compression, or acquisition artifacts rather than AI.

~~~mermaid
flowchart TD
    A["Image submitted for examination"] --> B["Preserved original and acquisition records"]
    A --> C["Processing provenance and available manifests"]
    A --> D["Technical artifact and statistical examination"]
    B --> E["Assess evidence of processing history"]
    C --> E
    D --> E
    E --> F["State supported conclusions and uncertainty"]
    F --> G["Do not infer pixel-level truth from processing detection alone"]
~~~

*Figure 4. Complementary approaches to examining processing history. No single branch is a universal AI detector.*

Useful sources of information include the acquisition and custody records, source and derivative hashes, executable workflow and model checkpoint records, embedded metadata, and authenticated provenance assertions. A hash identifies a recorded byte domain under the assumptions of Week 8; it does not authenticate arbitrary metadata. A verified signature can authenticate a signed assertion relative to a trusted key, but cannot establish that every assertion is true.

An authenticated provenance system, such as one based on C2PA Content Credentials, may help document editing history when available and trustworthy. Such information can be absent, stripped, incomplete, or unavailable for earlier processing steps. Absence of a credential is not evidence that an image was AI-generated, nor is it proof of authenticity.

**Statistical artifact detection (8 min).** Potential forensic indicators include spatial inconsistencies, unusual texture statistics, resampling or frequency-domain traces, and learned detector scores. These indicators depend on the model, acquisition process, and subsequent transformations. JPEG recompression, resizing, and other processing can obscure traces or produce confusable ones.

Treat an AI-enhancement detector as a separate classification method requiring validation. Use conventional and unprocessed negative controls, known generative positive controls, independent images and model families, and relevant compression or resizing conditions. Establish the threshold independently of the test set and report false-positive and false-negative rates, inconclusive outcomes, and statistical uncertainty.

A detector trained on one model version may not generalize to another version or unseen generator. A positive detector result is not by itself proof of a particular processing operation, and a negative result does not rule out generative enhancement.

Connect this to Week 9: a detector score is not a calibrated posterior probability of AI processing unless that interpretation has been independently established. The appropriate prevalence and applicability assumptions matter.

### 6. Evidentiary implications and transition to privacy engineering (10 min)

**Forensic reporting (6 min).** Revisit the distinction between admissibility and evidentiary weight from Week 9, Day 1. There is no universal rule that every generatively processed image is inadmissible for every purpose. A derivative offered to illustrate a hypothesis poses a different question from one offered to prove the identity of a person.

Retain the original and distinguish it clearly from all processed derivatives. Identify the model and settings used, the purpose of the processing, available validation evidence, observed limitations, and whether relevant features are supported by independent information. Do not represent synthesized content as measured detail.

A classroom report may state that a model produced a plausible eye contour but that the low-resolution observation and available validation do not establish that the contour was present in the original. If a controlled reference demonstrates a specific error, report it as a measured failure under the tested conditions.

Neither a low forward residual, a high embedding similarity, nor a visually realistic output establishes identity. The stronger the intended inference, the greater the need for task-specific scientific support.

**Transition to Part IV (4 min).** The course now changes objectives. In forensic restoration, synthesizing unsupported identifying features is a potential liability. In privacy engineering, replacing identifying features may be intentional.

| Forensic restoration | Generative anonymization |
|----------------------|-------------------------|
| Preserve genuine identifying information | Remove or replace identifying information |
| Assess fidelity to the original | Assess resistance to re-identification |
| Unsupported synthesis can undermine an inference | Controlled synthesis can preserve useful nonidentifying structure |
| Validate against independent references | Evaluate leakage, utility, and relevant adversaries |

~~~mermaid
flowchart TD
    A["Generative image processing"] --> B["Forensic restoration objective"]
    A --> C["Privacy engineering objective"]
    B --> D["Preserve and validate genuine features"]
    C --> E["Remove identifying information and preserve utility"]
    D --> F["Test fidelity and unsupported synthesis"]
    E --> G["Test leakage and re-identification resistance"]
~~~

*Figure 5. The same capacity for synthesis has different implications under different objectives. Visual replacement alone does not prove anonymity.*

Generative anonymization is not automatically irreversible or privacy-preserving. Residual pixels, pose, context, clothing, metadata, and temporal consistency may still leak identity. Part IV will examine the threat model and empirical privacy–utility trade-offs rather than assume that a realistic replacement solves the privacy problem.

## Instructor Preparation

- Prepare synthetic or appropriately consented adult reference targets with documented ground truth and independent calibration and test splits.
- Preinstall and test the selected GFPGAN and CodeFormer revisions, weights, and dependencies. Check model and dataset licenses, hardware requirements, and offline availability before class.
- Prepare matched observations and conventional restoration baselines. Provide precomputed results if classroom hardware cannot run the selected models in the allotted time.
- Prepare examples of introduced, suppressed, and correctly preserved features; identify which claims are supported by known reference labels.
- Reuse the audit manifest and control procedures from Weeks 8–9. Do not require students to train a new neural network.
- Review applicable image-processing guidance before discussing legal consequences; do not treat classroom performance results as accreditation or legal determinations.

## Tutorial and Lab Connection

Lab 5 (Part C) completes the forensic validation pipeline begun in Week 8.

- Verify input integrity and record model and checkpoint provenance.
- Compare conventional and learned restoration using the same held-out synthetic or appropriately consented references.
- Use predefined feature measurements, fidelity settings, and noise or compression conditions.
- Report global reconstruction metrics, feature errors, inconclusive outcomes, and representation drift where appropriate, with the assumptions and limits of each measurement.
- Complete the mock forensic examination report, separating observations, processing results, validated performance, and uncertain or unsupported inferences.

Detailed datasets, sample sizes, implementation requirements, and the assessment rubric remain for the individual Lab 5 specification.

## Exercises

1. Prove the lower bound on the maximum reconstruction error for two distinct originals with identical observations.
2. For pairwise averaging of $(0,1)$ and $(1,0)$, compare the forward residual and squared reference error of each candidate and their mean.
3. Derive the relation between Euclidean distance and cosine similarity for unit-normalized embeddings. Explain why they do not constitute independent evidence.
4. Design a positive/negative-control experiment to measure false creation of a predefined facial feature without using held-out labels to tune the restoration settings.
5. A learned restorer returns identical eye contours for five seeds. Explain why this is not sufficient to establish that the contours are genuine.
6. Design a test of an AI-enhancement detector that includes an unseen restoration model and JPEG recompression. Explain how to report an inconclusive result.
7. Explain why introducing plausible replacement features can have different implications for forensic restoration and privacy engineering.

## Instructor Answer Sketch

1. Apply the triangle inequality to $f_1-\hat f$ and $\hat f-f_2$; at least one norm is at least half the separation of the originals.
2. All candidates have zero forward residual. Relative to $(0,1)$, squared Euclidean errors are 0 for that candidate, 2 for $(1,0)$, and 0.5 for the mean. The first two errors reverse for the other reference, while the mean has the same error for both.
3. Expand $\|a-b\|_2^2$ for unit vectors. The result is $2-2\langle a,b\rangle$, and the inner product equals cosine similarity. The metrics are monotone transformations of one another.
4. Define the feature and decision rule on calibration targets, reserve independent positive and negative test targets, apply matched degradations, record results before revealing labels, and report confusion counts and uncertainty.
5. Shared priors or a deterministic inference path can produce consistent unsupported detail. Reproducibility is distinct from scientific validity.
6. Establish the detector threshold on separate calibration data; include conventional negatives, known generative positives, the unseen model, and compression strata. Report errors and abstentions by truth category and condition without discarding failures.
7. Forensic restoration requires fidelity to genuine features. Privacy engineering may intentionally replace those features, but must separately test identity leakage and retained utility.

## References

- Course notes: Weeks 8–9 and Week 10, Day 1, including the original GFPGAN, CodeFormer, and perception–distortion papers.
- SWGDE image-processing, imagery-integrity, and admissibility guidance listed in Week 9, Day 1.
- Coalition for Content Provenance and Authenticity (C2PA), [technical specifications](https://c2pa.org/specifications/). Consult the applicable specification version for implementation details.

The detector and restoration examples are proposed experimental procedures, not empirical findings about the named models.
