import React, { useRef, useState } from "react";
import { X, Download, Printer, Check, Loader2, FileText, Sparkles, Eye, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";
// @ts-ignore
import html2pdf from "html2pdf.js";

interface PdfExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  experiences: Array<{
    name: string;
    role: string;
    years: string;
    skills?: string[];
    highlights?: string[];
  }>;
  campaignCases: Array<{
    id: string;
    title: string;
    client: string;
    platform: string;
    budget: string;
    objective: string;
    strategy: string;
    audience: string;
    deliverables: string[];
  }>;
}

export const PdfExportModal: React.FC<PdfExportModalProps> = ({
  isOpen,
  onClose,
  experiences,
  campaignCases,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [pdfTheme, setPdfTheme] = useState<"ats-clean" | "tech-dark">("ats-clean");
  const [includeCases, setIncludeCases] = useState(true);
  const pdfTemplateRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleDownloadPdf = async () => {
    if (!pdfTemplateRef.current) return;
    setIsGenerating(true);
    setIsSuccess(false);

    try {
      const element = pdfTemplateRef.current;
      const opt = {
        margin: [8, 8, 8, 8] as [number, number, number, number],
        filename: `CV_Lucas_Barrera_${pdfTheme === "ats-clean" ? "Ejecutivo" : "Tech"}.pdf`,
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true, 
          letterRendering: true,
          logging: false,
          backgroundColor: pdfTheme === "tech-dark" ? "#0b0d0e" : "#ffffff"
        },
        jsPDF: { unit: "mm" as const, format: "a4" as const, orientation: "portrait" as const },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] }
      };

      await html2pdf().set(opt).from(element).save();
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 4000);
    } catch (err) {
      console.error("Error generating PDF:", err);
      window.print();
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNativePrint = () => {
    window.print();
  };

  const isDark = pdfTheme === "tech-dark";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto notranslate" translate="no">
      <div className="relative w-full max-w-5xl bg-[#0f1115] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-auto text-white">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-green/20 border border-brand-green/40 flex items-center justify-center text-brand-green">
              <FileText size={20} />
            </div>
            <div>
              <h3 className="font-display font-black text-lg text-white">Descargar Currículum en PDF</h3>
              <p className="text-xs text-neutral-400">Diseñado con estructura ejecutiva para postulaciones laborales, reclutadores y ATS</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
            title="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Controls Bar */}
        <div className="p-4 sm:p-6 bg-white/[0.015] border-b border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Style Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-neutral-400 mr-1">Estilo de PDF:</span>
            <button
              onClick={() => setPdfTheme("ats-clean")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                pdfTheme === "ats-clean"
                  ? "bg-white text-black border-white shadow-md"
                  : "bg-white/5 text-neutral-400 border-white/10 hover:text-white"
              }`}
            >
              Clásico Ejecutivo (A4 Blanco)
            </button>
            <button
              onClick={() => setPdfTheme("tech-dark")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                pdfTheme === "tech-dark"
                  ? "bg-brand-green text-black border-brand-green shadow-md shadow-brand-green/20 font-black"
                  : "bg-white/5 text-neutral-400 border-white/10 hover:text-white"
              }`}
            >
              Tech / Cyber Dark
            </button>

            <label className="flex items-center gap-2 ml-2 text-xs text-neutral-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeCases}
                onChange={(e) => setIncludeCases(e.target.checked)}
                className="rounded border-white/20 text-brand-green focus:ring-brand-green"
              />
              <span>Incluir Casos de Tráfico Pago</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleNativePrint}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-xs font-bold transition-all"
            >
              <Printer size={15} />
              <span className="hidden sm:inline">Imprimir</span>
            </button>
            <button
              onClick={handleDownloadPdf}
              disabled={isGenerating}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-lg ${
                isSuccess
                  ? "bg-emerald-600 text-white shadow-emerald-500/20"
                  : "bg-brand-green text-black hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98] shadow-brand-green/20"
              }`}
            >
              {isGenerating ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Generando PDF...</span>
                </>
              ) : isSuccess ? (
                <>
                  <Check size={16} />
                  <span>¡PDF Descargado!</span>
                </>
              ) : (
                <>
                  <Download size={16} />
                  <span>Descargar Archivo PDF</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Document Preview Frame */}
        <div className="p-4 sm:p-6 max-h-[62vh] overflow-y-auto bg-black/50 flex justify-center">
          <div className="w-full max-w-[760px] shadow-2xl rounded-2xl overflow-hidden border border-neutral-800">
            
            {/* The Printable / PDF Document Canvas */}
            <div
              ref={pdfTemplateRef}
              id="cv-pdf-document"
              className={`p-8 sm:p-10 font-sans text-xs leading-relaxed transition-colors duration-300 ${
                isDark ? "bg-[#0b0d0e] text-neutral-200" : "bg-white text-neutral-900"
              }`}
              style={{
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                lineHeight: "1.45",
              }}
            >
              {/* Header */}
              <div className={`pb-4 mb-5 border-b-2 ${isDark ? "border-[#22c55e]" : "border-emerald-600"}`}>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
                  <div>
                    <h1 className={`text-2xl sm:text-3xl font-black tracking-tight uppercase m-0 ${isDark ? "text-white" : "text-neutral-900"}`}>
                      Lucas Barrera
                    </h1>
                    <p className={`text-xs sm:text-sm font-bold uppercase tracking-wider mt-1 ${isDark ? "text-[#22c55e]" : "text-emerald-700"}`}>
                      Media Buyer & Especialista en Tráfico Pago | Operaciones y Ventas
                    </p>
                  </div>
                  
                  <div className={`text-left sm:text-right text-[10.5px] space-y-0.5 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                    <p className={`font-semibold flex items-center sm:justify-end gap-1 ${isDark ? "text-neutral-200" : "text-neutral-900"}`}>
                      <MapPin size={11} className={isDark ? "text-[#22c55e]" : "text-emerald-600"} />
                      <span>Pinamar / CABA, Argentina</span>
                    </p>
                    <p className="flex items-center sm:justify-end gap-1">
                      <Phone size={11} className={isDark ? "text-[#22c55e]" : "text-emerald-600"} />
                      <span>+54 9 2254 53-5810</span>
                    </p>
                    <p className="flex items-center sm:justify-end gap-1">
                      <Mail size={11} className={isDark ? "text-[#22c55e]" : "text-emerald-600"} />
                      <span>Ale.2020.caba@gmail.com</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Perfil Profesional */}
              <div className="mb-5">
                <h2 className={`text-[11px] font-black uppercase tracking-wider border-b pb-1 mb-2 ${
                  isDark ? "text-[#22c55e] border-neutral-800" : "text-emerald-800 border-neutral-200"
                }`}>
                  Perfil Profesional
                </h2>
                <p className={`text-[11px] leading-relaxed ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                  Profesional con destacada trayectoria en atención personalizada, operaciones dinámicas en entornos de alta exigencia y gestión estratégica de tráfico pago (Google & Meta Ads). Con sólida capacidad de adaptación, enfoque resolutivo y orientación a resultados, combino la empatía comercial con la agilidad analítica para maximizar el valor de cada interacción y optimizar la adquisición de prospectos calificados.
                </p>
              </div>

              {/* Competencias Clave */}
              <div className="mb-5">
                <h2 className={`text-[11px] font-black uppercase tracking-wider border-b pb-1 mb-2 ${
                  isDark ? "text-[#22c55e] border-neutral-800" : "text-emerald-800 border-neutral-200"
                }`}>
                  Competencias & Habilidades Clave
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10.5px]">
                  <div className={`p-2 rounded border ${isDark ? "bg-white/[0.02] border-white/5" : "bg-neutral-50 border-neutral-200"}`}>
                    <p className={`font-bold ${isDark ? "text-white" : "text-black"}`}>• Tráfico Pago & Performance:</p>
                    <p className={`pl-2 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                      Meta Ads Manager, Google Search (RSA), Smart Bidding, Remarketing, Estructuración de Embudos (CBO/ABO).
                    </p>
                  </div>
                  <div className={`p-2 rounded border ${isDark ? "bg-white/[0.02] border-white/5" : "bg-neutral-50 border-neutral-200"}`}>
                    <p className={`font-bold ${isDark ? "text-white" : "text-black"}`}>• Gestión Comercial & Ventas:</p>
                    <p className={`pl-2 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                      Atención al cliente, ventas inmobiliarias, calificación de prospectos, seguimiento CRM y cierre comercial.
                    </p>
                  </div>
                  <div className={`p-2 rounded border ${isDark ? "bg-white/[0.02] border-white/5" : "bg-neutral-50 border-neutral-200"}`}>
                    <p className={`font-bold ${isDark ? "text-white" : "text-black"}`}>• Habilidades Interpersonales:</p>
                    <p className={`pl-2 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                      Resolución ágil de conflictos, trabajo bajo presión, comunicación asertiva, proactividad y liderazgo en equipo.
                    </p>
                  </div>
                  <div className={`p-2 rounded border ${isDark ? "bg-white/[0.02] border-white/5" : "bg-neutral-50 border-neutral-200"}`}>
                    <p className={`font-bold ${isDark ? "text-white" : "text-black"}`}>• Operaciones & Servicios:</p>
                    <p className={`pl-2 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                      Manejo de valores y arqueo de caja con cero discrepancias, barismo de especialidad, coctelería y servicio VIP.
                    </p>
                  </div>
                </div>
              </div>

              {/* Experiencia Laboral */}
              <div className="mb-5">
                <h2 className={`text-[11px] font-black uppercase tracking-wider border-b pb-1 mb-3 ${
                  isDark ? "text-[#22c55e] border-neutral-800" : "text-emerald-800 border-neutral-200"
                }`}>
                  Experiencia Laboral
                </h2>
                
                <div className="space-y-3.5">
                  {experiences.map((exp, idx) => (
                    <div key={idx} className="break-inside-avoid">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <h3 className={`text-[11.5px] font-bold ${isDark ? "text-white" : "text-neutral-900"}`}>
                          {exp.name} <span className={`font-normal italic ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>— {exp.role}</span>
                        </h3>
                        <span className={`text-[9.5px] font-mono font-bold px-2 py-0.5 rounded border shrink-0 self-start sm:self-auto ${
                          isDark 
                            ? "bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/30" 
                            : "bg-emerald-50 text-emerald-800 border-emerald-200"
                        }`}>
                          {exp.years}
                        </span>
                      </div>
                      
                      {exp.skills && exp.skills.length > 0 && (
                        <p className={`text-[9.5px] font-medium mt-0.5 ${isDark ? "text-[#22c55e]/80" : "text-emerald-700"}`}>
                          Herramientas/Enfoque: {exp.skills.join(" • ")}
                        </p>
                      )}

                      {exp.highlights && exp.highlights.length > 0 && (
                        <ul className={`list-disc list-inside text-[10px] mt-1 space-y-0.5 pl-1 ${
                          isDark ? "text-neutral-300" : "text-neutral-700"
                        }`}>
                          {exp.highlights.map((hl, hIdx) => (
                            <li key={hIdx} className="leading-snug">{hl}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Casos de Éxito en Tráfico Pago (Opcional) */}
              {includeCases && (
                <div className="mb-4 break-inside-avoid">
                  <h2 className={`text-[11px] font-black uppercase tracking-wider border-b pb-1 mb-3 ${
                    isDark ? "text-[#22c55e] border-neutral-800" : "text-emerald-800 border-neutral-200"
                  }`}>
                    Casos de Estudio & Proyectos en Tráfico Pago
                  </h2>
                  <div className="space-y-2.5">
                    {campaignCases.map((c) => (
                      <div 
                        key={c.id} 
                        className={`p-3 rounded-lg border break-inside-avoid ${
                          isDark ? "bg-white/[0.02] border-white/10" : "bg-neutral-50 border-neutral-200"
                        }`}
                      >
                        <div className="flex justify-between items-baseline">
                          <p className={`font-bold text-[10.5px] ${isDark ? "text-white" : "text-neutral-900"}`}>{c.title}</p>
                          <span className={`text-[9px] font-mono font-bold ${isDark ? "text-[#22c55e]" : "text-emerald-700"}`}>{c.platform}</span>
                        </div>
                        <p className={`text-[9.5px] mt-0.5 ${isDark ? "text-neutral-300" : "text-neutral-600"}`}>
                          <strong className={isDark ? "text-neutral-200" : "text-neutral-800"}>Objetivo:</strong> {c.objective}
                        </p>
                        <p className={`text-[9.5px] mt-0.5 ${isDark ? "text-neutral-300" : "text-neutral-600"}`}>
                          <strong className={isDark ? "text-neutral-200" : "text-neutral-800"}>Estrategia:</strong> {c.strategy}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer / Contacto */}
              <div className={`pt-3 mt-4 border-t flex flex-wrap justify-between items-center text-[9px] ${
                isDark ? "border-neutral-800 text-neutral-400" : "border-neutral-200 text-neutral-500"
              }`}>
                <span>Lucas Barrera — Currículum Vitae</span>
                <span>+54 9 2254 53-5810 | Ale.2020.caba@gmail.com | Pinamar / CABA</span>
              </div>

            </div>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-4 bg-white/[0.02] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-brand-green shrink-0" />
            <span>Documento adaptado con tipografía de alto contraste y estructura de lectura óptima.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-neutral-300 transition-colors shrink-0"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
