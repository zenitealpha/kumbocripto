import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React from "react";

const Hero = () => {
  const { t } = useTranslation("common");
  return (
    <section className="hero-banner-area-pool">
      <div className="row">
        <div className="col-md-5 mt-5">
          <h1 className="banner-title mb-2">
            {t("Launch a project on Tradexpro now!")}
          </h1>
          <p className="banner-content mb-2">
            {t(
              "Tradexpro Launchpad and Launchpool are platforms that help and advise project teams on how to best issue and launch their token.We provide a full service offering starting from advisory services"
            )}
          </p>
          <Link href="/launchpad/apply">
            <button className="primary-btn">{t("Apply to launch")}</button>
          </Link>
        </div>
        <div className="col-md-7">
          <img src="/altcoins-removebg-preview.png" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
