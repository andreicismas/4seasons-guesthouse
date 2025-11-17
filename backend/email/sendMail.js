import nodemailer from "nodemailer";

// --------------------------------------------
// FUNZIONE PER INVIARE EMAIL
// --------------------------------------------
export default async function sendMail({ to, nome, camera, checkin, checkout, notti, totale }) {

    // CONFIGURAZIONE GMAIL
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "4seasons.roma@gmail.com",
            pass: "gpry rhgv ylxv bidi"   // password app Gmail
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // --------------------------------------------
    // *** TEMPLATE EMAIL HTML ***
    // --------------------------------------------
    const emailHtml = `
    <!DOCTYPE html>
    <html lang="it">
      <body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">

        <table align="center" width="600" style="background:white; padding:25px; border-radius:10px;">
          <tr>
            <td align="center">
              <h1 style="color:#2c3e50;">4 Seasons Guest House</h1>
              <p style="color:#7f8c8d; font-size:14px;">Via Benedetto Musolino 41 – Roma Trastevere</p>
            </td>
          </tr>

          <tr>
            <td>
              <h2 style="color:#27ae60;">🎉 Prenotazione Confermata!</h2>

              <p style="font-size:16px;">
                Ciao <strong>${nome}</strong>,<br>
                la tua prenotazione presso <strong>4 Seasons Guest House</strong> è stata confermata con successo.
              </p>

              <h3 style="color:#34495e;">📅 Dettagli prenotazione</h3>

              <table width="100%" style="background:#f9f9f9; padding:15px; border-radius:8px;">
                <tr><td><strong>Camera:</strong> ${camera}</td></tr>
                <tr><td><strong>Check-in:</strong> ${checkin}</td></tr>
                <tr><td><strong>Check-out:</strong> ${checkout}</td></tr>
                <tr><td><strong>Notti:</strong> ${notti}</td></tr>
                <tr><td><strong>Totale:</strong> € ${totale}</td></tr>
              </table>

              <br>

              <h3 style="color:#34495e;">🪪 Documenti Richiesti</h3>

              <p style="font-size:15px;">
                Per agevolare il check-in, vi preghiamo gentilmente di inviare le foto dei vostri documenti
                <strong>preferibilmente via WhatsApp</strong> al numero:
              </p>

              <p style="font-size:18px; font-weight:bold; color:#2c3e50;">
                📱 +39 346 324 4526
              </p>

              <p style="font-size:15px;">Potete anche usare il bottone:</p>

              <p>
                <a href="https://wa.me/393463244526?text=Ciao%20Andrei%2C%20ti%20invio%20i%20documenti%20per%20il%20check-in."
                   style="background:#25D366; color:white; padding:12px 20px; border-radius:6px;
                          text-decoration:none; font-size:16px;">
                   💬 Invia Documenti su WhatsApp
                </a>
              </p>

              <br>

              <h3 style="color:#34495e;">📞 Contatti utili</h3>

              <p style="font-size:15px; line-height:1.6;">
                🔹 <strong>Andrei Cismas</strong> (urgenze):  
                <br><span style="font-size:17px;">📱 +39 346 324 4526</span>
                <br><br>
                🔹 <strong>Irina Clara Solomon</strong>  
                <br><span style="font-size:17px;">📱 +39 328 661 2388</span>
              </p>

              <br>

              <p style="font-size:15px;">
                Grazie per aver scelto di soggiornare da noi!  
                Saremo felici di accogliervi nel cuore di Trastevere 🌿
              </p>

              <hr style="margin:30px 0;">

              <p style="font-size:13px; color:#7f8c8d;">
                4 Seasons Guest House – Via Benedetto Musolino 41, Roma Trastevere<br>
                Email: 4seasons.roma@gmail.com<br>
                Telefono: +39 346 324 4526
              </p>

            </td>
          </tr>
        </table>

      </body>
    </html>
    `;

    // --------------------------------------------
    // INVIO EMAIL
    // --------------------------------------------
    await transporter.sendMail({
        from: "4Seasons Guest House <4seasons.roma@gmail.com>",
        to,
        subject: "Conferma Prenotazione - 4 Seasons Guest House",
        html: emailHtml
    });

    console.log("📧 Email inviata con successo a:", to);
}
