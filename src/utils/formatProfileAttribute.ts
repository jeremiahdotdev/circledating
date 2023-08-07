import { Religion } from "@prisma/client";

export const formatProfileAttribute = (attribute: Religion) => {
  switch (attribute) {
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
  }
};
