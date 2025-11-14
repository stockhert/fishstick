// server.js
import express from "express";
import cors from "cors";
import mysql from "mysql2";
import cookieParser from "cookie-parser";


const app = express();
app.use(cors({
    origin: "http://localhost:3000", // adjust to your frontend origin if different
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// cookiesession setup
const SESS_COOKIE = "sid";
const SESS_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days (def)
const sessions = new Map(); // sid -> { userId, username, expiresAt }

function createSession(user) {
    const sid = crypto.randomUUID();
    sessions.set(sid, {
        userId: user.id,
        username: user.username,
        expiresAt: Date.now() + SESS_TTL_MS
    });
    return sid;
}
function authMiddleware(req, res, next) {
    const sid = req.cookies?.[SESS_COOKIE];
    if (!sid) return next();
    const sess = sessions.get(sid);
    if (!sess) return next();
    if (sess.expiresAt < Date.now()) {
        sessions.delete(sid);
        return next();
    }
    // refresh rolling expiration
    sess.expiresAt = Date.now() + SESS_TTL_MS;
    req.user = { id: sess.userId, username: sess.username };
    // refresh cookie
    res.cookie(SESS_COOKIE, sid, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: SESS_TTL_MS,
        path: "/"
    });
    next();
}
app.use(authMiddleware);


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
    password VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    points INT NOT NULL DEFAULT 0,
    CHECK (email LIKE '%@%')
  );
`);

// signup route
app.post("/signup", (req, res) => {
    const { username, password, email} = req.body;

    db.query(
        "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
        [username, password, email],
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

import crypto from "node:crypto";
app.post("/login", (req, res) => {
    const { identifier, password, identifierType } = req.body;
    const query = identifierType === "email"
        ? "SELECT * FROM users WHERE email = ? AND password = ?"
        : "SELECT * FROM users WHERE username = ? AND password = ?";

    db.query(query, [identifier, password], (err, result) => {
        if (err) return res.status(500).json({ message: "Database error" });

        if (result.length > 0) {
            const user = result[0];
            const sid = createSession(user);
            res.cookie(SESS_COOKIE, sid, {
                httpOnly: true,
                sameSite: "lax",
                secure: false, // true if HTTPS
                maxAge: SESS_TTL_MS,
                path: "/"
            });
            return res.json({ message: "Login successful!", success: true, user: { id: user.id, username: user.username } });
        } else {
            res.json({ message: "Invalid credentials", success: false });
        }
    });
});

// session check
app.get("/me", (req, res) => {
    if (!req.user) return res.status(401).json({ authenticated: false });
    res.json({ authenticated: true, user: req.user });
});

// logout
app.post("/logout", (req, res) => {
    const sid = req.cookies?.[SESS_COOKIE];
    if (sid) sessions.delete(sid);
    res.clearCookie(SESS_COOKIE, { path: "/" });
    res.json({ message: "Logged out", success: true });
});

// start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});