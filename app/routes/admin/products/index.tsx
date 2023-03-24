import type { LinksFunction } from "@remix-run/node";
import styles from "~/src/styles/admin/admin.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

const AdminProducts = () => {
  return (
    <>
      <p>Admin Products here</p>
    </>
  );
};

export default AdminProducts;
