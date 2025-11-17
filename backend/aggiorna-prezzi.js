import sqlite3 from "sqlite3";

const db = new sqlite3.Database("db.sqlite");

db.serialize(() => {
    console.log("Aggiungo colonna price_per_night...");

    db.run(`
        ALTER TABLE rooms
        ADD COLUMN price_per_night REAL;
    `, (err) => {
        if (err) console.log("La colonna esiste già, ok!");
    });

    console.log("Aggiorno i prezzi...");

    db.run(`UPDATE rooms SET price_per_night = 110 WHERE name = 'Spring'`);
    db.run(`UPDATE rooms SET price_per_night = 110 WHERE name = 'Summer'`);
    db.run(`UPDATE rooms SET price_per_night = 130 WHERE name = 'Autumn'`);

    console.log("Prezzi aggiornati!");
});

db.close();
