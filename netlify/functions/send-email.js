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
    
    // Obter o e-mail de recebimento (da variável de ambiente, ou o seu padrão seguro)
    const rawReceiverEmail = process.env.RECEIVER_EMAIL || "thaissilveiravieira7@hotmail.com";
    const receiverEmail = rawReceiverEmail.replace(/^["']|["']$/g, "").trim();

    let formSubmitData = {};
    let subject = "";

    // 1. Determinar o tipo de formulário e traduzir/estruturar os campos
    if (data.petName || data.format || data.whatsapp) {
      // Agendamento de Consulta
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

      subject = `📅 Solicitação de Consulta: ${petName || 'Pet'} (${tutorName || 'Tutor'})`;

      formSubmitData = {
        _subject: subject,
        "Tipo de Envio": "📅 Agendamento de Consulta",
        "Nome do Tutor": tutorName || "Não informado",
        "WhatsApp": whatsapp || "Não informado",
        "Formato de Atendimento": formatLabels[format] || format || "Não informado",
        "Nome do Pet": petName || "Não informado",
        "Espécie": petType === "cat" ? "Gato 🐱" : "Cão 🐶",
        "Raça / Porte": breed || "Não informado",
        "Foco / Objetivo Nutricional": reasonLabels[reason] || reason || "Não informado"
      };
    } else {
      // Formulário Estratégico Nutricional
      const { tutorName, tutorEmail, tutorPhone, name, type, age, weight, idealWeight, activity, eatsWell, currentFood, health } = data;

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

      subject = `🐾 Formulário Estratégico: ${name || 'Pet'} (${tutorName || 'Tutor'})`;

      formSubmitData = {
        _subject: subject,
        _replyto: tutorEmail || "", // Permite responder diretamente ao tutor clicando em "Responder" no e-mail
        "Tipo de Envio": "🐾 Formulário Estratégico Nutricional",
        "Nome do Tutor": tutorName || "Não informado",
        "E-mail do Tutor": tutorEmail || "Não informado",
        "WhatsApp / Telefone": tutorPhone || "Não informado",
        "Nome do Pet": name || "Não informado",
        "Espécie": type === "cat" ? "Gato 🐱" : "Cão 🐶",
        "Idade do Pet": age || "Não informado",
        "Peso Atual": weight ? `${weight} kg` : "Não informado",
        "Peso Ideal": idealWeight ? `${idealWeight} kg` : "Não informado",
        "Nível de Atividade": activityLabels[activity] || activity || "Não informado",
        "Apetite por Ração": eatsWellLabels[eatsWell] || eatsWell || "Não informado",
        "Ração Atual": currentFood || "Não informado",
        "Histórico Clínico / Queixas": health || "Nenhuma relatada"
      };
    }

    // Enviar via FormSubmit API (100% Gratuito, sem necessidade de chaves de API complicadas ou SMTP pago)
    console.log(`Enviando formulário via FormSubmit para: ${receiverEmail}`);
    const response = await fetch(`https://formsubmit.co/ajax/${receiverEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formSubmitData)
    });

    const result = await response.json();
    
    if (response.ok && result.success === "true") {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true, 
          message: "Mensagem enviada com sucesso! Verifique sua caixa de entrada." 
        }),
      };
    } else {
      console.error("Erro ao enviar pelo FormSubmit:", result);
      return {
        statusCode: response.status || 500,
        headers,
        body: JSON.stringify({ 
          error: "Erro do serviço de e-mail gratuito.", 
          details: result 
        }),
      };
    }

  } catch (error) {
    console.error("Erro interno no Handler da Netlify Function:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message || "Erro interno do servidor" }),
    };
  }
};
