import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

import roomsRouter from "./routes/rooms.js";
import availabilityRouter from "./routes/availability.js";
import bookingsRouter from "./routes/bookings.js";
import { pool } from "./db.js";


const app = express();
app.use(cors());
app.use(express.json());

// CONNESSIONE MYSQL
const db = await mysql.createPool({
    host: "localhost",
    user: "root",
    password: "4seasonsMYSQL2025",   // ← se hai una password mettila qui
    database: "4seasons"
});

// aggiunge DB a tutte le richieste
app.use((req, res, next) => {
    req.db = db;
    next();
});

// ROUTES API
app.use("/api/rooms", roomsRouter);
app.use("/api/availability", availabilityRouter);
app.use("/api/bookings", bookingsRouter);

app.get("/api/ping", (req, res) => {
    res.json({ status: "OK", message: "Backend MySQL operativo!" });
});

app.listen(3000, () => {
    console.log("Backend avviato su http://localhost:3000");
});
