# Week 9, Day 1 — Scientific Evidence and Legal Admissibility

*90-minute lecture. Source: Week 9 of syllabus/weekly-schedule.md ("Scientific Validation and Legal Standards"). Continues the integrity and reproducibility principles from Week 8 and prepares for experimental validation on Day 2.*

> **Scope:** Comparative introduction to US federal and Canadian expert-evidence law, laboratory competence, and technical guidance. This is a mathematics and computing course, not legal training. The diagrams are teaching models, not binding legal decision trees. Actual admissibility depends on the jurisdiction, proceeding, purpose, facts, and applicable law.

## Learning Objectives

By the end of this lecture students can:

1. Distinguish scientific validity, legal admissibility, and evidentiary weight.
2. Explain the relevance of Daubert, Kumho Tire, and the amended US Federal Rule of Evidence 702 to computational image analysis.
3. Explain the Mohan threshold requirements and the White Burgess approach to expert independence and judicial gatekeeping in Canada.
4. Distinguish laboratory accreditation under ISO/IEC 17025 from technical guidance published by SWGDE.
5. Identify the scientific foundation needed for progressively stronger claims about reconstructed image features.

## Timed Outline (90 min)

| Min | Segment |
|-----|---------|
| 10 | Scientific reliability versus legal admissibility |
| 20 | United States: Daubert, Kumho Tire, and Rule 702 |
| 20 | Canada: Mohan and White Burgess |
| 5 | Break |
| 15 | ISO/IEC 17025 and laboratory accreditation |
| 15 | SWGDE guidance for forensic image processing |
| 5 | Application to an image reconstruction dispute |
| **90** | **Total** |

## Content Notes

### 1. Scientific reliability versus legal admissibility (10 min)

Recall the three properties introduced in Week 8: integrity, computational reproducibility, and scientific validity. The first concerns the preserved evidence, the second the repeatability of the documented analysis, and the third the reliability of the inference for its intended purpose.

Legal admissibility is a separate question. It concerns whether evidence may be received for a specified purpose under applicable legal rules. Evidentiary weight concerns how persuasive the admitted evidence is in the circumstances. Neither admission nor accreditation establishes the truth of the disputed conclusion.

~~~mermaid
flowchart TD
    A["Preserved input and provenance"] --> B["Documented and reproducible analysis"]
    B --> C["Method validation and case-specific applicability"]
    C --> D["Proposed expert opinion and stated limitations"]
    E["Applicable law, qualifications, relevance and other legal requirements"] --> F["Judicial admissibility decision"]
    D --> F
    F --> G["If admitted: assessment of evidentiary weight"]
~~~

*Figure 1. Technical foundations inform, but do not determine, a legal decision.*

For example, suppose a verified blurred image yields a sharp-looking character after deconvolution. The hash supports the integrity of the input; the audit manifest supports scrutiny of the procedure; neither demonstrates that the character is real. The expert must explain why the particular inference is warranted, including alternative explanations and limits.

Distinguish an image shown simply to illustrate a documented processing operation from one offered to prove an identification. The foundation needed depends on the proposed use. Authentication of the underlying image and admissibility of an expert's opinion about it are related but distinct inquiries.

### 2. United States: Daubert, Kumho Tire, and Rule 702 (20 min)

**Daubert v. Merrell Dow Pharmaceuticals, Inc., 509 U.S. 579 (1993) (7 min).** The US Supreme Court treated the Federal Rules of Evidence, rather than general acceptance alone, as the governing standard for scientific expert evidence in federal trials. The judge evaluates relevance and reliability before admission.

Introduce the familiar nonexclusive considerations and their translation into the course:

| Consideration | Example in image reconstruction |
|----------------|---------------------------------|
| Testability | Can we construct experiments in which the alleged recovered feature is independently known? |
| Peer review and publication | Is the restoration method and its intended forensic use described and critically examined in the literature? |
| Known or potential error | How often does the process introduce a false stroke or suppress a genuine one under relevant conditions? |
| Operational standards | Are parameter selection, version control, acquisition, and reporting procedures defined? |
| Acceptance in the relevant field | Is the specific inference supported by appropriate forensic and imaging expertise, not merely by the popularity of the software? |

These considerations are flexible, not a mandatory five-item checklist or a score. A mathematical proof about an ideal operator does not establish the accuracy of a real-world identification.

**Kumho Tire Co. v. Carmichael, 526 U.S. 137 (1999) (3 min).** The gatekeeping obligation also extends to technical and other specialized expertise. The relevance of particular reliability considerations depends on the nature of the testimony. A computational examiner cannot avoid the reliability inquiry by describing the analysis as engineering rather than science.

