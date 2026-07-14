import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  ArrowUpRight,
  MessageCircle,
  User,
  GraduationCap,
  Globe,
  Code,
  Zap,
  Terminal,
  Cpu,
  QrCode,
  ArrowLeft,
  BarChart3,
  Sun,
  Moon
} from "lucide-react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState, useCallback } from "react";

import MatrixRain from "./MatrixRain";
import LoadingScreen from "./components/LoadingScreen";
import TerminalView from "./components/Terminal";
import TrucoGame from "./components/TrucoGame";
import GlitchText from "./components/GlitchText";
import GlitchButton from "./components/GlitchButton";
import { useSound } from "./hooks/useSound";

// Hook to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const experiences = [
  { 
    name: "Media Buyer & Especialista en Tráfico Pago (Freelance)", 
    role: "Estrategias de Meta & Google Ads para negocios locales, e-commerce y marcas de gastronomía/retail", 
    years: "2024 - Presente",
    skills: ["Meta Ads", "Google Ads", "E-commerce", "Smart Bidding"],
    highlights: [
      "Diseño y ejecución de embudos de conversión con foco en adquisición y retorno de inversión.",
      "Análisis de métricas, optimización de presupuestos (CBO) y testeo de creativos y copies."
    ]
  },
  { 
    name: "Casa Fabric", 
    role: "Staff (Temporada)", 
    years: "2024 - 2025",
    skills: ["Atención al Cliente", "Operaciones", "Ventas", "Trabajo en Equipo"],
    highlights: [
      "Atención personalizada al cliente en un entorno gastronómico de alta demanda y ritmo acelerado.",
      "Coordinación estrecha con el equipo de salón y cocina para asegurar un servicio fluido."
    ]
  },
  { 
    name: "M&M Propiedades", 
    role: "Asesor de Ventas & Coordinador de Tráfico Pago (Google & Meta Ads)", 
    years: "2023 - 2024",
    skills: ["Ventas Real Estate", "Generación de Leads", "Google Search", "Sistemas CRM"],
    highlights: [
      "Asesoramiento y gestión comercial de prospectos interesados en desarrollos inmobiliarios y pozo.",
      "Implementación de pauta en Google y Meta para captar prospectos con perfil inversor."
    ]
  },
  { 
    name: "Fabric Sushi Madero", 
    role: "Camarero (Uruguay / MVD)", 
    years: "2023",
    skills: ["Gastronomía", "Atención VIP", "Resolución Ágil"],
    highlights: [
      "Servicio de salón y asesoramiento gastronómico premium en sucursal internacional de alta concurrencia.",
      "Resolución inmediata de requerimientos complejos y fidelización directa del comensal."
    ]
  },
  { 
    name: "Tienda Café", 
    role: "Barista", 
    years: "2023",
    skills: ["Barismo", "Calidad de Servicio", "Venta Sugerida"],
    highlights: [
      "Elaboración de café de especialidad y mantenimiento de estrictos estándares de presentación.",
      "Atención al público en mostrador logrando un incremento en el ticket promedio mediante venta cruzada."
    ]
  },
  { 
    name: "Coto", 
    role: "Cajero (Temporada)", 
    years: "2023",
    skills: ["Manejo de Valores", "Atención Masiva", "Resolución de Conflictos"],
    highlights: [
      "Procesamiento ágil y seguro de transacciones en sucursal de temporada de gran afluencia.",
      "Arqueo de caja garantizando cero discrepancias y un trato al público excelente."
    ]
  },
  { 
    name: "Fabric Sushi Pinamar", 
    role: "Bartender / Camarero", 
    years: "2021 - 2023",
    skills: ["Mixología", "Servicio en Barra", "Atención en Temporada"],
    highlights: [
      "Preparación de coctelería clásica y de autor bajo altos estándares de velocidad.",
      "Asistencia en salón durante picos de demanda estival, garantizando fluidez en el servicio."
    ]
  },
  { 
    name: "Garden Suites", 
    role: "Camarero", 
    years: "2022",
    skills: ["Hotelería", "Servicio VIP", "Comunicación Eficaz"],
    highlights: [
      "Atención de salón y room service en hotel de categoría, garantizando cortesía y excelencia.",
      "Asistencia y resolución de requerimientos de huéspedes nacionales e internacionales."
    ]
  },
  { 
    name: "Tostado Café Club", 
    role: "Barista", 
    years: "2021 - 2022",
    skills: ["Barismo", "Formato Fast-Casual", "Venta Cruzada"],
    highlights: [
      "Operación de barra de café y preparación ágil en formato dinámico de alto volumen de pedidos."
    ]
  },
  { 
    name: "Fuegos", 
    role: "Bartender", 
    years: "2020 - 2021",
    skills: ["Mixología", "Gestión de Barra", "Control de Stock"],
    highlights: [
      "Preparación y despacho en barra nocturna de alta rotación, controlando insumos."
    ]
  },
  { 
    name: "Café Martínez", 
    role: "Barista", 
    years: "2020 - 2021",
    skills: ["Serrat de Café", "Atención al Cliente", "Higiene de Equipos"],
    highlights: [
      "Atención al mostrador, preparación de café expreso y despacho ágil."
    ]
  },
  { 
    name: "Botavara Club del Mar", 
    role: "Barman / Barista", 
    years: "2020",
    skills: ["Servicio de Playa", "Preparación Veloz"],
    highlights: [
      "Atención y despacho de bebidas en parador costero durante temporada alta."
    ]
  },
  { 
    name: "Pueblo Limite / Lebrique", 
    role: "RRPP / Barman", 
    years: "2016 - 2020",
    skills: ["RRPP", "Fidelización", "Servicio Nocturno"],
    highlights: [
      "Atención en barras, manejo de caja de barra y organización de accesos."
    ]
  },
  { 
    name: "Munchi's", 
    role: "Atención / Reposición", 
    years: "2018 - 2019",
    skills: ["Atención al Cliente", "Control de Stock"],
    highlights: [
      "Despacho al público, reposición de productos helados y control de higiene del salón."
    ]
  },
  { 
    name: "McDonald's", 
    role: "Staff Operativo", 
    years: "2016 - 2019",
    skills: ["Estandarización", "Trabajo en Equipo", "Rapidez de Entrega"],
    highlights: [
      "Operación multifuncional en caja, cocina y atención bajo normas internacionales de calidad."
    ]
  }
];

