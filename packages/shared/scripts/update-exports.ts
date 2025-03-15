import fs from "fs";
import path from "path";

const UI_COMPONENTS_DIR = path.join(__dirname, "../src/components/ui");
const INDEX_FILE = path.join(__dirname, "../src/index.ts");

// 기존 export 문을 보존할 상수
const PRESERVED_EXPORTS = [
  'export * from "./types";',
  'export * from "./utils";',
];

function updateExports() {
  try {
    const files = fs
      .readdirSync(UI_COMPONENTS_DIR)
      .filter((file) => file.endsWith(".tsx"))
      .map((file) => file.replace(".tsx", ""));

    const componentExports = files
      .map((component) => `export * from "./components/ui/${component}";`)
      .sort();

    const content = [...PRESERVED_EXPORTS, ...componentExports, ""].join("\n");

    fs.writeFileSync(INDEX_FILE, content);
    console.log("✅ exports 업데이트 성공");
  } catch (error) {
    console.error("❌ 에러:", error);
  }
}

updateExports();
