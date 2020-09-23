import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AuthModel {
  @Field({ nullable: true })
  access_token?: string | null;

  @Field({ nullable: true })
  refresh_token?: string | null;

  @Field({ nullable: true })
  userID?: string;

  @Field({ nullable: true })
  fullName?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  mobile?: string;

  @Field({ nullable: true })
  secMobile?: string;

  @Field({ nullable: true })
  gender?: string;

  @Field({ nullable: true })
  dob?: string;

  @Field({ nullable: true })
  age?: string;

  @Field({ nullable: true })
  profilePic?: string;

  @Field({ nullable: true })
  active?: boolean;

  @Field({ nullable: true })
  licenseID?: string;

  @Field({ nullable: true })
  licenseIDPic?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  message?: string;
}
