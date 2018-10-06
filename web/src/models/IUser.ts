import IBase from "./IBase";

export enum UserType {
  TALENT = "talent",
  ORGANIZATION = "organization",
  DEVELOPER = "developer"
}

export interface IUser extends IBase {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  acceptedTerms: boolean;
  type?: UserType;
}