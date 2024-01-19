import studentsSchema from "../students.schema.js";

export class StudentDao {
  static get() {
    const student = studentsSchema.find();
    return student;
  }

  static getByYear(year) {
    const getByYear = studentsSchema.findOne({ year: year });
    return getByYear;
  }

  static getById(id) {
    const getById = studentsSchema.findById(id);
    return getById;
  }

  static create(data) {
    const create = studentsSchema.create(data);
    return create;
  }

  static async update(sid, data) {
    const student = await studentsSchema.updateOne(
      { _id: sid },
      { $set: data }
    );
    return student;
  }

  static deleteById(sid) {
    const student = studentsSchema.deleteOne({ _id: sid });
    return student;
  }

  static search(ageFind) {
    const student = studentsSchema.aggregate([
      {
        $sort: {
          age: ageFind
        }
      }
    ]);

    return student;
  }

  static searchStudent(dni) {
    const student = studentsSchema.aggregate([
      {
        $match: {
          dni: dni
        }
      }
    ]);

    return student;
  }

  static async showCalifications(id) {
    const calificaciones = await studentsSchema
      .findById(id)
      .populate("calification")
      .exec();

    return calificaciones;
  }
}
