import { BlogArticle, ServiceLandingInfo } from '../types/blog';

export const BLOG_CATEGORIES = [
  'Alimentação natural',
  'Escolha de ração',
  'Gatos',
  'Filhotes e primeiro pet',
  'Rações terapêuticas',
  'Nutrição veterinária online',
] as const;

export const SERVICE_LANDINGS: Record<string, ServiceLandingInfo> = {
  'nutricao-pet-online': {
    slug: 'nutricao-pet-online',
    title: 'Consulta Nutricional Pet Online | Dra. Thais Vieira',
    headline: 'Consulta Nutricional Pet Online para Cães e Gatos em Todo o Brasil',
    description: 'Atendimento veterinário especializado 100% online. Prescrição de dietas personalizadas, cálculo preciso de porções e acompanhamento contínuo para a saúde do seu pet.',
    keywords: ['consulta nutricional pet online', 'veterinária nutróloga online', 'dieta personalizada para cães e gatos'],
    benefits: [
      'Atendimento no conforto do seu lar sem estressar seu pet',
      'Plano alimentar individualizado (Ração ideal ou Alimentação Natural)',
      'Acompanhamento direto via WhatsApp para ajustes de porção',
      'Avaliação completa do perfil do cão ou gato'
    ],
    formatKey: 'online',
  },
  'alimentacao-natural-para-caes': {
    slug: 'alimentacao-natural-para-caes',
    title: 'Alimentação Natural para Cães | Dra. Thais Vieira',
    headline: 'Alimentação Natural Balanceada e Segura para Cães',
    description: 'Aprenda como oferecer uma dieta caseira balanceada (cozida) formulada por médica veterinária nutróloga. Nutrição de verdade, sem riscos de deficiências nutricionais.',
    keywords: ['alimentação natural para cães', 'dieta caseira balanceada cachorro', 'AN veterinária cães'],
    benefits: [
      'Cardápio sob medida calculado com suplementação mineral e vitamínica exata',
      'Ingredientes frescos e palatáveis ideais para cães seletivos',
      'Excelente suporte para cães com alergias ou estômago sensível',
      'Acompanhamento veterinário com exames periódicos de controle'
    ],
    formatKey: 'online',
  },
  'alimentacao-natural-para-gatos': {
    slug: 'alimentacao-natural-para-gatos',
    title: 'Alimentação Natural para Gatos | Dra. Thais Vieira',
    headline: 'Alimentação Natural e Úmida com Foco em Saúde Renal e Urinária dos Gatos',
    description: 'Dietas carnívoras estritas com alta hidratação para felinos. Proteja os rins do seu gato com orientação nutricional especializada.',
    keywords: ['alimentação natural para gatos', 'dieta úmida gatos renal', 'nutrição felina especializada'],
    benefits: [
      'Preservação da saúde renal e do trato urinário inferior (FLUTD)',
      'Transição suave para evitar inapetência felina severa',
      'Suplementação obrigatória de taurina, vitaminas e minerais essenciais',
      'Opções de dietas úmidas preparadas em casa ou rações úmidas selecionadas'
    ],
    formatKey: 'online',
  },
  'racao-terapeutica-para-caes-e-gatos': {
    slug: 'racao-terapeutica-para-caes-e-gatos',
    title: 'Orientação para Ração Terapêutica | Dra. Thais Vieira',
    headline: 'Orientação para Ração Terapêutica em Cães e Gatos',
    description: 'Prescrição e acompanhamento técnico para rações coadjuvantes (renais, hipoalergênicas, obesas, gastrointestinais). O alimento como parte do tratamento médico.',
    keywords: ['orientação para ração terapêutica', 'ração medicamentosa cães gatos', 'nutrição clínica veterinária'],
    benefits: [
      'Indicação precisa da linha terapêutica certa para o diagnóstico do pet',
      'Manejamento de transição para aceitação por animais doentes',
      'Combinação de tratamento nutricional com a equipe veterinária assistente',
      'Monitoramento de peso e marcadores biológicos'
    ],
    formatKey: 'online',
  },
  'consulta-primeiro-pet': {
    slug: 'consulta-primeiro-pet',
    title: 'Consulta para Primeiro Pet | Dra. Thais Vieira',
    headline: 'Consulta para Primeiro Pet: Comece a Vida do Seu Filhote com Nutrição Correta',
    description: 'Orientação completa para novos tutores de cães e gatos. Escolha da ração de filhote, quantidade exata, petiscos permitidos e prevenção de obesidade desde os primeiros meses.',
    keywords: ['consulta para primeiro pet', 'nutrição para filhotes', 'primeiro cachorro gato alimentação'],
    benefits: [
      'Manual alimentar do filhote com gramatura ajustada ao crescimento',
      'Orientação sobre o que NUNCA oferecer para cães e gatos',
      'Rotina de alimentação sem viciar o pet em petiscos não saudáveis',
      'Suporte direto por WhatsApp para tirar dúvidas com a veterinária'
    ],
    formatKey: 'online',
  },
};

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'qual-racao-dar-para-filhote',
    slug: 'qual-racao-dar-para-filhote',
    title: 'Qual ração dar para filhote? Guia para quem tem o primeiro pet',
    metaTitle: 'Qual ração dar para filhote? Guia Completo Primeiro Pet | Dra. Thais Vieira',
    metaDescription: 'Dúvidas sobre qual ração dar para filhote de cão ou gato? Descubra o que observar no rótulo, frequências das refeições e como garantir um crescimento saudável.',
    mainKeyword: 'qual ração dar para filhote',
    secondaryKeywords: ['melhor ração para filhote', 'primeiro pet', 'ração para cachorro filhote', 'ração para gato filhote'],
    category: 'Filhotes e primeiro pet',
    intent: 'Tutor iniciante que acabou de adotar ou comprar um filhote e está inseguro sobre a alimentação.',
    publishDate: '2026-07-20',
    readTime: '6 min de leitura',
    author: {
      name: 'Dra. Thais Vieira',
      role: 'Médica Veterinária Nutróloga',
      crmv: 'CRMV-SP 52.814',
    },
    summary: 'Chegou o seu primeiro filhote em casa? Descubra como escolher a melhor ração para filhote, a frequência correta das refeições e por que o acompanhamento veterinário é indispensável nos primeiros meses.',
    image: 'https://images.pexels.com/photos/30201047/pexels-photo-30201047.jpeg',
    imageAlt: 'Filhote fofo comendo ração em tigela',
    internalLinks: [
      { url: '/consulta-primeiro-pet/', text: 'consulta para primeiro pet' },
      { url: '/nutricao-pet-online/', text: 'consulta nutricional pet online' },
    ],
    ctaText: 'Se você tem um primeiro pet e quer escolher a alimentação com segurança, agende uma consulta para primeiro pet com a Dra. Thais Vieira.',
    contentMarkdown: `
A chegada do seu **primeiro pet** em casa é um momento mágico e cheio de alegria, mas também traz muitas dúvidas urgentes: *Qual ração dar para filhote? Quantas vezes ao dia ele precisa comer? Posso dar petiscos ou frutas logo nas primeiras semanas?*

Nos primeiros meses de vida, tanto cães quanto gatos passam pela fase de crescimento mais acelerado. As escolhas nutricionais feitas nessa etapa influenciam diretamente o desenvolvimento ósseo, muscular, imunológico e cognitivo do animal para o resto da vida.

Neste guia prático preparado com autoridade médica veterinária, você vai entender exatamente como alimentar seu filhote com segurança, evitar erros comuns e saber quando procurar orientação profissional.

---

## 1. Por que os filhotes precisam de ração específica?

Filhotes **não são adultos pequenos**. As necessidades de energia, proteínas, cálcio, fósforo e ácidos graxos essenciais (como DHA) são significativamente maiores na fase de crescimento.

Oferecer ração de adulto para um filhote pode provocar déficits graves, estagnação no ganho de peso ou problemas no desenvolvimento esquelético. 

Ao buscar **qual ração dar para filhote**, atente-se às seguintes características fundamentais:
* **Nível Proteico Elevado:** Proteínas de alta digestibilidade para construção muscular e síntese tecidual.
* **Balanço Cálcio e Fósforo:** Proporção milimetricamente ajustada para a ossificação correta (especialmente crítica em cães de porte grande e gigante).
* **Grãos no Tamanho Certo:** Formato e textura adequados para a dentição decídua (dentes de leite) e facilidade de apreensão.
* **Adição de DHA:** Ácido graxo essencial importante para o desenvolvimento do cérebro e da visão do filhote.

---

## 2. Ração Super Premium x Premium x Standard: Qual escolher?

Ao caminhar pelo corredor de pet shop ou pesquisar na internet pela **melhor ração para filhote**, você encontrará diversas categorias comerciais:

1. **Super Premium / Alta Nutrição:** Utilizam fontes de proteínas nobres e altamente digestíveis, possuem suplementação com prebióticos, DHA e menor necessidade de volume por refeição.
2. **Premium / Premium Especial:** Boa relação custo-benefício, com ingredientes selecionados e boa aceitação.
3. **Standard ou Econômicas:** Geralmente possuem menor digestibilidade e requerem porções maiores para atingir o requerimento nutricional.

> **Dica da Dra. Thais:** A escolha da marca deve respeitar a espécie (filhote de cão ou gato), o porte esperado na vida adulta (porte pequeno, médio, grande ou gigante) e a tolerância individual do filhote. Uma consulta individualizada evita gastos desnecessários com rações que não se adaptam bem ao organismo do seu pet.

---

## 3. Quantas vezes ao dia o filhote deve comer?

O estômago do filhote é pequeno e sua capacidade de armazenamento é limitada, enquanto seu gasto energético é altíssimo. Por isso, a quantidade diária deve ser fracionada em várias porções:

* **De 2 a 4 meses de idade:** Fracionar em 4 refeições diárias.
* **De 4 a 6 meses de idade:** Fracionar em 3 refeições diárias.
* **A partir dos 6 meses:** Fracionar em 2 a 3 refeições diárias.

> **Importante para Gatos Filhotes:** Felinos possuem hábito alimentar fracionado de natureza carnívora. Eles preferem fazer várias pequenas refeições ao longo do dia e da noite.

---

## 4. Ração Seca ou Ração Úmida (Sachê/Lata)?

Ambas podem e devem fazer parte do enriquecimento alimentar do filhote! 

* **Ração Seca:** Prática, auxilia no estímulo da mastigação.
* **Ração Úmida:** Essencial especialmente para **gatos filhotes**, pois aumenta a ingestão hídrica natural e previne futuras complicações renais e urinárias.

Ao introduzir alimento úmido, certifique-se de que a embalagem informe "alimento completo para filhotes" (e não apenas petisco complementar).

---

## 5. Transição Alimentar: Evite diarreias e desconfortos

Ao trazer o filhote para casa, mantenha inicialmente a mesma ração que ele comia no canil ou abrigo por pelo menos 5 a 7 dias. Mudar o ambiente e a alimentação simultaneamente causa estresse e distúrbios gastrointestinais.

Caso queira trocar de marca, faça a **transição gradual ao longo de 7 dias**:
* **Dias 1 e 2:** 75% da ração antiga + 25% da ração nova
* **Dias 3 e 4:** 50% da ração antiga + 50% da ração nova
* **Dias 5 e 6:** 25% da ração antiga + 75% da ração nova
* **Dia 7:** 100% da ração nova

---

## 6. Erros comuns no primeiro pet que você deve evitar

1. **Deixar comida disponível o dia todo para cães:** Pode gerar seletividade alimentar, perda de interesse e obesidade precoce.
2. **Oferecer leite de vaca:** Provoca diarreia severa devido à incapacidade de digerir o alto teor de lactose do leite bovino.
3. **Oferecer alimentos proibidos:** Chocolate, cebola, alho, uva, xilitol e ossos cozidos são altamente tóxicos ou perigosos.
4. **Introduzir Alimentação Natural sem prescrição médica:** A dieta caseira sem suplementação vitamínico-mineral calculada por um especialista causa deformidades ósseas irreversíveis em filhotes.

---

## A importância do acompanhamento nutricional individualizado

Cada filhote é único em sua velocidade de crescimento, nível de atividade física e sensibilidade digestiva. 

Se você acabou de adotar ou comprar seu pet, conte com o suporte especializado de uma médica veterinária nutróloga. Através de uma [consulta para primeiro pet](/consulta-primeiro-pet/), você recebe a indicação precisa do alimento ideal, o cálculo da gramatura diária e a orientação para petiscos saudáveis.

Se você mora em outra cidade ou estado, também pode agendar uma [consulta nutricional pet online](/nutricao-pet-online/) no conforto do seu lar!

---

*Aviso Legal: Este artigo possui caráter estritamente educativo e não substitui a consulta médica veterinária presencial ou teleorientação com exame clínico individualizado. Em caso de apatia, recusa alimentar, diarreia ou vômitos em filhotes, procure atendimento veterinário imediato.*
`
  },
  {
    id: 'alimentacao-natural-para-caes-guia',
    slug: 'alimentacao-natural-para-caes-guia',
    title: 'Alimentação Natural para Cães: O Que É, Vantagens e Cuidados Necessários',
    metaTitle: 'Alimentação Natural para Cães: Guia Completo | Dra. Thais Vieira',
    metaDescription: 'Quer migrar para Alimentação Natural para cães com segurança? Saiba como funciona a dieta caseira cozida balanceada, suplementos obrigatórios e cuidados veterinários.',
    mainKeyword: 'alimentação natural para cães',
    secondaryKeywords: ['dieta caseira cachorro', 'AN para cães', 'alimentação saudável cães', 'nutrólogo veterinário cães'],
    category: 'Alimentação natural',
    intent: 'Tutor que busca alternativa à ração comercial e deseja oferecer comida caseira saudável para o cão.',
    publishDate: '2026-07-15',
    readTime: '7 min de leitura',
    author: {
      name: 'Dra. Thais Vieira',
      role: 'Médica Veterinária Nutróloga',
      crmv: 'CRMV-SP 52.814',
    },
    summary: 'Saiba o que é a Alimentação Natural (AN) cozida para cães, quais os benefícios para cães com alergia ou seletivos, e por que o cálculo individualizado e a suplementação são vitais.',
    image: 'https://bonapetti.com.br/wp-content/uploads/2021/04/BannerHome.jpg',
    imageAlt: 'Cão feliz e saudável aguardando refeição caseira',
    internalLinks: [
      { url: '/alimentacao-natural-para-caes/', text: 'alimentação natural para cães' },
      { url: '/nutricao-pet-online/', text: 'consulta nutricional pet online' },
    ],
    ctaText: 'Quer migrar para a Alimentação Natural com segurança? Agende sua avaliação com a Dra. Thais Vieira.',
    contentMarkdown: `
A **Alimentação Natural (AN) para cães** vem conquistando milhares de tutores no Brasil. E não é para menos: refeições preparadas com ingredientes frescos, carnes de qualidade, legumes e carboidratos selecionados trazem visível melhoria na disposição, na pelagem e na digestão dos cães.

Contudo, "alimentação natural" **não é dar restos de comida da mesa do tutor**. A nutrição canina é complexa e exige um balanço exato de aminoácidos, ácidos graxos, minerais e vitaminas.

Neste artigo, você descobrirá como funciona a [alimentação natural para cães](/alimentacao-natural-para-caes/) sob prescrição médica veterinária.

---

## O que é a Alimentação Natural Cozida?

A Alimentação Natural Cozida para cães consiste em uma dieta elaborada exclusivamente com alimentos próprios para consumo animal, preparados sem sal excessivo, sem temperos tóxicos (como alho e cebola) e formulada sob medida por uma médica veterinária especialista em nutrição.

Ela é composta por proporções calculadas de:
1. **Proteínas de Alta Qualidade:** Peito de frango, carne bovina magra, peixes, ovos ou suíno.
2. **Carboidratos e Fibras:** Batata-doce, mandioquinha, arroz integral, abóbora, chuchu, brócolis e cenoura.
3. **Vísceras:** Fontes concentradas de vitaminas (como fígado bovino, coração e moela).
4. **Gorduras Boas:** Óleo de peixe (Ômega 3) e óleos vegetais específicos.
5. **Suplemento Vitamínico-Mineral:** Item 100% obrigatório em todas as dietas caseiras.

---

## Principais Benefícios da Alimentação Natural

* **Alta Palatabilidade:** Excelente aceitação por cães exigentes ou seletivos.
* **Melhoria da Qualidade das Fezes:** Menor volume e odor reduzido devido à alta digestibilidade dos ingredientes.
* **Pele Calma e Pelagem Brilhante:** Auxilia no manejo de cães com dermatites e sensibilidade alimentar.
* **Aumento da Ingestão de Água:** Os alimentos cozidos contêm cerca de 70% a 80% de umidade natural.

---

## O perigo da dieta caseira sem suplementação

Nenhum alimento na natureza possui todos os nutrientes necessários nas proporções perfeitas para um cão. Carnes e vegetais cozidos isolados **não fornecem cálcio suficiente**, nem teores ideais de cobre, zinco, iodo, vitamina D e vitamina E.

A falta do suplemento específico gera deficiências crônicas graves, levando a fraturas por desmineralização óssea, anemia, lesões de pele e alteração cardíaca.

---

## Como iniciar o processo de transição?

Antes de alterar a dieta do seu cão, agende uma [consulta nutricional pet online](/nutricao-pet-online/) ou presencial. A médica veterinária analisará os exames de sangue recentes do pet, avaliará o peso ideal e criará a receita exclusiva em gramas com o suplemento adequado.

*Aviso Legal: Artigo educativo. Nunca substitua a alimentação do seu cão sem supervisão veterinária.*
`
  },
  {
    id: 'alimentacao-natural-e-umida-para-gatos',
    slug: 'alimentacao-natural-e-umida-para-gatos',
    title: 'Alimentação Natural e Úmida para Gatos: Como Garantir Hidratação e Saúde Renal',
    metaTitle: 'Alimentação Natural e Úmida para Gatos | Dra. Thais Vieira',
    metaDescription: 'Descubra como a alimentação natural e as rações úmidas protegem a saúde renal e urinária dos gatos. Entenda as necessidades carnívoras felinas.',
    mainKeyword: 'alimentação natural para gatos',
    secondaryKeywords: ['dieta úmida gatos', 'saúde renal felina', 'nutrição para gatos', 'gato não bebe água'],
    category: 'Gatos',
    intent: 'Tutor de gatos preocupado com consumo de água, cálculos urinários e nutrição carnívora estrita.',
    publishDate: '2026-07-10',
    readTime: '6 min de leitura',
    author: {
      name: 'Dra. Thais Vieira',
      role: 'Médica Veterinária Nutróloga',
      crmv: 'CRMV-SP 52.814',
    },
    summary: 'Os gatos são carnívoros estritos com baixa sede natural. Descubra como a dieta úmida e a Alimentação Natural para gatos previnem doenças renais e urinárias.',
    image: 'https://images.pexels.com/photos/38151497/pexels-photo-38151497.jpeg',
    imageAlt: 'Gato hidratado e saudável olhando atentamente',
    internalLinks: [
      { url: '/alimentacao-natural-para-gatos/', text: 'alimentação natural para gatos' },
      { url: '/nutricao-pet-online/', text: 'consulta nutricional pet online' },
    ],
    ctaText: 'Proteja os rins do seu gato com um plano alimentar personalizado. Agende uma consulta com a Dra. Thais Vieira.',
    contentMarkdown: `
Os felinos possuem uma fisiologia fascinante e única. Originários de ancestrais do deserto, os gatos não possuem o reflexo de sede tão aguçado quanto os cães. Na natureza, eles obtêm a maior parte da água consumindo suas presas (compostas por cerca de 70% de água).

Quando um gato alimenta-se exclusivamente de ração seca (que contém apenas cerca de 8% a 10% de umidade), ele raramente compensa bebendo água suficiente no potinho. Isso gera urina muito concentrada, abrindo portas para cristais urinários, obstruções uretrais e sobrecarga renal.

Por isso, o investimento em [alimentação natural para gatos](/alimentacao-natural-para-gatos/) e rações úmidas completas é uma das decisões de saúde mais inteligentes que um tutor pode tomar.

---

## 1. O Gato é um Carnívoro Estrito

Diferente dos cães (que são carnívoros facultativos ou adaptáveis), os gatos necessitam obrigatoriamente de nutrientes encontrados nas proteínas animais:
* **Taurina:** Aminoácido vital para o coração e retina.
* **Arginina:** Indispensável para o ciclo da ureia.
* **Vitamina A Pré-formada:** Felinos não convertem betacaroteno em vitamina A.
* **Ácido Araquidônico:** Gordura essencial que só existe em tecidos animais.

---

## 2. Benefícios da Dieta Úmida e Alimentação Natural

1. **Hidratação Constante:** A água está inserida na própria refeição.
2. **Proteção Renal e Urinária:** Aumenta o volume urinário e diminui a densidade dos sais urinários.
3. **Controle de Peso:** Proteínas com baixos carboidratos mantêm a massa magra sem gerar picos glicêmicos.

---

## 3. Cuidado com a Inapetência Felina!

Gatos são extremamente neo-fóbicos (têm receio de alimentos novos). Se a transição alimentar for feita de forma brusca e o gato passar mais de 24 a 48 horas sem comer, ele corre o risco de desenvolver **Lipidose Hepática**, uma complicação grave.

Por esse motivo, toda mudança de dieta felina deve ser orientada com técnicas de transição comportamental e nutricional desenvolvidas em uma [consulta nutricional pet online](/nutricao-pet-online/).

---

*Aviso Legal: Conteúdo educativo. Em caso de inapetência ou prostração no gato, consulte o veterinário imediatamente.*
`
  },
  {
    id: 'racao-terapeutica-para-caes-e-gatos-guia',
    slug: 'racao-terapeutica-para-caes-e-gatos-guia',
    title: 'Ração Terapêutica para Cães e Gatos: Quando Usar e Por Que Precisa de Orientação Veterinária',
    metaTitle: 'Ração Terapêutica para Cães e Gatos | Dra. Thais Vieira',
    metaDescription: 'O que são rações coadjuvantes ou terapêuticas? Entenda quando são indicadas para problemas renais, alérgicos, gastrointestinais e obesidade.',
    mainKeyword: 'orientação para ração terapêutica',
    secondaryKeywords: ['ração medicamentosa cães', 'ração renal gatos', 'ração hipoalergênica', 'nutrição clínica veterinária'],
    category: 'Rações terapêuticas',
    intent: 'Tutor de pet diagnosticado com doença crônica procurando entender a prescrição de ração medicamentosa.',
    publishDate: '2026-07-05',
    readTime: '6 min de leitura',
    author: {
      name: 'Dra. Thais Vieira',
      role: 'Médica Veterinária Nutróloga',
      crmv: 'CRMV-SP 52.814',
    },
    summary: 'Rações terapêuticas (ou coadjuvantes) funcionam como parte do tratamento médico de cães e gatos com insuficiência renal, alergias, obesidade ou pancreatite.',
    image: 'https://images.pexels.com/photos/8434744/pexels-photo-8434744.jpeg',
    imageAlt: 'Veterinária cuidando carinhosamente de um paciente pet',
    internalLinks: [
      { url: '/racao-terapeutica-para-caes-e-gatos/', text: 'orientação para ração terapêutica' },
      { url: '/nutricao-pet-online/', text: 'consulta nutricional pet online' },
    ],
    ctaText: 'Seu pet recebeu indicação de ração especial? Agende uma orientação para ração terapêutica com a Dra. Thais Vieira.',
    contentMarkdown: `
As **rações terapêuticas** (também chamadas de rações coadjuvantes ou medicinais) são formulações nutricionais desenvolvidas especificamente para auxiliar no tratamento de doenças agudas ou crônicas em cães e gatos.

Diferente das rações de manutenção diária, as rações terapêuticas possuem modificações profundas nos níveis de fósforo, sódio, proteínas, fibras, eletrólitos e densidade calórica.

Por isso, obter uma [orientação para ração terapêutica](/racao-terapeutica-para-caes-e-gatos/) com um médico veterinário é um passo indispensável para garantir que o alimento ajude no tratamento sem causar outros desequilíbrios.

---

## Principais Linhas Terapêuticas e Suas Indicações

1. **Rações Renais (Renal / Kidney):** Possuem teor reduzido de fósforo e proteína de altíssima digestibilidade para poupar a função dos rins e prevenir crises urêmicas em cães e gatos idosos ou doentes renais.
2. **Rações Hipoalergênicas (Hypoallergenic / Anallergenic):** Utilizam proteínas hidrolisadas (quebradas em partículas tão pequenas que o sistema imunológico não as reconhece como alergênico) para investigar e controlar dermatite atópica e sensibilidade alimentar.
3. **Rações Gastrointestinais (Gastrointestinal / Intestinal):** Baixo teor de gordura, alta digestibilidade e fibras prebióticas para recuperar a mucosa intestinal após episódios de vômitos ou diarreias.
4. **Rações para Obesidade e Saciedade (Satiety / Weight Management):** Ricas em fibras e proteínas, projetadas para promover perda de gordura preservando massa muscular sem passar fome.

---

## Por que elas NÃO devem ser oferecidas por conta própria?

Dar uma ração renal para um cão saudável pode causar privação protéica indesejada. Da mesma forma, oferecer uma ração para obesidade em um filhote em crescimento pode prejudicar seu desenvolvimento.

Através de uma [consulta nutricional pet online](/nutricao-pet-online/), avaliamos o diagnóstico médico, ajustamos a dose diária exata e definimos o tempo de uso necessário.

---

*Aviso Legal: As rações terapêuticas devem ser prescritas obrigatoriamente por um médico veterinário.*
`
  },
  {
    id: 'como-escolher-a-melhor-racao',
    slug: 'como-escolher-a-melhor-racao',
    title: 'Como Escolher a Melhor Ração para Cães e Gatos: Rótulo, Proteína e Ingredientes',
    metaTitle: 'Como Escolher a Melhor Ração para Cães e Gatos | Dra. Thais Vieira',
    metaDescription: 'Aprenda a ler o rótulo da ração do seu pet, identificar os primeiros ingredientes, nível de proteína e evitar pegadinhas no pet shop.',
    mainKeyword: 'como escolher a melhor ração',
    secondaryKeywords: ['rótulo de ração', 'melhor ração cachorro', 'ração super premium vale a pena', 'nutrologia pet'],
    category: 'Escolha de ração',
    intent: 'Tutor querendo aprender a avaliar a qualidade da ração comercial nas prateleiras.',
    publishDate: '2026-06-28',
    readTime: '5 min de leitura',
    author: {
      name: 'Dra. Thais Vieira',
      role: 'Médica Veterinária Nutróloga',
      crmv: 'CRMV-SP 52.814',
    },
    summary: 'Aprenda a decifrar a lista de ingredientes da ração, identificar fontes nobres de proteína e escolher a melhor opção dentro do seu orçamento.',
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Embalagem e tigela de ração selecionada',
    internalLinks: [
      { url: '/nutricao-pet-online/', text: 'consulta nutricional pet online' },
      { url: '/consulta-primeiro-pet/', text: 'consulta para primeiro pet' },
    ],
    ctaText: 'Dúvidas entre qual marca comprar? Agende uma avaliação da dieta atual do seu pet com a Dra. Thais Vieira.',
    contentMarkdown: `
Diante de tantas marcas e opções na prateleira do pet shop, é comum o tutor ficar perdido ao tentar descobrir **como escolher a melhor ração**.

A boa notícia é que o rótulo da embalagem contém as informações mais importantes que você precisa para tomar uma decisão consciente.

---

## O que olhar primeiro na lista de ingredientes?

No Brasil, os ingredientes devem ser descritos em **ordem decrescente de quantidade**. Ou seja: o primeiro ingrediente listado é o que está presente em maior abundância no alimento.

* **Ideal:** Que o primeiro e segundo ingredientes sejam fontes identificadas de proteína animal.
* **Atenção:** Se os primeiros itens da lista forem cereais (como *milho moído*, *farelo de soja* ou *quirera de arroz*), a ração possui base predominantemente vegetal.

---

## Níveis de Garantia: O que significam?

* **Proteína Bruta (Mínimo):** Indica a quantidade total de proteína. Para cães adultos.
* **Extrato Etéreo (Gordura):** Fornece energia e palatabilidade.
* **Matéria Mineral / Cinzas:** Teor de minerais. Mantenha atenção para que não seja excessivamente elevado.

Se precisar de ajuda para avaliar a ração ideal dentro do seu orçamento, agende uma [consulta nutricional pet online](/nutricao-pet-online/)!

---

*Aviso Legal: Artigo educativo.*
`
  },
  {
    id: 'como-funciona-consulta-nutricional-online',
    slug: 'como-funciona-consulta-nutricional-online',
    title: 'Como Funciona a Consulta Nutricional Pet Online? Guia Completo para Tutores',
    metaTitle: 'Como Funciona a Consulta Nutricional Pet Online | Dra. Thais Vieira',
    metaDescription: 'Entenda os passos da teleconsulta nutricional veterinária: anamnese, prescrição de dieta individualizada e suporte contínuo via WhatsApp.',
    mainKeyword: 'consulta nutricional pet online',
    secondaryKeywords: ['nutrólogo veterinário online', 'telemedicina veterinária nutrição', 'atendimento veterinário whatsapp'],
    category: 'Nutrição veterinária online',
    intent: 'Tutor considerando agendar teleconsulta nutricional mas curioso sobre o formato e a eficácia.',
    publishDate: '2026-06-20',
    readTime: '4 min de leitura',
    author: {
      name: 'Dra. Thais Vieira',
      role: 'Médica Veterinária Nutróloga',
      crmv: 'CRMV-SP 52.814',
    },
    summary: 'A teleorientação nutricional permite que tutores de todo o Brasil recebam suporte especializado para seus cães e gatos com comodidade e ciência.',
    image: 'https://images.pexels.com/photos/27087012/pexels-photo-27087012.jpeg',
    imageAlt: 'Tutor utilizando computador e cuidando do pet com carinho',
    internalLinks: [
      { url: '/nutricao-pet-online/', text: 'consulta nutricional pet online' },
      { url: '/consulta-primeiro-pet/', text: 'consulta para primeiro pet' },
    ],
    ctaText: 'Quer um plano nutricional exclusivo para seu cão ou gato? Agende agora sua consulta nutricional pet online.',
    contentMarkdown: `
Com o avanço da tecnologia e da regulamentação veterinária no Brasil, a **consulta nutricional pet online** tornou-se a maneira mais prática e humanizada de cuidar da saúde alimentar de cães e gatos em qualquer estado do país.

Sem a necessidade de estressar seu pet transportando-o até uma clínica, você conversa diretamente com a médica veterinária especialista em nutrologia.

---

## Passo a Passo do Atendimento Online

1. **Preenchimento do Formulário Nutricional (Anamnese):** Você nos informa a idade, peso, raça, rotina de exercícios, alimentos atuais e exames recentes do pet.
2. **Sessão em Vídeo ou Alinhamento Direto:** Analisamos os dados do seu pet e conversamos sobre as metas (emagrecimento, transição para alimentação natural, controle de alergia ou escolha da melhor ração).
3. **Envio do Plano Alimentar Personalizado:** Você recebe por e-mail um relatório com o cálculo exato da gramatura, indicação dos alimentos e guia de petiscos.
4. **Suporte e Acompanhamento via WhatsApp:** Acompanhamos o progresso e tiramos dúvidas durante a adaptação do pet.

Agende agora mesmo sua [consulta nutricional pet online](/nutricao-pet-online/)!

---

*Aviso Legal: A teleorientação é realizada em conformidade com as normas regulatórias do Conselho Federal de Medicina Veterinária (CFMV).*
`
  }
];
