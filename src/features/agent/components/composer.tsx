"use client";

import { useState, type KeyboardEvent } from "react";
import { useAgent } from "../hooks/use-agent";

export function Composer() {
  const [value, setValue] = useState("");
  const { run, state } = useAgent();

  function submit() {
    const text = value.trim();
    if (!text || state.status === "running") return;
    void run(text);
    setValue("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  }

  return (
    <div className="border-t bg-white p-4">
      <div className="mx-auto flex max-w-4xl gap-3 rounded-2xl border bg-white p-3 shadow-sm">
        <button type="button" aria-label="Add attachment" className="rounded-xl px-3 text-xl text-zinc-500 hover:bg-zinc-100">+</button>
        <textarea value={value} onChange={(event) => setValue(event.target.value)} onKeyDown={handleKeyDown} placeholder="Ask Agent Honey..." rows={1} className="max-h-40 flex-1 resize-none border-none bg-transparent p-2 outline-none" />
        <button type="button" onClick={submit} disabled={state.status === "running" || !value.trim()} className="rounded-xl bg-zinc-900 px-5 py-2 text-sm font-medium text-white disabled:opacity-40">{state.status === "running" ? "Running" : "Send"}</button>
      </div>
    </div>
  );
}
