import {
  Continent,
  Drinking,
  Gender,
  PoliticalBeliefs,
  Religion,
} from "@prisma/client";

export const DefaultCircles = {
  Religion: {
    Christianity: {
      label: "Christianity",
      name: Religion.CHRISTIANITY,
      religionRestriction: [Religion.CHRISTIANITY],
    },
    Athiesm: {
      label: "Athiesm",
      name: Religion.ATHEISM,
      religionRestriction: [Religion.ATHEISM],
    },
    Agnosticism: {
      label: "Agnosticism",
      name: Religion.AGNOSTICISM,
      religionRestriction: [Religion.AGNOSTICISM],
    },
    Buddhism: {
      label: "Buddhism",
      name: Religion.BUDDHISM,
      religionRestriction: [Religion.BUDDHISM],
    },
    Mormonism: {
      label: "Mormonism",
      name: Religion.MORMONISM,
      religionRestriction: [Religion.MORMONISM],
    },
    Hinduism: {
      label: "Hinduism",
      name: Religion.HINDUISM,
      religionRestriction: [Religion.HINDUISM],
    },
    Judaism: {
      label: "Judaism",
      name: Religion.JUDAISM,
      religionRestriction: [Religion.JUDAISM],
    },
    Spiritual: {
      label: "Other/Spiritual",
      name: Religion.OTHER,
      religionRestriction: [Religion.OTHER],
    },
  },
  Political: {
    Conservative: {
      label: "Conservative",
      name: PoliticalBeliefs.CONSERVATIVE,
      politicalBeliefsRestriction: [PoliticalBeliefs.CONSERVATIVE],
    },
    Moderate: {
      label: "Moderate",
      name: PoliticalBeliefs.MODERATE,
      politicalBeliefsRestriction: [PoliticalBeliefs.MODERATE],
    },
    Liberal: {
      label: "Liberal",
      name: PoliticalBeliefs.LIBERAL,
      politicalBeliefsRestriction: [PoliticalBeliefs.LIBERAL],
    },
    Independent: {
      label: "Independent",
      name: PoliticalBeliefs.INDEPENDENT,
      politicalBeliefsRestriction: [PoliticalBeliefs.INDEPENDENT],
    },
  },
  Gender: {
    Male: {
      label: "Male",
      name: Gender.MALE,
      sexRestriction: [Gender.MALE],
    },
    Female: {
      label: "Female",
      name: Gender.FEMALE,
      sexRestriction: [Gender.FEMALE],
    },
  },
  Continent: {
    NorthAmerica: {
      label: "North America",
      name: Continent.NORTH_AMERICA,
      continentRestriction: [Continent.NORTH_AMERICA],
    },
    SouthAmerica: {
      label: "South America",
      name: Continent.SOUTH_AMERICA,
      continentRestriction: [Continent.SOUTH_AMERICA],
    },
    Europe: {
      label: "Europe",
      name: Continent.EUROPE,
      continentRestriction: [Continent.EUROPE],
    },
    Australia: {
      label: "Australia",
      name: Continent.AUSTRALIA,
      continentRestriction: [Continent.AUSTRALIA],
    },
    Asia: {
      label: "Asia",
      name: Continent.ASIA,
      continentRestriction: [Continent.ASIA],
    },
    Antarctica: {
      label: "Antarctica",
      name: Continent.ANTARTICA,
      continentRestriction: [Continent.ANTARTICA],
    },
    Africa: {
      label: "Africa",
      name: Continent.AFRICA,
      continentRestriction: [Continent.AFRICA],
    },
  },
  Drinking: {
    Never: {
      label: "Never Drinks",
      name: Drinking.NEVER,
      drinkingRestriction: [Drinking.NEVER],
    },
  },
};

export const DefaultCirclesList = [
  DefaultCircles.Religion.Athiesm,
  DefaultCircles.Religion.Agnosticism,
  DefaultCircles.Religion.Buddhism,
  DefaultCircles.Religion.Christianity,
  DefaultCircles.Religion.Hinduism,
  DefaultCircles.Religion.Judaism,
  DefaultCircles.Religion.Mormonism,
  DefaultCircles.Religion.Spiritual,
  DefaultCircles.Political.Conservative,
  DefaultCircles.Political.Moderate,
  DefaultCircles.Political.Liberal,
  DefaultCircles.Political.Independent,
  DefaultCircles.Continent.NorthAmerica,
  DefaultCircles.Continent.SouthAmerica,
  DefaultCircles.Continent.Antarctica,
  DefaultCircles.Continent.Australia,
  DefaultCircles.Continent.Asia,
  DefaultCircles.Continent.Europe,
  DefaultCircles.Continent.Africa,
  DefaultCircles.Drinking.Never,
  DefaultCircles.Gender.Male,
  DefaultCircles.Gender.Female,
];
