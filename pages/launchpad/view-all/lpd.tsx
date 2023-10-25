import LaunchPad from "components/launchpad/LaunchPad";
import { SingleHero } from "components/launchpad/SingleHero";
import React, { useEffect, useState } from "react";
import { getLaunchpadListAction } from "state/actions/launchpad";

export default function ViewAll() {
  const [launchpadList, setLaunchpadList]: any = useState([]);
  const [launchpadFeatureItem, setLaunchpadFeatureItem]: any = useState([]);

  useEffect(() => {
    getLaunchpadListAction(setLaunchpadList, setLaunchpadFeatureItem);
  }, []);

  return (
    <div>
      {/* {JSON.stringify(launchpadList)} */}
      <SingleHero />
      <div className="container">
        {launchpadList?.data?.map((item: any, index: number) => (
          <LaunchPad data={item} key={index} />
        ))}
      </div>
    </div>
  );
}
