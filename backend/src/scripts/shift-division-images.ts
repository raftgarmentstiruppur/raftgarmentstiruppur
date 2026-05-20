import { db } from "../lib/db"

async function main() {
  // Current state (wrong):
  //   division-01-image-X → Knitting     ✓ correct
  //   division-02-image-X → Fabric Insp  ✗ should be empty
  //   division-03-image-X → Cutting      ✗ was uploaded as slot 02
  //   division-04-image-X → Elastic Weave✗ was uploaded as slot 03
  //   division-05-image-X → Sewing       ✗ was uploaded as slot 04
  //   division-06-image-X → Finishing    ✗ was uploaded as slot 05
  //
  // Target state:
  //   division-01-image-X → Knitting     (unchanged)
  //   division-02-image-X → empty        (Fabric Inspection — no photos)
  //   division-03-image-X → gets what was in 02
  //   division-04-image-X → gets what was in 03
  //   division-05-image-X → gets what was in 04
  //   division-06-image-X → gets what was in 05

  const allContent = await db.siteContent.findMany()
  const contentMap: Record<string, string> = {}
  for (const row of allContent) contentMap[row.key] = row.value

  const shifts: Array<{ from: string; to: string }> = []

  // Build shift list: 02→03, 03→04, 04→05, 05→06 (up to 5 image slots each)
  for (const [fromDiv, toDiv] of [["02","03"],["03","04"],["04","05"],["05","06"]]) {
    for (let i = 1; i <= 5; i++) {
      const fromKey = `division-${fromDiv}-image-${i}`
      const toKey   = `division-${toDiv}-image-${i}`
      if (contentMap[fromKey]) {
        shifts.push({ from: fromKey, to: toKey })
      }
    }
  }

  if (shifts.length === 0) {
    console.log("Nothing to shift — all division-02 image slots are already empty.")
    return
  }

  console.log(`Shifting ${shifts.length} image keys...`)
  for (const { from, to } of shifts) {
    const value = contentMap[from]
    // Write to destination
    await db.siteContent.upsert({
      where:  { key: to },
      update: { value },
      create: { key: to, value },
    })
    // Clear source
    await db.siteContent.upsert({
      where:  { key: from },
      update: { value: " " },
      create: { key: from, value: " " },
    })
    console.log(`  ${from} → ${to}`)
  }

  console.log("Done. Division 02 (Fabric Inspection) image slots cleared.")
}

main().catch(console.error).finally(() => db.$disconnect())
