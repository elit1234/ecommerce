import type { LinksFunction } from "@remix-run/node";
import BottomArea from "~/src/Components/BottomArea";
import TopArea from "~/src/Components/TopArea";
import styles from "~/src/styles/store.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

const StoreViewAll = () => {
  const items = [
    {
      name: "First item",
      image: "/img/store/food.webp",
    },
    {
      name: "Second item",
      image: "/img/store/food.webp",
    },
    {
      name: "Third item",
      image: "/img/store/food.webp",
    },
    {
      name: "Fourth item",
      image: "/img/store/food.webp",
    },
  ];

  return (
    <div className="container">
      <TopArea />
      <div className="allItems">
        {items &&
          items.map((item, key) => {
            return (
              <div className="allItem" key={key}>
                <div
                  className={`allItemInner ${
                    key === 0 ? "allItemInnerLarge" : ""
                  }`}
                >
                  <img src={item.image} alt={item.name} />
                  {item.name}
                </div>
              </div>
            );
          })}
      </div>
      <BottomArea />
    </div>
  );
};

export default StoreViewAll;
