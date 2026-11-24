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
