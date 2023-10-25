import Footer from "components/common/footer";
import type { GetServerSideProps, NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { getFaqList } from "service/faq";
import { customPage, landingPage } from "service/landing-page";

const Index: NextPage = ({
  faq,
  customPageData,
  socialData,
  copyright_text,
}: any) => {
  const { t } = useTranslation("common");
  const [active, setActive] = useState<number>(1);
  const handleActive = (index: number) => {
    if (index === active) {
      setActive(0);
    } else {
      setActive(index);
    }
  };

  return (
    <>
      <div className="container-fluid faq-page">
        <div
          className="alert alert-success alert-dismissible fade show d-none"
          role="alert"
          id="web_socket_notification"
        >
          <span id="socket_message" />
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div
          className="modal fade"
          id="confirm-modal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              ></button>
              <div className="text-center">
                <img
                  src="/add-pockaet-vector.svg"
                  className="img-fluid img-vector"
                  alt=""
                />
                <h3 id="confirm-title" />
              </div>
              <div className="modal-body">
                <a
                  id="confirm-link"
                  href="#"
                  className="btn btn-block cp-user-move-btn"
                >
                  {t("Confirm")}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="section-top-wrap mb-25">
          <div className="profle-are-top">
            <h2 className="section-top-title mb-0">{t("FAQ")}</h2>
          </div>
        </div>
        <div className="container mb-25">
          <div className="section-wrapper boxShadow">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="accordion" id="accordionExample">
                  {faq?.data?.map((item: any, index: number) => (
                    <div
                      key={`faq${index}`}
                      className="cp-user-referral-content"
                    >
                      <div className="card">
                        <div
                          className="card-header"
                          id="headingOne"
                          onClick={() => handleActive(index + 1)}
                        >
                          <h5 className="mb-0 header-align">
                            <button
                              className="btn btn-link collapsed"
                              data-toggle="collapse"
                              data-target={`#collapseOne1${index + 1}`}
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              {item.question}
                            </button>
                            <i
                              className={`fas ${
                                active === index + 1
                                  ? "fa-caret-up"
                                  : "fa-caret-down"
                              } mright-5`}
                            ></i>
                          </h5>
                        </div>

                        {active === index + 1 && (
                          <div
                            id={`collapseOne1${index + 1}`}
                            className="collapse show"
                            aria-labelledby="headingOne"
                            data-parent="#accordion"
                          >
                            <div className="card-body">{item.answer}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="faq-image text-center">
                  <img src="/faq-image.png" alt="faq-image" />
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
  const { data: faqs } = await getFaqList();
  const { data } = await landingPage();
  const { data: customPageData } = await customPage();
  return {
    props: {
      faq: faqs,
      socialData: data.media_list,
      copyright_text: data?.copyright_text,
      customPageData: customPageData.data,
    },
  };
};

export default Index;