**Federal Rule of Evidence 702, as amended effective December 1, 2023 (7 min).** In addition to appropriate qualifications, the proponent must demonstrate to the court, on a more-likely-than-not basis, that the applicable requirements are satisfied. The rule addresses helpful specialized knowledge, an adequate factual or data foundation, dependable principles and methods, and reliable application to the actual case. The amendment and committee note reinforce the judge's responsibility to assess the foundation and application of the opinion rather than routinely leaving those issues to the fact finder.

~~~mermaid
flowchart TD
    A["Proponent offers expert testimony"] --> B["Qualified expert and helpful specialized knowledge"]
    A --> C["Sufficient facts or data"]
    A --> D["Reliable principles and methods"]
    A --> E["Reliable application to the case"]
    B --> F["Judge evaluates Rule 702 foundation"]
    C --> F
    D --> F
    E --> F
    F --> G["Requirements demonstrated more likely than not?"]
    G -->|No| H["Exclude the unsupported opinion"]
    G -->|Yes| I["Rule 702 threshold met"]
    I --> J["Other applicable rules and scope of admission"]
~~~

*Figure 2. Simplified US federal expert-evidence gatekeeping. The branches represent requirements considered together, not a prescribed procedural sequence.*

The admissibility burden is not a claim that an algorithm has a 50 percent accuracy threshold. It is the legal standard for establishing the prerequisites to admission. The 2023 amendment does not prescribe a universal numerical forensic error rate.

**Discussion (3 min).** A published deconvolution method has been tested on Gaussian blur but the submitted image has spatially varying motion blur, compression, and an unknown PSF. Publication of the method may support its general foundation; it does not answer whether the application to this particular image is reliable.

US state courts and other proceedings may follow different rules. Do not treat federal Rule 702 as universally applicable in the United States.

### 3. Canada: Mohan and White Burgess (20 min)

**R. v. Mohan, [1994] 2 S.C.R. 9 (8 min).** Introduce the four threshold considerations in the Supreme Court of Canada's framework:

- Relevance to the disputed issue.
- Necessity for assisting the trier of fact.
- No applicable exclusionary rule.
- Appropriate expert qualifications.

Relate necessity to the specialized mathematical explanation of inverse problems. A judge or jury may need help understanding why blur removes information and why a restored feature is uncertain. A mathematician's expertise in inverse problems does not automatically establish expertise in facial identification, photographic comparison, or the particulars of the acquisition.

Mohan also recognizes the danger that impressive scientific language may cause fact finders to give opinion evidence more weight than it deserves. Novel or contested techniques can raise particular reliability concerns.

**White Burgess Langille Inman v. Abbott and Haliburton Co., 2015 SCC 23 (8 min).** The Court explains a two-stage admissibility analysis. At the threshold, expert qualification includes the ability and willingness to provide impartial, independent and objective assistance to the court. An expert who cannot or will not fulfill that duty fails the threshold. Lesser concerns may be considered in the subsequent weighing of the benefits and risks of admitting the evidence.

At the gatekeeping stage, the judge considers whether the potential assistance justifies the risks and costs of admission. These may include prejudice, confusion, consumption of time, or undue influence on fact finding. Independence does not mean an expert can never be retained or paid by a party; it concerns the expert's duty and ability to fulfill it.

~~~mermaid
flowchart TD
    A["Proposed expert opinion"] --> B["Stage 1: threshold requirements"]
    B --> C["Relevance, necessity, exclusionary rules, qualifications"]
    C --> D["Expert able and willing to fulfill duty to court"]
    D --> E{"Threshold met?"}
    E -->|No| F["Exclude unsupported opinion"]
    E -->|Yes| G["Stage 2: discretionary gatekeeping"]
    G --> H{"Benefits justify risks and costs?"}
    H -->|No| F
    H -->|Yes| I["Admission subject to applicable scope and rules"]
~~~

*Figure 3. Teaching representation of the Canadian two-stage analysis; expert independence is part of the qualification inquiry, not an additional independent Mohan criterion.*

**Comparison exercise (4 min).** Ask students how an examiner should respond when the party retaining them requests a different regularization setting solely because the result supports that party's desired identification. The scientific response is to document the selection criterion, preserve relevant alternatives, and report limitations rather than select an outcome to favor a litigant.

The US and Canadian frameworks both involve judicial scrutiny but are not interchangeable. The Canadian necessity inquiry and the two-stage framework should not be described as a Canadian copy of Daubert. The applicable rules and procedural setting must be checked for each case.

