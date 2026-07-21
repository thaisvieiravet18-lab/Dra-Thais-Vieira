import React, { useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, User, Sparkles, CheckCircle2, ShieldAlert, ArrowRight, Share2, Bookmark } from 'lucide-react';
import { motion } from 'motion/react';
import { BLOG_ARTICLES } from '../../data/blogArticles';
import { BlogArticle } from '../../types/blog';

interface BlogPostPageProps {
  slug: string;
  onNavigateBlog: () => void;
  onSelectArticle: (slug: string) => void;
  onOpenConsulta: (format: 'online' | 'presencial' | 'insurance') => void;
  onNavigateInternalLink: (url: string) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
  slug,
  onNavigateBlog,
  onSelectArticle,
  onOpenConsulta,
  onNavigateInternalLink,
}) => {
  const article = BLOG_ARTICLES.find((a) => a.slug === slug) || BLOG_ARTICLES[0];

  // Update Page SEO Document Title and Meta Description
  useEffect(() => {
    if (article) {
      document.title = article.metaTitle || `${article.title} | Blog Dra. Thais Vieira`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', article.metaDescription);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article, slug]);

  const relatedArticles = BLOG_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  // Helper to convert markdown content into styled HTML blocks with internal links
  const renderFormattedMarkdown = (markdown: string) => {
    const lines = markdown.split('\n');
    const elements: React.ReactNode[] = [];
    let currentList: string[] = [];
    let keyIdx = 0;

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`ul-${keyIdx++}`} className="space-y-2 my-4 pl-6 list-disc text-stone-700 text-base leading-relaxed">
            {currentList.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: parseInlineFormatting(item) }} />
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    lines.forEach((line) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        currentList.push(trimmed.substring(2));
        return;
      } else {
        flushList();
      }

      if (!trimmed) {
        return;
      }

      if (trimmed.startsWith('## ')) {
        elements.push(
          <h2 key={`h2-${keyIdx++}`} className="text-2xl md:text-3xl font-extrabold font-display text-stone-900 mt-8 mb-4 pt-4 border-t border-stone-100 text-left">
            {trimmed.replace('## ', '')}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        elements.push(
          <h3 key={`h3-${keyIdx++}`} className="text-xl md:text-2xl font-bold font-display text-[#a338b9] mt-6 mb-3 text-left">
            {trimmed.replace('### ', '')}
          </h3>
        );
      } else if (trimmed.startsWith('> ')) {
        elements.push(
          <blockquote key={`bq-${keyIdx++}`} className="bg-[#fcf5fe] border-l-4 border-[#a338b9] p-4 rounded-r-2xl my-6 text-stone-800 text-sm md:text-base font-medium italic text-left">
            <span dangerouslySetInnerHTML={{ __html: parseInlineFormatting(trimmed.replace('> ', '')) }} />
          </blockquote>
        );
      } else if (trimmed === '---') {
        elements.push(<hr key={`hr-${keyIdx++}`} className="my-8 border-stone-200" />);
      } else {
        elements.push(
          <p key={`p-${keyIdx++}`} className="text-stone-700 text-base md:text-lg leading-relaxed mb-4 text-left font-sans">
            <span dangerouslySetInnerHTML={{ __html: parseInlineFormatting(trimmed) }} />
          </p>
        );
      }
    });

    flushList();
    return elements;
  };

  const parseInlineFormatting = (text: string) => {
    // Bold formatting **text**
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-stone-900">$1</strong>');
    // Italic formatting *text*
    formatted = formatted.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
    // Internal markdown links [anchor](url)
    formatted = formatted.replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" class="text-[#a338b9] font-bold underline hover:text-[#812099] transition-colors internal-blog-link">$1</a>'
    );
    return formatted;
  };

  // Intercept click on internal links
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a');
    if (link && link.classList.contains('internal-blog-link')) {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href) {
        onNavigateInternalLink(href);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-20 text-[#374151]">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 mb-8 text-left flex-wrap">
          <button
            onClick={onNavigateBlog}
            className="flex items-center gap-1.5 text-[#a338b9] hover:underline font-bold cursor-pointer border-none bg-transparent"
          >
            <ArrowLeft size={14} />
            <span>Voltar para o Blog</span>
          </button>
          <span>/</span>
          <span className="text-stone-400">{article.category}</span>
          <span>/</span>
          <span className="text-stone-800 font-bold truncate max-w-[200px]">{article.title}</span>
        </div>

        {/* Article Meta Header */}
        <header className="text-left space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-[#f4e2f7] text-[#a338b9] text-xs font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-[#ebdcf2]">
              {article.category}
            </span>
            <span className="text-xs font-semibold text-stone-400 flex items-center gap-1">
              <Calendar size={14} /> {article.publishDate}
            </span>
            <span className="text-xs font-semibold text-stone-400 flex items-center gap-1">
              <Clock size={14} /> {article.readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black font-display text-stone-900 tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-stone-600 text-lg md:text-xl font-medium leading-relaxed">
            {article.summary}
          </p>

          {/* Author Card */}
          <div className="flex items-center justify-between gap-4 p-4 bg-white border border-stone-200/80 rounded-2xl shadow-sm my-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#f4e2f7] text-[#a338b9] flex items-center justify-center font-bold text-base border border-[#ebdcf2]">
                <User size={22} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-extrabold text-stone-900">{article.author.name}</span>
                <span className="text-xs font-semibold text-[#a338b9]">{article.author.role}</span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-stone-400">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: article.title, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link do artigo copiado!');
                  }
                }}
                className="p-2 rounded-xl hover:bg-stone-100 transition-colors text-stone-600 cursor-pointer border-none bg-transparent"
                title="Compartilhar Artigo"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden shadow-lg mb-10 border border-stone-200/60 max-h-[480px]">
          <img
            src={article.image}
            alt={article.imageAlt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Markdown Body */}
        <div
          onClick={handleContainerClick}
          className="bg-white border border-stone-200/80 rounded-3xl p-6 md:p-10 shadow-sm mb-12"
        >
          {renderFormattedMarkdown(article.contentMarkdown)}
        </div>

        {/* Specific Conversion CTA Box from User Specifications */}
        <section className="bg-gradient-to-br from-[#f8ebfc] via-[#ffffff] to-[#f4e2f7] border-2 border-[#a338b9]/40 rounded-3xl p-8 my-10 shadow-md text-left relative overflow-hidden">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#a338b9] mb-3">
            <Sparkles size={18} />
            <span>Agendamento de Consulta Veterinária</span>
          </div>

          <h3 className="text-2xl font-extrabold font-display text-stone-900 mb-3 leading-snug">
            Precisa de ajuda individual com o seu pet?
          </h3>

          <p className="text-stone-700 text-base font-medium leading-relaxed mb-6">
            {article.ctaText}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <button
              onClick={() => onOpenConsulta('online')}
              className="bg-[#a338b9] hover:bg-[#812099] text-white py-4 px-8 rounded-2xl font-bold text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2.5 cursor-pointer border-none"
            >
              <span>Agendar Consulta Nutricional</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => onNavigateInternalLink('/consulta-primeiro-pet/')}
              className="bg-white hover:bg-stone-50 text-stone-800 py-4 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all border border-stone-300 cursor-pointer"
            >
              Saiba mais sobre a Consulta
            </button>
          </div>
        </section>

        {/* Mandatory Veterinary Disclaimer Box */}
        <section className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 mb-12 text-left flex items-start gap-3">
          <ShieldAlert size={22} className="text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 font-medium leading-relaxed space-y-1">
            <p className="font-bold uppercase tracking-wider">Aviso de Responsabilidade Veterinária:</p>
            <p>
              Este artigo tem caráter estritamente educativo e informativo. Nenhuma orientação online substitui a avaliação clínica presencial ou teleorientação individualizada realizada por um médico veterinário. Em casos de filhotes, idosos, gatos com inapetência, suspeita de alergia alimentar, doença renal, obesidade ou necessidade de ração terapêutica, consulte sempre um especialista.
            </p>
          </div>
        </section>

        {/* Related Articles Section */}
        <section className="mt-16 text-left">
          <h3 className="text-xl md:text-2xl font-bold font-display text-stone-900 mb-6">
            Outros artigos recomendados no Blog
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectArticle(rel.slug)}
                className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#a338b9] bg-[#f4e2f7] px-2.5 py-1 rounded-full inline-block mb-3">
                    {rel.category}
                  </span>
                  <h4 className="text-sm font-bold text-stone-900 mb-2 leading-snug line-clamp-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {rel.summary}
                  </p>
                </div>
                <span className="text-[#a338b9] font-bold text-xs mt-4 flex items-center gap-1">
                  Ler agora <ArrowRight size={12} />
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
