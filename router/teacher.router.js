import { Router } from "express";
import Student from "../controller/Students.manager.js";
const router = Router();

router.get("/teacher/:year", async (req, res) => {
  try {
    const { year } = req.params;
    const student = await Student.getByYear(year);
    res.status(200).json(student);
  } catch (error) {
    res.status(404).json("no se encontro el año", error);
  }
});
