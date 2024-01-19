import CalificationDao from "../mongo/dao/califications.dao.js";
export default class CalificationService {
  static create(data) {
    const calification = CalificationDao.createNotes(data);
    return calification;
  }
}
