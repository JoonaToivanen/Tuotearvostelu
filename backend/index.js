import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import TuoteArvostelu from "./models/TuoteArvostelu.js";
import Tuote from "./models/Tuote.js";

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

app.get("/api/tuotearvostelut/:id", async (req, res) => {
  try {
    const tuoteArvostelu = await TuoteArvostelu.findById(req.params.id);
    res.json(tuoteArvostelu);
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

app.get("/api/tuotteet", async (req, res) => {
  try {
    const tuotteet = await Tuote.find({});
    res.json(tuotteet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/tuotteet/:id", async (req, res) => {
  try {
    const tuote = await Tuote.findById(req.params.id);
    res.json(tuote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/tuotteet", async (req, res) => {
  try {
    const tuote = new Tuote(req.body);
    await tuote.save();
    res.status(201).json(tuote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/tuotteet/:id", async (req, res) => {
  try {
    await Tuote.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/tuotteet/:id", async (req, res) => {
  try {
    const tuote = await Tuote.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(tuote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
