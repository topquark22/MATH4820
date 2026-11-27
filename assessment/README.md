# Assessment

## Midterm Examination Format

The MATH 4820 / CS 6820 midterm is a computer-assisted written mathematics examination covering Weeks 1–6. It combines traditional mathematical reasoning with numerical computation and experimental analysis. The computer is a mathematical instrument, not a substitute for derivations, proofs, or interpretation.

The midterm is scheduled for Week 7, Day 1. The applied reconstruction challenge on Day 2 is a separate assessment activity.

### Examination Structure

- **Questions:** 10 compulsory questions, each worth 10 marks.
- **Total:** 100 marks.
- **Duration:** Three hours (provisional; supersedes the original 90-minute planning assumption for the computer-assisted examination). The timetable and accommodation arrangements must be confirmed before formal course delivery.
- **Scope:** Mathematical foundations, geometric transformations, compression and quantization, Fourier analysis, convolution, ill-posed inverse problems, statistical observation models, and regularized and iterative reconstruction.

The proposed distribution is:

| Problem type | Marks |
|--------------|------:|
| Analytical (proofs, derivations, and counterexamples) | 40 |
| Computational (numerical calculations and experiments) | 30 |
| Hybrid (mathematical analysis supported by computation) | 30 |
| **Total** | **100** |

Questions may contain several subparts. The examination paper specifies the marks for each subpart, required deliverables, and any question-specific restrictions.

### Permitted Tools and Resources

- A local Python environment with NumPy, SciPy, OpenCV, and Matplotlib.
- A local Jupyter notebook, Python IDE, text editor, or equivalent programming environment.
- A scientific calculator and handwritten working materials.
- The student's own code developed in Labs 1–4, subject to any question-specific restrictions.
- Standard library and API documentation (preferably available offline).

Established numerical library routines, such as FFT and linear algebra functions, may be used unless a question explicitly requires a derivation or implementation from first principles. Students must not communicate with other people or use generative AI, including chat assistants, Copilot, or AI-assisted code completion, during an independent examination attempt. Access to other resources must be specified before the examination.

### Examination Data

All datasets necessary to answer the questions will be supplied with the examination. Small vectors and matrices may be included directly in the paper; larger numerical arrays and images will be provided electronically. No student is expected to transcribe large matrices from a printed page or obtain undisclosed data from an external service.

| Format | Intended use |
|--------|--------------|
| CSV (`.csv`) | Numerical vectors, matrices, and tabular observations |
| NumPy (`.npy`) | Multidimensional arrays, including floating-point images and PSFs |
| PNG (`.png`) | Losslessly encoded raster images at the stated bit depth |
| JPEG (`.jpg`) | Images where lossy JPEG encoding is part of the observation model |
| JSON (`.json`) | Dataset metadata and available model parameters |

The dataset documentation will identify the files associated with each question, their dimensions, data types, intensity or count scales, coordinate and indexing conventions, and applicable boundary conditions. Convolution kernels must have a documented origin and normalization convention. Where different representations of an observation are supplied, the documentation will identify the authoritative numerical data. A display image is not necessarily equivalent to a floating-point array; conversion to an integer raster can introduce additional quantization.

Datasets must be self-contained, reproducible, and tested by the instructor before distribution. The student-facing package should include file-loading instructions and any essential dependencies, but not implementations that solve the assessed problems.

### Ground Truth and Experimental Integrity

Some questions may supply known reference data for analytical work, calibration, or controlled experiments. For questions assessing reconstruction from held-out observations, the clean reference, hidden degradation parameters (where applicable), and noise realization must not be available during reconstruction or parameter selection.

Select settings using permitted calibration data or a predeclared observation-only rule. Record the reconstruction, algorithm, and selected settings before ground truth is revealed for evaluation. Reference-tuned results are exploratory or oracle benchmarks, not independent held-out performance.

Because this repository is public, unreleased reference data, hidden parameters, answer keys, and generation code or seeds that would reveal them must be stored separately in instructor-controlled materials. If a question requires later reference-based evaluation, the instructor must arrange a staged release or perform that evaluation independently. The paper must make clear which results can be submitted before the release.

### Submission Requirements

Students may submit either:

1. A Jupyter notebook containing mathematical exposition, derivations, executable code, numerical results, and relevant plots or images; or
2. Written mathematical answers accompanied by Python source files and the corresponding numerical results, plots, and images.

Label each answer with its question and subpart number. Include the mathematical formulation, assumptions, code, relevant outputs, and interpretation for computational work. Provide any necessary instructions to reproduce the results, including parameter choices and random seeds used by the student's own experiments.

Handwritten derivations are acceptable; they may be submitted on paper or as legible scans according to the examination arrangements. Students are not required to typeset mathematics during the examination.

### Marking Principles

- Award partial credit for correct mathematical reasoning even when subsequent arithmetic or implementation errors affect the final result.
- A numerical output without an explanation or reproducible method does not constitute a complete mathematical answer.
- Evaluate the suitability of the observation model, algorithm, assumptions, and interpretation, not merely the apparent sharpness of a reconstructed image.
- Distinguish non-uniqueness, instability, finite-precision effects, and information loss.
- Award credit for a well-supported conclusion that information cannot be reliably recovered.

### Instructor Preparation

