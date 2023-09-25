import { handleError } from "@/utils/handleError";
import { signOut } from "next-auth/react";

export type RouteOption = {
  href: string;
  as?: string;
  label?: string;
  action?: () => void;
};

export const routes = {
  default: () => ({ href: "/" }),
  login: () => ({ href: "/login" }),
  signup: () => ({ href: "/sign-up" }),
  logout: () =>
    ({
      href: "/",
      label: "Logout",
      action: () => {
        signOut({ callbackUrl: "/" }).catch(handleError);
      },
    }) as RouteOption,
  newProfile: () => ({ href: "/new-profile" }),
  dashboard: () => ({ href: "/dashboard" }),
  nowhere: (label?: string) => ({ href: "#", as: "", label: label }),
  circles: () => ({ href: "/circles", label: "Find Circles" }),
  newCircle: () => ({ href: "/new-circle", label: "Create a Circle" }),
  search: () => ({ href: "/search", label: "Date" }),
  matches: () => ({ href: "/matches", label: "Inbox" }),
  manage: () => ({ href: "/manage", label: "Manage" }),
  blocked: () => ({
    href: "/matches?blocked=true",
    as: "/blocked",
    label: "Blocked",
  }),
  profileByUsername: (username: string) => ({
    href: `/profile/${username}`,
    label: "Profile",
  }),
  circleByCircleNameAsLabel: (circleName: string) => ({
    href: `/circle/${circleName}`,
    as: `/circle/${circleName.toLowerCase()}`,
  }),
  messagesByUsername: (username: string) => ({
    href: `/messages/${username}`,
    as: `/messages/${username}`,
  }),
  messagesByConversationIdAsUsername: (id: string, username: string) => ({
    href: `/messages/${username}?id=${id}`,
    as: `/messages/${username}`,
  }),
  uploadAvatar: (filename: string) => ({
    href: `/api/avatar/upload?filename=${filename}`,
  }),
  termsAndConditions: () => ({ href: "/terms-and-conditions" }),
  privacyPolicy: () => ({ href: "/privacy-policy" }),
  help: () => ({ href: "/help" }),
};
