import type { LinksFunction } from "@remix-run/node";
import styles from "~/src/styles/admin/admin.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

const AdminCustomersRoute = () => {
  return (
    <>
      <p>Admin - Customers </p>
    </>
  );
};

export default AdminCustomersRoute;
