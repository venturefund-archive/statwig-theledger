import React from "react";
import "./style.scss";
import { setTracingShipments } from "../../../actions/shipmentActions";
import { useDispatch } from "react-redux";
import alert from "../../../assets/icons/alert.png";
import location from "../../../assets/icons/CurrentLocationWhite.svg";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/dateHelper";
import Pagination from "@material-ui/lab/Pagination";
import mon from "../../../assets/icons/brand.svg";
import calender from "../../../assets/icons/calendar.svg";
import FilterIcon from "../../../assets/icons/Filter.svg";
import ExportIcon from "../../../assets/icons/Export.svg";
import dropdownIcon from "../../../assets/icons/drop-down.svg";
import updownarrow from "../../../assets/icons/up-and-down-1.svg";
import Status from "../../../assets/icons/Status.svg";
import Received from "../../../assets/icons/Received1.svg";
import Sent from "../../../assets/icons/Sent.png";

function Table(props) {
  const dispatch = useDispatch();
  const { shpmnts } = props;
  const shipments = shpmnts();
  shipments.sort(function (a, b) {
    if (a.id > b.id) {
      return -1;
    } else {
      return 1;
    }
  });
  const handlePageChange = (event, value) => {
    props.onPageChange(value);
  };
  return (
    <div>
      <table class="table">
        <thead>
          <tr>
            <th className="cursorP">
              <img src={mon} width="16" height="16" className="mr-2" alt="" />
              Shipment ID
              <img
                src={updownarrow}
                height="10"
                width="15"
                style={{ float: "right", marginTop: "5px" }}
                alt=""
              />
            </th>
            <th className="cursorP">
              <img
                src={calender}
                width="16"
                height="16"
                className="mr-2"
                alt=""
              />
              Shipping Date
            </th>
            <th className="cursorP">
              <img src={Received} width="18" height="16" className="mr-2" alt="" />
              From
              <img
                src={updownarrow}
                height="10"
                width="15"
                style={{ float: "right", marginTop: "5px" }}
                alt=""
              />
            </th>
            <th className="cursorP">
              <img
                src={Sent}
                width="16"
                height="16"
                className="mr-2"
                alt=""
              />
              To
              <img
                src={updownarrow}
                height="10"
                width="15"
                style={{ float: "right", marginTop: "5px" }}
                alt=""
              />
            </th>
            <th className="cursorP">
              <img
                src={Status}
                width="16"
                height="16"
                className="mr-2"
                alt=""
              />
              Status
              <img
                src={updownarrow}
                height="10"
                width="15"
                style={{ float: "right", marginTop: "5px" }}
                alt=""
              />
            </th>
            <th>
              <button className="btn-filter-info">
                <div className="d-flex align-items-center">
                  <img
                    src={FilterIcon}
                    width="14"
                    height="14"
                    className="mr-2"
                    alt="FilterIcon"
                  />
                  <span className="text">Filter</span>
                  <img
                    src={dropdownIcon}
                    width="10"
                    height="10"
                    className="ml-2"
                    alt="Drop Down Icon"
                  />
                </div>
              </button>
              <button className="btn-filter-blue ml-2">
                <div className="d-flex  align-items-center">
                  <img
                    src={ExportIcon}
                    width="14"
                    height="14"
                    className="mr-2"
                    alt="Export Icon"
                  />
                  <span className="text">Export</span>
                  <img
                    src={dropdownIcon}
                    width="10"
                    height="10"
                    className="ml-2"
                    alt="DropDownIcon"
                  />
                </div>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* {shipments.length === 0 && (
            <div className='rTableRow pt-2 pb-2 justify-content-center text-muted shadow-none'>
              No records found
            </div>
          )}
          {shipments.map((shipment, index) => {
            let statusStyle = "bg-primary";
            let status = "Shipped";
            if (shipment.status === "RECEIVED") {
              statusStyle = "bg-success";
              status = "Delivered";
            }
            let supplierAddress = shipment.supplier.warehouse.warehouseAddress;
            let wLocation = shipment.supplier.warehouse?.location;
            if (wLocation?.length) {
              supplierAddress =
                wLocation.firstLine + wLocation.secondLine + wLocation.city;
            }
            let receiverAddress = shipment.receiver.warehouse.warehouseAddress;
            let wrLocation = shipment.receiver.warehouse?.location;
            if (wrLocation?.length) {
              supplierAddress =
                wrLocation.firstLine + wrLocation.secondLine + wrLocation.city;
            }
            return (
              <div
                className='col-12 p-3 mb-3 ml-1 rounded1 row bg-white shadow'
                key={index}
              >
                {" "}
                {/* rTableRow pt-3 pb-3 */}
          {/* <div className="rTableCell">
                  <div className="combine-data">{shipment.receiver.id}</div>
                </div> */}
          {/* <div
                  className='col-1 txt1'
                  style={{ padding: 0, left: "10px" }}
                >
                  <span className='text-primary'>{shipment.id}</span>
                  {shipment?.shipmentAlerts?.length > 0 && (
                    <span
                      style={{ backgroundColor: "#EAEAEA", marginLeft: 5 }}
                      className='rounded p-1'
                    >
                      <img style={{ height: 15 }} src={alert} alt='Alert' />
                    </span>
                  )}
                </div>
                <div
                  className='col-1 txt1'
                  style={{ position: "relative", left: "4.5%" }}
                >
                  {shipment?.shippingDate?.length === 10
                    ? shipment.shippingDate
                    : formatDate(shipment.shippingDate)}
                </div>
                <div
                  className='col-3 txt1 '
                  style={{ position: "relative", left: "10%" }}
                >
                  <p className='mb-0'>
                    {shipment.supplier.org ? shipment.supplier.org.name : "-"} 
                  </p>
                  <p className='address mb-0 text-muted'>{`${
                    supplierAddress.firstLine ? supplierAddress.firstLine : ""
                  } ${
                    supplierAddress.secondLine ? supplierAddress.secondLine : ""
                  } ${supplierAddress.city ? supplierAddress.city : ""}\n ${
                    supplierAddress.state ? supplierAddress.state : ""
                  }\n ${
                    supplierAddress.country ? supplierAddress.country : ""
                  } `}</p>
                </div>
                <div
                  className='col-3 txt1 '
                  style={{ position: "relative", left: "12%" }}
                >
                  <p className='mb-0'>
                    {shipment.receiver.org ? shipment.receiver.org.name : "-"}//////////////////
                  </p>
                  <p className='mb-0 address text-muted'>{`${
                    receiverAddress.firstLine ? receiverAddress.firstLine : ""
                  }  ${
                    receiverAddress.secondLine ? receiverAddress.secondLine : ""
                  } ${receiverAddress.city ? receiverAddress.city : ""} \n ${
                    receiverAddress.state ? receiverAddress.state : ""
                  } \n ${
                    receiverAddress.country ? receiverAddress.country : ""
                  } `}</p>
                </div>
                <div
                  className='rTableCell'
                  style={{ position: "relative", left: "10%" }}
                >
                  <div className={`status secondary-bg ml-3 ${statusStyle}`}>
                    {status}\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
                  </div>
                </div>
                <div
                  className='col-1 txt1'
                  style={{ paddingLeft: 0, position: "relative", left: "8%" }}
                >
                  <button
                    className='button btn-primary text-light btn-sm ml-1'
                    onClick={() => {
                      const data = shipments[index];
                      dispatch(setTracingShipments(data));
                      props.history.push(`/tracing/${shipments[index].id}`);
                    }}
                  >
                    <img
                      style={{ padding: 1, height: 15 }}
                      src={location}
                      alt='Location'
                    />
                    <span className='pl-1 text-white'>Track</span>
                  </button>
                </div>
                <div
                  className='rTableCell'
                  style={{ position: "relative", left: "4.5%" }}
                >
                  <Link
                    to={`/viewshipment/${shipment.id}`}
                    className='button btn-sm'
                    style={{ width: "60px" }}
                  >
                    View
                  </Link>
                </div>
              </div>
            );
          })}
 */}

          {/* {shipments.length === 0 && (
            <div className="rTableRow pt-2 pb-2 justify-content-center text-muted shadow-none">
              No records found
            </div>
          )} */}

          {shipments.length === 0 && (
            <div className="rTableRow pt-2 pb-2 justify-content-center text-muted shadow-none">
              No records found
            </div>
          )}

          {shipments.map((shipment, index) => {
            let statusStyle = "bg-primary";
            let status = "Shipped";
            if (shipment.status === "RECEIVED") {
              statusStyle = "bg-success";
              status = "Delivered";
            }
            let supplierAddress = shipment.supplier.warehouse.warehouseAddress;
            let wLocation = shipment.supplier.warehouse?.location;
            if (wLocation?.length) {
              supplierAddress =
                wLocation.firstLine + wLocation.secondLine + wLocation.city;
            }
            let receiverAddress = shipment.receiver.warehouse.warehouseAddress;
            let wrLocation = shipment.receiver.warehouse?.location;
            if (wrLocation?.length) {
              supplierAddress =
                wrLocation.firstLine + wrLocation.secondLine + wrLocation.city;
            }
            return (
              <tr>
                <td>
                  <div class="user-info">
                    <h5 class="table-h5-text shipmentId">{shipment.id}</h5>
                    {shipment?.shipmentAlerts?.length > 0 && (
                      <span
                        style={{ backgroundColor: "#EAEAEA", marginLeft: 5 }}
                        className="rounded p-1"
                      >
                        <img style={{ height: 15 }} src={alert} alt="Alert" />
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <div class="user-info">
                    <h5 class="table-h5-text">
                      {shipment?.shippingDate?.length === 10
                        ? shipment.shippingDate
                        : formatDate(shipment.shippingDate)}
                    </h5>
                  </div>
                </td>
                <td>
                  <div class="user-info__basic">
                    <h5 class="mb-0 table-h5-text">
                      {shipment.supplier.org ? shipment.supplier.org.name : "-"}
                    </h5>
                    <p class="text-muted mb-0 table-p-text">
                      {`${
                        supplierAddress.firstLine
                          ? supplierAddress.firstLine
                          : ""
                      } ${
                        supplierAddress.secondLine
                          ? supplierAddress.secondLine
                          : ""
                      } ${supplierAddress.city ? supplierAddress.city : ""}\n ${
                        supplierAddress.state ? supplierAddress.state : ""
                      }\n ${
                        supplierAddress.country ? supplierAddress.country : ""
                      } `}
                    </p>
                  </div>
                </td>
                <td>
                  <div class="user-info__basic">
                    <h5 class="mb-0 table-h5-text">
                      {shipment.receiver.org ? shipment.receiver.org.name : "-"}
                    </h5>
                    <p class="text-muted mb-0 table-p-text">
                      {`${
                        receiverAddress.firstLine
                          ? receiverAddress.firstLine
                          : ""
                      }  ${
                        receiverAddress.secondLine
                          ? receiverAddress.secondLine
                          : ""
                      } ${
                        receiverAddress.city ? receiverAddress.city : ""
                      } \n ${
                        receiverAddress.state ? receiverAddress.state : ""
                      } \n ${
                        receiverAddress.country ? receiverAddress.country : ""
                      } `}
                    </p>
                  </div>
                </td>
                <td>
                  <div
                    className={`status secondary-bgp p-1 mr-3 text-center ${statusStyle}`}
                  >
                    {status}
                  </div>
                </td>
                <td>
                  <div className="table-btns">
                    <button
                      className="button btn-primary text-light btn-sm mr-3"
                      onClick={() => {
                        const data = shipments[index];
                        dispatch(setTracingShipments(data));
                        props.history.push(`/tracing/${shipments[index].id}`);
                      }}
                    >
                      <img
                        style={{ padding: 1, height: 15 }}
                        src={location}
                        alt="Location"
                        className="Track-btn-img"
                      />
                      <span className="pl-1 text-white">Track</span>
                    </button>
                    <Link
                      to={`/viewshipment/${shipment.id}`}
                      className="button btn-sm"
                      style={{
                        width: "60px",
                        border: "1px solid #007bff",
                        borderRadius: "6px",
                      }}
                    >
                      View
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {shipments?.length > 0 && (
        <div className="d-flex flex-row-reverse">
          <Pagination
            showFirstButton
            showLastButton
            color="primary"
            count={Math.ceil(props.count / 10)}
            onChange={handlePageChange}
          />
          <span
            className="mx-5 my-1 rounded text-dark"
            style={{ fontSize: "14px" }}
          >
            Total Records {props.count}{" "}
          </span>
        </div>
      )}
    </div>
  );
}

export default Table;
