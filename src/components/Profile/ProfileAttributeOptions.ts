import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faBaby,
  faCalendar,
  faCalendarAlt,
  faDollarSign,
  faDumbbell,
  faFlag,
  faGraduationCap,
  faHandHoldingDroplet,
  faLandmark,
  faPeopleGroup,
  faPray,
  faRing,
  faRuler,
  faSmoking,
  faWeight,
  faWineGlass,
} from "@fortawesome/free-solid-svg-icons";

export type ProfileAttributeOptionType = {
  icon: IconDefinition;
  label: string;
  isHeight?: boolean;
};

export const ProfileAttributeOptions = {
  religion: {
    icon: faPray,
    label: "Religion",
  },
  maritalStatus: {
    icon: faRing,
    label: "Marital Status",
  },
  consumables: {
    icon: faSmoking,
    label: "Tobacco / Drugs",
  },
  drinking: {
    icon: faWineGlass,
    label: "Drinking Level",
  },
  weight: {
    icon: faWeight,
    label: "Weight",
  },
  height: {
    icon: faRuler,
    label: "Height",
    isHeight: true,
  },
  education: {
    icon: faGraduationCap,
    label: "Education",
  },
  politicalBeliefs: {
    icon: faLandmark,
    label: "Political Beliefs",
  },
  activityLevel: {
    icon: faDumbbell,
    label: "Activity Level",
  },
  purity: {
    icon: faHandHoldingDroplet,
    label: "Purity",
  },
  children: {
    icon: faBaby,
    label: "Children",
  },
  income: {
    icon: faDollarSign,
    label: "Income",
  },
  // Circles
  memberCount: {
    icon: faPeopleGroup,
    label: "Members",
  },
  foundedOn: {
    icon: faCalendarAlt,
    label: "Founded",
  },
};
