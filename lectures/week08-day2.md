# Week 8, Day 2 — Reproducible Forensic Enhancement

*90-minute lecture. Source: Week 8 of syllabus/weekly-schedule.md ("Forensic Integrity and Chain of Custody"). Continues Day 1 and prepares students for Lab 5 (Part A) and Week 9.*

> **Scope:** Use synthetic evidence with documented acquisition history. A reproducible enhancement is not necessarily a scientifically valid reconstruction. Today's objective is to establish what was done to the evidence, under what conditions, and how another examiner can check it. Week 9 addresses validation and legal standards.

## Learning Objectives

By the end of this lecture students can:

1. Distinguish acquired evidence, verified working copies, intermediate artifacts, and derived exhibits.
2. Represent an enhancement procedure as a composition of parameterized operators and distinguish file bytes from numerical image arrays.
3. Explain why deterministic mathematics does not necessarily imply bitwise-identical computational output.
4. Design a machine-readable audit manifest that links evidence, parameters, software, execution records, and derived artifacts.
5. Distinguish investigative leads, observations, model-dependent inferences, and claims requiring scientific validation.

## Timed Outline (90 min)

| Min | Segment |
|-----|---------|
| 10 | Review of evidence integrity |
| 15 | Original evidence, working copies, and derived artifacts |
| 20 | Formal representation of an enhancement pipeline |
| 5 | Break |
| 15 | Determinism, reproducibility, and numerical precision |
| 15 | Audit trails and parameter provenance |
| 10 | Investigative intelligence versus courtroom evidence |
| **90** | **Total** |

## Content Notes

### 1. Review of evidence integrity (10 min)

Recall Day 1: a cryptographic digest is a measurement of a specified byte sequence. It is not a measurement of visual truth. A matching SHA-256 digest supports byte equality relative to a trustworthy reference record, subject to the computational assumptions discussed previously.

Start with three independently assessable properties:

| Property | Question |
|----------|----------|
| Integrity | Are these the same bytes as the recorded evidence or artifact? |
| Reproducibility | Can another examiner obtain the specified result under documented conditions? |
| Scientific validity | Does the method reliably support the stated inference? |

None alone establishes the others. For example, an exactly reproducible algorithm applied to a verified file can still manufacture a misleading edge. An algorithm with demonstrated reliability can be applied to an unverified input. A preserved original may never have undergone any analysis.

Review the distinction between chain of custody (possession and transfers) and processing provenance (how a derivative was produced). The two records complement one another.

### 2. Original evidence, working copies, and derived artifacts (15 min)

Let $B$ be the acquired encoded picture file, and let $B_w$ be a working copy. Before examination, verify

$$
h(B_w)=h(B),
$$

where $h$ is SHA-256 and the digest on the right is taken from the protected acquisition record, not newly computed from an untrusted replacement.

The workflow separates four classes of artifact:

- Acquired evidence: preserved in its received state, with acquisition and custody records.
- Verified working copy: byte-equivalent to the corresponding acquired object, used as the input to examination.
- Intermediate artifact: a computed image, numerical array, estimated PSF, mask, or other product used in the procedure.
- Derived exhibit: a specifically identified output prepared for interpretation or presentation.

An enhanced image is a derivative even if its pixel values happen to equal those of its input. Its encoded bytes may differ because of metadata, format, or encoder settings.

For classroom work, use a dedicated evidence directory and separate run-specific output directories. Do not overwrite acquired files, working copies, or earlier run results. In actual practice, storage protection, retention, and access controls must follow applicable procedures; a directory naming convention alone provides no security.

Explain why decoding and re-encoding matter. Opening a JPEG for reading does not necessarily change the file, but saving the decoded raster as a new JPEG generally introduces another quantization stage. Use a documented lossless format where suitable for derived display images, and retain floating-point intermediate arrays when they are relevant to the analysis. Lossless encoding preserves the supplied sample values, not information discarded by earlier clipping, rounding, color conversion, or quantization.

### 3. Formal representation of an enhancement pipeline (20 min)

**Operators and byte domains (7 min).** Let $D_{\alpha}$ denote decoding with settings $\alpha$, including color conversion and orientation handling. Define

$$
g_0=D_{\alpha}(B_w).
$$

The numerical processing stages are

$$
g_i=T_i(g_{i-1};\theta_i),\qquad i=1,\ldots,m.
$$

