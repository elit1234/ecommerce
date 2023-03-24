import { LinksFunction, redirect } from "@remix-run/node";
import {
  Link,
  PrefetchPageLinks,
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
} from "@remix-run/react";

import styles from "~/src/styles/home.css";
import { useEffect, useRef } from "react";
export function loader() {
  return {
    WEBSITE_NAME: process.env.WEBSITE_NAME,
  };
}

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export default function Index() {
  const data = useLoaderData();
  const siteName = data && data.WEBSITE_NAME ? data.WEBSITE_NAME : "Remix";

  const words: string[] = siteName.match(/[A-Z][a-z]*/g);

  const storeLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const link = storeLinkRef.current;
    if (link) {
      window.location.pathname = "/store";
    }
  }, [storeLinkRef]);

  return (
    <div className="container">
      <h1>
        {words[0]}
        <span>{words[1]}</span>
      </h1>
      <Link to="/store" prefetch="render" ref={storeLinkRef} hidden={true}>
        Store
      </Link>
    </div>
  );
}
