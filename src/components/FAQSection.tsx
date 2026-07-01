import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const faqs = [
  {
    question: "Qual é a melhor ração para o meu cachorro?",
    answer: "A escolha ideal depende inteiramente das particularidades individuais do seu cão. Agende uma consulta para avaliarmos a idade, o porte, a rotina e o estado de saúde dele para selecionarmos a melhor indicação."
  },
  {
    question: "Posso misturar ração com comida natural?",
    answer: "A Alimentação Mista traz excelentes benefícios, mas para misturar de forma balanceada e segura, é crucial passar por um atendimento para calcular a quantidade exata para o organismo do seu pet."
  },
  {
    question: "Alimento natural é melhor que ração?",
    answer: "Ambos oferecem excelentes vantagens quando bem orientados. Marque uma conversa para analisarmos a sua rotina e as necessidades físicas do seu animal de forma a escolhermos a dieta ideal."
  },
  {
    question: "Meu cachorro está gordo, como emagrecer com segurança?",
    answer: "O regime de emagrecimento requer uma análise de saúde minuciosa para evitar problemas musculares ou nutricionais. Vamos marcar uma consulta para definir uma meta de peso e prescrever um protocolo clínico de perda de peso."
  },
  {
    question: "Pet com alergia alimentar, o que fazer?",
    answer: "É necessário iniciar um teste de dieta de exclusão clínico orientado de forma detalhada por um profissional. Agende um atendimento de nutrologia para planejarmos o processo correto de identificação do alérgeno."
  },
  {
    question: "Cachorro idoso precisa de ração especial?",
    answer: "Sim, animais idosos exigem cuidado adicional com articulações, rins e peso. Agende uma consulta clínica para avaliarmos exames de sangue e adaptarmos a alimentação ideal para promover longevidade."
  }
];

export const FAQItem = ({ question, answer }: { question: string, answer: string, key?: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-stone-200/60 py-4 last:border-none">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center text-left text-base md:text-lg font-bold text-stone-800 hover:text-primary transition-colors py-3 focus:outline-none focus:ring-0 cursor-pointer"
      >
        <span className="pr-4 font-display font-bold leading-snug">{question}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="shrink-0">
          <ChevronDown size={18} className="text-primary-light" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="mt-2 pb-3 text-stone-700 text-sm md:text-base leading-relaxed font-normal">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
