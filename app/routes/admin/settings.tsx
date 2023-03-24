import type { LinksFunction } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";

import styles from "~/src/styles/admin/admin.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

const AdminSettingsRoute = () => {
  return (
    <div>
      <Link to="/admin/settings">Settings Home</Link>
      <Link to="/admin/settings/site">Site Settings</Link>
      <Outlet />
    </div>
  );
};

export default AdminSettingsRoute;
