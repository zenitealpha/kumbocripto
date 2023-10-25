import Link from "next/link";
import React from "react";

export const SingleHero = () => {
  return (
    <>
      <div className="launchPadSingleHero">
        <div className="container launchPadSingleHeroFlex">
          <Link href={"/launchpad"}>
            <div className="launchPadSingleHeroTitle">
              <i className="fa-solid fa-chevron-left"></i>
              <h2>Homepage</h2>
            </div>
          </Link>

          {/* <Link href={"/launchpad"}>
            <div className="launchPadSingleHeroright">
              <h2>Launchpool</h2>
              <i className="fa-solid fa-chevron-right"></i>
            </div>
          </Link> */}
        </div>
      </div>

      <div className="launchPadSingleSectionTitle">
        <div className="container ">
          <h2>Binance Launchpad</h2>
          <p>A token launch platform for transformative projects.</p>
        </div>
      </div>
    </>
  );
};
