import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { ScreenContainer } from "../components/ScreenContainer";
import { PrimaryButton } from "../components/PrimaryButton";
import { useTenant } from "../context/TenantContext";

export default function HomePage() {
  const [, setLocation] = useLocation();
  const { brand } = useTenant();

  return (
    <ScreenContainer centered className="relative overflow-hidden">
      {/* Warm ambient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-24 -right-16 w-72 h-72 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.30), transparent 70%)" }}
        />
        <div
          className="absolute -bottom-20 -left-12 w-64 h-64 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, hsl(var(--secondary) / 0.25), transparent 70%)" }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center gap-10 z-10 w-full">

        {/* Logo block */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-16 h-16 rounded-[20px] bg-primary/10 flex items-center justify-center shadow-sm">
            <span className="font-serif text-3xl text-primary leading-none select-none">
              {brand.monogram}
            </span>
          </div>

          <div>
            <h1
              className="font-serif text-[38px] font-semibold text-foreground leading-[1.1] tracking-tight"
              data-testid="text-app-title"
            >
              {brand.name}
            </h1>
            <p className="text-[15px] text-muted-foreground mt-2 leading-relaxed">
              {brand.tagline}
            </p>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="flex items-center gap-3 w-full max-w-[200px]"
          initial={{ opacity: 0, scaleX: 0.6 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex-1 h-px bg-border" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        {/* CTA */}
        <motion.div
          className="w-full max-w-xs flex flex-col items-center gap-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <PrimaryButton
            onClick={() => setLocation("/grupo")}
            data-testid="button-start"
          >
            Empezar
          </PrimaryButton>

          <button
            onClick={() => setLocation("/recuerdos")}
            data-testid="link-memories"
            className="flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors py-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Ver mis recuerdos
          </button>
        </motion.div>
      </div>

      <motion.footer
        className="z-10 text-center text-[11px] text-muted-foreground/60 tracking-wider uppercase pb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        {brand.footer}
      </motion.footer>
    </ScreenContainer>
  );
}
