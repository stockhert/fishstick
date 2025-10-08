// server.js
import express from "express";
import cors from "cors";
import mysql from "mysql2";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost", // remove '@'
    user: "fishAdmin",
    password: "admin123",
    database: "usersDB",
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL database");
});

// create users table if not exists
db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255)
  );
`);

// signup route
app.post("/signup", (req, res) => {
    const { username, password } = req.body;

    db.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, password],
        (err) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.json({ message: "Username already exists" });
                }
                return res.status(500).json({ message: "Database error", error: err });
            }
            res.json({ message: "Signup successful!" });
        }
    );
});

// login route
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password],
        (err, result) => {
            if (err) return res.status(500).json({ message: "Database error" });

            if (result.length > 0) {
                res.json({ message: "Login successful!" });
            } else {
                res.json({ message: "Invalid username or password" });
            }
        }
    );
});

// ✅ start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