const campaignCases = [
  {
    id: "inmobiliaria",
    title: "Caso Inmobiliario: Captación de Leads Cualificados",
    client: "M&M Propiedades (Desarrollos y Ventas)",
    platform: "Meta Ads & Google Search",
    budget: "U$D 500 / mes",
    objective: "Adquisición de prospectos de alta intención para propiedades de pozo y terminadas en la costa.",
    strategy: "Campañas de formularios instantáneos en Meta con filtros de calificación estrictos combinadas con anuncios de Google Search para keywords transaccionales (ej: 'comprar departamento en pinamar').",
    audience: "Inversores de real estate de GBA y CABA, personas interesadas en segundas residencias, segmentación por intereses de alto nivel.",
    deliverables: [
      "Estructura de campaña de embudo completo con formularios pre-filtrados.",
      "Redacción de copys comerciales orientados a inversores de alto poder adquisitivo.",
      "Mapeo de palabras clave negativas para reducir clics irrelevantes en Google.",
      "Integración de leads con CRM inmobiliario para seguimiento inmediato."
    ]
  },
  {
    id: "gastronomia",
    title: "Caso Gastronómico: Reservas y Delivery en Temporada",
    client: "Restaurante Boutique & Sushi Bar (Hiperlocal)",
    platform: "Instagram & Facebook Ads",
    budget: "U$D 350 / mes",
    objective: "Incrementar las reservas de mesa y el volumen de pedidos de delivery durante picos de fin de semana.",
    strategy: "Segmentación por radio de 3km con anuncios dinámicos en formato Reels que muestran el producto. Ofertas exclusivas de 'Early Bird' de domingo a jueves para aplanar la demanda.",
    audience: "Turistas activos en zona de playa, residentes locales de Pinamar/Cariló, segmentación demográfica por edades 25-55.",
    deliverables: [
      "Diseño de pautas publicitarias con creativos de alto impacto visual (video y reel).",
      "Configuración de geocercas precisas alrededor del local comercial.",
      "Automatización de respuestas directas en Instagram para agilizar reservas.",
      "Estrategia de retargeting para clientes que ya interactuaron con el menú online."
    ]
  },
  {
    id: "reestructuracion",
    title: "Caso Auditoría: Limpieza de Campañas de Búsqueda",
    client: "E-Commerce de Equipamiento Deportivo",
    platform: "Google Ads (Búsqueda)",
    budget: "U$D 800 / mes",
    objective: "Reducir el desperdicio de presupuesto y mejorar el Nivel de Calidad (Quality Score) de la cuenta.",
    strategy: "Exclusión masiva de términos de búsqueda irrelevantes mediante palabras clave negativas. Transición de concordancia amplia a frase para mayor relevancia, y mejora de CTR con extensiones de anuncios.",
    audience: "Búsqueda activa de marcas y categorías específicas de equipamiento.",
    deliverables: [
      "Auditoría técnica de tags, píxel y píxeles duplicados que inflaban conversiones.",
      "Reorganización de la cuenta bajo la metodología SKAG (Single Keyword Ad Groups).",
      "Re-escritura completa de anuncios dinámicos de búsqueda (RSA).",
      "Configuración del seguimiento de conversiones mejorado (Enhanced Conversions)."
    ]
  }
];

