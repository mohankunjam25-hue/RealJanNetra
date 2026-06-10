const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middlewares/error.middleware');

const app = express();

// Global Middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// Routes Import
// const userRouter = require('./routes/user.routes');

// Routes Declaration
// app.use("/api/v1/users", userRouter);

// Default Route
app.get('/', (req, res) => {
    res.json({ message: "RealJanNetra API is running..." });
});

// Error Handling Middleware (must be last)
app.use(errorHandler);

module.exports = { app };
