import FiatSidebar from "layout/fiat-sidebar";
import {
  pageAvailabilityCheck,
  SSRAuthCheck,
} from "middlewares/ssr-authentication-check";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { customPage, landingPage } from "service/landing-page";
import { GetUserInfoByTokenServer } from "service/user";
import useTranslation from "next-translate/useTranslation";
import * as Yup from "yup";
import Footer from "components/common/footer";
import {
  apiFiatWithdrawalAction,
  fiatWithdrawProcessAction,
  getFiatWithdrawalRateAction,
} from "state/actions/fiat-deposit-withawal";

const FiatWithdrawal = ({
  customPageData,
  socialData,
  copyright_text,
}: any) => {
  const { t } = useTranslation("common");
  const [loading, setLoading]: any = useState<any>(false);
  const [initialData, setInitialData]: any = useState<any>([]);
  const [rateCred, setRateCred]: any = useState<any>({
    wallet_id: "",
    currency: "",
    amount: "",
    type: "fiat",
    bank_id: "",
  });
  const [converted_value, setConverted_value] = useState(0);
  const [fees, setFees] = useState(0);
  const [netAmount, setNetAmount] = useState(0);
  const [currency, setcurrency] = useState("");
  const getRate = async () => {
    if (rateCred.wallet_id && rateCred.currency && rateCred.amount) {
      const response = await getFiatWithdrawalRateAction({
        wallet_id: rateCred.wallet_id,
        currency: rateCred.currency,
        amount: rateCred.amount,
      });
      setConverted_value(response.data.convert_amount);
      setFees(response.data.fees);
      setNetAmount(response.data.net_amount);
      setcurrency(response.data.currency);
    }
  };
  useEffect(() => {
    getRate();
  }, [rateCred]);
  useEffect(() => {
    apiFiatWithdrawalAction(setInitialData, setLoading);
  }, []);
  return (
    <>
      <div className="page-wrap">
        <FiatSidebar />
        <div className="page-main-content">
          <div className="container-fluid">
            <div className="section-top-wrap mb-25">
              <div className="profle-are-top">
                <h2 className="section-top-title">{t("Fiat Withdrawal")}</h2>
              </div>
            </div>

            <div className="asset-balances-area">
              <div className="section-wrapper boxShadow bank-section">
                <div className="container">
                  <div className="row">
                    <div className="ico-tokenCreate">
                      <div className="ico-create-form col-12">
                        <form
                          className="row"
                          onSubmit={(e) => {
                            e.preventDefault();
                            fiatWithdrawProcessAction(rateCred, setLoading);
                          }}
                        >
                          <div className="col-md-6 form-input-div">
                            <label className="ico-label-box" htmlFor="">
                              {t("Select Wallet")}
                            </label>
                            <select
                              name="wallet"
                              className={`ico-input-box `}
                              required
                              onChange={(e: any) => {
                                setRateCred({
                                  ...rateCred,
                                  wallet_id: e.target.value,
                                });
                              }}
                            >
                              <option value="">
                                {t("Select Your Wallet")}
                              </option>
                              {initialData?.my_wallet?.map(
                                (item: any, index: number) => (
                                  <option value={item.encryptId} key={index}>
                                    {item.coin_type}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                          <div className="col-md-6 form-input-div">
                            <label className="ico-label-box" htmlFor="">
                              {t("Select Currency")}
                            </label>
                            <select
                              name="coin_list"
                              required
                              className={`ico-input-box `}
                              onChange={(e: any) => {
                                setRateCred({
                                  ...rateCred,
                                  currency: e.target.value,
                                });
                              }}
                            >
                              <option value="">{t("Select Currency")}</option>
                              {initialData?.currency?.map(
                                (item: any, index: number) => (
                                  <option key={index} value={item.code}>
                                    {item.name}
                                  </option>
                                )
                              )}
                            </select>
                          </div>

                          <div className="col-md-6 form-input-div">
                            <label className="ico-label-box" htmlFor="">
                              {t("Amount")}
                            </label>
                            <input
                              type="text"
                              required
                              onChange={(e) => {
                                setRateCred({
                                  ...rateCred,
                                  amount: e.target.value,
                                });
                                // getFiatWithdrawalRateAction(rateCred);
                              }}
                              name="amount"
                              className={`ico-input-box`}
                            />
                          </div>

                          <div className="col-md-6 form-input-div">
                            <label className="ico-label-box" htmlFor="">
                              {t("Amount Convert Price")}
                            </label>
                            <input
                              type="text"
                              disabled
                              value={converted_value}
                              required
                              name="convert_price"
                              className={`ico-input-box `}
                            />
                            <div>
                              <span>
                                {t("Fees:")}
                                {fees}
                              </span>
                              <span className="float-right">
                                {t("Net Amount:")}
                                {netAmount}
                                {currency}
                              </span>
                            </div>
                          </div>

                          <div className="col-md-6 form-input-div">
                            <label className="ico-label-box" htmlFor="">
                              {t("Select Bank")}
                            </label>
                            <select
                              name="bank_list"
                              className={`ico-input-box `}
                              required
                              onChange={(e) => {
                                setRateCred({
                                  ...rateCred,
                                  bank_id: e.target.value,
                                });
                              }}
                            >
                              <option value="">{t("Select Bank List")}</option>
                              {initialData?.my_bank?.map(
                                (item: any, index: number) => (
                                  <option value={item.id} key={index}>
                                    {item.bank_name}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                          <div className="col-md-12 form-input-div">
                            <button type="submit" className="primary-btn">
                              {loading ? t("Loading..") : t("Submit Withdrawl")}
                            </button>
                          </div>
                        </form>
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
export default FiatWithdrawal;
