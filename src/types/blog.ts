export type BlogCategory =
  | 'Alimentação natural'
  | 'Escolha de ração'
  | 'Gatos'
  | 'Filhotes e primeiro pet'
  | 'Rações terapêuticas'
  | 'Nutrição veterinária online';

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  mainKeyword: string;
  secondaryKeywords: string[];
  category: BlogCategory;
  intent: string;
  publishDate: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    crmv: string;
    avatar?: string;
  };
  summary: string;
  image: string;
  imageAlt: string;
  contentMarkdown: string;
  internalLinks: {
    url: string;
    text: string;
  }[];
  ctaText: string;
}

export interface ServiceLandingInfo {
  slug: string;
  title: string;
  headline: string;
  description: string;
  keywords: string[];
  benefits: string[];
  formatKey: 'online' | 'presencial' | 'insurance';
}
