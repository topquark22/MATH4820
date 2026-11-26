# Week 14, Day 2 — Capstone Presentations and Scientific Defense

*90-minute session. Concludes MATH 4820 / CS 6820. See the [capstone project specification](../labs/capstone.md) and Week 14 Day 1.*

## Learning Objectives

1. Present an integrated anonymization pipeline with a precise threat model.
2. Defend mathematical assumptions, experimental methods and reported conclusions.
3. Compare privacy and utility outcomes without treating visual realism as evidence of privacy.
4. Explain limitations and propose appropriate follow-up investigations.

## Timed Outline (90 min)

| Min | Segment |
|-----|---------|
| 10 | Capstone presentation requirements |
| 50 | Student presentations and demonstrations |
| 5 | Break |
| 15 | Critical review and comparative evaluation |
| 10 | Course conclusion and open research problems |
| **90** | **Total** |

The presentation block assumes a small cohort. For larger groups, arrange additional sessions, parallel panels, or recorded demonstrations under the institution's assessment rules. Do not silently reduce the opportunity for scientific defense.

## Content Notes

### 1. Capstone presentation requirements (10 min)

Each project presents an end-to-end anonymization pipeline using synthetic or appropriately consented and authorized reference material. The goal is not to prove universal anonymity or recover actual private identifiers. Evaluate the declared privacy requirements using controlled artificial attributes and independently established references.

A presentation should identify:

- The protected attribute, threat model, auxiliary information and release boundary.
- The pipeline stages, mathematical assumptions, configuration and failure handling.
- The calibration and held-out evaluation procedure, including independent sampling units.
- Detection coverage, residual leakage, retained utility, uncertainty and computational requirements.
- Evidence of reproducibility and the limits of the conclusions.

The demonstration may use a recorded run if the live hardware or model environment is unreliable. Report any actual failures or deviations; do not replace unsuccessful runs with selected favorable examples.

### 2. Student presentations and demonstrations (50 min)

A suggested allocation for five projects is eight minutes for presentation and two minutes for questions per project. Adjust the allocation to the actual cohort and announce it before assessment.

Require the presentation to include an architecture diagram, a numerical evaluation table, and examples of both successful and unsuccessful processing where available. A negative result may be scientifically valuable when supported by a rigorous design.

~~~mermaid
flowchart TD
    A["Project formulation"] --> B["Documented implementation"]
    B --> C["Calibration and fixed configuration"]
    C --> D["Independent evaluation"]
    D --> E["Privacy and utility results"]
    E --> F["Scientific defense"]
    F --> G["Limitations and next steps"]
~~~

*Figure 1. Presentation structure from formulation to evidence and qualified conclusions.*

### 3. Critical review and comparative evaluation (15 min)

Ask each team to distinguish mathematical invariance from empirical resistance, and to explain whether the evaluation domain supports the intended claim.

Suggested defense questions:

1. Which information is actually removed, and which identifying information remains in the conditioning or context?
2. How are missed detections and incomplete masks counted?
3. What is the baseline using permitted auxiliary information alone?
4. What prevents held-out reference information from influencing parameter selection?
5. What statistical uncertainty remains, and are the independent sampling assumptions justified?
6. Is the selected configuration nondominated among the tested alternatives? Does it satisfy the required privacy constraints?
7. Could changes in geometry, metadata, tracking, or publication invalidate the stated guarantee?

Compare projects only on genuinely comparable objectives and evaluation domains. If two teams used different populations, adversarial assumptions, or utility tasks, a direct numerical ranking may be unjustified.

The instructor should use the provisional rubric in the capstone specification. Award credit for rigorous failure analysis, honest reporting, and defensible conclusions rather than apparent visual success alone.

### 4. Course conclusion and open research problems (10 min)

Return to the motivating questions from Week 1:

- What does an observation actually measure?
- Under which mathematical assumptions is its inverse identifiable?
- When does instability prevent reliable recovery?
- Which output features originate from the observation and which from a prior or generator?
- What would constitute a defensible claim that a protected attribute has not been disclosed?

The central themes are information, identifiability, stability, inference and verification. They recur across image restoration, digital forensics and privacy engineering.

Possible further research directions include calibrated uncertainty for inverse problems, robust privacy evaluation under distribution shift, formal noninterference for learned pipelines, privacy-preserving temporal conditioning, and task-specific privacy–utility optimization. These are directions for further study, not established solutions.

## Instructor Preparation

- Confirm presentation allocation, assessment criteria, accessibility and permitted tools.
- Verify execution environments and model licenses; arrange precomputed demonstrations when needed.
- Ensure evaluation data and hidden labels remain independent of tuning. Store any confidential assessment materials outside the public course repository.
- Require source attribution and permission for all third-party media.
- Confirm that the final presentation assesses the specified objectives rather than requiring a deployable system for actual public release.

## Tutorial and Workbook Connection

Complete the Week 14 workbook as a synthesis of the mathematical and experimental methods. The capstone provides the extended implementation and scientific defense; the workbook supplies complementary analytical practice.

## Closing Statement

A reliable reconstruction is not simply a sharp image, and a reliable anonymization is not simply a plausible replacement. Both require a precise statement of the information being inferred or protected, the mathematical assumptions, the experimental evidence and the limits of the conclusion.
