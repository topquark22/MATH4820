# Lab 6: Red-Teaming Naive Redaction and Deploying DeepPrivacy2

*Working specification. See [Laboratory Curriculum](lab-specifications.md) for the overview and [Weekly Schedule](../syllabus/weekly-schedule.md) for milestones.*

- **Aligned lectures:** Weeks 11–13 (Forward-Matching Attacks, Street View Pipelines, and Zero-Leakage GANs)
- **Objective:** Break weak redaction via forward-matching, then deploy a privacy pipeline intended to prevent recovery.
- **Tasks:**
  - **Part A — Attack:** Given a Gaussian-blurred or pixelated seven-character license plate rendered in a known font, write a forward-blur matcher over a tractable, explicitly defined synthetic candidate set and measure recovery accuracy without inverting the blur.
  - **Part B — Defense:** Implement a Street View-style noise-injected blur (Gaussian blur plus $N(0, \sigma_{\text{noise}})$ noise and alpha-blending) and measure whether and under what conditions the forward-matching attack fails. Failure of one tested attack does not establish irreversible redaction.
  - **Part C — Generative anonymization:** Deploy DeepPrivacy2 on a sample street-scene image and short video clip; verify pixel masking in the protected region and inspect frame-to-frame temporal consistency.
- **Deliverable:** Attack / defense benchmark script and anonymized-video output analysis.
