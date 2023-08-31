import { CSSTransition, TransitionGroup } from "react-transition-group";
import { InteractionSchemaType } from "@/schemas/Interaction";
import { ProfileCard } from "./ProfileCard";
import { ProfileSchemaType } from "@/schemas/Profile";
import { api } from "@/utils/api";
import React, { memo, useCallback, useState } from "react";

export type ProfileListProps = {
  profiles: ProfileSchemaType[];
};

export const ProfileList = memo(function ProfileList({
  profiles,
}: ProfileListProps) {
  const [profilesState, setProfilesState] = useState(profiles);
  const { mutateAsync } = api.interactions.create.useMutation();
  const destroy = useCallback(
    (profile: ProfileSchemaType) =>
      setProfilesState(profilesState.filter((p) => p !== profile)),
    [setProfilesState, profilesState]
  );
  const interact = useCallback(
    (interaction: InteractionSchemaType, profile: ProfileSchemaType) => {
      destroy(profile);
      mutateAsync({
        interaction: interaction,
      }).catch((error) => console.log(error));
    },
    [destroy, mutateAsync]
  );

  if (profiles.length === 0) return <div>No profiles found</div>;

  return (
    <div className="flex w-full max-w-full flex-row flex-wrap items-center justify-center gap-6">
      <TransitionGroup component="ul">
        {profilesState.map((profile: ProfileSchemaType) => (
          <CSSTransition
            key={profile.userId}
            timeout={300}
            classNames="flex-none translate-x-full ease-i-out scale-0 opacity-0 transition-all delay-300"
          >
            <ProfileCard profile={profile} interact={interact} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
});
