import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import { MercadoPagoConfig, Payment } from 'mercadopago';
import nodemailer from "nodemailer";

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

  // API Route to submit the strategic Pet Questionnaire and send to thaissilveiravieira7@hotmail.com
  app.post("/api/submit_form", async (req, res) => {
    try {
      const { tutorName, tutorEmail, tutorPhone, name, type, age, weight, idealWeight, activity, eatsWell, currentFood, health } = req.body;

      // Format activity and eatsWell for the email
      const activityLabels: Record<string, string> = {
        low: "Sedentário — fica muito em casa",
        moderate: "Moderado — passeia alguns dias",
        high: "Ativo — corre, brinca bastante todo dia"
      };

      const eatsWellLabels: Record<string, string> = {
        yes: "Sim, come normalmente",
        picky: "É seletivo — às vezes recusa",
        no: "Não — recusa a ração com frequência"
      };

      const petTypeLabel = type === "cat" ? "Gato 🐱" : "Cão 🐶";

      // HTML Email body styled elegantly
      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              color: #1c1917;
              background-color: #FAF8F5;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 4px 20px rgba(0,0,0,0.05);
              border: 1px solid #ebdcf2;
            }
            .header {
              background: linear-gradient(135deg, #a338b9 0%, #7c2d9a 100%);
              color: #ffffff;
              padding: 30px 20px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: 700;
              letter-spacing: -0.5px;
            }
            .header p {
              margin: 5px 0 0;
              font-size: 14px;
              opacity: 0.9;
            }
            .content {
              padding: 30px 20px;
            }
            .section-title {
              font-size: 16px;
              font-weight: 700;
              color: #a338b9;
              border-bottom: 2px solid #f3e8ff;
              padding-bottom: 8px;
              margin-top: 0;
              margin-bottom: 15px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .data-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 25px;
            }
            .data-table td {
              padding: 10px 12px;
              border-bottom: 1px solid #f5ede6;
              vertical-align: top;
              font-size: 14px;
            }
            .label {
              font-weight: 600;
              color: #57534e;
              width: 35%;
            }
            .value {
              color: #1c1917;
            }
            .badge {
              display: inline-block;
              background-color: #f3e8ff;
              color: #7c2d9a;
              padding: 2px 8px;
              border-radius: 12px;
              font-size: 12px;
              font-weight: 600;
            }
            .footer {
              background-color: #fcfaf7;
              padding: 20px;
              text-align: center;
              font-size: 12px;
              color: #78716c;
              border-top: 1px solid #f5ede6;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🐾 Meu Primeiro Pet</h1>
              <p>Novo Formulário Estratégico Recebido com Sucesso!</p>
            </div>
            <div class="content">
              
              <div class="section-title">👤 Informações do Tutor</div>
              <table class="data-table">
                <tr>
                  <td class="label">Nome do Tutor:</td>
                  <td class="value"><strong>${tutorName || "Não informado"}</strong></td>
                </tr>
                <tr>
                  <td class="label">E-mail:</td>
                  <td class="value"><a href="mailto:${tutorEmail}">${tutorEmail}</a></td>
                </tr>
                <tr>
                  <td class="label">WhatsApp / Telefone:</td>
                  <td class="value">
                    <a href="https://wa.me/${String(tutorPhone || '').replace(/\D/g, '')}" target="_blank" style="color: #25D366; font-weight: bold; text-decoration: none;">
                      ${tutorPhone || "Não informado"}
                    </a>
                  </td>
                </tr>
              </table>

              <div class="section-title">🐶 Perfil Nutricional do Pet</div>
              <table class="data-table">
                <tr>
                  <td class="label">Nome do Pet:</td>
                  <td class="value"><strong>${name || "Não informado"}</strong></td>
                </tr>
                <tr>
                  <td class="label">Espécie:</td>
                  <td class="value"><span class="badge">${petTypeLabel}</span></td>
                </tr>
                <tr>
                  <td class="label">Idade:</td>
                  <td class="value">${age || "Não informada"}</td>
                </tr>
                <tr>
                  <td class="label">Peso Atual:</td>
                  <td class="value">${weight ? `${weight} kg` : "Não informado"}</td>
                </tr>
                <tr>
                  <td class="label">Peso Ideal (Meta):</td>
                  <td class="value">${idealWeight ? `${idealWeight} kg` : "Não informado"}</td>
                </tr>
                <tr>
                  <td class="label">Nível de Atividade:</td>
                  <td class="value">${activityLabels[activity] || activity || "Não informado"}</td>
                </tr>
                <tr>
                  <td class="label">Apetite por Ração:</td>
                  <td class="value">${eatsWellLabels[eatsWell] || eatsWell || "Não informado"}</td>
                </tr>
                <tr>
                  <td class="label">Ração Atual:</td>
                  <td class="value">${currentFood || "Sem informação"}</td>
                </tr>
                <tr>
                  <td class="label">Histórico Clínico / Saúde:</td>
                  <td class="value" style="color: #b91c1c; font-weight: 550;">${health || "Sem queixas clínicas relatadas"}</td>
                </tr>
              </table>

            </div>
            <div class="footer">
              <p>Este e-mail foi enviado automaticamente pelo formulário do site "Meu Primeiro Pet" da Dra. Thais Vieira.</p>
              <p>&copy; ${new Date().getFullYear()} Dra. Thais Vieira - Nutrição de Cães e Felinos</p>
            </div>
          </div>
        </body>
        </html>
      `;

      // Check if Resend or SMTP is configured
      const resendApiKey = process.env.RESEND_API_KEY || "re_ZDWMvde3_Hp8gVTE4wphrVu4XMj8kdJic";
      const smtpHost = process.env.SMTP_HOST;
      const smtpPort = process.env.SMTP_PORT;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const smtpFrom = process.env.SMTP_FROM_EMAIL || "onboarding@resend.dev";
      const receiverEmail = process.env.RECEIVER_EMAIL || "thaissilveiravieira7@hotmail.com";

      let emailSent = false;

      // 1. Try sending via Resend API if API Key is available
      if (resendApiKey) {
        console.log("Tentando enviar e-mail via Resend API...");
        try {
          // Use default sender onboarding@resend.dev unless a custom verified domain is specified
          const fromAddress = smtpFrom.includes("@") && !smtpFrom.includes("meuprimeiropet.com.br") ? smtpFrom : "onboarding@resend.dev";
          
          const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${resendApiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: `Meu Primeiro Pet <${fromAddress}>`,
              to: receiverEmail,
              subject: `🐾 Novo Form: ${name || 'Pet'} (${tutorName || 'Tutor'})`,
              html: emailHtml,
            }),
          });

          const responseData = await response.json() as any;
          if (response.ok) {
            console.log(`Email successfully sent via Resend API to ${receiverEmail}`);
            emailSent = true;
            return res.json({ success: true, simulated: false, provider: "resend" });
          } else {
            console.error("Erro retornado pela API do Resend:", responseData);
          }
        } catch (resendError) {
          console.error("Falha ao se comunicar com a API do Resend:", resendError);
        }
      }

      // 2. Fallback to SMTP if Resend didn't send and SMTP is configured
      if (!emailSent && smtpHost && smtpUser && smtpPass) {
        // Create actual nodemailer transport
        const transport = nodemailer.createTransport({
          host: smtpHost,
          port: parseInt(smtpPort || "587"),
          secure: smtpPort === "465", // true for 465, false for other ports
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        // Send email to Dra Thais only
        await transport.sendMail({
          from: `"Meu Primeiro Pet" <${smtpFrom}>`,
          to: receiverEmail,
          subject: `🐾 Novo Form: ${name || 'Pet'} (${tutorName || 'Tutor'})`,
          html: emailHtml,
        });

        console.log(`Email successfully sent via SMTP to ${receiverEmail} for pet ${name}`);
        emailSent = true;
        return res.json({ success: true, simulated: false, provider: "smtp" });
      }

      // 3. Fallback to Simulation if both failed or were not configured
      if (!emailSent) {
        // Log to console if credentials are empty to avoid holding up the process
        console.warn("Nenhuma configuração válida de e-mail (Resend ou SMTP) encontrada ou funcionando.");
        console.log("=== SIMULATED FORM SUBMISSION ===");
        console.log(`Recipient: ${receiverEmail}`);
        console.log(`Subject: New Form for Pet ${name}`);
        console.log(`Tutor Phone: ${tutorPhone}`);
        console.log("=================================");
        
        return res.json({ 
          success: true, 
          simulated: true, 
          message: "Formulário recebido e registrado em modo de simulação!" 
        });
      }
    } catch (error: any) {
      console.error("Form Submission Error:", error);
      res.status(500).json({ 
        error: error.message || "Erro interno ao processar formulário",
      });
    }
  });

  // API Route to submit the Consultation Appointment Request and send to thaissilveiravieira7@hotmail.com
  app.post("/api/submit_appointment", async (req, res) => {
    try {
      const { tutorName, petName, petType, breed, whatsapp, reason, format } = req.body;

      const formatLabels: Record<string, string> = {
        online: "💻 Online (Teleconsulta)",
        presencial: "🏥 Presencial (São Paulo)",
        insurance: "📄 Convênio (Plano de Saúde / Reembolso)"
      };

      const reasonLabels: Record<string, string> = {
        preventive: "Saúde preventiva / Ração ideal e quantidades",
        natural: "Quero transicionar para Alimentação Natural (AN)",
        mixed: "Quero transicionar para dieta mista (Ração + AN)",
        obesity: "Tratamento de obesidade / Sobrepeso silencioso",
        allergy: "Investigação de alergia alimentar / Coceiras / Pele sensível",
        disease: "Doença crônica (Diabetes, Doença Renal, Hepática, Gastrointestinal)",
        other: "Outra demanda específica"
      };

      const petTypeLabel = petType === "cat" ? "Gato 🐱" : "Cão 🐶";

      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              color: #1c1917;
              background-color: #FAF8F5;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 4px 20px rgba(0,0,0,0.05);
              border: 1px solid #ebdcf2;
            }
            .header {
              background: linear-gradient(135deg, #a338b9 0%, #7c2d9a 100%);
              color: #ffffff;
              padding: 30px 20px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: 700;
              letter-spacing: -0.5px;
            }
            .header p {
              margin: 5px 0 0;
              font-size: 14px;
              opacity: 0.9;
            }
            .content {
              padding: 30px 20px;
            }
            .section-title {
              font-size: 16px;
              font-weight: 700;
              color: #a338b9;
              border-bottom: 2px solid #f3e8ff;
              padding-bottom: 8px;
              margin-top: 0;
              margin-bottom: 15px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .data-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 25px;
            }
            .data-table td {
              padding: 10px 0;
              border-bottom: 1px solid #f5f5f4;
              vertical-align: top;
            }
            .label {
              font-weight: 600;
              color: #57534e;
              width: 35%;
              font-size: 14px;
            }
            .value {
              color: #1c1917;
              width: 65%;
              font-size: 14px;
            }
            .footer {
              background-color: #f5f5f4;
              padding: 20px;
              text-align: center;
              font-size: 12px;
              color: #78716c;
              border-top: 1px solid #ebdcf2;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🐾 Nova Solicitação de Consulta!</h1>
              <p>Meu Primeiro Pet — Dra. Thais Vieira</p>
            </div>
            <div class="content">
              <h2 class="section-title">Dados do Agendamento</h2>
              <table class="data-table">
                <tr>
                  <td class="label">Tutor(a):</td>
                  <td class="value">${tutorName || "Não informado"}</td>
                </tr>
                <tr>
                  <td class="label">WhatsApp:</td>
                  <td class="value">
                    <a href="https://wa.me/55${(whatsapp || "").replace(/\D/g, "")}" style="color: #a338b9; text-decoration: none; font-weight: 600;">
                      ${whatsapp || "Não informado"}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td class="label">Formato de Atendimento:</td>
                  <td class="value" style="font-weight: 600; color: #a338b9;">${formatLabels[format] || format || "Não informado"}</td>
                </tr>
              </table>

              <h2 class="section-title">Dados do Pet</h2>
              <table class="data-table">
                <tr>
                  <td class="label">Nome do Pet:</td>
                  <td class="value">${petName || "Não informado"}</td>
                </tr>
                <tr>
                  <td class="label">Espécie:</td>
                  <td class="value">${petTypeLabel}</td>
                </tr>
                <tr>
                  <td class="label">Raça / Porte:</td>
                  <td class="value">${breed || "Não informado"}</td>
                </tr>
                <tr>
                  <td class="label">Foco / Objetivo:</td>
                  <td class="value" style="font-weight: 550;">${reasonLabels[reason] || reason || "Não informado"}</td>
                </tr>
              </table>
            </div>
            <div class="footer">
              <p>Este e-mail foi enviado automaticamente pelo formulário de agendamento de consulta do site "Meu Primeiro Pet" da Dra. Thais Vieira.</p>
              <p>&copy; ${new Date().getFullYear()} Dra. Thais Vieira - Nutrição de Cães e Felinos</p>
            </div>
          </div>
        </body>
        </html>
      `;

      // Check if Resend or SMTP is configured
      const resendApiKey = process.env.RESEND_API_KEY || "re_ZDWMvde3_Hp8gVTE4wphrVu4XMj8kdJic";
      const smtpHost = process.env.SMTP_HOST;
      const smtpPort = process.env.SMTP_PORT;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const smtpFrom = process.env.SMTP_FROM_EMAIL || "onboarding@resend.dev";
      const receiverEmail = process.env.RECEIVER_EMAIL || "thaissilveiravieira7@hotmail.com";

      let emailSent = false;

      // 1. Try sending via Resend API if API Key is available
      if (resendApiKey) {
        console.log("Tentando enviar e-mail de agendamento via Resend API...");
        try {
          const fromAddress = smtpFrom.includes("@") && !smtpFrom.includes("meuprimeiropet.com.br") ? smtpFrom : "onboarding@resend.dev";
          
          const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${resendApiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: `Meu Primeiro Pet <${fromAddress}>`,
              to: receiverEmail,
              subject: `📅 Solicitação de Consulta: ${petName || 'Pet'} (${tutorName || 'Tutor'})`,
              html: emailHtml,
            }),
          });

          const responseData = await response.json() as any;
          if (response.ok) {
            console.log(`Appointment email successfully sent via Resend API to ${receiverEmail}`);
            emailSent = true;
            return res.json({ success: true, simulated: false, provider: "resend" });
          } else {
            console.error("Erro retornado pela API do Resend no agendamento:", responseData);
          }
        } catch (resendError) {
          console.error("Falha ao se comunicar com a API do Resend no agendamento:", resendError);
        }
      }

      // 2. Fallback to SMTP if Resend didn't send and SMTP is configured
      if (!emailSent && smtpHost && smtpUser && smtpPass) {
        const transport = nodemailer.createTransport({
          host: smtpHost,
          port: parseInt(smtpPort || "587"),
          secure: smtpPort === "465",
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transport.sendMail({
          from: `"Meu Primeiro Pet" <${smtpFrom}>`,
          to: receiverEmail,
          subject: `📅 Solicitação de Consulta: ${petName || 'Pet'} (${tutorName || 'Tutor'})`,
          html: emailHtml,
        });

        console.log(`Appointment email successfully sent via SMTP to ${receiverEmail}`);
        emailSent = true;
        return res.json({ success: true, simulated: false, provider: "smtp" });
      }

      if (!emailSent) {
        console.warn("Nenhuma configuração válida de e-mail encontrada para o agendamento.");
        return res.json({ 
          success: true, 
          simulated: true, 
          message: "Agendamento recebido em modo de simulação!" 
        });
      }
    } catch (error: any) {
      console.error("Appointment Submission Error:", error);
      res.status(500).json({ 
        error: error.message || "Erro interno ao processar agendamento",
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
