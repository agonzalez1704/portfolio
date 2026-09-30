"use client";

import { useActionState } from "react";
import { sendContact } from "@/app/actions/contact";

const field =
  "rounded-xl border border-rule bg-paper px-4 text-base text-ink focus:border-accent focus:outline-none";

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, null);

  if (state?.ok) {
    return (
      <div role="status" className="w-full max-w-[720px] rounded-3xl bg-white p-8 text-center md:p-10">
        <p className="text-xl tracking-tight">Thanks. Your message is on its way.</p>
      </div>
    );
  }

  return (
    <form action={action} className="flex w-full max-w-[720px] flex-col gap-5 rounded-3xl bg-white p-6 md:p-10">
      {/* Honeypot, hidden from people and screen readers. */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="c-name" className="text-[13px] font-medium">Name</label>
          <input id="c-name" name="name" required autoComplete="name" maxLength={80} className={`h-12 ${field}`} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="c-email" className="text-[13px] font-medium">Email</label>
          <input id="c-email" name="email" type="email" required autoComplete="email" maxLength={200} className={`h-12 ${field}`} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="c-msg" className="text-[13px] font-medium">Message</label>
        <textarea id="c-msg" name="message" required rows={4} maxLength={4000} className={`h-[132px] resize-none py-3 leading-6 ${field}`} />
      </div>
      {state?.error && (
        <p role="alert" className="text-sm text-[#b42318]">{state.error}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="h-[52px] self-start rounded-full bg-accent px-7 text-[15px] font-medium text-white hover:bg-accent-strong active:scale-[0.98] disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
