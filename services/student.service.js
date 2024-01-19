import { StudentDao } from "../mongo/dao/student.dao.js";

export default class StudentService {
  static get() {
    const student = StudentDao.get();
    return student;
  }

  static getByYear(year) {
    const getByYear = StudentDao.getByYear(year);
    return getByYear;
  }

  static getById(id) {
    const getById = StudentDao.getById(id);
    return getById;
  }

  static create(data) {
    const create = StudentDao.create(data);
    return create;
  }

  static update(sid, data) {
    const student = StudentDao.update(sid, data);
    return student;
  }

  static deleteById(sid) {
    const student = StudentDao.deleteById({ _id: sid });
    return student;
  }

  static search(ageFind) {
    const student = StudentDao.search(ageFind);

    return student;
  }

  static searchStudent(dni) {
    const student = StudentDao.searchStudent(dni);

    return student;
  }

  static async showCalifications(id) {
    const calificaciones = await StudentDao.showCalifications(id);
    return calificaciones;
  }
}
