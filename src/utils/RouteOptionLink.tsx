import { RouteOption } from "@/globals/routes";
import Link from "next/link";
import React from "react";

export interface RouteOptionLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  option: RouteOption;
  children: React.ReactNode;
}

export function RouteOptionLink(props: RouteOptionLinkProps) {
  return (
    <Link {...props} href={props.option.href} as={props.option.as}>
      {props.children}
    </Link>
  );
}
