import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import type { FormEvent } from "react";
import { PrismaClient } from "@prisma/client";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";

const AdminHomeCategories = () => {
  const data = useLoaderData();

  const [categories, setCategories] = useState<HomeCategory[]>(data.categories);

  const userClickedRemove = (key: number) => {
    const newArray = [...categories];
    const index = newArray.findIndex((item) => item.id === key);
    newArray.splice(index, 1);
    setCategories(newArray);
  };

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
    fetch("/admin/categories/home", { body, method: "POST" });
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
          categories.map((category, key) => {
            return (
              <div
                className="categoryCat categoryCatTwoIcon"
                key={key}
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="categoryCatRemoveIcon"
                  onClick={() => userClickedRemove(category.id)}
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-11.414L9.172 7.757 7.757 9.172 10.586 12l-2.829 2.828 1.415 1.415L12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415L12 10.586z" />
                </svg>
              </div>
            );
          })}
      </div>
      <Link to="/admin/categories/home/import">Add to homepage</Link>
      {categories && data.categories && data.categories !== categories && (
        <>
          <Form method="post" onSubmit={handleSubmit}>
            <button type="submit">Save Changes</button>
            <button onClick={() => setCategories(data.categories)}>
              Cancel Changes
            </button>
          </Form>
        </>
      )}
    </>
  );
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.text();
  if (formData) {
    const categories = JSON.parse(formData);
    const client = new PrismaClient();

    const oldCategories = await client.category.findMany();
    oldCategories.forEach(async (oldCat) => {
      const found = categories.find(
        (cat: HomeCategory) => cat.id === oldCat.id
      );
      if (!found) {
        await client.category.update({
          where: {
            id: oldCat.id,
          },
          data: {
            isHomePage: false,
            homePagePosition: -1,
          },
        });
      }
    });

    //Now we have removed the categories that are no longer on the homepage, lets get the new position of the new ones.
    categories.forEach(async (cat: HomeCategory, index: number) => {
      await client.category.update({
        where: {
          id: cat.id,
        },
        data: {
          isHomePage: true,
          homePagePosition: index,
        },
      });
    });
  }

  return redirect("/admin/categories/home", {
    status: 200,
  });
};

export const loader: LoaderFunction = async () => {
  const client = new PrismaClient();

  const categories = await client.category.findMany({
    orderBy: {
      homePagePosition: "asc",
    },
    where: {
      isHomePage: true,
    },
  });

  return {
    categories,
  };
};

export default AdminHomeCategories;
