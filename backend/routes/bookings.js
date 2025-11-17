
import express from "express";

import { pool } from "../db.js";
import sendMail from "../email/sendMail.js";

const router = express.Router();


// LISTA TUTTE LE PRENOTAZIONI
router.get("/", async (req, res) => {
    try {
        const [rows] = await pool.execute(
            `SELECT 
                b.id,
                r.name AS room_name,
                b.check_in,
                b.check_out,
                b.guest_name,
                b.guest_email,
                b.telefono,
                b.total_price,
                b.created_at
             FROM bookings b
             LEFT JOIN rooms r ON b.room_id = r.id
             ORDER BY b.check_in DESC`
        );

        res.json({ success: true, bookings: rows });
    } catch (err) {
        console.error("❌ ERRORE LETTURA PRENOTAZIONI:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});


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


  
 // LISTA TUTTE LE PRENOTAZIONI (per admin)
router.get("/", async (req, res) => {
    try {
      const [rows] = await pool.execute(
        `SELECT 
           b.id,
           b.room_id,
           r.name AS room_name,
           b.check_in,
           b.check_out,
           b.guest_name,
           b.guest_email,
           b.telefono,
           b.total_price
         FROM bookings b
         LEFT JOIN rooms r ON b.room_id = r.id
         ORDER BY b.check_in DESC`
      );
  
      res.json(rows);
    } catch (err) {
      console.error("❌ ERRORE GET /api/bookings:", err);
      res.status(500).json({ error: "Errore nel caricare le prenotazioni" });
    }
  });
  
  

router.get("/all", async (req, res) => {
    try {
        const [rows] = await req.db.execute("SELECT * FROM bookings ORDER BY id DESC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


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
