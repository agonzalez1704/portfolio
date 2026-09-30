// Run: pnpm check
import assert from "node:assert/strict";
import { roleChecks, toolbox } from "../content/profile.ts";
import { projects } from "../content/projects.ts";
import { buildChatPrompt } from "./chat-prompt.ts";
import { chatSchema, contactSchema } from "./schemas.ts";
import { fallbackIcon, iconFor } from "./tech-icons.ts";

const prompt = buildChatPrompt();
for (const p of projects) {
  assert.ok(prompt.includes(p.name), `prompt is missing ${p.name}`);
  assert.ok(p.techStack.length && p.features.length === 2, `${p.slug} needs stack and two feature groups`);
  assert.ok(p.release.length, `${p.slug} needs release checks`);
  if (p.spotlight) assert.ok(prompt.includes(p.spotlight.title), `prompt is missing ${p.slug} spotlight`);
  assert.ok(p.images.sections.length >= 4, `${p.slug} needs section shots for the mosaic`);
  for (const n of p.security) assert.ok(prompt.includes(n.title), `prompt is missing ${p.slug} security`);
  for (const t of p.techStack) assert.ok(prompt.includes(t.items[0]), `prompt is missing ${p.slug} ${t.layer}`);
}
assert.ok(!prompt.includes("null"), "prompt leaks a null placeholder");
// Unreleased work must never read as production in the chat.
for (const p of projects) {
  for (const n of [...(p.spotlight?.notes ?? []), ...p.decisions, ...p.security, ...p.agents.notes].filter((n) => n.next)) {
    assert.ok(prompt.includes(`${n.title} (in an unreleased rewrite`), `${p.slug}: "${n.title}" is not marked as unreleased`);
  }
}
assert.ok(!/\[[A-Z ]+:/.test(prompt), "prompt leaks a bracket placeholder");
assert.equal(new Set(projects.map((p) => p.slug)).size, projects.length, "duplicate slug");
assert.ok(roleChecks.some((c) => c.evidence), "no role evidence");

const ok = { name: "Ana Ruiz", email: "ana@example.com", message: "We would like to talk." };
assert.ok(contactSchema.safeParse(ok).success);
assert.ok(!contactSchema.safeParse({ ...ok, email: "nope" }).success);
assert.ok(!contactSchema.safeParse({ ...ok, name: "Ana\r\nBcc: x@example.com" }).success);
assert.ok(!contactSchema.safeParse({ ...ok, message: "hi" }).success);

const turn = (text: string, role = "user") => ({ role, parts: [{ type: "text", text }] });
assert.ok(chatSchema.safeParse({ messages: [turn("What is his stack?")] }).success);
assert.ok(!chatSchema.safeParse({ messages: [] }).success);
assert.ok(!chatSchema.safeParse({ messages: [turn("x".repeat(1001))] }).success);
assert.ok(!chatSchema.safeParse({ messages: [turn("hi", "system")] }).success);
assert.ok(!chatSchema.safeParse({ messages: Array(13).fill(turn("hi")) }).success);
assert.ok(
  !chatSchema.safeParse({ messages: [{ role: "user", parts: [{ type: "file", url: "x" }] }] })
    .success,
  "a file-only turn leaves nothing to answer",
);
// Assistant turns from useChat carry step-start parts and may be long.
const withSteps = chatSchema.safeParse({
  messages: [
    turn("Stack?"),
    { role: "assistant", parts: [{ type: "step-start" }, { type: "text", text: "y".repeat(3000) }] },
    turn("And tests?"),
  ],
});
assert.ok(withSteps.success);
assert.deepEqual(withSteps.data.messages[1].parts, [{ type: "text", text: "y".repeat(3000) }]);
assert.ok(!chatSchema.safeParse({ messages: [turn("hi"), turn("hello", "assistant")] }).success);
for (const p of projects) {
  assert.ok(p.images.card.src.startsWith(`/projects/${p.slug}/`), `${p.slug} card path`);
}

// Every stack chip must resolve to a real icon, not the fallback.
const chips = [
  ...projects.flatMap((p) => p.techStack.flatMap((t) => t.items)),
  ...projects.flatMap((p) => [...p.decisions, ...(p.spotlight?.notes ?? [])].flatMap((n) => n.tech ?? [])),
  ...projects.flatMap((p) => p.integrations.map((i) => i.name)),
  ...toolbox.flatMap((t) => t.items),
];
const unmapped = chips.filter((c) => iconFor(c) === fallbackIcon);
assert.deepEqual(unmapped, [], `stack items without an icon: ${unmapped.join(", ")}`);

console.log("site checks passed");