Each operator $T_i$ may depend on explicit parameters $\theta_i$ and on implementation choices. The final numerical result is

$$
g_m=(T_m\circ\cdots\circ T_1)(g_0),
$$

where the parameters have been suppressed for readability. The domain and range of each stage must be compatible; not all intermediate objects need be rasters.

Let $V$ denote the display preparation operation (for example, clipping, intensity mapping, and conversion to 8-bit samples), and $E_{\beta}$ the encoder with settings $\beta$. The derived file is

$$
B_{\mathrm{out}}=E_{\beta}(V(g_m)).
$$

Hash $B_w$ and $B_{\mathrm{out}}$ as encoded files. If intermediate arrays are hashed, also define their serialization, shape, data type, byte order, channel order, and memory ordering. Hashing a rendered PNG is not equivalent to hashing a floating-point reconstruction.

**Worked example: inverse problems revisited (8 min).** Reuse the model from Week 7,

$$
g=Q(HW_{\theta}f+n),
$$

where $W_{\theta}$ is a geometric warp, $H$ is blur, $n$ is additive noise, and $Q$ is quantization. This example assumes additive noise; suitable Poisson-count data require a different observation model.

Suppose a documented analysis estimates a PSF and warp parameters, performs regularized deconvolution, and then corrects the geometry. For the deconvolution stage, consider the Tikhonov objective from Week 6:

$$
J_{\lambda}(u)=\|Hu-g\|_2^2+\lambda\|Lu\|_2^2.
$$

$$
\widehat{u}_{\lambda}\in\mathop{\mathrm{arg\,min}}_u J_{\lambda}(u).
$$

Here $u$ represents the warped image before blur, and $L$ is a specified regularization operator. This is an approximate model for decoded observations when quantization has been neglected or otherwise accounted for. The geometric correction is then applied to $\widehat{u}_{\lambda}$ using the specified inverse-warp implementation.

A label such as "Tikhonov deconvolution, followed by unwarping" does not determine the result. Record at least the PSF coefficients or their generating model, normalization, coordinate conventions, padding and boundary conditions, regularization operator and weight, solver, tolerances and stopping rule, data type and intensity scale, warp parameters, interpolation, and the handling of out-of-bounds samples.

Recall that operator order generally matters. Applying a geometric correction before deconvolution may change the effective blur model. Parameter estimation is itself a computational stage; record the candidate ranges, objective, constraints, tie-breaking rule, and chosen parameters. Record manual choices, such as crop coordinates or control points, in the coordinate system of the relevant input artifact.

**Information versus inference (5 min).** In the linear setting, if $v\ne 0$ and $Hv=0$, then

$$
H(u+v)=Hu.
$$

The observations alone cannot distinguish $u$ from $u+v$. Even if the null space is trivial, small singular values can make differences practically unobservable in noise. Quantization can introduce additional ambiguity.

Regularization resolves some of this ambiguity by selecting a preferred solution. It does not establish that the selected solution is the actual original. In particular, two different values of $\lambda$ may yield different plausible structures from the same input. Both runs can be legitimate computational experiments and both can be reproducible, while neither alone establishes which structure was present.

Record the selection criterion and retain relevant alternatives. Do not choose a result merely because it resembles the expected answer.

### 4. Determinism, reproducibility, and numerical precision (15 min)

**Mathematical and computational determinism (5 min).** A deterministic operator maps fixed inputs and parameters to a fixed mathematical output. A program implementing that operator has additional dependencies: arithmetic precision, rounding, library versions, execution device, thread scheduling, algorithm selection, and file encoding.

Use the following floating-point example (ordinary IEEE 754 binary64 arithmetic with round-to-nearest):

$$
a=10^{16},\qquad b=-10^{16},\qquad c=1.
$$

In exact arithmetic both $(a+b)+c$ and $a+(b+c)$ equal 1. In binary64 the first expression evaluates to 1, while the second evaluates to 0 because the small increment is lost in the intermediate addition.

~~~python
a = 1e16
b = -1e16
c = 1.0

print((a + b) + c)
print(a + (b + c))
~~~

Parallel sums, FFT implementations, iterative solvers, fused multiply-add operations, and CPU/GPU differences can produce analogous numerical discrepancies. They do not necessarily imply evidence tampering. However, unexplained differences must be investigated rather than silently accepted.

