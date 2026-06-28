import React, { useState, useEffect } from 'react';
import { 
  Check, 
  Sparkles, 
  Scale, 
  Activity, 
  Cookie, 
  ArrowDown, 
  Trash2, 
  AlertTriangle,
  Dog,
  Heart,
  Lock,
  ShieldCheck,
  Droplet,
  Clock,
  Brain,
  Utensils
} from 'lucide-react';
import { motion } from 'motion/react';
import { FadeIn } from './LayoutComponents';

// Asset imports
import choiceFoodImg from '../assets/images/escolha_racao_1781640644270.jpg';
import idealQuantityImg from '../assets/images/quantidade_ideal_1781640656721.jpg';
import healthyTreatsImg from '../assets/images/petiscos_saudaveis_1781640666469.jpg';
import dailyHealthImg from '../assets/images/saude_diaria_1781640678043.jpg';
import horariosDosesImg from '../assets/images/horarios_doses_1782078406873.jpg';

interface MeuPrimeiroPetProps {
  setIsModalOpen: (open: boolean) => void;
}

export function MeuPrimeiroPet({ setIsModalOpen }: MeuPrimeiroPetProps) {
  const [activePain, setActivePain] = useState<number>(0);

  const pains = [
    {
      id: "excesso",
      title: "Excesso Diário",
      color: "text-orange-400 bg-orange-400/10 border-orange-400/20",
      accentColor: "from-orange-500 to-red-600",
      icon: <Scale className="text-orange-400" size={36} />,
      badge: "RISCO DE SOBREPESO",
      desc1: "Oferecer ração a mais no olho ou no copinho causa ganho de peso silencioso.",
      highlight: "Mais que estética: sobrecarrega as articulações e reduz a mobilidade.",
      desc2: "Dificulta brincadeiras, gera cansaço precoce e pode diminuir a expectativa de vida do seu pet.",
      footer: "O erro imperceptível da medição diária acumula problemas graves ao longo do tempo."
    },
    {
      id: "pouca",
      title: "Falta de Nutrientes",
      color: "text-amber-400 bg-amber-400/10 border-amber-400/20",
      accentColor: "from-amber-500 to-orange-600",
      icon: <Activity className="text-amber-400" size={36} />,
      badge: "FOME & ESTRESSE",
      desc1: "Porções menores que o necessário geram ansiedade e frustração no pet.",
      highlight: "O pet fica agitado, pedindo comida o tempo todo ou comendo rápido demais.",
      desc2: "Leva à perda de massa muscular, queda de energia e alteração do comportamento na rotina.",
      footer: "Pedir comida nem sempre é manha. Muitas vezes é fome real por falta de cálculo correto."
    },
    {
      id: "petiscos",
      title: "Petiscos Livres",
      color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
      accentColor: "from-yellow-400 to-amber-600",
      icon: <Cookie className="text-yellow-400" size={36} />,
      badge: "VILÃO SILENCIOSO",
      desc1: "Snacks industriais, mesmo os ditos 'naturais', escondem sódio e calorias vazias.",
      highlight: "Eles desregulam o apetite e sabotam a alimentação diária.",
      desc2: "Podem sobrecarregar o sistema renal e digestivo, além de favorecer alergias de pele.",
      footer: "No plano, você recebe um guia com petiscos saudáveis e seguros com limites exatos por dia."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePain((prev) => (prev + 1) % pains.length);
    }, 7500); // 7.5 segundos para leitura extremamente confortável e tranquila
    return () => clearInterval(interval);
  }, [pains.length]);

  return (
    <section 
      className="pt-24 pb-16 md:pt-32 md:pb-24 px-4 md:px-8 relative z-10 -mt-16 rounded-[3.5rem] md:rounded-[4.5rem] shadow-[0_-15px_45px_rgba(0,0,0,0.15),0_25px_60px_rgba(0,0,0,0.2)] overflow-hidden text-white" 
      id="meu-primeiro-pet"
    >
      {/* Background Image with optimized visibility and text contrast */}
      <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden">
        <img 
          src="https://images.pexels.com/photos/12024296/pexels-photo-12024296.png?auto=compress&cs=tinysrgb&w=1200&q=70" 
          alt="Plano Meu Primeiro Pet" 
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
                PLANO ALIMENTAR PERSONALIZADO
              </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white font-display leading-[1.05] tracking-tight uppercase">
              MEU PRIMEIRO PET
            </h2>
            
            <p className="text-amber-400 text-2xl md:text-4.5xl font-black tracking-tight font-display uppercase mt-3 drop-shadow-sm">
              FIM DOS COPINHOS E DO OLHÔMETRO
            </p>
            
            <p className="text-stone-200 text-lg md:text-2xl font-bold max-w-3xl mx-auto mt-6 leading-snug font-sans">
              Seu pet pode estar comendo mais ou menos do que precisa todos os dias e você nem percebeu ainda.
            </p>

            {/* Perguntas super destacadas */}
            <div className="mt-8 max-w-3xl mx-auto grid grid-cols-2 gap-2.5 sm:gap-4 text-left">
              {[
                { text: "Adotou um pet recentemente e não sabe qual ração escolher?", icon: <Dog className="text-amber-400" size={20} /> },
                { text: "É pai ou mãe de pet de primeira viagem e quer começar do jeito certo?", icon: <Heart className="text-red-400" size={20} /> },
                { text: "Já tem um pet em casa, mas ainda mede a ração no copinho ou no olho?", icon: <Scale className="text-orange-400" size={20} /> },
                { text: "Você sabe se ele está comendo a quantidade certa todos os dias?", icon: <Activity className="text-emerald-400" size={20} /> }
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
                Quando a alimentação é feita no achismo, o erro pode acontecer todos os dias.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* DYNAMIC PAIN CAROUSEL (Excesso -> Pouca -> Petiscos) */}
        <div className="max-w-4xl mx-auto mb-20 relative z-10 p-6 sm:p-10 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden bg-[#040008]">
          
          {/* Metallic dark purple background overlay */}
          <div className="absolute inset-0 -z-10 w-full h-full bg-gradient-to-tr from-[#040008] via-[#1c0033]/40 to-[#040008]" />

          {/* Blinking Red Danger Alert perfectly positioned here according to user request */}
          <div className="flex justify-center mb-8">
            <div className="animate-pulse bg-red-600/95 border-2 border-red-500 px-6 py-2.5 rounded-full inline-flex items-center gap-2.5 shadow-[0_0_25px_rgba(239,68,68,0.7)] text-xs md:text-sm font-black text-white tracking-[0.2em] uppercase">
              🚨 PERIGO!!! 🚨
            </div>
          </div>
          
          {/* Active indicator tabs */}
          <div className="flex justify-center flex-wrap gap-2.5 mb-8 px-4">
            {pains.map((item, index) => {
              const isActive = activePain === index;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePain(index)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs md:text-sm font-black uppercase tracking-wider transition-all duration-300 border cursor-pointer outline-none ${
                    isActive
                      ? "bg-white text-[#1a0126] border-white shadow-[0_10px_25px_rgba(255,255,255,0.15)] scale-105"
                      : "bg-white/5 text-stone-300 border-white/10 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active slide card with smooth motion entrance and clean glassmorphism */}
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 p-6 md:p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] bg-white/[0.01] backdrop-blur-md transition-all duration-300">
            
            {/* Soft decorative glow depending on active category */}
            <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl ${pains[activePain].accentColor} opacity-20 rounded-bl-full blur-[100px] pointer-events-none transition-all duration-500`} />
            <div className={`absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr ${pains[activePain].accentColor} opacity-5 rounded-tr-full blur-[60px] pointer-events-none transition-all duration-500`} />
            
            <motion.div
              key={activePain}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left"
            >
              {/* Icon & Badge column */}
              <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left space-y-5">
                <div className="relative">
                  <div className="p-6 bg-white/[0.04] rounded-[2rem] border border-white/10 shadow-lg relative z-10">
                    {pains[activePain].icon}
                  </div>
                  {/* Dynamic glow behind the icon */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${pains[activePain].accentColor} opacity-30 rounded-[2rem] blur-xl`} />
                </div>
                
                <div className="space-y-2">
                  <span className={`inline-flex items-center gap-1.5 text-[9px] font-black tracking-widest uppercase px-3 py-1.5 rounded-lg border shadow-sm ${pains[activePain].color}`}>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    {pains[activePain].badge}
                  </span>
                  
                  <h4 className="text-2xl md:text-3xl font-extrabold font-display text-white tracking-tight uppercase leading-none">
                    {pains[activePain].title}
                  </h4>
                </div>
              </div>

              {/* Rich copy text details */}
              <div className="md:col-span-7 space-y-5">
                <div className="space-y-4 text-sm md:text-base text-stone-200 leading-relaxed font-sans font-medium">
                  <p className="text-white text-base md:text-lg font-bold leading-snug">
                    {pains[activePain].desc1}
                  </p>
                  
                  <div className="text-amber-300 font-extrabold bg-amber-400/10 py-2.5 px-4 rounded-xl border border-amber-400/20 inline-block text-xs md:text-sm shadow-inner">
                    ⚡ {pains[activePain].highlight}
                  </div>
                  
                  <p className="text-stone-300 text-xs md:text-sm leading-relaxed">
                    {pains[activePain].desc2}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs md:text-sm font-extrabold text-amber-400 leading-snug font-sans flex items-start gap-2">
                    <span className="text-base shrink-0">💡</span> 
                    <span>{pains[activePain].footer}</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Slider bottom navigation / Progress Indicators */}
            <div className="flex items-center justify-between mt-10 pt-4 border-t border-white/5">
              {/* Manual Progress Dots */}
              <div className="flex gap-2">
                {pains.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActivePain(index)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      activePain === index ? "w-8 bg-amber-400" : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Ir para slide ${index + 1}`}
                  />
                ))}
              </div>

              <span className="text-[10px] font-black tracking-widest text-stone-400 uppercase font-sans">
                Próximo alerta automático
              </span>
            </div>

            {/* Realtime 7.5s Autoplay Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/[0.04]">
              <motion.div
                key={activePain}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 7.5, ease: "linear" }}
                className={`h-full bg-gradient-to-r ${pains[activePain].accentColor}`}
              />
            </div>

          </div>
        </div>



        {/* SOLUTION AREA: With visual highlight + Authority Column */}
        <div className="relative max-w-5xl mx-auto overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#410657] to-[#1e0129] p-8 md:p-14 border border-white/10 shadow-2xl mb-20 text-left">
          <div className="absolute -top-16 -right-16 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="w-full">
            
            {/* Solution Info */}
            <div className="w-full space-y-6">
              <span className="text-[10px] md:text-xs font-black tracking-widest uppercase text-stone-950 bg-amber-400 px-3.5 py-1.5 rounded-full inline-block shadow-sm">
                A SOLUÇÃO 
              </span>
              
              <h3 className="text-2.5xl md:text-4xl font-black text-white font-display uppercase tracking-tight leading-tight">
                O Meu Primeiro Pet foi criado para tirar você do achismo.
              </h3>
              
              <p className="text-stone-200 text-sm md:text-base font-semibold leading-relaxed">
                Você responde um questionário, eu analiso individualmente as informações do seu pet e você recebe um plano alimentar prático, personalizado e direto ao ponto.
              </p>
              
              {/* Highlights (Nada de...) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  "Nada de copinho.",
                  "Nada de comedouro cheio no olho.",
                  "Nada de seguir dica genérica."
                ].map((noText, nIdx) => (
                  <div key={nIdx} className="flex items-center gap-2 bg-red-500/10 border border-red-500/15 px-3 py-2.5 rounded-xl">
                    <span className="text-red-400 font-black text-xs shrink-0">✕</span>
                    <span className="text-[11px] sm:text-xs font-bold text-red-200">{noText}</span>
                  </div>
                ))}
              </div>

              {/* Minimalist bullet list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-stone-200">
                {[
                  "indicação da ração mais adequada para o perfil do pet",
                  "quantidade diária calculada",
                  "divisão correta das refeições",
                  "sugestões de petiscos saudáveis de verdade",
                  "orientações para hidratação",
                  "ideias de enriquecimento alimentar para a rotina"
                ].map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2.5 text-xs md:text-sm font-sans font-bold">
                    <div className="w-5 h-5 bg-amber-400/15 rounded-full flex items-center justify-center shrink-0 border border-amber-400/20 mt-0.5">
                      <Check size={12} className="text-amber-400" />
                    </div>
                    <span className="first-letter:uppercase">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* PRICE & CALL TO ACTION PANEL (Preço + Chamadas + Impacto final) */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#3d0352] to-[#1d0027] border-2 border-amber-400/60 p-8 md:p-12 rounded-[2.5rem] text-center space-y-8 shadow-[inset_0_4px_24px_rgba(255,255,255,0.18),inset_0_-6px_24px_rgba(0,0,0,0.7),0_25px_60px_-15px_rgba(0,0,0,0.9)] hover:shadow-[inset_0_5px_30px_rgba(255,255,255,0.22),inset_0_-8px_30px_rgba(0,0,0,0.8),0_30px_70px_-12px_rgba(0,0,0,0.95)] transition-all duration-500 relative overflow-hidden group mb-20">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-[#fb923c]" />
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-3">
            <span className="text-xs text-emerald-400 font-sans font-black tracking-widest uppercase flex items-center justify-center gap-1.5">
              <Lock size={12} className="animate-pulse" /> SISTEMA DE PAGAMENTO 100% SEGURO
            </span>
            <h3 className="text-2xl md:text-4xl font-black text-white font-display uppercase tracking-tight">
              ALIMENTE SEU PET DO JEITO CERTO HOJE
            </h3>
            <p className="text-stone-300 text-xs md:text-sm font-semibold max-w-xl mx-auto">
              Por R$119,90, você recebe um plano alimentar simples, prático e personalizado para alimentar seu pet com mais segurança.
            </p>
          </div>

          {/* Pricing Highlight */}
          <div className="space-y-2 py-2">
            <span className="text-xs text-stone-400 font-sans font-medium tracking-wide block line-through">
              De R$ 199,90 por apenas
            </span>
            <div className="text-5xl md:text-7xl font-black text-white font-display flex items-baseline justify-center gap-1">
              <span className="text-2xl font-bold text-amber-400">R$</span>
              <span className="text-amber-400">119</span>
              <span className="text-3xl font-bold font-sans text-amber-400">,90</span>
            </div>
            <div className="pt-2">
              <span className="inline-block text-[10px] font-black tracking-widest text-[#ffd2ff] bg-white/10 py-1.5 px-4 rounded-full border border-white/10">
                PAGAMENTO ÚNICO • SEM MENSALIDADE • PLANO ANALISADO INDIVIDUALMENTE
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
                <p className="text-stone-400 text-[10px] leading-relaxed font-sans">Suas respostas são usadas apenas para a elaboração do plano alimentar do seu pet.</p>
              </div>
            </div>

            <div className="bg-white/[0.04] border border-white/5 p-3.5 rounded-xl flex items-start gap-3">
              <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg shrink-0">
                <ShieldCheck size={16} />
              </div>
              <div>
                <p className="text-white text-xs font-bold font-sans">Orientação profissional</p>
                <p className="text-stone-400 text-[10px] leading-relaxed font-sans">Plano analisado por médica veterinária especialista em nutrição animal.</p>
              </div>
            </div>

            <div className="bg-white/[0.04] border border-white/5 p-3.5 rounded-xl flex items-start gap-3">
              <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg shrink-0">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
              </div>
              <div>
                <p className="text-white text-xs font-bold font-sans">Envio por e-mail</p>
                <p className="text-stone-400 text-[10px] leading-relaxed font-sans">Após a análise individual, o plano é enviado diretamente para o seu e-mail.</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons: Premium orange/yellow contrasts and secondary options */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 max-w-md mx-auto">
            <motion.button 
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto flex-1 py-5 px-8 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black rounded-2xl text-xs sm:text-sm uppercase tracking-widest shadow-[0_15px_30px_rgba(251,191,36,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer border-none"
            >
              <Sparkles size={16} className="fill-stone-950 animate-pulse shrink-0" />
              <span>QUERO O PLANO DO MEU PET</span>
            </motion.button>

            <motion.button 
              onClick={() => {
                document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto flex-1 py-5 px-8 bg-white/5 hover:bg-white/10 text-white font-black rounded-2xl text-xs sm:text-sm uppercase tracking-widest border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>COMO FUNCIONA?</span>
            </motion.button>
          </div>

          {/* Final Impact Phrase inside the main price CTA panel */}
          <p className="text-amber-300 text-xs md:text-sm font-extrabold tracking-wide uppercase pt-4">
            “Chega de copinho. Chega de olhômetro. Chega de dúvida na hora de alimentar.”
          </p>
        </div>

        {/* STEP SYSTEM (COMO FUNCIONA?) */}
        <div 
          id="como-funciona"
          className="border border-white/10 rounded-[2.5rem] p-8 md:p-12 mb-20 text-center relative overflow-hidden bg-cover bg-center shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1764249453855-2e575db33354?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
        >
          {/* High contrast visual overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#13031a]/95 via-[#22072e]/92 to-[#0b010f]/95 backdrop-blur-[2px]" />
          
          <div className="relative z-10">
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-widest text-amber-400 mb-10 font-display">
              COMO FUNCIONA O SEU PLANO?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 relative max-w-5xl mx-auto">
              
              {/* Step 1 */}
              <div className="flex flex-col items-center space-y-4 p-6 rounded-3xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:bg-white/[0.08] transition-all duration-300 relative group">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-400 to-[#fb923c] text-stone-950 flex items-center justify-center text-lg font-black font-sans shadow-lg group-hover:scale-105 transition-transform">
                  1
                </div>
                <h4 className="text-lg font-bold text-white font-display uppercase tracking-wide">Você responde</h4>
                <p className="text-stone-300 text-xs md:text-sm max-w-xs mx-auto leading-relaxed font-sans font-medium">
                  Formulário estratégico inteligente de 5 minutos, mapeando detalhadamente os dados, temperamento e rotina do seu cão ou gato.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center space-y-4 p-6 rounded-3xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:bg-white/[0.08] transition-all duration-300 relative group">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-400 to-[#fb923c] text-stone-950 flex items-center justify-center text-lg font-black font-sans shadow-lg group-hover:scale-105 transition-transform">
                  2
                </div>
                <h4 className="text-lg font-bold text-white font-display uppercase tracking-wide">Eu analiso</h4>
                <p className="text-stone-300 text-xs md:text-sm max-w-xs mx-auto leading-relaxed font-sans font-medium">
                  Avaliação biológica e nutricional feita por mim de forma minuciosa, equilibrando calorias, proteínas, água e condutas saudáveis.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center space-y-4 p-6 rounded-3xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:bg-white/[0.08] transition-all duration-300 relative group">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-400 to-[#fb923c] text-stone-950 flex items-center justify-center text-lg font-black font-sans shadow-lg group-hover:scale-105 transition-transform">
                  3
                </div>
                <h4 className="text-lg font-bold text-white font-display uppercase tracking-wide">Você recebe</h4>
                <p className="text-stone-300 text-xs md:text-sm max-w-xs mx-auto leading-relaxed font-sans font-medium">
                  Plano alimentar detalhado e estruturado em formato digital entregue diretamente no seu e-mail de cadastro.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* O QUE VOCÊ RECEBE: Customized detail blocks with custom background image */}
        <div 
          className="relative overflow-hidden rounded-[2.5rem] p-8 md:p-14 mb-24 border border-white/10 shadow-2xl bg-[#040008]" 
          id="cards-recebe"
        >
          {/* Luxurious gradient backgrounds instead of confusing cover image to create an elite premium look */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#080111] via-[#1d0331] to-[#080111]" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#a338b9]/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
          
          <div className="relative z-10 space-y-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[10px] md:text-xs font-black tracking-widest text-stone-900 bg-amber-400 py-1.5 px-4 rounded-full uppercase inline-flex items-center gap-1.5 shadow-md">
                <Sparkles size={12} className="fill-stone-900 animate-pulse" />
                ENTREGA COMPLETA EM PDF E EMAIL
              </span>
              <h3 className="text-3xl md:text-5xl font-black text-white font-display uppercase tracking-tight mt-4 leading-[1.1]">
                O QUE VOCÊ RECEBE NO SEU PLANO
              </h3>
              <p className="text-stone-300 text-sm md:text-base font-semibold mt-4 leading-relaxed max-w-2xl mx-auto">
                Um guia completo e direto ao ponto que elimina todas as suas dúvidas sobre a rotina de alimentação do seu pet.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
              {[
                {
                  title: "Melhor Ração",
                  badge: "NUTRIÇÃO",
                  desc: "Indicação da ração mais adequada baseada no perfil calórico, idade e porte do seu pet.",
                  img: choiceFoodImg,
                  icon: <Utensils size={18} className="text-amber-400" />,
                  accent: "border-amber-400/30 text-amber-400 bg-amber-400/10"
                },
                {
                  title: "Quantidade Exata",
                  badge: "CÁLCULO",
                  desc: "Cálculo exato em gramas e divisão correta de porções diárias para evitar ganho de peso.",
                  img: idealQuantityImg,
                  icon: <Scale size={18} className="text-orange-400" />,
                  accent: "border-orange-400/30 text-orange-400 bg-orange-400/10"
                },
                {
                  title: "Horários & Doses",
                  badge: "ROTINA",
                  desc: "Cronograma de refeições ideal ajustado ao tempo de digestão gástrica para prevenir refluxos.",
                  img: horariosDosesImg,
                  icon: <Clock size={18} className="text-purple-400" />,
                  accent: "border-purple-400/30 text-purple-400 bg-purple-400/10"
                },
                {
                  title: "Petiscos sem Culpa",
                  badge: "DIETA",
                  desc: "Guia completo de snacks saudáveis e naturais com limites de segurança diários recomendados.",
                  img: healthyTreatsImg,
                  icon: <Cookie size={18} className="text-yellow-400" />,
                  accent: "border-yellow-400/30 text-yellow-400 bg-yellow-400/10"
                },
                {
                  title: "Hidratação Prática",
                  badge: "SAÚDE",
                  desc: "Estratégias para aumentar a ingestão diária de água e proteger o sistema renal do seu companheiro.",
                  img: dailyHealthImg,
                  icon: <Droplet size={18} className="text-blue-400" />,
                  accent: "border-blue-400/30 text-blue-400 bg-blue-400/10"
                },
                {
                  title: "Enriquecimento",
                  badge: "COMPORTAMENTO",
                  desc: "Ideias e desafios alimentares cognitivos para diminuir a ansiedade e combater o tédio em casa.",
                  img: "https://images.unsplash.com/photo-1678783133022-89e103910f76?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  icon: <Brain size={18} className="text-emerald-400" />,
                  accent: "border-emerald-400/30 text-emerald-400 bg-emerald-400/10"
                }
              ].map((card, cardIdx) => (
                <FadeIn key={cardIdx} delay={cardIdx * 0.04}>
                  <div className="bg-white/[0.02] border border-white/10 rounded-2xl sm:rounded-[2rem] overflow-hidden group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(163,56,185,0.12)] hover:bg-white/[0.04] hover:border-[#a338b9]/40 transition-all duration-300 flex flex-col h-full text-left relative">
                    <div className="h-24 sm:h-44 w-full overflow-hidden shrink-0 relative">
                      <img 
                        src={card.img} 
                        alt={card.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out brightness-[0.85]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#040008] via-transparent to-transparent" />
                      
                      {/* Floated category badge */}
                      <span className="absolute top-2 sm:top-4 left-2 sm:left-4 text-[7px] sm:text-[9px] font-black tracking-widest bg-stone-950/80 backdrop-blur-md text-white border border-white/10 py-0.5 sm:py-1 px-1.5 sm:px-2.5 rounded-md">
                        {card.badge}
                      </span>
                    </div>
                    
                    {/* Floating styled icon container overlapping the image border */}
                    <div className="absolute top-18 sm:top-36 right-3 sm:right-6">
                      <div className={`w-7 h-7 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center backdrop-blur-lg shadow-lg group-hover:scale-110 transition-transform duration-300 ${card.accent}`}>
                        {React.cloneElement(card.icon as React.ReactElement, { size: undefined, className: "w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" })}
                      </div>
                    </div>
                    
                    <div className="p-3 sm:p-6 md:p-8 flex-grow flex flex-col justify-between space-y-2.5 sm:space-y-4">
                      <div className="space-y-1 sm:space-y-2">
                        <h4 className="text-xs sm:text-lg font-extrabold text-white font-display uppercase tracking-wide group-hover:text-amber-400 transition-colors">
                          {card.title}
                        </h4>
                        <p className="text-[10px] sm:text-xs md:text-sm text-stone-300 font-semibold leading-relaxed font-sans">
                          {card.desc}
                        </p>
                      </div>
                      
                      <div className="pt-1 flex items-center gap-1 sm:gap-1.5 text-[8px] sm:text-[10px] font-black text-[#a338b9] tracking-wider uppercase">
                        <Check size={10} className="text-emerald-400 shrink-0" />
                        <span>Incluso no material</span>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
