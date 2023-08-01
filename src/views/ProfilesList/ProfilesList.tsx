import { ProfileCard } from "./ProfileCard";
import { ProfileSchemaType } from "@/schemas/Profile";
import React from "react";

export type ProfileListProps = {
  profiles: ProfileSchemaType[];
};

export function ProfileList({ profiles }: ProfileListProps) {
  const profileComponents: React.JSX.Element[] = [];
  profiles.forEach((profile: ProfileSchemaType) => {
    return profileComponents.push(<ProfileCard profile={profile} />);
  });

  return profileComponents;
}
