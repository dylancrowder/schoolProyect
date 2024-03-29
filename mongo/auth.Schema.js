import mongoose, { Schema } from "mongoose";

const user = new Schema(
  {
    email: { type: String },
    password: { type: String },
    first_name: { type: String },
    last_name: { type: String },
    dni: { type: Number, required: true, unique: true, index: true },
    age: { type: Number, required: false },
    role: { type: String, require: true, default: "student" }
  },
  { timestamps: true }
);

export default mongoose.model("User", user);
