import { LinkSchemaType, Url } from "@/schemas/Link";
import {
  ProfileAttribute,
  ProfileAttributeVariant,
} from "../Profile/ProfileAttribute";
import { ProfileAttributeOptions } from "../Profile/ProfileAttributeOptions";
import React from "react";

export type ProfileLinksProps = {
  links: LinkSchemaType[];
  isEditMode?: boolean;
  editor?: React.ReactNode;
};

export function ProfileLinks({ links, isEditMode, editor }: ProfileLinksProps) {
  if (isEditMode) {
    return editor;
  } else if (links.length) {
    return links.map(({ href }, index) => (
      <ProfileAttribute
        key={index}
        option={ProfileAttributeOptions.link}
        attribute={href as Url}
        variant={ProfileAttributeVariant.PROFILE_LINK}
      />
    ));
  }
}
