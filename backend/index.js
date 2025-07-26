import { configDotenv } from "dotenv";
configDotenv();
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/connection_1.db.js";
import express from "express";

connectDB();
const app = express();

const PORT = process.env.PORT;

//cors
app.use(
  cors({
    origin: ["http://localhost:5173", process.env.CLIENT_DOMAIN],
    credentials: true,
  })
);

//middlewares---------------------------
app.use(express.json());
app.use(cookieParser());
//-------------------------
import userRouter from "./routes/user.route.js";
import adminRouter from "./routes/admin.route.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import contetstentRouter from "./routes/contestent.route.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/contestent", contetstentRouter);
app.use(errorMiddleware);

//-------------------------------

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to home </h1>`);
});

//listen
app.listen(PORT, () =>
  console.log(`server running at http://localhost:${PORT}`)
);
