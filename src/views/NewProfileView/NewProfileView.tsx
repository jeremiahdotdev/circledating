import { NewProfileWithCircle } from "@/components/NewProfile/NewProfileWithCircle";
import { NewProfileWithoutCircle } from "@/components/NewProfile/NewProfileWithoutCircle";
import { memo } from "react";
import { routerQueryAttributeToString } from "@/utils/routerQueryAttributeToString";
import { useRouter } from "next/router";
import React from "react";

export type NewProfileViewProps = Record<never, never>;

export const NewProfileView: React.FC<NewProfileViewProps> = memo(() => {
  const router = useRouter();
  const circleCode = routerQueryAttributeToString(router.query.code);

  return circleCode ? (
    <NewProfileWithCircle circleCode={circleCode} />
  ) : (
    <NewProfileWithoutCircle />
  );
});
