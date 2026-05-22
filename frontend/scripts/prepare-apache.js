const fs = require("fs")
const path = require("path")

const outDir = path.join(__dirname, "../out")

// Rename _next to assets
const nextDir = path.join(outDir, "_next")
const assetsDir = path.join(outDir, "assets")
if (fs.existsSync(nextDir)) {
  fs.renameSync(nextDir, assetsDir)
  console.log("Renamed _next → assets")
}

// Replace /_next/ with /assets/ in all HTML files
function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      processDir(fullPath)
    } else if (entry.name.endsWith(".html") || entry.name.endsWith(".txt")) {
      let content = fs.readFileSync(fullPath, "utf8")
      if (content.includes("/_next/")) {
        content = content.replaceAll("/_next/", "/assets/")
        fs.writeFileSync(fullPath, content, "utf8")
        console.log("Updated:", fullPath.replace(outDir, ""))
      }
    }
  }
}

processDir(outDir)
console.log("Done — ready to zip and upload")
