import { CSSTransition, TransitionGroup } from "react-transition-group";
import { InteractionSchemaType } from "@/schemas/Interaction";
import { PageNotFound } from "../Shared/PageNotFound";
import { ProfileCard } from "./ProfileCard";
import { ReadProfileSchemaType } from "@/schemas/Profile";
import { api } from "@/utils/api";
import { handleError } from "@/utils/handleError";
import { routes } from "@/globals/routes";
import { systemMessages } from "@/globals/systemMessages";
import { useRouter } from "next/router";
import React, { memo, useCallback, useState } from "react";

export type ProfileListProps = {
  profiles: ReadProfileSchemaType[];
};

export const ProfileList = memo(function ProfileList({
  profiles,
}: ProfileListProps) {
  const router = useRouter();
  const [profilesState, setProfilesState] = useState(profiles);
  const { mutateAsync } = api.interactions.create.useMutation();
  const destroy = useCallback(
    (profile: ReadProfileSchemaType) =>
      setProfilesState(profilesState.filter((p) => p !== profile)),
    [setProfilesState, profilesState]
  );
  const interact = useCallback(
    (interaction: InteractionSchemaType, profile: ReadProfileSchemaType) => {
      const isMatch = profile.likesYou;
      destroy(profile);
      return mutateAsync(interaction).then((result) => {
        if (!isMatch) return;
        const option = routes.messagesByConversationIdAsUsername(
          result?.id ?? "",
          profile.username
        );
        router
          .push(result?.id ? option.href : option.as, option.as)
          .catch(handleError);
      });
    },
    [destroy, mutateAsync, router]
  );

  if (!profiles || profiles.length === 0)
    return <PageNotFound error={systemMessages.NO_PROFILES} />;

  return (
    <TransitionGroup
      component="ul"
      className="flex w-full max-w-full flex-row flex-wrap items-center justify-center gap-6"
    >
      {profilesState.map((profile: ReadProfileSchemaType) => (
        <CSSTransition
          key={profile.userId}
          timeout={300}
          classNames="flex-none translate-x-full ease-i-out scale-0 opacity-0 transition-all delay-300"
        >
          <ProfileCard profile={profile} interact={interact} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
});
