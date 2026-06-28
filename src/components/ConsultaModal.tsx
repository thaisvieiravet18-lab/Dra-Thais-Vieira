import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ConsultaModal = ({ 
  isOpen, 
  onClose,
  initialFormat = 'online'
}: { 
  isOpen: boolean, 
  onClose: () => void,
  initialFormat?: 'online' | 'presencial' | 'insurance'
}) => {
  const [tutorName, setTutorName] = useState('');
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('dog');
  const [breed, setBreed] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [reason, setReason] = useState('preventive');
  const [format, setFormat] = useState<'online' | 'presencial' | 'insurance'>('online');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync prop changes when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormat(initialFormat);
    }
  }, [isOpen, initialFormat]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send the appointment details to the backend to email Dra. Thais
      await fetch('/api/submit_appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tutorName,
          petName,
          petType,
          breed,
          whatsapp,
          reason,
          format
        })
      });
    } catch (err) {
      console.error('Erro ao enviar agendamento por e-mail:', err);
    }
    
    const goals: { [key: string]: string } = {
      preventive: 'Saúde preventiva / Checklist nutricional',
      natural: 'Transição para Alimentação Natural (AN)',
      mixed: 'Transição para dieta mista (Ração + AN)',
      obesity: 'Tratamento de obesidade / Controle de peso',
      allergy: 'Investigação de alergia alimentar / Coceira',
      disease: 'Suporte nutricional para doença (diabetes/renal/etc)',
      other: 'Outro assunto nutricional'
    };

    const formatLabels: { [key: string]: string } = {
      online: '💻 Online (Teleconsulta)',
      presencial: '🏥 Presencial (São Paulo)',
      insurance: '📄 Convênio (Plano de Saúde / Reembolso)'
    };
    
    const text = `Olá Dra. Thais! Solicitei um agendamento de consulta nutricional do *Meu Primeiro Pet* através do site.

*DADOS DO AGENDAMENTO:*
• *Formato:* ${formatLabels[format] || format}
• *Tutor(a):* ${tutorName}
• *Pet:* ${petName} (${petType === 'dog' ? 'Cão 🐶' : 'Gato 🐱'})
• *Raça / Porte:* ${breed}
• *WhatsApp:* ${whatsapp}
• *Objetivo:* ${goals[reason] || reason}`;
    
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=5511916539562&text=${encodedText}`;
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleWhatsAppRedirect = () => {
    const goals: { [key: string]: string } = {
      preventive: 'Saúde preventiva / Checklist nutricional',
      natural: 'Transição para Alimentação Natural (AN)',
      mixed: 'Transição para dieta mista (Ração + AN)',
      obesity: 'Tratamento de obesidade / Controle de peso',
      allergy: 'Investigação de alergia alimentar / Coceira',
      disease: 'Suporte nutricional para doença (diabetes/renal/etc)',
      other: 'Outro assunto nutricional'
    };

    const formatLabels: { [key: string]: string } = {
      online: '💻 Online (Teleconsulta)',
      presencial: '🏥 Presencial (São Paulo)',
      insurance: '📄 Convênio (Plano de Saúde / Reembolso)'
    };
    
    const text = `Olá Dra. Thais! Solicitei um agendamento de consulta nutricional do *Meu Primeiro Pet* através do site.

