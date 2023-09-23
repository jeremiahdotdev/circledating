import { RouteOption } from "@/globals/routes";
import Link from "next/link";
import React from "react";

export interface RouteOptionLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  option: RouteOption;
  children: React.ReactNode;
}

export const RouteOptionLink = React.forwardRef(
  (props: RouteOptionLinkProps, ref: React.ForwardedRef<HTMLAnchorElement>) => {
    return (
      <Link
        onClick={props.option.action}
        ref={ref}
        {...props}
        href={props.option.action ? "#" : props.option.href}
        as={props.option.as}
      >
        {props.children}
      </Link>
    );
  }
);
