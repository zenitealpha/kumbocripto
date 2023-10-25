import type { NextPage } from "next";
import DashboardNavbar from "components/common/dashboardNavbar";
import { useEffect, useState } from "react";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import Loading from "components/common/loading";
import SelectCurrency from "components/exchange/selectCurrency";
import CurrencyLevel from "components/exchange/currencyLevel";
import DashboardBody from "components/exchange/DashboardBody";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "state/store";
import {
  initialDashboardCallAction,
  initialDashboardCallActionWithToken,
} from "state/actions/exchange";
import {
  setAllmarketTrades,
  setCurrentPair,
  setOpenBookBuy,
  setOrderData,
  setOpenBooksell,
  setDashboard,
  setLastPriceData,
  setPairs,
  setOpenOrderHistory,
  setSellOrderHistory,
  setBuyOrderHistory,
  setTotalData,
} from "state/reducer/exchange";
import useTranslation from "next-translate/useTranslation";
import { last, updateChart } from "components/exchange/api/stream";
import {
  EXCHANGE_LAYOUT_ONE,
  EXCHANGE_LAYOUT_TWO,
} from "helpers/core-constants";
import Head from "next/head";
import { formatCurrency } from "common";
let socketCall = 0;
async function listenMessages(dispatch: any, user: any) {
  //@ts-ignore
  window.Pusher = Pusher;
  //@ts-ignore
  window.Echo = new Echo({
    broadcaster: "pusher",
    key: "test",
    wsHost: process.env.NEXT_PUBLIC_HOST_SOCKET,
    wsPort: 6006,
    wssPort: 443,
    forceTLS: false,
    cluster: "mt1",
    disableStats: true,
    enabledTransports: ["ws", "wss"],
  });
  //@ts-ignore
  // dashboard-base_coin_id-trade_coin_id
  window.Echo.channel(
    `dashboard-${localStorage.getItem("base_coin_id")}-${localStorage.getItem(
      "trade_coin_id"
    )}`
  ).listen(".order_place", (e: any) => {
    if (e.orders.order_type === "buy")
      dispatch(setOpenBookBuy(e.orders.orders));
    if (e.orders.order_type === "sell")
      dispatch(setOpenBooksell(e.orders.orders));
    // if (e.orders.order_type === "buy") {
    //   console.log("buy", e.orders.orders);
    // }
    // if (e.orders.order_type === "sell") {
    //   console.log("sell", e.orders.orders);
    // }

    //last optimised
    // e.order_data && dispatch(setOrderData(e.order_data));
    // e.last_price_data && dispatch(setLastPriceData(e.last_price_data));
    // dispatch(setPairs(e.pairs));
  });
  //@ts-ignore
  window.Echo.channel(
    `trade-info-${localStorage.getItem("base_coin_id")}-${localStorage.getItem(
      "trade_coin_id"
    )}`
  ).listen(".process", (e: any) => {
    dispatch(setAllmarketTrades(e.trades.transactions));
    updateChart({
      price: parseFloat(e?.last_trade?.price),
      ts: e?.last_trade?.time,
      base_coin_id: e?.order_data?.base_coin_id,
      trade_coin_id: e?.order_data?.trade_coin_id,
      total: parseFloat(e?.last_trade?.total),
    });
    dispatch(setPairs(e.pairs));
    e.last_price_data && dispatch(setLastPriceData(e.last_price_data));
    e.order_data && dispatch(setOrderData(e.order_data));
  });
  //@ts-ignore
  window.Echo.channel(
    `dashboard-${localStorage.getItem("base_coin_id")}-${localStorage.getItem(
      "trade_coin_id"
    )}`
  ).listen(`.process-${localStorage.getItem("user_id")}`, (e: any) => {
    dispatch(setOpenOrderHistory(e.open_orders.orders));
    dispatch(setSellOrderHistory(e.open_orders.sell_orders));
    dispatch(setBuyOrderHistory(e.open_orders.buy_orders));
    e?.order_data?.total && dispatch(setTotalData(e?.order_data?.total));
  });
  //@ts-ignore
  window.Echo.channel(
    `dashboard-${localStorage.getItem("base_coin_id")}-${localStorage.getItem(
      "trade_coin_id"
    )}`
  ).listen(`.order_place_${localStorage.getItem("user_id")}`, (e: any) => {
    dispatch(setOpenOrderHistory(e.open_orders.orders));
    dispatch(setSellOrderHistory(e.open_orders.sell_orders));
    dispatch(setBuyOrderHistory(e.open_orders.buy_orders));
    e?.order_data?.total && dispatch(setTotalData(e?.order_data?.total));
  });
  //@ts-ignore
  // window.Echo.channel(
  //   `dashboard-${localStorage.getItem("base_coin_id")}-${localStorage.getItem(
  //     "trade_coin_id"
  //   )}`
  // ).listen(".order_removed", (e: any) => {
  //   if (e.orders.order_type === "buy")
  //     dispatch(setOpenBookBuy(e.orders.orders));
  //   if (e.orders.order_type === "sell")
  //     dispatch(setOpenBooksell(e.orders.orders));
  //   e.order_data && dispatch(setOrderData(e.order_data));
  //   e?.order_data?.total && dispatch(setTotalData(e?.order_data?.total));
  //   e.last_price_data && dispatch(setLastPriceData(e.last_price_data));
  // });
}
const Dashboard: NextPage = () => {
  const { settings } = useSelector((state: RootState) => state.common);
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(true);
  const { isLoggedIn, user } = useSelector((state: RootState) => state.user);
  const { dashboard, currentPair } = useSelector(
    (state: RootState) => state.exchange
  );
  useEffect(() => {
    const pair = localStorage.getItem("current_pair");
    if (pair) {
      dispatch(setCurrentPair(pair));
      dispatch(initialDashboardCallAction(pair, dashboard, setisLoading));
    } else {
      dispatch(
        initialDashboardCallAction(currentPair, dashboard, setisLoading)
      );
    }
  }, [isLoggedIn, currentPair]);
  useEffect(() => {
    if (
      dashboard?.order_data?.base_coin_id &&
      dashboard?.order_data?.trade_coin_id
    ) {
      dispatch(
        initialDashboardCallActionWithToken(
          currentPair,
          dashboard,
          setisLoading
        )
      );
    }
  }, [dashboard?.order_data?.base_coin_id]);
  useEffect(() => {
    if (socketCall === 0) {
      listenMessages(dispatch, user);
    }
    socketCall = 1;
  });
  return (
    <div className="container-dashboard">
      <div className="background-col">
        <Head>
          <title>
            {dashboard?.last_price_data?.length > 0
              ? formatCurrency(dashboard?.last_price_data[0]?.last_price)
              : 0.0}{" "}
            | {currentPair ? currentPair.replace("_", "") : "----"}
          </title>
        </Head>
        <DashboardNavbar />
        {isLoading && <Loading />}
        <div className="mt-5"></div>
        <div className="cp-user-sidebar-area">
          <div
            className="scroll-wrapper cp-user-sidebar-menu scrollbar-inner"
            style={{ position: "relative" }}
          >
            <div
              className="cp-user-sidebar-menu scrollbar-inner scroll-content"
              style={{
                height: "auto",
                marginBottom: "0px",
                marginRight: "0px",
                maxHeight: "0px",
              }}
            ></div>
            <div className="scroll-element scroll-x">
              <div className="scroll-element_outer">
                <div className="scroll-element_size" />
                <div className="scroll-element_track" />
                <div className="scroll-bar" />
              </div>
            </div>
            <div className="scroll-element scroll-y">
              <div className="scroll-element_outer">
                <div className="scroll-element_size" />
                <div className="scroll-element_track" />
                <div className="scroll-bar" />
              </div>
            </div>
          </div>
        </div>
        <div
          id="notificationShow"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          className="modal fade"
        >
          <div
            role="document"
            className="modal-dialog modal-lg modal-dialog-centered"
          >
            <div className="modal-content dark-modal">
              <div className="modal-header align-items-center">
                <h5 id="exampleModalCenterTitle" className="modal-title">
                  {t("New Notifications")}
                </h5>
                <button
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                  className="close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="hm-form">
                  <div className="row">
                    <div className="col-12">
                      <h6 id="n_title" /> <p id="n_date" /> <p id="n_notice" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cp-user-main-wrapper-dashboard">
          <div className="container-fluid">
            <div
              role="alert"
              id="web_socket_notification"
              className="alert alert-success alert-dismissible fade show d-none"
            >
              <span id="socket_message" />
              <button
                type="button"
                data-dismiss="alert"
                aria-label="Close"
                className="close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div
              id="confirm-modal"
              tabIndex={-1}
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
              className="modal fade"
            >
              <div
                role="document"
                className="modal-dialog modal-dialog-centered"
              >
                <div className="modal-content">
                  <button
                    type="button"
                    data-dismiss="modal"
                    aria-label="Close"
                    className="close"
                  >
                    <img alt="" className="img-fluid" />
                  </button>
                  <div className="text-center">
                    <img
                      src="/add-pockaet-vector.svg"
                      alt=""
                      className="img-fluid img-vector"
                    />
                    <h3 id="confirm-title" />
                  </div>
                  <div className="modal-body">
                    <a
                      id="confirm-link"
                      className="btn btn-block cp-user-move-btn"
                    >
                      {t("Confirm")}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="cp-user-custom-card exchange-area">
              <div id="dashboard">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="cxchange-summary-wrap">
                      <div className="cxchange-summary-name">
                        <div className="summber-coin-type dropdown">
                          <span
                            className="coin-badge dropdown-toggle"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            {currentPair.replace(/_/g, "/")}
                          </span>
                          <SelectCurrency />
                        </div>
                      </div>
                      {dashboard?.last_price_data && <CurrencyLevel />}
                    </div>
                  </div>

                  <DashboardBody />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
