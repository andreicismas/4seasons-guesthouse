import express from 'express';
const bookingsRouter = express.Router();

// Ottieni tutte le prenotazioni
bookingsRouter.get('/', (req, res) => {
    const db = req.db;
    db.all('SELECT * FROM bookings', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Crea una prenotazione
bookingsRouter.post('/', (req, res) => {
    const db = req.db;
    const { room_id, check_in, check_out, guest_name, guest_email, total_price } = req.body;

    const sql = `INSERT INTO bookings (room_id, check_in, check_out, guest_name, guest_email, total_price)
                 VALUES (?, ?, ?, ?, ?, ?)`;

    db.run(sql, [room_id, check_in, check_out, guest_name, guest_email, total_price], function(err){
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, booking_id: this.lastID });
    });
});

export default bookingsRouter;
