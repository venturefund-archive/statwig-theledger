import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import Table from "../../shared/table";
import TableFilter from "../../shared/advanceTableFilter";
import { getInventoryAnalytics } from "../../actions/analyticsAction";
import { getProductList } from "../../actions/productActions";
import TotalInventoryAdded from "../../assets/icons/TotalInventoryAddedcopy.svg";
import currentinventory from "../../assets/icons/CurrentInventory.svg";
import Expiration from "../../assets/icons/TotalVaccinenearExpiration.svg";
import TotalVaccineExpired from "../../assets/icons/TotalVaccineExpired.svg";
import Add from "../../assets/icons/add.svg";
import calender from "../../assets/icons/calendar.svg";
import Status from "../../assets/icons/Status.svg";
import Quantity from "../../assets/icons/Quantity.png";
import Product from "../../assets/icons/Producttype.png";
import { useDispatch } from "react-redux";
import { getInventories } from "../../actions/inventoryActions";
import { isAuthenticated } from "../../utils/commonHelper";
import Totalshipments from "../../assets/icons/TotalShipment.svg";
import updownarrow from "../../assets/icons/up-and-down-1.svg";
import FilterIcon from "../../assets/icons/Filter.svg";
import dropdownIcon from "../../assets/icons/drop-down.svg";
import { Menu, InputBase } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import searchingIcon from "../../assets/icons/search.png";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateRangePicker from "@mui/lab/DateRangePicker";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
];


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

const ITEM_HEIGHT = 48;

const optionName = [
  "None",
  "Unicef",
  "Statwig",
  "Tech",
  "React",
  "Java",
  "Sort",
  "Luna",
];
const optionCat = [
  "None",
  "Atria",
  "Callisto",
  "Dione",
  "Ganymede",
  "Hangouts Call",
  "Luna",
];

