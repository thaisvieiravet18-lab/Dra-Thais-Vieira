import React, { useState } from 'react';
import { X, MessageSquare, Sparkles, CheckCircle2, ShieldCheck, Heart, ArrowRight, Utensils, Lock, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  const handleWhatsAppRedirect = () => {
    const text = `Olá Dra. Thais! Quero agendar a Consulta e Plano de Orientação de Ração Comercial. Pode me enviar o questionário no WhatsApp e os dados Pix para darmos início?`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?phone=5511916539562&text=${encodedText}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && onClose()}>
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden text-stone-900 border border-stone-100 max-h-[85vh] sm:max-h-[90vh] overflow-y-auto my-auto"
            id="modal-agendamento-racao"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3.5 right-3.5 z-20 p-2 text-stone-400 hover:text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors cursor-pointer border-none"
              aria-label="Fechar janela"
            >
              <X size={18} />
            </button>

            {/* Header Banner */}
            <div className="bg-gradient-to-r from-[#1a0033] via-[#3d0066] to-[#1a0033] text-white p-5 sm:p-6 relative overflow-hidden text-left">
              <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-[#a338b9]/30 rounded-full blur-2xl pointer-events-none" />

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-stone-950 font-black text-[10px] uppercase tracking-wider mb-2.5 shadow-sm">
                <Sparkles size={11} className="fill-stone-950" />
                Plano de Ração Personalizado
              </span>

              <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white uppercase leading-tight">
                Orientação de Ração
              </h2>

              <p className="text-stone-200 text-xs font-medium mt-1.5 leading-relaxed">
                Agendamento direto pelo WhatsApp • Focado exclusivamente em cálculo de ração, porções diárias e petiscos.
              </p>
            </div>

            {/* Modal Body Content */}
            <div className="p-5 sm:p-6 space-y-4 text-left">
              
              {/* How it works in 3 clear steps */}
              <div className="space-y-2.5">
                <h3 className="text-[11px] font-black uppercase tracking-wider text-[#a338b9] flex items-center gap-1.5">
                  <Utensils size={15} /> Como Funciona o Agendamento
                </h3>

                <div className="grid grid-cols-1 gap-2.5 text-xs">
                  <div className="flex items-start gap-2.5 p-3 bg-[#FAF8F5] rounded-2xl border border-stone-200/60">
                    <div className="w-6 h-6 rounded-lg bg-[#a338b9] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <span className="font-bold text-stone-900 block text-xs">Chame a Dra. Thais no WhatsApp</span>
                      <span className="text-stone-600 font-medium leading-tight text-[11px] block mt-0.5">Clique no botão abaixo para iniciar a conversa no WhatsApp da veterinária.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 bg-[#FAF8F5] rounded-2xl border border-stone-200/60">
                    <div className="w-6 h-6 rounded-lg bg-[#a338b9] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <span className="font-bold text-stone-900 block text-xs">Questionário Nutricional no WhatsApp</span>
                      <span className="text-stone-600 font-medium leading-tight text-[11px] block mt-0.5">A Dra. Thais enviará as perguntas sobre seu cão ou gato diretamente na conversa.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 bg-[#FAF8F5] rounded-2xl border border-stone-200/60">
                    <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <span className="font-bold text-stone-900 block text-xs">Pagamento via Pix & Entrega do Plano</span>
                      <span className="text-stone-600 font-medium leading-tight text-[11px] block mt-0.5">Pagamento via Pix e envio do Plano de Ração completo com cálculo em gramas.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badges / Guarantees */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 flex items-center gap-2.5">
                <ShieldCheck size={20} className="text-amber-700 shrink-0" />
                <div className="text-[11px] text-amber-900 font-semibold leading-snug">
                  Atendimento individualizado para cães e gatos sob cuidados da Dra. Thais Vieira.
                </div>
              </div>

              {/* Action Button */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleWhatsAppRedirect}
                  className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-xs sm:text-sm py-3.5 px-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border-none uppercase tracking-wider"
                >
                  <MessageSquare size={18} fill="currentColor" />
                  <span>Agendar Plano de Ração no WhatsApp</span>
                </button>

                <p className="text-[10px] text-center text-stone-500 font-medium flex items-center justify-center gap-1">
                  <Lock size={11} className="text-stone-400" />
                  Atendimento direto via WhatsApp • Chave Pix enviada no chat
                </p>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
