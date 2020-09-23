import { HttpException } from "@nestjs/common";
import { Resolver, Query, Args } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { AuthModel } from "./auth.model";
import { ForgotPassword } from "./auth.input";

@Resolver()
export class AuthResolver {
  constructor(private readonly service: AuthService) {}

  @Query(() => AuthModel)
  async test() {
    try {
      return await this.service.signin();
    } catch (error) {
      throw new HttpException(error, 600);
    }
  }
}