*DADOS DO AGENDAMENTO:*
• *Formato:* ${formatLabels[format] || format}
• *Tutor(a):* ${tutorName}
• *Pet:* ${petName} (${petType === 'dog' ? 'Cão 🐶' : 'Gato 🐱'})
• *Raça / Porte:* ${breed}
• *WhatsApp:* ${whatsapp}
• *Objetivo:* ${goals[reason] || reason}`;
    
    const encodedText = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?phone=5511916539562&text=${encodedText}`, '_blank');
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setTutorName('');
    setPetName('');
    setBreed('');
    setWhatsapp('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && handleClose()}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="modal-box max-h-[90vh] overflow-y-auto"
          >
            <button className="modal-close" onClick={handleClose}><X size={24} /></button>
            
            {!isSubmitted ? (
              <div className="modal-step leading-normal text-stone-900">
                <h2 className="!text-primary mb-4 font-display font-bold">Agendar Consulta</h2>
                <p className="!text-stone-700 font-medium text-sm md:text-base mb-6">
                  Preencha os dados básicos abaixo para solicitar sua consulta nutricional personalizada (Atendimento Online para todo o Brasil ou Presencial em São Paulo).
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-600 mb-1">Seu Nome Completo (Tutor/a)</label>
                      <input required type="text" className="modal-input !mb-0" placeholder="Digite seu nome"
                        value={tutorName} onChange={(e) => setTutorName(e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-600 mb-1">Formato de Atendimento</label>
                      <select className="modal-input !mb-0 bg-stone-50 text-stone-800 font-medium" value={format}
                        onChange={(e) => setFormat(e.target.value as any)}>
                        <option value="online">Online (Teleconsulta para todo o Brasil)</option>
                        <option value="presencial">Presencial (Consultório em São Paulo - SP)</option>
                        <option value="insurance">Convênio (Plano de saúde / Reembolso)</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-600 mb-1">Nome do Pet</label>
                      <input required type="text" className="modal-input !mb-0" placeholder="Ex: Mel"
                        value={petName} onChange={(e) => setPetName(e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-600 mb-1">Cão ou Gato?</label>
                      <select className="modal-input !mb-0 bg-stone-50" value={petType}
                        onChange={(e) => setPetType(e.target.value)}>
                        <option value="dog">Cão</option>
                        <option value="cat">Gato</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-600 mb-1">Raça / Porte</label>
                      <input required type="text" className="modal-input !mb-0" placeholder="Ex: Golden, SRD..."
                        value={breed} onChange={(e) => setBreed(e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-600 mb-1">Seu WhatsApp</label>
                      <input required type="tel" className="modal-input !mb-0" placeholder="Ex: (11) 99999-9999"
                        value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-600 mb-1">Foco Principal da Consulta</label>
                    <select className="modal-input !mb-0 bg-stone-50 text-stone-800" value={reason}
                      onChange={(e) => setReason(e.target.value)}>
                      <option value="preventive">Saúde preventiva / Ração ideal e quantidades</option>
                      <option value="natural">Quero transicionar para Alimentação Natural (AN)</option>
                      <option value="mixed">Quero transicionar para dieta mista (Ração + AN)</option>
                      <option value="obesity">Tratamento de obesidade / Sobrepeso silencioso</option>
                      <option value="allergy">Investigação de alergia alimentar / Coceiras / Pele sensível</option>
                      <option value="disease">Doença crônica (Diabetes, Doença Renal, Hepática, Gastrointestinal)</option>
                      <option value="other">Outra demanda específica</option>
                    </select>
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`modal-btn mt-6 cursor-pointer font-semibold flex items-center justify-center gap-2 ${
                      isSubmitting 
                        ? "!bg-stone-400 cursor-not-allowed text-stone-200" 
                        : "!bg-primary hover:!bg-primary-dark text-white"
                    }`}
                  >
                    {isSubmitting ? (
                      "Enviando solicitação..."
                    ) : (
                      <>Confirmar Cadastro <ArrowRight size={20} /></>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="modal-step text-center py-6 leading-normal">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                  <CheckCircle2 size={32} />
                </div>
                <h2 className="!text-primary mb-3 font-display font-bold">Cadastro Recebido! 🎉</h2>
                <p className="!text-stone-700 font-medium !mb-6 text-sm md:text-base">
                  Seus dados foram enviados com sucesso por e-mail para a Dra. Thais. Se preferir conversar direto com ela agora mesmo pelo WhatsApp, clique no botão abaixo.
                </p>
                <button onClick={handleWhatsAppRedirect} className="modal-btn bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center gap-2 border-none font-extrabold cursor-pointer py-4 rounded-2xl shadow-[0_8px_20px_rgba(37,211,102,0.2)] hover:scale-[1.01] transition-transform">
                  <MessageSquare size={20} />
                  Falar com Dra. Thais no WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
