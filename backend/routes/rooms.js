import { pool } from "../db.js";
import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM rooms");
        res.json(rows);
    } catch (err) {
        console.error("ERRORE rooms:", err);
        res.status(500).json({ error: err.message });
    }
});

export default router;
