import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import TuoteArvostelu from "./models/TuoteArvostelu.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

app.get("/api/tuotearvostelut", async (req, res) => {
  try {
    const tuoteArvostelut = await TuoteArvostelu.find({});
    res.json(tuoteArvostelut);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/tuotearvostelut", async (req, res) => {
  try {
    const tuoteArvostelu = new TuoteArvostelu(req.body);
    await tuoteArvostelu.save();
    res.status(201).json(tuoteArvostelu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/tuotearvostelut/:id", async (req, res) => {
  try {
    await TuoteArvostelu.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/tuotearvostelut/:id", async (req, res) => {
  try {
    const tuoteArvostelu = await TuoteArvostelu.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json(tuoteArvostelu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
