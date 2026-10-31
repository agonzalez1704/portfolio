// Run: pnpm commits
// Reads the deployed branch of each product repo and writes content/commits.json for the
// home page commit field. The repos live outside this project, so the JSON is committed.
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const products = [
  { slug: "calzado-blade", name: "Calzado Blade", repos: ["e-commerce"] },
  { slug: "auto-toon", name: "Auto-Toon", repos: ["toon-converter", "auto-toon-app"] },
  { slug: "fiable", name: "Fiable", repos: ["inventory-pos"] },
  { slug: "grupo-barro-y-cantera", name: "Barro y Cantera", repos: ["grupo-barro-y-cantera"] },
];

const git = (repo, ...args) =>
  execFileSync("git", ["-C", join(homedir(), "Sites", repo), ...args], { encoding: "utf8" }).trim();

function deployedBranch(repo) {
  try {
    return git(repo, "rev-parse", "--abbrev-ref", "origin/HEAD");
  } catch {
    return "origin/main";
  }
}

const out = products.map(({ repos, ...p }) => {
  // [unix seconds, written with an agent] for every commit, oldest first across the product's repos.
  const commits = repos.flatMap((repo) => {
    const branch = deployedBranch(repo);
    const ai = new Set(git(repo, "log", branch, "-i", "--grep=co-authored-by: claude", "--format=%H").split("\n"));
    return git(repo, "log", branch, "--format=%H %ct")
      .split("\n")
      .map((line) => {
        const [sha, time] = line.split(" ");
        return [Number(time), ai.has(sha)];
      });
  });
  commits.sort((a, b) => a[0] - b[0]);
  return {
    ...p,
    total: commits.length,
    ai: commits.filter((c) => c[1]).length,
    // One character per commit keeps the payload small: 1 = agent, 0 = by hand.
    seq: commits.map((c) => (c[1] ? "1" : "0")).join(""),
  };
});

writeFileSync(new URL("../content/commits.json", import.meta.url), JSON.stringify(out, null, 2) + "\n");
for (const p of out) console.log(`${p.name}: ${p.ai}/${p.total}`);
