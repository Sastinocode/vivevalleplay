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
        "inline-flex items-center justify-center rounded-2xl font-medium tracking-wide transition-all duration-200",
        "bg-primary text-primary-foreground shadow-sm",
        "hover:brightness-105 active:scale-[0.975] active:shadow-none",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100",
        size === "lg" ? "px-7 py-4 text-[15px]" : "px-5 py-3 text-sm",
        fullWidth && "w-full",
        className
      )}
    >
      {children}
    </button>
  );
}
