import UserAuth from "../mongo/auth.Schema.js";
export default class User {
  static async create(data) {
    const student = await UserAuth.create(data);
    return student;
  }
}
