import { Breadcrumb } from "components/Breadcrumb";
import { SingleLaunchPad } from "components/launchpad/SingleLaunchPad";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getLaunchpadListDetailsAction } from "state/actions/launchpad";

export default function SingleLaunchPadPage() {
  const router = useRouter();
  const [launchpadListDetails, setLaunchpadListDetails]: any = useState([]);
  useEffect(() => {
    getLaunchpadListDetailsAction(setLaunchpadListDetails, router.query.id);
  }, []);

  return (
    <>
      <Breadcrumb leftButton={true} leftUrl="/launchpad" />
      <SingleLaunchPad data={launchpadListDetails?.data} />
    </>
  );
}
