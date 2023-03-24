import { useLocation } from "@remix-run/react";
import { toggleSidebar } from "./SideBar";
import UserProfile from "./UserProfile";

const AdminTopBar = () => {
  const userClickedMenu = () => {
    toggleSidebar();
  };

  const userClickedProfile = () => {
    const userProfile = document.querySelector(".userProfileDropdown");
    if (userProfile) {
      userProfile.classList.toggle("userProfileDropdown-open");
    }
  };

  let pageName = "Admin Panel";

  const { pathname } = useLocation();

  if (pathname.includes("/products")) pageName = "Products";
  else if (pathname.includes("/orders")) pageName = "Orders";
  else if (pathname.includes("/categories")) pageName = "Categories";

  return (
    <>
      <div className="topBar">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 38 31"
          onClick={() => userClickedMenu()}
          className="menuIcon"
        >
          <g stroke="#fff" strokeWidth="2">
            <path className="line2" d="M0 15L38 15"></path>
            <path className="line3" d="M0 30L38 30"></path>
            <path className="line1" d="M0 1L38 1"></path>
          </g>
        </svg>
        <div>{pageName}</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          onClick={() => userClickedProfile()}
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M11 14.062V20h2v-5.938c3.946.492 7 3.858 7 7.938H4a8.001 8.001 0 0 1 7-7.938zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6z" />
        </svg>
      </div>
      <UserProfile />
    </>
  );
};

export default AdminTopBar;
