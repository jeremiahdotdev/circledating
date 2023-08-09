import { ComboboxOption } from "@/components/ui/combobox";
import { LevelOfEducation } from "@prisma/client";
import { z } from "zod";

export const LevelOfEducationSchema = z.nativeEnum(LevelOfEducation);

export const LevelOfEducationSelectionValues: ComboboxOption<LevelOfEducation>[] =
  [
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
