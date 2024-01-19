import mongoose, { Schema } from "mongoose";

const calificationSchema = new Schema(
  {
    matematicas: { type: Number, required: true },
    ciencias: { type: Number, required: true },
    historia: { type: Number, required: true },
    literatura: { type: Number, required: true },
    arte: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Calification", calificationSchema);
