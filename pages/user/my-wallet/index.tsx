import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import type { GetServerSideProps, NextPage } from "next";
import DepositTab from "components/wallet/DepositTab";
import WirhdrawTab from "components/wallet/WirhdrawTab";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { formateZert, formatCurrency } from "common";
import { IoWalletOutline } from "react-icons/io5";
import { TiArrowRepeat } from "react-icons/ti";

import {
  HiOutlineBanknotes,
  HiOutlinePresentationChartLine,
} from "react-icons/hi2";

import {
  SearchObjectArrayFuesJS,
  WalletDepositApiAction,
  WalletListApiAction,
  WalletWithdrawApiAction,
} from "state/actions/wallet";
import Loading from "components/common/TableLoading";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
import { TradeList } from "components/TradeList";
import { appDashboardDataWithoutPair } from "service/exchange";
import Footer from "components/common/footer";
import { customPage, landingPage } from "service/landing-page";
const MyWallet: NextPage = ({
  customPageData,
  socialData,
  copyright_text,
}: any) => {
  const { t } = useTranslation("common");
  const { settings } = useSelector((state: RootState) => state.common);

  const [walletList, setWalletList] = useState<any>([]);
  const [Changeable, setChangeable] = useState<any[]>([]);
  const [processing, setProcessing] = useState<boolean>(false);
  const [allData, setAllData] = useState<any>();
  const [tradeList, setTradeList]: any = useState();
  const [coinList, setCoinList]: any = useState([]);
  const handleActive = (index: any) => {
    if (index === tradeList) {
      setTradeList(index);
    } else {
      setTradeList(index);
    }
  };

  const getWalletLists = async (url: string) => {
    const response: any = await WalletListApiAction(url, setProcessing);
    setWalletList(response?.wallets);
    setChangeable(response?.wallets?.data);
    setAllData(response);
  };

  const LinkTopaginationString = async (link: any) => {
    if (link.url === null) return;
    if (link.label === walletList.current_page.toString()) return;
    const splitLink = link.url.split("api");
    const response: any = await WalletListApiAction(
      splitLink[1] + "&per_page=15",
      setProcessing
    );
    setWalletList(response?.wallets);
    setChangeable(response?.wallets?.data);
  };

  const coinListApi = async () => {
    const coinList = await appDashboardDataWithoutPair();
    setCoinList(coinList);
  };

  useEffect(() => {
    coinListApi();
    getWalletLists("/wallet-list?page=1&per_page=15");
    return () => {
      setWalletList(null);
    };
  }, []);

  return (
    <>
      <div className="page-wrap rightMargin">
        <div className="page-main-content">
          <div className="container-fluid">
            <div className="section-top-wrap mb-25">
              <div className="overview-area">
                <div className="overview-left">
                  <h2 className="section-top-title">{t("Overview")}</h2>
                  <h4 className="blance-title">{t("Total balance")}</h4>
                  <h4 className="blance">
                    {allData?.total ? parseFloat(allData?.total).toFixed(8) : 0}
                    {""} {settings?.currency}
                  </h4>
                </div>
              </div>
            </div>
            <div className="asset-balances-area cstm-loader-area">
              <div className="asset-balances-left">
                <div className="section-wrapper boxShadow">
                  <div
                    id="assetBalances_wrapper"
                    className="dataTables_wrapper no-footer"
                  >
                    <div className="dataTables_head">
                      <div
                        className="dataTables_length"
                        id="assetBalances_length"
                      >
                        <label className="">
                          {t("Show")}
                          <select
                            name="assetBalances_length"
                            aria-controls="assetBalances"
                            className=""
                            onChange={async (e) => {
                              await getWalletLists(
                                "/wallet-list?page=1&per_page=" + e.target.value
                              );
                            }}
                          >
                            <option value="15">15</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </select>
                          {t("entries")}
                        </label>
                      </div>
                      <div id="table_filter" className="dataTables_filter">
                        <label>
                          {t("Search")}:
                          <input
                            type="search"
                            className="data_table_input"
                            placeholder=""
                            aria-controls="table"
                            onChange={(e) =>
                              SearchObjectArrayFuesJS(
                                walletList,
                                setChangeable,
                                e.target.value
                              )
                            }
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive tableScroll">
                    {processing ? (
                      <Loading />
                    ) : (
                      <table
                        id="assetBalances"
                        className="table table-borderless secendary-table asset-balances-table"
                      >
                        <thead>
                          <tr>
                            <th scope="col">{t("Asset")}</th>
                            <th scope="col">{t("Symbol")}</th>
                            <th scope="col">{t("On Order")}</th>
                            <th scope="col">{t("Available Balance")}</th>
                            <th scope="col">{t("Total Balance")}</th>
                            <th scope="col">{t("Action")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Changeable?.map((item: any, index: number) => (
                            <tr id="" key={index}>
                              <td>
                                <div className="asset">
                                  <img
                                    className="asset-icon"
                                    src={item.coin_icon || "/bitcoin.png"}
                                    alt=""
                                  />
                                  <span className="asset-name">
                                    {item?.name}
                                  </span>
                                </div>
                              </td>
                              <td>
                                <span className="symbol">
                                  {item?.coin_type}
                                </span>
                              </td>
                              <td>
                                <div className="blance-text">
                                  <span className="blance market incree">
                                    {item?.on_order}
                                  </span>
                                  <span className="usd">
                                    ({settings?.currency_symbol}
                                    {parseFloat(item?.on_order_usd).toFixed(8)})
                                  </span>
                                </div>
                              </td>
                              <td>
                                <div className="blance-text">
                                  <span className="blance">
                                    {parseFloat(item?.balance).toFixed(8)}
                                  </span>
                                  <span className="usd">
                                    ({settings?.currency_symbol}
                                    {parseFloat(
                                      item?.available_balance_usd
                                    ).toFixed(8)}
                                    )
                                  </span>
                                </div>
                              </td>
                              <td>
                                <div className="blance-text">
                                  <span className="blance">
                                    {/* @ts-ignore */}
                                    {parseFloat(
                                      // @ts-ignore
                                      Number(item?.balance) +
                                        Number(item?.on_order)
                                    ).toFixed(8)}
                                  </span>
                                  <span className="usd">
                                    ({settings?.currency_symbol}
                                    {parseFloat(
                                      item?.total_balance_usd
                                    ).toFixed(8)}
                                    )
                                  </span>
                                </div>
                              </td>
                              <td>
                                <div className="active-link">
                                  <ul>
                                    {item.is_deposit === 1 && (
                                      <Link
                                        href={`/user/my-wallet/deposit?type=deposit&coin_id=${item.id}`}
                                      >
                                        <li className="toolTip" title="Deposit">
                                          <HiOutlineBanknotes size={25} />
                                        </li>
                                      </Link>
                                    )}
                                    {item.is_withdrawal === 1 && (
                                      <Link
                                        href={`/user/my-wallet/withdraw?type=withdraw&coin_id=${item.id}`}
                                      >
                                        <li
                                          className="toolTip"
                                          title="Withdraw"
                                        >
                                          <IoWalletOutline size={25} />
                                        </li>
                                      </Link>
                                    )}

                                    <li
                                      className="toolTip trade-li"
                                      title="Trade"
                                      onClick={() =>
                                        handleActive(
                                          tradeList ? null : index + 1
                                        )
                                      }
                                    >
                                      <HiOutlinePresentationChartLine
                                        size={25}
                                      />
                                      {tradeList === index + 1 && (
                                        <div className="trade-select">
                                          <TradeList
                                            coinList={coinList.pairs}
                                          />
                                        </div>
                                      )}
                                    </li>
                                    {Changeable.length >= 2 ? (
                                      <Link
                                        href={`/user/swap-coin?coin_id=${item.id}`}
                                      >
                                        <li className="toolTip" title="swap">
                                          <TiArrowRepeat size={25} />
                                        </li>
                                      </Link>
                                    ) : (
                                      <li
                                        className="toolTip"
                                        title="swap"
                                        onClick={() => {
                                          toast.error(
                                            "Two coins are required to swap"
                                          );
                                        }}
                                      >
                                        <TiArrowRepeat size={25} />
                                      </li>
                                    )}
                                  </ul>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                  <div
                    className="pagination-wrapper"
                    id="assetBalances_paginate"
                  >
                    <span>
                      {walletList?.links?.map((link: any, index: number) =>
                        link.label === "&laquo; Previous" ? (
                          <a
                            className="paginate-button"
                            onClick={() => LinkTopaginationString(link)}
                            key={index}
                          >
                            <i className="fa fa-angle-left"></i>
                          </a>
                        ) : link.label === "Next &raquo;" ? (
                          <a
                            className="paginate-button"
                            onClick={() => LinkTopaginationString(link)}
                            key={index}
                          >
                            <i className="fa fa-angle-right"></i>
                          </a>
                        ) : (
                          <a
                            className={`paginate_button paginate-number ${
                              link.active === true && "text-warning"
                            }`}
                            aria-controls="assetBalances"
                            data-dt-idx="1"
                            onClick={() => LinkTopaginationString(link)}
                            key={index}
                          >
                            {link.label}
                          </a>
                        )
                      )}
                    </span>
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
  await SSRAuthCheck(ctx, "/user/my-wallet");

  const { data } = await landingPage();
  const { data: customPageData } = await customPage();
  return {
    props: {
      socialData: data.media_list,
      copyright_text: data?.copyright_text,
      customPageData: customPageData.data,
    },
  };
};

export default MyWallet;
