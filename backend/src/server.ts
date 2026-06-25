import dotenv from "dotenv"; // or 'dotenv/config'
import express from "express";
import cors from 'cors';
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import authRouter from "./routes/auth.routes.js";
import albumRouter from "./routes/albums.routes.js";
import songRouter from "./routes/songs.routes.js";
import statsRouter from "./routes/stats.routes.js";
import { connectDB } from "./config/db.config.js";
import { AppError } from "./utils/GlobalErrorHandler.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5006;

app.use(express.json()); // for parsing json

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);
app.use("/api/album", albumRouter);
app.use("/api/song", songRouter);
app.use("/api/stats", statsRouter);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}
// fallback route, 404 handler
app.use((req, res, next) => {
  next(new AppError("Route not found", 404));
});

app.use(errorMiddleware);

startServer();

