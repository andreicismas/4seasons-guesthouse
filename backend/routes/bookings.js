
import express from "express";

import { pool } from "../db.js";
import sendMail from "../email/sendMail.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { room_id, check_in, check_out, nome, email, telefono, total_price } = req.body;

        console.log("📩 Dati ricevuti:", room_id, check_in, check_out, nome, email, telefono, total_price);

        // Controllo campi obbligatori
        if (!room_id || !check_in || !check_out || !nome || !email || !telefono) {
            return res.status(400).json({ success: false, error: "Campi mancanti" });
        }

        // ✅ INSERT CORRETTO
        const [result] = await pool.execute(
            `INSERT INTO bookings 
            (room_id, check_in, check_out, guest_name, guest_email, telefono, total_price) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [room_id, check_in, check_out, nome, email, telefono, total_price]
        );

        // 📧 INVIA EMAIL
        await sendMail({
            to: email,
            subject: "Conferma Prenotazione - 4 Seasons Guest House",
            text: `
Ciao ${nome}! La tua prenotazione è confermata. 🌿

📅 Check-in: ${check_in}
📅 Check-out: ${check_out}
💶 Totale soggiorno: €${total_price}

📱 Telefono inserito: ${telefono}

📎 Ti preghiamo di inviare le foto dei documenti su WhatsApp:

🔵 WhatsApp Diretto: https://wa.me/393463244526  
📱 Andrei Cismas: +39 346 324 4526  
📱 Irina Clara Solomon: +39 328 661 2388

Grazie per aver scelto 4 Seasons Guest House!
`
        });

        res.json({
            success: true,
            booking_id: result.insertId
        });

    } catch (err) {
        console.error("❌ ERRORE PRENOTAZIONE:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

export default router;