const skillCards = [
  { 
    name: "Atención al público", 
    value: 90, 
    icon: <User size={20} />,
    description: "Experiencia avanzada en trato directo, resolución de conflictos y fidelización."
  },
  { 
    name: "Trabajo en equipo", 
    value: 92, 
    icon: <Globe size={20} />,
    description: "Colaboración efectiva en entornos dinámicos y de alto volumen operativo."
  },
  { 
    name: "Responsabilidad", 
    value: 95, 
    icon: <Briefcase size={20} />,
    description: "Compromiso total con los objetivos, puntualidad y estándares de calidad."
  },
  { 
    name: "Comunicación", 
    value: 88, 
    icon: <MessageCircle size={20} />,
    description: "Habilidades interpersonales claras para coordinar equipos y atender clientes."
  },
  { 
    name: "Desarrollo Software", 
    value: 88, 
    icon: <Code size={20} />,
    description: "Creación de soluciones digitales y automatizaciones para mejora de procesos."
  },
  { 
    name: "Inteligencia Artificial", 
    value: 83, 
    icon: <Cpu size={20} />,
    description: "Implementación de herramientas de IA para optimizar la productividad."
  },
  { 
    name: "Gestión de Proyectos Digitales", 
    value: 85, 
    icon: <BarChart3 size={20} />,
    description: "Coordinación de lanzamientos y estrategias digitales integrales."
  },
];

const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.411.001 12.045c0 2.12.554 4.189 1.602 6.04L0 24l6.117-1.605a11.803 11.803 0 005.93 1.571h.005c6.634 0 12.045-5.411 12.048-12.047 0-3.214-1.252-6.234-3.528-8.51"/>
  </svg>
);

