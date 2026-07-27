import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import cors from "cors";
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { renderPageHtml } from "./src/server/seoRenderer";
import { BLOG_ARTICLES, SERVICE_LANDINGS } from "./src/data/blogArticles";

const PORT = 3000;
const DOMAIN = 'https://drathaisvieira.com.br';

async function startServer() {
  const app = express();
  app.use(express.json());
  app.use(cors());

  // Mercado Pago Configuration
  const client = new MercadoPagoConfig({ 
    accessToken: 'TEST-1635215471400126-040520-3c1138434804298364ae9ae9e57d65c9-494929253' 
  });
  const payment = new Payment(client);

  // API Routes
  app.post("/api/process_payment", async (req, res) => {
    try {
      const { formData } = req.body;
      
      const paymentData = {
        body: {
          transaction_amount: 89.90,
          description: "Meu Primeiro Pet",
          payment_method_id: formData.payment_method_id,
          payer: {
            email: formData.payer.email,
            identification: formData.payer.identification,
          },
          token: formData.token,
          installments: formData.installments,
          issuer_id: formData.issuer_id,
        }
      };

      // If it's PIX, the structure is slightly different
      if (formData.payment_method_id === 'pix') {
        paymentData.body = {
          ...paymentData.body,
          // @ts-ignore
          payer: {
            email: formData.payer.email,
          }
        };
      }

      const result = await payment.create(paymentData);
      
      res.json({
        status: result.status,
        status_detail: result.status_detail,
        id: result.id,
      });
    } catch (error: any) {
      console.error("Mercado Pago Error:", error);
      res.status(500).json({ 
        error: error.message || "Internal Server Error",
        details: error.cause || []
      });
    }
  });

  // SEO Routes: robots.txt
  app.get("/robots.txt", (req, res) => {
    res.type("text/plain");
    res.send(`User-agent: *\nAllow: /\n\nSitemap: ${DOMAIN}/sitemap.xml\n`);
  });

  // SEO Routes: sitemap.xml
  app.get("/sitemap.xml", (req, res) => {
    res.type("application/xml");

    const staticUrls = [
      `${DOMAIN}/`,
      `${DOMAIN}/blog`
    ];

    const articleUrls = BLOG_ARTICLES.map((a) => `${DOMAIN}/blog/${a.slug}`);
    const landingUrls = Object.keys(SERVICE_LANDINGS).map((slug) => `${DOMAIN}/${slug}`);

    const allUrls = Array.from(new Set([...staticUrls, ...articleUrls, ...landingUrls]));

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url === DOMAIN + '/' ? '1.0' : url.includes('/blog/') ? '0.8' : '0.9'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    res.send(xml);
  });

  // Vite middleware for development vs Production static + SSR handling
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);

    app.use("*", async (req, res, next) => {
      if (req.originalUrl.startsWith("/api")) return next();
      try {
        const indexHtmlPath = path.resolve(process.cwd(), "index.html");
        let template = fs.readFileSync(indexHtmlPath, "utf-8");
        template = await vite.transformIndexHtml(req.originalUrl, template);
        const html = renderPageHtml(req.originalUrl, template);
        res.status(200).set({ "Content-Type": "text/html" }).send(html);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    const indexHtmlPath = path.join(distPath, 'index.html');
    
    app.use(express.static(distPath, { index: false }));

    app.get('*', (req, res, next) => {
      if (req.originalUrl.startsWith('/api')) return next();
      try {
        let indexTemplate = '';
        if (fs.existsSync(indexHtmlPath)) {
          indexTemplate = fs.readFileSync(indexHtmlPath, 'utf-8');
        }
        const html = renderPageHtml(req.originalUrl, indexTemplate);
        res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
      } catch (e) {
        console.error('SSR error in production:', e);
        res.sendFile(indexHtmlPath);
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
