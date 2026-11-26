# Environment and Preparation

## Baseline environment

Use a tested Python virtual environment with NumPy, SciPy, Matplotlib, Pillow, OpenCV, scikit-image, pytest, and optionally JupyterLab. Select and pin versions after a trial run on the teaching machines. These are proposed dependencies, not a verified lockfile.

A starting setup (run from a dedicated local lab directory):

~~~bash
python -m venv .venv
# Activate using the command appropriate to the operating system.
python -m pip install numpy scipy matplotlib pillow opencv-python scikit-image pytest jupyterlab
~~~

On Windows PowerShell the activation command is .venv\Scripts\Activate.ps1; on POSIX shells it is source .venv/bin/activate. Alternatively invoke the virtual environment's Python executable directly. Do not weaken system execution policy to activate an environment.

Verify imports, a small FFT round trip, PNG read/write, and a headless plot export. Check OpenCV channel order (BGR versus RGB). Avoid requiring a graphical display for grading. Record tested Python and package versions, platform, and relevant numerical backend. Do not distribute complete environment-variable dumps, authentication configuration, or tokens.

## Data conventions

- Raster axes: row then column; geometric coordinates: x = column, y = row, unless explicitly stated otherwise.
- Use float64 normalized intensities in [0,1] for classical numerical work; document conversions, channel axis, and data range. Count observations are a separate nonnegative domain.
- Record interpolation, pixel-center convention, PSF origin and normalization, padding, crop, and FFT normalization.
- Preserve unclipped numerical results; create separately labelled display derivatives. Use lossless data formats for numerical evaluation.
- Keep calibration inputs, test observations, and withheld reference data separate.

## Model-based work (Weeks 10 and 13)

Before assigning GFPGAN, CodeFormer, or DeepPrivacy2, the instructor must select a specific repository revision and checkpoint, verify the code and weight licenses separately, and test the installation on the actual hardware. Model-specific dependencies may conflict with the classical environment; use separate environments as necessary.

Record model and detector revisions, checkpoint SHA-256, device, preprocessing, alignment, mask settings, randomness, and output encoding. Do not require students to disclose credentials or upload private imagery to hosted services. Download weights only from approved sources and inspect installation instructions before execution.

Prepare authorized synthetic or appropriately consented inputs and a precomputed output bundle generated with the same recorded configuration. Include failures, masks where available, and enough provenance to evaluate the results. The fallback assesses interpretation and validation rather than local model installation. It does not constitute a claim that the models have been run for this manual.

## Preflight checklist

Confirm that data loaders use the documented shape and scale, dependency versions are available offline if needed, test references are withheld appropriately, example results can be reproduced, and accessible alternatives exist for students with limited hardware. Trial the one-hour activities and adjust the required scope before release.
