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
import { Menu, InputBase } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import searchingIcon from "../../../assets/icons/search.png";

const StyledMenu = withStyles({
  paper: {
    boxShadow: "0px 2px 5px rgba(51, 51, 51, 0.2)",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({}))(MenuItem);

const optionID = [
  "None",
  "Unicef",
  "Statwig",
  "Tech",
  "React",
  "Java",
  "Sort",
  "Luna",
];
const optionFrom = [
  "None",
  "Atria",
  "Callisto",
  "Dione",
  "Ganymede",
  "Hangouts Call",
  "Luna",
];
const optionTo = ["None", "Atria", "Callisto", "Dione", "Ganymede"];

const ITEM_HEIGHT = 48;

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

  // For Filters
  const [ShipIDfilter, setShipIDfilter] = React.useState(null);
  const IdOpen = Boolean(ShipIDfilter);
  const [Fromfilter, setFromfilter] = React.useState(null);
  const FromOpen = Boolean(Fromfilter);
  const [Tofilter, setTofilter] = React.useState(null);
  const ToOpen = Boolean(Tofilter);
  const [StatusFilter, setStatusFilter] = React.useState(null);
  const [FilterBtn, setFilterBtn] = React.useState(null);
  const [ExportBtn, setExportBtn] = React.useState(null);

  // For Order To
  const ShipIDclick = (event) => {
    setShipIDfilter(event.currentTarget);
  };

  const ShipIDclose = () => {
    setShipIDfilter(null);
  };

  // For Order Product
  const Fromclick = (event) => {
    setFromfilter(event.currentTarget);
  };

  const Fromclose = () => {
    setFromfilter(null);
  };

  // For Order Id
  const Toclick = (event) => {
    setTofilter(event.currentTarget);
  };

  const Toclose = () => {
    setTofilter(null);
  };

  // For Status
  const statusclick = (event) => {
    setStatusFilter(event.currentTarget);
  };

  const statusclose = () => {
    setStatusFilter(null);
  };

  // For Filter
  const filterclick = (event) => {
    setFilterBtn(event.currentTarget);
  };

  const filterclose = () => {
    setFilterBtn(null);
  };

  // For Export
  const exportclick = (event) => {
    setExportBtn(event.currentTarget);
  };

  const exportclose = () => {
    setExportBtn(null);
  };

  return (
    <div>
      <table class="table">
        <thead>
          <tr>
            <th className="cursorP" onClick={ShipIDclick}>
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

            {/* Filters with search bar & Scroll////////////////////////////////////////////////////// */}
            <StyledMenu
              id="customized-menu"
              anchorEl={ShipIDfilter}
              keepMounted
              open={IdOpen}
              onClose={ShipIDclose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              <MenuItem>
                <div className="filterSearch">
                  <InputBase
                    placeholder="Search"
                    style={{ fontSize: "12px" }}
                  />
                  <img
                    src={searchingIcon}
                    width="12"
                    height="12"
                    alt="searching"
                  />
                </div>
              </MenuItem>
              {optionID.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === "None"}
                  onClick={ShipIDclose}
                >
                  <h6 className="filterText">{option}</h6>
                </MenuItem>
              ))}
            </StyledMenu>

            <th className="cursorP">
              <img
                src={calender}
                width="16"
                height="16"
                className="mr-2"
                alt=""
              />
              Shipping Date
              <img
                src={updownarrow}
                height="10"
                width="15"
                style={{ float: "right", marginTop: "5px" }}
                alt=""
              />
            </th>
            <th className="cursorP" onClick={Fromclick}>
              <img
                src={Received}
                width="18"
                height="16"
                className="mr-2"
                alt=""
              />
              From
              <img
                src={updownarrow}
                height="10"
                width="15"
                style={{ float: "right", marginTop: "5px" }}
                alt=""
              />
            </th>

            {/* Filters with search bar & Scroll////////////////////////////////////////////////////// */}
            <StyledMenu
              id="customized-menu"
              anchorEl={Fromfilter}
              // keepMounted
              open={FromOpen}
              onClose={Fromclose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              <MenuItem>
                <div className="filterSearch">
                  <InputBase
                    placeholder="Search"
                    style={{ fontSize: "12px" }}
                  />
                  <img
                    src={searchingIcon}
                    width="12"
                    height="12"
                    alt="searching"
                  />
                </div>
              </MenuItem>
              {optionFrom.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === "None"}
                  onClick={Fromclose}
                >
                  <h6 className="filterText">{option}</h6>
                </MenuItem>
              ))}
            </StyledMenu>

            <th className="cursorP" onClick={Toclick}>
              <img src={Sent} width="16" height="16" className="mr-2" alt="" />
              To
              <img
                src={updownarrow}
                height="10"
                width="15"
                style={{ float: "right", marginTop: "5px" }}
                alt=""
              />
            </th>

            {/* Filters with search bar & Scroll////////////////////////////////////////////////////// */}
            <StyledMenu
              id="customized-menu"
              anchorEl={Tofilter}
              // keepMounted
              open={ToOpen}
              onClose={Toclose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              <MenuItem>
                <div className="filterSearch">
                  <InputBase
                    placeholder="Search"
                    style={{ fontSize: "12px" }}
                  />
                  <img
                    src={searchingIcon}
                    width="12"
                    height="12"
                    alt="searching"
                  />
                </div>
              </MenuItem>
              {optionTo.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === "None"}
                  onClick={Toclose}
                >
                  <h6 className="filterText">{option}</h6>
                </MenuItem>
              ))}
            </StyledMenu>

            <th className="cursorP" onClick={statusclick}>
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
            <StyledMenu
              id="customized-menu"
              anchorEl={StatusFilter}
              keepMounted
              open={Boolean(StatusFilter)}
              onClose={statusclose}
            >
              {/* <DateRangePicker
                calendars={1}
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} />
                  </React.Fragment>
                )}
              /> */}
              <StyledMenuItem style={{ width: "160px", color: "#0b65c1" }}>
                <h6 className="filterText">Shipped</h6>
              </StyledMenuItem>
              <StyledMenuItem style={{ width: "160px", color: "#0b65c1" }}>
                <h6 className="filterText">Delivered</h6>
              </StyledMenuItem>
              <StyledMenuItem style={{ width: "160px", color: "#0b65c1" }}>
                <h6 className="filterText">Alerts</h6>
              </StyledMenuItem>
            </StyledMenu>
            <th>
              <button className="btn-filter-info" onClick={filterclick}>
                <div className="d-flex align-items-center">
                  <img
                    src={FilterIcon}
                    width="13"
                    height="13"
                    className="mr-1"
                    alt="FilterIcon"
                  />
                  <span className="text">Filter</span>
                  <img
                    src={dropdownIcon}
                    width="8"
                    height="8"
                    className="ml-1"
                    alt="Drop Down Icon"
                  />
                </div>
              </button>
              <StyledMenu
                id="customized-menu"
                anchorEl={FilterBtn}
                keepMounted
                open={Boolean(FilterBtn)}
                onClose={filterclose}
              >
                <StyledMenuItem>
                  <button className="head-btn">Today</button>
                </StyledMenuItem>
                <StyledMenuItem>
                  <button className="head-btn">This Week</button>
                </StyledMenuItem>
                <StyledMenuItem>
                  <button className="head-btn">This Month</button>
                </StyledMenuItem>
                <StyledMenuItem>
                  <button className="head-btn">Last 3 Month</button>
                </StyledMenuItem>
                <StyledMenuItem>
                  <button className="head-btn">Last 6 Month</button>
                </StyledMenuItem>
                <StyledMenuItem>
                  <button className="head-btn">This Year</button>
                </StyledMenuItem>
              </StyledMenu>
              <button className="btn-filter-blue ml-2" onClick={exportclick}>
                <div className="d-flex  align-items-center">
                  <img
                    src={ExportIcon}
                    width="13"
                    height="13"
                    className="mr-1"
                    alt="Export Icon"
                  />
                  <span className="text">Export</span>
                  <img
                    src={dropdownIcon}
                    width="8"
                    height="8"
                    className="ml-1"
                    alt="DropDownIcon"
                  />
                </div>
              </button>
              <StyledMenu
                id="customized-menu"
                anchorEl={ExportBtn}
                keepMounted
                open={Boolean(ExportBtn)}
                onClose={exportclose}
              >
                <StyledMenuItem>
                  <button className="head-btn">Excel</button>
                </StyledMenuItem>
                <StyledMenuItem>
                  <button className="head-btn">PDF</button>
                </StyledMenuItem>
                <StyledMenuItem>
                  <button className="head-btn">Mail</button>
                </StyledMenuItem>
                <StyledMenuItem>
                  <button className="head-btn">Print</button>
                </StyledMenuItem>
              </StyledMenu>
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
