import { routes } from "@/globals/routes";
import Link from "next/link";
import React from "react";

export function Footer() {
  return (
    <div className="bottom-0 flex h-footer w-full justify-center gap-2 border border-solid bg-background p-4 text-xs">
      <Link href={routes.termsAndConditions().href}>Terms and Conditions</Link>|
      <Link href={routes.privacyPolicy().href}>Privacy Policy</Link>|
      <Link href={routes.help().href}>Help</Link>
    </div>
  );
}
