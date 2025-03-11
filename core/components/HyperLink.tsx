import Link from "next/link";

import React from "react";
import { HyperlinkTypes } from "./HyperLinkTypes";

//type CustLink = LinkProps & { children: React.ReactNode };
type LinkAdditionalProps = {
  rel?: string;
};

const hyperlinkClasses: Map<HyperlinkTypes, string> = new Map([
  [HyperlinkTypes.Link, "underline hover:text-body-100 transition-all duration-500 ease-in-out"],
  [
    HyperlinkTypes.Button,
    "relative inline-flex items-center justify-center rounded bg-primary-700 px-4 py-3 lg:py-2 font-medium leading-6 text-white shadow-sm hover:bg-primary-900 hover:shadow-lg focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-primary active:scale-95 active:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out",
  ],

  [
    HyperlinkTypes.Hollow,
    "inline-flex text-sm font-medium items-center justify-center px-4 py-2 border border-primary rounded bg-transparent ring-1 ring-primary ring-inset hover:bg-primary hover:text-white hover:shadow-md hover:ring-1 hover:ring-primary focus:outline-none focus:ring-1 focus:ring-primary active:ring-1 active:ring-primary transition duration-150 ease-in-out m-1 active:scale-95",
  ],
]);
export function Hyperlink(props: {
  href?: string | undefined | null;
  linkType?: HyperlinkTypes;
  className?: string;
  alt?: string;
  children: any;
}) {
  let linkClass = props.linkType
    ? hyperlinkClasses.get(props.linkType)
    : hyperlinkClasses.get(HyperlinkTypes.Link);
  const target = props?.href?.startsWith("http") ? "_blank" : "_self";
  const additionalProps: LinkAdditionalProps = {};

  if (target == "_blank") {
    additionalProps.rel = "noopener noreferrer";
  }

  return (
    <React.Fragment>
      {props.href && (
        <Link
          href={props.href}
          prefetch={false}
          className={linkClass + " " + props.className}
          {...additionalProps}
          target={target}
        >
          {props.children}
        </Link>
      )}
      {!props.href && <span className={props.className}>{props.children}</span>}
    </React.Fragment>
  );
}
