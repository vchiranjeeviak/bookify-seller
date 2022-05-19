import React from "react";
import "../styles/home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="faq">
        <h5 className="question">What is Bookify-Seller ?</h5>
        <p className="answer">
          It is a platform to sell your used books so that others who are
          interested can buy.
        </p>
      </div>
      <div className="faq">
        <h5 className="question">How does this work ?</h5>
        <p className="answer">
          You can add your books here which you want to sell on our platform.
          Customers will be able to buy them from our Bookify-Buyer App.
        </p>
      </div>
      <div className="faq">
        <h5 className="question">How to reach Bookify-Buyer app ?</h5>
        <p className="answer">
          Bookify-Buyer app is not ready yet. Once it is ready, we will add the
          link to that here.
        </p>
      </div>
      <div className="faq">
        <h5 className="question">
          Where can I see the books added by myself ?
        </h5>
        <p className="answer">
          You can see the books added by you in profile tab.
        </p>
      </div>
      <div className="faq">
        <h5 className="question">How to send my book if someone buys it ?</h5>
        <p className="answer">
          You don't worry about that. Our delivery partner will reach out to you
          if anyone buys your book and delivers it for you.
        </p>
      </div>
      <div className="faq">
        <h5 className="question">
          I have an account in Bookify-Buyer app. Do I have to create again for
          Bookify-Seller app ?
        </h5>
        <p className="answer">
          No, you can login to both the apps using same credentials.
        </p>
      </div>
    </div>
  );
};

export default Home;
