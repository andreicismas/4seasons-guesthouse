import { pool } from "../db.js";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
    const { check_in, check_out } = req.query;

    if (!check_in || !check_out) {
        return res.status(400).json({ error: "check_in e check_out richiesti" });
    }

    try {
        const [rows] = await pool.query(
            `SELECT * FROM rooms r
             WHERE r.id NOT IN (
                SELECT room_id FROM bookings
                WHERE NOT (DATE(check_out) <= DATE(?) OR DATE(check_in) >= DATE(?))
             )`,
            [check_in, check_out]
        );

        res.json(rows);

    } catch (err) {
        console.error("ERRORE availability:", err);
        res.status(500).json({ error: err.message });
    }
});

export default router;
