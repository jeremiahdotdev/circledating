import { z } from "zod";

export enum DrinkingFeeling {
  DONT_DRINK_DEALBREAKER = "dont_drink_dealbreaker",
  DONT_DRINK_DONT_CARE = "dont_drink_dont_care",
  I_DRINK_DEALBREAKER = "i_drink_dealbreaker",
  I_DRINK_SOCIALLY_DEALBREAKER = "i_drink_socially_dealbreaker",
  I_DRINK_DONT_CARE = "i_drink_dont_care",
  I_DRINK_SOCIALLY_DONT_CARE = "i_drink_socially_dont_care",
}

export const DrinkingFeelingSchema = z.nativeEnum(DrinkingFeeling);
