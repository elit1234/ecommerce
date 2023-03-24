import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import type { Category, Item } from ".prisma/client";
import { PrismaClient } from ".prisma/client";
import { Link, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import PageDots from "~/src/Components/PageDots";

import styles from "~/src/styles/store.css";
import BottomArea from "~/src/Components/BottomArea";
import TopArea from "~/src/Components/TopArea";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const loader: LoaderFunction = async () => {
  const client = new PrismaClient();
  const bestDealItems = await client.item.findMany({
    where: {
      isFeatured: true,
    },
  });

  const homeCategories = await client.category.findMany({
    where: {
      isHomePage: true,
    },
    orderBy: {
      homePagePosition: "asc",
    },
  });

  const homeCategoryItems = await client.item.findMany({
    where: {
      categoryIds: {
        hasSome: homeCategories.map((category) => category.id),
      },
    },
  });

  return {
    bestDealItems,
    homeCategories,
    homeCategoryItems,
  };
};

const ViewingStore = () => {
  const [bestDealsActive, setBestDealsActive] = useState(1);

  const loaderData = useLoaderData();

  const bestDealItems: Item[] = loaderData.bestDealItems;
  const homeCategoryItems: Item[] = loaderData.homeCategoryItems;
  const homeCategories: Category[] = loaderData.homeCategories;

  // Handling PageDots. This is a bit of a hack and should be handled inside PageDots, but it works for now.
  useEffect(() => {
    let timer: any = null;
    const bestDealsOverflow = document.querySelector(".bestDealsOverflow");
    if (!bestDealsOverflow) return;
    bestDealsOverflow.addEventListener(
      "scroll",
      function () {
        if (timer !== null) {
          clearTimeout(timer);
        }
        timer = setTimeout(function () {
          const scrolledLeft = bestDealsOverflow.scrollLeft;
          const width = bestDealsOverflow.clientWidth;
          const currentPage = Math.ceil((scrolledLeft + 1) / width);
          setBestDealsActive(currentPage);
        }, 50);
      },
      false
    );
  }, []);

  return (
    <>
      <TopArea />
      <div className="container">
        {bestDealItems && bestDealItems.length > 0 && (
          <div className="bestDeals">
            <div className="areaTitleRow">
              <div className="areaTitle">Best Deals</div>
              <div>ICON HERE</div>
            </div>
            <div className="bestDealsOverflow">
              {bestDealItems &&
                bestDealItems.map((bestDeal, key) => (
                  <div className="bestDeal" key={key}>
                    <div className="bestDealImageWrapper">
                      <img src={bestDeal.image} alt="" />
                      <div className="bestDealTextOverlay">
                        <h3>{bestDeal.name}</h3>
                        <div>{bestDeal.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <PageDots active={bestDealsActive} total={bestDealItems?.length} />
          </div>
        )}
        {homeCategories && (
          <div className="homeCategories">
            {homeCategories.map((homeCategory, key) => {
              return (
                <div className="homeCategoryArea" key={key}>
                  <div className="areaTitleRow">
                    <div className="areaTitle">{homeCategory.name}</div>
                    <div>ICON HERE</div>
                  </div>
                  <div className="homeCategoryAreaOverflow">
                    {homeCategoryItems &&
                      homeCategoryItems
                        .filter((item) => {
                          return item.categoryIds.includes(homeCategory.id);
                        })
                        .map((item, key) => {
                          return (
                            <Link
                              to={`/store/item/${item.id}`}
                              className="homeCategory"
                              key={key}
                            >
                              <div className="homeCategoryPicture">
                                <img src={item.image} alt="" />
                              </div>
                              <p>{item.name}</p>
                            </Link>
                          );
                        })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="areaTitleRow">
          <div className="areaTitle">All items</div>
          <Link to="/store/all">View All</Link>
        </div>
      </div>
      <BottomArea />
    </>
  );
};

export default ViewingStore;
