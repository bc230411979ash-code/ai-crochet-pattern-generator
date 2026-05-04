export function generateCrochetPattern(imageAnalysis) {
  const patterns = {
    intricate: generateIntricatePattern(),
    medium: generateMediumPattern(),
    simple: generateSimplePattern(),
  }

  const difficulty = imageAnalysis?.[0]?.score > 0.8 ? 'Advanced' : 'Intermediate'
  const patternType = difficulty === 'Advanced' ? 'intricate' : 'medium'

  return {
    patternText: patterns[patternType],
    difficulty,
    estimatedTime: difficulty === 'Advanced' ? '8-10 hours' : '4-6 hours',
    yarnWeight: 'Medium (4)',
    stitches: ['sc', 'dc', 'tr', 'ch'],
  }
}

function generateIntricatePattern() {
  return `ADVANCED CROCHET PATTERN

Materials:
- Yarn Weight: Medium (4)
- Hook Size: 5.5mm (I-9)
- Yarn Quantity: 300-400 yards

Abbreviations:
ch = chain, sc = single crochet, dc = double crochet, tr = treble

Pattern:

Ch 25
Row 1: Sc in 2nd ch from hook, sc in each ch across (24 sc)
Row 2: Ch 1, turn, sc in each st across
Row 3: Ch 2, turn, dc in each st across
Row 4: Ch 1, turn, sc in each st across

Repeat Rows 2-4 until desired length.
Fasten off and weave in ends.`
}

function generateMediumPattern() {
  return `INTERMEDIATE CROCHET PATTERN

Materials:
- Yarn Weight: Medium (4)
- Hook Size: 5.5mm (I-9)

Pattern:

Ch 20
Row 1: Sc in 2nd ch from hook, sc in each ch across (19 sc)
Row 2: Ch 1, turn, sc in each st across
Row 3: Ch 2, turn, dc in each st across

Repeat Rows 2-3 until desired length.
Fasten off.`
}

function generateSimplePattern() {
  return `BEGINNER CROCHET PATTERN

Materials:
- Yarn: Medium weight
- Hook: 5.5mm (I-9)

Pattern:

Ch 15
Row 1: Sc in 2nd ch from hook, sc across (14 sc)
Row 2: Ch 1, turn, sc in each st

Repeat Row 2 until done.
Fasten off.`
}