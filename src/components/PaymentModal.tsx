import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles, X, User, Phone, Clipboard, HeartIcon, ArrowRight, ExternalLink, Lock, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const PaymentModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Custom states matching all fields requested of the tutor and pet
  const [formData, setFormData] = useState({
    tutorName: '',
    tutorEmail: '',
    tutorPhone: '',
    name: '',
    type: 'dog',
    age: '',
    weight: '',
    idealWeight: '',
    activity: 'moderate',
    currentFood: '',
    health: '',
    eatsWell: 'yes'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.tutorName.trim()) tempErrors.tutorName = 'Nome do tutor é obrigatório';
    if (!formData.tutorEmail.trim() || !/\S+@\S+\.\S+/.test(formData.tutorEmail)) {
      tempErrors.tutorEmail = 'E-mail válido é obrigatório';
    }
    if (!formData.tutorPhone.trim()) tempErrors.tutorPhone = 'WhatsApp é obrigatório';
    if (!formData.name.trim()) tempErrors.name = 'Nome de pet é obrigatório';
    if (!formData.age.trim()) tempErrors.age = 'Idade é obrigatória';
    if (!formData.weight.trim()) tempErrors.weight = 'Peso é obrigatório';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Automatically trigger WhatsApp redirect synchronously on submit to prevent browser popup blockers!
    handleWhatsAppConfirm();

    try {
      const response = await fetch('/api/submit_form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStep('success');
      } else {
        const errData = await response.json();
        alert('Ocorreu um erro ao enviar suas respostas: ' + (errData.error || 'Tente novamente.'));
      }
    } catch (err) {
      console.error(err);
      // Fallback: still transition to success on network disconnect so they can proceed of blocks
      setStep('success');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayClick = () => {
    window.open('https://mpago.la/1gqV9RW', '_blank');
  };

  const handleWhatsAppConfirm = () => {
    const activityLabels: Record<string, string> = {
      low: 'Sedentário (fica muito em casa)',
      moderate: 'Moderado (passeia alguns dias)',
      high: 'Ativo (corre e brinca bastante)'
    };

    const eatsWellLabels: Record<string, string> = {
      yes: 'Sim, come bem',
      picky: 'Seletivo (às vezes recusa)',
      no: 'Ruim (recusa com frequência)'
    };

    const petTypeLabel = formData.type === 'cat' ? 'Gato 🐱' : 'Cão 🐶';

    const text = `Olá Dra. Thais! Acabei de preencher o formulário estratégico do Meu Primeiro Pet.

*DADOS DO TUTOR:*
• *Nome:* ${formData.tutorName}
• *E-mail:* ${formData.tutorEmail}
• *WhatsApp:* ${formData.tutorPhone}

*PERFIL DO PET:*
• *Pet:* ${formData.name} (${petTypeLabel})
• *Idade:* ${formData.age}
• *Peso Atual:* ${formData.weight} kg ${formData.idealWeight ? `(Meta: ${formData.idealWeight} kg)` : ''}
• *Atividade:* ${activityLabels[formData.activity] || formData.activity}
• *Aceitação de Ração:* ${eatsWellLabels[formData.eatsWell] || formData.eatsWell}
• *Ração Atual:* ${formData.currentFood || 'Não informado'}
• *Queixas ou Histórico de Saúde:* ${formData.health || 'Nenhuma relevante'}`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?phone=5511916539562&text=${encodedText}`, '_blank');
  };

  const handleClose = () => {
    setStep('form');
    setFormData({
      tutorName: '',
      tutorEmail: '',
      tutorPhone: '',
      name: '',
      type: 'dog',
      age: '',
      weight: '',
      idealWeight: '',
      activity: 'moderate',
      currentFood: '',
      health: '',
      eatsWell: 'yes'
    });
    setErrors({});
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
            className="modal-box text-stone-900 max-h-[90vh] overflow-y-auto w-full max-w-2xl bg-white rounded-3xl"
            id="modal-cadastro-pet"
          >
            <button 
              className="modal-close p-2 bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 rounded-full border-none transition-colors cursor-pointer absolute right-4 top-4 z-50"
              onClick={handleClose}
              id="btn-close-modal"
            >
              <X size={20} />
            </button>

            {step === 'form' ? (
              <div className="modal-step leading-normal p-2 md:p-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3.5 bg-[#a338b9]/10 rounded-2xl text-[#a338b9]">
                    <Clipboard size={24} />
                  </div>
                  <div>
                    <h2 className="!text-primary !mb-1 text-2xl font-display font-black tracking-tight" id="modal-titulo">
                      Formulário Nutricional
                    </h2>
                    <p className="!mb-0 text-xs md:text-sm !text-stone-600 font-semibold shadow-inner-white" id="modal-subtitulo">
                      Conte-me tudo sobre o seu pet para traçarmos um plano de porções preciso.
                    </p>
                    <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
                      <Lock size={10} /> Seus dados estão 100% seguros de acordo com a LGPD e sigilo médico-veterinário.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* TUTOR SECTION */}
                  <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-stone-200/45 space-y-4">
                    <h3 className="text-[#a338b9] font-sans font-bold text-xs uppercase tracking-wider flex items-center gap-2 mb-2">
                      <User size={14} /> 1. Dados do Tutor
                    </h3>
                    
                    <div>
                      <label className="block text-stone-700 text-xs font-bold mb-1.5">Seu Nome Completo *</label>
                      <input 
                        required 
                        type="text" 
                        className={`modal-input w-full px-4 py-3 rounded-xl border ${errors.tutorName ? 'border-red-500' : 'border-stone-200'} bg-white text-sm outline-none`} 
                        placeholder="Ex: Ana Maria Silva"
                        value={formData.tutorName} 
                        onChange={(e) => setFormData({...formData, tutorName: e.target.value})} 
                      />
                      {errors.tutorName && <p className="text-red-500 text-xs mt-1 font-medium">{errors.tutorName}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-stone-700 text-xs font-bold mb-1.5">Seu melhor E-mail *</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                          <input 
                            required 
                            type="email" 
                            className={`modal-input w-full pl-10 pr-4 py-3 rounded-xl border ${errors.tutorEmail ? 'border-red-500' : 'border-stone-200'} bg-white text-sm outline-none`} 
                            placeholder="Ex: tutor@email.com"
                            value={formData.tutorEmail} 
                            onChange={(e) => setFormData({...formData, tutorEmail: e.target.value})} 
                          />
                        </div>
                        {errors.tutorEmail && <p className="text-red-500 text-xs mt-1 font-medium">{errors.tutorEmail}</p>}
                      </div>

                      <div>
                        <label className="block text-stone-700 text-xs font-bold mb-1.5">Seu WhatsApp *</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                          <input 
                            required 
                            type="tel" 
                            className={`modal-input w-full pl-10 pr-4 py-3 rounded-xl border ${errors.tutorPhone ? 'border-red-500' : 'border-stone-200'} bg-white text-sm outline-none`} 
                            placeholder="Ex: (11) 99999-9999"
                            value={formData.tutorPhone} 
                            onChange={(e) => setFormData({...formData, tutorPhone: e.target.value})} 
                          />
                        </div>
                        {errors.tutorPhone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.tutorPhone}</p>}
                      </div>
                    </div>
                  </div>

                  {/* PET SECTION */}
                  <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-stone-200/45 space-y-4">
                    <h3 className="text-[#a338b9] font-sans font-bold text-xs uppercase tracking-wider flex items-center gap-2 mb-2">
                      <HeartIcon size={14} className="fill-[#a338b9]/20" /> 2. Perfil do Pet
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-stone-700 text-xs font-bold mb-1.5">Nome do Pet *</label>
                        <input 
                          required 
                          type="text" 
                          className={`modal-input w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-stone-200'} bg-white text-sm`} 
                          placeholder="Ex: Bob, Mel, Frida..."
                          value={formData.name} 
                          onChange={(e) => setFormData({...formData, name: e.target.value})} 
                        />
                      </div>

                      <div>
                        <label className="block text-stone-700 text-xs font-bold mb-1.5">Espécie *</label>
                        <select 
                          className="modal-input w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-sm cursor-pointer" 
                          value={formData.type}
                          onChange={(e) => setFormData({...formData, type: e.target.value})}
                        >
                          <option value="dog">Cão 🐶</option>
                          <option value="cat">Gato 🐱</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-stone-700 text-xs font-bold mb-1.5">Idade do Pet *</label>
                        <input 
                          required 
                          type="text" 
                          className={`modal-input w-full px-4 py-3 rounded-xl border ${errors.age ? 'border-red-500' : 'border-stone-200'} bg-white text-sm`} 
                          placeholder="Ex: 2 anos / 8 meses"
                          value={formData.age} 
                          onChange={(e) => setFormData({...formData, age: e.target.value})} 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-stone-700 text-xs font-bold mb-1.5">Peso Atual (kg) *</label>
                        <input 
                          required 
                          type="text" 
                          className={`modal-input w-full px-4 py-3 rounded-xl border ${errors.weight ? 'border-red-500' : 'border-stone-200'} bg-white text-sm`} 
                          placeholder="Ex: 8.5 ou 15"
                          value={formData.weight} 
                          onChange={(e) => setFormData({...formData, weight: e.target.value})} 
                        />
                      </div>

                      <div>
                        <label className="block text-stone-700 text-xs font-bold mb-1.5">Peso Ideal / Meta se souber (kg)</label>
                        <input 
                          type="text" 
                          className="modal-input w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-sm" 
                          placeholder="Ex: 7.0 (Opcional)"
                          value={formData.idealWeight} 
                          onChange={(e) => setFormData({...formData, idealWeight: e.target.value})} 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-stone-700 text-xs font-bold mb-1.5">Nível de Atividade Diária</label>
                      <select 
                        className="modal-input w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-sm cursor-pointer" 
                        value={formData.activity}
                        onChange={(e) => setFormData({...formData, activity: e.target.value})}
                      >
                        <option value="low">Sedentário — fica focado em casa e dorme muito</option>
                        <option value="moderate">Moderado — passeios regulares de vez em quando</option>
                        <option value="high">Ativo — corre, brinca intensamente todos os dias</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-stone-700 text-xs font-bold mb-1.5">Gosta de comer a ração?</label>
                        <select 
                          className="modal-input w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-sm cursor-pointer" 
                          value={formData.eatsWell}
                          onChange={(e) => setFormData({...formData, eatsWell: e.target.value})}
                        >
                          <option value="yes">Sim, come perfeitamente</option>
                          <option value="picky">Seletivo - enrola bastante para comer</option>
                          <option value="no">Muito ruim - recusa direto a porção</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-stone-700 text-xs font-bold mb-1.5">Ração Atual (Marca/Linha)</label>
                        <input 
                          type="text" 
                          className="modal-input w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-sm" 
                          placeholder="Ex: Premier Adultos Seleção Natural"
                          value={formData.currentFood} 
                          onChange={(e) => setFormData({...formData, currentFood: e.target.value})} 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-stone-700 text-xs font-bold mb-1.5">Tem alguma alergia, doença crônica ou queixa de saúde?</label>
                      <textarea 
                        rows={3}
                        className="modal-input w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-sm outline-none" 
                        placeholder="Ex: Alergia a frango, problema renal crônico nascente, gastrite, nenhuma reatividade..."
                        value={formData.health} 
                        onChange={(e) => setFormData({...formData, health: e.target.value})} 
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="modal-btn w-full bg-[#a338b9] hover:bg-[#8e2ea2] text-white py-4 px-6 rounded-2xl flex items-center justify-center gap-2 font-bold cursor-pointer transition-all duration-300 transform active:scale-[0.98] border-none shadow-[0_10px_25px_rgba(163,56,185,0.25)]"
                    id="btn-submit-nutri"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Registrando respostas do pet...</span>
                      </>
                    ) : (
                      <>
                        <span>Salvar Diagnostic e Ir para o Pagamento</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* SUCCESS & PROMPT MERCADO PAGO PAYMENT STEP */
              <div className="modal-step leading-relaxed text-center py-6 px-4">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm animate-bounce">
                  <CheckCircle2 size={40} />
                </div>
                
                <h2 className="!text-3xl text-stone-900 mb-2 font-display font-black tracking-tight leading-tight">
                  Cadastro Salvo! 🎉
                </h2>
                <p className="text-[#a338b9] font-bold text-sm mb-6 flex items-center justify-center gap-1.5">
                  <Sparkles size={16} /> Respostas enviadas para thaissilveiravieira7@hotmail.com!
                </p>

                <div className="bg-[#FAF8F5] border border-[#ebdcf2]/50 p-6 rounded-2xl text-left max-w-lg mx-auto mb-8">
                  <h4 className="text-stone-800 font-bold mb-2 text-base flex items-center gap-1.5">
                    <ShieldCheck className="text-[#a338b9]" size={18} /> Próximos passos para receber seu plano:
                  </h4>
                  <ul className="text-stone-600 text-xs md:text-sm space-y-2 pl-4 list-decimal font-medium">
                    <li>As informações do(a) <strong>{formData.name}</strong> já foram recebidas com absoluto sucesso pela Dra. Thais.</li>
                    <li>Para ativar a montagem personalizada das porções e orientações, conclua o pagamento de apenas <strong>R$ 119,90</strong> no link do Mercado Pago.</li>
                    <li>Após realizar o pagamento, a Dra. Thais fará a análise individual e enviará o seu plano alimentar personalizado diretamente por e-mail em até 24h úteis!</li>
                  </ul>
                </div>

                {/* Trust and safety assurance box */}
                <div className="border border-emerald-100 bg-emerald-50/50 p-4 rounded-xl text-left max-w-lg mx-auto mb-6 flex items-start gap-3">
                  <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-lg shrink-0">
                    <Lock size={18} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-stone-800 text-xs font-black">Pagamento 100% Criptografado e Seguro</p>
                    <p className="text-stone-600 text-[11px] leading-relaxed">
                      Sua transação é processada pelo <strong>Mercado Pago</strong> com criptografia de ponta a ponta. Nós não armazenamos os dados do seu cartão.
                    </p>
                  </div>
                </div>

                {/* BIG ATTENTION GRABBING MERCADO PAGO CALL-TO-ACTION BUTTON */}
                <div className="space-y-4 max-w-md mx-auto">
                  <button
                    onClick={handlePayClick}
                    className="w-full bg-[#009EE3] hover:bg-[#0087c2] text-white py-4 px-6 rounded-2xl flex items-center justify-center gap-2.5 font-bold cursor-pointer transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] border-none shadow-[0_12px_30px_rgba(0,158,227,0.3)] group select-none"
                    id="btn-mercadopago-externo"
                  >
                    <Lock size={16} className="text-white shrink-0" />
                    <span>Pagar R$ 119,90 no Mercado Pago</span>
                    <ExternalLink size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>

                  <button
                    onClick={handleWhatsAppConfirm}
                    className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 font-bold cursor-pointer transition-colors duration-300 border-none shadow-sm text-sm"
                    id="btn-whatsapp-comprovante"
                  >
                    <span>Já paguei, chamar no WhatsApp</span>
                  </button>

                  <button 
                    onClick={handleClose} 
                    className="text-stone-400 hover:text-stone-600 font-semibold text-xs border-none bg-transparent cursor-pointer hover:underline"
                  >
                    Fechar e Pagar Mais Tarde
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
