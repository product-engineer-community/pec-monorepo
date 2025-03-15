import { execSync } from "child_process";

const component = process.argv[2];

if (!component) {
  console.error("❌ 컴포넌트 이름을 넣어주세요.");
  process.exit(1);
}

try {
  console.log(`📦 ${component} 컴포넌트 추가중...`);
  execSync(`pnpm dlx shadcn@canary add ${component}`, { stdio: "inherit" });

  console.log("\n🔄 exports 업데이트中...");
  execSync("pnpm update-exports", { stdio: "inherit" });

  console.log(`\n✅ ${component} 컴포넌트 추가 및 exports 업데이트 성공`);
} catch (error) {
  console.error("❌ 에러:", error);
  process.exit(1);
}
