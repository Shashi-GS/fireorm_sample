import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class Identity {
  @Field()
  access_token: string;

  @Field()
  refresh_token: string;
}

@InputType()
export class SignInInput {
  @Field({ nullable: false })
  userID: string;

  @Field({ nullable: false })
  password: string;
}

@InputType()
export class ForgotPassword {
  @Field()
  email: string;

  @Field()
  token: string;
}

@InputType()
export class ResetPassword {
  @Field()
  userID: string;

  @Field()
  password: string;

  @Field()
  token: string;
}

@InputType()
export class ChangePassword {
  @Field()
  oldPassword: string;

  @Field()
  newPassword: string;
}

@InputType()
export class Verifytoken {
  @Field()
  userID: string;

  @Field()
  token: string;
}
