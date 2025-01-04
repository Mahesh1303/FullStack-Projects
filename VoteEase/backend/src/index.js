import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./db/db.js";

// Load environment variables
dotenv.config();

const port = process.env.PORT ?? 3000;

// Connect to the database, then start the server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Database connected successfully`);
      console.log(`Server is listening on: http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1); // Exit the process on failure
  });
