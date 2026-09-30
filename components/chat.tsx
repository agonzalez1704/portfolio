"use client";

import { useChat } from "@ai-sdk/react";
import Link from "next/link";
import { createContext, use, useEffect, useRef, useState, type ReactNode } from "react";
import { profile } from "@/content/profile";
import { CHAT_MAX_CHARS, CHAT_MAX_MESSAGES } from "@/lib/schemas";
import { ArrowUp, ArrowUpRight, Close } from "./icons";

export const suggestions = [
  "How does he test code written by agents?",
  "Has he designed row-level security?",
  "Which project is closest to this role?",
];

type ChatApi = { ask: (question?: string) => void };
const ChatContext = createContext<ChatApi | null>(null);

function useAsk() {
  const ctx = use(ChatContext);
  if (!ctx) throw new Error("useAsk must be used inside <ChatProvider>");
  return ctx.ask;
}

// Lives in the root layout so the conversation survives navigation between pages.
export function ChatProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  // A fixed id keeps useChat from calling Math.random() during prerender.
  const chat = useChat({ id: "portfolio-chat" });
  const full = chat.messages.length >= CHAT_MAX_MESSAGES - 1;
  const busy = chat.status === "submitted" || chat.status === "streaming";

  function send(text: string) {
    const q = text.trim().slice(0, CHAT_MAX_CHARS);
    if (!q || busy || full) return;
    chat.sendMessage({ text: q });
  }

  const ask = (question?: string) => {
    setOpen(true);
    if (question) send(question);
  };

  return (
    <ChatContext value={{ ask }}>
      {children}
      {open && <ChatPanel chat={chat} busy={busy} full={full} send={send} onClose={() => setOpen(false)} />}
    </ChatContext>
  );
}

function ChatPanel({
  chat,
  busy,
  full,
  send,
  onClose,
}: {
  chat: ReturnType<typeof useChat>;
  busy: boolean;
  full: boolean;
  send: (text: string) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [chat.messages]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <section
      role="dialog"
      aria-label="Ask about Antonio"
      className="fixed inset-0 z-50 flex flex-col bg-white sm:inset-auto sm:right-6 sm:bottom-6 sm:h-[min(680px,calc(100dvh-48px))] sm:w-[440px] sm:rounded-3xl sm:border sm:border-line sm:shadow-[0_24px_64px_rgb(34_34_34/0.16)]"
    >
      <div className="flex items-start justify-between pt-5 pr-3 pb-4 pl-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl tracking-tight">Ask about Antonio</h2>
          <p className="text-[13px] text-muted">Answers come from his CV and project notes.</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="flex size-11 items-center justify-center rounded-full bg-paper hover:bg-well"
        >
          <Close className="size-4" />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-6 pt-2 pb-5" aria-live="polite">
        {chat.messages.length === 0 && (
          <p className="text-[15px] leading-6 text-body">
            Ask about his projects, how he works with AI agents, or his experience.
          </p>
        )}
        {chat.messages.map((m) => {
          const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
          if (!text) return null;
          return m.role === "user" ? (
            <p
              key={m.id}
              className="max-w-[300px] self-end rounded-[18px] rounded-br-[4px] bg-accent px-4 py-3 text-[15px] leading-[23px] text-white"
            >
              {text}
            </p>
          ) : (
            <p
              key={m.id}
              className="max-w-[360px] self-start rounded-[18px] rounded-bl-[4px] bg-[#f4f4f4] px-4 py-3.5 text-[15px] leading-6 whitespace-pre-wrap"
            >
              {text}
            </p>
          );
        })}
        {chat.status === "submitted" && (
          <p className="self-start rounded-[18px] bg-[#f4f4f4] px-4 py-3 text-[15px] text-muted">Thinking…</p>
        )}
        {chat.error && (
          <p role="alert" className="text-sm text-[#b42318]">
            Something went wrong. Email{" "}
            <a className="underline" href={`mailto:${profile.contact.email}`}>
              {profile.contact.email}
            </a>{" "}
            instead.
          </p>
        )}
        {full && (
          <p className="text-sm text-muted">
            That is the limit for one chat.{" "}
            <Link href="/#contact" onClick={onClose} className="underline">
              Send Antonio a message
            </Link>{" "}
            to keep going.
          </p>
        )}
        <div ref={endRef} />
      </div>

      {chat.messages.length === 0 && (
        <div className="flex flex-wrap gap-2 px-6 pb-3">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="h-9 rounded-full border border-accent-tint bg-accent-soft px-3.5 text-[13px] text-accent-strong hover:border-accent"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        className="flex items-center gap-2 px-4 pt-3 pb-4"
        onSubmit={(e) => {
          e.preventDefault();
          send(draft);
          setDraft("");
        }}
      >
        <label htmlFor="chat-q" className="sr-only">
          Your question
        </label>
        <input
          id="chat-q"
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          maxLength={CHAT_MAX_CHARS}
          disabled={full}
          placeholder="Ask a question"
          autoComplete="off"
          className="h-[52px] min-w-0 flex-1 rounded-full border border-rule bg-paper px-5 text-base placeholder:text-muted focus:border-ink focus:outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          aria-label="Send question"
          disabled={busy || full || !draft.trim()}
          className="flex size-[52px] shrink-0 items-center justify-center rounded-full bg-accent text-white hover:bg-accent-strong active:scale-95 disabled:opacity-40"
        >
          <ArrowUp className="size-4.5" />
        </button>
      </form>
    </section>
  );
}

export function AskLink({ className, children }: { className?: string; children: ReactNode }) {
  const ask = useAsk();
  return (
    <button type="button" onClick={() => ask()} className={className}>
      {children}
      <ArrowUpRight />
    </button>
  );
}

export function AskBanner() {
  const ask = useAsk();
  const [q, setQ] = useState("");
  return (
    <form
      className="flex min-w-0 flex-1 flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        ask(q);
        setQ("");
      }}
    >
      <label htmlFor="ask" className="text-sm text-white/85">
        Your question
      </label>
      <div className="flex gap-2">
        <input
          id="ask"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          maxLength={CHAT_MAX_CHARS}
          placeholder={suggestions[2]}
          autoComplete="off"
          className="h-14 min-w-0 flex-1 rounded-full border border-white/30 bg-white/15 px-6 text-base text-white placeholder:text-white/75 focus:border-white focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Send question"
          className="flex size-14 shrink-0 items-center justify-center rounded-full bg-white text-accent-strong active:scale-95"
        >
          <ArrowUp className="size-4.5" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.slice(0, 2).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => ask(s)}
            className="h-9 rounded-full border border-white/40 px-4 text-[13px] text-white hover:bg-white/10"
          >
            {s}
          </button>
        ))}
      </div>
    </form>
  );
}
