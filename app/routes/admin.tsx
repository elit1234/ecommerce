import { Outlet, useLocation } from "@remix-run/react";
import AdminSideBar from "~/src/Components/Admin/SideBar";
import AdminTopBar from "~/src/Components/Admin/TopBar";

const AdminLayout = () => {
  const { pathname } = useLocation();

  return (
    <>
      {pathname.includes("/login") ? (
        <Outlet />
      ) : (
        <>
          <AdminTopBar />
          <AdminSideBar />
          <div className="adminPadding">
            <Outlet />
          </div>
        </>
      )}
    </>
  );
};

export default AdminLayout;
