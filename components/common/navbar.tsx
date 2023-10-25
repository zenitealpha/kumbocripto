import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { BsBarChartLine } from "react-icons/bs";
import { BiNetworkChart } from "react-icons/bi";
import { IoLanguageSharp } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { BiWalletAlt } from "react-icons/bi";
import { RiWallet3Line } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "state/store";
import { LogoutAction } from "state/actions/user";
import { notification, notificationSeen } from "service/notification";
import useTranslation from "next-translate/useTranslation";
import { HiArrowNarrowRight } from "react-icons/hi";
import { CgNotifications } from "react-icons/cg";
import { RiNotificationBadgeLine } from "react-icons/ri";
import moment from "moment";
import OutsideClickHandler from "react-outside-click-handler";

const Navbar = () => {
  const { isLoggedIn, user, logo } = useSelector(
    (state: RootState) => state.user
  );
  const { settings } = useSelector((state: RootState) => state.common);
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const [notificationData, setNotification] = useState<any>([]);
  const [active, setActive] = useState(false);
  const router = useRouter();
  const getNotifications = async () => {
    const data = await notification();
    setNotification(data.data.data);
  };
  const seen = async () => {
    let arr: any = [];

    notificationData.map((notification: any) => {
      arr.push(notification.id);
    });
    notificationSeen(arr).then((data: any) => {
      setNotification([]);
    });
  };
  useEffect(() => {
    isLoggedIn && getNotifications();
  }, [isLoggedIn]);
  return (
    <>
      <div className="cp-user-top-bar">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-between">
            <div className="col-xl-2 col-lg-2 col-4">
              <div className="cp-user-logo">
                <Link href="/">
                  <a href="">
                    <img
                      src={logo || ""}
                      className="img-fluid cp-user-logo-large"
                      alt=""
                    />
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-xl-8 col-lg-8 d-none d-lg-block">
              <nav className="main-menu">
                <ul>
                  <li
                    className={
                      router.pathname == "/exchange/dashboard"
                        ? "cp-user-active-page"
                        : ""
                    }
                  >
                    <a
                      href={
                        router.locale !== "en"
                          ? `/${router.locale}/exchange/dashboard`
                          : "/exchange/dashboard"
                      }
                    >
                      <span className="cp-user-icon">
                        {/* <img
                          src="/sidebar-icons/dashboard.svg"
                          className="img-fluid cp-user-side-bar-icon"
                          alt=""
                        />
                        <img
                          src="/sidebar-icons/hover/dashboard.svg"
                          className="img-fluid cp-user-side-bar-icon-hover"
                          alt=""
                        /> */}
                        <BsBarChartLine />
                      </span>
                      <span className="cp-user-name">{t("Trade")}</span>
                    </a>
                  </li>
                  <Link
                    href={
                      isLoggedIn === true
                        ? "/user/my-wallet"
                        : "/authentication/signin"
                    }
                  >
                    <li
                      className={
                        router.pathname == "/user/my-wallet"
                          ? "cp-user-active-page"
                          : router.pathname == "/user/swap-coin"
                          ? "cp-user-active-page"
                          : ""
                      }
                    >
                      <a href="">
                        <span className="cp-user-icon">
                          {/* <img
                            src="/sidebar-icons/Wallet.svg"
                            className="img-fluid cp-user-side-bar-icon"
                            alt=""
                          />
                          <img
                            src="/sidebar-icons/Wallet.svg"
                            className="img-fluid cp-user-side-bar-icon-hover"
                            alt=""
                          /> */}
                          <BiWalletAlt />
                        </span>
                        <span className="cp-user-name">{t("Wallet")}</span>
                      </a>
                    </li>
                  </Link>
                  {parseInt(settings.currency_deposit_status) === 1 && (
                    <li
                      className={
                        router.pathname == "/fiat-deposit"
                          ? "cp-user-active-page"
                          : router.pathname == "/fiat-withdrawal"
                          ? "cp-user-active-page"
                          : ""
                      }
                    >
                      <Link
                        href={
                          isLoggedIn === true
                            ? "/fiat-deposit"
                            : "/authentication/signin"
                        }
                      >
                        <a className="arrow-icon" href="#" aria-expanded="true">
                          <span className="cp-user-icon">
                            <FiSettings />
                          </span>
                          <span className="cp-user-name">{t("Fiat")}</span>
                        </a>
                      </Link>
                      <ul className="">
                        <Link
                          href={
                            isLoggedIn
                              ? "/fiat-deposit"
                              : "/authentication/signin"
                          }
                        >
                          <li>
                            <a href="">{t("Deposit")}</a>
                          </li>
                        </Link>
                        <Link
                          href={
                            isLoggedIn
                              ? "/fiat-withdrawal"
                              : "/authentication/signin"
                          }
                        >
                          <li
                            className={
                              router.pathname == "/fiat-withdrawal"
                                ? "cp-user-active-page"
                                : ""
                            }
                          >
                            <a href="">{t("Withdrawal")}</a>
                          </li>
                        </Link>
                      </ul>
                    </li>
                  )}

                  <li
                    className={
                      router.pathname == "/user/wallet-history"
                        ? "cp-user-active-page"
                        : router.pathname == "/user/swap-history"
                        ? "cp-user-active-page"
                        : router.pathname == "/user/buy-order-history"
                        ? "cp-user-active-page"
                        : router.pathname == "/user/sell-order-history"
                        ? "cp-user-active-page"
                        : router.pathname == "/user/transaction-history"
                        ? "cp-user-active-page"
                        : router.pathname == "/user/currency-deposit-history"
                        ? "cp-user-active-page"
                        : ""
                    }
                  >
                    <Link
                      href={
                        isLoggedIn
                          ? "/user/wallet-history?type=deposit"
                          : "/authentication/signin"
                      }
                    >
                      <a className="arrow-icon" href="#" aria-expanded="true">
                        <span className="cp-user-icon">
                          {/* <img
                            src="/sidebar-icons/Membership.svg"
                            className="img-fluid cp-user-side-bar-icon"
                            alt=""
                          />
                          <img
                            src="/sidebar-icons/hover/Membership-1.svg"
                            className="img-fluid cp-user-side-bar-icon-hover"
                            alt=""
                          /> */}
                          <HiOutlineDocumentReport />
                        </span>
                        <span className="cp-user-name">{t("Reports")}</span>
                      </a>
                    </Link>
                    <ul className="">
                      <Link
                        href={
                          isLoggedIn
                            ? "/user/wallet-history?type=deposit"
                            : "/authentication/signin"
                        }
                      >
                        <li
                          className={
                            router.pathname ==
                            "/user/wallet-history?type=deposit"
                              ? "cp-user-active-page"
                              : ""
                          }
                        >
                          <a href="">{t("Deposit History")}</a>
                        </li>
                      </Link>
                      <Link
                        href={
                          isLoggedIn
                            ? "/user/wallet-history?type=withdrawal"
                            : "/authentication/signin"
                        }
                      >
                        <li
                          className={
                            router.pathname ==
                            "/user/wallet-history?type=withdrawal"
                              ? "cp-user-active-page"
                              : ""
                          }
                        >
                          <a href="">{t("Withdrawal History")}</a>
                        </li>
                      </Link>
                      <Link
                        href={
                          isLoggedIn
                            ? "/user/swap-history"
                            : "/authentication/signin"
                        }
                      >
                        <li
                          className={
                            router.pathname == "/user/swap-history"
                              ? "cp-user-active-page"
                              : ""
                          }
                        >
                          <a href="">{t("Swap History")}</a>
                        </li>
                      </Link>
                      <Link
                        href={
                          isLoggedIn
                            ? "/user/buy-order-history"
                            : "/authentication/signin"
                        }
                      >
                        <li
                          className={
                            router.pathname == "/user/buy-order-history"
                              ? "cp-user-active-page"
                              : ""
                          }
                        >
                          <a href="">{t("Buy Order History")}</a>
                        </li>
                      </Link>
                      <Link
                        href={
                          isLoggedIn
                            ? "/user/sell-order-history"
                            : "/authentication/signin"
                        }
                      >
                        <li
                          className={
                            router.pathname == "/user/sell-order-history"
                              ? "cp-user-active-page"
                              : ""
                          }
                        >
                          <a href="">{t("Sell Order History")}</a>
                        </li>
                      </Link>
                      <Link
                        href={
                          isLoggedIn
                            ? "/user/transaction-history"
                            : "/authentication/signin"
                        }
                      >
                        <li
                          className={
                            router.pathname == "/user/transaction-history"
                              ? "cp-user-active-page"
                              : ""
                          }
                        >
                          <a href="">{t("Transaction History")}</a>
                        </li>
                      </Link>{" "}
                      <Link
                        href={
                          isLoggedIn
                            ? "/user/currency-deposit-history"
                            : "/authentication/signin"
                        }
                      >
                        <li
                          className={
                            router.pathname == "/user/currency-deposit-history"
                              ? "cp-user-active-page"
                              : ""
                          }
                        >
                          <a href="">{t("Fiat Deposit History")}</a>
                        </li>
                      </Link>
                      <Link
                        href={
                          isLoggedIn
                            ? "/user/currency-withdraw-history"
                            : "/authentication/signin"
                        }
                      >
                        <li
                          className={
                            router.pathname == "/user/currency-withdraw-history"
                              ? "cp-user-active-page"
                              : ""
                          }
                        >
                          <a href="">{t("Fiat Withdrawal History")}</a>
                        </li>
                      </Link>
                    </ul>
                  </li>
                  <Link
                    href={
                      isLoggedIn ? "/user/profile" : "/authentication/signin"
                    }
                  >
                    <li
                      className={
                        router.pathname == "/user/profile"
                          ? "cp-user-active-page"
                          : ""
                      }
                    >
                      <a href="">
                        <span className="cp-user-icon">
                          {/* <img
                            src="/sidebar-icons/user.svg"
                            className="img-fluid cp-user-side-bar-icon"
                            alt=""
                          />
                          <img
                            src="/sidebar-icons/hover/user.svg"
                            className="img-fluid cp-user-side-bar-icon-hover"
                            alt=""
                          /> */}
                          <CgProfile />
                        </span>
                        <span className="cp-user-name">{t("My Profile")}</span>
                      </a>
                    </li>
                  </Link>
                  <Link
                    href={
                      isLoggedIn ? "/user/referral" : "/authentication/signin"
                    }
                  >
                    <li
                      className={
                        router.pathname == "/user/referral"
                          ? "cp-user-active-page"
                          : ""
                      }
                    >
                      <Link href="/user/referral">
                        <a>
                          <span className="cp-user-icon">
                            {/* <img
                            src="/sidebar-icons/referral.svg"
                            className="img-fluid cp-user-side-bar-icon"
                            alt=""
                          />
                          <img
                            src="/sidebar-icons/hover/referral.svg"
                            className="img-fluid cp-user-side-bar-icon-hover"
                            alt=""
                          /> */}
                            <BiNetworkChart />
                          </span>
                          <span className="cp-user-name">
                            {t("My Referral")}
                          </span>
                        </a>
                      </Link>
                    </li>
                  </Link>
                  <li
                    className={
                      router.pathname == "/user/settings"
                        ? "cp-user-active-page"
                        : router.pathname == "/user/faq"
                        ? "cp-user-active-page"
                        : ""
                    }
                  >
                    <Link
                      href={
                        isLoggedIn ? "/user/settings" : "/authentication/signin"
                      }
                    >
                      <a className="arrow-icon" href="#" aria-expanded="true">
                        <span className="cp-user-icon">
                          {/* <img
                            src="/sidebar-icons/settings.svg"
                            className="img-fluid cp-user-side-bar-icon"
                            alt=""
                          />
                          <img
                            src="/sidebar-icons/hover/settings.svg"
                            className="img-fluid cp-user-side-bar-icon-hover"
                            alt=""
                          /> */}
                          <FiSettings />
                        </span>
                        <span className="cp-user-name">{t("Settings")}</span>
                      </a>
                    </Link>
                    <ul className="">
                      <Link
                        href={
                          isLoggedIn
                            ? "/user/settings"
                            : "/authentication/signin"
                        }
                      >
                        <li>
                          <a href="">{t("My Settings")}</a>
                        </li>
                      </Link>
                      <Link
                        href={
                          isLoggedIn ? "/user/faq" : "/authentication/signin"
                        }
                      >
                        <li
                          className={
                            router.pathname == "/user/faq"
                              ? "cp-user-active-page"
                              : ""
                          }
                        >
                          <a href="">{t("FAQ")}</a>
                        </li>
                      </Link>
                    </ul>
                  </li>
                  <li>
                    <a className="arrow-icon" href="#" aria-expanded="true">
                      <span className="cp-user-icon">
                        {/* <img
                          src="/sidebar-icons/Membership.svg"
                          className="img-fluid cp-user-side-bar-icon"
                          alt=""
                        />
                        <img
                          src="/sidebar-icons/hover/Membership-1.svg"
                          className="img-fluid cp-user-side-bar-icon-hover"
                          alt=""
                        /> */}
                        <IoLanguageSharp />
                      </span>
                      <span className="cp-user-name">
                        {router.locale?.toLocaleUpperCase()}
                      </span>
                    </a>
                    <ul className="">
                      {settings?.LanguageList?.map((item: any, index: any) => (
                        <li key={index}>
                          <Link href={router.asPath} locale={item.key}>
                            <a className="py-1">{item.name}</a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>

            {/* language list       */}
            <div className="col-xl-2 col-lg-2 col-8">
              {isLoggedIn ? (
                <div className="cp-user-top-bar-right">
                  <div>
                    <ul>
                      <li className="hm-notify" id="notification_item">
                        <div className="btn-group dropdown">
                          <button
                            type="button"
                            className="btn notification-btn dropdown-toggle"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <span
                              className="notify-value hm-notify-number"
                              onClick={() => {}}
                            >
                              {notificationData?.length > 100
                                ? "99+"
                                : notificationData?.length}
                            </span>
                            <img
                              src="/notification.png"
                              className="img-fluid"
                              alt=""
                            />
                          </button>
                          <div className="dropdown-menu notification-list dropdown-menu-right">
                            <div className="notify-menu">
                              <div className="notification-list-title">
                                <div className="notify-counter">
                                  <div className="notify-pending">
                                    <p>
                                      <span>{notificationData.length}</span>{" "}
                                      {t("pending notifications")}
                                    </p>
                                    <a
                                      onClick={() => {
                                        seen();
                                      }}
                                      className="clear-all"
                                      href="#"
                                    >
                                      {t("Clear All")}
                                    </a>
                                  </div>

                                  <div className="notifiy-clear">
                                    <Link href="/user/notification">
                                      <a
                                        // onClick={() => {
                                        //   seen();
                                        // }}
                                        className="view-all"
                                      >
                                        {t("View All")}
                                      </a>
                                    </Link>
                                    <HiArrowNarrowRight />
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div className="notify-grid-item">
                                  {notificationData.length > 0 ? (
                                    notificationData
                                      ?.slice(0, 5)
                                      ?.map((item: any, index: number) => (
                                        <div
                                          className="notify-icon-title"
                                          key={index}
                                        >
                                          <RiNotificationBadgeLine
                                            size={20}
                                            className="notify-menu-icon"
                                          />
                                          <div>
                                            <h6>
                                              {item.title.substring(0, 40)}
                                            </h6>
                                            <p>
                                              {item.notification_body.substring(
                                                0,
                                                50
                                              )}
                                            </p>
                                            <span>
                                              {moment(item.created_at).format(
                                                "DD MMM YYYY"
                                              )}
                                            </span>
                                          </div>
                                        </div>
                                      ))
                                  ) : (
                                    <p className="notFountNotifyText">
                                      {t("No Notification Found!")}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            {/* {notificationData[0] && (
                              <div className="notification-body-drop">
                                <div>
                                  <p className="title-notifination">
                                    {notificationData[0].title}
                                  </p>
                                  <p className="title-body-notifination">
                                    {notificationData[0].notification_body}
                                  </p>
                                </div>
                              </div>
                            )}
                            {notificationData[1] && (
                              <div className="notification-body-drop">
                                <div>
                                  <p className="title-notifination">
                                    {notificationData[1].title}
                                  </p>
                                  <p className="title-body-notifination">
                                    {notificationData[1].notification_body}
                                  </p>
                                </div>
                              </div>
                            )}
                            {notificationData[2] && (
                              <div className="notification-body-drop">
                                <div>
                                  <p className="title-notifination">
                                    {notificationData[2].title}
                                  </p>
                                  <p className="title-body-notifination">
                                    {notificationData[2].notification_body}
                                  </p>
                                </div>
                              </div>
                            )}
                            {notificationData.length > 0 ? (
                              <div className="text-center p-2 border-bottom nt-title">
                                <Link href="/user/notification">
                                  <span className="mr-5"> {t("View all")}</span>
                                </Link>
                                <span
                                  className="ml-5"
                                  onClick={() => {
                                    seen();
                                  }}
                                >
                                  {t("Clear all")}
                                </span>
                              </div>
                            ) : (
                              <div className="text-center p-2 border-bottom nt-title">
                                <span className="mr-5">
                                  {" "}
                                  {t("No new notification")}
                                </span>
                              </div>
                            )} */}

                            <div
                              className="scroll-wrapper scrollbar-inner"
                              style={{
                                position: "relative",
                              }}
                            >
                              <ul
                                className="scrollbar-inner scroll-content"
                                style={{
                                  height: "auto",
                                  marginBottom: "0px",
                                  marginRight: "0px",
                                  maxHeight: "0px",
                                }}
                              ></ul>
                              <div className="scroll-element scroll-x">
                                <div className="scroll-element_outer">
                                  <div className="scroll-element_size"></div>
                                  <div className="scroll-element_track"></div>
                                  <div className="scroll-bar"></div>
                                </div>
                              </div>
                              <div className="scroll-element scroll-y">
                                <div className="scroll-element_outer">
                                  <div className="scroll-element_size"></div>
                                  <div className="scroll-element_track"></div>
                                  <div className="scroll-bar"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="hm-notify" id="notification_item">
                        <div className="btn-group profile-dropdown">
                          <button
                            type="button"
                            className="btn dropdown-toggle"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <span className="cp-user-avater">
                              <span
                                className={`${
                                  user?.online_status?.online_status
                                    ? "tradeUserActive"
                                    : "tradeUserDeactive"
                                } cp-user-img`}
                              >
                                {user?.photo && (
                                  <img
                                    src={user?.photo}
                                    className="img-fluid"
                                    alt="user"
                                  />
                                )}
                              </span>
                              <span className="cp-user-avater-info"></span>
                            </span>
                          </button>
                          <div className="dropdown-menu dropdown-menu-right">
                            <p
                              className={`${
                                user?.online_status?.online_status
                                  ? "userActive"
                                  : "userDeactive"
                              } big-user-thumb`}
                            >
                              <img
                                src={user?.photo}
                                className="img-fluid profile-avatar"
                                alt=""
                              />
                            </p>
                            <div className="user-name">
                              <p className="nav-userName">
                                {user?.first_name!} {user?.last_name!}
                              </p>
                            </div>
                            <Link href="/user/profile">
                              <button className="dropdown-item" type="button">
                                <a href="">
                                  <i className="fa-regular fa-user"></i>{" "}
                                  {t("Profile")}
                                </a>
                              </button>
                            </Link>
                            <Link href="/user/settings">
                              <button className="dropdown-item" type="button">
                                <a href="">
                                  <i className="fa fa-cog"></i>{" "}
                                  {t("My Settings")}
                                </a>
                              </button>
                            </Link>
                            <Link href="/user/my-wallet">
                              <button className="dropdown-item" type="button">
                                <a href="-wallet">
                                  <i className="fa fa-credit-card"></i>{" "}
                                  {t("My Wallet")}
                                </a>
                              </button>
                            </Link>
                            <button
                              className="dropdown-item"
                              type="button"
                              onClick={() => {
                                dispatch(LogoutAction());
                              }}
                            >
                              <a>
                                <i className="fa fa-sign-out"></i> {t("Logout")}
                              </a>
                            </button>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div
                    className="cp-user-sidebar-toggler-s2"
                    onClick={() => {
                      setActive(active ? false : true);
                    }}
                  >
                    <img src="/menu.svg" className="img-fluid" alt="" />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>

      <OutsideClickHandler onOutsideClick={() => setActive(false)}>
        <div className={`cp-user-sidebar ${active ? "active" : ""}`}>
          <div
            onClick={() => setActive(false)}
            className="cp-user-sidebar-menu scrollbar-inner"
          >
            <nav>
              <ul id="metismenu">
                <li className=" cp-user-active-page ">
                  <a
                    href={
                      router.locale !== "en"
                        ? `/${router.locale}/exchange/dashboard`
                        : "/exchange/dashboard"
                    }
                  >
                    <span className="cp-user-icon">
                      <img
                        src=""
                        className="img-fluid cp-user-side-bar-icon"
                        alt=""
                      />
                      <img
                        src=""
                        className="img-fluid cp-user-side-bar-icon-hover"
                        alt=""
                      />
                    </span>
                    <span className="cp-user-name">{t("Dashboard")}</span>
                  </a>
                </li>

                <li>
                  <a className="arrow-icon" href="#" aria-expanded="true">
                    <span className="cp-user-icon">
                      <img
                        src=""
                        className="img-fluid cp-user-side-bar-icon"
                        alt=""
                      />
                      <img
                        src=""
                        className="img-fluid cp-user-side-bar-icon-hover"
                        alt=""
                      />
                    </span>
                    <span className="cp-user-name">{t("Wallet")}</span>
                  </a>
                  <ul>
                    <Link
                      href={
                        isLoggedIn
                          ? "/user/my-wallet"
                          : "/authentication/signin"
                      }
                    >
                      <li>
                        <a href="">{t("My Wallet")}</a>
                      </li>
                    </Link>
                    <Link
                      href={isLoggedIn ? "/deposit" : "/authentication/signin"}
                    >
                      <li>
                        <a href="">{t("Swap Coin")}</a>
                      </li>
                    </Link>

                    <Link
                      href={
                        isLoggedIn
                          ? "/user/swap-coin"
                          : "/authentication/signin"
                      }
                    >
                      <li>
                        <a href="">{t("Fiat Deposit")}</a>
                      </li>
                    </Link>
                  </ul>
                </li>
                <li>
                  <a className="arrow-icon" href="#" aria-expanded="true">
                    <span className="cp-user-icon">
                      <img
                        src=""
                        className="img-fluid cp-user-side-bar-icon"
                        alt=""
                      />
                      <img
                        src=""
                        className="img-fluid cp-user-side-bar-icon-hover"
                        alt=""
                      />
                    </span>
                    <span className="cp-user-name">{t("Reports")}</span>
                  </a>
                  <ul>
                    <Link
                      href={
                        isLoggedIn
                          ? "/user/wallet-history?type=deposit"
                          : "/authentication/signin"
                      }
                    >
                      <li>
                        <a href="">{t("Deposit History")}</a>
                      </li>
                    </Link>
                    <Link
                      href={
                        isLoggedIn
                          ? "/user/wallet-history?type=withdrawal"
                          : "/authentication/signin"
                      }
                    >
                      <li>
                        <a href="">{t("Withdrawal History")}</a>
                      </li>
                    </Link>
                    <Link
                      href={
                        isLoggedIn
                          ? "/user/swap-history"
                          : "/authentication/signin"
                      }
                    >
                      <li>
                        <a href="">{t("Swap History")}</a>
                      </li>
                    </Link>
                    <Link
                      href={
                        isLoggedIn
                          ? "/user/buy-order-history"
                          : "/authentication/signin"
                      }
                    >
                      <li>
                        <a href="">{t("Buy Order History")}</a>
                      </li>
                    </Link>
                    <Link
                      href={
                        isLoggedIn
                          ? "/user/sell-order-history"
                          : "/authentication/signin"
                      }
                    >
                      <li>
                        <a href="">{t("Sell Order History")}</a>
                      </li>
                    </Link>
                    <Link
                      href={
                        isLoggedIn
                          ? "/user/transaction-history"
                          : "/authentication/signin"
                      }
                    >
                      <li>
                        <a href="">{t("Transaction History")}</a>
                      </li>
                    </Link>
                  </ul>
                </li>
                <li>
                  <a className="arrow-icon" href="#" aria-expanded="true">
                    <span className="cp-user-icon">
                      <img
                        src=""
                        className="img-fluid cp-user-side-bar-icon"
                        alt=""
                      />
                      <img
                        src=""
                        className="img-fluid cp-user-side-bar-icon-hover"
                        alt=""
                      />
                    </span>
                    <span className="cp-user-name">{t("My Profile")}</span>
                  </a>
                  <ul>
                    <Link
                      href={
                        isLoggedIn ? "/user/profile" : "/authentication/signin"
                      }
                    >
                      <li>
                        <a href="">{t("Profile")}</a>
                      </li>
                    </Link>
                    <Link
                      href={
                        isLoggedIn
                          ? "/user/edit-profile"
                          : "/authentication/signin"
                      }
                    >
                      <li>
                        <a href="">{t("Edit Profile")}</a>
                      </li>
                    </Link>
                    <Link
                      href={
                        isLoggedIn
                          ? "/user/phone-verification"
                          : "/authentication/signin"
                      }
                    >
                      <li>
                        <a href="">{t("Phone Verification")}</a>
                      </li>
                    </Link>
                    <Link
                      href={
                        isLoggedIn ? "/user/security" : "/authentication/signin"
                      }
                    >
                      <li>
                        <a href="">{t("Security")}</a>
                      </li>
                    </Link>
                    <Link
                      href={
                        isLoggedIn
                          ? "/user/verification-list"
                          : "/authentication/signin"
                      }
                    >
                      <li>
                        <a href="">{t("Verification List")}</a>
                      </li>
                    </Link>
                    <Link
                      href={
                        isLoggedIn
                          ? "/user/personal-verification"
                          : "/authentication/signin"
                      }
                    >
                      <li>
                        <a href="">{t("Personal Verification")}</a>
                      </li>
                    </Link>
                    <Link
                      href={
                        isLoggedIn
                          ? "/user/change-password"
                          : "/authentication/signin"
                      }
                    >
                      <li>
                        <a href="">{t("Change Password")}</a>
                      </li>
                    </Link>
                  </ul>
                </li>
                <li>
                  <Link href="/user/referral">
                    <a>
                      <span className="cp-user-icon">
                        <img
                          src=""
                          className="img-fluid cp-user-side-bar-icon"
                          alt=""
                        />
                        <img
                          src=""
                          className="img-fluid cp-user-side-bar-icon-hover"
                          alt=""
                        />
                      </span>
                      <span className="cp-user-name">{t("My Referral")}</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <a className="arrow-icon" href="#" aria-expanded="true">
                    <span className="cp-user-icon">
                      <img
                        src=""
                        className="img-fluid cp-user-side-bar-icon"
                        alt=""
                      />
                      <img
                        src=""
                        className="img-fluid cp-user-side-bar-icon-hover"
                        alt=""
                      />
                    </span>
                    <span className="cp-user-name">{t("Settings")}</span>
                  </a>
                  <ul>
                    <Link
                      href={
                        isLoggedIn ? "/user/settings" : "/authentication/signin"
                      }
                    >
                      <li>
                        <a href="">{t("My Settings")}</a>
                      </li>
                    </Link>
                    <Link
                      href={isLoggedIn ? "/user/faq" : "/authentication/signin"}
                    >
                      <li>
                        <a href="">{t("FAQ")}</a>
                      </li>
                    </Link>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </OutsideClickHandler>
    </>
  );
};

export default Navbar;
