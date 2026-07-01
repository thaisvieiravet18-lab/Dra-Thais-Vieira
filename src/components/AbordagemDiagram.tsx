import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Leaf, Sparkles, Bone, ShieldCheck, Heart, ChefHat, Compass, Scale } from "lucide-react";

interface AbordagemDiagramProps {
  openConsulta: (tipo: 'online' | 'presencial') => void;
}

type ModeType = "natural" | "mista" | "racao";

interface FeatureItem {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

interface ModeData {
  id: ModeType;
  tabLabel: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  img: string;
  accentColor: string;
  leftFeatures: FeatureItem[];
  rightFeatures: FeatureItem[];
}

export function AbordagemDiagram({ openConsulta }: AbordagemDiagramProps) {
  const [activeMode, setActiveMode] = useState<ModeType>("natural");

  const data: Record<ModeType, ModeData> = {
    natural: {
      id: "natural",
      tabLabel: "Comida Natural",
      title: "Comida de verdade para uma vida plena",
      desc: "Ingredientes frescos e cozidos sob medida, calculados e suplementados para cobrir todas as necessidades individuais do seu pet.",
      icon: <Leaf size={18} />,
      img: "https://www.petz.com.br/blog/wp-content/uploads/2019/11/alimentacao-natural-cachorro.jpg",
      accentColor: "from-emerald-500 to-teal-600",
      leftFeatures: [
        {
          title: "Comida de Verdade",
          desc: "Carnes nobres, vegetais funcionais e zero conservantes artificiais ou corantes. Saúde pura na tigela.",
          icon: <ChefHat className="text-emerald-500" size={24} />
        },
        {
          title: "Digestibilidade Máxima",
          desc: "Nutrientes altamente absorvíveis que resultam em fezes mais firmes, menos odor e pele visivelmente saudável.",
          icon: <ShieldCheck className="text-emerald-500" size={24} />
        }
      ],
      rightFeatures: [
        {
          title: "Suplementação Precisa",
          desc: "Cálculo detalhado de vitaminas e minerais essenciais para ajudar a manter a dieta natural equilibrada e segura.",
          icon: <Scale className="text-emerald-500" size={24} />
        },
        {
          title: "Preparo com Cuidado",
          desc: "Cozimento a vapor que preserva a integridade de aminoácidos, minerais e o sabor original dos alimentos.",
          icon: <Sparkles className="text-emerald-500" size={24} />
        }
      ]
    },
    mista: {
      id: "mista",
      tabLabel: "Alimentação Mista",
      title: "O melhor de dois mundos",
      desc: "A união inteligente da praticidade da ração seca com a rica hidratação e palatabilidade da alimentação natural fresca.",
      icon: <Sparkles size={18} />,
      img: "https://cachorroverde.com.br/wp-content/uploads/2024/11/1-2.png",
      accentColor: "from-amber-500 to-orange-600",
      leftFeatures: [
        {
          title: "Praticidade e Frescor",
          desc: "A facilidade do dia a dia combinada com os benefícios biológicos de alimentos frescos de alta qualidade.",
          icon: <Compass className="text-amber-500" size={24} />
        },
        {
          title: "Hidratação Natural",
          desc: "A adição de comida úmida ajuda a proteger o trato urinário e rins de cães e gatos de forma preventiva.",
          icon: <Heart className="text-amber-500" size={24} />
        }
      ],
      rightFeatures: [
        {
          title: "Excelente Palatabilidade",
          desc: "Ideal para pets exigentes ou idosos que começaram a perder o interesse ou apetite pela ração seca convencional.",
          icon: <Sparkles className="text-amber-500" size={24} />
        },
        {
          title: "Equilíbrio Econômico",
          desc: "Oferece os incríveis benefícios da alimentação natural com um custo mensal otimizado e viável.",
          icon: <Scale className="text-amber-500" size={24} />
        }
      ]
    },
    racao: {
      id: "racao",
      tabLabel: "Ração de Alta Gama",
      title: "Ração Premium Otimizada",
      desc: "Escolha científica da melhor ração do mercado (super premium ou terapêutica) e cálculo exato de quantidade para evitar sobrepeso.",
      icon: <Bone size={18} />,
      img: "https://petcare.com.br/wp-content/uploads/2023/08/cachorro-branco-e-marrom-faminto-com-orelhas-grandes-e-olhos-castanhos-prontos-para-comer-uma-tigela-cheia-de-comida-1.jpg",
      accentColor: "from-indigo-500 to-purple-600",
      leftFeatures: [
        {
          title: "Seleção Crítica",
          desc: "Não indicamos marcas por publicidade. Analisamos rótulos para indicar uma ração com proteínas de alta qualidade.",
          icon: <ShieldCheck className="text-indigo-500" size={24} />
        },
        {
          title: "Cálculo Calórico Exato",
          desc: "Ajuste preciso das gramas diárias para a idade, nível de atividade e peso ideal do seu companheiro.",
          icon: <Scale className="text-indigo-500" size={24} />
        }
      ],
      rightFeatures: [
        {
          title: "Fórmulas Terapêuticas",
          desc: "Prescrição de rações coadjuvantes específicas para o suporte de problemas renais, cardíacos ou alergias.",
          icon: <Heart className="text-indigo-500" size={24} />
        },
        {
          title: "Prevenção de Obesidade",
          desc: "Mais segurança de que seu pet consome o volume exato, combatendo o sobrepeso silencioso de forma clínica.",
          icon: <Compass className="text-indigo-500" size={24} />
        }
      ]
    }
  };

  useEffect(() => {
    const modes: ModeType[] = ["natural", "mista", "racao"];
    const timer = setTimeout(() => {
      setActiveMode((prev) => {
        const currentIndex = modes.indexOf(prev);
        const nextIndex = (currentIndex + 1) % modes.length;
        return modes[nextIndex];
      });
    }, 7500); // 7.5 segundos para uma leitura confortável e tranquila

    return () => clearTimeout(timer);
  }, [activeMode]);

  const current = data[activeMode];

  return (
    <div className="mt-16 pt-12 border-t border-stone-200/50" id="abordagem-nutricional">
      {/* HEADER DA SEÇÃO */}
      <div className="text-center mb-12 max-w-3xl mx-auto space-y-4">
        <span className="text-[11px] font-black text-[#a338b9] tracking-[0.25em] uppercase font-sans block">
          Como Alimentar seu Companheiro
        </span>
        <h3 className="text-3xl md:text-5xl font-black text-[#111827] font-display uppercase tracking-tight">
          Seu pet também merece comida de verdade
        </h3>
        <p className="text-stone-700 font-semibold text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-sans">
          Acreditamos que a alimentação ideal transforma a saúde do seu pet. Seja qual for a rotina e o organismo dele, planejamos a nutrição perfeita com base científica e carinho.
        </p>
      </div>

      {/* TABS DE SELEÇÃO DE ABORDAGEM */}
      <div className="flex justify-center mb-16 px-4">
        <div className="inline-flex bg-stone-100 p-1.5 rounded-full border border-stone-200 shadow-inner max-w-full overflow-x-auto gap-1">
          {(Object.keys(data) as ModeType[]).map((modeKey) => {
            const item = data[modeKey];
            const isActive = activeMode === modeKey;
            return (
              <button
                key={modeKey}
                onClick={() => setActiveMode(modeKey)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-bold tracking-tight transition-all duration-300 whitespace-nowrap outline-none ${
                  isActive
                    ? "bg-white text-[#a338b9] shadow-md"
                    : "text-stone-600 hover:text-[#a338b9] hover:bg-white/50"
                }`}
                id={`tab-abordagem-${modeKey}`}
              >
                {item.icon}
                {item.tabLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* DIAGRAMA INTERATIVO (Abordagem Chef Bob Style) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center max-w-7xl mx-auto px-4 md:px-8">
        
        {/* COLUNA ESQUERDA - CARACTERÍSTICAS (Otimizado para mobile em 2 colunas) */}
        <div className="lg:col-span-4 order-2 lg:order-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMode}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-0 lg:space-y-10 text-left"
            >
              {current.leftFeatures.map((feat, idx) => (
                <div key={idx} className="group flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-stone-50 transition-colors duration-300" id={`feat-left-${activeMode}-${idx}`}>
                  <div className="p-2 sm:p-3 bg-white rounded-xl shadow-sm border border-stone-100 shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {feat.icon}
                  </div>
                  <div className="space-y-1 sm:space-y-1.5">
                    <h4 className="text-sm sm:text-base lg:text-lg font-bold text-[#111827] font-display leading-tight">
                      {feat.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs lg:text-sm text-stone-600 leading-relaxed font-sans font-medium line-clamp-4">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* COLUNA CENTRAL - PRATO DINÂMICO INTERATIVO */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[350px] md:h-[350px] flex items-center justify-center">
            
            {/* Ambient decorative glowing shadow ring based on active option color */}
            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${current.accentColor} opacity-[0.06] blur-[24px] scale-110 transition-all duration-700`} />
            
            {/* Circular frame wrapper styled like a plate */}
            <div className="relative w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] md:w-[340px] md:h-[340px] rounded-full bg-white p-3 shadow-[0_25px_60px_rgba(0,0,0,0.08)] border border-stone-100 flex items-center justify-center overflow-hidden group">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMode}
                  initial={{ opacity: 0, scale: 0.9, rotate: -15 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotate: 15 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full rounded-full overflow-hidden"
                >
                  <img
                    src={current.img}
                    alt={current.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Selection indicators laid overlay style on the diagram */}
              <div className="absolute inset-0 pointer-events-none rounded-full border-[10px] border-white/95" />
            </div>

            {/* Quick action helper overlay */}
            <div className="absolute -bottom-6 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full shadow-md border border-stone-200/50 text-[10px] font-bold text-stone-500 uppercase tracking-widest pointer-events-none">
              Passe o mouse para mudar
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA - CARACTERÍSTICAS (Otimizado para mobile em 2 colunas) */}
        <div className="lg:col-span-4 order-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMode}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-0 lg:space-y-10 text-left"
            >
              {current.rightFeatures.map((feat, idx) => (
                <div key={idx} className="group flex flex-col sm:flex-row items-start lg:items-start gap-3 sm:gap-4 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-stone-50 transition-colors duration-300" id={`feat-right-${activeMode}-${idx}`}>
                  <div className="p-2 sm:p-3 bg-white rounded-xl shadow-sm border border-stone-100 shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {feat.icon}
                  </div>
                  <div className="space-y-1 sm:space-y-1.5">
                    <h4 className="text-sm sm:text-base lg:text-lg font-bold text-[#111827] font-display leading-tight">
                      {feat.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs lg:text-sm text-stone-600 leading-relaxed font-sans font-medium line-clamp-4">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* FOOTER ACTION BUTTON */}
      <div className="text-center mt-16">
        <button
          onClick={() => openConsulta("online")}
          className="inline-flex items-center gap-2 bg-[#a338b9] hover:bg-[#812099] text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
          id="btn-abordagem-cta"
        >
          <Sparkles size={16} /> Planejar alimentação do meu pet
        </button>
      </div>
    </div>
  );
}
