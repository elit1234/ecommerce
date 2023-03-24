import type { FormEvent } from "react";

export async function handleSubmit(
  event: FormEvent<HTMLFormElement>,
  to: string,
  method: "POST",
  data: any
) {
  let body: any;
  if (!data) body = new FormData(event.currentTarget);
  else body = data;
  await fetch(to, { body, method: method });
}
