import { InteractionSchemaType } from "@/schemas/Interaction";
import { Profile } from "./Profile";
import { ProfileSchemaType } from "@/schemas/Profile";
import { cn } from "@/lib/utils";
import React, { useMemo } from "react";
import state from "@/utils/user.store";

export type ProfileCardProps = {
  profile: ProfileSchemaType;
  interact: (
    interaction: InteractionSchemaType,
    profile: ProfileSchemaType
  ) => void;
};

function IsProfilePerfectMatch(profile: ProfileSchemaType) {
  if (profile.religion !== state.currentUser.religion) return false;
  if (profile.drinking !== state.currentUser.drinking) return false;
  if (profile.activity !== state.currentUser.activity) return false;
  if (profile.children !== state.currentUser.children) return false;
  if (profile.income !== state.currentUser.income) return false;
  if (profile.maritalStatus !== state.currentUser.maritalStatus) return false;
  if (profile.purity !== state.currentUser.purity) return false;
  if (profile.politicalBeliefs !== state.currentUser.politicalBeliefs)
    return false;

  return true;
}

export function ProfileCard({ profile, interact }: ProfileCardProps) {
  const isProfilePerfectMatch = useMemo(() => {
    return IsProfilePerfectMatch(profile);
  }, [profile]);

  return (
    <div>
      <em className="bg-gradient-to-r from-cyan-400 to-fuchsia-300 bg-clip-text font-extrabold text-transparent">
        {isProfilePerfectMatch && "Perfect Match"}&nbsp;
      </em>
      <div
        className={cn(
          "flex h-full max-w-3xl flex-col rounded-md shadow-outter-soft bg-background p-3 ",
          isProfilePerfectMatch
            ? "bg-gradient-to-r from-cyan-100 to-fuchsia-100"
            : ""
        )}
      >
        <Profile profile={profile} interact={interact} />
      </div>
    </div>
  );
}
