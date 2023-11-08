import {
  IconDefinition,
  faCheck,
  faDoorClosed,
  faDoorOpen,
  faEnvelope,
  faExclamation,
  faMale,
  faMars,
  faMinus,
  faMoon,
  faPaperPlane,
  faPerson,
  faPlane,
  faPlaneSlash,
  faPlus,
  faQrcode,
  faRing,
  faSave,
  faSun,
  faTrashCan,
  faUpload,
  faVenus,
  faWeightHanging,
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
};
