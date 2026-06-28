import React, { useState } from 'react';
import { 
  ArrowRight, 
  Heart, 
  MapPin, 
  Activity, 
  Globe, 
  Check, 
  Menu, 
  X, 
  Sparkles,
  Calendar,
  Sparkle,
  MessageSquare,
  ShieldAlert,
  ArrowUpRight,
  Scale,
  Tag,
  Clock,
  Smile,
  Cookie,
  Droplet,
  ArrowDown,
  Plus,
  Trash2,
  Instagram
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Imported modular sub-components for better maintainability and code division
import { FadeIn, TitleReveal } from './components/LayoutComponents';
import { ConsultaModal } from './components/ConsultaModal';
import { PaymentModal } from './components/PaymentModal';
import { faqs, FAQItem } from './components/FAQSection';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { MeuPrimeiroPet } from './components/MeuPrimeiroPet';
import { MeuPrimeiroPetNotification } from './components/MeuPrimeiroPetNotification';
import { AbordagemDiagram } from './components/AbordagemDiagram';

// Generated customized images for the four core section cards
import choiceFoodImg from './assets/images/escolha_racao_1781640644270.jpg';
import idealQuantityImg from './assets/images/quantidade_ideal_1781640656721.jpg';
import healthyTreatsImg from './assets/images/petiscos_saudaveis_1781640666469.jpg';
import dailyHealthImg from './assets/images/saude_diaria_1781640678043.jpg';
import dietNaturalImg from './assets/images/alimentacao_natural_1782078363609.jpg';
import dietMistaImg from './assets/images/dieta_mista_1782078374551.jpg';
import dietRacaoImg from './assets/images/orientacao_racao_1782078386233.jpg';
import myPlanoPetImg from './assets/images/meu_plano_pet_1782078396572.jpg';
import horariosDosesImg from './assets/images/horarios_doses_1782078406873.jpg';

// WhatsApp real interaction prints for testimonials
import quinhaWhatsappImg from './assets/images/quinha_whatsapp_1782143066489.jpg';
import pacocaWhatsappImg from './assets/images/pacoca_whatsapp_1782143080321.jpg';
import pitocoWhatsappImg from './assets/images/pitoco_whatsapp_1782143094764.jpg';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConsultaOpen, setIsConsultaOpen] = useState(false);
  const [consultaFormat, setConsultaFormat] = useState<'online' | 'presencial' | 'insurance'>('online');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openConsulta = (format: 'online' | 'presencial' | 'insurance') => {
    setConsultaFormat(format);
    setIsConsultaOpen(true);
  };

  // Hero slideshow photos with updated images and correct framing
  const defaultHeroPhotos = [
    {
      url: "https://images.unsplash.com/photo-1678783133022-89e103910f76?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Pet saudável sob acompanhamento clínico cuidadoso",
      className: "object-center scale-100 hover:scale-[1.05]"
    },
    {
      url: "https://images.unsplash.com/photo-1573024027027-a82b1b0f783e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Veterinária sorridente atendendo um cachorro com carinho",
      className: "object-[72%_30%] scale-100 hover:scale-[1.05]"
    },
    {
      url: "https://images.unsplash.com/photo-1618760439064-9c608de98e4e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Pet recebendo cuidados especiais",
      className: "object-[center_35%] scale-100 hover:scale-[1.05]"
    },
    {
      url: "https://images.unsplash.com/photo-1723065314557-e2a6b8a41d08?q=80&w=759&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Cachorro feliz e saudável",
      className: "object-center scale-100 hover:scale-[1.05]"
    },
    {
      url: "https://images.unsplash.com/photo-1745252777945-d430ecf54580?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Cachorrinho dócil sob cuidados pet",
      className: "object-center scale-100 hover:scale-[1.05]"
    },
    {
      url: "https://images.unsplash.com/photo-1596854675667-b1716ee49130?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Cachorro feliz rindo",
      className: "object-center scale-100 hover:scale-[1.05]"
    },
    {
      url: "https://images.unsplash.com/photo-1558993457-4bc6ec2c3734?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Veterinária examinando gatinho dócil",
      className: "object-[center_25%] scale-100 hover:scale-[1.05]"
    }
  ];

  const [photos, setPhotos] = useState<Array<{ url: string; alt: string; className: string }>>(() => {
    const saved = localStorage.getItem('hero_photos_v7');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const hasRequestedPhoto = parsed.some(p => p.url && p.url.includes("photo-1678783133022-89e103910f76"));
          if (!hasRequestedPhoto) {
            const updated = [
              {
                url: "https://images.unsplash.com/photo-1678783133022-89e103910f76?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                alt: "Pet saudável sob acompanhamento clínico cuidadoso",
                className: "object-center scale-100 hover:scale-[1.05]"
              },
              ...parsed
            ];
            localStorage.setItem('hero_photos_v7', JSON.stringify(updated));
            return updated;
          }
          return parsed;
        }
      } catch (e) {
        // Fallback
      }
    }
    return defaultHeroPhotos;
  });

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  React.useEffect(() => {
    if (photos.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [photos.length]);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imgElement = document.createElement('img');
      imgElement.src = event.target?.result as string;
      imgElement.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = imgElement.width;
        let height = imgElement.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(imgElement, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);

        const newPhoto = {
          url: compressedDataUrl,
          alt: "Foto enviada pela Dra. Thais",
          className: "object-center scale-100 hover:scale-[1.05]"
        };

        const updated = [...photos, newPhoto];
        setPhotos(updated);
        localStorage.setItem('hero_photos_v7', JSON.stringify(updated));
        setCurrentPhotoIndex(updated.length - 1);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveCurrentPhoto = () => {
    if (photos.length <= 1) return;
    const updated = photos.filter((_, idx) => idx !== currentPhotoIndex);
    setPhotos(updated);
    localStorage.setItem('hero_photos_v7', JSON.stringify(updated));
    setCurrentPhotoIndex(0);
  };
  
  // Spotlight coords removed to optimize performance and prevent re-renders on mousemove


  
  // Carousel / Accordion States
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const categories = [
    {
      title: "Longevidade & Prevenção",
      img: "https://images.unsplash.com/photo-1573024027027-a82b1b0f783e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      desc: "A saúde começa no pote. Pequenos ajustes na rotina nutricional de cães e gatos garantem que o seu companheiro continue ativo, alegre e viva muito mais anos ao seu lado de forma saudável.",
      highlight: "Prevenção Clínica Ativa"
    },
    {
      title: "Controle de Peso & Obesidade",
      img: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1200&auto=format&fit=crop",
      desc: "A obesidade em pets não é apenas estética — trata-se de uma inflamação crônica silenciosa. Desenvolvemos planejamentos de emagrecimento focados em saciedade sem sofrimento.",
      highlight: "Emagrecimento com Saúde"
    },
    {
      title: "Pele Sensível & Alergias",
      img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1200&auto=format&fit=crop",
      desc: "Coceira constante, queda de pelo e vermelhidão costumam estar associados à escolha incorreta de ingredientes. Isolamos agentes causadores com dieta balanceada de alívio real.",
      highlight: "Pele Saudável e Macia"
    },
    {
      title: "Suporte em Doenças Crônicas",
      img: "https://images.unsplash.com/photo-1554693190-38385b414383?q=80&w=1200&auto=format&fit=crop",
      desc: "Instabilidade renal, diabetes, distúrbios hepáticos e gastrintestinais exigem controle laboratorial de fósforo, glicemia e sódio. A nutrição especializada retarda a evolução dessas patologias.",
      highlight: "Nutrologia Terapêutica"
    }
  ];

  const testimonials = [
    {
      petName: "Quinha",
      tutor: "Cão 🐶",
      img: "https://capable-cyan-ejwmqx0j.edgeone.app/Captura%20de%20tela%202026-06-21%20145641.png"
    },
    {
      petName: "Paçoca",
      tutor: "Cão 🐶",
      img: "https://excess-amber-bkfvumvw.edgeone.app/Captura%20de%20tela%202026-06-21%20145325.png"
    },
    {
      petName: "Pitoco",
      tutor: "Cão 🐶",
      img: "https://labour-jade-ifgwubog.edgeone.app/Captura%20de%20tela%202026-06-21%20145906.png"
    }
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // combined fixed header + ticket offset (72px + 40px)
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-primary/20 selection:text-[#111827] bg-[#F8F6F2] text-[#374151] overflow-x-hidden relative" id="inicio">

      {/* Subtle Luxury Gradient Background Lights */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none" id="ambient-layers">
        <div className="absolute top-[5%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#d4abe4]/10 blur-[140px] opacity-60" />
        <div className="absolute bottom-[15%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-[#a338b9]/5 blur-[160px] opacity-40" />
      </div>

      {/* Solid Fixed Top Header Bar */}
      <nav className="fixed top-0 left-0 right-0 w-full h-[72px] z-50 bg-white/90 backdrop-blur-md border-b border-stone-100/80 shadow-[0_2px_15px_rgba(0,0,0,0.02)] flex items-center" id="main-nav">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center px-6 md:px-10">
          <div className="flex items-center gap-2.5">
            <Heart className="text-[#a338b9] shrink-0" size={22} fill="currentColor" />
            <div className="flex flex-col text-left font-display">
              <span className="text-base font-bold tracking-tight leading-none text-[#111827]">Dra. Thais Vieira</span>
              <span className="text-[10px] font-semibold text-[#a338b9] uppercase tracking-wider mt-0.5">Nutrologia Veterinária</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="#inicio" onClick={(e) => scrollToSection(e, 'inicio')} className="text-xs font-semibold uppercase tracking-wider text-[#374151] hover:text-[#a338b9] transition-colors">Início</a>
            <a href="#sobre" onClick={(e) => scrollToSection(e, 'sobre')} className="text-xs font-semibold uppercase tracking-wider text-[#374151] hover:text-[#a338b9] transition-colors">A Veterinária</a>
            <a href="#meu-primeiro-pet" onClick={(e) => scrollToSection(e, 'meu-primeiro-pet')} className="text-xs font-semibold uppercase tracking-wider text-[#374151] hover:text-[#a338b9] transition-colors">Meu Primeiro Pet</a>
            <a href="#atendimento" onClick={(e) => scrollToSection(e, 'atendimento')} className="text-xs font-semibold uppercase tracking-wider text-[#374151] hover:text-[#a338b9] transition-colors">Formatos</a>
            <a href="#depoimentos" onClick={(e) => scrollToSection(e, 'depoimentos')} className="text-xs font-semibold uppercase tracking-wider text-[#374151] hover:text-[#a338b9] transition-colors">Depoimentos</a>
            <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="text-xs font-semibold uppercase tracking-wider text-[#374151] hover:text-[#a338b9] transition-colors font-sans">FAQ</a>
            
            <button 
              onClick={() => openConsulta('online')}
              className="bg-[#111827] hover:bg-[#a338b9] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer border-none"
            >
              Agendar Consulta
            </button>
          </div>

          {/* Mobile Menu Action Trigger */}
          <div className="lg:hidden flex items-center gap-2">
            <button 
              onClick={() => openConsulta('online')}
              className="bg-[#a338b9] text-white px-4 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all hover:bg-[#812099] border-none cursor-pointer"
            >
              Agendar
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-stone-700 border border-stone-200/60 cursor-pointer"
              aria-label="Toggle menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-[112px] left-4 right-4 z-40 bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-stone-200/60 shadow-xl flex flex-col gap-4 lg:hidden text-left"
            >
              <a href="#inicio" onClick={(e) => scrollToSection(e, 'inicio')} className="text-sm font-bold uppercase tracking-wider text-[#111827] py-2 border-b border-stone-100">Início</a>
              <a href="#sobre" onClick={(e) => scrollToSection(e, 'sobre')} className="text-sm font-bold uppercase tracking-wider text-[#111827] py-2 border-b border-stone-100">A Veterinária</a>
              <a href="#meu-primeiro-pet" onClick={(e) => scrollToSection(e, 'meu-primeiro-pet')} className="text-sm font-bold uppercase tracking-wider text-[#111827] py-2 border-b border-stone-100">Meu Primeiro Pet</a>
              <a href="#atendimento" onClick={(e) => scrollToSection(e, 'atendimento')} className="text-sm font-bold uppercase tracking-wider text-[#111827] py-2 border-b border-stone-100">Formatos</a>
              <a href="#depoimentos" onClick={(e) => scrollToSection(e, 'depoimentos')} className="text-sm font-bold uppercase tracking-wider text-[#111827] py-2 border-b border-stone-100">Depoimentos</a>
              <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="text-sm font-bold uppercase tracking-wider text-[#111827] py-2">FAQ</a>
              
              <div className="grid grid-cols-2 gap-3 mt-2">
                <button 
                  onClick={() => { openConsulta('online'); setIsMobileMenuOpen(false); }}
                  className="bg-stone-50 hover:bg-stone-100 text-[#111827] py-3.5 rounded-2xl text-[11px] font-bold uppercase tracking-wider transition-all border border-stone-200 cursor-pointer"
                >
                  Consulta
                </button>
                <button 
                  onClick={() => { setIsModalOpen(true); setIsMobileMenuOpen(false); }}
                  className="bg-[#a338b9] text-white py-3.5 rounded-2xl text-[11px] font-bold uppercase tracking-wider transition-all hover:bg-[#812099] cursor-pointer border-none"
                >
                  Primeiro Pet
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Ticket marquee bar positioned directly below the fixed header */}
      <div className="fixed top-[72px] left-0 right-0 w-full h-10 z-40 bg-gradient-to-r from-[#6b1484] via-[#a338b9] to-[#bf48da] flex items-center shadow-[0_4px_24px_rgba(163,56,185,0.3)] border-b border-white/20 overflow-hidden select-none">
        {/* Neon shimmer highlight/glossy reflection */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/18 to-transparent animate-pulse pointer-events-none" />
        {/* Dynamic bottom laser neon glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ffd5ff] to-transparent shadow-[0_-1px_10px_2px_#eb82ff]" />
        
        <div className="flex whitespace-nowrap overflow-hidden w-full">
          <motion.div 
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ 
              ease: "linear", 
              duration: 22, 
              repeat: Infinity 
            }}
            style={{ willChange: "transform" }}
            className="flex gap-16 md:gap-24 items-center shrink-0 pr-16 text-white font-black uppercase text-[10px] sm:text-xs tracking-[0.22em] font-sans"
          >
            {/* Repetition Part 1 */}
            <div className="flex items-center gap-2 shrink-0">
               <Sparkles size={11} className="text-amber-200 fill-amber-200 animate-pulse shrink-0" />
              <span>Alimentação Natural</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
               <Sparkles size={11} className="text-amber-200 fill-amber-200 animate-pulse shrink-0" />
              <span>Dieta Mista</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
               <Sparkles size={11} className="text-amber-200 fill-amber-200 animate-pulse shrink-0" />
              <span>Orientação de Ração</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
               <Sparkles size={11} className="text-amber-200 fill-amber-200 animate-pulse shrink-0" />
              <span>Cães e Gatos</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
               <Sparkles size={11} className="text-amber-200 fill-amber-200 animate-pulse shrink-0" />
              <span>Online e Presencial</span>
            </div>

            {/* Repetition Part 2 to guarantee infinite flow */}
            <div className="flex items-center gap-2 shrink-0">
               <Sparkles size={11} className="text-amber-200 fill-amber-200 animate-pulse shrink-0" />
              <span>Alimentação Natural</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
               <Sparkles size={11} className="text-amber-200 fill-amber-200 animate-pulse shrink-0" />
              <span>Dieta Mista</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
               <Sparkles size={11} className="text-amber-200 fill-amber-200 animate-pulse shrink-0" />
              <span>Orientação de Ração</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
               <Sparkles size={11} className="text-amber-200 fill-amber-200 animate-pulse shrink-0" />
              <span>Cães e Gatos</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
               <Sparkles size={11} className="text-amber-200 fill-amber-200 animate-pulse shrink-0" />
              <span>Online e Presencial</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* SECTION 1: HERO */}
      <section 
        className="relative min-h-[540px] flex items-center pt-28 pb-20 sm:pt-32 sm:pb-24 px-4 md:px-8 bg-[#FAF2FF] overflow-hidden" 
        id="hero"
      >

        {/* Core Container */}
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* LEFT COLUMN: Organic Shape blobs & circular photo (~48% width) */}
          <div className="w-full lg:w-[48%] flex justify-center items-center relative order-first lg:order-first shrink-0">
            <FadeIn delay={0.2} className="relative flex justify-center items-center w-full max-w-[450px] sm:max-w-none">
              
              {/* Canto superior esquerdo: blob orgânico roxo claro (#c595ff) */}
              <div 
                className="absolute -top-10 -left-6 sm:-left-24 md:-left-28 lg:-left-32 sm:-top-20 md:-top-24 lg:-top-28 xl:-top-32 xl:-left-36 w-[200px] h-[200px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] lg:w-[470px] lg:h-[470px] xl:w-[520px] xl:h-[520px] pointer-events-none -z-10 opacity-[0.18] sm:opacity-[0.25]"
                style={{
                  backgroundColor: "#c595ff",
                  borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
                }}
              />

              {/* Photo em moldura circular perfeita, otimizada para máxima aceleração de GPU e carregamento instantâneo */}
              <div 
                className="group relative z-10 w-[260px] h-[260px] xs:w-[305px] xs:h-[305px] sm:w-[410px] sm:h-[410px] md:w-[450px] md:h-[450px] lg:w-[490px] lg:h-[490px] xl:w-[530px] xl:h-[530px] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] transform hover:scale-[1.01] transition-transform duration-500 rounded-full"
                style={{
                  transform: "translate3d(0, 0, 0)",
                  isolation: "isolate"
                }}
              >
                <AnimatePresence initial={false}>
                  {photos[currentPhotoIndex] && (
                    <motion.div
                      key={currentPhotoIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <img 
                        src={photos[currentPhotoIndex].url} 
                        alt={photos[currentPhotoIndex].alt} 
                        className={`w-full h-full object-cover transition-transform duration-700 ease-out ${photos[currentPhotoIndex].className}`}
                        referrerPolicy="no-referrer"
                        decoding="async"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Indicadores de slide minimalistas e elegantes */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-30 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 shadow-md">
                  {photos.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPhotoIndex(idx)}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        currentPhotoIndex === idx 
                          ? 'bg-white w-4' 
                          : 'bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`Ir para foto ${idx + 1}`}
                    />
                  ))}
                </div>
                
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#a338b9]/5 to-[#dfbdff]/5 pointer-events-none z-20" />
              </div>

            </FadeIn>
          </div>

          {/* RIGHT COLUMN: Copywriting block & dynamic actions (~48% width) */}
          <div className="w-full lg:w-[48%] flex flex-col justify-center text-center lg:text-left space-y-6 md:space-y-8 relative z-20">
            
            {/* Label eyebrow */}
            <FadeIn direction="down" delay={0.1}>
              <span 
                className="inline-block text-[#3B4FA8] font-nunito text-[13px] font-bold uppercase"
                style={{ letterSpacing: "2.5px" }}
              >
                EXPERIMENTE A DIFERENÇA • NUTROLOGIA VETERINÁRIA
              </span>
            </FadeIn>

            {/* Title H1 in Navy with rounded font, dynamic size */}
            <div className="space-y-4 md:space-y-5">
              <h1 
                className="font-nunito font-extrabold text-[#1B2A6B] leading-[1.2] tracking-tight"
                style={{ fontSize: "clamp(2.1rem, 4.2vw, 3.1rem)" }}
              >
                Seu pet está recebendo a alimentação que realmente precisa?
              </h1>
              
              {/* Description Body Text */}
              <FadeIn delay={0.4}>
                <p className="text-stone-700 font-sans text-sm sm:text-base md:text-[17px] font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Nutrição veterinária de precisão para cães e gatos através de alimentação natural, dieta mista e orientação para ração ideal. Atendimento atencioso online para todo o Brasil e presencial em São Paulo.
                </p>
              </FadeIn>
            </div>

            {/* High Impact Call to Actions */}
            <FadeIn delay={0.55} className="w-full">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start relative z-20 w-full">
                <motion.button 
                  onClick={() => openConsulta('online')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full sm:w-auto overflow-hidden bg-gradient-to-r from-[#a338b9] via-[#b83fd1] to-[#e06bf2] text-white font-black px-10 py-5 rounded-full text-xs sm:text-sm uppercase tracking-wider text-center shadow-[0_15px_40px_rgba(163,56,185,0.4)] hover:shadow-[0_20px_50px_rgba(163,56,185,0.6)] transition-all duration-300 flex items-center justify-center gap-3 border border-white/20 cursor-pointer"
                >
                  {/* Glowing sweep effect */}
                  <motion.div 
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                    className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-[-15deg] pointer-events-none"
                  />
                  
                  <Sparkles size={16} className="text-amber-300 fill-amber-300 animate-pulse shrink-0" />
                  <span>Agendar Consulta</span>
                  <ArrowUpRight size={16} className="text-white shrink-0" />
                </motion.button>

                <motion.a 
                  href="#meu-primeiro-pet" 
                  onClick={(e) => scrollToSection(e, 'meu-primeiro-pet')}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="h-15 w-full sm:w-auto px-10 rounded-full border-2 border-[#a338b9]/30 hover:border-[#a338b9] bg-white hover:bg-[#a338b9]/3 text-[#111827] hover:text-[#a338b9] transition-all duration-300 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2.5 shadow-sm hover:shadow-[0_10px_25px_rgba(163,56,185,0.08)] cursor-pointer"
                >
                  <span>Conhecer Meu Primeiro Pet</span>
                  <ArrowDown size={14} className="animate-bounce shrink-0" />
                </motion.a>
              </div>
            </FadeIn>
          </div>

        </div>
      </section>

      {/* SECTION 2: COMO POSSO AJUDAR O SEU PET - Otimizado para evitar reflows de layout na rolagem */}
      <section 
        className="relative z-30 -mt-20 md:-mt-24 mx-4 md:mx-8 lg:mx-auto max-w-7xl rounded-[3.5rem] md:rounded-[4.5rem] shadow-[0_-15px_45px_rgba(163,56,185,0.04),0_30px_70px_rgba(163,56,185,0.08),0_10px_30px_rgba(0,0,0,0.01)] bg-white/95 backdrop-blur-md border border-white/60 py-16 md:py-20 px-6 md:px-12 overflow-hidden" 
        id="ajuda"
      >
        {/* Subtle premium background paper/noise texture pattern overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#a338b9_1px,transparent_1px)] [background-size:20px_20px]" />

        {/* Diffuse glowing backlight behind title */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[450px] h-[300px] bg-[#a338b9]/5 rounded-full filter blur-[70px] pointer-events-none z-0" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          
          <div className="text-center mb-16 max-w-3xl mx-auto flex flex-col items-center space-y-3 relative">
            {/* Soft white diffused glow directly behind the text for premium look */}
            <div className="absolute inset-0 bg-white/80 filter blur-[45px] rounded-full pointer-events-none z-[-1]" />
            
            <span className="text-[11px] font-bold text-[#a338b9] tracking-[0.25em] uppercase font-sans">Soluções Completas</span>
            <h2 className="text-3xl md:text-5xl font-semibold text-[#111827] font-display uppercase tracking-tight text-center mt-1">
              Como posso ajudar o seu pet?
            </h2>
            <p className="text-stone-700 font-medium text-sm md:text-base leading-relaxed max-w-xl mx-auto font-sans text-center mt-2">
              Soluções científicas e personalizadas que promovem mais saúde, vitalidade e qualidade de vida para cães e gatos.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Filhotes, Adultos e idosos",
                subtitle: "Nutrição para cada fase da vida",
                desc: "A alimentação ideal muda conforme a idade. Ajustamos a dieta para acompanhar o crescimento, a fase adulta e o envelhecimento saudável do seu pet.",
                img: "https://images.unsplash.com/photo-1624180930030-7eb26f634e13?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                badge: "FASES DE VIDA",
                action: () => openConsulta('online'),
                footerText: "Filhotes • Adultos • Idosos"
              },
              {
                title: "Doenças e Casos Clínicos",
                subtitle: "Nutrição terapêutica personalizada",
                desc: "Planos alimentares desenvolvidos para pets com alergias, obesidade, diabetes, doenças renais, hepáticas e outras condições que exigem atenção especial.",
                img: "https://images.unsplash.com/photo-1614621494969-757f4acbe726?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dp",
                badge: "SUPORTE CLÍNICO",
                action: () => openConsulta('online'),
                footerText: "Rim • Alergia • Diabetes • Mais"
              },
              {
                title: "Controle de Peso",
                subtitle: "Emagrecer ou ganhar massa com segurança",
                desc: "Nem dieta restritiva, nem excesso de comida. Criamos estratégias nutricionais para atingir o peso ideal respeitando a saúde e o bem-estar do pet.",
                img: "https://images.unsplash.com/photo-1644178488613-555a71c24e16?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dp",
                badge: "CONTROLE DE PESO",
                action: () => openConsulta('online'),
                footerText: "Obesidade • Magreza"
              },
              {
                title: "Nutrição Felina",
                subtitle: "Gatos vivem diferente. Comem diferente.",
                desc: "Orientação especializada para hidratação, prevenção urinária, controle de peso e longevidade felina em todas as fases da vida.",
                img: "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dop",
                badge: "NUTRIÇÃO FELINA",
                action: () => {
                  const el = document.getElementById("meu-primeiro-pet");
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                },
                footerText: "Saúde Felina"
              }
            ].map((card, cardIdx) => (
              <motion.div
                key={cardIdx}
                initial={{ opacity: 0, y: 35, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: cardIdx * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                whileHover={{ 
                  y: -6, 
                  scale: 1.02,
                  boxShadow: "0 20px 45px rgba(163,56,185,0.12), 0 0 20px rgba(163,56,185,0.04)" 
                }}
                className="bg-white shadow-[0_12px_32px_rgba(163,56,185,0.05),0_4px_12px_rgba(0,0,0,0.02)] rounded-[1.25rem] sm:rounded-[1.75rem] overflow-hidden group flex flex-col h-full text-left cursor-pointer transition-all duration-300"
                onClick={card.action}
              >
                <div className="h-24 sm:h-36 w-full overflow-hidden shrink-0 relative bg-stone-100">
                  <img 
                    src={card.img} 
                    alt={card.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-white/95 backdrop-blur-sm text-[#a338b9] text-[8px] sm:text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-stone-200/30 shadow-xs font-nunito font-bold">
                    {card.badge}
                  </span>
                </div>
                
                {/* Padding and interior spacing */}
                <div className="p-3 sm:p-5 flex-grow flex flex-col justify-between">
                  <div className="space-y-1 sm:space-y-2">
                    <h4 className="text-sm sm:text-lg font-extrabold text-[#111827] font-nunito leading-tight line-clamp-2">{card.title}</h4>
                    <p className="text-[10px] sm:text-[11px] text-[#a338b9] font-bold font-nunito leading-snug">{card.subtitle}</p>
                    <p className="text-[11px] sm:text-xs text-stone-700 leading-relaxed font-nunito font-semibold line-clamp-3 mt-1">{card.desc}</p>
                  </div>

                  <div className="pt-2 sm:pt-4 border-t border-stone-200/40 mt-3 sm:mt-4 flex items-center justify-between text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#a338b9] font-nunito group-hover:text-[#812099]">
                    <span className="max-w-[80%] truncate">{card.footerText}</span>
                    <ArrowUpRight size={11} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* TRABALHO COM AS TRÊS MODALIDADES - SEÇÃO COM DESTAQUE INTERATIVO */}
          <AbordagemDiagram openConsulta={openConsulta} />

        </div>
      </section>
      
      {/* SECTION 3: SOBRE A PROFISSIONAL (Dra Thais) */}
      <section className="pt-16 pb-12 md:pt-20 md:pb-16 px-4 md:px-8 relative z-20 -mt-12 bg-gradient-to-tr from-[#13011b] via-[#3d0952] to-[#13011b] rounded-b-[3.5rem] md:rounded-b-[4.5rem] border-b border-[#a338b9]/25 shadow-[0_20px_50px_rgba(163,56,185,0.12)] text-left overflow-hidden" id="sobre">
        {/* Metallic sheen diagonal accent */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-40 pointer-events-none" />
        
        {/* Transição fluida de seção 2 para 3: blob orgânico suave posicionamento de alto padrão */}
        <div 
          className="absolute -top-16 left-4 sm:left-12 lg:left-24 w-[140px] h-[140px] sm:w-[280px] sm:h-[280px] pointer-events-none -z-10 opacity-[0.2] sm:opacity-[0.3]"
          style={{
            backgroundColor: "#a338b9",
            borderRadius: "40% 60% 30% 70% / 60% 30% 70% 40%",
          }}
        />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#a338b9]/10 rounded-full filter blur-[80px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Hand-crafted portrait shape */}
            <div className="lg:col-span-5 flex justify-center">
              <FadeIn className="w-full relative group max-w-xs sm:max-w-sm">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#a338b9]/20 to-transparent blur-3xl pointer-events-none rounded-[3.5rem]" />
                
                <div 
                  className="relative z-10 w-full overflow-hidden border-6 border-white shadow-xl aspect-[4/5] max-h-[380px] bg-[#220033] transition-all duration-500 hover:rotate-1"
                  style={{ 
                    borderRadius: "50% 50% 30% 70% / 50% 60% 40% 50%",
                    transform: "translate3d(0, 0, 0)",
                    WebkitMaskImage: "-webkit-radial-gradient(white, black)"
                  }}
                >
                  <img 
                    src="https://wandering-gold-rntprunxqh.edgeone.app/foto%20perfil.png" 
                    alt="Médica Veterinária Dra. Thais Vieira em foco acolhedor com sorriso amigável" 
                    className="w-full h-full object-cover object-[center_35%] group-hover:scale-103 transition-transform duration-700 ease-out"
                    style={{ borderRadius: "50% 50% 30% 70% / 50% 60% 40% 50%" }}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#13011b]/80 via-transparent to-transparent pointer-events-none" />
                  
                  {/* CRMV details inside image - centered and elevated slightly to prevent organic clipping */}
                  <div className="absolute bottom-6 left-0 right-0 px-6 text-center text-white space-y-1 z-20">
                    <span className="inline-block text-[9px] font-black tracking-widest text-[#e8c3fc] uppercase bg-[#1d002e]/65 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
                      CRMV-SP 52.883
                    </span>
                    <h3 className="text-base sm:text-lg font-black font-display uppercase tracking-tight text-white drop-shadow-md">
                      Dra. Thais Vieira
                    </h3>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Column: Copywriting and Bullet Cards */}
            <div className="lg:col-span-7 text-left space-y-5 lg:pl-2">
              <FadeIn>
                <span className="text-[11px] font-black text-[#d4abe4] tracking-[0.25em] uppercase font-sans">A Veterinária</span>
                <h2 className="text-2xl md:text-4xl font-black leading-tight text-white font-display uppercase tracking-tight mt-2">
                  Quem vai cuidar da alimentação do seu pet?
                </h2>
                <p className="text-purple-100/90 font-medium text-xs md:text-sm leading-relaxed font-sans mt-2">
                  Médica veterinária dedicada exclusivamente à nutrologia animal de alta performance. Atuando com ética, ciência e sem qualquer vínculo comercial com indústrias pet — foco total na real saúde metabólica do seu animal.
                </p>

                {/* Grid of Highlight Badges */}
                <div className="grid grid-cols-2 gap-2 pt-4 text-white font-sans font-semibold text-xs">
                  {[
                    "Médica veterinária",
                    "Nutricionista pet",
                    "Atendimento online",
                    "Atendimento presencial em SP",
                    "Sem vínculo com marcas",
                    "Cães e gatos"
                  ].map((hl, hlIdx) => (
                    <div key={hlIdx} className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/10 px-2.5 py-1.5 rounded-lg hover:bg-white/15 hover:border-white/20 transition-all duration-300">
                      <Check className="text-[#e8c3fc] shrink-0" size={14} />
                      <span className="truncate">{hl}</span>
                    </div>
                  ))}
                </div>

                {/* Numbers in Highlight */}
                <div className="flex items-center gap-8 pt-6 border-t border-purple-900/40 mt-6">
                  <div>
                    <span className="block text-2xl md:text-3xl font-black font-display text-white leading-none drop-shadow-[0_2px_8px_rgba(163,56,185,0.4)]">+300</span>
                    <span className="text-[9px] font-bold text-purple-200/80 uppercase tracking-widest mt-1 block leading-tight">pets orientados</span>
                  </div>
                  <div>
                    <span className="block text-2xl md:text-3xl font-black font-display text-white leading-none drop-shadow-[0_2px_8px_rgba(163,56,185,0.4)]">100%</span>
                    <span className="text-[9px] font-bold text-purple-200/80 uppercase tracking-widest mt-1 block leading-tight">orientação personalizada</span>
                  </div>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>
      
      {/* SECTION 5: FORMATOS DE ATENDIMENTO ESPECIALIZADO (Teleconsulta + Presencial SP + Convênio) */}
      <section className="pt-24 pb-20 md:pt-32 md:pb-24 px-4 md:px-8 relative z-10 -mt-16 bg-gradient-to-b from-[#FDFBF9] via-[#F8F6F2] to-white rounded-[3.5rem] md:rounded-[4.5rem] shadow-[0_-15px_45px_rgba(0,0,0,0.015),0_25px_60px_rgba(0,0,0,0.01)] border-b border-stone-200/30 text-center overflow-hidden" id="atendimento">
        {/* Transição fluida de seção 4 para 5: blob orgânico caloroso suave */}
        <div 
          className="absolute -top-16 left-6 sm:left-16 lg:left-32 w-[160px] h-[160px] sm:w-[340px] sm:h-[340px] pointer-events-none -z-10 opacity-[0.25] sm:opacity-[0.38]"
          style={{
            backgroundColor: "#a338b9",
            borderRadius: "60% 40% 60% 40% / 50% 50% 50% 50%",
          }}
        />
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[450px] h-[300px] bg-amber-500/2 rounded-full filter blur-[75px] pointer-events-none z-0" />
        <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
          
          <div className="text-center mb-16 max-w-3xl mx-auto flex flex-col items-center space-y-3">
            <span className="text-[11px] font-bold text-[#a338b9] tracking-[0.25em] uppercase font-sans">Sessões Individuais</span>
            <h2 className="text-3xl md:text-5xl font-semibold text-[#111827] font-display uppercase tracking-tight text-center mt-1">
              Quer um acompanhamento clínico exclusivo?
            </h2>
            <p className="text-stone-700 font-semibold text-sm md:text-base leading-relaxed font-sans max-w-2xl text-center mt-2 mx-auto">
              Se o seu pet possui alguma patologia diagnosticada (doença renal, obesidade severa, alergia grave ou diabetes) ou você prefere uma consulta tête-à-tête comigo, escolha um dos formatos abaixo:
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-8 lg:gap-10 w-full max-w-7xl mx-auto">
            
            {/* Format 1: Teleconsulta */}
            <FadeIn delay={0.05} className="h-full">
              <div 
                style={{ willChange: "transform, box-shadow" }}
                className="group h-full flex flex-col bg-white border border-stone-200/50 rounded-2xl sm:rounded-[2.5rem] overflow-hidden hover:border-[#a338b9]/40 transition-[transform,box-shadow,border-color] duration-300 ease-out relative text-left hover:-translate-y-1 hover:shadow-md transform-gpu"
              >
                <div className="h-28 sm:h-60 w-full overflow-hidden relative bg-stone-100">
                  <img 
                    src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=500&q=70" 
                    alt="Teleconsulta com a médica veterinária Dra Thais" 
                    className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-95"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-2.5 sm:top-5 left-2.5 sm:left-5 bg-white/95 backdrop-blur-sm text-[#a338b9] text-[7px] sm:text-[9px] font-bold uppercase tracking-widest px-2.5 sm:px-4 py-1 sm:py-2 rounded-full border border-stone-200/30">
                    Nacional • 100% Online
                  </span>
                </div>
                <div className="p-3.5 sm:p-8 flex flex-col flex-grow justify-between">
                  <div className="space-y-1.5 sm:space-y-3 mb-3.5 sm:mb-6">
                    <span className="text-[7px] sm:text-[9px] font-black text-[#a338b9] uppercase tracking-widest font-nunito font-bold">Sessão Digital</span>
                    <h3 className="text-xs sm:text-xl md:text-2xl font-semibold text-[#111827] font-display">Teleconsulta Nutricional</h3>
                    <p className="text-[10px] sm:text-xs text-stone-700 font-semibold leading-relaxed pt-1 sm:pt-2 font-nunito">
                      Para tutores de todo o Brasil e exterior. Um atendimento online minucioso de cerca de 1 hora, análise de exames recentes, receita de dieta natural balanceada ou suplementação ideal da ração enviada em PDF assinado digitalmente.
                    </p>
                  </div>
                  <button 
                    onClick={() => openConsulta('online')}
                    className="w-full py-2.5 sm:py-4 px-3 sm:px-6 bg-gradient-to-r from-[#a338b9] to-[#bf48da] hover:from-[#812099] hover:to-[#a338b9] text-white font-extrabold rounded-xl sm:rounded-2xl text-[9px] sm:text-[11px] uppercase tracking-wider relative overflow-hidden shadow-[0_8px_20px_rgba(163,56,185,0.15)] hover:shadow-[0_12px_28px_rgba(163,56,185,0.3)] transition-all duration-200 ease-out flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer border-none transform active:scale-[0.98] hover:scale-[1.01]"
                  >
                    <Calendar className="shrink-0 w-3 h-3 sm:w-[13px] sm:h-[13px]" />
                    <span>Agendar Teleconsulta</span>
                    <ArrowUpRight className="shrink-0 w-3 h-3 sm:w-[13px] sm:h-[13px]" />
                  </button>
                </div>
              </div>
            </FadeIn>

            {/* Format 2: Presencial SP */}
            <FadeIn delay={0.1} className="h-full">
              <div 
                style={{ willChange: "transform, box-shadow" }}
                className="group h-full flex flex-col bg-white border border-stone-200/50 rounded-2xl sm:rounded-[2.5rem] overflow-hidden hover:border-[#a338b9]/40 transition-[transform,box-shadow,border-color] duration-300 ease-out relative text-left hover:-translate-y-1 hover:shadow-md transform-gpu"
              >
                <div className="h-28 sm:h-60 w-full overflow-hidden relative bg-stone-100">
                  <img 
                    src="https://images.pexels.com/photos/8473448/pexels-photo-8473448.jpeg?auto=compress&cs=tinysrgb&w=500&q=70" 
                    alt="Atendimento clínico direto no consultório em São Paulo" 
                    className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-95"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-2.5 sm:top-5 left-2.5 sm:left-5 bg-white/95 backdrop-blur-sm text-[#a338b9] text-[7px] sm:text-[9px] font-bold uppercase tracking-widest px-2.5 sm:px-4 py-1 sm:py-2 rounded-full border border-stone-200/30">
                    São Paulo Capital • Presencial
                  </span>
                </div>
                <div className="p-3.5 sm:p-8 flex flex-col flex-grow justify-between">
                  <div className="space-y-1.5 sm:space-y-3 mb-3.5 sm:mb-6">
                    <span className="text-[7px] sm:text-[9px] font-black text-[#a338b9] uppercase tracking-widest font-nunito font-bold">Sessão Consultório</span>
                    <h3 className="text-xs sm:text-xl md:text-2xl font-semibold text-[#111827] font-display">Consulta Presencial</h3>
                    <p className="text-[10px] sm:text-xs text-stone-700 font-semibold leading-relaxed pt-1 sm:pt-2 font-nunito">
                      Realizada em clínica estruturada na cidade de São Paulo. Inclui exame físico geral, aferição de score de gordura corporal, bioimpedância, e elaboração minuciosa do guia alimentar clínico individualizado para seu amigo de quatro patas.
                    </p>
                  </div>
                  <button 
                    onClick={() => openConsulta('presencial')}
                    className="w-full py-2.5 sm:py-4 px-3 sm:px-6 bg-gradient-to-r from-[#a338b9] to-[#bf48da] hover:from-[#812099] hover:to-[#a338b9] text-white font-extrabold rounded-xl sm:rounded-2xl text-[9px] sm:text-[11px] uppercase tracking-wider relative overflow-hidden shadow-[0_8px_20px_rgba(163,56,185,0.15)] hover:shadow-[0_12px_28px_rgba(163,56,185,0.3)] transition-all duration-200 ease-out flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer border-none transform active:scale-[0.98] hover:scale-[1.01]"
                  >
                    <MapPin className="shrink-0 w-3 h-3 sm:w-[13px] sm:h-[13px]" />
                    <span>Agendar Presencial</span>
                    <ArrowUpRight className="shrink-0 w-3 h-3 sm:w-[13px] sm:h-[13px]" />
                  </button>
                </div>
              </div>
            </FadeIn>

            {/* Format 3: Convênio */}
            <FadeIn delay={0.15} className="h-full col-span-2 md:col-span-1">
              <div 
                style={{ willChange: "transform, box-shadow" }}
                className="group h-full flex flex-col bg-white border border-stone-200/50 rounded-2xl sm:rounded-[2.5rem] overflow-hidden hover:border-[#a338b9]/40 transition-[transform,box-shadow,border-color] duration-300 ease-out relative text-left hover:-translate-y-1 hover:shadow-md transform-gpu"
              >
                <div className="h-28 sm:h-60 w-full overflow-hidden relative bg-stone-100">
                  <img 
                    src="https://img.freepik.com/fotos-premium/pessoa-feminina-segurando-smartphone-nas-maos-enquanto-deitada-no-sofa-em-casa-com-sua-ia-generativa_874904-125864.jpg?semt=ais_hybrid&w=740&q=80" 
                    alt="Atendimento veterinário por plano de saúde e convênio" 
                    className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-95"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-2.5 sm:top-5 left-2.5 sm:left-5 bg-white/95 backdrop-blur-sm text-[#a338b9] text-[7px] sm:text-[9px] font-bold uppercase tracking-widest px-2.5 sm:px-4 py-1 sm:py-2 rounded-full border border-stone-200/30">
                    Planos de Saúde • Reembolso
                  </span>
                </div>
                <div className="p-3.5 sm:p-8 flex flex-col flex-grow justify-between">
                  <div className="space-y-1.5 sm:space-y-3 mb-3.5 sm:mb-6">
                    <span className="text-[7px] sm:text-[9px] font-black text-[#a338b9] uppercase tracking-widest font-nunito font-bold">Uso de Benefício</span>
                    <h3 className="text-xs sm:text-xl md:text-2xl font-semibold text-[#111827] font-display">Atendimento pelo Convênio</h3>
                    <p className="text-[10px] sm:text-xs text-stone-700 font-semibold leading-relaxed pt-1 sm:pt-2 font-nunito">
                      Seu pet tem plano de saúde? Diversas operadoras trabalham com sistema de livre escolha e reembolso para consultas com especialistas. Fale comigo para saber mais e agendar pelo convênio!
                    </p>
                  </div>
                  <button 
                    onClick={() => openConsulta('insurance')}
                    className="w-full py-2.5 sm:py-4 px-3 sm:px-6 bg-gradient-to-r from-[#a338b9] to-[#bf48da] hover:from-[#812099] hover:to-[#a338b9] text-white font-extrabold rounded-xl sm:rounded-2xl text-[9px] sm:text-[11px] uppercase tracking-wider relative overflow-hidden shadow-[0_8px_20px_rgba(163,56,185,0.15)] hover:shadow-[0_12px_28px_rgba(163,56,185,0.3)] transition-all duration-200 ease-out flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer border-none transform active:scale-[0.98] hover:scale-[1.01]"
                  >
                    <MessageSquare className="shrink-0 w-3 h-3 sm:w-[13px] sm:h-[13px]" />
                    <span>Agendar pelo Convênio</span>
                    <ArrowUpRight className="shrink-0 w-3 h-3 sm:w-[13px] sm:h-[13px]" />
                  </button>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>
      
      {/* SECTION 6: MEU PRIMEIRO PET (PRIMARY SOLUTION) */}
      <MeuPrimeiroPet setIsModalOpen={setIsModalOpen} />
      
      {/* SECTION 7: DEPOIMENTOS EMOCIONAIS (Estilo Airbnb/Headspace - fotos grandes e relatos humanos reais) */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4 md:px-8 bg-gradient-to-b from-[#FAF6FE] via-white to-white rounded-[3.5rem] md:rounded-[4.5rem] shadow-[0_-15px_45px_rgba(163,56,185,0.01),0_25px_60px_rgba(0,0,0,0.01)] border-b border-stone-200/25 relative z-10 -mt-16 overflow-hidden" id="depoimentos">
        {/* Transição de seção 6 para 7: blob orgânico sutil */}
        <div 
          className="absolute -top-16 left-6 sm:left-16 lg:left-32 w-[140px] h-[140px] sm:w-[325px] sm:h-[325px] pointer-events-none -z-10 opacity-[0.25] sm:opacity-[0.38]"
          style={{
            backgroundColor: "#a338b9",
            borderRadius: "70% 30% 50% 50% / 30% 30% 70% 70%",
          }}
        />
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16 max-w-3xl mx-auto space-y-4">
            <FadeIn>
              <span className="text-[11px] font-bold text-[#a338b9] tracking-[0.2em] uppercase font-sans">Histórias de Cuidado</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#111827] font-display mb-8">A transformação visível em poucas semanas</h2>
              <p className="text-stone-700 text-lg md:text-xl font-semibold leading-relaxed max-w-2xl mx-auto font-sans text-center mt-6">
                Relatórios reais de bem-estar enviados por tutores satisfeitos com a recuperação ativa do pet.
              </p>
            </FadeIn>
          </div>

          {/* Testimonial slider / showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-5xl mx-auto">
            
            {/* Left list controls */}
            <div className="lg:col-span-5 flex flex-col gap-4 text-left">
              {testimonials.map((test, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`p-5 rounded-2xl text-left transition-all duration-300 border flex items-center gap-4 cursor-pointer w-full select-none outline-none ${
                    activeTestimonial === idx 
                      ? 'bg-[#9B4DCA]/10 border-[#9B4DCA] text-[#111827] shadow-sm' 
                      : 'bg-white border-stone-200/50 text-stone-700 font-semibold hover:bg-stone-50/50'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-stone-100 flex items-center justify-center font-bold text-lg">
                    {test.tutor.includes("Gato") ? "🐱" : "🐶"}
                  </div>
                  <div>
                    <h4 className="text-base font-bold font-display text-[#111827]">{test.petName}</h4>
                    <p className="text-xs text-stone-500 font-semibold mt-0.5">{test.tutor}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Right display content: Clean & minimalist premium display that showcases the real WhatsApp chats */}
            <div className="lg:col-span-7 bg-[#1c1c1e] p-2 rounded-3xl flex flex-col justify-center overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] ring-1 ring-black/5 relative">
              <div className="w-full bg-[#111111] rounded-2xl flex items-center justify-center relative overflow-hidden py-3 px-2" style={{ minHeight: "440px" }}>
                {/* Subtle sheen highlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none z-10" />
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <img 
                      src={testimonials[activeTestimonial].img} 
                      alt={`Real WhatsApp chat feedback from ${testimonials[activeTestimonial].petName}`} 
                      className="w-full max-h-[440px] md:max-h-[480px] object-contain rounded-xl shadow-md" 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* SECTION 8: FAQ (Accordion format) */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4 md:px-8 relative z-10 -mt-16 bg-gradient-to-b from-[#FDFBF9] via-[#F8F6F2] to-[#FAF8F5] rounded-t-[3.5rem] md:rounded-t-[4.5rem] shadow-[0_-15px_45px_rgba(0,0,0,0.01)] border-t border-stone-200/20 overflow-hidden" id="faq">
        {/* Transição de seção 7 para 8: blob orgânico sutil */}
        <div 
          className="absolute -top-16 right-6 sm:right-16 lg:right-32 w-[140px] h-[140px] sm:w-[325px] sm:h-[325px] pointer-events-none -z-10 opacity-[0.25] sm:opacity-[0.38]"
          style={{
            backgroundColor: "#a338b9",
            borderRadius: "30% 70% 40% 60% / 50% 30% 70% 50%",
          }}
        />
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[450px] h-[300px] bg-[#a338b9]/3 rounded-full filter blur-[80px] pointer-events-none z-0" />
        <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
          
          <div className="space-y-4">
            <span className="text-[11px] font-bold text-[#a338b9] tracking-[0.2em] uppercase font-sans">Dúvidas Frequentes</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#111827] font-display">Perguntas Respondidas</h2>
            <p className="text-stone-700 font-semibold text-sm md:text-base leading-relaxed font-sans max-w-lg mx-auto">
              Veja as respostas essenciais sobre a consulta oficial da Dra. Thais e a metodologia simplificada do Meu Primeiro Pet.
            </p>
          </div>

          <div className="bg-white border border-stone-200/50 rounded-[2.5rem] p-6 md:p-10 text-left shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>

        </div>
      </section>
      
      {/* SECTION 9: HIGHLY EMOTIONAL FINAL CTA (Celestial Cosmic Gradient with Custom Background Image) */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 px-4 md:px-8 text-white relative overflow-hidden text-center border-t border-[#a338b9]/25 rounded-t-[3.5rem] md:rounded-t-[4.5rem] shadow-[0_-20px_50px_rgba(163,56,185,0.12)] z-20 -mt-16 bg-stone-950">
        {/* Background Image with optimized visibility and text contrast */}
        <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/8434727/pexels-photo-8434727.jpeg?auto=compress&cs=tinysrgb&w=1200&q=70" 
            alt="Fundo Veterinário Longevidade" 
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
          />
          {/* Dark cosmic overlay with moderate transparency so the image is beautifully visible while keeping text readable */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#15041a]/90 via-[#08000a]/85 to-[#040005]/90" />
        </div>

        {/* Subtle background glow spheres */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-[#a338b9]/15 rounded-full filter blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#d4abe4]/10 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-8">
          <FadeIn>
            <span className="text-[11px] font-black text-[#d4abe4] tracking-[0.25em] uppercase font-sans bg-[#a338b9]/25 border border-[#a338b9]/30 px-4.5 py-1.5 rounded-full inline-block">
              O Futuro do seu Pet Começa Agora
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black font-display uppercase tracking-tight max-w-3xl mx-auto leading-tight">
              A alimentação de hoje influencia a saúde que ele terá amanhã
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-stone-200 font-medium md:text-lg leading-relaxed max-w-2xl mx-auto font-sans">
              Oferecer uma vida longa, ativa e feliz para quem só sabe te amar é o melhor presente que você pode dar. Proteja o futuro dele hoje mesmo com orientação nutricional científica feita sob medida.
            </p>
          </FadeIn>

          <FadeIn delay={0.3} className="pt-6">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-5 max-w-lg mx-auto">
              <motion.button 
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-[#ff38bc] via-[#a338b9] to-[#fb923c] text-white font-black rounded-2xl text-xs sm:text-sm uppercase tracking-wider relative overflow-hidden shadow-[0_15px_45px_rgba(163,56,185,0.45)] transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-0.5 border-none"
              >
                {/* Glowing sweep effect */}
                <motion.div 
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-15deg] pointer-events-none"
                />
                <span className="tracking-widest flex items-center gap-1.5 font-display text-sm">
                  Quero o plano do meu pet <Sparkles size={14} className="fill-white" />
                </span>
                <span className="text-[10px] font-bold text-amber-100 normal-case tracking-normal">Receber meu plano alimentar por R$ 119,90</span>
              </motion.button>

              <motion.button 
                onClick={() => openConsulta('online')}
                whileHover={{ scale: 1.04, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-10 py-5 bg-white/5 text-white font-black rounded-2xl text-xs sm:text-sm uppercase tracking-wider transition-all border border-white/20 hover:border-white/40 cursor-pointer flex flex-col items-center justify-center gap-0.5"
              >
                <span className="tracking-widest flex items-center gap-1.5 font-bold uppercase overflow-hidden leading-none select-none text-center">Falar com Dra. Thais <ArrowUpRight size={14} /></span>
                <span className="text-[10px] font-bold text-stone-200 normal-case tracking-normal">Tirar dúvidas sobre consultas</span>
              </motion.button>
            </div>
            <div className="flex justify-center items-center gap-6 text-[10px] text-stone-200 font-bold font-sans pt-6">
              <span className="flex items-center gap-1.5">🛡️ Livre de conflito de interesses</span>
              <span className="text-stone-700">•</span>
              <span className="flex items-center gap-1.5">❤️ Por mais anos ao seu lado</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER (Elegant, classic clinic info) */}
      <footer className="py-20 px-4 md:px-8 border-t border-stone-200/50 bg-[#FAF7F1] text-stone-700 font-sans text-xs">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start text-left mb-16">
            
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <Heart className="text-[#a338b9] shrink-0" size={16} fill="currentColor" />
                <span className="text-sm font-bold text-[#111827] font-display">Dra. Thais Vieira</span>
              </div>
              <p className="text-stone-700 font-medium max-w-sm leading-relaxed">
                Médica Veterinária especialista em nutrição animal. Cuidados focados em devolver a longevidade biológica a cães e felinos por meio de protocolos de suporte de alto rigor científico.
              </p>
              <div className="pt-1.5 flex items-center">
                <a 
                  href="https://www.instagram.com/thaisvieiravet" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#a338b9]/5 text-[#a338b9] hover:bg-[#a338b9]/10 px-3 py-1.5 rounded-full font-semibold transition-all duration-300"
                >
                  <Instagram size={14} className="stroke-[2.5]" />
                  <span>Siga no Instagram</span>
                </a>
              </div>
            </div>

            <div className="md:col-span-3 space-y-4">
              <h4 className="text-[10px] font-bold tracking-widest uppercase text-[#111827]">Atendimento Geral</h4>
              <ul className="space-y-2">
                <li>Teleconsultas de Nutrologia Online</li>
                <li>Consultório Presencial (São Paulo)</li>
                <li>Adesão Digital Meu Primeiro Pet</li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-4">
              <h4 className="text-[10px] font-bold tracking-widest uppercase text-[#111827]">Legal & Ética</h4>
              <p className="leading-relaxed">
                As consultorias do Meu Primeiro Pet não representam diagnóstico médico final e não substituem o acompanhamento completo em consultório físico veterinário em casos de quadros patológicos agudos do animal.
              </p>
              <p className="font-bold text-[#111827]">CRMV-SP 52.883</p>
            </div>

          </div>

          <div className="border-t border-stone-200/40 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px]">
            <p>© {new Date().getFullYear()} Dra. Thais Vieira Nutrição Animal. Todos os direitos reservados.</p>
            <p className="font-medium">Isenção absoluta de comissões de marketing de rações industriais.</p>
          </div>
        </div>
      </footer>

      {/* Interactive Modal instances */}
      <ConsultaModal isOpen={isConsultaOpen} onClose={() => setIsConsultaOpen(false)} initialFormat={consultaFormat} />
      <PaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Dynamic WhatsApp attention-grabber float */}
      <WhatsAppFloat />

      {/* Premium Meu Primeiro Pet Notification Pop-up */}
      <MeuPrimeiroPetNotification />

    </div>
  );
}
