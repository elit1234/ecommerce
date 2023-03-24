import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { PrismaClient } from "@prisma/client";
import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { handleSubmit } from "~/src/func/handleSubmit";

const AdminHomeCategoriesImport = () => {
  const data = useLoaderData();

  const [category, setCategory] = useState(-1);

  return (
    <Form
      method="post"
      onSubmit={(e) =>
        handleSubmit(e, "/admin/categories/home/import", "POST", category)
      }
    >
      <div className="categoriesList">
        {data &&
          data.categories &&
          data.categories.map((category: HomeCategory) => (
            <div
              key={category.id}
              className="categoryCat categoryCatLargeButton"
            >
              <div className="categoryCatName">{category.name}</div>
              <button
                className="categoryCatAddButton"
                type="submit"
                onClick={() => setCategory(category.id)}
              >
                Add to home
              </button>
            </div>
          ))}
      </div>
    </Form>
  );
};

export const loader: LoaderFunction = async () => {
  const client = new PrismaClient();

  const categories = await client.category.findMany({
    orderBy: {
      position: "asc",
    },
    where: {
      isHomePage: false,
    },
  });

  return {
    categories,
  };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.text();
  if (formData) {
    const categoryId = JSON.parse(formData);

    if (categoryId && Number(categoryId)) {
      const client = new PrismaClient();
      await client.category.update({
        where: {
          id: categoryId,
        },
        data: {
          isHomePage: true,
        },
      });
    }
  }
  return redirect("/admin/categories/home");
};

export default AdminHomeCategoriesImport;
