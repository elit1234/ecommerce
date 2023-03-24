import { Link, Outlet, useLocation } from "@remix-run/react";

import type { LinksFunction, MetaFunction } from "@remix-run/node";

import adminStyles from "~/src/styles/admin/admin.css";
import categoryStyles from "~/src/styles/admin/categories.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: adminStyles },
  { rel: "stylesheet", href: categoryStyles },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: `STORENAME - Categories`,
  viewport: "width=device-width,initial-scale=1",
});

const AdminCategoriesLayout = () => {
  const { pathname } = useLocation();
  return (
    <>
      {!pathname.includes("/import") && !pathname.includes("/create") && (
        <div className="categories">
          <Link
            to="/admin/categories/home"
            className={`category ${
              pathname.startsWith("/admin/categories/home")
                ? "categoryActive"
                : ""
            }`}
          >
            Home Page
          </Link>
          <Link
            to="/admin/categories/all"
            className={`category ${
              pathname.startsWith("/admin/categories/all")
                ? "categoryActive"
                : ""
            }`}
          >
            All Categories
          </Link>
        </div>
      )}
      {pathname === "/admin/categories" ? (
        <>
          <p
            style={{
              padding: "0px 20px 30px 20px",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Select a category above.
          </p>
        </>
      ) : (
        (pathname === "/admin/categories/all" ||
          pathname === "/admin/categories/home") && (
          <p
            style={{
              padding: "0px 20px 30px 20px",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Re arrange the order with the arrows, or by dragging and dropping.
          </p>
        )
      )}
      <Outlet />
    </>
  );
};

export default AdminCategoriesLayout;
