// Struttura backend professionale
// Questo file mostra come organizzare il progetto e include il server aggiornato
// con supporto per routes modulari.


import express from 'express';
import sqlite3 from 'sqlite3';
import path from 'path';
import {
    fileURLToPath
} from 'url';

// ROUTES
import roomsRouter from './routes/rooms.js';
import availabilityRouter from './routes/availability.js';
import bookingsRouter from './routes/bookings.js';

// Setup path fix
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

// Express app
const app = express();
app.use(express.json());

// CORS FIX
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});


// SQLite DB connection
const dbPath = path.join(__dirname, 'db.sqlite');
const db = new sqlite3.Database(dbPath);

// Attach DB to request
app.use((req, res, next) => {
    req.db = db;
    next();
});

// ROUTES
app.use('/api/rooms', roomsRouter);
app.use('/api/availability', availabilityRouter);
app.use('/api/bookings', bookingsRouter);

// Health check
app.get('/api/ping', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Backend pronto!'
    });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Backend avviato su http://localhost:${PORT}`);
});