const Inventory = (props) => {
  const headers = {
    coloumn1: "Product Name",
    coloumn2: "Product Category",
    coloumn3: "Date",
    coloumn4: "Quantity",
    coloumn5: "Status",

    img1: <img src={Product} width="16" height="16" alt="Product" />,
    img2: <img src={Quantity} width="24" height="16" alt="Quantity" />,
    img3: <img src={calender} width="16" height="16" alt="Calender" />,
    img4: <img src={Quantity} width="24" height="16" alt="Quantity" />,
    img5: <img src={Status} width="16" height="16" alt="Status" />,
  };

  if (!isAuthenticated("viewInventory")) props.history.push(`/profile`);
  const tableHeaders = {
    coloumn1: "Product Name",
    coloumn2: "Product Category",
    coloumn3: "Quantity",
  };
  const MAX_LENGTH = 20;
  const [inventoryNearExpiration, setInventoryNearExpiration] = useState("");
  const [inventoryExpired, setInventoryExpired] = useState("");
  const [inventoriesCount, setInventoriesCount] = useState("");
  const [currentInventoriesCount, setCurrentInventoriesCount] = useState("");
  const [productsList, setProductsList] = useState([]);
  const dispatch = useDispatch();
  const colors = [
    "#D8E5FB",
    "#FFEF83",
    "#DFF1F2",
    "#EBDDED",
    "#D9E5EF",
    "#FFC18C",
    "#F1DDC6",
    "#BCFFF2",
    "#FFD0CA",
    "#63B7AF",
    "#FFCB91",
    "#FFEFA1",
    "#94EBCD",
    "#6DDCCF",
    "#FFE194",
    "#E8F6EF",
    "#B8DFD8",
    "#D8E5FB",
    "#FFEF83",
    "#DFF1F2",
    "#EBDDED",
    "#D9E5EF",
    "#FFC18C",
    "#F1DDC6",
    "#BCFFF2",
    "#FFD0CA",
    "#63B7AF",
    "#FFCB91",
    "#FFEFA1",
    "#94EBCD",
    "#6DDCCF",
    "#FFE194",
    "#E8F6EF",
    "#B8DFD8",
    "#D8E5FB",
    "#FFEF83",
    "#DFF1F2",
    "#EBDDED",
    "#D9E5EF",
    "#FFC18C",
    "#F1DDC6",
    "#BCFFF2",
    "#FFD0CA",
    "#63B7AF",
    "#FFCB91",
    "#FFEFA1",
    "#94EBCD",
    "#6DDCCF",
    "#FFE194",
    "#E8F6EF",
    "#B8DFD8",
  ];

  const [inventoryAnalytics, setInventoryAnalytics] = useState({});
  // useEffect(() => {
  //   async function fetchData() {
  //     const result = await getInventoryAnalytics();
  //     setInventoryAnalytics(result.data.inventory);
  //   }
  //   fetchData();
  // }, []);

  const [limit] = useState(10);
  const [dateFilter, setDateFilter] = useState("");
  const [productNameFilter, setProductNameFilter] = useState("");
  const [productCategoryFilter, setProductCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    async function fetchData() {
      const result = await getProductList();
      setProductsList(result.message);
      const resultAnalytics = await getInventoryAnalytics();

      setInventoryAnalytics(resultAnalytics.data.inventory);
      setInventoriesCount(
        resultAnalytics.data.inventory.totalProductsAddedToInventory
      );
      setCurrentInventoriesCount(
        resultAnalytics.data.inventory.totalProductsInInventory
      );
      // setInventoryNearExpiration(
      //   resultAnalytics.data.inventory.batchExpiringInSixMonths
      // );
      setInventoryNearExpiration(
        resultAnalytics.data.inventory.batchNearExpiration
      );
      // setInventoryExpired(
      //   resultAnalytics.data.inventory.batchExpiredLastYear
      // );
      setInventoryExpired(resultAnalytics.data.inventory.batchExpired);
      // setProductCategory(
      //   resultAnalytics.data.inventory.totalProductCategory
      // )
      // setStockOut(
      //   resultAnalytics.data.inventory.stockOut
      // )
    }
    fetchData();
  }, []);

  const onPageChange = async (pageNum) => {
    const recordSkip = (pageNum - 1) * limit;
    // setSkip(recordSkip);
    dispatch(
      getInventories(
        recordSkip,
        limit,
        dateFilter,
        productNameFilter,
        productCategoryFilter,
        statusFilter
      )
    ); //(skip, limit, dateFilter, productName, productCategoryFilter, status)
  };

  const setDateFilterOnSelect = async (dateFilterSelected) => {
    setDateFilter(dateFilterSelected);
    // setSkip(0);
    dispatch(
      getInventories(
        0,
        limit,
        dateFilterSelected,
        productNameFilter,
        productCategoryFilter,
        statusFilter
      )
    ); //(skip, limit, dateFilter, productName, productCategoryFilter, status)
  };

  const setInventoryStatusFilterOnSelect = async (statusFilterSelected) => {
    console.log(
      "setInventoryStatusFilterOnSelect =========>",
      statusFilterSelected
    );
    setStatusFilter(statusFilterSelected);
    // setSkip(0);
    dispatch(
      getInventories(
        0,
        limit,
        dateFilter,
        productNameFilter,
        productCategoryFilter,
        statusFilterSelected
      )
    ); //(skip, limit, dateFilter, productName, productCategoryFilter, status)
  };

  const setInventoryProductNameFilterOnSelect = async (
    productNameFilterSelected
  ) => {
    console.log(
      "setInventoryProductNameFilterOnSelect =========>",
      productNameFilterSelected
    );
    setProductNameFilter(productNameFilterSelected);
    // setSkip(0);
    dispatch(
      getInventories(
        0,
        limit,
        dateFilter,
        productNameFilterSelected,
        productCategoryFilter,
        statusFilter
      )
    ); //(skip, limit, dateFilter, productName, productCategoryFilter, status)
  };

  const setInventoryManufacturerFilterOnSelect = async (
    manufacturerFilterSelected
  ) => {
    console.log(
      "setInventoryManufacturerFilterOnSelect =========>",
      manufacturerFilterSelected
    );
    // setManufacturerFilter(manufacturerFilterSelected);
    // setSkip(0);
    dispatch(
      getInventories(
        0,
        limit,
        dateFilter,
        productNameFilter,
        manufacturerFilterSelected,
        statusFilter
      )
    ); //(skip, limit, dateFilter, productName, productManufacturer, status)
  };

  const setInventoryProductCategoryFilterOnSelect = async (
    categoryFilterSelected
  ) => {
    console.log(
      "setInventoryProductCategoryFilterOnSelect =========>",
      categoryFilterSelected
    );
    setProductCategoryFilter(categoryFilterSelected);
    // setSkip(0);
    dispatch(
      getInventories(
        0,
        limit,
        dateFilter,
        productNameFilter,
        categoryFilterSelected,
        statusFilter
      )
    ); //(skip, limit, dateFilter, productName, productCategory, status)
  };

  // Filters
  const [ProNamefilter, setProNamefilter] = React.useState(null);
  const ProNameOpen = Boolean(ProNamefilter);
  const [ProCatfilter, setProCatfilter] = React.useState(null);
  const ProCatOpen = Boolean(ProCatfilter);
  const [StatFilter, setStatFilter] = React.useState(null);
  const [FilterBtn, setFilterBtn] = React.useState(null);
  const [PdateFilter, setPdateFilter] = React.useState(null);

  const [value, setValue] = React.useState([null, null]);

  // For product name
  const pronameclick = (event) => {
    setProNamefilter(event.currentTarget);
  };

  const pronameclose = () => {
    setProNamefilter(null);
  };


  // For product category
  const procatclick = (event) => {
    setProCatfilter(event.currentTarget);
  };

  const procatclose = () => {
    setProCatfilter(null);
  };


  // For Status
  const statusclick = (event) => {
    setStatFilter(event.currentTarget);
  };

  const statusclose = () => {
    setStatFilter(null);
  };

  // For Order Product
  const dateclick = (event) => {
    setPdateFilter(event.currentTarget);
  };

  const dateclose = () => {
    setPdateFilter(null);
  };

  // For Filter
  const filterclick = (event) => {
    setFilterBtn(event.currentTarget);
  };

  const filterclose = () => {
    setFilterBtn(null);
  };
  return (
    <div className="inventory">
      <div className="d-flex justify-content-between">
        <h2 className="breadcrumb">INVENTORY </h2>
        <div className="d-flex">
          {isAuthenticated("addInventory") && (
            <Link to="/newinventory">
              <button className="btn btn-yellow mt-2">
                <img src={Add} width="13" height="13" className="mr-2" alt="" />
                <span>
                  <b>Add Inventory</b>
                </span>
              </button>
            </Link>
          )}
        </div>
      </div>
      {isAuthenticated("inventoryAnalytics") && (
        // <div className='row mb-4'>
        //   <div className='col'>
        //     <Link to='/productcategory'>
        //       <div className='panel'>
        //         <div className='picture truck-bg'>
        //           <img src={TotalInventoryAdded} alt='truck' />
        //         </div>
        //         <div className='d-flex flex-column'>
        //           <div className='title truck-text font-weight-bold'>
        //             Total Product Category
        //           </div>

        //           <div className='count truck-text'>
        //             {inventoriesCount}{" "}
        //             {inventoryAnalytics?.totalProductCategory}
        //           </div>
        //         </div>
        //       </div>
        //     </Link>
        //   </div>
        //   <div className='col'>
        //     <Link to='/productoutofstock'>
        //       <div className='panel'>
        //         <div className='picture sent-bg'>
        //           <img src={currentinventory} alt='truck' />
        //         </div>
        //         <div className='d-flex flex-column'>
        //           <div className='title sent-text font-weight-bold'>
        //             Product Out Of Stock
        //           </div>
        //           <div className='sent-text count'>
        //             {currentInventoriesCount}
        //             {inventoryAnalytics?.stockOut}
        //           </div>
        //         </div>
        //       </div>
        //     </Link>
        //   </div>

        //   <div className='col'>
        //     <Link to='/batchnearexpiry/product'>
        //       <div className='panel'>
        //         <div className='picture recived-bg'>
        //           <img src={Expiration} alt='truck' />
        //         </div>
        //         <div className='d-flex flex-column'>
        //           <div className='title recived-text font-weight-bold'>
        //             Batch near Expiration
        //           </div>
        //           <div className='recived-text count'>
        //             {inventoryNearExpiration}
        //           </div>
        //         </div>
        //       </div>
        //     </Link>
        //   </div>
        //   <div className='col'>
        //     <Link to='/batchexpired'>
        //       <div className='panel'>
        //         <div className='picture transit-bg'>
        //           <img src={TotalVaccineExpired} alt='truck' />
        //         </div>
        //         <div className='d-flex flex-column'>
        //           <div className='title transit-text font-weight-bold'>
        //             Batch Expired
        //           </div>
        //           <div className='transit-text count'>{inventoryExpired}</div>
        //         </div>
        //       </div>
        //     </Link>
        //   </div>
        // </div>

        <div className="grid-tile-container mb-5 ">
          <Link to="/productcategory">
            <div onClick={() => props.setData("one")} className="grid-tiles">
              <div className="picture truck-bg">
                <img src={TotalInventoryAdded} alt="truck" />
              </div>

              <div className="tile-content">
                <p className="truck-text font-weight-bold">Total Product</p>
                <h1 className="count truck-text">
                  {inventoriesCount} {inventoryAnalytics?.totalProductCategory}
                </h1>
              </div>
            </div>
          </Link>

          <Link to="/productoutofstock">
            <div className="grid-tiles">
              <div className="picture sent-bg">
                <img src={currentinventory} alt="truck" />
              </div>

              <div className="tile-content">
                <p className="sent-text font-weight-bold">
                  Product Out of Stock
                </p>
                <h1 className="count sent-text">
                  {currentInventoriesCount}
                  {inventoryAnalytics?.stockOut}
                </h1>
              </div>
            </div>
          </Link>

          <Link to="/batchnearexpiry/product">
            <div className="grid-tiles">
              <div className="picture recived-bg">
                <img src={Expiration} alt="truck" />
              </div>

              <div className="tile-content">
                <p className="recived-text font-weight-bold">
                  Batch Near Expiration
                </p>
                <h1 className="count recived-text">
                  {inventoryNearExpiration}
                </h1>
              </div>
            </div>
          </Link>

          <Link to="/batchexpired">
            <div className="grid-tiles">
              <div className="picture transit-bg">
                <img src={TotalVaccineExpired} alt="truck" />
              </div>

              <div className="tile-content">
                <p className="transit-text font-weight-bold">Batch Expired</p>
                <h1 className="count transit-text">{inventoryExpired}</h1>
              </div>
            </div>
          </Link>
        </div>
      )}

      <div
        style={{
          background: "#eaeaea",
          textAlign: "center",
          borderRadius: "10px",
        }}
        className="table-headers py-1 mb-3 row no-gutters"
      >
        <div className="pName bdr py-3 table-in-header" onClick={pronameclick}>
          <img
            src={Totalshipments}
            width="18"
            height="18"
            className="mr-2"
            alt=""
          />
          Product Name
          <img
            src={updownarrow}
            height="10"
            width="15"
            style={{ float: "right", marginTop: "5px", marginRight: "10px" }}
            alt=""
          />
        </div>
        <StyledMenu
              id="customized-menu"
              anchorEl={ProNamefilter}
              keepMounted
              open={ProNameOpen}
              onClose={pronameclose}
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
              {optionName.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === "None"}
                  onClick={pronameclose}
                >
                  <h6 className="filterText">{option}</h6>
                </MenuItem>
              ))}
            </StyledMenu>
        <div className="bdr pCat py-3 table-in-header" onClick={procatclick}>
          <img
            src={Totalshipments}
            width="18"
            height="18"
            className="mr-2"
            alt=""
          />
          Product Category
          <img
            src={updownarrow}
            height="10"
            width="15"
            style={{ float: "right", marginTop: "5px", marginRight: "10px" }}
            alt=""
          />
        </div>
        <StyledMenu
              id="customized-menu"
              anchorEl={ProCatfilter}
              keepMounted
              open={ProCatOpen}
              onClose={procatclose}
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
              {optionCat.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === "None"}
                  onClick={procatclose}
                >
                  <h6 className="filterText">{option}</h6>
                </MenuItem>
              ))}
            </StyledMenu>
        <div className="bdr pDate py-3 table-in-header" onClick={dateclick}>
          <img
            src={Totalshipments}
            width="18"
            height="18"
            className="mr-2"
            alt=""
          />
          Date
          <img
            src={updownarrow}
            height="10"
            width="15"
            style={{ float: "right", marginTop: "5px", marginRight: "10px" }}
            alt=""
          />
        </div>
        <StyledMenu
              style={{ width: "70%", margin: "10px" }}
              id="customized-menu"
              anchorEl={PdateFilter}
              keepMounted
              open={Boolean(PdateFilter)}
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
        <div className="bdr pQuan py-3 table-in-header">
          <img
            src={Totalshipments}
            width="18"
            height="18"
            className="mr-2"
            alt=""
          />
          Quantity
        </div>
        <div
          style={{ width: "12%" }}
          className="pStatus py-3 table-in-header"
          onClick={statusclick}
        >
          <img
            src={Totalshipments}
            width="18"
            height="18"
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
        </div>
        <StyledMenu
          id="customized-menu"
          anchorEl={StatFilter}
          keepMounted
          open={Boolean(StatFilter)}
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
        <div className="pFil py-2" onClick={filterclick}>
          <button className="btn-filter-info">
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
        </div>
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
      </div>

      <div className="row no-gutter">
        <div className="col-sm-12 col-xl-9 rTableHeader">
          <Table
            data={tableHeaders}
            {...props}
            colors={colors}
            inventoryCount={props.inventoriesCount}
            onPageChange={onPageChange}
          />
        </div>
        <div className="col-sm-12 col-xl-3">
          {isAuthenticated("viewProductList") && (
            <div className="list-container">
              <div className="d-flex justify-content-between align-items-center ml-3">
                <h4>
                  <b>Product List</b>
                </h4>
                <Link to="/productcategory">
                  <button className="btn btn-link mr-1">
                    <b>View all</b>
                  </button>
                </Link>
              </div>
              <div
                className="overflow ml-3"
                style={{ height: "720px", overflowX: "hidden" }}
              >
                <div className="row">
                  {productsList?.map((product, index) => (
                    <div className="col-sm-6" key={index}>
                      <div
                        className="d-flex card flex-column align-items-center"
                        style={{ backgroundColor: colors[index] }}
                      >
                        <div className="round-sign">
                          {product.productName.length <= MAX_LENGTH ? (
                            <div>{product.productName}</div>
                          ) : (
                            <div>{`${product.productName.substring(
                              0,
                              MAX_LENGTH
                            )}...`}</div>
                          )}
                        </div>

                        {/* <p className="product">{product.productName}</p> */}
                        <h3 className="qty">
                          Qty : {product.quantity}
                          <span>{"  ("}</span>
                          {product.unitofMeasure &&
                          product.unitofMeasure.name ? (
                            <span>{product.unitofMeasure.name}</span>
                          ) : (
                            ""
                          )}
                          <span>{")"}</span>
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Inventory;