Provide a consistent examination environment or test the required software on student systems beforehand. Supply the paper, data package, and permitted documentation before the timed work begins, with appropriate restrictions on early access to the questions. Specify submission procedures, arrangements for technical failures, and accommodations. Confirm the proposed duration against institutional requirements and a trial run of the completed paper.

### Repository Organization

The planned student-facing materials are:

- `midterm.md` — examination paper, including instructions and marks.
- `midterm-data/README.md` — dataset inventory, loading instructions, and numerical conventions.
- `midterm-data/qNN/` — question-specific datasets, where required.

The instructor-facing plans are in [Week 7, Day 1](../lectures/week07-day1.md) and [Week 7, Day 2](../lectures/week07-day2.md). The actual examination paper, datasets, and marking scheme are to be developed separately.

### Self-Directed Study

For independent study, the nominal duration is a guideline rather than a time limit. Attempt the questions without consulting solutions or AI assistance, then review the mathematical arguments and computational results afterward.

## Final Examination Format

This section is a provisional skeleton for the final examination, not an examination paper. The final is cumulative, with greater emphasis on Weeks 8–14. It takes place after Week 14 during the institution's designated examination period; the date is determined by the institutional schedule. The Week 14 capstone remains a separate assessment.

### Examination Structure

- **Questions:** 10 compulsory questions, each worth 10 marks.
- **Total:** 100 marks.
- **Duration:** Three hours (provisional).
- **Format:** Computer-assisted written mathematics examination.
- **Scope:** Cumulative, emphasizing scientific validation, forensic integrity, generative restoration, information-theoretic privacy, anonymization, and privacy–utility evaluation.

The proposed subject allocation is:

| Question | Subject area | Coverage | Marks |
|----------|--------------|----------|------:|
| 1 | Mathematical foundations, invertibility, and information loss | Weeks 1–3 | 10 |
| 2 | Inverse problems, observation models, and regularization | Weeks 4–6 | 10 |
| 3 | Forensic integrity, hashing, and reproducibility | Week 8 | 10 |
| 4 | Scientific validation and evidentiary standards | Week 9 | 10 |
| 5 | Deterministic reconstruction versus generative restoration | Week 10 | 10 |
| 6 | Redaction failures and restricted-domain injectivity | Week 11 | 10 |
| 7 | Information-theoretic privacy and statistical leakage | Weeks 11–12 | 10 |
| 8 | Detection, redaction, and generative anonymization | Weeks 12–13 | 10 |
| 9 | Temporal privacy and privacy–utility evaluation | Weeks 13–14 | 10 |
| 10 | Integrated mathematical and scientific analysis | Cumulative | 10 |
| **Total** | | | **100** |

This allocates 20 marks to foundations and inverse problems, 30 to digital forensics, 40 to privacy engineering, and 10 to cumulative synthesis. The legal component assesses the scientific principles underlying evidentiary standards rather than memorization of case law or statutory provisions.

The proposed distribution by problem type remains the same as for the midterm:

| Problem type | Marks |
|--------------|------:|
| Analytical (proofs, derivations, and counterexamples) | 40 |
| Computational (numerical calculations and experiments) | 30 |
| Hybrid (mathematical analysis supported by computation) | 30 |
| **Total** | **100** |

These are complementary allocations of the same 100 marks, not separate assessments.

### Permitted Tools and Resources

The midterm's rules for permitted tools, resources, independent work, and submission apply to the final, extended to student-developed code from Labs 1–6 and any additional explicitly authorized local numerical libraries. Handwritten derivations remain acceptable. Generative AI assistants and AI-assisted code completion are prohibited.

Questions involving learned restoration or anonymization should ordinarily supply precomputed model outputs, benchmark results, or small evaluation datasets. The examination must not depend on GPU availability, external inference services, model downloads, or lengthy neural-network training. Students are not expected to build an entire anonymization system during the examination.

### Examination Data and Experimental Integrity

All required data will be supplied with the paper, using the midterm's documented numerical conventions. In addition to CSV, NumPy arrays, PNG, JPEG, and JSON files, the final may include image sequences for temporal evaluation and binary files for integrity verification and hashing.

Use synthetic or appropriately authorized forensic and privacy data. Apply the midterm's ground-truth withholding, calibration, reproducibility, and instructor-controlled storage requirements. Where independent reconstruction or privacy evaluation requires hidden references, keep them unavailable during the relevant stage of the assessment.

### Marking Principles

Apply the midterm's marking principles, with additional credit for recognizing:

- The distinction between evidentiary information and generative inference.
- The difference between empirical privacy performance and mathematical privacy guarantees.
- The limitations of a validation experiment or threat model.
- The distinction between statistical association and demonstrated identity leakage.
- Circumstances in which a definitive scientific conclusion cannot be justified.

A mathematically justified negative result should receive full credit where it satisfies the question's requirements.

### Instructor Preparation and Repository Organization

The planned student-facing materials are:

- `final.md` — examination paper, including instructions and marks.
- `final-data/README.md` — dataset inventory, loading instructions, and numerical conventions.
- `final-data/qNN/` — question-specific datasets, where required.

The paper, datasets, and marking scheme will be developed separately. No placeholder questions or datasets are required at this stage. Apply the midterm's instructor preparation and self-directed study provisions, including environment testing, accommodations, submission arrangements, and a timed trial of the completed paper.

The duration, question allocation, and mark distribution are provisional until the completed examination has been reviewed and trialled. Undergraduate and graduate assessment distinctions, overall course assessment weights, and institutional examination arrangements remain to be determined.
