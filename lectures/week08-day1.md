# Week 8, Day 1 — Digital Evidence Preservation and Cryptographic Integrity

*90-minute lecture. Source: Week 8 of syllabus/weekly-schedule.md ("Forensic Integrity and Chain of Custody"). Begins Part III: Digital Forensics and Evidentiary Admissibility.*

> **Scope:** This lecture concerns the integrity of acquired bytes and their provenance, not the truth of the scene depicted or the reliability of a reconstruction. Use only instructor-generated synthetic evidence for demonstrations. Real acquisitions require appropriate authorization, trained personnel, validated tools, and applicable institutional procedures.

## Learning Objectives

By the end of this lecture students can:

1. Distinguish physical, logical, and live acquisition and explain the purpose and limitations of write-blocking.
2. Distinguish a forensic storage image, an encoded picture file, and a decoded pixel array.
3. Explain preimage, second-preimage, and collision resistance, and derive the birthday bound.
4. Compute and verify SHA-256 digests of byte streams and explain what a matching digest establishes.
5. Document acquisition, preservation, and transfers of custody without confusing integrity with authenticity or admissibility.

## Timed Outline (90 min)

| Min | Segment |
|-----|---------|
| 10 | Introduction to digital forensic evidence |
| 15 | Physical and logical acquisition; bit-stream imaging |
| 10 | Write-blocking and preservation of original media |
| 25 | Cryptographic hashing and SHA-256 |
| 5 | Break |
| 15 | Chain of custody and provenance |
| 10 | Practical evidence-verification demonstration |
| **90** | **Total** |

## Content Notes

### 1. Introduction to digital forensic evidence (10 min)

Return to the Week 7 reconstruction challenge. Suppose an examiner receives a blurred JPEG and produces a legible-looking reconstruction. Before asking whether the reconstructed characters are correct, ask which bytes were received, where they came from, whether they have changed, and whether another examiner can access the same input.

Separate the following questions:

- Integrity: does the object agree with its recorded state?
- Provenance: what is known about the source, acquisition, and history of the object?
- Authenticity: is the object what it is claimed to be?
- Scientific validity: does the method support the inference drawn from the object?

For example, an already manipulated JPEG can be acquired faithfully and preserved without any subsequent change. A successful hash comparison does not establish that its depicted event occurred. Conversely, an enhanced derivative may legitimately have a different digest from its source. It must be identified and linked to that source, not represented as an unchanged original.

### 2. Physical and logical acquisition; bit-stream imaging (15 min)

Distinguish three meanings of "image":

- A forensic storage image represents acquired device data, typically as a raw byte stream or in a forensic container.
- An encoded picture file (JPEG, PNG, etc.) consists of bytes, including format structures and potentially metadata.
- A decoded raster is an array of sample values obtained by interpreting those bytes.

Let $B$ denote the encoded byte stream and $D$ a specified decoder. The raster is

$$
I=D(B).
$$

Different byte streams can yield the same raster: for example, two PNG files may encode identical pixels but contain different metadata. Thus $D$ need not be injective. This connects directly to the operator classification in Week 1.

A hash of the decoded raster is not a substitute for a hash of the encoded file. If raster hashing is useful for a separate analysis, specify dimensions, channel order, data type, byte order, and serialization.

Acquisition methods:

| Method | Scope and limitations |
|--------|-----------------------|
| Physical | Attempts to capture the accessible device-level bit stream, including areas not represented by ordinary files. |
| Logical | Collects selected filesystem objects or structured records through an interface. May omit unallocated space and other artifacts. |
| Live | Collects data from a running system; may capture otherwise unavailable volatile or decrypted data, but the system may change during acquisition. |

The physical acquisition of a storage device is not necessarily a copy of every physical flash cell: controller behavior, inaccessible regions, encryption, read errors, and device-specific limitations matter. Record the actual scope and any omissions.

A forensic container can store compressed data, acquisition metadata, and integrity records. Its file bytes need not equal the acquired raw stream. Compare digests only over explicitly identified, equivalent byte domains. A digest of the container is useful for preserving that container, but is a different measurement from a digest of the reconstructed acquisition stream.

Discuss the case of a picture received from a messaging platform: the received attachment may be the earliest available evidence, not the camera-original file. Record that distinction rather than claiming unavailable provenance.

### 3. Write-blocking and preservation of original media (10 min)

The objective is to minimize unintended changes during collection. Ordinary access to a filesystem can trigger writes through mounting, journaling, indexing, or other system activity.

- Hardware and software write-blocking aim to prevent write operations through the relevant acquisition interface. Their suitability must be established for that interface and configuration.
- A read-only file permission is not equivalent to a validated device-level write-blocker.
- Write-blocking does not guarantee that all device-internal state remains unchanged or that every source byte is readable.
- For live acquisitions, document necessary interactions and their effects rather than claiming an immutable source.

Explain the workflow: identify and document the source; acquire within the authorized scope; record acquisition details and errors; verify the acquired stream; preserve the acquisition in controlled storage; create and verify a working copy for examination.

