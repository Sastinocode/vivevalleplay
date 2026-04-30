import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* Dark olive/ink background — matches landing page design language */
const DARK_BG = "#0f130a";
const DARK_FG = "#f0ece3";

type ScreenContainerProps = {
  children: ReactNode;
  className?: string;
  centered?: boolean;
};

export function ScreenContainer({ children, className, centered }: ScreenContainerProps) {
  return (
    <div
      className={cn(
        "min-h-[100dvh] w-full max-w-md mx-auto px-6 pt-10 pb-safe flex flex-col",
        centered && "items-center justify-center",
        className
      )}
      style={{ backgroundColor: DARK_BG, color: DARK_FG }}
    >
      {children}
    </div>
  );
}
