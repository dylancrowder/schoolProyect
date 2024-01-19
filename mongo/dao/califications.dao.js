import calificationsSchema from "../califications.schema.js";

export default class CalificationDao {
  static async createNotes(data) {
    const calification = await calificationsSchema.create(data);

    return calification;
  }
}
