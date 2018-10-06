import IBase from "./IBase";
import IAddress from "./IAddress";
import { IAssignment } from "./IAssignment";

export interface IOrganization extends IBase {
  userID: number;
  identifier: string;
  name: string;
  profile?: IOrganizationProfile;
  assignments: IAssignment[];
}

export interface IOrganizationProfile extends IBase {
  organizationID: number;
  vat: string;
  officeAddress?: IAddress;
  billingAddress?: IAddress;
  developerUserIDs: number[];
}
