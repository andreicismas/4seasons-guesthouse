import mysql from "mysql2/promise";

export const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "4seasonsMYSQL2025",
    database: "4seasons",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

