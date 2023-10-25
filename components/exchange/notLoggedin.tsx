import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React from "react";

const NotLoggedin = () => {
  const { t } = useTranslation("common");
  return (
    <div className="notLoggedin">
      <Link href="/authentication/signin">
        <span className="colorTheme mr-2">{t("Login")} </span>
      </Link>
      {t("or")}{" "}
      <Link href="/authentication/signup">
        <span className="colorTheme ml-2 mr-2"> {t("Sign up")}</span>
      </Link>
      {t("to trade")}
    </div>
  );
};

export default NotLoggedin;
