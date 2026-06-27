import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, MessageCircle } from 'lucide-react';

export const WhatsAppFloat = () => {
  const [showBubble, setShowBubble] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<'whatsapp' | 'instagram' | null>(null);

  // Exibir o balão após um breve delay de 1.5 segundos para chamar atenção de forma elegante
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const text = 'Olá Dra. Thais! Gostaria de saber mais sobre as consultas e planos alimentares personalizados para o meu pet.';
    const encodedText = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?phone=5511916539562&text=${encodedText}`, '_blank');
  };

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/thaisvieiravet', '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3.5 pointer-events-none" id="contact-floats">
      
      {/* Balloon notification for WhatsApp or overall welcome */}
      <AnimatePresence>
        {showBubble && !hoveredButton && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
            className="mb-1 mr-1 pointer-events-auto cursor-pointer"
            onClick={handleWhatsAppClick}
          >
            {/* Balão de Fala "Dra. Thais Online!" */}
            <div className="relative bg-stone-900 text-white font-sans font-bold text-xs py-2 px-4 rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.35)] border border-white/10 flex items-center gap-2 select-none hover:bg-stone-850 hover:shadow-[0_16px_45px_rgba(163,56,185,0.25)] transition-all duration-300 transform hover:scale-105 active:scale-95 group">
              {/* Pontinho pulsante verde de online */}
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
              </span>
              
              <span className="tracking-wide">Dra. Thais: Fale Comigo no WhatsApp! 💬</span>
              
              {/* Arrow pointing down */}
              <div className="absolute bottom-[-5px] right-6 w-2.5 h-2.5 bg-stone-900 border-r border-b border-white/10 rotate-45"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Manual Hover Tooltips for Buttons */}
      <AnimatePresence>
        {hoveredButton === 'whatsapp' && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.9 }}
            className="absolute right-16 top-1.5 mr-1 bg-stone-950 text-white border border-white/10 font-bold text-xs py-2 px-3.5 rounded-lg shadow-xl whitespace-nowrap pointer-events-none select-none"
          >
            Fale Direto no WhatsApp 💬
          </motion.div>
        )}
        {hoveredButton === 'instagram' && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.9 }}
            className="absolute right-16 bottom-5 mr-1 bg-stone-950 text-white border border-white/10 font-bold text-xs py-2 px-3.5 rounded-lg shadow-xl whitespace-nowrap pointer-events-none select-none"
          >
            Siga no Instagram <span className="text-[#ff509e]">@thaisvieiravet</span> 📸
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button List */}
      <div className="flex flex-col items-center gap-3.5 pointer-events-auto">
        
        {/* WhatsApp Float Button (Improved & Glowing) */}
        <motion.button
          onClick={handleWhatsAppClick}
          onMouseEnter={() => setHoveredButton('whatsapp')}
          onMouseLeave={() => setHoveredButton(null)}
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.93 }}
          className="relative p-4 bg-[#25D366] text-white rounded-full shadow-[0_12px_40px_rgba(37,211,102,0.4)] hover:shadow-[0_16px_50px_rgba(37,211,102,0.6)] transition-all duration-300 cursor-pointer flex items-center justify-center group overflow-visible focus:outline-none"
          aria-label="Falar no WhatsApp"
        >
          {/* Intense pulse rings */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-45 animate-ping pointer-events-none scale-105"></span>
          <span className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 -z-10"></span>

          {/* Clean high-fidelity vector path SVG */}
          <svg
            className="w-7 h-7 fill-current transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-105"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.1 1.45 4.8 1.45 5.396 0 9.786-4.394 9.79-9.782.002-2.61-1.01-5.063-2.858-6.913a9.71 9.71 0 0 0-6.915-2.853c-5.39 0-9.781 4.394-9.786 9.78-.001 1.77.464 3.49 1.346 5.011l-.988 3.593 3.69-.968zm11.233-6.842c-.22-.11-1.291-.637-1.492-.71-.202-.072-.348-.11-.493.11-.146.22-.564.71-.692.855-.126.145-.254.162-.473.053-.22-.11-.926-.341-1.764-1.09-.65-.58-1.09-1.3-1.216-1.517-.128-.218-.014-.336.095-.445.1-.098.22-.254.33-.382.11-.127.146-.217.22-.363.072-.146.036-.272-.018-.382-.055-.11-.493-1.189-.675-1.63-.178-.426-.356-.37-.492-.376-.127-.007-.273-.008-.419-.008-.146 0-.383.055-.583.273-.2.218-.765.748-.765 1.822 0 1.074.78 2.112.89 2.257.11.145 1.536 2.345 3.722 3.287.52.224.926.358 1.242.459.522.166 1 .142 1.377.086.42-.063 1.292-.527 1.474-1.037.182-.51.182-.947.127-1.038-.054-.09-.202-.144-.422-.255z" fill="currentColor"/>
          </svg>
        </motion.button>

        {/* Instagram Float Button (Prominent & Shiny) */}
        <motion.button
          onClick={handleInstagramClick}
          onMouseEnter={() => setHoveredButton('instagram')}
          onMouseLeave={() => setHoveredButton(null)}
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.93 }}
          className="relative p-3.5 rounded-full text-white shadow-[0_12px_30px_rgba(238,42,123,0.3)] hover:shadow-[0_16px_45px_rgba(238,42,123,0.5)] transition-all duration-300 cursor-pointer flex items-center justify-center group overflow-visible focus:outline-none bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]"
          aria-label="Siga-me no Instagram"
        >
          {/* Subtle pulsate glow background effect */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] opacity-30 animate-pulse pointer-events-none scale-105"></span>
          <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 -z-10"></span>
          
          <Instagram size={22} className="transform transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105" />
        </motion.button>

      </div>
    </div>
  );
};
