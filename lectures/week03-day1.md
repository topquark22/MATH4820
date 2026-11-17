# Week 3, Day 1 — Color Spaces, Chroma Subsampling, and the Block DCT

*90-minute lecture. Source: Week 3 of `syllabus/weekly-schedule.md` ("Compression, Quantization, and Information Loss"), with `syllabus/technical-notes.md` and `syllabus/course-overview.md`.*

> **Assumptions (flagged):**
> - Day 1 covers color spaces, chroma subsampling, and the DCT as a (still invertible) transform; quantization and forensic detection are on Day 2.
> - The JPEG details below describe the common baseline JPEG pipeline (8×8 blocks, JFIF-style full-range YCbCr). Real files vary (progressive, other subsampling, other tables); verify specifics before class.
> - The 2D DCT is introduced as a tool here; the full 2D Fourier transform is Week 4, so frequency statements are informal.
> - $f:\mathbb{R}^2\to\mathbb{R}^k$ is not assumed continuous. Sharp edges and text are exactly where block-DCT coding struggles (see the Week 1 JPEG teaser).
> - Timings are suggestions.

## Learning Objectives

By the end of this session students can:

1. Convert between RGB and YCbCr and explain why codecs separate luma from chroma.
2. Describe chroma subsampling (e.g. 4:2:0) and explain why it is not injective.
3. Define the 8×8 2D DCT and explain that, before quantization, it is an invertible (bijective) change of basis.
4. Explain why block-based coding treats flat regions and sharp edges so differently.

## Timed Outline (90 min)

| Min | Segment |
|-----|---------|
| 5 | Recap: Week 2 warps; where information is lost in practice |
| 10 | The JPEG pipeline at a glance |
| 20 | Color spaces: RGB and YCbCr |
| 15 | Chroma subsampling and its information loss |
| 5 | Break |
| 25 | The 8×8 block DCT: definition, basis images, invertibility |
| 10 | Edges vs. flat blocks; in-class activity; Day 2 preview |
| **90** | **Total** |

## Content Notes

### 1. Recap and pipeline (15 min total)
Week 2: warps are bijective in the continuous model but their digital inverses are noisy, partly because of JPEG. Today we open JPEG's black box. Pipeline (baseline, assumed):

$$
\text{RGB} \to \text{YCbCr} \to \text{subsample chroma} \to \text{8×8 block DCT} \to \text{quantize} \to \text{entropy code}.
$$

Only two steps discard information: chroma subsampling and quantization. (Entropy coding is lossless.) Today: the first three steps; Day 2: quantization.

### 2. Color spaces (20 min)
A color pixel is a vector in $\mathbb{R}^3$ (the $k=3$ case). YCbCr (JFIF convention, 8-bit, assumed) is an invertible linear change of coordinates plus offset:

$$
\begin{aligned}
Y &= 0.299\,R + 0.587\,G + 0.114\,B,\\
C_b &= 128 - 0.168736\,R - 0.331264\,G + 0.5\,B,\\
C_r &= 128 + 0.5\,R - 0.418688\,G - 0.081312\,B.
\end{aligned}
$$

- $Y$ is luma (brightness); $C_b, C_r$ are chroma (blue/red differences).
- The $3\times 3$ matrix is invertible, so the conversion is a bijection in exact arithmetic (Week 1: $\det\neq 0$). With 8-bit rounding and clipping it is only approximately invertible (a small injectivity failure on integers).
- Motivation: human vision is more sensitive to luma detail than to chroma detail, so chroma can be coarsened. Photoshop link: Lab/YCbCr-style channel views and "Color" vs. "Luminosity" blend modes (assumed familiar).

### 3. Chroma subsampling (15 min)
In 4:2:0 each $2\times 2$ block of pixels keeps its four $Y$ values but shares one $C_b$ and one $C_r$ (e.g. by averaging).

- Data reduction: from 3 samples per pixel to $1+\tfrac14+\tfrac14=1.5$.
- It is a many-to-one map: different chroma patterns inside a $2\times 2$ block give the same stored value, so it is **not injective**; the lost detail cannot be recovered, only interpolated back (Week 1 interpolation kernels apply to the upsampling).
- Sharp colored edges (e.g. red text on a blue background) show color bleeding; luma edges remain sharp.

### 4. The 8×8 block DCT (25 min)
Split each channel into $8\times 8$ blocks, subtract 128 (level shift), and transform each block $g[x,y]$ ($0\le x,y\le 7$):

$$
G[u,v] = \tfrac14\, c(u)\,c(v) \sum_{x=0}^{7}\sum_{y=0}^{7} g[x,y]\,\cos\!\frac{(2x+1)u\pi}{16}\,\cos\!\frac{(2y+1)v\pi}{16},
$$

where $c(0)=1/\sqrt{2}$ and $c(w)=1$ for $w>0$.

- $G[0,0]$ is the DC coefficient (proportional to the block mean); other $G[u,v]$ are AC coefficients with increasing spatial frequency in $u$ (vertical or horizontal, depending on convention) and $v$.
- The 64 coefficients are coordinates of the block in a basis of 64 cosine "basis images". The transform is orthonormal, so it is a **bijection** from 64 values to 64 values: no information is lost by the DCT itself.
- Why do it? Natural, smooth blocks concentrate energy in a few low-frequency coefficients, so the others can be coarsely quantized cheaply.
- **Edges and text:** a block containing a jump has significant energy in many coefficients (the representation is not sparse). Coarse quantization of those coefficients then distorts the edge: ringing / Gibbs-like harmonic artifacts around it (Week 1 teaser). Blocks are processed independently, so artifacts also appear at block boundaries (blocking).
- The DCT is an even-symmetric cousin of the Fourier transform, which is why it behaves well on blocks (informal; Week 4 covers the Fourier transform).

### 5. Activity (part of the 10-min closing segment)
Show an $8\times 8$ block that is (a) flat, (b) a horizontal gradient, (c) a black-and-white vertical edge. Predict which coefficients are nonzero. Preview Day 2: what happens when $G[u,v]$ is rounded.

## Key Definitions Summary

- YCbCr: invertible linear color transform (+offset); chroma subsampling is a many-to-one map.
- Block DCT: orthonormal, hence bijective, on each $8\times 8$ block.
- Sparse representation for smooth content; non-sparse near sharp edges.

## Exercises

1. Compute $(Y,C_b,C_r)$ for pure red $(255,0,0)$ and for gray $(128,128,128)$. Verify that gray has $C_b=C_r=128$.
2. Show that the RGB→YCbCr matrix is invertible (compute or argue its determinant is nonzero). Why might the round trip on 8-bit data still not reproduce all RGB values exactly?
3. Give two different $2\times 2$ chroma blocks that produce the same 4:2:0 value. Hence argue non-injectivity.
4. For a constant block $g\equiv 10$ (after level shift), compute $G[0,0]$ and argue all other coefficients are $0$. (Use $\sum_x\cos\frac{(2x+1)u\pi}{16}=0$ for $u\ne 0$.)
5. A $8\times 8$ block is $-128$ on its left half columns and $+127$ on its right half. Which of $G[u,v]$ with $u=0$ or $v=0$ do you expect to be nonzero? (Qualitative.)
6. *(Discussion)* Why does 4:2:0 hurt red text on a blue background more than gray text on white?
7. *(Optional, Python)* Use `scipy.fft.dctn` (type II, `norm="ortho"`) on an $8\times 8$ block and verify `idctn` returns the original to numerical precision.
