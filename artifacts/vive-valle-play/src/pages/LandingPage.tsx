import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import "./landing.css";

const logoUrl = "/logo-vive-valle.png";

const experiences = [
  { emoji: "🔥", title: "Rompe el hielo", count: "12 exp.", desc: "Para cuando el grupo acaba de llegar y necesita calentarse. Preguntas, confesiones y revelaciones divertidas." },
  { emoji: "🎭", title: "Retos creativos", count: "8 exp.", desc: "Improvisación, actuación, dibujo y expresión. El grupo se sorprende a sí mismo." },
  { emoji: "⚡", title: "Competición sana", count: "15 exp.", desc: "Equipos, puntos, risas y una pizca de pique. Nadie se lo toma demasiado en serio." },
  { emoji: "💬", title: "Conexión profunda", count: "6 exp.", desc: "Conversaciones guiadas que van más allá de la superficie. Para grupos que quieren conocerse de verdad." },
];

const versus = [
  ["Red social", "Motor de convivencia"],
  ["Videojuego individual", "Experiencia de grupo"],
  ["Conectar desconocidos", "Activar a quien ya está"],
  ["Pantalla individual", "Una sola pantalla compartida"],
  ["Objetivo: ganar", "Objetivo: recordar"],
];

const cases = [
  { icon: "🏡", title: "Casas rurales", desc: "La experiencia de alojamiento rural que va más allá del descanso. El grupo disfruta la estancia como nunca.", tag: "Origen" },
  { icon: "🏨", title: "Hoteles boutique", desc: "Un diferencial real para alojamientos que buscan experiencias únicas, no solo una cama.", tag: "Próximo" },
  { icon: "⛺", title: "Campings y glamping", desc: "Noches alrededor del fuego con una app que multiplica la magia del momento.", tag: "Próximo" },
  { icon: "🎉", title: "Eventos privados", desc: "Cumpleaños, despedidas, reuniones familiares. Donde haya grupo, hay posibilidad.", tag: "Próximo" },
  { icon: "🤝", title: "Team building", desc: "Equipos que se conocen de verdad, no que completan ejercicios. Convivencia real.", tag: "Próximo" },
  { icon: "🍽️", title: "Restauración experiencial", desc: "Convierte la sobremesa en el plato estrella. La conversación como propuesta gastronómica.", tag: "Próximo" },
];

