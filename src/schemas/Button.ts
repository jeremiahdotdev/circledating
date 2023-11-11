import {
  IconDefinition,
  faAngleLeft,
  faAngleRight,
  faAtom,
  faBiking,
  faBook,
  faCheck,
  faChildren,
  faCross,
  faDemocrat,
  faDharmachakra,
  faDoorClosed,
  faDoorOpen,
  faDumpsterFire,
  faEnvelope,
  faExclamation,
  faGlassWaterDroplet,
  faGraduationCap,
  faHandHoldingDroplet,
  faHouseChimneyUser,
  faLandmarkDome,
  faMale,
  faMars,
  faMinus,
  faMoon,
  faOm,
  faPaperPlane,
  faPerson,
  faPersonBreastfeeding,
  faPersonCircleQuestion,
  faPersonRunning,
  faPersonWalking,
  faPersonWalkingWithCane,
  faPlaceOfWorship,
  faPlane,
  faPlaneSlash,
  faPlus,
  faQrcode,
  faQuestion,
  faRepublican,
  faRing,
  faSave,
  faScaleBalanced,
  faSmoking,
  faSpaghettiMonsterFlying,
  faStarAndCrescent,
  faStarOfDavid,
  faSun,
  faTrashCan,
  faUpload,
  faUserAlt,
  faUserTie,
  faVenus,
  faWalking,
  faWeightHanging,
  faWheelchairMove,
  faWineGlass,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCheckCircle,
  faPenToSquare,
  faXmarkCircle,
} from "@fortawesome/free-regular-svg-icons";
import classNames from "classnames";

export type IconButtonOption = {
  icon: IconDefinition;
  style: string;
  label?: string;
  description?: string;
  showLabel?: boolean;
  iconStyle?: string;
  activeStyle?: string;
};

const subtle =
  "flex self-end h-6 w-6 p-1 text-gender-accent bg-transparent hover:bg-transparent shadow-none";
const subtleInverted =
  "flex self-end h-5 w-5 p-1 text-gender-accent border-gender-accent bg-transparent border hover:bg-transparent shadow-none";
const toggleHollow = "h-20 w-20 bg-background border-4 p-4 shadow-outter";
const subtleLarge =
  "flex h-12 w-12 p-1 text-gender-accent bg-transparent hover:bg-transparent";

