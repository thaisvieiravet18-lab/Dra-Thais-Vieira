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
    question: "Quanto de ração devo dar por dia para o meu pet?",
    answer: "A quantidade perfeita varia para cada indivíduo. Entre em contato para sabermos mais sobre seu pet, realizar a avaliação de peso ideal e calcular a porção diária precisa de alimento."
  },
  {
    question: "Posso dar frango para o meu cachorro ou gato?",
    answer: "Embora o frango cozido sem temperos seja um ótimo petisco, a porção segura e viabilidade variam de acordo com a saúde de cada pet. Agende um atendimento para descobrirmos quais extras e mimos são indicados e seguros para ele."
  },
  {
    question: "Alimento natural é melhor que ração?",
    answer: "Ambos oferecem excelentes vantagens quando bem orientados. Marque uma conversa para analisarmos a sua rotina e as necessidades físicas do seu animal de forma a escolhermos a dieta ideal."
  },
  {
    question: "O que não pode dar para cachorro?",
    answer: "Existem dezenas de alimentos do dia a dia que provocam intoxicações graves. Recomendamos uma consulta para receber a lista completa de segurança e orientações personalizadas para proteger o seu cão."
  },
  {
    question: "O que dar para cachorro filhote comer?",
    answer: "Garantir a nutrição exata durante o crescimento é essencial para evitar distúrbios na vida adulta. Entre em contato para traçarmos um planejamento alimentar sob medida e altamente seguro para seu filhote."
  },
  {
    question: "Quando posso trocar a ração do filhote para adulto?",
    answer: "O tempo correto de transição metabólica depende do porte do seu pet. No nosso atendimento de acompanhamento, avaliamos o desenvolvimento físico dele para definir o momento perfeito e a melhor estratégia para a mudança."
  },
  {
    question: "Gato filhote pode comer ração de adulto?",
    answer: "Não, pois as carências e o ritmo de crescimento dos gatinhos exigem teores nutricionais muito específicos. Agende uma consulta nutricional inicial para estruturar o cardápio correto para o seu filhote."
  },
  {
    question: "Cachorro idoso precisa de ração especial?",
    answer: "Sim, animais idosos exigem cuidado adicional com articulações, rins e peso. Agende uma consulta clínica para avaliarmos exames de sangue e adaptarmos a alimentação ideal para promover longevidade."
  },
  {
    question: "Meu cachorro está gordo, como emagrecer com segurança?",
    answer: "O regime de emagrecimento requer uma análise de saúde minuciosa para evitar problemas musculares ou nutricionais. Vamos marcar uma consulta para definir uma meta de peso e prescrever um protocolo clínico de perda de peso."
  },
  {
    question: "Como saber se meu pet está no peso ideal?",
    answer: "Para avaliar se o pet está abaixo, no peso ou acima do recomendado, fazemos a avaliação física do escore corporal na consulta. Entre em contato para agendar uma visita e avaliarmos o estado físico dele."
  },
  {
    question: "Cachorro com doença renal pode comer o quê?",
    answer: "Pets que apresentam problemas renais demandam dieta terapêutica de baixíssimo fósforo e máxima hidratação. Por favor, marque um atendimento para que possamos avaliar os exames médicos e montar um plano alimentar preciso."
  },
  {
    question: "Gato com diabetes pode comer ração normal?",
    answer: "Não. A nutrição para controle de diabetes felina é parte fundamental do tratamento clínico. Entre em contato para definirmos uma alimentação especializada para a regulação da glicemia dele."
  },
  {
    question: "Pet com alergia alimentar, o que fazer?",
    answer: "É necessário iniciar um teste de dieta de exclusão clínico orientado de forma detalhada por um profissional. Agende um atendimento de nutrologia para planejarmos o processo correto de identificação do alérgeno."
  },
  {
    question: "Meu gato não bebe água, o que fazer?",
    answer: "A baixa ingestão de água é uma das maiores causas de problemas urinários em felinos. Venha para uma consulta para analisarmos a predisposição urinária do seu gato e implementarmos as estratégias corretas de aumento hídrico."
  },
  {
    question: "Petisco faz mal para cachorro?",
    answer: "De forma indiscriminada sim, podendo causar obesidade e desbalanço nutricional. Agende um atendimento para que possamos prescrever opções e quantidades ideais de petiscos sem prejuízos à saúde geral."
  },
  {
    question: "Pode dar ovo para cachorro?",
    answer: "O ovo é um ingrediente muito rico, contudo deve ser introduzido de acordo com a saúde pancreática e renal do pet. Agende uma conversa para incluí-lo na dieta dele na porção correta."
  },
  {
    question: "Fruta pode para pet? Quais são seguras?",
    answer: "Existem frutas ótimas e frutas tóxicas. Durante a nossa consulta, entregamos um guia completo com porções de frutas seguras e adaptadas especificamente às necessidades energéticas do seu companheiro."
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
