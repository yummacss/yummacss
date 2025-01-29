import fs from "fs/promises";
import path from "path";

export async function apiFile() {
  const input = path.resolve("dist", "yumma.css");
  const output = path.resolve("dist", "yummacss.json");

  try {
    const cssData = await fs.readFile(input, "utf-8");
    const classData = [];
    const regex = /\.(?<className>[a-zA-Z0-9-]+)\s*{(?<properties>[^}]+)}/g;

    let match;
    while ((match = regex.exec(cssData)) !== null) {
      const { className, properties } = match.groups;
      const newProps = properties
        .trim()
        .split(";")
        .filter(Boolean)
        .map((prop) => prop.trim() + ";");

      const firstProp = newProps[0]?.split(":")[0].trim();
      const slug = firstProp?.replace(/[^a-z0-9-]+/gi, "-").toLowerCase();

      classData.push({
        slug: slug,
        util: className,
        prop: newProps,
      });
    }

    await fs.writeFile(output, JSON.stringify(classData, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to generate JSON:", error);
  }
}
