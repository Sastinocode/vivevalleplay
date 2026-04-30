import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ScreenContainerProps = {
  children: ReactNode;
  className?: string;
  centered?: boolean;
};

export function ScreenContainer({ children, className, centered }: ScreenContainerProps) {
  return (
    <div
      className={cn(
        "min-h-screen w-full max-w-md mx-auto px-5 py-8 flex flex-col",
        centered && "items-center justify-center",
        className
      )}
    >
      {children}
    </div>
  );
}