If the source is changing or inaccessible, a separate later source hash may not represent the same snapshot. Verification of the captured stream cannot prove completeness of an acquisition with unreadable or omitted regions.

Use a classroom simulation with an ordinary synthetic file, not a real disk or device. The demonstration does not implement or validate a write-blocker.

~~~mermaid
flowchart TD
A[Source evidence] --> B[Controlled acquisition within authorized scope]
 B --> C[Preserved acquisition]
 B --> D[Protected reference SHA-256 digest]
 C --> E[Create working copy]
 E --> F[Compute working-copy digest]
 D --> G{Digests match for same byte domain?}
 F --> G
 G -->|Yes| H[Integrity check passed]
 G -->|No| I[Stop and investigate discrepancy]
~~~

*Figure 1. Evidence acquisition and verification. A successful comparison supports byte integrity, not authenticity, completeness or authorization.*

### 4. Cryptographic hashing and SHA-256 (25 min)

**Definition and non-injectivity (5 min).** In an idealized treatment, write an $n$-bit hash function as

$$
h:\{0,1\}^{*}\longrightarrow\{0,1\}^{n}.
$$

For SHA-256, $n=256$. Strictly, FIPS 180-4 specifies SHA-256 for messages shorter than $2^{64}$ bits; the arbitrary-length notation abstracts away that bound. Even restricting the input to 257-bit strings, the pigeonhole principle proves that collisions exist. A digest is not a unique mathematical identifier and cannot encode enough information to reconstruct an arbitrary original file.

SHA-256 processes padded messages in 512-bit blocks with 32-bit word operations and returns a 256-bit (32-byte, or 64 hexadecimal character) digest. Its incremental computation allows large files to be hashed in chunks without loading them entirely into memory. It is deterministic, public, and unkeyed; it is not encryption.

**Security properties (5 min).** Distinguish three computational search problems:

- Preimage: given a target $y$, find $x$ satisfying $h(x)=y$.
- Second preimage: given a fixed $x$, find $x'\ne x$ satisfying $h(x')=h(x)$.
- Collision: find any distinct $x,x'$ satisfying $h(x)=h(x')$.

Resistance means that finding the requested inputs is computationally difficult, not that they do not exist. In an ideal random-function model, for a fixed target digest the probability of success in $q$ distinct independent trials is

$$
P_{\mathrm{hit}}=1-(1-2^{-n})^q.
$$

For $q\ll 2^n$, this is approximately $q/2^n$. The expected number of trials is $2^n$. The same generic estimate applies to a second-preimage search against a fixed original under this idealization.

These are model-based estimates, not proofs of SHA-256's concrete security. In particular, NIST's second-preimage strength estimate for SHA-256 accounts for the target message length; the idealized $2^{256}$ estimate must not be asserted as a universal guarantee for arbitrarily long messages. See the NIST Hash Functions reference below.

**Birthday bound (10 min).** Set $N=2^n$. Under the model of independent uniformly distributed digests of distinct messages, the probability of no collision after $q$ trials, for $q\le N$, is

$$
P_0(q)=\prod_{j=0}^{q-1}\left(1-\frac{j}{N}\right).
$$

After $j$ distinct digest values have occurred, the next must avoid those $j$ values. Taking natural logarithms gives

$$
\log P_0(q)=\sum_{j=0}^{q-1}\log\left(1-\frac{j}{N}\right).
$$

Using $\log(1-u)=-u+O(u^2)$ for small $u$,

$$
\log P_0(q)=-\frac{q(q-1)}{2N}+O\left(\frac{q^3}{N^2}\right).
$$

For $q$ on the order of $\sqrt{N}$ and large $N$, the error term is small. Hence

$$
P_{\mathrm{coll}}(q)\approx 1-\exp\left(-\frac{q(q-1)}{2N}\right).
$$

Setting this probability to $1/2$ gives the approximate median collision threshold

$$
q_{1/2}\approx\sqrt{2N\log 2}.
$$

Thus generic collision search has a square-root scale, $O(2^{n/2})$. For a 256-bit ideal hash, the threshold is approximately $1.1774\times 2^{128}$ trials. For a 16-bit ideal hash, it is approximately 301 trials. The smaller example is suitable for a tutorial experiment with truncated digests; it is not a collision in full SHA-256.

Explain why comparing a new copy with an already fixed evidence digest is different from allowing an adversary to select both members of a colliding pair. The relevant threat model determines which security property matters.

**Forensic interpretation (5 min).** A digest mismatch means that the compared byte strings cannot be identical, assuming correct computation. A match is strong computational evidence of byte equality when the reference digest is trustworthy and the byte domains are equivalent; it is not a logical proof of equality.

A matching digest cannot establish:

- Whether the source file was manipulated before acquisition.
- Whether a timestamp or other metadata is accurate.
- Whether all relevant source material was acquired.
- Who created the file, or whether a reconstructed feature is real.

