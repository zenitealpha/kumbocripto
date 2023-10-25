import BankDeposit from "components/deposit/bank-deposit";
import WalletDeposit from "components/deposit/wallet-deposit";
import StripeDeposit from "components/deposit/stripe-deposit";
import {
  BANK_DEPOSIT,
  FAQ_TYPE_DEPOSIT,
  PAYPAL,
  STRIPE,
  WALLET_DEPOSIT,
} from "helpers/core-constants";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { currencyDeposit } from "service/deposit";
import SelectDeposit from "components/deposit/selectDeposit";
import DepositFaq from "components/deposit/DepositFaq";
import PaypalSection from "components/deposit/PaypalSection";
import ScaletonLoading from "components/common/ScaletonLoading";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
import { useRouter } from "next/router";
import { getFaqList } from "service/faq";
import { GetServerSideProps } from "next";
import {
  pageAvailabilityCheck,
  SSRAuthCheck,
} from "middlewares/ssr-authentication-check";
import { parseCookies } from "nookies";
import { GetUserInfoByTokenServer } from "service/user";
import { redirect } from "next/dist/server/api-utils";
import Footer from "components/common/footer";
import { commomSettings, customPage, landingPage } from "service/landing-page";
import FiatSidebar from "layout/fiat-sidebar";

const Deposit = ({ customPageData, socialData, copyright_text }: any) => {
  const { t } = useTranslation("common");
  const [loading, setLoading] = useState(false);
  const { settings } = useSelector((state: RootState) => state.common);
  const [faqs, setFaqs] = useState([]);
  const [fullScreen, setFullScreen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<any>({
    method: null,
    method_id: null,
  });

  const [depositInfo, setDepositInfo] = useState<any>();
  const getDepositInfo = async () => {
    setLoading(true);
    const response = await currencyDeposit();
    const responseFaq = await getFaqList();
    let tempFaq: any = [];
    responseFaq.data.data.map((faq: any) => {
      if (faq.faq_type_id === FAQ_TYPE_DEPOSIT) {
        tempFaq.push(faq);
      }
    });
    setFaqs(tempFaq);
    if (parseInt(settings.currency_deposit_faq_status) === 1) {
      setFullScreen(true);
    } else if (tempFaq.length === 0) {
      setFullScreen(true);
    }
    setDepositInfo(response.data);
    setSelectedMethod({
      method:
        response?.data?.payment_methods[0] &&
        response?.data?.payment_methods[0].payment_method,
      method_id:
        response?.data?.payment_methods[0] &&
        response?.data?.payment_methods[0].id,
    });
    setLoading(false);
  };
  useEffect(() => {
    getDepositInfo();
  }, []);
  return (
    <>
      <div className="page-wrap">
        <FiatSidebar />
        <div className="page-main-content">
          <div className="container-fluid">
            <div className="deposit-page">
              <div className="section-top-wrap mb-25">
                <div className="profle-are-top">
                  <h2 className="section-top-title">{t("Fiat Deposit")}</h2>
                </div>
              </div>

              <div className="asset-balances-area">
                <div className="section-wrapper boxShadow bank-section">
                  <div className="container">
                    <div className="deposit-conatiner">
                      <div className="cp-user-title">
                        <h4>{t("Select method")}</h4>
                      </div>
                      <SelectDeposit
                        setSelectedMethod={setSelectedMethod}
                        depositInfo={depositInfo}
                        selectedMethod={selectedMethod}
                      />
                      <div className="row">
                        {loading ? (
                          <ScaletonLoading />
                        ) : (
                          <div
                            className={`${
                              fullScreen === false
                                ? "col-lg-8 col-sm-12"
                                : "col-lg-12 col-sm-12"
                            }`}
                          >
                            {parseInt(selectedMethod.method) ===
                            WALLET_DEPOSIT ? (
                              <WalletDeposit
                                walletlist={depositInfo.wallet_list}
                                method_id={selectedMethod.method_id}
                              />
                            ) : parseInt(selectedMethod.method) ===
                              BANK_DEPOSIT ? (
                              <BankDeposit
                                currencyList={depositInfo.currency_list}
                                walletlist={depositInfo.wallet_list}
                                method_id={selectedMethod.method_id}
                                banks={depositInfo.banks}
                              />
                            ) : parseInt(selectedMethod.method) === STRIPE ? (
                              <StripeDeposit
                                currencyList={depositInfo.currency_list}
                                walletlist={depositInfo.wallet_list}
                                method_id={selectedMethod.method_id}
                                banks={depositInfo.banks}
                              />
                            ) : parseInt(selectedMethod.method) === PAYPAL ? (
                              // <PaypalButtons />
                              <PaypalSection
                                currencyList={depositInfo.currency_list}
                                walletlist={depositInfo.wallet_list}
                                method_id={selectedMethod.method_id}
                                banks={depositInfo.banks}
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        )}

                        {fullScreen === false && (
                          <div className="col-lg-4 col-sm-12 mt-4">
                            <DepositFaq faqs={faqs} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer
        customPageData={customPageData}
        socialData={socialData}
        copyright_text={copyright_text}
      />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/user/profile");
  const cookies = parseCookies(ctx);
  const response = await GetUserInfoByTokenServer(cookies.token);
  const commonRes = await pageAvailabilityCheck();

  const { data } = await landingPage();
  const { data: customPageData } = await customPage();

  if (parseInt(commonRes.currency_deposit_status) !== 1) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      user: response.user,
      socialData: data.media_list,
      copyright_text: data?.copyright_text,
      customPageData: customPageData.data,
    },
  };
};
export default Deposit;
