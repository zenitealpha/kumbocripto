import React from "react";

const SellingSection = () => {
  return (
    <section className="mt-5">
      <div className="container">
        <div className="section-title">
          <h2>Why choose us?</h2>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <a href="#" className="single-card">
              <img className="card-icon" src="/chooseOne.svg" alt="icon" />
              <h3 className="card-title">Exposure</h3>
              <p className="card-content">
                Get exposure to the millions of Binance users around the world.
              </p>
            </a>
          </div>
          <div className="col-lg-3 col-md-6">
            <a href="#" className="single-card">
              <img className="card-icon" src="/chooseTwo.svg" alt="icon" />
              <h3 className="card-title">Liquidity</h3>
              <p className="card-content">
                Projects that are launched on Launchpad or Launchpool will be
                listed and have world-class liquidity in multiple trading pairs.
              </p>
            </a>
          </div>
          <div className="col-lg-3 col-md-6">
            <a href="#" className="single-card">
              <img className="card-icon" src="/chooseThree.svg" alt="icon" />
              <h3 className="card-title">Token Distribution</h3>
              <p className="card-content">
                Your token will immediately be distributed to a large user base
                that hold your token.
              </p>
            </a>
          </div>
          <div className="col-lg-3 col-md-6">
            <a href="#" className="single-card">
              <img className="card-icon" src="/chooseFour.svg" alt="icon" />
              <h3 className="card-title">Future Synergy</h3>
              <p className="card-content">
                Project will receive extensive support and advice even after
                listing, having access to all areas of the Binance ecosystem.
              </p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellingSection;
