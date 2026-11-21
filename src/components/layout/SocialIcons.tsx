import { SITE } from "@/lib/site";

const ICONS = [
  {
    label: "Facebook",
    href: SITE.social.facebook,
    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  },
  {
    label: "Instagram",
    href: SITE.social.instagram,
    path: "M16.5 3h-9A4.5 4.5 0 0 0 3 7.5v9A4.5 4.5 0 0 0 7.5 21h9a4.5 4.5 0 0 0 4.5-4.5v-9A4.5 4.5 0 0 0 16.5 3Zm3 13.5a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9ZM12 8.2A3.8 3.8 0 1 0 12 15.8 3.8 3.8 0 0 0 12 8.2Zm0 6.2a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8Zm4.7-7.55a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0Z",
  },
  {
    label: "YouTube",
    href: SITE.social.youtube,
    path: "M22.5 7.2a3 3 0 0 0-2.1-2.1C18.7 4.6 12 4.6 12 4.6s-6.7 0-8.4.5A3 3 0 0 0 1.5 7.2 31 31 0 0 0 1 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.7.5 8.4.5 8.4.5s6.7 0 8.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23 12a31 31 0 0 0-.5-4.8ZM9.8 15.2V8.8L15.7 12l-5.9 3.2Z",
  },
  {
    label: "LinkedIn",
    href: SITE.social.linkedin,
    path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2zm2-6a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z",
  },
  {
    label: "TikTok",
    href: SITE.social.tiktok,
    path: "M19.6 7.2a6.6 6.6 0 0 1-3.8-1.2v7.1a5.5 5.5 0 1 1-4.7-5.4v2.4a3.1 3.1 0 1 0 2.2 3v-11h2.4a4.3 4.3 0 0 0 3.9 3.7v1.4Z",
  },
] as const;

export function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {ICONS.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          aria-label={item.label}
          title={item.label}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-[#e10600] hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
            <path d={item.path} />
          </svg>
        </a>
      ))}
    </div>
  );
}
