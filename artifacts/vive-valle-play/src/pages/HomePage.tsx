import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { ScreenContainer } from "../components/ScreenContainer";
import { PrimaryButton } from "../components/PrimaryButton";

export default function HomePage() {
  const [, setLocation] = useLocation();

  return (
    <ScreenContainer centered className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/5 to-transparent" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center gap-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-5xl mb-4">🌿</div>
          <h1
            className="font-serif text-4xl font-bold text-foreground leading-tight mb-2"
            data-testid="text-app-title"
          >
            Vive Valle Play
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed max-w-xs mx-auto">
            Juegos y momentos para disfrutar juntos
          </p>
        </motion.div>

        <motion.div
          className="w-full max-w-xs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <PrimaryButton
            onClick={() => setLocation("/grupo")}
            data-testid="button-start"
          >
            Empezar
          </PrimaryButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button
            onClick={() => setLocation("/recuerdos")}
            data-testid="link-memories"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
          >
            <BookOpen className="w-4 h-4" />
            Ver mis recuerdos
          </button>
        </motion.div>
      </div>

      <footer className="z-10 text-center text-xs text-muted-foreground pb-2">
        Una experiencia de Vive Valle
      </footer>
    </ScreenContainer>
  );
}
