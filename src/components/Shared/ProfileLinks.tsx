import {
  ProfileAttribute,
  ProfileAttributeVariant,
} from "../Profile/ProfileAttribute";
import { ProfileAttributeOptions } from "../Profile/ProfileAttributeOptions";

import { LinkSchemaType } from "@/schemas/Link";
import React from "react";

export type ProfileLinksProps = {
  links: LinkSchemaType[];
  isEditMode?: boolean;
  editor?: React.ReactNode;
};

export function ProfileLinks({ links, isEditMode, editor }: ProfileLinksProps) {
  if (isEditMode) {
    return editor;
  } else {
    return links.map(({ href }, index) => (
      <ProfileAttribute
        key={index}
        option={ProfileAttributeOptions.link}
        attribute={href}
        variant={ProfileAttributeVariant.PROFILE_LINK}
      />
    ));
  }
}
