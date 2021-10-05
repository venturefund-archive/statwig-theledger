import React from "react";
import user from "../../../assets/icons/user.svg";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/dateHelper";
import Pagination from "@material-ui/lab/Pagination";
import mon from "../../../assets/icons/brand.svg";
import Package from "../../../assets/icons/package.svg";
import calender from "../../../assets/icons/calendar.svg";
import Order from "../../../assets/icons/orders.svg";
import Totalshipments from "../../../assets/icons/TotalShipment.svg";
import FilterIcon from "../../../assets/icons/Filter.svg";
import ExportIcon from "../../../assets/icons/Export.svg";
import dropdownIcon from "../../../assets/icons/drop-down.svg";
import updownarrow from "../../../assets/icons/up-and-down-1.svg";
import Status from "../../../assets/icons/Status.svg";
import "./tablestyle.scss";

function Table(props) {
  const { ordrs, visible } = props;
  const orders = ordrs();
  const handlePageChange = (event, value) => {
    props.onPageChange(value);
  };
  orders.sort(function (a, b) {
    if (a.id > b.id) {
      return -1;
    } else {
      return 1;
    }
  });

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <div>
      <table class="table">
        <thead>
          <tr>
            <th className="cursorP">
              <img src={mon} width="16" height="16" className="mr-2" alt="" />
              Order Sent TO
            </th>
            <th className="cursorP">
            <img src={calender} width="16" height="16" className="mr-2" alt="" />
              Order Date
            </th>
            <th className="cursorP" >
            <img src={Order} width="18" height="16" className="mr-2" alt="" />
              Order ID
              <img
                src={updownarrow}
                height="10"
                width="15"
                style={{float:"right", marginTop:"5px"}}
                alt=""
              />
            </th>
            <th className="cursorP">
            <img src={Package} width="16" height="16" className="mr-2" alt="" />
              Product
              <img
                src={updownarrow}
                height="10"
                width="15"
                style={{float:"right", marginTop:"5px"}}
                alt=""
              />
            </th>
            <th className="cursorP">
            <img src={Totalshipments} width="18" height="18" className="mr-2" alt="" />
              Delivery Location
              <img
                src={updownarrow}
                height="10"
                width="15"
                style={{float:"right", marginTop:"5px"}}
                alt=""
              />
            </th>
            <th className="cursorP">
            <img src={Status} width="16" height="16" className="mr-2" alt="" />
              Status
              <img
                src={updownarrow}
                height="10"
                width="15"
                style={{float:"right", marginTop:"5px"}}
                alt=""
              />
            </th>
            <th>
            <button className='btn-filter-info '>
              <div className='d-flex align-items-center'>
                <img
                  src={FilterIcon}
                  width='13'
                  height='13'
                  className='mr-1'
                  alt='FilterIcon'
                />
                <span className='text'>Filter</span>
                <img
                  src={dropdownIcon}
                  width='8'
                  height='8'
                  className='ml-1'
                  alt='Drop Down Icon'
                />
              </div>
            </button>
            <button
                className='btn-filter-blue ml-2'
              >
                <div className='d-flex  align-items-center'>
                  <img
                    src={ExportIcon}
                    width='13'
                    height='13'
                    className='mr-1'
                    alt='Export Icon'
                  />
                  <span className="text">Export</span>
                  <img
                    src={dropdownIcon}
                    width='8'
                    height='8'
                    className='ml-1'
                    alt='DropDownIcon'
                  />
                </div>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 && (
            <div className="rTableRow pt-2 pb-2 justify-content-center text-muted shadow-none">
              No records found
            </div>
          )}
          {orders.map((order, index) => {
            let statusStyle = "bg-primary";
            let status = order.poStatus;
            if (order.poStatus === "CREATED") {
              status = visible === "one" ? "Sent" : "Received";
            } else if (order.poStatus === "ACCEPTED") {
              statusStyle = "bg-success";
              status = "Accepted";
            } else if (order.poStatus === "REJECTED") {
              statusStyle = "bg-secondary";
              status = "Rejected";
            } else if (order.poStatus === "TRANSIT&FULLYFULFILLED") {
              statusStyle = "bg-info";
              status = "Transit & Fullyfilled";
            } else if (order.poStatus === "FULLYFULFILLED") {
              statusStyle = "bg-info";
              status = "Fullyfilled";
            } else if (order.poStatus === "TRANSIT&PARTIALLYFULFILLED") {
              statusStyle = "bg-warning";
              status = "Transit & Partially Fulfilled";
            } else if (order.poStatus === "PARTIALLYFULFILLED") {
              statusStyle = "bg-warning";
              status = "Partially Fulfilled";
            }

            const { customer, products, supplier, creatorOrganisation } = order;
            return (
              <tr>
                <td>
                  <div class="user-info">
                    <div class="user-info__img">
                      <img src={user} alt="User" />
                    </div>
                    <div class="user-info__basic shipmentId">
                      <h5 class="mb-0 table-h5-text ">
                        {visible === "two"
                          ? creatorOrganisation?.name
                          : supplier.organisation.name}
                      </h5>
                      <p class="mb-0 table-p-text ">
                        {visible === "two"
                          ? creatorOrganisation?.id
                          : supplier.organisation.id}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="user-info">
                    <h5 class="table-h5-text">
                      {" "}
                      {formatDate(order.creationDate)}
                    </h5>
                  </div>
                </td>
                <td>
                  <div class="user-info">
                    <h5 class="table-h5-text text-muted">{order.id}</h5>
                  </div>
                </td>
                <td>
                  <div class="user-info">
                    <h5 class="table-h5-text text-muted">
                      {truncate(
                        products[0]?.name +
                          (products.length > 1
                            ? " + " + (products.length - 1) + " more"
                            : ""),
                        15
                      )}
                    </h5>
                  </div>
                </td>
                <td>
                  <div class="user-info__basic">
                    <h5 class="mb-0 table-h5-text">
                      {customer.warehouse.title}
                    </h5>
                    <p class="text-muted mb-0 table-p-text">
                      {truncate(customer.warehouse && customer.warehouse.warehouseAddress
                        ? customer.warehouse.warehouseAddress.firstLine +
                          " " +
                          customer.warehouse.warehouseAddress.city
                        : null, 25)}
                    </p>
                  </div>
                </td>
                <td>
                  <div
                    className={`status secondary-bg ${statusStyle} py-1`}
                    style={{
                      width: "122px",
                      textAlign: "center",
                      color: "#fff",
                      borderRadius: "5px",
                    }}
                  >
                    {status}
                  </div>
                </td>
                <td>
                  <Link
                    to={`/vieworder/${order.id}`}
                    className="button px-2 py-1"
                    style={{
                      border: "1px solid #007bff",
                      borderRadius: "6px",
                    }}
                  >
                    View
                  </Link>
                </td>
              </tr>
            );
          })}
          ;
        </tbody>
      </table>
      {orders?.length > 0 && (
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
