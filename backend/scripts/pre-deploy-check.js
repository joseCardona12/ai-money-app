#!/usr/bin/env node

/**
 * Pre-deployment verification script
 * Run this before deploying to Render to catch common issues
 */

const fs = require("fs");
const path = require("path");

console.log("🔍 Running pre-deployment checks...\n");

let hasErrors = false;
let hasWarnings = false;

// Check 1: package.json exists and has required scripts
console.log("📦 Checking package.json...");
try {
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf8")
  );

  const requiredScripts = ["build", "start"];
  const missingScripts = requiredScripts.filter(
    (script) => !packageJson.scripts[script]
  );

  if (missingScripts.length > 0) {
    console.error(
      `   ❌ Missing required scripts: ${missingScripts.join(", ")}`
    );
    hasErrors = true;
  } else {
    console.log("   ✅ All required scripts present");
    console.log(`      - build: ${packageJson.scripts.build}`);
    console.log(`      - start: ${packageJson.scripts.start}`);
  }
} catch (error) {
  console.error("   ❌ Error reading package.json:", error.message);
  hasErrors = true;
}

// Check 2: TypeScript configuration
console.log("\n📝 Checking tsconfig.json...");
const tsconfigPath = path.join(__dirname, "..", "tsconfig.json");
if (fs.existsSync(tsconfigPath)) {
  console.log("   ✅ tsconfig.json exists");
  // Note: We skip parsing because tsconfig.json may contain comments
  // TypeScript compiler will validate it during build
} else {
  console.error("   ❌ tsconfig.json not found");
  hasErrors = true;
}

// Check 3: .env.example exists
console.log("\n📄 Checking .env.example...");
const envExamplePath = path.join(__dirname, "..", ".env.example");
if (fs.existsSync(envExamplePath)) {
  console.log("   ✅ .env.example exists");

  const envExample = fs.readFileSync(envExamplePath, "utf8");
  const requiredVars = [
    "DB_HOST",
    "DB_PORT",
    "DB_USER",
    "DB_PASSWORD",
    "DB_NAME",
    "JWT_SECRET",
    "PORT",
  ];

  const missingVars = requiredVars.filter(
    (varName) => !envExample.includes(varName)
  );
  if (missingVars.length > 0) {
    console.warn(
      `   ⚠️  Missing variables in .env.example: ${missingVars.join(", ")}`
    );
    hasWarnings = true;
  } else {
    console.log("   ✅ All required variables documented");
  }
} else {
  console.warn("   ⚠️  .env.example not found");
  hasWarnings = true;
}

// Check 4: .gitignore includes sensitive files
console.log("\n🔒 Checking .gitignore...");
const gitignorePath = path.join(__dirname, "..", ".gitignore");
if (fs.existsSync(gitignorePath)) {
  const gitignore = fs.readFileSync(gitignorePath, "utf8");

  const requiredIgnores = [".env", "node_modules", "dist"];
  const missingIgnores = requiredIgnores.filter(
    (item) => !gitignore.includes(item)
  );

  if (missingIgnores.length > 0) {
    console.error(`   ❌ Missing in .gitignore: ${missingIgnores.join(", ")}`);
    hasErrors = true;
  } else {
    console.log("   ✅ Sensitive files are ignored");
  }
} else {
  console.error("   ❌ .gitignore not found");
  hasErrors = true;
}

// Check 5: Source files exist
console.log("\n📂 Checking source files...");
const srcPath = path.join(__dirname, "..", "src");
const indexPath = path.join(srcPath, "index.ts");

if (!fs.existsSync(srcPath)) {
  console.error("   ❌ src/ directory not found");
  hasErrors = true;
} else if (!fs.existsSync(indexPath)) {
  console.error("   ❌ src/index.ts not found");
  hasErrors = true;
} else {
  console.log("   ✅ Source files present");
}

// Check 6: node_modules exists (dependencies installed)
console.log("\n📚 Checking dependencies...");
const nodeModulesPath = path.join(__dirname, "..", "node_modules");
if (!fs.existsSync(nodeModulesPath)) {
  console.warn("   ⚠️  node_modules not found - run npm install");
  hasWarnings = true;
} else {
  console.log("   ✅ Dependencies installed");
}

// Check 7: Verify no .env file is committed
console.log("\n🚫 Checking for committed .env file...");
const envPath = path.join(__dirname, "..", ".env");
if (fs.existsSync(envPath)) {
  console.warn("   ⚠️  .env file exists - make sure it's in .gitignore");
  console.warn("      Never commit .env files to Git!");
  hasWarnings = true;
} else {
  console.log("   ✅ No .env file in directory (good for deployment)");
}

// Check 8: Verify render.yaml exists
console.log("\n☁️  Checking Render configuration...");
const renderYamlPath = path.join(__dirname, "..", "render.yaml");
if (fs.existsSync(renderYamlPath)) {
  console.log("   ✅ render.yaml found");
} else {
  console.warn("   ⚠️  render.yaml not found (optional)");
  hasWarnings = true;
}

// Check 9: Try to compile TypeScript
console.log("\n🔨 Testing TypeScript compilation...");
const { execSync } = require("child_process");
try {
  execSync("npx tsc --noEmit", {
    cwd: path.join(__dirname, ".."),
    stdio: "pipe",
  });
  console.log("   ✅ TypeScript compiles without errors");
} catch (error) {
  console.error("   ❌ TypeScript compilation failed");
  console.error('      Run "npm run build" to see detailed errors');
  hasErrors = true;
}

// Summary
console.log("\n" + "=".repeat(50));
console.log("📊 Pre-deployment Check Summary");
console.log("=".repeat(50));

if (!hasErrors && !hasWarnings) {
  console.log("\n✅ All checks passed! Ready to deploy to Render.");
  console.log("\nNext steps:");
  console.log("1. Commit and push your changes to GitHub");
  console.log("2. Follow the RENDER_CHECKLIST.md");
  console.log("3. Configure environment variables in Render");
  console.log("4. Deploy! 🚀\n");
  process.exit(0);
} else {
  if (hasErrors) {
    console.log(
      "\n❌ Found critical errors that must be fixed before deploying."
    );
  }
  if (hasWarnings) {
    console.log("\n⚠️  Found warnings - review them before deploying.");
  }
  console.log("\nPlease fix the issues above and run this script again.\n");
  process.exit(hasErrors ? 1 : 0);
}
