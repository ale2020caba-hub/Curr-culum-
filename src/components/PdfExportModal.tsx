import React, { useRef, useState } from "react";
import { X, Download, Printer, Check, Loader2, FileText, Sparkles, ExternalLink } from "lucide-react";
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
  const pdfTemplateRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleDownloadPdf = async () => {
    if (!pdfTemplateRef.current) return;
    setIsGenerating(true);
    setIsSuccess(false);

    try {
      const element = pdfTemplateRef.current;
      const opt = {
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename: "CV_Lucas_Barrera.pdf",
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true, 
          letterRendering: true,
          logging: false 
        },
        jsPDF: { unit: "mm" as const, format: "a4" as const, orientation: "portrait" as const },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] }
      };

      await html2pdf().set(opt).from(element).save();
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 4000);
    } catch (err) {
      console.error("Error generating PDF:", err);
      // Fallback to print dialog
      window.print();
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNativePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto notranslate" translate="no">
      <div className="relative w-full max-w-4xl bg-[#121417] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-8 text-white">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FileText size={20} />
            </div>
            <div>
              <h3 className="font-display font-black text-lg text-white">Descargar Currículum en PDF</h3>
              <p className="text-xs text-neutral-400">Documento profesional en formato estándar A4 listo para imprimir o enviar</p>
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

        {/* Modal Actions Bar */}
        <div className="p-6 bg-white/[0.01] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Formato optimizado con toda la trayectoria y casos de tráfico pago</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleNativePrint}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-xs font-bold transition-all"
            >
              <Printer size={15} />
              <span>Imprimir / Guardar PDF</span>
            </button>
            <button
              onClick={handleDownloadPdf}
              disabled={isGenerating}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-lg ${
                isSuccess
                  ? "bg-emerald-600 text-white shadow-emerald-500/20"
                  : "bg-emerald-500 text-black hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98] shadow-emerald-500/20"
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
                  <span>¡Descargado!</span>
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
        <div className="p-6 max-h-[60vh] overflow-y-auto bg-black/40 flex justify-center">
          <div className="w-full max-w-[720px] shadow-2xl rounded-xl overflow-hidden border border-neutral-800">
            
            {/* The actual Printable / PDF element */}
            <div
              ref={pdfTemplateRef}
              id="cv-pdf-document"
              className="bg-white text-neutral-900 p-10 sm:p-12 font-sans text-xs leading-relaxed"
              style={{
                color: "#1f2937",
                backgroundColor: "#ffffff",
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                lineHeight: "1.45",
              }}
            >
              {/* Header */}
              <div className="border-b-2 border-emerald-500 pb-5 mb-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h1 className="text-3xl font-black tracking-tight text-black m-0 uppercase font-sans">
                      Lucas Barrera
                    </h1>
                    <p className="text-sm font-bold text-emerald-700 mt-1 uppercase tracking-wide">
                      Media Buyer & Especialista en Tráfico Pago | Operaciones y Ventas
                    </p>
                  </div>
                  <div className="text-right text-[11px] text-neutral-600 space-y-0.5">
                    <p className="font-semibold text-neutral-900">Pinamar / CABA, Argentina</p>
                    <p>Tel: +54 9 2254 53-5810</p>
                    <p>Email: Ale.2020.caba@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Perfil Profesional */}
              <div className="mb-6">
                <h2 className="text-xs font-black uppercase tracking-wider text-emerald-800 border-b border-neutral-200 pb-1 mb-2">
                  Perfil Profesional
                </h2>
                <p className="text-neutral-700 text-xs leading-relaxed">
                  Profesional con destacada trayectoria en atención personalizada, operaciones dinámicas en entornos de alta exigencia y gestión estratégica de tráfico pago (Google & Meta Ads). Con sólida capacidad de adaptación, enfoque resolutivo y orientación a resultados, combino la empatía comercial con la agilidad analítica para maximizar el valor de cada interacción y proyecto.
                </p>
              </div>

              {/* Competencias Clave */}
              <div className="mb-6">
                <h2 className="text-xs font-black uppercase tracking-wider text-emerald-800 border-b border-neutral-200 pb-1 mb-2">
                  Competencias & Habilidades
                </h2>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-800">
                  <div>
                    <p className="font-semibold text-black">• Publicidad Digital:</p>
                    <p className="text-neutral-600 pl-3">Meta Ads Manager, Google Search, RSA, Remarketing, Audiencias.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-black">• Gestión Comercial:</p>
                    <p className="text-neutral-600 pl-3">Atención al cliente, ventas inmobiliarias, calificación de leads, CRM.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-black">• Habilidades Interpersonales:</p>
                    <p className="text-neutral-600 pl-3">Resolución de conflictos, trabajo bajo presión, comunicación efectiva.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-black">• Operaciones & Servicios:</p>
                    <p className="text-neutral-600 pl-3">Manejo de valores y arqueo, barismo de especialidad, coctelería.</p>
                  </div>
                </div>
              </div>

              {/* Experiencia Laboral */}
              <div className="mb-6">
                <h2 className="text-xs font-black uppercase tracking-wider text-emerald-800 border-b border-neutral-200 pb-1 mb-3">
                  Experiencia Laboral
                </h2>
                
                <div className="space-y-4">
                  {experiences.map((exp, idx) => (
                    <div key={idx} className="break-inside-avoid">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-[12px] font-bold text-neutral-900">
                          {exp.name} <span className="font-normal text-neutral-600 italic">| {exp.role}</span>
                        </h3>
                        <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {exp.years}
                        </span>
                      </div>
                      
                      {exp.skills && exp.skills.length > 0 && (
                        <p className="text-[10px] font-medium text-emerald-800 mt-0.5">
                          Herramientas/Enfoque: {exp.skills.join(" • ")}
                        </p>
                      )}

                      {exp.highlights && exp.highlights.length > 0 && (
                        <ul className="list-disc list-inside text-[10.5px] text-neutral-700 mt-1 space-y-0.5 pl-1">
                          {exp.highlights.map((hl, hIdx) => (
                            <li key={hIdx}>{hl}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Casos de Éxito en Tráfico Pago */}
              <div className="mb-4 break-inside-avoid">
                <h2 className="text-xs font-black uppercase tracking-wider text-emerald-800 border-b border-neutral-200 pb-1 mb-3">
                  Casos de Estudio & Proyectos Destacados
                </h2>
                <div className="space-y-3">
                  {campaignCases.map((c) => (
                    <div key={c.id} className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 break-inside-avoid">
                      <div className="flex justify-between items-baseline">
                        <p className="font-bold text-[11px] text-neutral-900">{c.title}</p>
                        <span className="text-[9px] font-mono font-bold text-neutral-500">{c.platform}</span>
                      </div>
                      <p className="text-[10px] text-neutral-600 mt-0.5">
                        <strong className="text-neutral-800">Objetivo:</strong> {c.objective}
                      </p>
                      <p className="text-[10px] text-neutral-600 mt-0.5">
                        <strong className="text-neutral-800">Estrategia:</strong> {c.strategy}
                      </p>
                      {c.deliverables && (
                        <ul className="list-disc list-inside text-[9.5px] text-neutral-600 mt-1 space-y-0.5">
                          {c.deliverables.slice(0, 2).map((del, dIdx) => (
                            <li key={dIdx}>{del}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer / Nota */}
              <div className="pt-4 border-t border-neutral-200 flex justify-between items-center text-[9px] text-neutral-500">
                <span>Lucas Barrera - Currículum Vitae</span>
                <span>Contacto directo: +54 9 2254 53-5810 | Ale.2020.caba@gmail.com</span>
              </div>

            </div>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-4 bg-white/[0.02] border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
          <span>Tip: También puedes utilizar la función de impresión directa de tu navegador presionando <strong>Ctrl + P</strong> o <strong>Cmd + P</strong>.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-neutral-300 transition-colors"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
