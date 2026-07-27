import React from 'react';
import { 
  Sparkles, 
  Scale, 
  Activity, 
  AlertTriangle,
  Dog,
  Heart,
  Lock,
  ShieldCheck,
  Utensils,
  Clock,
  Cookie,
  Droplet,
  Check,
  PiggyBank
} from 'lucide-react';
import { motion } from 'motion/react';
import { FadeIn } from './LayoutComponents';

interface MeuPrimeiroPetProps {
  setIsModalOpen: (open: boolean) => void;
}

export function MeuPrimeiroPet({ setIsModalOpen }: MeuPrimeiroPetProps) {
  const pillarItems = [
    {
      title: "Escolha da Melhor Ração",
      badge: "NUTRIÇÃO ADEQUADA",
      desc: "Orientação para encontrar a melhor ração comercial (Super Premium, Castrado, Filhote ou Sênior) que se adapta ao perfil do seu pet e cabe no seu orçamento.",
      icon: <Utensils size={24} className="text-amber-400" />,
      accent: "border-amber-400/30 bg-amber-400/10 text-amber-300"
    },
    {
      title: "Quantidade & Quantas Vezes Comer",
      badge: "DOSAGEM & FREQUÊNCIA",
      desc: "Cálculo exato da quantidade diária em gramas e divisão correta de quantas refeições fazer por dia para evitar fome, refluxo e ganho de peso.",
      icon: <Clock size={24} className="text-orange-400" />,
      accent: "border-orange-400/30 bg-orange-400/10 text-orange-300"
    },
    {
      title: "Petiscos Saudáveis e Seguros",
      badge: "SNACKS SEM CULPA",
      desc: "Guia completo de alimentos e petiscos naturais permitidos (frutas, legumes e snacks seguros) com o limite diário recomendado para não desequilibrar a dieta.",
      icon: <Cookie size={24} className="text-yellow-400" />,
      accent: "border-yellow-400/30 bg-yellow-400/10 text-yellow-300"
    },
    {
      title: "Metas e Dicas de Hidratação",
      badge: "SAÚDE RENAL",
      desc: "Cálculo da necessidade diária de água e estratégias práticas para incentivar seu cão ou gato a beber mais líquido todos os dias.",
      icon: <Droplet size={24} className="text-blue-400" />,
      accent: "border-blue-400/30 bg-blue-400/10 text-blue-300"
    }
  ];

  return (
    <section 
      className="pt-24 pb-16 md:pt-32 md:pb-24 px-4 md:px-8 relative z-10 -mt-16 rounded-[3.5rem] md:rounded-[4.5rem] shadow-[0_-15px_45px_rgba(0,0,0,0.15),0_25px_60px_rgba(0,0,0,0.2)] overflow-hidden text-white" 
      id="orientacao-racao"
    >
      {/* Background Image with optimized visibility and text contrast */}
      <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden">
        <img 
          src="https://images.pexels.com/photos/12024296/pexels-photo-12024296.png?auto=compress&cs=tinysrgb&w=1200&q=70" 
          alt="Orientação de Ração e Consulta Online" 
          className="w-full h-full object-cover object-center scale-100 select-none pointer-events-none"
          referrerPolicy="no-referrer"
          loading="lazy"
          decoding="async"
        />
        {/* Rich vibrant purple and deep obsidian gradient overlay to make everything elegant and legible */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#1a0033]/85 via-[#4d0080]/60 to-[#0a001a]/85 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#100022]/50 via-transparent to-[#050010]/95" />
      </div>
      
      {/* Glow and organic decorative shapes for premium visual depth */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[#a338b9]/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-amber-500/10 blur-[150px] pointer-events-none" />
      
      {/* Subtle floating background elements representing paws and pet bowls */}
      <div className="absolute top-1/3 right-12 text-white/5 text-8xl font-black pointer-events-none select-none">🐾</div>
      <div className="absolute bottom-1/4 left-12 text-white/5 text-9xl font-black pointer-events-none select-none">🐶</div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* TOP HEADER: Tag + Title + Impact Phrase */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">
          <FadeIn>
            <div className="flex flex-col items-center justify-center gap-4 mb-4">
              <span className="text-[10px] md:text-xs font-black tracking-widest uppercase text-stone-900 bg-amber-400 px-5 py-2.5 rounded-full inline-flex items-center gap-1.5 shadow-md">
                <Sparkles size={12} className="fill-stone-900 animate-pulse" />
                ORIENTAÇÃO DE RAÇÃO ONLINE
              </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white font-display leading-[1.05] tracking-tight uppercase">
              ORIENTAÇÃO DE RAÇÃO
            </h2>
            
            <p className="text-amber-400 text-2xl md:text-4.5xl font-black tracking-tight font-display uppercase mt-3 drop-shadow-sm">
              A MELHOR RAÇÃO, QUANTIDADE CERTA, FREQUÊNCIA, PETISCOS SAUDÁVEIS E HIDRATAÇÃO
            </p>

            {/* Affordable Highlight Banner */}
            <div className="mt-4 inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/40 px-5 py-2.5 rounded-full">
              <PiggyBank size={18} className="text-emerald-400 shrink-0" />
              <span className="text-emerald-300 text-xs md:text-sm font-extrabold uppercase tracking-wider font-sans">
                Opção mais acessível e prática para cuidar da nutrição do seu pet
              </span>
            </div>
            
            <p className="text-stone-200 text-lg md:text-2xl font-bold max-w-3xl mx-auto mt-6 leading-snug font-sans">
              Acabou de adotar um pet ou é pai/mãe de primeira viagem? Não sabe qual é a melhor ração, os petiscos mais seguros para seu cão ou gato, e não sabe quanto oferecer por dia? <span className="text-amber-300 font-extrabold">Este plano foi feito especialmente para você!</span>
            </p>

            {/* Perguntas super destacadas */}
            <div className="mt-8 max-w-3xl mx-auto grid grid-cols-2 gap-2.5 sm:gap-4 text-left">
              {[
                { text: "Dúvidas sobre qual a melhor marca de ração para o perfil do seu pet?", icon: <Dog className="text-amber-400" size={20} /> },
                { text: "Sem saber quantas vezes ao dia e quantas gramas servir?", icon: <Clock className="text-orange-400" size={20} /> },
                { text: "Quer saber quais petiscos e frutas são seguros de oferecer?", icon: <Cookie className="text-yellow-400" size={20} /> },
                { text: "Preocupado se seu cão ou gato está bebendo água suficiente?", icon: <Droplet className="text-blue-400" size={20} /> }
              ].map((q, qIdx) => (
                <div 
                  key={qIdx} 
                  className="bg-white/[0.06] backdrop-blur-md border border-white/10 p-2.5 sm:p-5 rounded-xl sm:rounded-2.5xl hover:border-amber-400/60 hover:bg-white/[0.1] hover:shadow-[0_10px_30px_rgba(251,191,36,0.1)] transition-all duration-300 flex flex-col sm:flex-row items-start gap-2 sm:gap-4"
                >
                  <div className="p-1.5 sm:p-3 bg-white/[0.08] rounded-lg sm:rounded-2xl shrink-0 border border-white/5 flex items-center justify-center shadow-inner">
                    {q.icon}
                  </div>
                  <p className="text-white font-extrabold text-[10px] sm:text-sm md:text-[15px] leading-tight sm:leading-snug font-sans my-auto">
                    {q.text}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 inline-block bg-red-500/10 border border-red-500/20 px-5 py-3 rounded-2xl">
              <p className="text-red-300 text-xs md:text-sm font-black uppercase tracking-wider font-sans flex items-center justify-center gap-2">
                <AlertTriangle size={16} className="text-red-400 shrink-0" />
                Alimentação sem orientação pode causar sobrepeso, desnutrição e problemas renais.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* 4 PILLARS CARDS SECTION */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="text-center mb-10">
            <span className="text-[10px] md:text-xs font-black tracking-widest text-stone-900 bg-amber-400 py-1.5 px-4 rounded-full uppercase inline-flex items-center gap-1.5 shadow-md">
              <Sparkles size={12} className="fill-stone-900 animate-pulse" />
              TUDO O QUE VOCÊ RECEBE NO PLANO
            </span>
            <h3 className="text-2xl md:text-4xl font-black text-white font-display uppercase tracking-tight mt-3">
              O QUE ESTÁ INCLUSO NA ORIENTAÇÃO
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillarItems.map((item, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-[2rem] hover:border-amber-400/50 hover:bg-white/[0.07] transition-all duration-300 flex flex-col justify-between h-full space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className={`p-3 rounded-2xl border ${item.accent}`}>
                        {item.icon}
                      </div>
                      <span className="text-[10px] font-black tracking-widest text-amber-300 bg-white/10 border border-white/10 px-3 py-1 rounded-full uppercase font-sans">
                        {item.badge}
                      </span>
                    </div>

                    <h4 className="text-xl font-black text-white font-display uppercase tracking-tight">
                      {item.title}
                    </h4>

                    <p className="text-stone-300 text-sm font-medium leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <Check size={14} className="shrink-0" />
                    <span>Incluso na Orientação de Ração</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* PRICE & CALL TO ACTION PANEL */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#3d0352] to-[#1d0027] border-2 border-amber-400/60 p-8 md:p-12 rounded-[2.5rem] text-center space-y-8 shadow-[inset_0_4px_24px_rgba(255,255,255,0.18),inset_0_-6px_24px_rgba(0,0,0,0.7),0_25px_60px_-15px_rgba(0,0,0,0.9)] hover:shadow-[inset_0_5px_30px_rgba(255,255,255,0.22),inset_0_-8px_30px_rgba(0,0,0,0.8),0_30px_70px_-12px_rgba(0,0,0,0.95)] transition-all duration-500 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-[#fb923c]" />
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-3">
            <span className="text-xs text-emerald-400 font-sans font-black tracking-widest uppercase flex items-center justify-center gap-1.5">
              <Sparkles size={12} className="animate-pulse" /> CONSULTA E ORIENTAÇÃO PERSONALIZADA
            </span>
            <h3 className="text-2xl md:text-4xl font-black text-white font-display uppercase tracking-tight">
              ALIMENTE SEU PET COM SEGURANÇA E ECONOMIA
            </h3>
            <p className="text-stone-300 text-xs md:text-sm font-semibold max-w-xl mx-auto">
              Saiba qual a melhor ração, quantidade exata, horários das refeições, petiscos saudáveis e dicas de hidratação sem complicações.
            </p>
          </div>

          {/* Pricing Highlight */}
          <div className="space-y-2 py-2">
            <div className="pt-2">
              <span className="inline-block text-xs md:text-sm font-black tracking-wider text-amber-300 bg-white/10 py-2.5 px-6 rounded-full border border-amber-400/30">
                OPÇÃO MAIS ACESSÍVEL • ORIENTAÇÃO ONLINE INDIVIDUALIZADA VIA WHATSAPP
              </span>
            </div>
          </div>

          {/* Safety & Trust Badges Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-2 text-left">
            <div className="bg-white/[0.04] border border-white/5 p-3.5 rounded-xl flex items-start gap-3">
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg shrink-0">
                <Lock size={16} />
              </div>
              <div>
                <p className="text-white text-xs font-bold font-sans">Dados protegidos</p>
                <p className="text-stone-400 text-[10px] leading-relaxed font-sans">Suas respostas são usadas apenas para a elaboração do plano do seu pet.</p>
              </div>
            </div>

            <div className="bg-white/[0.04] border border-white/5 p-3.5 rounded-xl flex items-start gap-3">
              <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg shrink-0">
                <ShieldCheck size={16} />
              </div>
              <div>
                <p className="text-white text-xs font-bold font-sans">Orientação profissional</p>
                <p className="text-stone-400 text-[10px] leading-relaxed font-sans">Analisado por médica veterinária especialista em nutrição animal.</p>
              </div>
            </div>

            <div className="bg-white/[0.04] border border-white/5 p-3.5 rounded-xl flex items-start gap-3">
              <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg shrink-0">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
              </div>
              <div>
                <p className="text-white text-xs font-bold font-sans">Envio prático</p>
                <p className="text-stone-400 text-[10px] leading-relaxed font-sans">Você recebe o guia completo para a rotina diária do seu pet no WhatsApp/E-mail.</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 max-w-md mx-auto">
            <motion.button 
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto flex-1 py-5 px-8 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black rounded-2xl text-xs sm:text-sm uppercase tracking-widest shadow-[0_15px_30px_rgba(251,191,36,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer border-none"
            >
              <Sparkles size={16} className="fill-stone-950 animate-pulse shrink-0" />
              <span>AGENDAR ORIENTAÇÃO DE RAÇÃO</span>
            </motion.button>
          </div>

          {/* Final Impact Phrase inside the main price CTA panel */}
          <p className="text-amber-300 text-xs md:text-sm font-extrabold tracking-wide uppercase pt-4">
            “Chega de copinho. Chega de olhômetro. A orientação certa com investimento que cabe no bolso.”
          </p>
        </div>

      </div>
    </section>
  );
}

