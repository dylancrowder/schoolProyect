import mongoose, { Schema } from "mongoose";

const StudentSchema = new Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    dni: { type: Number, required: true, unique: true, index: true },
    age: { type: Number, required: false }
  },
  { timestamps: true }
);

export default mongoose.model("Student", StudentSchema);
