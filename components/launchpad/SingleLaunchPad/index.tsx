import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const SingleLaunchPad = ({ data }: any) => {
  const { t } = useTranslation("common");
  return (
    <>
      {/* {JSON.stringify(data)} */}
      <div className="container singleLaunch">
        <div className="singleLaunchPadHero">
          <div className="singleLaunchPadHeroFlex">
            <div className="">
              <img
                className="singleLaunchPadImg icoImage"
                src={data?.image ? data?.image : "/launchpad.png"}
                alt="---"
              />
            </div>
            <div className="">
              <div className="singleLaunchPadTitle">
                <h2>{data?.title}</h2>
                <div className="singleLaunchPadStatus">
                  <i className="fa-sharp fa-solid fa-circle-check"></i>
                  <p> FINISHED</p>
                </div>
              </div>

              <div className="singleLaunchPadLinkList">
                <p>{data?.project_introduction}</p>
                <div className="linkLists">
                  <Link href="/">
                    <div>
                      <i className="fa-sharp fa-solid fa-link"></i>
                      <p>{t("Website")}</p>
                    </div>
                  </Link>

                  <Link href="/">
                    <div>
                      <i className="fa-solid fa-receipt"></i>
                      <p>{t("Whitepaper")}</p>
                    </div>
                  </Link>

                  <Link href="/">
                    <div>
                      <i className="fa-sharp fa-solid fa-lightbulb"></i>
                      <p>{t("GMT Research Report")}</p>
                    </div>
                  </Link>

                  <Link href="/">
                    <div>
                      <i className="fa-sharp fa-solid fa-book"></i>
                      <p>{t("View detailed rules")}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="endtimeSingleLaunch">
            <p>{t("End Time :")}</p>
            <p>{data?.end_date}</p>
          </div>
        </div>

        <div className="launchCoinDetails">
          <div>
            <p>{t("Type")}</p>
            <span>{t("Subscription")}</span>
          </div>
          <div>
            <p>{t("Sale Price")}</p>
            <span>{`1 ${data?.coin_name} = ${data?.coin_price} ${data?.coin_type}`}</span>
          </div>
          <div>
            <p>{t("Tokens Offered")}</p>
            <span>{`${parseFloat(data?.total_token_supply)} `}</span>
          </div>
          <div>
            <p>Single Initial Investment</p>
            <span>0.1 BNB</span>
          </div>
          <div>
            <p>Hard cap per user</p>
            <span>1500000 GMT = 37.7100 BNB (≈ 10378 USD)</span>
          </div>
        </div>

        <div className="subscriptionTimeLine">
          <h2>Subscription Timeline</h2>
          <div className="flexItem">
            <div>
              <div className="timeLineLists">
                <div className="timeLineIcon">
                  <i className="fa-sharp fa-solid fa-circle-check"></i>
                </div>
                <div>
                  <h5>BNB Holding Calculation Period</h5>
                  <span>2022-03-02 06:00</span>
                </div>
              </div>

              <div className="timeLineLists">
                <div className="timeLineIcon">
                  <i className="fa-sharp fa-solid fa-circle-check"></i>
                </div>
                <div>
                  <h5>Subscription Period</h5>
                  <span>2022-03-02 06:00</span>
                </div>
              </div>

              <div className="timeLineLists">
                <div className="timeLineIcon">
                  <i className="fa-sharp fa-solid fa-circle-check"></i>
                </div>
                <div>
                  <h5>Calculation Period</h5>
                  <span>2022-03-02 06:00</span>
                </div>
              </div>
              <div className="timeLineLists">
                <div className="">
                  <i className="fa-sharp fa-solid fa-circle-check active"></i>
                </div>
                <div>
                  <h5>Final Token Distribution</h5>
                  <span>2022-03-02 06:00</span>
                  <p>
                    The allocation calculation is complete. We will deduct the
                    corresponding BNB from your account based on your final GMT
                    allocation, which will be transferred to your spot account
                    along with your remaining BNB.
                  </p>
                  <div className="commintCoin">
                    <div className="text-center">
                      <i className="fa-sharp fa-solid fa-circle-info"></i>
                      <p>you did not commit any BNB for this session.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="launchPadHistory">
              <Link href={"/"}>
                <a>Launchpad History</a>
              </Link>
            </div>
          </div>
        </div>

        <div className="singleLaunchDetails">
          <div className="row">
            <div className="col-md-9 col-sm-12 col-12 contentDetails">
              <h3>STEPN - A Move-to-Earn Health and Fitness Application</h3>
              <div>
                <h6>Project Introduction</h6>
                <p>
                  STEPN is a Move-to-Earn health and fitness application. Users
                  equipped with Sneaker NFT can move outdoors to earn tokens and
                  NFT rewards. STEPN has a built-in wallet, swap, marketplace,
                  and RNPL (Rent Now Pay Later) system to make STEPN a bridge
                  between crypto and non-crypto users. STEPN has a dual-token
                  system, a game token - Green Satoshi Token (GST) and a
                  governance token - Green Metaverse Token (GMT). GMT is the
                  native governance token of STEPN and has the following use
                  cases: Governance: Stake to participate in governance, the
                  longer the locking period, the higher the voting power. Profit
                  distribution: GMT holders own the treasury and can vote to
                  decide the distribution of net profit. Accrual of protocol
                  revenue: GMT is burned to access in-app features, such as
                  sneaker upgrades and minting of new sneakers.
                </p>
              </div>

              <div>
                <h6>Key Features and Highlights</h6>
                <p>
                  Mobile application: STEPN is live on iOS AppStore and Google
                  Play store (Restricted to certain countries). Sneaker NFT:
                  Every sneaker has different types, qualities, attributes, and
                  gem sockets. Users can burn tokens to level up and customize
                  sneakers. Move and Earn: Users equipped with sneakers NFT can
                  move outdoors and earn tokens. There are multi-layers
                  anti-cheating mechanics to prevent exploitation. RNPL (Rent
                  Now Pay Later) system: Users can rent a sneaker for free, move
                  and earn and then split the earnings with the sneaker owner.
                  In-app NFT marketplace: Users can trade their NFTs on the
                  marketplace. In-app swap: Users can swap their token earnings
                  to other forms of cryptocurrencies. In-app decentralized
                  wallet: Users can deposit and send cryptocurrencies to the
                  wallet to fund their spending accounts. STEPN has raised 5MM
                  USD from Sequoia Capital and other leading Web3 investors,
                  where 16.30% of the GMT total token supply has been sold at
                  0.005 USD/GMT.
                </p>
              </div>

              <div>
                <h6>STEPN Token Sale and Economics</h6>
                <table className="table table-striped">
                  <tbody>
                    <tr>
                      <th scope="row">Hard Cap</th>
                      <td>4200000 USD</td>
                    </tr>
                    <tr>
                      <th scope="row">Total Token Supply</th>
                      <td>6000000000 GMT</td>
                    </tr>
                    <tr>
                      <th scope="row">Initial Circulating Supply</th>
                      <td>10% of Total Token Supply</td>
                    </tr>
                    <tr>
                      <th scope="row">Public Sale Token Price</th>
                      <td>
                        0.01 USD (price in BNB will be determined prior to the
                        start of subscription)
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Tokens Offered</th>
                      <td>420000000 GMT</td>
                    </tr>
                    <tr>
                      <th scope="row">Hard Cap Per User</th>
                      <td>
                        15000 USD (price in BNB will be determined prior to the
                        start of subscription)
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Token Sale Vesting Period</th>
                      <td>No lockup</td>
                    </tr>
                    <tr>
                      <th scope="row">Token Type</th>
                      <td>SPL</td>
                    </tr>
                    <tr>
                      <th scope="row">Token Distribution</th>
                      <td>After the end of token sale</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-3 col-sm-12 col-12">
              <h5>Social Channels</h5>
              <div className="socialLinks">
                <Link href={"/"}>
                  <div className="socialList">
                    <i className="fa-brands fa-telegram"></i>
                    <a>https://telegram.com</a>
                  </div>
                </Link>

                <Link href={"/"}>
                  <div className="socialList">
                    <i className="fa-brands fa-twitter"></i>
                    <a>https://twitter.com</a>
                  </div>
                </Link>

                <Link href={"/"}>
                  <div className="socialList">
                    <i className="fa-brands fa-facebook"></i>
                    <a>https://facebook.com</a>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
