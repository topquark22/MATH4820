# Week 1, Day 1 — Images as Functions, and Invertible vs. Destructive Operations

*90-minute lecture. Source: Week 1 of `syllabus/weekly-schedule.md`, with `syllabus/course-overview.md` and `syllabus/technical-notes.md`.*

> **Assumptions (flagged):** This is the first session, so the tone is conceptual and gentle; no matrix math is used (matrices appear on Day 2). Timings are suggestions. Example operations are illustrative choices, not syllabus requirements.

## Learning Objectives

By the end of this session students can:

1. Describe an image both as a continuous function $f: \mathbb{R}^2 \to \mathbb{R}^k$ and as a discrete array.
2. Explain what sampling and quantization do, and why they lose information.
3. Define injective, surjective, and bijective maps, and classify simple image operations accordingly.
4. Explain why invertibility matters for forensics (the course's central theme).

## Timed Outline (90 min)

| Min | Segment |
|-----|---------|
| 10 | Welcome, course overview (learning outcomes), logistics |
| 10 | Motivation: can every image edit be undone? |
| 20 | Continuous images $f:\mathbb{R}^2\to\mathbb{R}^k$ |
| 15 | Discrete images: sampling and quantization |
| 5 | Break |
| 20 | Injective, surjective, bijective maps |
| 10 | In-class activity: classify image operations; preview of Day 2 |
| **90** | **Total** |

## Content Notes

### 1. Motivation (10 min)
Discuss informally, without math, two edits: a *swirl* that twists pixels around a point, and a *strong blur*. One can often be undone; the other generally cannot. The course asks *when* and *why*. (The swirl case study, *Operation Vico*, is Week 2; mention only as a teaser.)

### 2. Continuous images (20 min)
An image is a function assigning a color/intensity to each point of the plane:

$$
f: \mathbb{R}^2 \to \mathbb{R}^k, \qquad (x, y) \mapsto f(x, y).
$$

- $k = 1$: grayscale; $k = 3$: color (e.g. RGB).
- Domain: positions $(x,y)$; codomain: pixel values.
- Think of $f$ as an idealized "scene"; no finite device records it exactly.

### 3. Discrete images (15 min)
A digital image is a finite array of integers:

$$
I \in \mathbb{Z}^{M \times N \times k}.
$$

- $M \times N$ is the grid of pixel positions (**sampling**); $k$ channels per pixel.
- **Quantization:** round values to integers (e.g. $\{0,\dots,255\}$ for 8-bit — assumed typical example).
- Both steps discard information: many different $f$ give the same $I$.
- Course theme: continuous operations can be invertible, but digital versions pick up interpolation blurring and quantization (see `syllabus/technical-notes.md`, "Discrete hurdles").

### 4. Injective, surjective, bijective (20 min)
For a map $T: X \to Y$:

- **Injective** (one-to-one): $T(a) = T(b) \Rightarrow a = b$. No information is merged.
- **Surjective** (onto): for every $y \in Y$ there is some $x \in X$ with $T(x) = y$.
- **Bijective:** both; then an inverse $T^{-1}$ exists with $T^{-1}(T(x)) = x$.

Image-flavored intuition (no matrices):
- Rearranging pixel positions without changing values (e.g. a flip) — bijective on a finite grid.
- Thresholding (values below a cutoff set to 0) — not injective.
- Converting RGB to grayscale — not injective ($k=3 \to k=1$ loses color).
- Adding a constant brightness — injective on $\mathbb{R}$, but with 8-bit clipping at 255 it is not (illustrative assumption).

Links to Course Learning Outcome 1 (classify operators as injective, surjective, or destructive).

### 5. Activity (10 min)
Small groups classify the operations in Exercise 3 and report back; close with a one-minute preview of Day 2 (matrix refresher, grids, interpolation).

## Key Definitions Summary

- Continuous image: $f:\mathbb{R}^2\to\mathbb{R}^k$.
- Discrete image: $I\in\mathbb{Z}^{M\times N\times k}$.
- Injective / surjective / bijective as above; an inverse exists iff the map is bijective.

## Exercises

1. In your own words, why can two different continuous images produce the same discrete array?
2. A $4\times 4$ grayscale image has 8-bit values. How many distinct such images exist? Is "sampling + quantization" injective on all continuous images?
3. Classify each as injective / surjective / bijective / none (state domain and codomain, e.g. 8-bit values or a finite pixel grid): (a) reversing pixel order in each row; (b) setting every pixel to its row's maximum; (c) converting RGB to grayscale; (d) flipping the image upside down; (e) rounding values to the nearest multiple of 10.
4. Give a function $\mathbb{R}\to\mathbb{R}$ that is injective but not surjective, and one that is surjective but not injective.
5. *(Discussion)* Why would a forensic analyst care whether an operation is injective?
