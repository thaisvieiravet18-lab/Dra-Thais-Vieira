import React, { useState } from 'react';
import { Search, Calendar, Clock, ArrowRight, Sparkles, Filter, BookOpen, Heart, User, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { BLOG_ARTICLES, BLOG_CATEGORIES } from '../../data/blogArticles';
import { BlogCategory, BlogArticle } from '../../types/blog';

interface BlogIndexPageProps {
  onSelectArticle: (slug: string) => void;
  onNavigateCategory?: (category: BlogCategory) => void;
  onOpenConsulta: (format: 'online' | 'presencial' | 'insurance') => void;
  onNavigateHome: () => void;
}

export const BlogIndexPage: React.FC<BlogIndexPageProps> = ({
  onSelectArticle,
  onOpenConsulta,
  onNavigateHome,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Update Document title and meta description for SEO
  React.useEffect(() => {
    document.title = 'Blog de Nutrição Pet | Dra. Thais Vieira';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Artigos sobre nutrição pet, escolha de ração, alimentação natural para cães e gatos, primeiro pet e orientação nutricional veterinária.'
      );
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Artigos sobre nutrição pet, escolha de ração, alimentação natural para cães e gatos, primeiro pet e orientação nutricional veterinária.';
      document.head.appendChild(meta);
    }
  }, []);

  const filteredArticles = BLOG_ARTICLES.filter((article) => {
    const matchesCategory =
      selectedCategory === 'Todos' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.mainKeyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.secondaryKeywords.some((kw) =>
        kw.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = BLOG_ARTICLES.find(
    (a) => a.slug === 'qual-racao-dar-para-filhote'
  ) || BLOG_ARTICLES[0];

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-20 text-[#374151]">
      {/* Top Banner / Hero Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 mb-12">
        <div className="bg-gradient-to-br from-[#f8ebfc] via-[#ffffff] to-[#f4e2f7] border border-[#ebdcf2] rounded-3xl p-8 md:p-12 shadow-sm text-left relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-[#a338b9]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#a338b9] mb-4">
            <BookOpen size={16} />
            <span>Portal Educativo de Nutrologia Veterinária</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black font-display text-[#111827] mb-4 tracking-tight leading-tight">
            Blog de Nutrição Pet
          </h1>

          <p className="text-stone-600 text-base md:text-lg font-medium max-w-2xl mb-8 leading-relaxed">
            Conteúdos para ajudar tutores a entenderem melhor a alimentação de cães e gatos, com orientação de uma médica veterinária.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
            <input
              type="text"
              placeholder="Pesquisar dúvidas sobre ração, filhotes, alimento natural..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-stone-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#a338b9]/40 shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Categories Horizontal Filter */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={16} className="text-[#a338b9]" />
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Categorias em Destaque:</span>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-3">
          <button
            onClick={() => setSelectedCategory('Todos')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
              selectedCategory === 'Todos'
                ? 'bg-[#a338b9] text-white border-[#a338b9] shadow-md'
                : 'bg-white text-stone-700 border-stone-200 hover:border-[#a338b9]/50'
            }`}
          >
            Todos os Artigos
          </button>

          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-[#a338b9] text-white border-[#a338b9] shadow-md'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-[#a338b9]/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Article Section (When no search query is active and "Todos" selected) */}
      {selectedCategory === 'Todos' && !searchQuery && featuredArticle && (
        <section className="max-w-7xl mx-auto px-6 md:px-10 mb-16">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={18} className="text-[#a338b9]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#a338b9]">Artigo Semanal em Destaque</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-stone-200/80 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-6 relative min-h-[280px] lg:min-h-full">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.imageAlt}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-[#a338b9] text-white text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                {featuredArticle.category}
              </span>
            </div>

            <div className="lg:col-span-6 p-8 md:p-10 flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center gap-4 text-xs font-semibold text-stone-500 mb-3">
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> {featuredArticle.publishDate}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5"><Clock size={14} /> {featuredArticle.readTime}</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold font-display text-stone-900 mb-4 hover:text-[#a338b9] transition-colors leading-snug">
                  {featuredArticle.title}
                </h2>

                <p className="text-stone-600 text-sm md:text-base leading-relaxed mb-6">
                  {featuredArticle.summary}
                </p>
              </div>

              <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#f4e2f7] text-[#a338b9] flex items-center justify-center font-bold text-sm border border-[#ebdcf2]">
                    <User size={18} />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-stone-900">{featuredArticle.author.name}</span>
                    <span className="text-[10px] font-medium text-stone-500">{featuredArticle.author.role}</span>
                  </div>
                </div>

                <a
                  href={`/blog/${featuredArticle.slug}/`}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectArticle(featuredArticle.slug);
                  }}
                  className="bg-[#a338b9] hover:bg-[#8d2a83] text-white px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer border-none shadow-md hover:scale-[1.02] no-underline"
                >
                  <span>Ler Artigo Completo</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 mb-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold font-display text-stone-900 text-left">
            {selectedCategory === 'Todos' ? 'Todos os Artigos Publicados' : `Artigos em ${selectedCategory}`}
          </h2>
          <span className="text-xs font-medium text-stone-500">
            {filteredArticles.length} {filteredArticles.length === 1 ? 'artigo encontrado' : 'artigos encontrados'}
          </span>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200">
            <p className="text-stone-600 font-medium text-base mb-4">
              Nenhum artigo encontrado para a busca especificada.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Todos');
                setSearchQuery('');
              }}
              className="text-[#a338b9] font-bold text-xs underline cursor-pointer border-none bg-transparent"
            >
              Limpar filtros e ver todos os artigos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-stone-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#a338b9] text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border border-stone-100">
                      {article.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-[11px] font-semibold text-stone-400 mb-2">
                      <span>{article.publishDate}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="text-lg font-bold font-display text-stone-900 mb-3 group-hover:text-[#a338b9] transition-colors leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-stone-600 text-xs leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-stone-100/60 mt-4 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-stone-500">{article.author.name}</span>
                  <a
                    href={`/blog/${article.slug}/`}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectArticle(article.slug);
                    }}
                    className="text-[#a338b9] font-bold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer no-underline"
                  >
                    <span>Ler Artigo</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* Conversion Banner Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="bg-[#111827] text-white rounded-3xl p-8 md:p-12 text-center md:text-left relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-stone-800 shadow-xl">
          <div className="space-y-4 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-400">
              <CheckCircle2 size={16} /> Atendimento Médico Veterinário Especializado
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold font-display leading-tight text-white">
              Quer uma orientação personalizada para a alimentação do seu cão ou gato?
            </h2>
            <p className="text-stone-300 text-sm md:text-base font-medium leading-relaxed">
              Agende sua consulta com a Dra. Thais Vieira para calcular porções exatas, escolher a melhor ração ou planejar a Alimentação Natural ideal para o seu pet.
            </p>
          </div>

          <div className="shrink-0 flex flex-col gap-3 w-full sm:w-auto">
            <button
              onClick={() => onOpenConsulta('online')}
              className="bg-[#a338b9] hover:bg-[#812099] text-white py-4 px-8 rounded-2xl font-bold text-xs md:text-sm uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer border-none"
            >
              <span>Agendar Consulta Nutricional</span>
              <ArrowRight size={18} />
            </button>
            <span className="text-[11px] text-stone-400 text-center font-medium">
              Atendimento Online (Brasil) ou Presencial em SP
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
