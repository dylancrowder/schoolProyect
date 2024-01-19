import { Router } from "express";
import CalificationService from "../services/calification.service.js";

const router = Router();
router.post("/addCalification", async (req, res) => {
  try {
    const { body } = req;
    const calification = await CalificationService.create(body);

    res.status(200).json(calification);
  } catch (error) {
    console.error(error.menssage);
  }
});

export default router;
