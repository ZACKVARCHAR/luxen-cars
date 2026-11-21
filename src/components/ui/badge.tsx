import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "success",
  className,
}: {
  children: React.ReactNode;
  tone?: "success" | "warning" | "neutral" | "danger";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        tone === "success" && "bg-emerald-50 text-emerald-700",
        tone === "warning" && "bg-amber-50 text-amber-700",
        tone === "neutral" && "bg-slate-100 text-slate-600",
        tone === "danger" && "bg-red-50 text-red-700",
        className,
      )}
    >
      {children}
    </span>
  );
}
