import { Loading } from "@/components/Shared/Loading";
import { Profile } from "@/components/Profile/Profile";
import { api } from "@/utils/api";
import { memo } from "react";
import { routerQueryAttributeToString } from "@/utils/routerQueryAttributeToString";
import { useRouter } from "next/router";
import React from "react";

export type ProfileViewProps = Record<never, never>;

export const ProfileView: React.FC<ProfileViewProps> = memo(() => {
  const router = useRouter();
  const user = routerQueryAttributeToString(router.query.user);

  const request = api.profiles.read.useQuery({
    username: user,
  });

  if (!request.data) return <Loading />;

  // TODO: check auth
  return <Profile profile={request.data} canEdit={true} />;
});
