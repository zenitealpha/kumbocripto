import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LaunchPad = ({ viewMore, data }: any) => {
  const { t } = useTranslation("common");
  return (
    <>
      <Link href={`/launchpad/subscription/${data?.id}`}>
        <div className="mt-3 mb-5 row launchpad-container">
          <div className="col-lg-4 col-12  mb-2">
            <img
              src={
                data?.image ? data?.image : "/binance-logo-6219389_960_720.webp"
              }
              alt=""
              className="launchpad-cover"
            />
          </div>
          <div className="col-lg-8 col-12 subscriptionRightContent">
            <div>
              <div className="status-launchpool">
                <p>{t("SUBSCRIPTION")}</p>
              </div>
              <h3 className="mt-1">{data?.title}</h3>
              <p>{data?.project_introduction}</p>

              <div className="row">
                <div className="col-lg-6 col-md-12 pool-row">
                  <p className="pool-title">{t("Tokens Offered:")}</p>
                  <p className="pool-value">
                    {parseFloat(data?.total_token_supply)}
                  </p>
                </div>
                <div className="col-lg-6 col-md-12 pool-row">
                  <p className="pool-title">{t("Participants:")}</p>
                  <p className="pool-value">{t("130,672")}</p>
                </div>{" "}
                <div className="col-lg-6 col-md-12 pool-row">
                  <p className="pool-title">{t("Sale Price:")}</p>
                  <p className="pool-value">{`1 ${
                    data?.coin_name
                  } = ${parseFloat(data?.coin_price).toFixed(2)} ${
                    data?.coin_type
                  }`}</p>
                </div>
                <div className="col-lg-6 col-md-12 pool-row">
                  <p className="pool-title">{t("Total committed:")}</p>
                  <p className="pool-value">{t("8,742,450.4131 BNB")}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-6 pool-row">
                  <p className="pool-title">{t("End time:")}</p>
                  <p className="pool-value">{data?.end_date}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {viewMore && (
        <div className="viewMoreLink">
          <Link href="/launchpad/view-all/lpd">
            <a>View more</a>
          </Link>
        </div>
      )}
    </>
  );
};

export default LaunchPad;
