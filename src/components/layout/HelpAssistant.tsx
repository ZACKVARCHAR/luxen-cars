"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { SITE, whatsappLink } from "@/lib/site";
import { AnimatePresence, motion } from "framer-motion";
import { Headset, MessageCircle, Send, X } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";

type Msg = { role: "bot" | "user"; text: string };

export function HelpAssistant() {
  const { t, locale } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);

  const suggestions = useMemo(
    () => [
      { q: t.assistant.s1, a: t.assistant.a1 },
      { q: t.assistant.s2, a: t.assistant.a2 },
      { q: t.assistant.s3, a: t.assistant.a3 },
      { q: t.assistant.s4, a: t.assistant.a4 },
    ],
    [t],
  );

  useEffect(() => {
    setMessages((prev) =>
      prev.length === 0 ? prev : [{ role: "bot", text: t.assistant.welcome }],
    );
  }, [locale, t.assistant.welcome]);

  function pushBot(text: string) {
    setMessages((m) => [...m, { role: "bot", text }]);
  }

  function ask(question: string, answer?: string) {
    setMessages((m) => [...m, { role: "user", text: question }]);
    const found =
      answer ||
      suggestions.find((s) => question.toLowerCase().includes(s.q.toLowerCase().slice(0, 8)))?.a ||
      `${t.assistant.a3} WhatsApp: ${SITE.phoneDisplay}`;
    setTimeout(() => pushBot(found), 280);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    setInput("");
    ask(q);
  }

  function openChat() {
    setOpen(true);
    if (messages.length === 0) {
      setMessages([{ role: "bot", text: t.assistant.welcome }]);
    }
  }

  return (
    <div className="fixed bottom-4 end-3 z-[70] flex flex-col items-end gap-3 sm:bottom-5 sm:end-5">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            className="flex h-[min(72vh,520px)] w-[min(calc(100vw-1.5rem),380px)] flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_24px_70px_rgba(0,0,0,0.28)]"
          >
            <div className="flex items-start justify-between gap-3 bg-[#e10600] px-4 py-3 text-white">
              <div>
                <div className="flex items-center gap-2 text-sm font-bold">
                  <Headset className="h-4 w-4" />
                  {t.assistant.title}
                </div>
                <p className="mt-1 text-xs text-white/85">{t.assistant.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full bg-white/15 p-1.5 hover:bg-white/25"
                aria-label={t.common.close}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto bg-[#f7f8fa] p-3">
              {messages.map((m, i) => (
                <div
                  key={`${i}-${m.text.slice(0, 12)}`}
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    m.role === "bot"
                      ? "bg-white text-[#222] shadow-sm"
                      : "ms-auto bg-[#e10600] text-white"
                  }`}
                >
                  {m.text}
                </div>
              ))}
              <div className="flex flex-wrap gap-2 pt-1">
                {suggestions.map((s) => (
                  <button
                    key={s.q}
                    type="button"
                    onClick={() => ask(s.q, s.a)}
                    className="rounded-full border border-[#e10600]/25 bg-white px-3 py-1.5 text-xs font-semibold text-[#e10600] transition hover:bg-[#fff1f0]"
                  >
                    {s.q}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-black/5 bg-white p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.assistant.placeholder}
                className="h-10 flex-1 rounded-xl border border-[#e5e5e5] px-3 text-sm outline-none focus:border-[#e10600]"
              />
              <button
                type="submit"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#e10600] text-white"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <a
              href={whatsappLink(t.site.wa)}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 px-4 py-2.5 text-center text-xs font-bold text-white hover:bg-emerald-700"
            >
              WhatsApp · {SITE.phoneDisplay}
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => (open ? setOpen(false) : openChat())}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className="inline-flex h-14 items-center gap-2 rounded-full bg-[#e10600] px-4 text-sm font-bold text-white shadow-[0_14px_34px_rgba(225,6,0,0.45)]"
        aria-label={t.assistant.title}
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">{t.nav.contact}</span>
      </motion.button>
    </div>
  );
}
