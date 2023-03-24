import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

const Logout = () => {
  return <></>;
};

export default Logout;

export const loader: LoaderFunction = () => {
  return redirect("/admin/login");
};
