import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SecondaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  fullWidth?: boolean;
};

export function SecondaryButton({
  children,
  fullWidth = true,
  className,
  ...props
}: SecondaryButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm font-medium transition-all duration-200",
        "border border-border text-foreground bg-transparent",
        "hover:bg-accent active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
        fullWidth && "w-full",
        className
      )}
    >
      {children}
    </button>
  );
}
