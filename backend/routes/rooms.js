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
// UPDATE PREZZO CAMERA
router.put("/:id/price", async (req, res) => {
    try {
      const { id } = req.params;
      const { price_per_night } = req.body;
  
      if (price_per_night == null) {
        return res.status(400).json({ success: false, error: "price_per_night mancante" });
      }
  
      await pool.execute(
        "UPDATE rooms SET price_per_night = ? WHERE id = ?",
        [price_per_night, id]
      );
  
      res.json({ success: true });
    } catch (err) {
      console.error("❌ ERRORE UPDATE PREZZO CAMERA:", err);
      res.status(500).json({ success: false, error: "Errore aggiornando il prezzo" });
    }
  });
  

export default router;
