import { Nav } from "@/components/Nav/Nav";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import React from "react";

export function NavView() {
  const { data: session } = useSession();
  // TODO: SSR? Errors in console. Does not refresh
  const hasProfile = api.users.readProfileByUserEmail.useQuery({
    email: session?.user?.email ?? "",
  }).data?.hasProfile;

  return <Nav isAuthed={!!session} isActiveUser={hasProfile} />;
}
