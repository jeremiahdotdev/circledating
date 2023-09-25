import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import React from "react";

export function NavActivePageHeader() {
  const router = useRouter();
  const user = router.query.user;

  return (
    <h2 className="flex self-center text-lg">
      {!user &&
        router.pathname
          .split("/")[1]
          .split("-")
          .reduce((word: string, path: string) => {
            return cn(
              word.charAt(0).toUpperCase() + word.substring(1),
              path.charAt(0).toUpperCase() + path.substring(1)
            );
          }, "")}
      {user && user.toString()}
    </h2>
  );
}
