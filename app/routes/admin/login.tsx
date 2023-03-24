import type { ActionFunction, LinksFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import { Form, useActionData } from "@remix-run/react";
import { handleSubmit } from "~/src/func/handleSubmit";
import styles from "~/src/styles/admin/login.css";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

const AdminLogin = () => {
  const action = useActionData();

  console.log(action);

  return (
    <Form
      className="container"
      onSubmit={(e) => handleSubmit(e, "/admin/login", "POST")}
      method="post"
    >
      <h1>Login</h1>
      <div className="inputWrapper">
        <label htmlFor="email">Email</label>
        <div
          className={
            action?.errors?.email ? "inputOuter inputOuterError" : "inputOuter"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm9.06 8.683L5.648 6.238 4.353 7.762l7.72 6.555 7.581-6.56-1.308-1.513-6.285 5.439z" />
          </svg>
          <input type="email" placeholder="example@email.com" name="email" />
        </div>
      </div>
      <div className="inputWrapper">
        <label htmlFor="password">Password</label>
        <div
          className={
            action?.errors?.password
              ? "inputOuter inputOuterError"
              : "inputOuter"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M19 10h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h1V9a7 7 0 1 1 14 0v1zm-2 0V9A5 5 0 0 0 7 9v1h10zm-6 4v4h2v-4h-2z" />
          </svg>
          <input type="password" placeholder="*******" name="password" />
        </div>
      </div>
      <button type="submit">Log In</button>
    </Form>
  );
};

//Handle Login post request
export const action: ActionFunction = async ({ request }) => {
  let errors = {
    email: true,
    password: true,
  };
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || email.length < 3) errors.email = true;
  else errors.email = false;
  if (!password || password.length < 3) errors.password = true;
  else errors.password = false;

  if (Object.values(errors).some(Boolean)) {
    const values = Object.fromEntries(formData);
    return json({ errors, values });
  } else {
    return redirect("/admin");
  }
};

export default AdminLogin;
