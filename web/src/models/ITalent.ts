import IBase from "./IBase";
import IAddress from "./IAddress";

export const dailyAvailabilities = [
  { id: 0, name: "mornings" },
  { id: 1, name: "afternoons" },
  { id: 2, name: "evenings" },
  { id: 3, name: "nights" }
]

export const weeklyAvailabilities = [
  { id: 0, name: "mondays" },
  { id: 1, name: "tuesdays" },
  { id: 2, name: "wednesdays" },
  { id: 3, name: "thursdays" },
  { id: 4, name: "fridays" },
  { id: 5, name: "saturdays" },
  { id: 6, name: "sundays" }
]

interface SelectedSkill {
  id: string;
  level: number;
}

export interface ITalent extends IBase {
  userID: number;
  skills: SelectedSkill[];
  availability: {
    daily: number[],
    weekly: number[],
    hoursPerWeek: number
  },
  socialProfiles: {
    github: string;
    linkedin: string;
    stackoverflow: string;
  },
  address: IAddress,
  isContractor: boolean,
  paymentDetails: string;
}
