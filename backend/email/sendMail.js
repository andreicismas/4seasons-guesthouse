import nodemailer from "nodemailer";

export default async function sendMail({ to, nome, camera, checkin, checkout, notti, totale, telefono }) {

    // CONFIGURAZIONE TRASPORTO GMAIL
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // <– IMPORTANTE
      auth: {
          user: "4seasons.roma@gmail.com",
          pass: "gpry rhgv ylxv bidi"
      },
      tls: {
          rejectUnauthorized: false
      }
  });
  

    // TEMPLATE HTML CON STILE
    const html = `
    <html>
    <body style="font-family: Arial; background:#f4f4f4; padding:20px;">

      <table width="600" align="center" style="background:white; padding:25px; border-radius:10px;">
        <tr>
          <td align="center">
            <h1 style="color:#2c3e50; margin:0;">4 Seasons Guest House</h1>
            <p style="color:#7f8c8d; margin:0;">Via Benedetto Musolino 41 – Roma Trastevere</p>
            <hr style="margin:20px 0;">
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
              <tr><td><strong>Telefono inserito:</strong> ${telefono}</td></tr>
            </table>

            <br>

            <h3 style="color:#34495e;">🪪 Documenti Richiesti</h3>

            <p>Per agevolare il check-in, inviaci gentilmente le foto dei documenti via WhatsApp:</p>

            <p style="font-size:18px; font-weight:bold; color:#2c3e50;">
              📱 +39 346 324 4526
            </p>

            <a href="https://wa.me/393463244526"
               style="background:#25D366; color:white; padding:12px 20px; border-radius:6px;
                      text-decoration:none; font-size:16px; display:inline-block;">
               💬 Invia Documenti su WhatsApp
            </a>

            <br><br>

            <h3 style="color:#34495e;">📞 Contatti utili</h3>

            <p>
              🔹 <strong>Andrei Cismas</strong><br>
              📱 +39 346 324 4526<br><br>

              🔹 <strong>Irina Clara Solomon</strong><br>
              📱 +39 328 661 2388
            </p>

            <hr style="margin:30px 0;">

            <p style="color:#7f8c8d; font-size:13px;">
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

    // INVIA EMAIL
    await transporter.sendMail({
        from: "4 Seasons Guest House <4seasons.roma@gmail.com>",
        to,
        subject: "Conferma Prenotazione - 4 Seasons Guest House",
        html
    });

    console.log("📧 Email inviata con stile a:", to);
}
