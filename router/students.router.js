import { Router } from "express";
import Student from "../controller/Students.manager.js";
const router = Router();

router.get("/student/:sid", async (req, res) => {
  const { sid } = req.params;
  const student = await Student.getById(sid);
  res.status(200).json(student);
});

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error("Session destroy error:", error);
      res.status(500).json({ message: "ocurrió un error" });
    } else {
      res.status(400).json({ desconectado: "susses" });
    }
  });
});

router.get("/perfil", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const student = await Student.get();
      console.log("Datos del estudiante:", student); // Verifica los datos antes de enviarlos
      res.status(200).json(student);
      console.log("Sí está autorizado", req.user);
    } catch (error) {
      console.error("Error al obtener datos del estudiante:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    console.log("No está autorizado");
    res.redirect("/");
  }
});

router.get("/studentGet", async (req, res) => {
  const student = await Student.get();
  res.status(200).json(student);
});

router.post("/addStudent", async (req, res) => {
  try {
    const { body } = req;
    let student = await Student.create(body);
    res.status(200).json(student);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

router.put("/editStudent/:sid", async (req, res) => {
  try {
    const { sid } = req.params;
    const { body } = req;

    const student = await Student.update(sid, body);

    res.status(204).json(student);
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/studentDelete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Student.deleteById(id);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
});

router.post("/studentFind", async (req, res) => {
  try {
    const { age } = req.query;

    // Asegúrate de que el valor de age sea 'asc' o 'desc' antes de llamar a la búsqueda
    if (age && (age.toLowerCase() === "asc" || age.toLowerCase() === "desc")) {
      const student = await Student.search(age.toLowerCase());
      res.status(200).json(student);
    } else {
      res
        .status(400)
        .json({ error: 'Invalid value for age. Use "asc" or "desc".' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/studentFindByDni", async (req, res) => {
  const { dni } = req.query;
  const dniNumber = parseInt(dni);
  const student = await Student.searchStudent(dniNumber);

  res.status(200).json(student);
});

router.get("/mostrarEstudiantes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.showCalifications(id);
    res.status(200).json(student);
  } catch (error) {
    console.error(error);
  }
});
router.get("/studentsByYear/:year", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const { year } = req.query;
      const student = await Student.getByYear(year);
      console.log("Datos del estudiante:", student); // Verifica los datos antes de enviarlos
      res.status(200).json(student);
      console.log("Sí está autorizado", req.user);
    } catch (error) {
      console.error("Error al obtener datos del estudiante:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    console.log("No está autorizado");
    res.redirect("/");
  }
});

export default router;
