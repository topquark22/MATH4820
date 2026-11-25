# Lab 5: Forensic Validation and Detecting AI Hallucinations

*Working specification. See [Laboratory Curriculum](lab-specifications.md) for the overview and [Weekly Schedule](../syllabus/weekly-schedule.md) for milestones.*

- **Aligned lectures:** Weeks 8–10 (Chain of Custody, SWGDE Standards, and Generative Boundaries)
- **Objective:** Build an evidentiary audit pipeline and test whether generative restoration introduces unsupported identifying features; assess the implications for evidentiary reliability.
- **Tasks:**
  - **Part A — Week 8:** Create a reproducible forensic wrapper in Python that verifies a working copy against a protected acquisition digest, records SHA-256 output hashes, logs transformation parameters and execution details, and compares repeated runs.
  - **Part B — Week 9:** Run automated forward-and-reverse control tests on independent reference images, informed by SWGDE guidance; measure artifacts and false identifying features.
  - **Part C — Week 10:** Run an open-source neural face-restoration model (for example, GFPGAN or CodeFormer) on heavily downsampled / blurred synthetic or appropriately consented portraits of distinct individuals and assess identity drift and unsupported features against ground truth.
- **Deliverable:** Mock Forensic Examination Report documenting integrity, reproducibility, validation results, limitations, and their implications under the legal frameworks and technical guidance discussed in Weeks 9–10. No single report format guarantees admissibility.
