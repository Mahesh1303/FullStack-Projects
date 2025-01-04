import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();
const reactURL = process.env.REACT_URL ??  "http://localhost:5173/";

// Middlewarres
app.use(cors({
    origin: reactURL,
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
import userRoutes from "./routes/user.routes.js"
import secureRoute from "./routes/secure.routes.js";
import userDataRoutes from "./routes/userdata.routes.js";

app.use("/api/auth", userRoutes);
app.use("/api/secure", secureRoute)
app.use("/api/userData", userDataRoutes)

export default app