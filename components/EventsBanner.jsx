import React from "react";
import Image from "next/image";
import event1 from "../src/assets/event1.png";
import event2 from "../src/assets/event2.png";
import event3 from "../src/assets/event3.png";

const EventsBanner = () => {
  return (
    <section className="event-container">
      <div className="subtitle">
        <span>STYLE ALERTS</span>
        <h2>Fresh Drops & Exclusive Offers</h2>
      </div>

      <div className="event-banner">
        <div className="event-banner-left">
          <div className="event-card">
            <div className="content">
              <h3>
                NEW SEASON LAUNCH <span>UP TO 40% OFF</span>
              </h3>
              <p>Selected Modern Collection</p>
            </div>
            <Image src={event1} alt="Modern Fashion Event" />
          </div>

          <div className="event-card">
            <h3>FIRST ORDER PERK</h3>
            <p>USE CODE: WELCOME25</p>
            <button>AASMODERN25</button>
          </div>
        </div>

        <div className="event-banner-right">
          <div className="event-banner-right-1">
            <div className="details">
              <p>Nova Sculpted Blazer</p>
              <div className="price">
                <span>Rs.5500.00</span>
                <span>Rs.4800.00</span>
              </div>
            </div>
            <Image src={event2} alt="Nova Sculpted Blazer Promotion" />
          </div>

          <div className="event-banner-right-2">
            <div className="details">
              <p>MetroFlex Blazer</p>
              <div className="price">
                <span>Rs.4500.00</span>
                <span>Rs.3900.00</span>
              </div>
            </div>
            <Image src={event3} alt="MetroFlex Blazer Promotion" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsBanner;
