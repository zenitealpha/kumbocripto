import useTranslation from "next-translate/useTranslation";
import React from "react";

const LaunchTop = () => {
  const { t } = useTranslation("common");
  return (
    <div className="section-top-wrap mb-25 background-image-class">
      <div className="container">
        <div className="overview-area">
          <div className="overview-left ">
            <h1 className="big-top-title text-white">
              {t("Tradexpro Token Launch Platform")}
            </h1>
            <h4 className="blance-title text-white">
              {t("Buy or earn new tokens directly on Binance.")}
            </h4>
          </div>
        </div>
        <div className="row mt-3 ">
          <div className=" col-6 col-lg-3  mt-3 ">
            <h2 className="text-white">{t("$0")}</h2>
            <h5 className="blance-title mt-3 text-white">
              {t("Current Funds locked")}
            </h5>
          </div>
          <div className=" col-6 col-lg-3  mt-3 ">
            <h2 className="text-white">{t("$105,411,514")}</h2>
            <h5 className="blance-title mt-3 text-white">
              {t("Total Funds Raised")}
            </h5>
          </div>
          <div className=" col-6 col-lg-3  mt-3">
            <h2 className="text-white">{t("64")}</h2>
            <h5 className="blance-title mt-3 text-white">
              {t("Projects Launched")}
            </h5>
          </div>
          <div className=" col-6 col-lg-3  mt-3">
            <h2 className="text-white">{t("3,569,542")}</h2>
            <h5 className="blance-title mt-3 text-white">
              {t("All-time Unique Participants")}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchTop;
