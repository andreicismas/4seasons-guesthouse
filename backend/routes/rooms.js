import express from 'express';
const router = express.Router();

// Ottieni tutte le camere
router.get('/', (req, res) => {
    const db = req.db;
    db.all('SELECT * FROM rooms', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Aggiungi una camera
router.post('/', (req, res) => {
    const db = req.db;
    const { name, max_guests } = req.body;
    db.run(`INSERT INTO rooms (name, max_guests) VALUES (?, ?)`, [name, max_guests], function(err){
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, id: this.lastID });
    });
});

export default router;
