import IBase from "./IBase";

export type SkillID = string;

export enum TurnaroundLevel {
  WITHIN_HOURS = "within_hours",
  NEXT_DAY = "next_day",
  DAY_AFTER_TOMORROW = "day_after_tomorrow"
}

export interface IAssignment extends IBase {
  organizationID: number,
  description: string,
  skillsNeeded: SkillID[],
  turnaroundLevel: TurnaroundLevel,
  hoursPerWeek: number,
  startDate: Date,
  endDate: Date
}