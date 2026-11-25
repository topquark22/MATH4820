# Week 3 — Compression, DCT, and Quantization

*Companion exercises for [Day 1](../lectures/week03-day1.md) and [Day 2](../lectures/week03-day2.md). See [Workbook](README.md) for conventions.*

## Mathematical Exercises

1. For chroma subsampling by the mean of each $2\times2$ block, construct two distinct blocks with the same output. Determine the dimension of the kernel of the corresponding linear map on $\mathbb R^4$.
2. In an orthonormal $8\times8$ block DCT, a level-shifted block is constant with value $c=12$. Find the DC coefficient and all AC coefficients.
3. Use nearest-integer quantization with step $Q=10$ and ties rounded away from zero. Compute the stored integers and reconstructed coefficients for $(-16,-14,-5,0,4,5,14,16)$.
4. Suppose 16 DCT coefficients use quantization step 4 and the other 48 use step 10. Bound the squared reconstruction error of the block, assuming orthonormal transforms and no other losses. Bound the MSE per sample.
5. Prove that ideal scalar quantization followed by dequantization is idempotent when the same quantizer is applied again. Explain why this does not establish idempotence of repeated JPEG encoding and decoding.
6. Quantize each integer $x\in\{0,\ldots,19\}$ first with step 4 and then with step 6, using the same rounding convention as Exercise 3. Tabulate the final reconstructed values and their multiplicities. Compare with direct step-6 quantization.

## Computational Exercise

7. Create a synthetic grayscale image containing a smooth ramp and sharp edges. Compare single JPEG compression with two successive compressions at different quality settings. Estimate block-DCT coefficient histograms on decoded images, distinguishing these estimates from coefficients read directly from the bitstream. Repeat with a one-pixel crop between saves; document the encoder and block alignment.

## Discussion

8. Explain why compression traces may support an inference of recompression but not establish malicious manipulation. Identify two benign workflows that can produce such traces.
