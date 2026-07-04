exports.handler = async function (event, context) {
  // Configurar cabeçalhos CORS para permitir chamadas do frontend
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  // Tratar requisição preflight OPTIONS
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  // Apenas permitir POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const data = JSON.parse(event.body || "{}");
    
    // Obter chave API do Resend das variáveis de ambiente
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error("RESEND_API_KEY não configurada no ambiente.");
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "A chave API do Resend (RESEND_API_KEY) não está configurada na Netlify." }),
      };
    }

    const cleanApiKey = resendApiKey.replace(/^["']|["']$/g, "").trim();

    let subject = "";
    let emailHtml = "";
    let tutorEmail = "";

    // Determinar o tipo de formulário com base nos campos enviados
    // Se tiver petName, format ou whatsapp, trata-se de um agendamento de consulta
    if (data.petName || data.format || data.whatsapp) {
      const { tutorName, petName, petType, breed, whatsapp, reason, format } = data;
      
      const formatLabels = {
        online: "💻 Online (Teleconsulta)",
        presencial: "🏥 Presencial (São Paulo)",
        insurance: "📄 Convênio (Plano de Saúde / Reembolso)"
      };

      const reasonLabels = {
        preventive: "Saúde preventiva / Ração ideal e quantidades",
        natural: "Quero transicionar para Alimentação Natural (AN)",
        mixed: "Quero transicionar para dieta mista (Ração + AN)",
        obesity: "Tratamento de obesidade / Sobrepeso silencioso",
        allergy: "Investigação de alergia alimentar / Coceiras / Pele sensível",
        disease: "Doença crônica (Diabetes, Doença Renal, Hepática, Gastrointestinal)",
        other: "Outra demanda específica"
      };

      const petTypeLabel = petType === "cat" ? "Gato 🐱" : "Cão 🐶";
      subject = `📅 Solicitação de Consulta: ${petName || 'Pet'} (${tutorName || 'Tutor'})`;

      emailHtml = `
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
    } else {
      // Caso contrário, trata-se do Formulário Estratégico Nutricional
      const { tutorName, tutorEmail: email, tutorPhone, name, type, age, weight, idealWeight, activity, eatsWell, currentFood, health } = data;
      tutorEmail = email;

      const activityLabels = {
        low: "Sedentário — fica muito em casa",
        moderate: "Moderado — passeia alguns dias",
        high: "Ativo — corre, brinca bastante todo dia"
      };

      const eatsWellLabels = {
        yes: "Sim, come normalmente",
        picky: "É seletivo — às vezes recusa",
        no: "Não — recusa a ração com frequência"
      };

      const petTypeLabel = type === "cat" ? "Gato 🐱" : "Cão 🐶";
      subject = `🐾 Novo Form: ${name || 'Pet'} (${tutorName || 'Tutor'})`;

      emailHtml = `
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
    }

    // Enviar via API do Resend para Dra. Thais
    console.log("Iniciando envio via API do Resend...");
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${cleanApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Nutrição Veterinária Thais <contato@nutricaoveterinariathais.com.br>",
        to: "thaissilveiravieira7@hotmail.com",
        subject: subject,
        html: emailHtml,
      }),
    });

    const responseData = await response.json();
    if (!response.ok) {
      console.error("Erro da API do Resend:", responseData);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: "Erro ao enviar e-mail via Resend", details: responseData }),
      };
    }

    // Enviar cópia para o Tutor caso o formulário estratégico tenha e-mail
    if (tutorEmail && tutorEmail.trim() !== "") {
      const tutorEmailTrimmed = tutorEmail.trim();
      if (tutorEmailTrimmed.toLowerCase() !== "thaissilveiravieira7@hotmail.com") {
        try {
          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${cleanApiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "Nutrição Veterinária Thais <contato@nutricaoveterinariathais.com.br>",
              to: tutorEmailTrimmed,
              subject: `🐾 Cópia de Respostas: Formulário Nutricional do ${data.name || 'Pet'}`,
              html: emailHtml,
            }),
          });
          console.log(`Cópia enviada para tutor: ${tutorEmailTrimmed}`);
        } catch (err) {
          console.error("Erro ao enviar cópia para tutor:", err);
        }
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: "E-mail enviado com sucesso!" }),
    };

  } catch (error) {
    console.error("Erro interno no Handler da Netlify Function:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message || "Erro interno do servidor" }),
    };
  }
};
