import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../App';
import { BLOG_ARTICLES, SERVICE_LANDINGS } from '../data/blogArticles';

const DOMAIN = 'https://drathaisvieira.com.br';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=80';

export interface SeoData {
  title: string;
  description: string;
  canonicalUrl: string;
  h1: string;
  ogType: 'website' | 'article';
  ogImage: string;
  jsonLd: any[];
}

export function getSeoDataForPath(pathname: string): SeoData {
  const cleanPath = pathname.replace(/\/$/, '') || '/';

  // 1. Home Page
  if (cleanPath === '/') {
    const title = 'Dra. Thais Vieira | Nutrologia Veterinária para Cães e Gatos';
    const description = 'Nutrição veterinária para cães e gatos com orientação de ração, alimentação natural, dieta mista e consulta nutricional online ou presencial em São Paulo.';
    const canonicalUrl = `${DOMAIN}/`;
    const h1 = 'Nutrologia Veterinária com Ciência, Carinho e Saúde para Cães e Gatos';

    return {
      title,
      description,
      canonicalUrl,
      h1,
      ogType: 'website',
      ogImage: DEFAULT_IMAGE,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'VeterinaryCare',
          'name': 'Dra. Thais Vieira | Nutrologia Veterinária',
          'url': canonicalUrl,
          'image': DEFAULT_IMAGE,
          'description': description,
          'medicalSpecialty': 'Veterinary',
          'address': {
            '@type': 'PostalAddress',
            'addressLocality': 'São Paulo',
            'addressRegion': 'SP',
            'addressCountry': 'BR'
          },
          'founder': {
            '@type': 'Person',
            'name': 'Dra. Thais Vieira',
            'jobTitle': 'Médica Veterinária Nutróloga'
          }
        },
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          'name': 'Dra. Thais Vieira - Nutrologia Veterinária',
          'url': canonicalUrl
        }
      ]
    };
  }

  // 2. Blog Index Page
  if (cleanPath === '/blog') {
    const title = 'Blog de Nutrição Veterinária | Dra. Thais Vieira';
    const description = 'Artigos e guias práticos sobre alimentação natural, escolha de ração, nutrição para gatos e filhotes por Dra. Thais Vieira.';
    const canonicalUrl = `${DOMAIN}/blog`;
    const h1 = 'Blog de Nutrologia Veterinária';

    return {
      title,
      description,
      canonicalUrl,
      h1,
      ogType: 'website',
      ogImage: DEFAULT_IMAGE,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Blog',
          'name': title,
          'url': canonicalUrl,
          'description': description
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Início',
              'item': `${DOMAIN}/`
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Blog',
              'item': canonicalUrl
            }
          ]
        }
      ]
    };
  }

  // 3. Blog Post Page (/blog/:slug)
  if (cleanPath.startsWith('/blog/')) {
    const articleSlug = cleanPath.replace('/blog/', '');
    const article = BLOG_ARTICLES.find(
      (a) => a.slug === articleSlug || (a.aliases && a.aliases.includes(articleSlug))
    );

    if (article) {
      const title = article.metaTitle || `${article.title} | Dra. Thais Vieira`;
      const description = article.metaDescription;
      const canonicalUrl = `${DOMAIN}/blog/${article.slug}`;
      const h1 = article.title;
      const authorName = article.author?.name || 'Dra. Thais Vieira';
      const publishDate = article.publishDate || '2026-07-20';

      return {
        title,
        description,
        canonicalUrl,
        h1,
        ogType: 'article',
        ogImage: DEFAULT_IMAGE,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            'mainEntityOfPage': {
              '@type': 'WebPage',
              '@id': canonicalUrl
            },
            'headline': article.title,
            'description': article.metaDescription,
            'image': [DEFAULT_IMAGE],
            'datePublished': publishDate,
            'dateModified': publishDate,
            'author': {
              '@type': 'Person',
              'name': authorName,
              'jobTitle': 'Médica Veterinária Nutróloga',
              'url': DOMAIN
            },
            'publisher': {
              '@type': 'Organization',
              'name': 'Dra. Thais Vieira | Nutrologia Veterinária',
              'url': DOMAIN,
              'logo': {
                '@type': 'ImageObject',
                'url': `${DOMAIN}/icon.svg`
              }
            },
            'articleSection': article.category,
            'keywords': [article.mainKeyword, ...article.secondaryKeywords].join(', ')
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Início',
                'item': `${DOMAIN}/`
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Blog',
                'item': `${DOMAIN}/blog`
              },
              {
                '@type': 'ListItem',
                'position': 3,
                'name': article.title,
                'item': canonicalUrl
              }
            ]
          }
        ]
      };
    }
  }

  // 4. Commercial Landing Pages (e.g. /nutricao-pet-online, /alimentacao-natural-para-caes, etc.)
  const serviceKey = cleanPath.replace(/^\//, '');
  if (serviceKey && SERVICE_LANDINGS[serviceKey]) {
    const landing = SERVICE_LANDINGS[serviceKey];
    const title = landing.title;
    const description = landing.description;
    const canonicalUrl = `${DOMAIN}/${landing.slug}`;
    const h1 = landing.headline;

    return {
      title,
      description,
      canonicalUrl,
      h1,
      ogType: 'website',
      ogImage: DEFAULT_IMAGE,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          'serviceType': 'Nutrologia Veterinária',
          'name': landing.title,
          'description': landing.description,
          'provider': {
            '@type': 'Person',
            'name': 'Dra. Thais Vieira',
            'jobTitle': 'Médica Veterinária Nutróloga',
            'url': DOMAIN
          }
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Início',
              'item': `${DOMAIN}/`
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': landing.title.split('|')[0].trim(),
              'item': canonicalUrl
            }
          ]
        }
      ]
    };
  }

  // Check if root-level slug matches any article slug/alias
  const matchingArticle = BLOG_ARTICLES.find(
    (a) => a.slug === serviceKey || (a.aliases && a.aliases.includes(serviceKey))
  );

  if (matchingArticle) {
    const title = matchingArticle.metaTitle || `${matchingArticle.title} | Dra. Thais Vieira`;
    const description = matchingArticle.metaDescription;
    const canonicalUrl = `${DOMAIN}/blog/${matchingArticle.slug}`;
    const h1 = matchingArticle.title;
    const authorName = matchingArticle.author?.name || 'Dra. Thais Vieira';
    const publishDate = matchingArticle.publishDate || '2026-07-20';

    return {
      title,
      description,
      canonicalUrl,
      h1,
      ogType: 'article',
      ogImage: DEFAULT_IMAGE,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': canonicalUrl
          },
          'headline': matchingArticle.title,
          'description': matchingArticle.metaDescription,
          'image': [DEFAULT_IMAGE],
          'datePublished': publishDate,
          'dateModified': publishDate,
          'author': {
            '@type': 'Person',
            'name': authorName,
            'jobTitle': 'Médica Veterinária Nutróloga',
            'url': DOMAIN
          },
          'publisher': {
            '@type': 'Organization',
            'name': 'Dra. Thais Vieira | Nutrologia Veterinária',
            'url': DOMAIN,
            'logo': {
              '@type': 'ImageObject',
              'url': `${DOMAIN}/icon.svg`
            }
          },
          'articleSection': matchingArticle.category,
          'keywords': [matchingArticle.mainKeyword, ...matchingArticle.secondaryKeywords].join(', ')
        }
      ]
    };
  }

  // Fallback for unknown routes
  const title = 'Dra. Thais Vieira | Nutrologia Veterinária para Cães e Gatos';
  const description = 'Nutrição veterinária para cães e gatos com orientação de ração, alimentação natural, dieta mista e consulta nutricional online ou presencial em São Paulo.';
  const canonicalUrl = `${DOMAIN}${cleanPath}`;
  const h1 = 'Dra. Thais Vieira | Nutrologia Veterinária';

  return {
    title,
    description,
    canonicalUrl,
    h1,
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
    jsonLd: []
  };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function renderPageHtml(pathname: string, templateHtml: string): string {
  const seo = getSeoDataForPath(pathname);

  // 1. Render App to static markup for this URL
  let appHtml = '';
  try {
    appHtml = renderToString(<App initialPath={pathname} />);
  } catch (err) {
    console.error('SSR Render Error:', err);
    appHtml = '';
  }

  // 2. Prepare head metadata elements
  const headElements = [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<link rel="canonical" href="${escapeHtml(seo.canonicalUrl)}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(seo.canonicalUrl)}" />`,
    `<meta property="og:type" content="${seo.ogType}" />`,
    `<meta property="og:image" content="${escapeHtml(seo.ogImage)}" />`,
    `<meta property="og:site_name" content="Dra. Thais Vieira | Nutrologia Veterinária" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(seo.ogImage)}" />`,
    ...seo.jsonLd.map(
      (data) => `<script type="application/ld+json">${JSON.stringify(data)}</script>`
    )
  ].join('\n    ');

  // Replace default title and description in templateHtml if they exist, or inject into <head>
  let html = templateHtml;

  if (html.includes('<title>')) {
    html = html.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(seo.title)}</title>`);
  } else {
    html = html.replace('</head>', `  <title>${escapeHtml(seo.title)}</title>\n</head>`);
  }

  if (html.includes('<meta name="description"')) {
    html = html.replace(/<meta name="description"[^>]*\/?>/s, `<meta name="description" content="${escapeHtml(seo.description)}" />`);
  }

  // Inject remaining head tags (canonical, OG, JSON-LD) before </head>
  const tagsToInject = [
    `<link rel="canonical" href="${escapeHtml(seo.canonicalUrl)}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(seo.canonicalUrl)}" />`,
    `<meta property="og:type" content="${seo.ogType}" />`,
    `<meta property="og:image" content="${escapeHtml(seo.ogImage)}" />`,
    `<meta property="og:site_name" content="Dra. Thais Vieira | Nutrologia Veterinária" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(seo.ogImage)}" />`,
    ...seo.jsonLd.map(
      (data) => `<script type="application/ld+json">${JSON.stringify(data)}</script>`
    )
  ].join('\n    ');

  html = html.replace('</head>', `    ${tagsToInject}\n  </head>`);

  // Replace <div id="root"></div> with rendered React App HTML
  if (appHtml) {
    html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  }

  return html;
}
