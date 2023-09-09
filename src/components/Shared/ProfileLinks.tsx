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
  return (
    <div className="flex w-full flex-row flex-wrap items-center justify-center gap-0">
      {links.map(({ href, id }) => (
        <ProfileAttribute
          key={id}
          option={ProfileAttributeOptions.link}
          attribute={href}
          variant={ProfileAttributeVariant.PROFILE_LINK}
        />
      ))}
    </div>
  );
}
