import StudentService from "../services/student.service.js";

export default class Student {
  static get() {
    return StudentService.get();
  }

  static async getById(sid) {
    const student = await StudentService.getById(sid);
    if (!student) {
      throw new Error("producto no econtrado");
    }
    return student;
  }

  static getByYear(year) {
    const getByYear = StudentService.getByYear(year);
    return getByYear;
  }

  static async create(data) {
    const student = await StudentService.create(data);
    return student;
  }

  static async update(sid, data) {
    const student = await StudentService.update(sid, data);
    return student;
  }

  static async deleteById(sid) {
    const student = await StudentService.deleteById(sid);
    return student;
  }

  static async search(ageFind) {
    const sortOrder = ageFind === "asc" ? 1 : -1;

    const student = await StudentService.search(sortOrder);

    return student;
  }

  static async searchStudent(dni) {
    const student = await StudentService.searchStudent(dni);

    return student;
  }

  static async showCalifications(id) {
    const student = await StudentService.showCalifications(id);
    return student;
  }
}
