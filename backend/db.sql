CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    max_guests INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room_id INTEGER NOT NULL,
    check_in TEXT NOT NULL,
    check_out TEXT NOT NULL,
    guest_name TEXT NOT NULL,
    guest_email TEXT NOT NULL,
    total_price REAL,
    FOREIGN KEY (room_id) REFERENCES rooms (id)
);

INSERT INTO rooms (name, max_guests) VALUES 
("Camera Verde", 2),
("Camera Blu", 2),
("Camera Rossa", 2);
