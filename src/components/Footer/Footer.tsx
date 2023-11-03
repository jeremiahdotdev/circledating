import { routes } from "@/globals/routes";
import Link from "next/link";
import React from "react";

export function Footer() {
  return (
    <div className="flex h-footer w-full justify-center gap-2 border border-solid p-4 text-xs">
      <Link href={routes.termsAndConditions().href}>Terms and Conditions</Link>|
      <Link href={routes.privacyPolicy().href}>Privacy Policy</Link>|
      <Link href={routes.help().href}>Help</Link>
    </div>
  );
}
