import { Injectable } from "@nestjs/common";
import UserDAO from "../repos/UserDAO";
import { getRepository } from "fireorm";
import { User } from "../entities/User";

@Injectable()
export class AuthService {
  public sessionInfo: any;
  private userRepo = getRepository(User) as UserDAO;

  async signin() {
    return this.userRepo.getUserByEmail();
  }
}
