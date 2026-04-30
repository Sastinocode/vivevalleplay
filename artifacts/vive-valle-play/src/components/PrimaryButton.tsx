import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  fullWidth?: boolean;
  size?: "md" | "lg";
};

export function PrimaryButton({
  children,
  fullWidth = true,
  size = "lg",
  className,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200",
        "bg-primary text-primary-foreground",
        "hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
        size === "lg" ? "px-6 py-4 text-base" : "px-5 py-3 text-sm",
        fullWidth && "w-full",
        className
      )}
    >
      {children}
    </button>
  );
}
