import Footer from "components/common/footer";
import Hero from "components/launchpad/Hero";
import LaunchPad from "components/launchpad/LaunchPad";
import Launchpool from "components/launchpad/Launchpool";
import LaunchTop from "components/launchpad/LaunchTop";
import SellingSection from "components/launchpad/SellingSection";
import { GetServerSideProps } from "next";
import useTranslation from "next-translate/useTranslation";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { customPage, landingPage } from "service/landing-page";
import { getLaunchpadListAction } from "state/actions/launchpad";

const Index = ({ socialData, customPageData, copyright_text }: any) => {
  const { t } = useTranslation("common");
  const [launchpadList, setLaunchpadList]: any = useState([]);
  const [launchpadFeatureItem, setLaunchpadFeatureItem]: any = useState([]);
  const [aaaa, setaaaa]: any = useState(false);
  let hideSection = false;
  useEffect(() => {
    getLaunchpadListAction(setLaunchpadList, setLaunchpadFeatureItem);
  }, []);

  console.log(hideSection);
  return (
    <div>
      <div className="launchPad">
        <LaunchTop />
        <div className="launch-body container">
          <Hero />
          {launchpadFeatureItem.length > 0 && (
            <>
              <h2 className="mb-5">{t("Launchpad")}</h2>
              {launchpadFeatureItem.map((item: any, index: number) => (
                <LaunchPad
                  key={index}
                  viewMore={
                    launchpadFeatureItem?.length == index + 1 ? true : false
                  }
                  data={item}
                />
              ))}
            </>
          )}

          {/* <h2 className="mb-5">Launchpool</h2> */}
          {/* <Launchpool viewMore={true} /> */}
          <SellingSection />
        </div>
      </div>
      <Footer
        customPageData={customPageData}
        socialData={socialData}
        copyright_text={copyright_text}
      />
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const { data } = await landingPage();
  const cookies = parseCookies(ctx);
  const { data: customPageData } = await customPage();

  return {
    props: {
      landing: data,
      bannerListdata: data.banner_list,
      announcementListdata: data.announcement_list,
      socialData: data.media_list,
      featureListdata: data.feature_list,
      asset_coin_pairs: data.asset_coin_pairs,
      hourly_coin_pairs: data.hourly_coin_pairs,
      latest_coin_pairs: data.latest_coin_pairs,
      loggedin: cookies.token ? true : false,
      landing_banner_image: data?.landing_banner_image
        ? data?.landing_banner_image
        : null,
      copyright_text: data?.copyright_text,
      customPageData: customPageData.data,
    },
  };
};
export default Index;
