import mongoose from "mongoose";

const tuoteSchema = new mongoose.Schema({
  tuoteNimi: { type: String, required: true },
  tuoteKuvaus: { type: String, required: true },
});

export default mongoose.model("Tuote", tuoteSchema);
