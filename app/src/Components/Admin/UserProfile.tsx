import { Link } from "@remix-run/react";

const UserProfile = () => {
  const usersName = "Eli Tuffley";
  return (
    <div className="userProfileDropdown">
      <Link to="/admin/profile">{usersName}</Link>
      <Link to="/logout">Logout</Link>
    </div>
  );
};

export default UserProfile;
