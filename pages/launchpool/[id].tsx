import { Breadcrumb } from "components/Breadcrumb";
import { SingleLaunchPool } from "components/launchpad/SingleLaunchPool";
import React from "react";

export default function singleLaunchPoolPage() {
  return (
    <>
      <Breadcrumb leftButton={true} leftUrl="/launchpad" />
      <SingleLaunchPool />
    </>
  );
}
