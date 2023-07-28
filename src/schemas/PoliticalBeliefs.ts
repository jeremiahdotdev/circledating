import { z } from "zod";

export enum PoliticalBeliefs {
  CONSERVATIVE = "conservative",
  CONSERVATIVE_LEANING_MODERATE = "conservative-leaning_moderate",
  MODERATE = "moderate",
  LIBERAL_LEANING_MODERATE = "liberal-leaning_moderate",
  LIBERAL = "liberal",
  INDEPENDENT = "independent",
  APOLITICAL = "apolitical",
}

export const PoliticalBeliefsSchema = z.nativeEnum(PoliticalBeliefs);
