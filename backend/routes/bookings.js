
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

       // INSERT PRENOTAZIONE
const [result] = await pool.execute(
    `INSERT INTO bookings 
    (room_id, check_in, check_out, guest_name, guest_email, telefono, total_price) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [room_id, check_in, check_out, nome, email, telefono, total_price]
);

// 📧 INVIA EMAIL
// 📧 INVIA EMAIL
const date1 = new Date(check_in);
const date2 = new Date(check_out);
const notti = Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24));

await sendMail({
    to: email,
    nome,
    camera: room_id,
    checkin: check_in,
    checkout: check_out,
    notti,
    totale: total_price,
    telefono 
});




// RISPOSTA AL FRONTEND
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