For procedures involving randomness, record the generator algorithm, seed, relevant generator state or stream allocation, and software version. Setting a seed is not by itself a guarantee of determinism across platforms or parallel implementations.

**Levels of reproducibility (5 min).** Use the following operational terminology in this course; disciplinary conventions vary.

- Repeatability: rerun the specified procedure in the same controlled environment.
- Computational reproducibility: another examiner repeats the documented procedure with the same input and obtains a result satisfying the stated comparison criteria.
- Independent methodological validation: separate tests establish the reliability and limitations of the method for its intended use (Week 9).

Distinguish bitwise reproducibility of a serialized artifact, numerical agreement of arrays, and agreement of a specified feature measurement or conclusion. Agreement at one level need not imply agreement at another.

For two finite arrays of the same shape with corresponding samples $x_j$ and $y_j$, one possible numerical criterion is

$$
|x_j-y_j|\le \tau_a+\tau_r|x_j|
$$

for every sample index $j$, where $x$ is the designated reference and $\tau_a,\tau_r$ are predeclared absolute and relative tolerances. State the treatment of nonfinite values and require compatible array representations and coordinate systems. A tolerance is a comparison rule, not a replacement for SHA-256 verification of preserved evidence.

Select tolerances based on the numerical method and intended measurement before examining the comparison results. A small pixel-wise error may still affect an unstable threshold or a disputed local feature; compare the relevant feature measurements separately.

**Demonstration (5 min).** Show the floating-point example, then compare two hypothetical runs of the same algorithm. If the derived file hashes differ, first check the run settings and inputs, then examine encoding and metadata, numerical arrays, and relevant feature differences. Report the observed level of agreement. Do not claim an exact match when only tolerance-based agreement has been established.

### 5. Audit trails and parameter provenance (15 min)

An audit trail should allow a reviewer to reconstruct the sequence of actions and relate each output to its actual inputs. Record both successful and failed or abandoned attempts where relevant to the examination. Preserve the rationale for selecting the reported result.

A linear pipeline is sufficient for the basic example, but real investigations branch: several PSFs may be tested against one input, a mask may be reused, or a calibration artifact may be an additional input. Represent this as a directed acyclic graph of artifacts and processing activities. Give every artifact and run a distinct identifier, even when two artifacts have identical byte content.

For each run, record:

- Case/item/run identifiers, examiner, timestamps with time zone, input paths or item references, expected and observed digests, and verification status.
- Ordered operations, parameters and their units, parameter origin (supplied, calibrated, estimated, or manually selected), and references to additional input artifacts.
- Source code revision or digest, dependency versions, interpreter, numerical backend, platform, and relevant execution settings.
- Output and intermediate identifiers, serialization details, digests, warnings, errors, and outcome.
- Selection rationale, comparison criteria, and links to supporting notes or validation records.

Do not place credentials, access tokens, private keys, or unnecessary personal data in an audit manifest. Record only environment fields relevant to the analysis; dumping the entire environment is not an appropriate reproducibility practice.

**Illustrative manifest.** This is a teaching schema fragment, not a completed execution record or a mandated forensic standard. The null values represent fields that an actual run must populate. A completed run must not treat a null digest or unknown verification status as a successful check.

~~~json
{
  "schema_version": 1,
  "case_id": "SYNTHETIC-001",
  "run_id": "R-001",
  "examiner_id": "student",
  "started_at_utc": null,
  "status": "example_only",
  "input": {
    "item_id": "E-001-W1",
    "source_item_id": "E-001",
    "hash_algorithm": "SHA-256",
    "expected_digest": null,
    "observed_digest": null,
    "verified": null
  },
  "operations": [
    {
      "name": "tikhonov_deconvolution",
      "parameters": {
        "lambda": 0.01,
        "regularizer": "identity",
        "intensity_scale": "0_to_1",
        "boundary": "circular"
      },
      "parameter_origin": "illustrative_not_validated",
      "psf_item_id": "CAL-001"
    }
  ],
  "environment": {
    "code_revision": null,
    "python_version": null,
    "dependency_versions": null
  },
  "output": {
    "item_id": "E-001-R001",
    "format": "PNG",
    "sha256": null
  },
  "finished_at_utc": null
}
~~~

The example is deliberately incomplete: a real manifest must resolve the PSF item to a recorded artifact and digest, describe the decoder and display/encoding stages, and capture the actual solver settings and runtime environment. The illustrative value of $\lambda$ is not a recommended value for an arbitrary image.

