import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import type { FormEvent } from "react";

import { PrismaClient } from "@prisma/client";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";

const AdminAllCategories = () => {
  const data = useLoaderData();

  const [categories, setCategories] = useState<HomeCategory[]>(data.categories);

  function userClickedDown(key: number) {
    const newArray = [...categories];
    const index = newArray.findIndex((item) => item.id === key);

    if (index < newArray.length - 1) {
      [newArray[index], newArray[index + 1]] = [
        newArray[index + 1],
        newArray[index],
      ];
      setCategories(newArray);
    }
  }
  function userClickedUp(key: number) {
    const index = categories.findIndex((item) => item.id === key);
    if (index > 0) {
      const newArray = [...categories];
      [newArray[index - 1], newArray[index]] = [
        newArray[index],
        newArray[index - 1],
      ];

      setCategories(newArray);
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    let body = JSON.stringify(categories);
    fetch("/admin/categories/all", { body, method: "POST" });
  };

  const [draggedItemId, setDraggedItemId] = useState<number | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    itemId: number
  ) => {
    e.dataTransfer.effectAllowed = "move";
    setDraggedItemId(itemId);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    itemId: number
  ) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (
    e: React.DragEvent<HTMLDivElement>,
    itemId: number
  ) => {
    e.preventDefault();
    if (itemId !== draggedItemId) {
      const itemIndex = categories.findIndex((item) => item.id === itemId);
      const draggedItemIndex = categories.findIndex(
        (item) => item.id === draggedItemId
      );
      const newCategories = [...categories];
      newCategories.splice(
        itemIndex,
        0,
        newCategories.splice(draggedItemIndex, 1)[0]
      );
      setCategories(newCategories);
      setDraggedItemId(itemId);
    }
  };

  const handleDragEnd = () => {
    setDraggedItemId(null);
  };

  return (
    <>
      <div className="categoriesList">
        {categories &&
          categories.map((category, index) => {
            return (
              <div
                key={index}
                className="categoryCat"
                draggable
                onDragStart={(e) => handleDragStart(e, category.id)}
                onDragOver={(e) => handleDragOver(e, category.id)}
                onDragEnter={(e) => handleDragEnter(e, category.id)}
                onDragEnd={handleDragEnd}
              >
                <div className="categoryCatName">{category.name}</div>
                <div className="categoryCatButtons">
                  <div
                    className={`upArrow ${
                      categories[0].id === category.id ? "arrowDisabled" : ""
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      onClick={() => userClickedUp(category.id)}
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm1 10h3l-4-4-4 4h3v4h2v-4z" />
                    </svg>{" "}
                  </div>
                  <div className="downArrow">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      onClick={() => userClickedDown(category.id)}
                      height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm1 10V8h-2v4H8l4 4 4-4h-3z" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        <Link to="/admin/categories/all/create" className="categoryCat">
          <div className="categoryCatName">Create New Category</div>
        </Link>
      </div>

      {categories !== data.categories && (
        <Form method="post" onSubmit={handleSubmit}>
          <button type="submit">Save Changes</button>
          <button
            onClick={() => {
              setCategories(data?.categories);
            }}
          >
            Cancel Changes
          </button>
        </Form>
      )}
    </>
  );
};

export const loader: LoaderFunction = async () => {
  const client = new PrismaClient();

  const categories = await client.category.findMany({
    orderBy: {
      position: "asc",
    },
  });

  return {
    categories,
  };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.text();

  if (formData) {
    const categories = JSON.parse(formData);
    if (categories && categories.length > 0) {
      let newCats: HomeCategory[] = [...categories];
      const client = new PrismaClient();
      newCats.forEach(async (cat: HomeCategory, index: number) => {
        cat.position = index;
        await client.category.update({
          where: {
            id: cat.id,
          },
          data: {
            position: cat.position,
          },
        });
      });
    }
  }

  return true;
};

export default AdminAllCategories;
