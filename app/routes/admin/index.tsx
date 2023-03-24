import type { LinksFunction } from "@remix-run/node";

import styles from "~/src/styles/admin/admin.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

const AdminRoute = () => {
  return (
    <div>
      <h1>Admin</h1>
    </div>
  );
};

export default AdminRoute;
