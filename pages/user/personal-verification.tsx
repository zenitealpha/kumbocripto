import type { GetServerSideProps, NextPage } from "next";
import ProfileSidebar from "layout/profile-sidebar";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import NidModal from "components/profile/personal-verification/NidModal";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getKycDetailsAction } from "state/actions/user";
import useTranslation from "next-translate/useTranslation";
import { KycActiveList } from "service/user";
import {
  KYC_DRIVING_VERIFICATION,
  KYC_EMAIL_VERIFICATION,
  KYC_NID_VERIFICATION,
  KYC_PASSPORT_VERIFICATION,
  KYC_PHONE_VERIFICATION,
  KYC_VOTERS_CARD_VERIFICATION,
} from "helpers/core-constants";
import { customPage, landingPage } from "service/landing-page";
import Footer from "components/common/footer";

const PersonalVerification: NextPage = ({
  customPageData,
  socialData,
  copyright_text,
}: any) => {
  const { t } = useTranslation("common");
  const [type, setType] = useState<string>("");
  const [kycDetails, setKycDetails] = useState<any>();
  const [kycActiveList, setKycActiveList] = useState<any>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getKycDetailsAction(setKycDetails, setKycActiveList));
  }, []);

  return (
    <>
      <div className="page-wrap">
        <ProfileSidebar />
        <div className="page-main-content">
          <div className="container-fluid">
            <div className="section-top-wrap mb-25">
              <div className="profle-are-top">
                <h2 className="section-top-title">
                  {t("Personal Verification")}
                </h2>
              </div>
            </div>
            <NidModal type={type} kycDetails={kycDetails} />
            <div className="profile-area">
              {/* <h4 className="section-title-medium">{t("Verification")}</h4> */}
              <div className="section-wrapper boxShadow">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="cp-user-profile-header">
                      <h5>{t("Select Your ID Type")}</h5>
                    </div>
                    <div className="cp-user-profile-info-id-type">
                      {kycActiveList?.map(
                        (item: any, index: number) =>
                          item.type != KYC_PHONE_VERIFICATION &&
                          item.type != KYC_EMAIL_VERIFICATION && (
                            <div
                              key={`kyc${index}`}
                              className="id-card-type mb-5"
                              onClick={() => {
                                {
                                  item.type == KYC_PASSPORT_VERIFICATION &&
                                    kycDetails?.passport?.status;
                                  setType("passport");
                                }
                                {
                                  item.type == KYC_DRIVING_VERIFICATION &&
                                    setType("driving");
                                }
                                {
                                  item.type == KYC_NID_VERIFICATION &&
                                    setType("nid");
                                }
                                {
                                  item.type == KYC_VOTERS_CARD_VERIFICATION &&
                                    setType("voter");
                                }
                              }}
                            >
                              <div
                                className="id-card"
                                data-toggle="modal"
                                data-target=".cp-user-idverifymodal"
                              >
                                <img
                                  src={item.image}
                                  className="img-fluid"
                                  alt=""
                                />
                              </div>
                              <div
                                className={`card-bottom ${
                                  item.type == KYC_PASSPORT_VERIFICATION
                                    ? kycDetails?.passport?.status == "Pending"
                                      ? "pending"
                                      : kycDetails?.passport?.status ==
                                        "Approved"
                                      ? "success"
                                      : ""
                                    : item.type == KYC_DRIVING_VERIFICATION
                                    ? kycDetails?.driving?.status == "Pending"
                                      ? "pending"
                                      : kycDetails?.driving?.status ==
                                        "Approved"
                                      ? "success"
                                      : ""
                                    : item.type == KYC_NID_VERIFICATION
                                    ? kycDetails?.nid?.status == "Pending"
                                      ? "pending"
                                      : kycDetails?.nid?.status == "Approved"
                                      ? "success"
                                      : ""
                                    : item.type == KYC_VOTERS_CARD_VERIFICATION
                                    ? kycDetails?.voter?.status == "Pending"
                                      ? "pending"
                                      : kycDetails?.voter?.status == "Approved"
                                      ? "success"
                                      : ""
                                    : ""
                                }`}
                              >
                                <span className="text-warning">
                                  {item.type == KYC_PASSPORT_VERIFICATION &&
                                    kycDetails?.passport?.status}
                                  {item.type == KYC_DRIVING_VERIFICATION &&
                                    kycDetails?.driving?.status}
                                  {item.type == KYC_NID_VERIFICATION &&
                                    kycDetails?.nid?.status}
                                  {item.type == KYC_VOTERS_CARD_VERIFICATION &&
                                    kycDetails?.voter?.status}
                                </span>
                                <h5>{item.name}</h5>
                              </div>
                            </div>
                          )
                      )}

                      {/* <div
                      className="id-card-type"
                      onClick={() => setType("nid")}
                    >
                      <div
                        className="id-card"
                        data-toggle="modal"
                        data-target=".cp-user-idverifymodal"
                      >
                        <img
                          src="/cards/nid.svg"
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                      <div className="card-bottom">
                        <span className="text-warning">
                          {kycDetails?.nid?.status}
                        </span>
                        <h5>{t("National Id Card")}</h5>
                      </div>
                    </div>
                    <div
                      className="id-card-type"
                      onClick={() => setType("passport")}
                    >
                      <div
                        className="id-card"
                        data-toggle="modal"
                        data-target=".cp-user-idverifymodal"
                      >
                        <img
                          src="/cards/passport.svg"
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                      <div className="card-bottom">
                        <span className="text-warning">
                          {kycDetails?.passport?.status}
                        </span>
                        <h5>{t("Passport")}</h5>
                      </div>
                    </div>
                    <div
                      className="id-card-type"
                      onClick={() => setType("driving-licence")}
                    >
                      <div
                        className="id-card"
                        data-toggle="modal"
                        data-target=".cp-user-idverifymodal"
                      >
                        <img
                          src="/cards/driving-license.svg"
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                      <div className="card-bottom">
                        <span className="text-warning">
                          {kycDetails?.driving?.status}
                        </span>
                        <h5>{t("Driving License")}</h5>
                      </div>
                    </div> */}
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
  await SSRAuthCheck(ctx, "/user/personal-verification");
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

export default PersonalVerification;
