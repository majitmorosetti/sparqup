import { Resend } from "resend";
import { NextResponse } from "next/server";
import type { QuestionnaireData, Recommendation } from "@/lib/questionnaire-types";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data, recommendation } = body as {
      data: QuestionnaireData;
      recommendation: Recommendation;
    };

    console.log("📧 Envoi email client vers:", data.email);

    // Email au client
    const clientEmail = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: data.email,
      subject: "Votre estimation de projet SparqUp",
      html: generateClientEmailHTML(data, recommendation),
    });

    console.log("✅ Email client envoyé:", clientEmail);

    // Email à toi (notification)
    const adminEmail = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.RESEND_TO_EMAIL!,
      subject: `Nouveau lead : ${data.email}`,
      html: generateAdminEmailHTML(data, recommendation),
    });

    console.log("✅ Email admin envoyé:", adminEmail);

    return NextResponse.json({ 
      success: true,
      clientEmailId: clientEmail.data?.id,
      adminEmailId: adminEmail.data?.id
    });
  } catch (error) {
    console.error("❌ Email error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}


function generateClientEmailHTML(data: QuestionnaireData, rec: Recommendation): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #000; }
          .section { margin: 30px 0; }
          .highlight { background: #f4f4f4; padding: 15px; border-radius: 8px; }
          .stack { font-size: 24px; font-weight: bold; color: #000; }
          .price { font-size: 20px; font-weight: bold; }
          ul { padding-left: 20px; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Votre estimation personnalisée</h1>
          </div>

          <div class="section">
            <p>Bonjour,</p>
            <p>Merci d'avoir utilisé notre simulateur de projet. Voici notre recommandation basée sur vos besoins :</p>
          </div>

          <div class="section highlight">
            <p><strong>Stack technique recommandée</strong></p>
            <p class="stack">${rec.stack}</p>
          </div>

          <div class="section">
            <p><strong>Tarif estimé :</strong> <span class="price">${rec.price}</span></p>
            <p><strong>Délai de réalisation :</strong> ${rec.timeline}</p>
          </div>

          <div class="section">
            <h3>Pourquoi cette solution ?</h3>
            <p>${rec.justification}</p>
          </div>

          <div class="section">
            <h3>Ce qui est inclus</h3>
            <ul>
              ${rec.included.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </div>

          ${
            rec.alternative
              ? `
          <div class="section highlight">
            <h3>💡 Alternative</h3>
            <p><strong>${rec.alternative.stack}</strong></p>
            <p>${rec.alternative.price}</p>
            <p>${rec.alternative.reason}</p>
          </div>
          `
              : ""
          }

          <div class="section">
            <p>Envie d'en discuter ? Répondez simplement à cet email ou prenez rendez-vous directement sur notre site.</p>
          </div>

          <div class="footer">
            <p><strong>SparqUp</strong> - Digitalisation pour TPE/PME</p>
            <p>www.sparqup.fr</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

function generateAdminEmailHTML(data: QuestionnaireData, rec: Recommendation): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: monospace; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .data { background: #f4f4f4; padding: 15px; border-radius: 8px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>🔔 Nouveau lead qualifié</h2>
          
          <div class="data">
            <p><strong>Email :</strong> ${data.email}</p>
            <p><strong>Budget :</strong> ${data.budget}</p>
            <p><strong>Timeline :</strong> ${data.timeline}</p>
          </div>

          <div class="data">
            <p><strong>Type d'activité :</strong> ${data.activityType}</p>
            <p><strong>Fonctionnalités :</strong> ${data.features.join(", ")}</p>
            <p><strong>Outils :</strong> ${data.tools.join(", ") || "Aucun"}</p>
            <p><strong>Automatisations :</strong> ${data.automations.join(", ") || "Aucune"}</p>
          </div>

          <div class="data">
            <p><strong>Recommandation envoyée :</strong></p>
            <p>Stack : ${rec.stack}</p>
            <p>Prix : ${rec.price}</p>
            <p>Timeline : ${rec.timeline}</p>
          </div>
        </div>
      </body>
    </html>
  `;
}