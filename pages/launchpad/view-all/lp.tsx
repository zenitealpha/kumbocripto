import LaunchPad from "components/launchpad/LaunchPad";
import Launchpool from "components/launchpad/Launchpool";
import { SingleHero } from "components/launchpad/SingleHero";
import React from "react";

export default function viewAll() {
  return (
    <div>
      <SingleHero />
      <div className="container">
        <Launchpool />
        <Launchpool />
        <Launchpool />
        <Launchpool />
        <Launchpool />
      </div>
    </div>
  );
}
