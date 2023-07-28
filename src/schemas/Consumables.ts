import { z } from "zod";

export enum Consumables {
  SMOKING = "smoking",
  VAPING = "vaping",
  OCCASIONAL_CIGARS = "occasional_cigars",
  EDIBLES_GUMMIES = "edibles_gummies",
  NONE = "none",
}

export const ConsumablesSchema = z.nativeEnum(Consumables);
