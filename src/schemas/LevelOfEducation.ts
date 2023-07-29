import { z } from "zod";
import { ComboboxOption } from "@/components/ui/combobox";

export enum LevelOfEducation {
  DOCTORATE = "doctorate",
  MASTERS = "masters",
  BACHELORS = "bachelors",
  ASSOCIATES = "associates",
  HIGH_SCHOOL = "high_school",
  NO_DEGREE = "no_degree",
}

export const LevelOfEducationSchema = z.nativeEnum(LevelOfEducation);

export const LevelOfEducationSelectionValues: ComboboxOption<string>[] = [
  {
    label: "Doctorate",
    value: LevelOfEducation.DOCTORATE,
  },
  {
    label: "Masters",
    value: LevelOfEducation.MASTERS,
  },
  {
    label: "Bachelors",
    value: LevelOfEducation.BACHELORS,
  },
  {
    label: "Associates",
    value: LevelOfEducation.ASSOCIATES,
  },
  {
    label: "High School",
    value: LevelOfEducation.HIGH_SCHOOL,
  },
  {
    label: "None",
    value: LevelOfEducation.NO_DEGREE,
  },
];
