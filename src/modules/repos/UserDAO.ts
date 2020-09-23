import { BaseFirestoreRepository, CustomRepository } from "fireorm";
import { User } from "../entities/User";

@CustomRepository(User)
export default class UserDAO extends BaseFirestoreRepository<User> {
  async getUserByEmail(): Promise<User[]> {
    let data = await this.find();
    return data;
  }
}

Object.seal(UserDAO);
