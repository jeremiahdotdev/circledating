import { z } from "zod";

export enum LevelOfEducation {
  DOCTORATE = "doctorate",
  MASTERS = "masters",
  BACHELORS = "bachelors",
  ASSOCIAES = "associates",
  HIGH_SCHOOL = "high_school",
  NO_DEGREE = "no_degree",
}

export const LevelOfEducationSchema = z.nativeEnum(LevelOfEducation);
