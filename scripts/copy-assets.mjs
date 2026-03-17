import { mkdir, readFile, writeFile } from "node:fs/promises";

await mkdir("dist", { recursive: true });

const manifest = JSON.parse(await readFile("manifest.json", "utf8"));
await writeFile("dist/manifest.json", JSON.stringify(manifest));
