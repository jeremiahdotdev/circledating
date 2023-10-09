import { AppRouterCaller } from "@/server/api/root";

export const getLayoutArgs = (caller: AppRouterCaller) => {
  return [
    caller.users.stats(),
    caller.preferences.read(),
    caller.profiles.readProfiles(),
  ];
};
