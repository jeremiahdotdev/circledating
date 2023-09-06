import { Loading } from "@/components/Shared/Loading";
import { Profile } from "@/components/Profile/Profile";
import { ProfileSchemaType, ReadProfileSchemaType } from "@/schemas/Profile";
import { api } from "@/utils/api";
import { isUrl } from "@/schemas/Link";
import { memo } from "react";
import { routerQueryAttributeToString } from "@/utils/routerQueryAttributeToString";
import { useRouter } from "next/router";
import React from "react";

export type ProfileViewProps = Record<never, never>;

export const ProfileView: React.FC<ProfileViewProps> = memo(() => {
  const router = useRouter();
  const user = routerQueryAttributeToString(router.query.user);
  const options: ReadProfileSchemaType = {
    username: user,
  };
  const request = api.profiles.read.useQuery(options);

  if (!request.data) return <Loading />;
  const profile = {
    ...request.data,
    bio: request.data.bio ?? "",
    circles: request.data.circles.map((circle) => circle.Circle),
    interactions: null,
    links: request.data.links.map((link) =>
      isUrl(link.href) ? link : { ...link, href: `https://${link.href}` }
    ),
  } as ProfileSchemaType;

  return (
    <main className="mx-auto flex min-h-navless max-w-screen-lg flex-col items-center justify-between pt-6">
      <Profile profile={profile} />
    </main>
  );
});
