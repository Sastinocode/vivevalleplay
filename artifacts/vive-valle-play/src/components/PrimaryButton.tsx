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
        "inline-flex items-center justify-center rounded-full font-semibold tracking-wide transition-all duration-200",
        "bg-primary text-primary-foreground",
        "hover:brightness-110 active:scale-[0.975] active:brightness-95",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100",
        size === "lg" ? "px-8 py-4 text-[15px]" : "px-5 py-3 text-sm",
        fullWidth && "w-full",
        className
      )}
    >
      {children}
    </button>
  );
}