Discuss the Lab 5 workflow in pseudocode:

~~~
load protected acquisition record
verify working copy against recorded digest
if verification fails:
    record failure and stop

create a new run record and output location
record input artifacts, code, environment and intended parameters
execute the documented operations
record actual parameters, warnings and outcome
serialize outputs and compute their digests
complete and preserve the manifest

repeat in a separate run
compare output bytes and, if appropriate, numerical results
record the comparison and any discrepancies
~~~

A manifest containing hashes is not automatically tamper-evident: an attacker who can rewrite both an artifact and its manifest can recompute the digest. Protect records using appropriate access controls, independently retained reference records, and authenticated or signed records where suitable, as discussed on Day 1. Hashing a manifest requires a defined byte representation; reformatting JSON changes its file digest. Do not confuse the digest of a configuration with evidence that the program actually used that configuration.

### 6. Investigative intelligence versus courtroom evidence (10 min)

An enhanced image may suggest a useful direction for further investigation without being sufficient to establish an identification. Distinguish what was observed directly, what was computed, what was inferred from a model, and what was independently corroborated.

Consider a synthetic blurred plate for which two regularization settings suggest different characters. One yields a visually sharp "B", the other an "8". Both outputs come from the same verified input. Neither is independent corroboration of the other. Apparent legibility does not establish that either candidate is correct.

A responsible preliminary report separates:

| Category | Example |
|----------|---------|
| Observation | The acquired region contains an unresolved character. |
| Processing | A specified regularized deconvolution was applied to a verified working copy. |
| Result | The displayed derivative contains a structure resembling a B under the selected settings. |
| Limitation | Another documented setting yields a structure resembling an 8; the distinction is not established. |
| Investigative lead | Seek independent corroboration of either candidate. |

Do not equate a deterministic or hash-verified method with an admissible or reliable identification. Nor does a limitation necessarily make an image inadmissible for every purpose. The intended inference, validation evidence, jurisdiction, and legal context matter; detailed admissibility questions belong to Week 9.

Close with the question:

> If two examiners can independently reproduce the same misleading feature, what experiment would establish whether the feature is supported by the original observation?

This motivates forward-and-reverse control validation using independently known reference images in Week 9. A small forward-model residual alone is insufficient to establish the truth of a reconstructed feature.

## Instructor Preparation

- Reuse the synthetic images and restoration code from Labs 2–4 and the verified-copy demonstration from Day 1.
- Prepare a small example in which different regularization settings produce materially different interpretations.
- Test the floating-point demonstration and prepare a comparison of numerical arrays versus encoded file bytes.
- Prepare a protected reference digest, a deliberately altered test copy, and an example run manifest.
- Review the image-processing and imagery-integrity guidance listed in syllabus/references.md before teaching; distinguish recommended practices from jurisdiction-specific requirements.

## Tutorial and Lab Connection

Lab 5 (Part A) begins the forensic audit pipeline used throughout Weeks 8–10. Students should wrap an existing enhancement method rather than develop another restoration algorithm.

- Verify a working copy against an independently retained acquisition digest; reject a deliberately modified test input.
- Run a documented enhancement in a separate output directory and preserve the input.
- Record input and output digests, actual parameters, implementation and environment, warnings, and execution status in a machine-readable manifest.
- Repeat the procedure and report exact byte agreement or numerical agreement under a declared comparison criterion, as appropriate.
- Write a preliminary report distinguishing observations, computations, inferences, and limitations.

Week 9 adds control experiments and method validation to this same workflow. Week 10 examines generative restoration and the limits of interpreting synthesized features. The manifest and derivative records should remain usable in both later stages.

## References

- Course notes: Week 8, Day 1 (evidence acquisition, hashing, and custody); Weeks 4–7 (convolution and reconstruction).
- See syllabus/references.md for SWGDE Image Processing Guidelines and Best Practices for Maintaining the Integrity of Imagery.
- Python standard library documentation: [hashlib](https://docs.python.org/3/library/hashlib.html) and [Floating-Point Arithmetic: Issues and Limitations](https://docs.python.org/3/tutorial/floatingpoint.html).

The operational terminology and illustrative manifest are course teaching choices, not claims of compliance with a specific forensic accreditation standard.
