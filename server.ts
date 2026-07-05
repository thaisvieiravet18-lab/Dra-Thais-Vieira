import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import { MercadoPagoConfig, Payment } from 'mercadopago';

const PORT = 3000;

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

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
