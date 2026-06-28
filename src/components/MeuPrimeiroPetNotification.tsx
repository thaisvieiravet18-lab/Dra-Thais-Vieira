import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, AlertCircle } from 'lucide-react';

export function MeuPrimeiroPetNotification() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show after 1.2 seconds so the user can test/see it immediately on load
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    sessionStorage.setItem('dismissed_primeiro_pet_notif', 'true');
  };

  const handleAction = () => {
    setIsOpen(false);
    sessionStorage.setItem('dismissed_primeiro_pet_notif', 'true');
    const element = document.getElementById('meu-primeiro-pet');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[410px] z-[999] pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: "transform, opacity" }}
            className="w-full rounded-[2.2rem] overflow-hidden shadow-2xl border border-white/10 pointer-events-auto relative"
            id="notificacao-primeiro-pet"
          >
          {/* Background Image Container */}
          <div className="absolute inset-0 -z-10 w-full h-full">
            <img 
              src="https://images.pexels.com/photos/8434641/pexels-photo-8434641.jpeg?auto=compress&cs=tinysrgb&w=600&q=75" 
              alt="Alimentação saudável pet" 
              className="w-full h-full object-cover object-[center_30%]"
              referrerPolicy="no-referrer"
              decoding="async"
            />
            {/* Rich multi-color dark metallic gradient overlay: tons puros de roxo e preto, removendo o vinho */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#05000a]/94 via-[#25003b]/85 to-[#3e0061]/80 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#140024]/65 to-[#05000a]/92" />
          </div>

          {/* Close button inside notification */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white/80 hover:text-white p-2 rounded-full backdrop-blur-md border border-white/10 transition-all duration-300 cursor-pointer z-50 outline-none"
            aria-label="Fechar notificação"
          >
            <X size={14} />
          </button>

          {/* Core Content Layer */}
          <div className="p-6 md:p-8 space-y-5 text-center md:text-left relative z-10">
            {/* Header / Subtitle */}
            <div className="space-y-1 text-center md:text-left">
              <span className="text-[10px] font-black tracking-[0.2em] text-amber-300 bg-amber-400/10 border border-amber-400/20 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 uppercase font-sans">
                <Sparkles size={10} className="fill-amber-300 text-amber-300 animate-pulse" />
                MEU PRIMEIRO PET
              </span>
              <h4 className="text-lg md:text-xl font-black font-display text-white tracking-tight uppercase pt-2">
                Fim dos copinhos e do olhômetro
              </h4>
            </div>

            {/* Structured interactive checklist queries with highlighted yellow/orange accents */}
            <div className="space-y-2.5 pt-1">
              {[
                "Adotou um pet recentemente?",
                "É pai ou mãe de pet de primeira viagem?",
                "Ainda mede a ração no copinho ou no olho?"
              ].map((text, idx) => (
                <div key={idx} className="flex items-center justify-center md:justify-start gap-2.5 text-white/90">
                  <span className="text-amber-400 shrink-0 text-sm">✦</span>
                  <p className="text-xs md:text-sm font-semibold font-sans leading-tight text-stone-100">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            {/* Call to action text block */}
            <div className="bg-red-500/10 border border-red-500/20 p-3.5 rounded-2xl space-y-1">
              <p className="text-[10px] font-black text-red-400 tracking-wider uppercase font-sans flex items-center justify-center md:justify-start gap-1.5">
                <AlertCircle size={11} /> ATENÇÃO TUTOR
              </p>
              <p className="text-xs font-bold text-red-200/95 leading-relaxed font-sans">
                Seu pet pode estar comendo <span className="text-orange-300 font-extrabold underline decoration-orange-400/40">mais ou menos</span> do que precisa e você nem percebeu ainda.
              </p>
            </div>

            {/* Final Action Button & Micro-context */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleAction}
                className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-stone-950 font-black font-sans text-xs md:text-sm tracking-wider uppercase py-3.5 px-6 rounded-2xl shadow-[0_12px_30px_rgba(245,158,11,0.25)] hover:shadow-[0_15px_35px_rgba(245,158,11,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 border border-amber-300/30 group"
              >
                <span>SABER MAIS</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">➔</span>
              </button>
              
              <p className="text-[10px] font-bold text-purple-200/80 tracking-widest uppercase font-sans text-center">
                🎁 Plano de ração personalizado por R$119,90
              </p>
            </div>
          </div>
        </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