export default function LandingPage() {
  const [, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [activeExp, setActiveExp] = useState(0);
  const revealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("visible"), 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  function addReveal(el: HTMLElement | null) {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  }

  return (
    <div className="vvp-landing">
      {/* NAV */}
      <nav className={`lp-nav ${scrolled ? "scrolled" : ""}`}>
        <a className="lp-nav-logo" href="#top">
          <img src={logoUrl} alt="Vive Valle" />
          <span className="lp-play-badge">Play</span>
        </a>
        <div className="lp-nav-links">
          <a href="#experiencias">Experiencias</a>
          <a href="#como-funciona">Cómo funciona</a>
          <a href="#contextos">Contextos</a>
          <a href="#contacto" className="lp-nav-cta">Solicitar acceso</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="lp-hero" id="top">
        <div className="lp-hero-bg" />
        <div className="lp-hero-noise" />
        <div className="lp-hero-deco">
          <svg viewBox="0 0 800 800" fill="none" preserveAspectRatio="xMidYMid slice">
            <circle cx="600" cy="200" r="300" stroke="white" strokeWidth="1" fill="none" opacity="0.3" />
            <circle cx="600" cy="200" r="200" stroke="white" strokeWidth="1" fill="none" opacity="0.2" />
            <circle cx="600" cy="200" r="450" stroke="white" strokeWidth="1" fill="none" opacity="0.15" />
            <line x1="300" y1="0" x2="800" y2="700" stroke="white" strokeWidth="0.5" opacity="0.1" />
            <line x1="200" y1="100" x2="800" y2="500" stroke="white" strokeWidth="0.5" opacity="0.1" />
          </svg>
        </div>
        <div className="lp-hero-content">
          <div className="lp-hero-label">
            <span className="dot" />
            Motor de experiencias sociales
          </div>
          <h1>
            Convierte una estancia<br />en una <em>experiencia</em><br />compartida.
          </h1>
          <p className="lp-hero-sub">
            Menos pantalla pasiva. Más risas, juego y recuerdos juntos. Para grupos que ya están juntos y quieren disfrutarlo de verdad.
          </p>
          <div className="lp-hero-actions">
            <a href="#contacto" className="lp-btn-primary">
              Solicitar acceso anticipado
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <button className="lp-btn-ghost" onClick={() => setLocation("/app")}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" /><path d="M6.5 5.5L10.5 8l-4 2.5V5.5z" fill="rgba(255,255,255,0.7)" /></svg>
              Probar la app
            </button>
          </div>
        </div>
        <div className="lp-hero-stats">
          <div className="lp-stat">
            <div className="lp-stat-num">+40</div>
            <div className="lp-stat-label">Experiencias distintas</div>
          </div>
          <div className="lp-stat">
            <div className="lp-stat-num">2–20</div>
            <div className="lp-stat-label">Jugadores por sesión</div>
          </div>
          <div className="lp-stat">
            <div className="lp-stat-num">0</div>
            <div className="lp-stat-label">Pantallas individuales</div>
          </div>
        </div>
        <div className="lp-scroll-hint">
          <div className="lp-scroll-line" />
        </div>
      </section>

      {/* PHILOSOPHY */}
      <div className="lp-philosophy">
        <div className="lp-philo-left lp-reveal" ref={addReveal}>
          <div className="lp-section-label">La filosofía</div>
          <h2 className="lp-h2">No es un videojuego.<br />Es un motor de<br />convivencia.</h2>
          <p>La app activa lo que ya está ahí: el grupo. El objetivo no es ganar, sino romper el hielo, provocar risas, generar conversación y crear momentos que no se olvidan.</p>
        </div>
        <div className="lp-philo-right">
          <div className="lp-philo-card olive lp-reveal" ref={addReveal}>
            <div className="lp-philo-bg-num">01</div>
            <div className="lp-philo-tag"><span className="lp-philo-tag-dot" />Presencia</div>
            <h3>La gente se mira</h3>
            <p>Diseñadas para que el foco esté en las personas del grupo, no en la pantalla.</p>
          </div>
          <div className="lp-philo-card terra lp-reveal" ref={addReveal}>
            <div className="lp-philo-bg-num">02</div>
            <div className="lp-philo-tag"><span className="lp-philo-tag-dot" />Espontaneidad</div>
            <h3>La gente improvisa</h3>
            <p>Retos, decisiones y momentos que nadie puede predecir. Cada partida es única.</p>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="lp-how" id="como-funciona">
        <div className="lp-how-header lp-reveal" ref={addReveal}>
          <div className="lp-section-label">Cómo funciona</div>
          <h2>Tres pasos para encender<br />la convivencia</h2>
          <p>Sin descargas individuales. Sin registro. Una pantalla compartida para todo el grupo.</p>
        </div>
        <div className="lp-steps">
          {[
            { num: "01", title: "Escanea o abre", desc: "El anfitrión abre la app desde cualquier dispositivo. Un código QR o pantalla compartida conecta a todos en segundos.", chip: "Sin instalación" },
            { num: "02", title: "Elige la experiencia", desc: "Selecciona el tipo de momento: romper el hielo, reto creativo, juego competitivo, conversación profunda…", chip: "+40 experiencias" },
            { num: "03", title: "El grupo juega junto", desc: "La app guía, provoca y facilita. El protagonismo lo tienen las personas. Siempre.", chip: "El momento empieza aquí" },
          ].map((s) => (
            <div key={s.num} className="lp-step lp-reveal" ref={addReveal}>
              <span className="lp-step-num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="lp-step-chip">{s.chip}</span>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCES */}
      <section className="lp-experiences" id="experiencias">
        <div className="lp-section-label">Las experiencias</div>
        <h2>Cuatro modos,<br />infinitos momentos.</h2>
        <p className="lp-exp-sub">Cada modo está pensado para un tipo de energía de grupo diferente.</p>
        <div className="lp-exp-grid">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className={`lp-exp-card lp-reveal ${activeExp === i ? "active" : ""}`}
              ref={addReveal}
              onClick={() => setActiveExp(i)}
            >
              <span className="lp-exp-count">{exp.count}</span>
              <span className="lp-exp-emoji">{exp.emoji}</span>
              <h3>{exp.title}</h3>
              <p>{exp.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ANTI-PASSIVE */}
      <section className="lp-antipassive">
        <div className="lp-antipassive-text lp-reveal" ref={addReveal}>
          <div className="lp-section-label">No es esto</div>
          <h2>Diseñado para lo que<br />NO hacen otras apps.</h2>
          <p>No somos una red social. No somos un videojuego. No conectamos desconocidos. Somos el catalizador de los momentos que ya tienes delante.</p>
        </div>
        <div className="lp-versus lp-reveal" ref={addReveal}>
          {versus.map(([no, yes], i) => (
            <div key={i} className="lp-versus-row">
              <div className="lp-v-icon no">✕</div>
              <div className="lp-v-no">{no}</div>
              <div className="lp-v-icon yes">✓</div>
              <div className="lp-v-yes">{yes}</div>
            </div>
          ))}
        </div>
      </section>

      {/* USE CASES */}
      <section className="lp-usecases" id="contextos">
        <div className="lp-reveal" ref={addReveal}>
          <div className="lp-section-label">Contextos</div>
          <h2 className="lp-h2">Pensado por Vive Valle.<br />Construido para crecer.</h2>
        </div>
        <div className="lp-cases-grid">
          {cases.map((c, i) => (
            <div key={i} className="lp-case-card lp-reveal" ref={addReveal}>
              <div className="lp-case-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <span className="lp-case-tag">{c.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="lp-cta-section" id="contacto">
        <div className="lp-cta-bg-text">Juega.<br />Ríete.<br />Recuerda.</div>
        <div className="lp-cta-inner">
          <div className="lp-reveal" ref={addReveal}>
            <div className="lp-section-label">Acceso anticipado</div>
            <h2>Activa tu grupo.<br /><em>Ahora.</em></h2>
          </div>
          <div className="lp-cta-right lp-reveal" ref={addReveal}>
            <p>Únete a los primeros alojamientos que están transformando la estancia en algo memorable.</p>
            <div className="lp-cta-buttons">
              <a href="mailto:hola@vivevalle.es" className="lp-btn-cta-primary">
                Solicitar acceso
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
              <button className="lp-btn-cta-ghost" onClick={() => setLocation("/app")}>
                Probar la app →
              </button>
            </div>
          </div>
        </div>
        <div className="lp-cta-terra-bar" />
      </section>

      {/* FOOTER */}
      <footer className="lp-footer">
        <img className="lp-footer-logo" src={logoUrl} alt="Vive Valle" />
        <span className="lp-footer-tagline">Menos pantalla pasiva. Más risas, juego y recuerdos juntos.</span>
        <div className="lp-footer-links">
          <a href="#">Privacidad</a>
          <a href="mailto:hola@vivevalle.es">Contacto</a>
          <a href="#">Instagram</a>
        </div>
      </footer>

      {/* FLOATING BADGE */}
      <a className="lp-float-badge" href="#contacto">
        🎮 Solicitar acceso
      </a>
    </div>
  );
}
