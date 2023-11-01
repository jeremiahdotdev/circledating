import { RouteOptionLink } from "@/utils/RouteOptionLink";
import { routes } from "./routes";
import React from "react";

export type SystemMessageType = {
  message: string;
  tooltip?: string;
};

export function getSystemMessage(
  message: string,
  tooltip?: string
): SystemMessageType {
  return {
    message: message,
    tooltip: tooltip,
  };
}

export const systemMessages = {
  GETTING_STARTED: (
    <p>
      Welcome! To get started,&nbsp;
      <RouteOptionLink
        option={routes.circles()}
        className="underline hover:text-purple-600"
      >
        add a circle
      </RouteOptionLink>
      &nbsp;and then&nbsp;
      <RouteOptionLink
        option={routes.search()}
        className="underline hover:text-purple-600"
      >
        start searching!
      </RouteOptionLink>
    </p>
  ),
  NO_PROFILES: "Nothing to show yet...",
  NO_MATCHES: "Nothing to show yet...",
  INITIAL_MESSAGE: "You matched! Go ahead and send a message!",
  CONFIRM_ACTION_TITLE: "Are you sure?",
  CONFIRM_ACTION_DESCRIPTION: "This action cannot be undone.",
  NEW_CIRCLE_DESCRIPTION: "This is the begninning of a new Circle.",
  CREATE_CIRCLE_DESCRIPTION:
    "Restrict circle members to those with the below traits. A blank answer will be treated as accepting of all values. Note: Admistrators are exempt from trait rules.",
  NO_PROFILE: "No profile was found for this user.",
  SIGN_UP: { message: "- Sign Up -", tooltip: "Go to sign up page" },
  LOGIN: { message: "- Login -", tooltip: "Go to login page" },
  DATING_HINTS: ["Real talk: Coffee or tea?"],
  CIRCLE_BUSINESS_CARD: (circleName: string) => (
    <>
      Sign up now to date within
      <i>
        <b>&nbsp;{circleName}</b>
      </i>
      .
    </>
  ),
};
