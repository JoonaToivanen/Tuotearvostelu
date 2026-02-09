import mongoose from "mongoose";

const tuoteArvosteluSchema = new mongoose.Schema({
  tuote: { type: String, required: true },
  arvostelu: { type: String, required: true },
  kirjoittaja: { type: String, required: true },
});

export default mongoose.model("TuoteArvostelu", tuoteArvosteluSchema);
