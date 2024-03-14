"use client";
import { ButtonRowOptionType } from "@/components/ui/ButtonRowFormField";
import { Gender } from "@prisma/client";
import { IconButtonVariant } from "./Button";

export enum Themes {
  LIGHT = "light",
  DARK = "dark",
  BOY = "boy",
  GIRL = "girl",
}

export function getThemeFromGender(gender: string | undefined) {
  if (gender === Gender.MALE) return Themes.BOY;
  else if (gender === Gender.FEMALE) return Themes.GIRL;
}

export const LightSelectionValues: ButtonRowOptionType[] = [
  {
    value: Themes.LIGHT,
    variant: IconButtonVariant.LIGHT,
  },
  {
    value: Themes.DARK,
    variant: IconButtonVariant.DARK,
  },
];

export const formatTheme = (
  theme?: string,
  light?: string,
  gender?: string
) => {
  const themeArray: string[] = [];
  const lightThemeToUse =
    light ??
    (theme?.includes("dark")
      ? "dark"
      : theme?.includes("light")
      ? "light"
      : "light");
  const genderThemeToUse =
    gender ??
    (theme?.includes("boy")
      ? "boy"
      : theme?.includes("girl")
      ? "girl"
      : undefined);
  if (lightThemeToUse) themeArray.push(lightThemeToUse);
  if (genderThemeToUse) themeArray.push(genderThemeToUse);

  return themeArray.join("-");
};
