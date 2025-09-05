import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import shopRouter from "./routes/shop.routes.js";
import itemRouter from "./routes/item.routes.js";
import orderRouter from "./routes/order.routes.js";
import http from "http";
import { Server } from "socket.io";
import socketHandler from "./socket.js";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);

// ✅ Allow both localhost (dev) and Vercel (prod)
const allowedOrigins = [
  "http://localhost:5173",
  "https://caviar-food-delivery-app.vercel.app",
  "https://caviar-food-delivery-mupqf946k-danish-javeds-projects.vercel.app",
  "https://caviar-food-delivery-app-git-main-danish-javeds-projects.vercel.app"
];

// ✅ CORS setup for Socket.io
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  },
});
app.set("io", io);

// ✅ CORS setup for Express
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// ✅ Handle preflight requests explicitly
app.options("*", cors());

// ✅ Body + cookies parser
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/shop", shopRouter);
app.use("/api/item", itemRouter);
app.use("/api/order", orderRouter);

// ✅ Socket handler
socketHandler(io);

// ✅ Server listen
server.listen(port, () => {
  console.log(`🚀 Server started at ${port}`);
  connectDb();
});
