import React, { useEffect } from 'react';
import { ArrowLeft, CheckCircle2, Heart, Sparkles, ArrowRight, ShieldCheck, Calendar, Phone } from 'lucide-react';
import { SERVICE_LANDINGS } from '../../data/blogArticles';

interface CommercialLandingPageProps {
  slugKey: string;
  onNavigateBlog: () => void;
  onOpenConsulta: (format: 'online' | 'presencial' | 'insurance') => void;
}

export const CommercialLandingPage: React.FC<CommercialLandingPageProps> = ({
  slugKey,
  onNavigateBlog,
  onOpenConsulta,
}) => {
  const landing = SERVICE_LANDINGS[slugKey] || SERVICE_LANDINGS['nutricao-pet-online'];

  useEffect(() => {
    if (landing) {
      document.title = landing.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', landing.description);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [landing, slugKey]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-20 text-[#374151]">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 mb-8 text-left">
          <button
            onClick={onNavigateBlog}
            className="flex items-center gap-1.5 text-[#a338b9] hover:underline font-bold cursor-pointer border-none bg-transparent"
          >
            <ArrowLeft size={14} />
            <span>Voltar ao Blog</span>
          </button>
          <span>/</span>
          <span className="text-stone-800 font-bold">{landing.title.split('|')[0]}</span>
        </div>

        {/* Hero Card */}
        <div className="bg-gradient-to-br from-[#111827] via-[#1f293d] to-[#111827] text-white rounded-3xl p-8 md:p-12 shadow-xl text-left border border-stone-800 relative overflow-hidden mb-12">
          <div className="absolute right-0 top-0 w-80 h-80 bg-[#a338b9]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-4">
            <Heart size={16} fill="currentColor" />
            <span>Nutrologia Veterinária Especializada</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black font-display text-white mb-6 leading-tight">
            {landing.headline}
          </h1>

          <p className="text-stone-300 text-base md:text-lg font-medium leading-relaxed max-w-2xl mb-8">
            {landing.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onOpenConsulta(landing.formatKey)}
              className="bg-[#a338b9] hover:bg-[#812099] text-white py-4 px-8 rounded-2xl font-bold text-sm uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2.5 cursor-pointer border-none"
            >
              <span>Agendar Consulta Agora</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Key Benefits List */}
        <div className="bg-white border border-stone-200 rounded-3xl p-8 md:p-10 shadow-sm text-left mb-12">
          <h2 className="text-xl md:text-2xl font-extrabold font-display text-stone-900 mb-6 flex items-center gap-2">
            <ShieldCheck size={24} className="text-[#a338b9]" />
            <span>O que está incluso na consulta:</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {landing.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-[#FAF8F5] rounded-2xl border border-stone-100">
                <CheckCircle2 size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-stone-800 font-semibold text-sm leading-snug">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[#fcf5fe] border border-[#ebdcf2] rounded-3xl p-8 text-center text-stone-900">
          <h3 className="text-xl md:text-2xl font-bold font-display text-stone-900 mb-3">
            Garanta o melhor cuidado nutricional para seu cão ou gato
          </h3>
          <p className="text-stone-600 text-sm font-medium mb-6 max-w-xl mx-auto">
            Atendimento humanizado com a Dra. Thais Vieira (CRMV-SP 52.814). Clique abaixo para solicitar o agendamento no WhatsApp.
          </p>
          <button
            onClick={() => onOpenConsulta(landing.formatKey)}
            className="bg-[#25D366] hover:bg-[#20ba5a] text-white py-4 px-8 rounded-2xl font-bold text-sm uppercase tracking-wider transition-all shadow-md inline-flex items-center gap-2 cursor-pointer border-none"
          >
            <Phone size={18} />
            <span>Falar no WhatsApp para Agendar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