const toggleHollowStylePurple = {
  style: classNames(toggleHollow, "text-purple-600 border-purple-600"),
  activeStyle: "bg-purple-600 border-purple-600 text-white",
};
export const IconButtonVariant = {
  MAIL: {
    label: "They like you! Start a conversation.",
    icon: faEnvelope,
    style: "h-16 bg-green-600 shadow-outter",
  } as IconButtonOption,
  REQUEST: {
    label: "Ask to join.",
    icon: faEnvelope,
    showLabel: true,
    style: "h-12 py-3 bg-blue-600 whitespace-nowrap shadow-outter",
  } as IconButtonOption,
  MESSAGE: {
    label: "Message",
    icon: faPaperPlane,
    style: "h-16 bg-purple-600 shadow-outter",
  } as IconButtonOption,
  SAVE: {
    label: "Save",
    icon: faSave,
    style: "h-16 bg-purple-600 shadow-outter",
  } as IconButtonOption,
  LIKE: {
    label: "Like!",
    icon: faCheck,
    style: "h-16 bg-green-600 shadow-outter",
  } as IconButtonOption,
  JOIN: {
    label: "Join",
    showLabel: true,
    icon: faDoorClosed,
    style: "h-12 py-3 bg-green-600 shadow-outter",
  } as IconButtonOption,
  LEAVE: {
    label: "Leave",
    showLabel: true,
    icon: faDoorOpen,
    style: "h-12 py-3 bg-red-600 shadow-outter",
  } as IconButtonOption,
  TRASH: {
    label: "Block",
    icon: faTrashCan,
    style: "bg-red-600 shadow-outter",
  } as IconButtonOption,
  ADD: {
    label: "Add",
    icon: faCheck,
    style: "h-8 p-2 bg-green-600 shadow-outter",
  } as IconButtonOption,
  UPLOAD: {
    label: "Upload New Photo",
    icon: faUpload,
    style: "h-8 p-2 bg-gender-accent shadow-outter",
  } as IconButtonOption,
  REPORT: {
    label: "Report",
    icon: faExclamation,
    style: subtleInverted,
  } as IconButtonOption,
  NEXT: {
    label: "Next",
    icon: faAngleRight,
    style: subtleLarge,
  } as IconButtonOption,
  PREVIOUS: {
    label: "Previous",
    icon: faAngleLeft,
    style: subtleLarge,
  } as IconButtonOption,
  EDIT: {
    label: "Edit",
    icon: faPenToSquare,
    style: subtle,
  } as IconButtonOption,
  UPDATE: {
    label: "Update",
    icon: faCheckCircle,
    style: subtle,
  } as IconButtonOption,
  CANCEL: {
    label: "Cancel",
    icon: faXmarkCircle,
    style: subtle,
  } as IconButtonOption,
  PLUS: {
    label: "Plus",
    icon: faPlus,
    style: subtle,
  } as IconButtonOption,
  MINUS: {
    label: "Minus",
    icon: faMinus,
    style: subtle,
  } as IconButtonOption,
  SHARE: {
    label: "Share",
    icon: faQrcode,
    style: "h-8 p-2 bg-gender-accent shadow-outter",
  } as IconButtonOption,
  REMOVE: {
    label: "Remove",
    icon: faX,
    style: "h-8 p-2 bg-red-600 shadow-outter",
  } as IconButtonOption,
  MALE: {
    label: "Male",
    icon: faMars,
    style: classNames(toggleHollow, "text-boy-accent border-boy-accent"),
    activeStyle: "bg-boy-accent text-white",
  } as IconButtonOption,
  FEMALE: {
    label: "Female",
    icon: faVenus,
    style: classNames(toggleHollow, "text-girl-accent border-girl-accent"),
    activeStyle: "bg-girl-accent text-white",
  } as IconButtonOption,
  LIGHT: {
    label: "Light",
    icon: faSun,
    style: classNames(toggleHollow, "text-yellow-400 border-yellow-400"),
    activeStyle: "bg-yellow-400 border-yellow-400 text-white",
  } as IconButtonOption,
  DARK: {
    label: "Dark",
    icon: faMoon,
    style: classNames(toggleHollow, "text-purple-700 border-purple-700"),
    activeStyle: "bg-purple-900 border-purple-900 text-white",
  } as IconButtonOption,
  KG: {
    label: "Metric",
    icon: faWeightHanging,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  LBS: {
    label: "Imperial",
    icon: faWeightHanging,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  BODY_THIN: {
    label: "Thin",
    icon: faMale,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  BODY_FIT: {
    label: "Fit",
    icon: faMale,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  BODY_EXTRA: {
    label: "Extra",
    icon: faMale,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  BODY_HEAVY: {
    label: "Heavy",
    icon: faMale,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  PLANE: {
    label: "Yes",
    icon: faPlane,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  PLANE_SLASH: {
    label: "No",
    icon: faPlaneSlash,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  CHILDREN_HAS: {
    label: "Yes",
    icon: faChildren,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  CHILDREN_HAS_NOT: {
    label: "No",
    icon: faPerson,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  CHILDREN_WANTS: {
    label: "Yes",
    icon: faPersonBreastfeeding,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  CHILDREN_WANTS_NOT: {
    label: "No",
    icon: faUserAlt,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  NEVER: {
    label: "Never",
    icon: faRing,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  WIDOWED: {
    label: "Widowed",
    icon: faRing,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  DIVORCED: {
    label: "Divorced",
    icon: faRing,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  BODY_VERY_TALL: {
    icon: faPerson,
    label: "X-Tall",
    description: "6' 2\"+",
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  BODY_TALL: {
    icon: faPerson,
    label: "Tall",
    description: "5' 8\" - 6'2\"",
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  BODY_AVERAGE: {
    icon: faPerson,
    label: "Avg.",
    description: "5' 2\" - 5'8\"",
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  BODY_SHORT: {
    icon: faPerson,
    label: "Short",
    description: "4' 8\" - 5'2\"",
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  BODY_VERY_SHORT: {
    icon: faPerson,
    label: "X-Short",
    description: "< 4' 8\" ",
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  CHILDREN_HAS_AND_WANTS: {
    icon: faPerson,
    description: "Has kids; Wants more.",
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  CHILDREN_HAS_AND_DOES_NOT_WANT: {
    icon: faPerson,
    description: "Has kids; Doesn't want more.",
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  CHILDREN_HAS_NOT_AND_DOES_NOT_WANT: {
    icon: faPerson,
    description: "Doesn't have kids; Doesn't want kids.",
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  CHILDREN_HAS_NOT_AND_DOES_WANT: {
    icon: faPerson,
    description: "Doesn't have kids; Wants kids.",
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  ETHNICITY_WHITE: {
    icon: faPerson,
    description: "White",
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  ETHNICITY_BLACK: {
    icon: faPerson,
    description: "Black or African American",
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  ETHNICITY_AMERICAN_INDIAN_OR_ALASKA_NATIVE: {
    icon: faPerson,
    description: "American Indian or Alaska Native",
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  ETHNICITY_ASIAN: {
    icon: faPerson,
    description: "Asian",
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  ETHNICITY_PACIFIC_ISLANDER: {
    icon: faPerson,
    description: "Native Hawaiian or Other Pacific Islander",
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  ETHNICITY_OTHER: {
    icon: faPerson,
    description: "Other",
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  INCOME_DUAL: {
    icon: faUserTie,
    label: "Dual-income",
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  INCOME_EITHER: {
    icon: faPersonCircleQuestion,
    label: "Either",
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  INCOME_SINGLE: {
    icon: faHouseChimneyUser,
    label: "Single-income",
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  DRINKING_INFREQUENT: {
    icon: faWineGlass,
    label: "Infrequently",
    description: "I drink maybe a few times per year.",
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  DRINKING_MILD: {
    icon: faWineGlass,
    label: "Mildly",
    description: "I drink maybe a few times per month.",
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  DRINKING_SOCIAL: {
    icon: faWineGlass,
    label: "Socially",
    description: "I drink at events, but rarely otherwise.",
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  DRINKING_FREQUENT: {
    icon: faWineGlass,
    label: "Frequently",
    description: "I drink on a weekly basis.",
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  DRINKING_HEAVY: {
    icon: faWineGlass,
    label: "Heavily",
    description: "I drink on an almost daily basis.",
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  DRINKING_NEVER: {
    icon: faWineGlass,
    label: "Never.",
    description: "I don't drink.",
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  CONSUMABLES_SMOKING: {
    label: "Smoking",
    icon: faSmoking,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  CONSUMABLES_VAPING: {
    label: "Vaping",
    icon: faSmoking,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  CONSUMABLES_OCCASIONAL_CIGARS: {
    label: "Cigars",
    icon: faSmoking,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  CONSUMABLES_EDIBLES_GUMMIES: {
    label: "Edibles",
    icon: faSmoking,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  CONSUMABLES_NO_CONSUMABLES: {
    label: "None",
    icon: faSmoking,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  ACTIVITY_NEVER: {
    label: "Never",
    description: "I rarely excercise.",
    icon: faWheelchairMove,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  ACTIVITY_INFREQUENT: {
    label: "Infrequently",
    description: "I excercise 0-1 times per week",
    icon: faPersonWalkingWithCane,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  ACTIVITY_MILD: {
    label: "Mildly",
    description: "I excercise 2-3 times per week",
    icon: faPersonWalking,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  ACTIVITY_FREQUENT: {
    label: "Frequently",
    description: "I excercise 3-4 times per week",
    icon: faPersonRunning,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  ACTIVITY_HEAVY: {
    label: "Heavyly",
    description: "I excercise 5+ times per week",
    icon: faBiking,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  RELIGION_CHRISTIANITY: {
    label: "Christian",
    icon: faCross,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  RELIGION_MORMONISM: {
    label: "Mormon",
    icon: faBook,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  RELIGION_AGNOSTICISM: {
    label: "Agnostic",
    icon: faWalking,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  RELIGION_ATHEISM: {
    label: "Atheist",
    icon: faAtom,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  RELIGION_BUDDHISM: {
    label: "Buddhist",
    icon: faDharmachakra,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  RELIGION_HINDUISM: {
    label: "Hindi",
    icon: faOm,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  RELIGION_JUDAISM: {
    label: "Judaism",
    icon: faStarOfDavid,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  RELIGION_ISLAM: {
    label: "Islam",
    icon: faStarAndCrescent,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  RELIGION_OTHER: {
    label: "Other",
    icon: faQuestion,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  POLITIC_CONSERVATIVE: {
    label: "Conservative",
    icon: faRepublican,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  POLITIC_MODERATE: {
    label: "Moderate",
    icon: faScaleBalanced,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  POLITIC_LIBERAL: {
    label: "Liberal",
    icon: faDemocrat,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  POLITIC_INDEPENDENT: {
    label: "Independent",
    icon: faLandmarkDome,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  POLITIC_APOLITICAL: {
    label: "Apolitical",
    icon: faDumpsterFire,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  EDUCATION_DOCTORATE: {
    label: "Doctorate",
    icon: faGraduationCap,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  EDUCATION_MASTERS: {
    label: "Masters",
    icon: faGraduationCap,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  EDUCATION_BACHELORS: {
    label: "Bachelors",
    icon: faGraduationCap,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  EDUCATION_ASSOCIATES: {
    label: "Associates",
    icon: faGraduationCap,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  EDUCATION_HIGH_SCHOOL: {
    label: "High School",
    icon: faGraduationCap,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  EDUCATION_NO_DEGREE: {
    label: "None",
    icon: faGraduationCap,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  PURITY_VIRGIN_WAITING: {
    description: "Virgin; Waiting until marriage.",
    icon: faHandHoldingDroplet,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  PURITY_NOT_VIRGIN_WAITING: {
    description: "Non-virgin; Waiting until marriage.",
    icon: faHandHoldingDroplet,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  PURITY_VIRGIN_NOT_WAITING: {
    description: "Virgin; Not waiting until marriage.",
    icon: faHandHoldingDroplet,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
  PURITY_NOT_VIRGIN_NOT_WAITING: {
    description: "Non-virgin; Not waiting until marriage.",
    icon: faHandHoldingDroplet,
    ...toggleHollowStylePurple,
  } as IconButtonOption,
};
