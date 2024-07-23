import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import eventRoutes from "./app/routes/eventRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || "";

app.use(express.json());

mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api", eventRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
