export type RouteOption = {
  href: string;
  as?: string;
  label?: string;
};

export const routes = {
  default: () => ({ href: "/" }),
  nowhere: (label?: string) => ({ href: "#", as: "", label: label }),
  circles: () => ({ href: "/circles", label: "Find Circles" }),
  newCircle: () => ({ href: "/new-circle", label: "Create a Circle" }),
  search: () => ({ href: "/search", label: "Date" }),
  matches: () => ({ href: "/matches", label: "Matches" }),
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
};
