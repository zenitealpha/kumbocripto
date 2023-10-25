import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  currencyDepositProcess,
  getCurrencyDepositRate,
} from "service/deposit";
import { UserSettingsApi } from "service/settings";
import { RootState } from "state/store";
import DepositGoogleAuth from "./deposit-g2fa";

const WalletDeposit = ({ walletlist, method_id }: any) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { settings } = useSelector((state: RootState) => state.common);
  const [credential, setCredential] = useState<any>({
    wallet_id: null,
    payment_method_id: method_id ? method_id : null,
    amount: 0,
    from_wallet_id: null,
    code: "",
  });
  const [calculatedValue, setCalculatedValue] = useState<any>({
    calculated_amount: 0,
    rate: 0,
  });
  const [available, setAvailable] = useState<any>(0);

  const [errorMessage, setErrorMessage] = React.useState({
    status: false,
    message: "",
  });
  const CheckG2faEnabled = async () => {
    const { data } = await UserSettingsApi();
    const { user } = data;
    if (
      user.google2fa !== 1 &&
      parseInt(settings.currency_deposit_2fa_status) === 1
    ) {
      setErrorMessage({
        status: true,
        message: t("Google 2FA is not enabled, Please enable Google 2FA fist"),
      });
    }
  };
  const getCurrencyRate = async () => {
    if (
      credential.wallet_id &&
      credential.payment_method_id &&
      credential.amount &&
      credential.from_wallet_id
    ) {
      const response = await getCurrencyDepositRate(credential);
      setCalculatedValue(response.data);
    }
  };
  const convertCurrency = async (credential: any) => {
    if (
      credential.wallet_id &&
      credential.payment_method_id &&
      credential.amount &&
      credential.from_wallet_id
    ) {
      const res = await currencyDepositProcess(credential);
      if (res.success) {
        toast.success(res.message);
        router.push("/user/currency-deposit-history");
      } else {
        toast.error(res.message);
      }
    } else {
      toast.error(t("Please provide all information's"));
    }
  };
  useEffect(() => {
    getCurrencyRate();
    CheckG2faEnabled();
  }, [credential]);
  return (
    <div>
      <div className="cp-user-title mt-5 mb-4">
        <h4>{t("Wallet list")}</h4>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="">
            <div className="swap-area">
              <div className="swap-area-top">
                <div className="form-group">
                  <div className="swap-wrap">
                    <div className="swap-wrap-top">
                      <label>{t("From")}</label>
                      <span className="available">
                        {t("Available Balance: ")}
                        {parseFloat(available)}
                      </span>
                    </div>
                    <div className="swap-input-wrap">
                      <div className="form-amount">
                        <input
                          type="number"
                          className="form-control"
                          id="amount-one"
                          placeholder={t("Please enter 1-2400000")}
                          onChange={(e) => {
                            setCredential({
                              ...credential,
                              amount: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="cp-select-area">
                        <select
                          className="form-control "
                          id="currency-one"
                          onChange={(e) => {
                            setCredential({
                              ...credential,
                              from_wallet_id: parseInt(e.target.value),
                            });
                            setAvailable(
                              walletlist.find(
                                (wallet: any) =>
                                  parseInt(wallet.id) ===
                                  parseInt(e.target.value)
                              ).balance
                            );
                          }}
                        >
                          <option value="" selected disabled hidden>
                            {t("Select one")}
                          </option>
                          {walletlist.map((wallet: any, index: any) => (
                            <option value={wallet.id} key={index}>
                              {wallet.coin_type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="">
            <div className="swap-area">
              <div className="swap-area-top">
                <div className="form-group">
                  <div className="swap-wrap">
                    <div className="swap-wrap-top">
                      <label>{t("To")}</label>
                    </div>
                    <div className="swap-input-wrap">
                      <div className="form-amount">
                        <input
                          type="text"
                          className="form-control"
                          id="amount-one"
                          disabled
                          value={calculatedValue.calculated_amount}
                          placeholder={t("Please enter 10 -2400000")}
                        />
                      </div>
                      <div className="cp-select-area">
                        <select
                          className=" form-control "
                          id="currency-one"
                          onChange={(e) => {
                            setCredential({
                              ...credential,
                              wallet_id: parseInt(e.target.value),
                            });
                          }}
                        >
                          <option value="" selected disabled hidden>
                            {t("Select one")}
                          </option>
                          {walletlist.map((wallet: any, index: any) => (
                            <option value={wallet.id} key={index}>
                              {wallet.coin_type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DepositGoogleAuth
            convertCurrency={convertCurrency}
            credential={credential}
            setCredential={setCredential}
          />
          {errorMessage.status && (
            <div className="alert alert-danger">{errorMessage.message}</div>
          )}
          {parseInt(settings.currency_deposit_2fa_status) === 1 ? (
            <button
              className="primary-btn-outline w-100"
              type="button"
              data-target="#exampleModal"
              disabled={errorMessage.status === true}
              data-toggle="modal"
            >
              Deposit
            </button>
          ) : (
            <button
              className="primary-btn-outline w-100"
              type="button"
              disabled={errorMessage.status === true}
              onClick={() => {
                convertCurrency(credential);
              }}
            >
              Deposit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletDeposit;
