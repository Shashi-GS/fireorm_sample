import { Collection } from "fireorm";

@Collection("user")
export class User {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  secMobile: string;
  gender: string;
  dob: string;
  age: string;
  profilePic: string;
  active: boolean;
  licenseID: string;
  licenseIDPic: string;
  emailToken: string;
  phoneToken: string;
  status: string;
  createdBy: string;
  createdOn: Date;
  updatedBy: string;
  updatedOn: Date;
}
