import express from 'express';
const availabilityRouter = express.Router();

// Controlla disponibilità camere
availabilityRouter.get('/', (req, res) => {
    const db = req.db;
    const { check_in, check_out } = req.query;

    if (!check_in || !check_out) {
        return res.status(400).json({ error: 'check_in e check_out richiesti' });
    }

    const query = `
        SELECT 
            r.id, 
            r.name, 
            r.max_guests,
            r.price_per_night
        FROM rooms r
        WHERE r.id NOT IN (
            SELECT room_id FROM bookings
            WHERE NOT (date(check_out) <= date(?) OR date(check_in) >= date(?))
        )
    `;

    db.all(query, [check_in, check_out], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json(rows);
    });
});

export default availabilityRouter;
