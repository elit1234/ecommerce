import { Link, useLocation } from "@remix-run/react";
import { useEffect } from "react";

export const toggleSidebar = () => {
  const sideBar = document.querySelector(".sideBar");
  if (sideBar) {
    sideBar.classList.toggle("sideBar-open");
  }

  const line1 = document.querySelector(".line1");
  const line2 = document.querySelector(".line2");
  const line3 = document.querySelector(".line3");

  if (line1 && line2 && line3) {
    line1.classList.toggle("line1-open");
    line2.classList.toggle("line2-open");
    line3.classList.toggle("line3-open");
  }
};

export const hideSidebar = () => {
  const sideBar = document.querySelector(".sideBar");
  if (sideBar) {
    sideBar.classList.remove("sideBar-open");
  }

  const line1 = document.querySelector(".line1");
  const line2 = document.querySelector(".line2");
  const line3 = document.querySelector(".line3");

  if (line1 && line2 && line3) {
    line1.classList.remove("line1-open");
    line2.classList.remove("line2-open");
    line3.classList.remove("line3-open");
  }
};

const AdminSideBar = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const sideBarOptions = document.querySelectorAll(".sideBarOption");
    sideBarOptions.forEach((option) => {
      option.addEventListener("click", () => {
        hideSidebar();
      });
    });

    return () => {
      sideBarOptions.forEach((option) => {
        option.removeEventListener("click", () => {
          hideSidebar();
        });
      });
    };
  }, []);
  return (
    <div className="sideBar">
      <Link
        to="/admin"
        className={`sideBarOption ${
          pathname === "/admin" ? "sideBarOptionActive" : ""
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zm-6-2h5V9.157l-6-5.454-6 5.454V19h5v-6h2v6z" />
        </svg>
        <div className="sidebarOptionName">Home</div>
      </Link>
      <Link
        to="/admin/products"
        className={`sideBarOption ${
          pathname.startsWith("/admin/products") ? "sideBarOptionActive" : ""
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
          <path d="M120 914V422q-14-2-27-20t-13-39V236q0-23 18-41.5t42-18.5h680q23 0 41.5 18.5T880 236v127q0 21-13 39t-27 20v492q0 23-18.5 42.5T780 976H180q-24 0-42-19.5T120 914Zm60-491v493h600V423H180Zm640-60V236H140v127h680ZM360 633h240v-60H360v60ZM180 916V423v493Z" />
        </svg>
        <div className="sidebarOptionName">Products</div>
      </Link>
      <Link
        to="/admin/categories"
        className={`sideBarOption ${
          pathname.startsWith("/admin/categories") ? "sideBarOptionActive" : ""
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M8 4h13v2H8V4zM4.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 6.9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" />
        </svg>
        <div className="sidebarOptionName">Categories</div>
      </Link>
      <Link
        to="/admin/settings"
        className={`sideBarOption ${
          pathname.startsWith("/admin/settings") ? "sideBarOptionActive" : ""
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M5.33 3.271a3.5 3.5 0 0 1 4.472 4.474L20.647 18.59l-2.122 2.121L7.68 9.867a3.5 3.5 0 0 1-4.472-4.474L5.444 7.63a1.5 1.5 0 1 0 2.121-2.121L5.329 3.27zm10.367 1.884l3.182-1.768 1.414 1.414-1.768 3.182-1.768.354-2.12 2.121-1.415-1.414 2.121-2.121.354-1.768zm-7.071 7.778l2.121 2.122-4.95 4.95A1.5 1.5 0 0 1 3.58 17.99l.097-.107 4.95-4.95z" />
        </svg>
        <div className="sidebarOptionName">Settings</div>
      </Link>
      <Link
        to="/admin/staff"
        className={`sideBarOption ${
          pathname.startsWith("/admin/staff") ? "sideBarOptionActive" : ""
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M4 22a8 8 0 1 1 16 0H4zm9-5.917V20h4.659A6.009 6.009 0 0 0 13 16.083zM11 20v-3.917A6.009 6.009 0 0 0 6.341 20H11zm1-7c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
        </svg>
        <div className="sidebarOptionName">Staff</div>
      </Link>
      <Link
        to="/admin/customers"
        className={`sideBarOption ${
          pathname.startsWith("/admin/customers") ? "sideBarOptionActive" : ""
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-5-8h2a3 3 0 0 0 6 0h2a5 5 0 0 1-10 0z" />
        </svg>

        <div className="sidebarOptionName">Customers</div>
      </Link>
    </div>
  );
};

export default AdminSideBar;
