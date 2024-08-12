"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const shortUrl_1 = __importDefault(require("./routes/shortUrl"));
const express_rate_limit_1 = require("express-rate-limit");
dotenv_1.default.config();
(0, db_1.default)();
const port = process.env.PORT || 5001;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
//configure rate limiter
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: "Too many request from this IP. Please try again after 15 minutes.",
});
// Apply the rate limiting middleware to all requests.
app.use(limiter);
//validate urls
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use("/api/", shortUrl_1.default);
// APP listening
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
