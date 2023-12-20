import studentSchema from "../mongo/students.schema.js";
export default class Student {
  static get() {
    return studentSchema.find();
  }

  static async getById(sid) {
    const student = await studentSchema.findById(sid);
    if (!student) {
      throw new Error("producto no econtrado");
    }
    return student;
  }

  static async create(data) {
    const student = await studentSchema.create(data);
    return student;
  }

  static async update(sid, data) {
    const student = await studentSchema.updateOne({ _id: sid }, { $set: data });
    return student;
  }

  static async deleteById(sid) {
    await studentSchema.deleteOne({ _id: sid });
    console.log("eliminado correctamente ");
  }

  static async search(ageFind) {
    const sortOrder = ageFind === "asc" ? 1 : -1;

    const student = await studentSchema.aggregate([
      {
        $sort: {
          age: sortOrder
        }
      }
    ]);

    return student;
  }

  static async searchStudent(dni) {
    const student = await studentSchema.aggregate([
      {
        $match: {
          dni: dni
        }
      }
    ]);

    return student;
  }
}
