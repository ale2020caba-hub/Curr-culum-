import { motion, useScroll, useSpring } from "motion/react";
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
  Cpu
} from "lucide-react";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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
    { name: "Atención al público", value: 90, icon: <User size={20} /> },
    { name: "Trabajo en equipo", value: 92, icon: <Globe size={20} /> },
    { name: "Responsabilidad", value: 95, icon: <Briefcase size={20} /> },
    { name: "Comunicación", value: 88, icon: <MessageCircle size={20} /> },
    { name: "Desarrollo Software", value: 88, icon: <Code size={20} /> },
    { name: "Inteligencia Artificial", value: 83, icon: <Cpu size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-brand-green/30">
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
          <span className="font-display font-black text-sm tracking-[0.2em] uppercase">Lucas Barrera</span>
        </div>
        <div className="flex gap-4">
          <a href="https://wa.me/5492254535810" className="text-[10px] font-bold uppercase tracking-widest px-6 py-2.5 bg-brand-green text-black rounded-xl hover:scale-105 transition-all">WhatsApp</a>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-40 pb-24">
        
        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-12 bg-[#0a0a0a] border border-white/5 rounded-[3.5rem] p-12 md:p-24 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-16"
          >
            <div className="relative z-10 max-w-3xl">
              <div className="flex items-center gap-4 mb-8">
                <span className="px-4 py-1.5 bg-white/5 text-neutral-400 text-[10px] font-bold tracking-widest rounded-full border border-white/10 uppercase">Pinamar, Argentina</span>
                <div className="flex items-center gap-2 px-3 py-1 bg-brand-green/10 rounded-full border border-brand-green/20">
                  <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-brand-green">Disponible</span>
                </div>
              </div>
              <h1 className="text-7xl md:text-[9rem] font-display font-black leading-[0.85] tracking-tight mb-12">
                LUCAS <br />
                <span className="text-white/20">BARRERA</span>
              </h1>
              <p className="text-xl md:text-2xl text-neutral-400 font-light max-w-xl leading-relaxed">
                Especialista en <span className="text-white font-medium">Experiencia Cliente Premium</span> y Estrategias Digitales de Alto Rendimiento.
              </p>
            </div>

            <div className="relative z-10 flex flex-col gap-8 w-full md:w-auto md:min-w-[300px]">
              <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-xl">
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-green mb-6">Información</p>
                 <div className="space-y-4">
                    <a href="mailto:Ale.2020.caba@gmail.com" className="flex flex-col group/item transition-colors hover:bg-white/5 p-2 rounded-xl -m-2">
                       <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest mb-1 italic">Mail</span>
                       <span className="text-sm font-mono text-neutral-200 group-hover/item:text-brand-green transition-colors">Ale.2020.caba@gmail.com</span>
                    </a>
                    <a href="tel:5492254535810" className="flex flex-col group/item transition-colors hover:bg-white/5 p-2 rounded-xl -m-2">
                       <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest mb-1 italic">Teléfono</span>
                       <span className="text-sm font-mono text-neutral-200 group-hover/item:text-brand-green transition-colors">2254 53-5810</span>
                    </a>
                 </div>
              </div>
              <a href="https://wa.me/5492254535810" target="_blank" rel="noopener noreferrer" className="w-full h-20 bg-brand-green text-black rounded-[2rem] flex items-center justify-center gap-4 font-black uppercase tracking-widest text-sm hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all group">
                Contactar Ahora
                <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>

            {/* Background Gradient */}
            <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-brand-green/10 blur-[160px] rounded-full" />
          </motion.div>
        </div>

        {/* BENTO GRID ROW */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
          {/* Vision */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-7 bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-12 flex flex-col justify-center group relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                <Briefcase size={80} />
             </div>
             <h3 className="text-brand-green text-[10px] font-black uppercase tracking-[0.4em] mb-10">Visión Proactiva</h3>
             <p className="text-2xl md:text-3xl leading-snug text-neutral-200 font-light italic">
               "Liderazgo operativo con <span className="text-white font-medium italic">mentalidad digital</span>: transformando la atención al cliente a través de procesos inteligentes."
             </p>
          </motion.div>

          {/* Languages */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-5 bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-12 flex flex-col justify-between hover:border-brand-green/30 transition-all duration-500 group"
          >
             <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-brand-green group-hover:text-black transition-all">
                <Globe size={28} />
             </div>
             <div className="space-y-4">
               <h4 className="font-display font-black text-2xl uppercase tracking-tighter italic">Idiomas</h4>
               <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] font-black text-brand-green uppercase tracking-widest mb-1">Español</p>
                    <p className="text-xs font-bold text-neutral-400">Nativo</p>
                 </div>
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1">Inglés</p>
                    <p className="text-xs font-bold text-neutral-400">Competente</p>
                 </div>
               </div>
             </div>
          </motion.div>
        </div>



        {/* EXPERIENCE & SKILLS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          
          {/* Experience List */}
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
                        <h4 className="text-xl font-bold tracking-tight text-neutral-300 group-hover:text-white transition-colors">
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

          {/* Skills / Right Column */}
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
                    className="bg-neutral-900/40 border border-white/5 p-6 rounded-[2rem] hover:bg-neutral-900/60 transition-colors"
                  >
                    <div className="flex justify-between items-center mb-4">
                       <div className="flex items-center gap-3">
                          <div className="text-brand-green opacity-80">{skill.icon}</div>
                          <span className="text-sm font-bold tracking-tight uppercase text-neutral-300">{skill.name}</span>
                       </div>
                       <span className="text-xs font-mono font-bold text-brand-green">{skill.value}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden">
                       <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.value}%` }}
                          transition={{ duration: 1, ease: "circOut" }}
                          className="h-full bg-brand-green"
                       />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Extra Info Card */}
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
        className="border-t border-white/5 py-12 px-6 bg-neutral-900/20"
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
