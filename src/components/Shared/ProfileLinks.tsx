import {
  ProfileAttribute,
  ProfileAttributeVariant,
} from "../Profile/ProfileAttribute";
import { ProfileAttributeOptions } from "../Profile/ProfileAttributeOptions";

import { LinkSchemaType } from "@/schemas/Link";
import React from "react";

export type ProfileLinksProps = {
  links: LinkSchemaType[];
};

export function ProfileLinks({ links }: ProfileLinksProps) {
  return links.map(({ href, id }) => (
    <ProfileAttribute
      key={id}
      option={ProfileAttributeOptions.link}
      attribute={href}
      variant={ProfileAttributeVariant.PROFILE_LINK}
    />
  ));
}
