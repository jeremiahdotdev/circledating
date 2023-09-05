export type RouteOption = {
  href: string;
  as?: string;
  label?: string;
};

export const routes = {
  default: () => ({ href: "/" }),
  nowhere: (label?: string) => ({ href: "#", as: "", label: label }),
  circles: () => ({ href: "/circles", label: "Circles" }),
  search: () => ({ href: "/search", label: "Profiles" }),
  matches: () => ({ href: "/matches", label: "Matched" }),
  blocked: () => ({
    href: "/matches?blocked=true",
    as: "/blocked",
    label: "Blocked",
  }),
  profileByUsername: (username: string) => ({
    href: `/profile/${username}`,
    label: "Profile",
  }),
  circleByCircleName: (circleName: string) => ({
    href: `/circle/${circleName}`,
    as: `/circle/${circleName}`,
  }),
  messagesByConversationIdAsUsername: (id: string, username: string) => ({
    href: `/messages/${username}?id=${id}`,
    as: `/messages/${username}`,
  }),
};
