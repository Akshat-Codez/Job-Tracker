const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("./config/passport");
const applicationRoutes = require("./routes/applicationRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || "job_tracker_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.send("API is running");
});

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