A plain hash also does not authenticate its own record. Someone able to replace both an evidence file and its stored digest could defeat a naive verification procedure without finding a collision. Protect reference manifests with appropriate access controls, independently retained records, and authenticated or signed records where appropriate. A signature authenticates the signed record relative to a trusted key; it does not make the underlying assertions true.

### 5. Chain of custody and provenance (15 min)

A chain of custody is a documented account of possession and transfers of an evidence item. It is related to, but distinct from, the technical audit trail of computational operations (Day 2).

Record at acquisition: case/item identifier, description and source, acquisition scope, collector, timestamp with time zone, tools and versions, destination, digest algorithm and byte domain, verification results, errors, and deviations. Preserve related acquisition logs. At transfers record the item, releasing and receiving parties, time, purpose, and relevant storage or seal information.

Illustrative classroom custody entries (all identifiers and times are fictional):

| Item | Time (UTC) | From | To | Event |
|------|------------|------|----|-------|
| E-001 | 09:00 | Collection station | Examiner A | Synthetic file received; acquisition record opened |
| E-001 | 09:15 | Examiner A | Evidence store | Verified acquisition deposited |
| E-001-W1 | 09:30 | Evidence store | Examiner B | Verified working copy issued |

Each entry refers to a separately retained record with the relevant identities, date, purpose, and verification details. A derived item receives a distinct identifier and a link to its source; a custody transfer does not itself authorize arbitrary processing.

Discuss a missing transfer entry: a matching digest may support continuity of the byte content, but cannot reconstruct who held the item or establish the missing circumstances. Document the gap rather than silently filling it in. Legal consequences depend on the jurisdiction and facts; Week 9 addresses admissibility.

Class discussion: an investigator receives two byte-identical JPEGs through different channels. Do their identical hashes establish identical provenance? No: the byte content may be identical while the acquisition histories differ.

### 6. Practical evidence-verification demonstration (10 min)

Use Python's standard library to create a small synthetic grayscale PGM image in a new temporary directory, copy it, verify it, and alter one pixel byte in a separate test copy. This is a simulation of file-level preservation, not a physical acquisition or production custody system.

~~~python
from hashlib import sha256
from pathlib import Path
from shutil import copyfile
from tempfile import TemporaryDirectory


def digest(path):
    h = sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


with TemporaryDirectory() as directory:
    root = Path(directory)
    source = root / "source.pgm"
    working = root / "working.pgm"
    altered = root / "altered.pgm"

    source.write_bytes(b"P5\n2 2\n255\n" + bytes([0, 64, 128, 255]))
    reference = digest(source)

    copyfile(source, working)
    assert digest(working) == reference

    copyfile(working, altered)
    data = bytearray(altered.read_bytes())
    data[-1] ^= 1
    altered.write_bytes(data)

    print("Reference:", reference)
    print("Working copy matches:", digest(working) == reference)
    print("Altered copy matches:", digest(altered) == reference)
    assert digest(altered) != reference
    assert digest(source) == reference
~~~

Expected results: the working copy matches; the altered copy does not; the source remains unchanged. The temporary files contain no real evidence or credentials and are removed when the demonstration exits. In actual casework, preserve the evidence and records under applicable retention procedures.

Ask students why reading in binary mode matters, why the reference digest must be retained separately from the test copy, and why hashing the modified image again does not restore its status as an original.

## Instructor Preparation

- Prepare the synthetic demonstration and confirm execution in the course Python environment.
- Prepare a second example of two picture files with identical decoded pixels but different encoded metadata, to illustrate the hash domain distinction.
- Review the applicable acquisition guidance and emphasize that classroom procedures are not operational certification or legal advice.
- Prepare a simple custody-record example with separate evidence, working-copy, and derivative identifiers.

## Tutorial and Lab Connection

- Derive the birthday bound independently and compare the exact and approximate collision probabilities for a small digest space.
- Experiment with truncated SHA-256 outputs on synthetic distinct messages; distinguish a truncated collision from a full-hash collision.
- Identify which byte domain is verified in a raw acquisition, an encoded file, and a decoded raster.
- Begin preparation for Lab 5 (Part A): verified working copies and protected reference digests. Day 2 adds the reproducible enhancement pipeline and machine-readable audit manifest.

## References

- NIST, [FIPS 180-4: Secure Hash Standard](https://csrc.nist.gov/pubs/fips/180-4/upd1/final), August 2015.
- NIST, [Hash Functions](https://csrc.nist.gov/projects/hash-functions), including security-strength estimates and the message-length qualification for second-preimage resistance.
- SWGDE, [Best Practices for Computer Forensic Acquisition](https://www.swgde.org/documents/published-complete-listing/17-f-002-2-1/), 17-F-002-2.1, August 5, 2025.
- SWGDE, [Best Practices for Digital Evidence Collection](https://www.swgde.org/documents/published-complete-listing/18-f-002-2-0/), 18-F-002-2.0, June 30, 2025.

Check for revised versions before teaching. The legal and scientific validation requirements are developed separately in Week 9.