### 4. ISO/IEC 17025 and laboratory accreditation (15 min)

ISO/IEC 17025:2017 is an international standard addressing testing and calibration laboratories, including their competence, impartiality, and consistent operations. ISO identifies the 2017 edition as reviewed and confirmed in 2023. The standard is not itself a court admissibility rule.

Discuss the following themes in the context of forensic image processing, without reproducing the copyrighted standard or claiming that this classroom workflow satisfies its requirements:

- Personnel competence and authorization: is the examiner trained for the particular activity and interpretation?
- Method selection, verification and validation: is the method appropriate for its intended use and has its performance been demonstrated?
- Technical records and traceability of the analysis: can inputs, software, settings, decisions and outputs be reconstructed from records?
- Quality assurance: how are review, proficiency, comparison, deviations and corrective action handled?
- Reporting and limitations: does the reported conclusion accurately reflect the method's demonstrated capabilities?

Distinguish accreditation from certification and from a legal ruling. Accreditation concerns demonstrated competence for a defined scope of activities, evaluated by an accreditation body. The actual scope matters: accreditation for one examination does not establish competence for every possible reconstruction or identification. Likewise, lack of accreditation is not in itself a universal rule of exclusion.

~~~mermaid
flowchart TD
    A["ISO/IEC 17025 requirements"] --> B["Laboratory competence and quality system"]
    B --> C["Accreditation for a defined scope"]
    D["SWGDE technical guidance"] --> E["Documented examination procedures"]
    C --> E
    E --> F["Case-specific records and validation evidence"]
    F --> G["Court evaluates proposed testimony under applicable law"]
~~~

*Figure 4. Laboratory accreditation and technical guidance support an examination's foundation without replacing judicial gatekeeping. The arrows show possible contributions, not mandatory prerequisites.*

Connect to Lab 5: the hash-verified wrapper and manifest developed in Week 8 are components of technical documentation, not a complete quality management system. The independent control experiments developed on Day 2 address a different component, method performance.

### 5. SWGDE guidance for forensic image processing (15 min)

SWGDE (Scientific Working Group on Digital Evidence) publishes discipline-specific recommended practices. Use three documents for this lecture: Image Processing Guidelines (15-M-002), Best Practices for Maintaining the Integrity of Imagery (17-I-001-1.1), and Legal and Scientific Support Relating to the Admissibility of Image Examinations (23-I-001-1.0). The last document was published November 20, 2025 and directly addresses courtroom preparation. These are guidance documents, not legislation or universal admissibility tests.

The image-processing guidance supports preserving the acquired original, examining a separate copy, retaining enough detail to allow competent review and replication, identifying the result as processed imagery, and considering limitations and artifacts. Its restoration discussion connects attainable recovery to the degradation model, noise, and information loss.

Distinguish enhancement (improving visibility), restoration (attempting to compensate for degradation), and interpretation (drawing a conclusion about content). The categories can overlap in practice. A visually clearer image may be useful without being an accurate recovery of every displayed feature.

| Processing operation | Potential evidentiary problem |
|----------------------|-------------------------------|
| Contrast adjustment | Clipped intensity values or obscured faint structures |
| Resampling and geometric correction | Interpolation-induced edges or loss of small features |
| Sharpening or inverse filtering | Ringing, overshoot, noise amplification |
| Noise reduction | Suppression of a genuine low-contrast feature |
| Lossy re-encoding | Additional quantization and blocking artifacts |
| Generative restoration (Week 10) | Plausible synthesized details not supported by the acquired image |

These examples are teaching applications of the guidance and the mathematical results from Weeks 1–7, not an assertion that SWGDE has approved or prohibited every named method.

~~~mermaid
flowchart TD
    A["Acquired image"] --> B["Preserve original and record digest"]
    B --> C["Verify working copy"]
    C --> D["Documented processing and parameter choices"]
    D --> E["Labeled derivative"]
    D --> F["Audit trail and control results"]
    B --> G["Independent review"]
    E --> G
    F --> G
    G --> H["Report observations, inferences and limitations"]
~~~

*Figure 5. Classroom examination workflow informed by SWGDE guidance and the Week 8 integrity model.*

Explain why documenting an algorithm is not sufficient if the examiner cannot characterize its relevant artifacts. An inverse filter can add apparent structure through ringing; the fact that the filter is deterministic does not remove that concern.

