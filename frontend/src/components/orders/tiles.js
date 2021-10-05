import React, { useState, useEffect } from "react";
import Sent from "../../assets/icons/TotalOrdersReceived.png";
import Received from "../../assets/icons/TotalOrdersSent.png";
import Rejected from "../../assets/icons/TotalOrdersRejected.png";
import Current from "../../assets/icons/TotalOrdersPending.png";
import { getOrderAnalytics } from "../../actions/analyticsAction";
import "./style.scss";

const Tiles = (props) => {
  const [orderAnalytics, setOrderAnalytics] = useState({
    outboundPO: 0,
    inboundPO: 0,
    pendingOrders: 0,
    rejectedOrders: 0,
  });
  useEffect(() => {
    async function fetchData() {
      const result = await getOrderAnalytics();
      setOrderAnalytics(result.data.order);
    }
    fetchData();
  }, []);
  return (
    // <div className="row mb-4">
    //   <div className="col">
    //     <div onClick={() => props.setData("one")} className="panel cursorP">
    //       <div className="picture recived-bg ml-1">
    //         <img src={Received} alt="truck" />
    //       </div>
    //       <div className="d-flex flex-column">
    //         <div className="title recived-text font-weight-bold">
    //           Total Orders Sent
    //         </div>
    //         <div className="recived-text count">
    //           {orderAnalytics?.outboundPO}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="col">
    //     <div onClick={() => props.setData("two")} className="panel cursorP">
    //       <div className="picture sent-bg ml-1">
    //         <img src={Sent} alt="truck" />
    //       </div>
    //       <div className="d-flex flex-column">
    //         <div className="title sent-text font-weight-bold">
    //           Total Orders Received
    //         </div>
    //         <div className="sent-text count">{orderAnalytics?.inboundPO}</div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="col">
    //     <div
    //       onClick={() => props.setData("two", true)}
    //       className="panel cursorP"
    //     >
    //       <div className="picture inbound-alert-bg ml-1">
    //         <img src={Current} alt="truck" />
    //       </div>
    //       <div className="d-flex flex-column">
    //         <div className="title inbound-text font-weight-bold">
    //           Total Orders Pending
    //         </div>
    //         <div className="inbound-text count">
    //           {orderAnalytics?.pendingOrders}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="col">
    //     <div
    //       onClick={() => props.setData("one", true)}
    //       className="panel cursorP"
    //     >
    //       <div className="picture outbound-alert-bg ml-1">
    //         <img src={Rejected} alt="truck" />
    //       </div>
    //       <div className="d-flex flex-column">
    //         <div className="title outbound-text font-weight-bold">
    //           Total Orders Rejected
    //         </div>
    //         <div className="outbound-text count">
    //           {orderAnalytics?.rejectedOrders}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="grid-tile-container">
      <div onClick={() => props.setData("one")} className="grid-tiles">
        <div className="picture recived-bg">
          <img src={Received} alt="truck" />
        </div>

        <div className="tile-content">
          <p className="recived-text font-weight-bold">Total Orders Sent</p>
          <h1 className="count recived-text">{orderAnalytics?.outboundPO}</h1>
        </div>
      </div>

      <div onClick={() => props.setData("two")} className="grid-tiles">
        <div className="picture sent-bg">
          <img src={Sent} alt="truck" />
        </div>

        <div className="tile-content">
          <p className="recived-text font-weight-bold">Total Orders Received</p>
          <h1 className="count sent-text">{orderAnalytics?.inboundPO}</h1>
        </div>
      </div>

      <div onClick={() => props.setData("two", true)} className="grid-tiles">
        <div className="picture inbound-alert-bg">
          <img src={Current} alt="truck" />
        </div>

        <div className="tile-content">
          <p className="inbound-text font-weight-bold">Total Orders Pending</p>
          <h1 className="count inbound-text">
            {orderAnalytics?.pendingOrders}
          </h1>
        </div>
      </div>

      <div  onClick={() => props.setData("one", true)} className="grid-tiles">
        <div className="picture outbound-alert-bg">
          <img src={Rejected} alt="truck" />
        </div>

        <div className="tile-content">
          <p className="outbound-text font-weight-bold">Total Orders Rejected</p>
          <h1 className="count outbound-text">
            {orderAnalytics?.rejectedOrders}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Tiles;
