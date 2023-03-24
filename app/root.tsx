import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "@remix-run/react";
import Nprogress from "nprogress";
import nprogressStyles from "~/src/styles/nprogress.css";
import { useEffect } from "react";

import globalStyles from "~/src/styles/global.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: globalStyles,
  },
  {
    rel: "stylesheet",
    href: nprogressStyles,
  },
];

export default function App() {
  const transition = useNavigation();

  useEffect(() => {
    if (transition.state === "loading" || transition.state === "submitting")
      Nprogress.start();
    else Nprogress.done();
  }, [transition.state]);
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
