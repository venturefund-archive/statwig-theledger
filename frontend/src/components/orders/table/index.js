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
import searchingIcon from "../../../assets/icons/search.png";
import { Menu, InputBase } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import "./tablestyle.scss";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateRangePicker from "@mui/lab/DateRangePicker";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


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

const optionTo = [
  "None",
  "Unicef",
  "Statwig",
  "Tech",
  "React",
  "Java",
  "Sort",
  "Luna",
];
const optionId = [
  "None",
  "Atria",
  "Callisto",
  "Dione",
  "Ganymede",
  "Hangouts Call",
  "Luna",
];
const optionPro = ["None", "Atria", "Callisto", "Dione", "Ganymede"];
const optionLoc = [
  "None",
  "Atria",
  "Callisto",
  "Dione",
  "Ganymede",
  "Hangouts Call",
  "Luna",
  "Oberon",
  "Phobos",
  "Pyxis",
];

const ITEM_HEIGHT = 48;

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
];


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

  // For Filters
  const [OrderTOfilter, setOrderTOfilter] = React.useState(null);
  const ToOpen = Boolean(OrderTOfilter);
  const [OrderIDfilter, setOrderIDfilter] = React.useState(null);
  const IdOpen = Boolean(OrderIDfilter);
  const [ProductFilter, setProductFilter] = React.useState(null);
  const ProOpen = Boolean(ProductFilter);
  const [LocFilter, setLocFilter] = React.useState(null);
  const LocOpen = Boolean(LocFilter);
  const [StatusFilter, setStatusFilter] = React.useState(null);
  const [FilterBtn, setFilterBtn] = React.useState(null);
  const [ExportBtn, setExportBtn] = React.useState(null);
  const [dateFilter, setdateFilter] = React.useState(null);

  const [value, setValue] = React.useState([null, null]);

  // For Order To
  const orderToclick = (event) => {
    setOrderTOfilter(event.currentTarget);
  };

  const orderToclose = () => {
    setOrderTOfilter(null);
  };

  // For Order Product
  const productclick = (event) => {
    setProductFilter(event.currentTarget);
  };

  const productclose = () => {
    setProductFilter(null);
  };

  // For Order Product
  const dateclick = (event) => {
    setdateFilter(event.currentTarget);
  };

  const dateclose = () => {
    setdateFilter(null);
  };

  // For Order Id
  const orderIdclick = (event) => {
    setOrderIDfilter(event.currentTarget);
  };

  const orderIdclose = () => {
    setOrderIDfilter(null);
  };

  // For Location
  const locclick = (event) => {
    setLocFilter(event.currentTarget);
  };

  const locclose = () => {
    setLocFilter(null);
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
            <th className="cursorP" onClick={orderToclick}>
              <img src={mon} width="16" height="16" className="mr-2" alt="" />
              Order Sent TO
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
              anchorEl={OrderTOfilter}
              keepMounted
              open={ToOpen}
              onClose={orderToclose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              <MenuItem>
              <Autocomplete
                  style={{width:"100%", borderRadius:"6px"}}
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  forcePopupIcon={true}
                  popupIcon={<img src={searchingIcon} width="12px" height="12px" />}
                  options={top100Films.map((option) => option.title)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search"
                      size="small"
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                      }}
                    />
                  )}
                />
              </MenuItem>
              {optionTo.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === "None"}
                  onClick={orderToclose}
                >
                  <h6 className="filterText">{option}</h6>
                </MenuItem>
              ))}
            </StyledMenu>

            <th className="cursorP" onClick={dateclick}>
              <img
                src={calender}
                width="16"
                height="16"
                className="mr-2"
                alt=""
              />
              Order Date
              <img
                src={updownarrow}
                height="10"
                width="15"
                style={{ float: "right", marginTop: "5px" }}
                alt=""
              />
            </th>
            <StyledMenu
              style={{ width: "70%", margin: "10px" }}
              id="customized-menu"
              anchorEl={dateFilter}
              keepMounted
              open={Boolean(dateFilter)}
              onClose={dateclose}
            >
              <div style={{ padding: "0 20px" }}>
                <h6>From</h6>
                <h6 style={{ position: "absolute", top: "8px", left: "55%" }}>
                  To
                </h6>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  style={{ padding: "0 10px" }}
                >
                  <DateRangePicker
                    calendars={1}
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(startProps, endProps) => (
                      <React.Fragment>
                        <input
                          className="filterDate mr-2"
                          ref={startProps.inputRef}
                          {...startProps.inputProps}
                        />
                        <input
                          className="filterDate"
                          ref={endProps.inputRef}
                          {...endProps.inputProps}
                        />
                      </React.Fragment>
                    )}
                  />
                </LocalizationProvider>
              </div>
            </StyledMenu>
            <th className="cursorP" onClick={orderIdclick}>
              <img src={Order} width="18" height="16" className="mr-2" alt="" />
              Order ID
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
              anchorEl={OrderIDfilter}
              // keepMounted
              open={IdOpen}
              onClose={orderIdclose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              <MenuItem>
              <Autocomplete
                  style={{width:"100%", borderRadius:"6px"}}
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  forcePopupIcon={true}
                  popupIcon={<img src={searchingIcon} width="12px" height="12px" />}
                  options={top100Films.map((option) => option.title)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search"
                      size="small"
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                      }}
                    />
                  )}
                />
              </MenuItem>
              {optionId.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === "None"}
                  onClick={orderIdclose}
                >
                  <h6 className="filterText">{option}</h6>
                </MenuItem>
              ))}
            </StyledMenu>

            <th className="cursorP" onClick={productclick}>
              <img
                src={Package}
                width="16"
                height="16"
                className="mr-2"
                alt=""
              />
              Product
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
              anchorEl={ProductFilter}
              keepMounted
              open={ProOpen}
              onClose={productclose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              <MenuItem>
              <Autocomplete
                  style={{width:"100%", borderRadius:"6px"}}
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  forcePopupIcon={true}
                  popupIcon={<img src={searchingIcon} width="12px" height="12px" />}
                  options={top100Films.map((option) => option.title)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search"
                      size="small"
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                      }}
                    />
                  )}
                />
              </MenuItem>
              {optionPro.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === "None"}
                  onClick={productclose}
                >
                  <h6 className="filterText">{option}</h6>
                </MenuItem>
              ))}
            </StyledMenu>

            <th className="cursorP" onClick={locclick}>
              <img
                src={Totalshipments}
                width="18"
                height="18"
                className="mr-2"
                alt=""
              />
              Delivery Location
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
              anchorEl={LocFilter}
              keepMounted
              open={LocOpen}
              onClose={locclose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              <MenuItem>
              <Autocomplete
                  style={{width:"100%", borderRadius:"6px"}}
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  forcePopupIcon={true}
                  popupIcon={<img src={searchingIcon} width="12px" height="12px" />}
                  options={top100Films.map((option) => option.title)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search"
                      size="small"
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                      }}
                    />
                  )}
                />
              </MenuItem>
              {optionLoc.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === "None"}
                  onClick={locclose}
                >
                  <h6 className="filterText">{option}</h6>
                </MenuItem>
              ))}
            </StyledMenu>

            <th
              className="cursorP"
              onClick={statusclick}
              style={{ border: "none" }}
            >
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
                <td data-label="Order Sent To">
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
                <td data-label="Order Date">
                  <div class="user-info">
                    <h5 class="table-h5-text">
                      {" "}
                      {formatDate(order.creationDate)}
                    </h5>
                  </div>
                </td>
                <td data-label="Order ID">
                  <div class="user-info">
                    <h5 class="table-h5-text text-muted">{order.id}</h5>
                  </div>
                </td>
                <td data-label="Product">
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
                <td data-label="Delivery Location">
                  <div class="user-info__basic">
                    <h5 class="mb-0 table-h5-text">
                      {customer.warehouse.title}
                    </h5>
                    <p class="text-muted mb-0 table-p-text">
                      {truncate(
                        customer.warehouse &&
                          customer.warehouse.warehouseAddress
                          ? customer.warehouse.warehouseAddress.firstLine +
                              " " +
                              customer.warehouse.warehouseAddress.city
                          : null,
                        25
                      )}
                    </p>
                  </div>
                </td>
                <td data-label="Status">
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
                <td data-label="Action">
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
