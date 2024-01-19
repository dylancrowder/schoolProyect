import mongoose, { Schema } from "mongoose";
import calificationsSchema from "./califications.schema.js";
const StudentSchema = new Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    dni: { type: Number, required: true, unique: true, index: true },
    age: { type: Number, required: false },
    year: { type: Number, required: true },
    calification: { type: mongoose.Schema.Types.ObjectId, ref: "Calification" }
  },
  { timestamps: true }
);

StudentSchema.pre("save", async function (next) {
  try {
    const calification = await calificationsSchema.create({
      matematicas: 0,
      ciencias: 0,
      historia: 0,
      literatura: 0,
      arte: 0
    });

    this.calification = calification._id;
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model("Student", StudentSchema);
