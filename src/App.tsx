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
  BarChart3
} from "lucide-react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";

import MatrixRain from "./MatrixRain";
import LoadingScreen from "./components/LoadingScreen";

// Hook to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const experiences = [
  { name: "Casa Fabric", role: "Staff (Temporada)", years: "2024 - 2025" },
  { name: "M&M Propiedades", role: "Asesor de ventas, desarrollo de sistemas y segmentación de publicidad", years: "2023 - 2024" },
  { name: "Fabric Sushi Madero", role: "Camarero (Uruguay / MVD)", years: "2023" },
  { name: "Tienda Café", role: "Barista", years: "2023" },
  { name: "Coto", role: "Cajero (Temporada)", years: "2023" },
  { name: "Fabric Sushi Pinamar", role: "Bartender / Camarero", years: "2021-2023" },
  { name: "Garden Suites", role: "Camarero", years: "2022" },
  { name: "Tostado Café Club", role: "Barista", years: "2021-2022" },
  { name: "Fuegos", role: "Bartender", years: "2020-2021" },
  { name: "Café Martínez", role: "Barista", years: "2020-2021" },
  { name: "Botavara Club del Mar", role: "Barman / Barista", years: "2020" },
  { name: "Pueblo Limite / Lebrique", role: "RRPP / Barman", years: "2016-2020" },
  { name: "Munchi's", role: "Atención / Reposición", years: "2018-2019" },
  { name: "McDonald's", role: "Staff Operativo", years: "2016-2019" },
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

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-brand-green/30 pb-24 relative overflow-hidden">
      <MatrixRain />
      <div className="fixed inset-x-0 bottom-0 h-full w-full scanline-overlay pointer-events-none z-50 mix-blend-overlay opacity-50" />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-green z-50 origin-left"
        style={{ scaleX }}
      />

      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-5xl px-8 py-5 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl flex justify-between items-center shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center">
            <span className="text-black font-black text-xs">LB</span>
          </div>
          <span translate="no" className="font-display font-black text-sm tracking-[0.2em] uppercase">Lucas Barrera</span>
        </div>
        <div className="flex gap-3 md:gap-4">
          <Link to="/qr" title="Ver QR" className="flex items-center justify-center w-10 md:w-12 h-10 md:h-12 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all text-neutral-400 hover:text-white">
            <QrCode size={20} />
          </Link>
          <a href="https://wa.me/5492254535810" target="_blank" rel="noopener noreferrer" title="Contactar por WhatsApp" className="flex items-center justify-center w-10 md:w-12 h-10 md:h-12 bg-brand-green text-black rounded-xl hover:scale-105 active:scale-95 transition-all">
            <WhatsAppIcon size={22} />
          </a>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-32 md:pt-40 pb-12">
        
        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mb-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-12 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-24 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16"
          >
            <div className="relative z-10 max-w-3xl w-full">
              <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-6 md:mb-8">
                <span className="px-3 md:px-4 py-1 md:py-1.5 bg-white/5 text-neutral-400 text-[9px] md:text-[10px] font-bold tracking-widest rounded-full border border-white/10 uppercase">Pinamar, Argentina</span>
                <div className="flex items-center gap-2 px-2.5 md:px-3 py-1 bg-brand-green/10 rounded-full border border-brand-green/20">
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brand-green animate-pulse" />
                  <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-brand-green">Disponible</span>
                </div>
              </div>
              <h1 translate="no" className="text-5xl sm:text-7xl lg:text-[9rem] font-display font-black leading-[0.85] tracking-tight mb-8 md:mb-12 break-words text-glow">
                LUCAS <br />
                <span className="text-matrix-green/30">BARRERA</span>
              </h1>
              <p className="text-lg md:text-2xl text-neutral-400 font-light max-w-xl leading-relaxed">
                Comprometido con crear <span className="text-white font-medium">conexiones reales</span> a través del servicio. Combino la empatía de la atención personalizada con la agilidad digital para superar expectativas en cada detalle.
              </p>
            </div>

            <div className="relative z-10 flex flex-col gap-6 md:gap-8 w-full md:w-auto md:min-w-[320px]">
              <div className="p-6 md:p-8 bg-white/[0.02] border border-white/5 rounded-2xl md:rounded-3xl backdrop-blur-xl">
                 <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-brand-green mb-4 md:mb-6">Información</p>
                 <div className="space-y-4">
                    <a href="mailto:Ale.2020.caba@gmail.com" className="flex flex-col group/item transition-colors hover:bg-white/5 p-2 rounded-xl -m-2">
                       <span className="text-[9px] md:text-[10px] font-bold text-neutral-600 uppercase tracking-widest mb-1 italic">Mail</span>
                       <span className="text-xs md:text-sm font-mono text-neutral-200 group-hover/item:text-brand-green transition-colors break-all">Ale.2020.caba@gmail.com</span>
                    </a>
                    <a href="tel:5492254535810" className="flex flex-col group/item transition-colors hover:bg-white/5 p-2 rounded-xl -m-2">
                       <span className="text-[9px] md:text-[10px] font-bold text-neutral-600 uppercase tracking-widest mb-1 italic">Teléfono</span>
                       <span className="text-xs md:text-sm font-mono text-neutral-200 group-hover/item:text-brand-green transition-colors">2254 53-5810</span>
                    </a>
                 </div>
              </div>
              <a href="https://wa.me/5492254535810" target="_blank" rel="noopener noreferrer" className="w-full h-16 md:h-20 bg-brand-green text-black rounded-2xl md:rounded-[2rem] flex items-center justify-center gap-3 md:gap-4 font-black uppercase tracking-widest text-xs md:text-sm hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all group">
                <WhatsAppIcon size={20} className="md:w-6 md:h-6" />
                <span>Contactar Ahora</span>
                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>

            {/* Background Gradient */}
            <div className="absolute -top-1/2 -right-1/4 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-brand-green/10 blur-[120px] md:blur-[160px] rounded-full pointer-events-none" />
          </motion.div>
        </div>

        {/* BENTO GRID ROW */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mb-6">
          {/* Vision */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-12 lg:col-span-7 bg-[#0a0a0a] border border-white/5 rounded-3xl md:rounded-[3rem] p-8 md:p-12 flex flex-col justify-center group relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-6 md:p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                <Briefcase size={80} className="w-16 h-16 md:w-20 md:h-20" />
             </div>
             <h3 className="text-brand-green text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-6 md:mb-10">Visión Proactiva</h3>
             <p className="text-xl md:text-3xl leading-snug text-neutral-200 font-light italic">
               "Liderazgo operativo con <span className="text-white font-medium italic">mentalidad digital</span>: transformando la atención al cliente a través de procesos inteligentes."
             </p>
          </motion.div>

          {/* Languages */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-12 lg:col-span-5 bg-[#0a0a0a] border border-white/5 rounded-3xl md:rounded-[3rem] p-8 md:p-12 flex flex-col justify-between hover:border-brand-green/30 transition-all duration-500 group"
          >
             <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-brand-green group-hover:text-black transition-all mb-8 lg:mb-0">
                <Globe size={28} className="w-6 h-6 md:w-7 md:h-7" />
             </div>
             <div className="space-y-4">
               <h4 className="font-display font-black text-xl md:text-2xl uppercase tracking-tighter italic">Idiomas</h4>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                 <div className="p-4 bg-white/5 rounded-xl md:rounded-2xl border border-white/5">
                    <p className="text-[9px] md:text-[10px] font-black text-brand-green uppercase tracking-widest mb-1">Español</p>
                    <p className="text-xs font-bold text-neutral-400">Nativo</p>
                 </div>
                 <div className="p-4 bg-white/5 rounded-xl md:rounded-2xl border border-white/5">
                    <p className="text-[9px] md:text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1">Inglés</p>
                    <p className="text-xs font-bold text-neutral-400">Competente</p>
                 </div>
               </div>
             </div>
          </motion.div>
        </div>

        {/* EXPERIENCE & SKILLS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-2xl font-display font-black uppercase tracking-widest shrink-0">Trayectoria</h2>
              <div className="h-[1px] bg-white/10 flex-grow" />
            </div>

            <div className="space-y-4">
              {experiences.map((exp, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] -z-10 blur-xl" />
                  <div className="flex flex-col md:flex-row md:items-center justify-between p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-white/[0.05] hover:border-brand-green/30 transition-all duration-500 backdrop-blur-sm">
                    <div className="flex items-start gap-6">
                      <div className="mt-1 w-2 h-2 rounded-full bg-brand-green opacity-40 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500" />
                      <div className="flex flex-col">
                        <h4 translate="no" className="text-xl font-bold tracking-tight text-neutral-300 group-hover:text-white transition-colors">
                          {exp.name}
                        </h4>
                        <p className="text-sm font-medium text-neutral-500 italic mt-1 group-hover:text-neutral-400 transition-colors">
                          {exp.role}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 md:mt-0 flex items-center gap-4">
                      <div className="px-4 py-1.5 bg-brand-green/5 border border-brand-green/10 rounded-full text-[10px] font-mono font-bold text-brand-green/80 group-hover:text-brand-green transition-colors">
                        {exp.years}
                      </div>
                      <ArrowUpRight className="text-neutral-600 group-hover:text-brand-green group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" size={18} />
                    </div>
                  </div>
                </motion.div>
              ))}
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
                    className="group bg-neutral-900/40 border border-white/5 p-6 rounded-[2rem] hover:bg-neutral-900/60 transition-all relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex justify-between items-center mb-4">
                       <div className="flex items-center gap-3">
                          <div className="text-brand-green opacity-80 group-hover:opacity-100 transition-opacity">{skill.icon}</div>
                          <span className="text-sm font-bold tracking-tight uppercase text-neutral-300 group-hover:text-white transition-colors">{skill.name}</span>
                       </div>
                       <span className="text-xs font-mono font-bold text-brand-green">{skill.value}%</span>
                    </div>
                    
                    <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden mb-4">
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
                      <p className="text-[11px] leading-relaxed text-neutral-500 font-medium italic pt-2 border-t border-white/5">
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
                className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] mt-8 relative overflow-hidden"
              >
                  <div className="relative z-10">
                    <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">¿Por qué yo?</p>
                    <p className="text-lg font-medium leading-relaxed">
                      Especializado en operaciones que requieren <span className="text-brand-green">rapidez y precisión</span>, con el valor agregado de un perfil tecnológico orientado a la digitalización de procesos.
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
        className="mt-24 border-t border-white/5 py-12 px-6 bg-[#0a0a0a]"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex flex-col items-center md:items-start gap-2">
             <span className="font-display font-black text-2xl tracking-tighter">CV LUCAS</span>
             <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30">Partido de Pinamar · 2026</p>
           </div>
           
           <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.3em]">
              <a href="mailto:Ale.2020.caba@gmail.com" className="hover:text-brand-green transition-colors py-2 border-b border-transparent hover:border-brand-green">Email</a>
              <a href="https://wa.me/5492254535810" className="hover:text-brand-green transition-colors py-2 border-b border-transparent hover:border-brand-green">WhatsApp</a>
           </div>
        </div>
      </motion.footer>
    </div>
  );
}

function QRPage() {
  const url = "https://curr-culum-theta.vercel.app/";

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 selection:bg-brand-green/30 relative overflow-hidden">
      <MatrixRain />
      <div className="fixed inset-x-0 bottom-0 h-full w-full scanline-overlay pointer-events-none z-50 mix-blend-overlay opacity-30" />
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-lg px-8 py-5 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-brand-green transition-colors">
          <ArrowLeft size={16} /> Volver
        </Link>
        <span className="font-display font-black text-sm tracking-[0.2em] uppercase">QR CV</span>
      </nav>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 text-center relative overflow-hidden"
      >
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-display font-black tracking-tighter mb-4 italic">ACCESO <span className="text-brand-green">DIRECTO</span></h2>
          <p className="text-neutral-500 text-xs md:text-sm font-medium mb-8 md:mb-12">Escanea el código para ver mi trayectoria completa y portafolio digital.</p>
          
          <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl inline-block shadow-[0_0_50px_rgba(34,197,94,0.15)] mb-8 md:mb-12">
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
        <p translate="no" className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30 italic">Lucas Barrera · Digital Asset</p>
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