An examiner should retain relevant alternatives, describe the intended use of the derivative, distinguish observed from inferred information, and avoid numerical certainty claims unsupported by an appropriate statistical model. The 2025 admissibility guidance explicitly addresses limitations of statistical support and recognizes the need to acknowledge them. Day 2 will develop statistical methods suitable for the controlled experiments in this course.

### 6. Application to an image reconstruction dispute (5 min)

Use the synthetic B-versus-8 example from Week 8. Consider three progressively stronger proposed statements:

| Statement | Additional foundation needed |
|-----------|------------------------------|
| I applied the specified deconvolution to this image. | Verified input, qualified explanation, recorded procedure, and output provenance. |
| The derivative displays a structure resembling B. | Documented display conditions, description of the feature, and limitations of its interpretation. |
| The original character was B. | Task-specific evidence of reliability, applicability to the degradation, assessment of competing explanations, and appropriately qualified interpretation. |

~~~mermaid
flowchart LR
    A["Documented operation"] --> B["Observation about derivative"]
    B --> C["Inference about original scene"]
    D["Increasing demand for scientific support"] -.-> C
~~~

*Figure 6. Increasing inferential strength requires additional support; the progression is not automatic.*

Ask which of these statements a mathematician trained in image restoration is qualified to make and what additional expertise or experimental evidence the strongest statement may require. Do not decide the hypothetical case by declaring an image automatically admissible or inadmissible.

End with the question for Day 2: how can we measure the likelihood that a method recovers a genuine feature, or produces a false one, under conditions representative of the case?

## Instructor Preparation

- Assign short extracts from Rule 702 and its 2023 committee note, Daubert, Kumho Tire, Mohan, and White Burgess. Use the linked judgments rather than relying solely on summaries.
- Review the current published SWGDE documents and the official ISO catalogue entry. Obtain lawful access to the full ISO standard if teaching clause-level requirements.
- Prepare the Week 8 synthetic character example and audit manifest; retain both candidate reconstructions.
- Use the diagrams as conceptual aids. They deliberately omit procedural exceptions and jurisdiction-specific rules.
- Check for relevant legal amendments or subsequent decisions before teaching.

## Tutorial and Lab Connection

Students should review the Week 8 manifest against the scientific and legal questions discussed today, identifying which questions it addresses and which remain unanswered. The tutorial can use a mock expert report and ask students to distinguish defensible descriptions of processing from unsupported claims about identity.

Lab 5 (Part B) will add independent forward-and-reverse control experiments to the existing pipeline. The controls should be designed to test feature recovery and false-feature creation, not merely to demonstrate that the output looks sharper. Day 2 develops the mathematical design and statistical interpretation.

## References

- US Supreme Court, [Daubert v. Merrell Dow Pharmaceuticals, Inc.](https://www.law.cornell.edu/supremecourt/text/509/579), 509 U.S. 579 (1993).
- US Supreme Court, [Kumho Tire Co. v. Carmichael](https://www.law.cornell.edu/supremecourt/text/97-1709), 526 U.S. 137 (1999).
- [Federal Rule of Evidence 702 and committee notes](https://www.govinfo.gov/content/pkg/USCODE-2024-title28/html/USCODE-2024-title28-app-federalru-dup2-rule702.htm), including the 2023 amendment.
- Supreme Court of Canada, [R. v. Mohan](https://www.hyperlaw.ca/cases/23063-1994-05-05), [1994] 2 S.C.R. 9 (judgment reproduction).
- Supreme Court of Canada, [White Burgess Langille Inman v. Abbott and Haliburton Co.](https://hyperlaw.ca/cases/2015-scc-23), 2015 SCC 23, especially paras. 19–24 and 46–54 (judgment reproduction; [official case record](https://www.scc-csc.ca/cases-dossiers/search-recherche/35492/)).
- ISO, [ISO/IEC 17025:2017 — General requirements for the competence of testing and calibration laboratories](https://committee.iso.org/standard/17025).
- SWGDE, [Image Processing Guidelines](https://www.swgde.org/documents/published-complete-listing/15-m-002-swgde-image-processing-guidelines/), 15-M-002.
- SWGDE, [Best Practices for Maintaining the Integrity of Imagery](https://www.swgde.org/documents/published-complete-listing/17-i-001-best-practices-for-maintaining-the-integrity-of-imagery/), 17-I-001-1.1 (2025).
- SWGDE, [Legal and Scientific Support Relating to the Admissibility of Image Examinations](https://www.swgde.org/documents/published-complete-listing/23-i-001-1-0/), 23-I-001-1.0 (2025).

The diagrams and examples are original instructional summaries; consult the cited authorities for the governing text.
