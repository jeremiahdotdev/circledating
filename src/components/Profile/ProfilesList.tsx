import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Infographic } from "../Shared/Infographic";
import { InteractionSchemaType } from "@/schemas/Interaction";
import { Loading } from "../Shared/Loading";
import { ProfileCard } from "./ProfileCard";
import { ReadProfileSchemaType } from "@/schemas/Profile";
import { api } from "@/utils/api";
import { handleError } from "@/utils/handleError";
import { routes } from "@/globals/routes";
import { systemMessages } from "@/globals/systemMessages";
import { useRouter } from "next/router";
import React, { memo, useCallback, useState } from "react";

export const ProfileList = memo(function ProfileList() {
  const router = useRouter();
  const profiles = api.profiles.readProfiles.useQuery().data ?? [];
  const [profilesState, setProfilesState] =
    useState<ReadProfileSchemaType[]>(profiles);
  const { mutateAsync: apiInteract } = api.interactions.create.useMutation();
  const { mutateAsync: apiRead } =
    api.profiles.readProfilesByNumber.useMutation();

  const destroy = useCallback(
    (profile: ReadProfileSchemaType) =>
      setProfilesState(profilesState.filter((p) => p !== profile)),
    [setProfilesState, profilesState]
  );
  const add = useCallback(async () => {
    const profileToAdd = await apiRead(10 - profilesState.length);
    if (!profileToAdd) return;
    setProfilesState([...profilesState, ...profileToAdd]);
  }, [apiRead, setProfilesState, profilesState]);
  const interact = useCallback(
    async (
      interaction: InteractionSchemaType,
      profile: ReadProfileSchemaType
    ) => {
      destroy(profile);
      add().catch(handleError);
      const result = await apiInteract(interaction);
      if (!profile.likesYou) return;
      const option = routes.messagesByConversationIdAsUsername(
        result?.id ?? "",
        profile.username
      );
      router
        .push(result?.id ? option.href : option.as, option.as)
        .catch(handleError);
    },
    [destroy, add, apiInteract, router]
  );

  if (!profiles) return <Loading />;

  if (profiles.length === 0)
    return <Infographic message={systemMessages.NO_PROFILES} />;

  return (
    <TransitionGroup
      component="ul"
      className="flex min-h-window w-full max-w-full flex-row flex-wrap items-center justify-center gap-6"
    >
      {profilesState
        .slice(0, 6 < profilesState.length ? 6 : profilesState.length)
        .map((profile: ReadProfileSchemaType) => (
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
