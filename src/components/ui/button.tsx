import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "ghost" | "dark";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          variant === "primary" && "btn-primary",
          variant === "ghost" && "btn-ghost",
          variant === "dark" &&
            "inline-flex items-center justify-center gap-2 rounded-full bg-luxen-ink px-5 py-3 font-bold text-white transition hover:-translate-y-0.5",
          "disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
