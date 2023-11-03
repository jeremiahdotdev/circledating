import {
  Activity,
  Children,
  Consumables,
  Drinking,
  Income,
  LevelOfEducation,
  MaritalStatus,
  PoliticalBeliefs,
  Purity,
  Religion,
  YesNoOrUnknown,
} from "@prisma/client";

export type ProfileAttributeType = string;

export const formatProfileAttribute = (attribute: ProfileAttributeType) => {
  switch (attribute) {
    // Religion
    case Religion.AGNOSTICISM:
      return "Agnostic";
    case Religion.ATHEISM:
      return "Atheist";
    case Religion.BUDDHISM:
      return "Buddhist";
    case Religion.CHRISTIANITY:
      return "Christian";
    case Religion.HINDUISM:
      return "Hindu";
    case Religion.JUDAISM:
      return "Jewish";
    case Religion.MORMONISM:
      return "Mormon";
    case Religion.OTHER:
      return "Other";
    // Marital Status
    case MaritalStatus.NEVER_MARRIED:
      return "Never Married";
    case MaritalStatus.DIVORCED:
      return "Divorced";
    case MaritalStatus.WIDOWED:
      return "Widowed";
    // Political Beliefs
    case PoliticalBeliefs.CONSERVATIVE:
      return "Conservative";
    case PoliticalBeliefs.APOLITICAL:
      return "Apolitical";
    case PoliticalBeliefs.CONSERVATIVE_LEANING_MODERATE:
      return "Conservative Leaning Moderate";
    case PoliticalBeliefs.INDEPENDENT:
      return "Independent";
    case PoliticalBeliefs.LIBERAL:
      return "Liberal";
    case PoliticalBeliefs.LIBERAL_LEANING_MODERATE:
      return "Liberal Leaning Moderate";
    case PoliticalBeliefs.MODERATE:
      return "Moderate";
    // Yes-No-Unknown
    case YesNoOrUnknown.YES:
      return "Yes";
    case YesNoOrUnknown.NO:
      return "No";
    case YesNoOrUnknown.UNKNOWN:
      return "Unknown";
    // Activity Level
    case Activity.FREQUENT:
      return "Frequent";
    case Activity.HEAVY:
      return "Heavy";
    case Activity.INFREQUENT:
      return "Infrequent";
    case Activity.MILD:
      return "Mild";
    case Activity.NEVER:
      return "Never";
    // Drinking
    case Drinking.FREQUENT:
      return "Frequent";
    case Drinking.HEAVY:
      return "Heavy";
    case Drinking.INFREQUENT:
      return "Infrequent";
    case Drinking.MILD:
      return "Mild";
    case Drinking.NEVER:
      return "Never";
    case Drinking.SOCIAL:
      return "Social";
    // Consumables
    case Consumables.EDIBLES_GUMMIES:
      return "Edibles/Gummies";
    case Consumables.NO_CONSUMABLES:
      return "None";
    case Consumables.OCCASIONAL_CIGARS:
      return "Occasional Cigars";
    case Consumables.SMOKING:
      return "Smoking";
    case Consumables.VAPING:
      return "Vaping";
    // Level of Education
    case LevelOfEducation.ASSOCIATES:
      return "Associates";
    case LevelOfEducation.BACHELORS:
      return "Bachelors";
    case LevelOfEducation.DOCTORATE:
      return "Doctorate";
    case LevelOfEducation.HIGH_SCHOOL:
      return "High School";
    case LevelOfEducation.MASTERS:
      return "Masters";
    case LevelOfEducation.NO_DEGREE:
      return "No Degree";

    // Purity
    case Purity.NOT_VIRGIN_NOT_WAITING:
      return "Not a Virgin, Not Waiting";
    case Purity.NOT_VIRGIN_WAITING:
      return "Not a Virgin, Waiting";
    case Purity.VIRGIN_WAITING:
      return "Virgin, Waiting";
    case Purity.VIRGIN_NOT_WAITING:
      return "Virgin, Not Waiting";
    // Children
    case Children.HAS_AND_DOES_NOT_WANT:
      return "Has; Doesn't want More";
    case Children.HAS_AND_WANTS:
      return "Has; Wants More";
    case Children.HAS_NOT_AND_DOES_NOT_WANT:
      return "None; Doesn't Want";
    case Children.HAS_NOT_AND_DOES_WANT:
      return "None; Wants";
    // Income
    case Income.DUAL:
      return "Dual Income";
    case Income.EITHER:
      return "Either";
    case Income.SINGLE:
      return "Single Income";
    default:
      return attribute;
  }
};
