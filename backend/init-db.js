import sqlite3 from "sqlite3";

// Crea o apre il database
const db = new sqlite3.Database("db.sqlite");

// Crea tabelle e inserisce camere
db.serialize(() => {
    console.log("Creazione tabelle...");

    db.run(`
        CREATE TABLE IF NOT EXISTS rooms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            max_guests INTEGER NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            room_id INTEGER NOT NULL,
            check_in TEXT NOT NULL,
            check_out TEXT NOT NULL,
            guest_name TEXT NOT NULL,
            guest_email TEXT NOT NULL,
            total_price REAL,
            FOREIGN KEY (room_id) REFERENCES rooms(id)
        )
    `);

    console.log("Inserimento camere...");

    db.run(`INSERT INTO rooms (name, max_guests) VALUES ("Camera Verde", 2)`);
    db.run(`INSERT INTO rooms (name, max_guests) VALUES ("Camera Blu", 2)`);
    db.run(`INSERT INTO rooms (name, max_guests) VALUES ("Camera Rossa", 2)`);

    console.log("Database creato con successo!");
});

db.close();
