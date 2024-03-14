import { ButtonRowOptionType } from "@/components/ui/button-row";
import { ComboboxOption } from "@/components/ui/combobox";
import { IconButtonVariant } from "./Button";
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

export const LevelOfEducationButtonValues: ButtonRowOptionType[] = [
  {
    variant: IconButtonVariant.EDUCATION_DOCTORATE,
    value: LevelOfEducation.DOCTORATE,
  },
  {
    variant: IconButtonVariant.EDUCATION_MASTERS,
    value: LevelOfEducation.MASTERS,
  },
  {
    variant: IconButtonVariant.EDUCATION_BACHELORS,
    value: LevelOfEducation.BACHELORS,
  },
  {
    variant: IconButtonVariant.EDUCATION_ASSOCIATES,
    value: LevelOfEducation.ASSOCIATES,
  },
  {
    variant: IconButtonVariant.EDUCATION_HIGH_SCHOOL,
    value: LevelOfEducation.HIGH_SCHOOL,
  },
  {
    variant: IconButtonVariant.EDUCATION_NO_DEGREE,
    value: LevelOfEducation.NO_DEGREE,
  },
];
