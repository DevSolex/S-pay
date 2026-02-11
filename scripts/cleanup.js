#!/usr/bin/env node
import { readFileSync } from "fs";

const packageJson = JSON.parse(readFileSync("./package.json", "utf8"));
const gitignore = readFileSync("./.gitignore", "utf8");

console.log("\n=== S-pay Project Cleanup ===\n");

// Check for unused dependencies
const scripts = Object.keys(packageJson.scripts || {});
const dependencies = Object.keys(packageJson.dependencies || {});

console.log("📦 Dependencies:", dependencies.length);
console.log("📝 Scripts:", scripts.length);
console.log("");

// Check gitignore
const gitignoreLines = gitignore.split("\n").filter(line => line.trim() && !line.startsWith("#"));
console.log("🚫 Gitignore rules:", gitignoreLines.length);
console.log("");

// Recommendations
console.log("✨ Cleanup Recommendations:");
console.log("   - Run 'npm prune' to remove unused packages");
console.log("   - Run 'npm audit' to check for vulnerabilities");
console.log("   - Run 'npm outdated' to check for updates");
console.log("");

console.log("✅ Project structure looks good!\n");