function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const { playSound } = useSound();
  const [soundsEnabled, setSoundsEnabled] = useState(false);
  const [selectedCase, setSelectedCase] = useState("inmobiliaria");
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return (saved as 'dark' | 'light') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    if (soundsEnabled) playSound('click');
  };

  return (
    <div className="min-h-screen bg-app-bg text-app-text font-sans selection:bg-brand-green/30 pb-24 relative overflow-hidden">
      <MatrixRain />
      <TrucoGame />
      <TerminalView />
      <div className={`fixed inset-x-0 bottom-0 h-full w-full scanline-overlay pointer-events-none z-50 mix-blend-overlay opacity-50 ${theme === 'light' ? 'hidden' : ''}`} />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-green z-50 origin-left"
        style={{ scaleX }}
      />

      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-5xl px-8 py-5 bg-app-surface/30 backdrop-blur-2xl border border-app-border rounded-3xl flex justify-between items-center shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center">
            <span className="text-black font-black text-xs">CV</span>
          </div>
          <span translate="no" className="font-display font-black text-sm tracking-[0.2em] uppercase notranslate">Lucas Barrera</span>
        </div>
        <div className="flex items-center gap-3 md:gap-4">
          <button 
            onClick={toggleTheme}
            className={`flex items-center justify-center w-10 md:w-12 h-10 md:h-12 bg-app-surface/50 border border-app-border rounded-xl transition-all text-app-text-muted hover:text-app-text`}
            title={theme === 'dark' ? "Modo Claro" : "Modo Oscuro"}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => {
              setSoundsEnabled(!soundsEnabled);
              if (!soundsEnabled) playSound('success');
            }}
            title={soundsEnabled ? "Silenciar" : "Activar Sonido"}
            className={`flex items-center justify-center w-10 md:w-12 h-10 md:h-12 border rounded-xl transition-all ${soundsEnabled ? 'bg-brand-green/20 border-brand-green text-brand-green' : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'}`}
          >
            {soundsEnabled ? <Zap size={20} className="animate-pulse" /> : <Zap size={20} className="opacity-30" />}
          </button>
          <Link 
            to="/qr" 
            onMouseEnter={() => soundsEnabled && playSound('hover')}
            onClick={() => soundsEnabled && playSound('click')}
            title="Ver QR" 
            className="flex items-center justify-center w-10 md:w-12 h-10 md:h-12 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all text-neutral-400 hover:text-white"
          >
            <QrCode size={20} />
          </Link>
          <a 
            href="https://wa.me/5492254535810" 
            target="_blank" 
            rel="noopener noreferrer" 
            onMouseEnter={() => soundsEnabled && playSound('hover')}
            onClick={() => soundsEnabled && playSound('click')}
            title="Contactar por WhatsApp" 
            className="flex items-center justify-center w-10 md:w-12 h-10 md:h-12 bg-brand-green text-black rounded-xl hover:scale-105 active:scale-95 transition-all"
          >
            <WhatsAppIcon size={22} />
          </a>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-32 md:pt-40 pb-12">
        
        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mb-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-12 bg-app-surface border border-app-border rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-24 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16"
          >
            <div className="relative z-10 max-w-3xl w-full">
              <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-6 md:mb-8">
                <span className="px-3 md:px-4 py-1 md:py-1.5 bg-app-surface/50 text-app-text-muted text-[9px] md:text-[10px] font-bold tracking-widest rounded-full border border-app-border uppercase">Pinamar, Argentina</span>
                <div className="flex items-center gap-2 px-2.5 md:px-3 py-1 bg-brand-green/10 rounded-full border border-brand-green/20">
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brand-green animate-pulse" />
                  <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-brand-green">Disponible</span>
                </div>
              </div>
              <h1 translate="no" className="text-5xl sm:text-7xl lg:text-[9rem] font-display font-black leading-[0.85] tracking-tight mb-8 md:mb-12 break-words text-glow text-app-text notranslate">
                <GlitchText text="LUCAS" /> <br />
                <span className="text-brand-green dark:text-matrix-green opacity-90"><GlitchText text="BARRERA" /></span>
              </h1>
              <p className="text-lg md:text-2xl text-app-text-muted font-light max-w-xl leading-relaxed">
                Profesional con experiencia en atención al público y operaciones dinámicas en entornos de alta demanda. Me destaco por mi <span className="text-app-text font-medium">adaptación rápida y capacidad resolutiva</span>, combinando la empatía de la atención personalizada con la agilidad digital para crear <span className="text-app-text font-medium">conexiones reales</span> y superar expectativas en cada detalle.
              </p>
            </div>

            <div className="relative z-10 flex flex-col gap-6 md:gap-8 w-full md:w-auto md:min-w-[320px]">
              <div className="p-6 md:p-8 bg-app-surface border border-app-border rounded-2xl md:rounded-3xl backdrop-blur-xl">
                 <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-brand-green mb-4 md:mb-6">Información</p>
                 <div className="space-y-4">
                    <a href="mailto:Ale.2020.caba@gmail.com" className="flex flex-col group/item transition-colors hover:bg-app-surface/50 p-2 rounded-xl -m-2">
                       <span className="text-[9px] md:text-[10px] font-bold text-app-text-muted/60 uppercase tracking-widest mb-1 italic">Mail</span>
                       <span className="text-xs md:text-sm font-mono text-app-text-muted group-hover/item:text-brand-green transition-colors break-all">Ale.2020.caba@gmail.com</span>
                    </a>
                    <a href="tel:5492254535810" className="flex flex-col group/item transition-colors hover:bg-app-surface/50 p-2 rounded-xl -m-2">
                       <span className="text-[9px] md:text-[10px] font-bold text-app-text-muted/60 uppercase tracking-widest mb-1 italic">Teléfono</span>
                       <span className="text-xs md:text-sm font-mono text-app-text-muted group-hover/item:text-brand-green transition-colors">2254 53-5810</span>
                    </a>
                 </div>
              </div>
              <GlitchButton 
                href="https://wa.me/5492254535810" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full h-16 md:h-20 bg-brand-green text-black rounded-2xl md:rounded-[2rem] flex items-center justify-center font-black uppercase tracking-widest text-xs md:text-sm hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all group shadow-lg shadow-brand-green/20"
              >
                <WhatsAppIcon size={20} className="md:w-6 md:h-6" />
                <span>Contactar Ahora</span>
                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </GlitchButton>
            </div>

            {/* Background Gradient */}
            <div className="absolute -top-1/2 -right-1/4 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-brand-green/10 blur-[120px] md:blur-[160px] rounded-full pointer-events-none" />
          </motion.div>
        </div>

        {/* BENTO GRID ROW */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mb-6">
          {/* Vision */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:col-span-12 lg:col-span-7 bg-app-surface border border-app-border rounded-3xl md:rounded-[3rem] p-8 md:p-12 flex flex-col justify-center group relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-6 md:p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                <Briefcase size={80} className="w-16 h-16 md:w-20 md:h-20 text-brand-green" />
             </div>
             <h3 className="text-brand-green text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-6 md:mb-10">Visión Proactiva</h3>
             <p className="text-xl md:text-3xl leading-snug text-app-text font-light italic">
               "Complemento mi experiencia práctica con conocimientos en <span className="text-brand-green font-medium italic">desarrollo de software e inteligencia artificial aplicada</span>, aportando herramientas modernas para optimizar procesos y resolver problemas eficientemente."
             </p>
          </motion.div>

          {/* Languages */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="md:col-span-12 lg:col-span-5 bg-app-surface border border-app-border rounded-3xl md:rounded-[3rem] p-8 md:p-12 flex flex-col justify-between hover:border-brand-green/30 transition-all duration-500 group"
          >
             <div className="w-12 h-12 md:w-14 md:h-14 bg-app-surface/50 rounded-xl md:rounded-2xl flex items-center justify-center border border-app-border group-hover:bg-brand-green group-hover:text-black transition-all mb-8 lg:mb-0">
                <Globe size={28} className="w-6 h-6 md:w-7 md:h-7" />
             </div>
             <div className="space-y-4">
               <h4 className="font-display font-black text-xl md:text-2xl uppercase tracking-tighter italic">Idiomas</h4>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                 <div className="p-4 bg-app-surface/50 rounded-xl md:rounded-2xl border border-app-border">
                    <p className="text-[9px] md:text-[10px] font-black text-brand-green uppercase tracking-widest mb-1">Español</p>
                    <p className="text-xs font-bold text-app-text-muted">Nativo</p>
                 </div>
                 <div className="p-4 bg-app-surface/50 rounded-xl md:rounded-2xl border border-app-border">
                    <p className="text-[9px] md:text-[10px] font-black text-app-text-muted uppercase tracking-widest mb-1">Inglés</p>
                    <p className="text-xs font-bold text-app-text-muted">Competente</p>
                 </div>
               </div>
             </div>
          </motion.div>
        </div>

        {/* EXPERIENCE & SKILLS GRID */}
        {/* GOOGLE & META ADS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mb-6">
          {/* Google Ads Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="md:col-span-12 lg:col-span-6 bg-app-surface border border-app-border rounded-3xl md:rounded-[3rem] p-8 md:p-12 hover:border-brand-green/30 transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 md:p-8 opacity-5 group-hover:opacity-15 transition-opacity">
              <svg className="w-16 h-16 md:w-20 md:h-20 text-brand-green fill-current" viewBox="0 0 24 24">
                <path d="M21.3 11.1H12v3.8h5.3c-.2 1.3-1 2.4-2.2 3.2v2.7h3.6c2.1-1.9 3.3-4.7 3.3-8 0-.6-.1-1.1-.2-1.7z" />
                <path d="M12 20.6c2.4 0 4.5-.8 6-2.2l-3.6-2.7c-1 .7-2.2 1.1-3.6 1.1-2.8 0-5.1-1.9-5.9-4.5H1.1v2.8c1.5 3 4.6 4.9 8.1 4.9z" />
                <path d="M6.1 12.3c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V5.5H1.1C.4 6.8 0 8.4 0 10s.4 3.2 1.1 4.5l5-3.8.3-.9-1.3-1.3z" />
                <path d="M12 5.2c1.3 0 2.5.5 3.4 1.3l2.6-2.6C16.5 2.5 14.4 1.7 12 1.7 8.5 1.7 5.4 3.6 3.9 6.6l4.5 3.5c.8-2.6 3.1-4.9 5.9-4.9z" />
              </svg>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-500/20">
                Google Ads
              </div>
              <span className="text-xs font-mono text-app-text-muted/60">Search · Display · PMax</span>
            </div>
            <h3 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tighter italic mb-4">Experto en Google Ads</h3>
            <p className="text-sm md:text-base text-app-text-muted/80 leading-relaxed mb-6">
              Estrategias orientadas a capturar demanda activa y maximizar conversiones mediante anuncios altamente segmentados.
            </p>
            <ul className="space-y-3 font-mono text-xs text-app-text-muted/70">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                Optimización de Campañas de Búsqueda (Search) y Performance Max (PMax).
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                Estrategias de Pujas Inteligentes (Smart Bidding) enfocadas en ROAS/CPA.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                Auditoría, investigación de palabras clave y exclusión de tráfico irrelevante.
              </li>
            </ul>
          </motion.div>

          {/* Meta Ads Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="md:col-span-12 lg:col-span-6 bg-app-surface border border-app-border rounded-3xl md:rounded-[3rem] p-8 md:p-12 hover:border-brand-green/30 transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 md:p-8 opacity-5 group-hover:opacity-15 transition-opacity">
              <svg className="w-16 h-16 md:w-20 md:h-20 text-brand-green fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.5 2 2 6.5 2 12c0 5 3.7 9.1 8.5 9.9v-7H8v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6v1.9h2.8l-.4 2.9h-2.4V22c4.8-.8 8.5-4.9 8.5-9.9 0-5.5-4.5-10-10-10z" />
              </svg>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="px-3 py-1 bg-purple-500/10 text-purple-400 text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-full border border-purple-500/20">
                Meta Ads
              </div>
              <span className="text-xs font-mono text-app-text-muted/60">IG · FB · WhatsApp integration</span>
            </div>
            <h3 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tighter italic mb-4">Experto en Meta Ads</h3>
            <p className="text-sm md:text-base text-app-text-muted/80 leading-relaxed mb-6">
              Creación de embudos de venta persuasivos en Instagram y Facebook, conectando audiencias ideales con ofertas irresistibles.
            </p>
            <ul className="space-y-3 font-mono text-xs text-app-text-muted/70">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                Segmentación por intereses, públicos personalizados y similares (Lookalikes).
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                Configuración técnica: Píxel de Meta, API de Conversiones y verificación de dominios.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                Optimización de presupuestos (CBO & ABO) y testeo de creativos a escala.
              </li>
            </ul>
          </motion.div>
        </div>

        {/* CASES AND PORTFOLIO SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-app-surface/20 border border-app-border rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 mb-12 backdrop-blur-md relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-brand-green">Casos de Éxito & Auditoría</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tighter italic">Portafolio de Campañas y Resultados</h2>
            </div>
            
            {/* Case selectors */}
            <div className="flex flex-wrap gap-2 p-1 bg-app-bg/80 border border-app-border rounded-2xl md:rounded-full">
              {campaignCases.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedCase(c.id);
                    if (soundsEnabled) playSound("click");
                  }}
                  className={`px-5 py-2.5 rounded-xl md:rounded-full text-xs font-bold tracking-tight uppercase transition-all ${
                    selectedCase === c.id 
                      ? "bg-brand-green text-black shadow-lg" 
                      : "text-app-text-muted hover:text-app-text hover:bg-white/5"
                  }`}
                >
                  {c.id === "inmobiliaria" ? "Inmobiliaria" : c.id === "gastronomia" ? "Gastronomía" : "Auditoría"}
                </button>
              ))}
            </div>
          </div>

          {/* Case display */}
          {campaignCases.filter(c => c.id === selectedCase).map((c) => (
            <motion.div 
              key={c.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Campaign details */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-mono text-brand-green/60 mb-1 block">&gt; CLIENTE: {c.client}</span>
                  <h3 className="text-2xl md:text-3xl font-display font-black tracking-tight text-app-text group-hover:text-brand-green transition-colors">{c.title}</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 bg-app-surface border border-app-border rounded-2xl">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-app-text-muted/60 mb-2">Plataformas y Canales</p>
                    <p className="text-sm font-bold text-app-text">{c.platform}</p>
                  </div>
                  <div className="p-5 bg-app-surface border border-app-border rounded-2xl">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-app-text-muted/60 mb-2">Presupuesto Gestionado</p>
                    <p className="text-sm font-bold text-app-text">{c.budget}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-green mb-1.5">// Objetivo Comercial</h4>
                    <p className="text-sm text-app-text-muted/90 leading-relaxed">{c.objective}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-green mb-1.5">// Estrategia de Embudo y Optimización</h4>
                    <p className="text-sm text-app-text-muted/90 leading-relaxed">{c.strategy}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-green mb-1.5">// Segmentación de Públicos</h4>
                    <p className="text-sm text-app-text-muted/90 leading-relaxed">{c.audience}</p>
                  </div>
                </div>
              </div>

              {/* Campaign deliverables / actions */}
              <div className="lg:col-span-5 bg-app-bg/50 border border-app-border rounded-3xl p-6 md:p-8 space-y-6">
                <h4 className="text-xs font-mono uppercase tracking-widest text-brand-green font-bold text-center border-b border-app-border pb-4">
                  Implementación & Hitos Clave
                </h4>
                
                <ul className="space-y-4 font-mono text-xs text-app-text-muted/80">
                  {c.deliverables.map((del, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-3.5 bg-app-surface/40 border border-app-border/40 rounded-xl hover:border-brand-green/20 hover:bg-app-surface/60 transition-all">
                      <span className="text-brand-green font-black select-none">&gt;</span>
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-app-border text-[10px] font-mono text-app-text-muted/40 text-center leading-relaxed">
                  * Acciones ejecutadas de forma autónoma y alineadas con metodologías de optimización avanzada.
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* EXPERIENCE & SKILLS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-2xl font-display font-black uppercase tracking-widest shrink-0">Trayectoria</h2>
              <div className="h-[1px] bg-white/10 flex-grow" />
            </div>

            <div className="space-y-6">
              {/* Render top 5 experiences in a rich, highly visual format */}
              {experiences.slice(0, 5).map((exp, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] -z-10 blur-xl" />
                  <div className="p-8 bg-app-surface/50 border border-app-border rounded-[2rem] hover:bg-app-surface/80 hover:border-brand-green/20 transition-all duration-500 backdrop-blur-sm space-y-4">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-brand-green group-hover:scale-125 transition-transform duration-300 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                        <div>
                          <h4 translate="no" className="text-lg md:text-xl font-bold tracking-tight text-app-text-muted group-hover:text-app-text transition-colors">
                            {exp.name}
                          </h4>
                          <p className="text-sm font-medium text-app-text-muted/60 italic mt-0.5">
                            {exp.role}
                          </p>
                        </div>
                      </div>
                      <div className="px-4 py-1.5 bg-brand-green/5 border border-brand-green/10 rounded-full text-[10px] font-mono font-bold text-brand-green/80 group-hover:text-brand-green group-hover:bg-brand-green/10 transition-all shrink-0 self-start md:self-auto">
                        {exp.years}
                      </div>
                    </div>

                    {/* Skill Tags */}
                    {exp.skills && (
                      <div className="flex flex-wrap gap-1.5 pl-6">
                        {exp.skills.map((skill, sIdx) => (
                          <span key={sIdx} className="px-2.5 py-0.5 bg-app-bg border border-app-border/60 rounded-full text-[9px] font-mono font-semibold text-app-text-muted/70 group-hover:text-brand-green group-hover:border-brand-green/20 transition-colors">
                            #{skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Highlights */}
                    {exp.highlights && (
                      <ul className="space-y-2 pl-6 pt-2 border-t border-app-border/30">
                        {exp.highlights.map((hl, hIdx) => (
                          <li key={hIdx} className="text-xs text-app-text-muted/80 leading-relaxed list-disc list-inside marker:text-brand-green/60">
                            {hl}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Collapsible area for remaining experiences */}
              <AnimatePresence>
                {showAllExperiences && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden space-y-4"
                  >
                    {experiences.slice(5).map((exp, i) => (
                      <motion.div 
                        key={i + 5}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="group relative"
                      >
                        <div className="p-6 bg-app-surface/30 border border-app-border/50 rounded-2xl hover:bg-app-surface/60 hover:border-brand-green/10 transition-all duration-300">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-app-text-muted/30 group-hover:bg-brand-green/50 transition-colors" />
                              <div>
                                <h5 translate="no" className="text-sm font-bold text-app-text-muted group-hover:text-app-text transition-colors">
                                  {exp.name}
                                </h5>
                                <p className="text-xs text-app-text-muted/50 italic">{exp.role}</p>
                              </div>
                            </div>
                            <div className="text-[10px] font-mono text-app-text-muted/40 shrink-0 self-start sm:self-auto pl-4 sm:pl-0">
                              {exp.years}
                            </div>
                          </div>
                          
                          {exp.skills && (
                            <div className="flex flex-wrap gap-1 mt-3 pl-[18px]">
                              {exp.skills.map((skill, sIdx) => (
                                <span key={sIdx} className="px-2 py-0.5 bg-app-bg border border-app-border/40 rounded-full text-[8px] font-mono text-app-text-muted/60">
                                  #{skill}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Expand Toggle Button */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => {
                    setShowAllExperiences(!showAllExperiences);
                    if (soundsEnabled) playSound("click");
                  }}
                  className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-brand-green hover:text-black hover:border-brand-green transition-all"
                >
                  {showAllExperiences ? "Ver menos trayectoria" : `Ver trayectoria completa (+${experiences.length - 5} puestos)`}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 h-full">
            <div className="sticky top-32 space-y-6">
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-2xl font-display font-black uppercase tracking-widest shrink-0">Skills</h2>
                <div className="h-[1px] bg-white/10 flex-grow" />
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {skillCards.map((skill, i) => (
                  <motion.div 
                    key={skill.name}
                    className="group bg-app-surface/80 border border-app-border p-6 rounded-[2rem] hover:bg-app-surface transition-all relative overflow-hidden shadow-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex justify-between items-center mb-4">
                       <div className="flex items-center gap-3">
                          <div className="text-brand-green opacity-80 group-hover:opacity-100 transition-opacity">{skill.icon}</div>
                          <span className="text-sm font-bold tracking-tight uppercase text-app-text-muted group-hover:text-app-text transition-colors">{skill.name}</span>
                       </div>
                       <span translate="no" className="text-xs font-mono font-bold text-brand-green">{skill.value}%</span>
                    </div>
                    
                    <div className="h-1.5 w-full bg-app-bg/50 rounded-full overflow-hidden mb-4 border border-app-border">
                       <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.value}%` }}
                          transition={{ duration: 1, ease: "circOut" }}
                          className="h-full bg-brand-green shadow-[0_0_10px_rgba(34,197,94,0.3)]"
                       />
                    </div>

                    {/* Tooltip on hover */}
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      whileHover={{ opacity: 1, height: "auto" }}
                      className="overflow-hidden"
                    >
                      <p className="text-[11px] leading-relaxed text-app-text-muted/70 font-medium italic pt-2 border-t border-app-border">
                        {skill.description}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="bg-app-surface border border-app-border p-10 rounded-[2.5rem] mt-8 relative overflow-hidden shadow-xl"
              >
                  <div className="relative z-10">
                    <p className="text-xs font-bold text-app-text-muted opacity-60 uppercase tracking-widest mb-4">¿Por qué yo?</p>
                    <p className="text-lg font-medium leading-relaxed">
                      Además del trabajo operativo, puedo colaborar en <span className="text-brand-green">digitalización, organización interna, optimización de procesos</span> y adopción de herramientas tecnológicas simples.
                    </p>
                  </div>
                  <Cpu className="absolute -bottom-8 -right-8 opacity-5 text-brand-green" size={160} />
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-24 border-t border-app-border py-12 px-6 bg-app-surface"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex flex-col items-center md:items-start gap-2">
             <span translate="no" className="font-display font-black text-2xl tracking-tighter notranslate">CV LUCAS</span>
             <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30 italic">Partido de Pinamar · 2026</p>
           </div>
           
           <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.3em]">
              <a href="mailto:Ale.2020.caba@gmail.com" className="hover:text-brand-green transition-colors py-2 border-b border-transparent hover:border-brand-green">Email</a>
              <a href="https://wa.me/5492254535810" className="hover:text-brand-green transition-colors py-2 border-b border-transparent hover:border-brand-green text-app-text-muted">WhatsApp</a>
           </div>
        </div>
      </motion.footer>
    </div>
  );
}

function QRPage() {
  const url = "https://curr-culum-theta.vercel.app/";

  return (
    <div className="min-h-screen bg-app-bg text-app-text flex flex-col items-center justify-center p-6 selection:bg-brand-green/30 relative overflow-hidden">
      <MatrixRain />
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-lg px-8 py-5 bg-app-surface/30 backdrop-blur-2xl border border-app-border rounded-3xl flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-brand-green transition-colors">
          <ArrowLeft size={16} /> Volver
        </Link>
        <span className="font-display font-black text-sm tracking-[0.2em] uppercase">QR CV</span>
      </nav>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-app-surface border border-app-border rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 text-center relative overflow-hidden shadow-2xl"
      >
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-display font-black tracking-tighter mb-4 italic">ACCESO <span className="text-brand-green">DIRECTO</span></h2>
          <p className="text-app-text-muted text-xs md:text-sm font-medium mb-8 md:mb-12">Escanea el código para ver mi trayectoria completa y portafolio digital.</p>
          
          <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl inline-block shadow-[0_0_50px_rgba(34,197,94,0.15)] mb-8 md:mb-12 border border-app-border">
            <QRCodeSVG 
              value={url} 
              size={200} 
              level="H"
              includeMargin={false}
              fgColor="#000000"
              className="w-full h-auto max-w-[200px] md:max-w-[240px]"
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-center gap-4 text-xs font-mono text-neutral-400">
               <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
               {url}
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigator.clipboard.writeText(url)}
              className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-green hover:text-black transition-all"
            >
              Copiar Enlace
            </motion.button>
          </div>
        </div>

        {/* Background Gradients */}
        <div className="absolute -bottom-1/2 -left-1/4 w-[400px] h-[400px] bg-brand-green/10 blur-[100px] rounded-full" />
        <div className="absolute -top-1/2 -right-1/4 w-[400px] h-[400px] bg-brand-green/5 blur-[100px] rounded-full" />
      </motion.div>

      <footer className="mt-12 text-center space-y-4">
        <div className="text-[9px] font-mono text-matrix-green/40">&gt; System initialized. Matrix connection stable.</div>
        <p translate="no" className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30 italic notranslate">Lucas Barrera · Digital Asset</p>
      </footer>
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" onFinished={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/qr" element={<QRPage />} />
          </Routes>
        </motion.div>
      )}
    </BrowserRouter>
  );
}
