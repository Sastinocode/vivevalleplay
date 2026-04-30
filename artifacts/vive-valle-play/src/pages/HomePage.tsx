import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { ScreenContainer } from "../components/ScreenContainer";
import { PrimaryButton } from "../components/PrimaryButton";

export default function HomePage() {
  const [, setLocation] = useLocation();

  return (
    <ScreenContainer centered className="relative overflow-hidden">
      {/* Background radial glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-32 -right-20 w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(74,87,48,0.35) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(200,122,78,0.18) 0%, transparent 70%)" }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center gap-10 z-10 w-full">

        {/* Logo */}
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/logo-vive-valle.png"
            alt="Vive Valle"
            className="h-14 w-auto"
            style={{ filter: "brightness(0) invert(1)", opacity: 0.9 }}
          />

          <div>
            <h1
              className="font-serif font-extrabold text-[40px] text-foreground leading-[1.05] tracking-[-0.025em]"
              data-testid="text-app-title"
            >
              Vive Valle<br />
              <span style={{ color: "#c87a4e" }}>Play</span>
            </h1>
            <p className="text-[15px] text-muted-foreground mt-3 leading-relaxed max-w-[240px] mx-auto">
              Juegos y momentos para disfrutar juntos
            </p>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="flex items-center gap-3 w-full max-w-[180px]"
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <div className="flex-1 h-px bg-border" />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#c87a4e", opacity: 0.6 }} />
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        {/* CTA */}
        <motion.div
          className="w-full max-w-xs flex flex-col items-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
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
        className="z-10 text-center text-[11px] text-muted-foreground/50 tracking-widest uppercase pb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        Una experiencia de Vive Valle
      </motion.footer>
    </ScreenContainer>
  );
}
