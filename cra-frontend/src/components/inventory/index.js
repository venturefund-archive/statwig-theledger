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
import { getInventories, resetInventories } from "../../actions/inventoryActions";
import { isAuthenticated } from "../../utils/commonHelper";

const Inventory = (props) => {
  const headers = {
    coloumn1: "Product Name",
    coloumn2: "Product Category",
    coloumn3: "Date",
    coloumn4: "Quantity",
    coloumn5: "Status",

    img1: <img src={Product} width='16' height='16' alt='Product' />,
    img2: <img src={Quantity} width='24' height='16' alt='Quantity' />,
    img3: <img src={calender} width='16' height='16' alt='Calender' />,
    img4: <img src={Quantity} width='24' height='16' alt='Quantity' />,
    img5: <img src={Status} width='16' height='16' alt='Status' />,
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

  const [showCalendar, setShowCalendar] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [dateFilter, setDateFilter] = useState("");
  const [skip, setSkip] = useState(0);

  const [productNameData, setProductNameData] = useState([]);
  const [productNameReplicaData, setProductNameReplicaData] = useState([]);
  const [showDropDownForProductName, setShowDropDownForProductName] = useState(false);

  const [categoryData, setCategoryData] = useState([]);
  const [categoryReplicaData, setCategoryReplicaData] = useState([]);
  const [showDropDownForCategory, setShowDropDownForCategory] = useState(false);

  const [inventoryList, setInventoryList] = useState([]);


  const [queryKey, setQueryKey] = useState("");
  const [queryValue, setQueryValue] = useState("");

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
  const [productNameFilter, setProductNameFilter] = useState("");
  const [productCategoryFilter, setProductCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [selectedDate, setSelectedDate] = useState(false);

  const getStartDate = (!!startDate && selectedDate) ? getFormatedDate(startDate) : '';
  const getEndDate = (!!endDate && selectedDate) ? getFormatedDate(endDate) : '';

  const prepareDropdownData = (data) => {
    let finalDropDownData = [];
    data?.forEach(item => {
      let obj = {};
      obj['key'] = item.id ? item['id'] : item.toLowerCase();
      obj['value'] = item.name ? item['name'] : item;
      obj['checked'] = false;
      finalDropDownData.push(obj);
    });
    return finalDropDownData;
  }

  const getUniqueStringFromOrgListForGivenType = (data, ...args) => {
    console.log(args);
    const availableList = data?.map(item => args.length > 1 ? (item && item.hasOwnProperty(args[0]) && item[args[0]].hasOwnProperty(args[1])) && item[args[0]][args[1]] : item[args[0]]).filter(item => item);
    return [...new Set(availableList)];
  };

  useEffect(() => {
    if (queryKey && queryValue) {
      if (queryValue === 'productName') {
        dispatch(getInventories(0, 10, queryKey, productCategoryFilter, statusFilter, getStartDate, getEndDate, dateFilter));
      } else if (queryValue === 'category') {
        dispatch(getInventories(0, 10, productNameFilter, queryKey, statusFilter, getStartDate, getEndDate, dateFilter));
      } 
    } else {
      async function fetchData() {
        dispatch(resetInventories());
        const value = await dispatch(getInventories(0, 10, productNameFilter, productCategoryFilter, statusFilter, getStartDate, getEndDate, dateFilter));
        setInventoryList(value.inventoryRecords); //(skip, limit, productName, productCategory, status)
      }

      setStartDate(prevState => !!prevState ? prevState : new Date());
      setEndDate(prevState => !!prevState ? prevState : new Date());
      fetchData();
    }
  }, [queryKey, queryValue, productCategoryFilter, statusFilter, dateFilter, getStartDate, getEndDate, productNameFilter, dispatch]);

  useEffect(() => {
    if (inventoryList && inventoryList.length > 0) {
      
      if(!productNameFilter) {
        setProductNameData([...prepareDropdownData(getUniqueStringFromOrgListForGivenType(inventoryList, 'productDetails', 'name'))]);
        setProductNameReplicaData([...prepareDropdownData(getUniqueStringFromOrgListForGivenType(inventoryList, 'productDetails', 'name'))]);
      }
      
      if(!productCategoryFilter) {
        setCategoryData([...prepareDropdownData(getUniqueStringFromOrgListForGivenType(inventoryList, 'productDetails', 'type'))]);
        setCategoryReplicaData([...prepareDropdownData(getUniqueStringFromOrgListForGivenType(inventoryList, 'productDetails', 'type'))]);
      }

    } 
  }, [inventoryList, productCategoryFilter, productNameFilter]);

  const setCheckedAndUnCheckedOfProvidedList = (typeOriginalData, index) => {
    return typeOriginalData.map((item, i) => {
      if (i === index) {
        item.checked = !item.checked;
      } else {
        item.checked = false
      }
      return item;
    });
  }

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
    console.log("onPageChange =========>", pageNum)
    const recordSkip = (pageNum - 1) * limit;
    setSkip(recordSkip);
    dispatch(getInventories(recordSkip, limit, productNameFilter, productCategoryFilter, statusFilter, getStartDate, getEndDate, dateFilter));  //(skip, limit, dateFilter, productName, productCategoryFilter, status)
  };

  const setDateFilterOnSelect = async (dateFilterSelected) => {
    console.log("setDateFilterOnSelect =========>", dateFilterSelected)
    setDateFilter(dateFilterSelected);
    setSkip(0);
    dispatch(getInventories(0, limit,  productNameFilter, productCategoryFilter, statusFilter, getStartDate, getEndDate, dateFilterSelected));  //(skip, limit, dateFilter, productName, productCategoryFilter, status)
  }

  const setInventoryStatusFilterOnSelect = async (statusFilterSelected) => {
    console.log("setInventoryStatusFilterOnSelect =========>", statusFilterSelected);
    setStatusFilter(statusFilterSelected);
    setSkip(0);
    dispatch(getInventories(0, limit, productNameFilter, productCategoryFilter, statusFilterSelected, getStartDate, getEndDate, dateFilter));  //(skip, limit, dateFilter, productName, productCategoryFilter, status)
  }

  const filterTableByCalendar = async (selectedDateRange) => {
    setSelectedDate(c => c = true);
    const fromDate = new Date(selectedDateRange.startDate.getTime() - (selectedDateRange.startDate.getTimezoneOffset() * 60000))
      .toISOString()
      .split("T")[0];

    setStartDate(new Date(fromDate));

    const toDate = new Date(selectedDateRange.endDate.getTime() - (selectedDateRange.endDate.getTimezoneOffset() * 60000))
      .toISOString()
      .split("T")[0];
    setShowCalendar(false);
    setSkip(0);

    setEndDate(new Date(toDate));

    dispatch(getInventories(0, limit, productNameFilter, productCategoryFilter, statusFilter, fromDate, toDate, dateFilter));  //(skip, limit, dateFilter, productName, productCategoryFilter, status)
  }

  const onSelectionOfDropdownValue = (index, type, value) => {
    if (type === 'productName') {
      setProductNameData([...setCheckedAndUnCheckedOfProvidedList(productNameData, index)]);
      setQueryKeyAndQueryValue(setQueryKey, value, setQueryValue, type, productNameData, index);

      if(productNameData[index].checked) {
        setProductNameFilter(value);
      } else {
        setProductNameFilter('');
      }
      markOpenedDrownsToFalse(setShowDropDownForProductName, setShowDropDownForCategory);
    } else if (type === 'category') {
      setCategoryData([...setCheckedAndUnCheckedOfProvidedList(categoryData, index)]);
      setQueryKeyAndQueryValue(setQueryKey, value, setQueryValue, type, categoryData, index);
      setProductCategoryFilter(value);
      if(categoryData[index].checked) {
        setProductCategoryFilter(value);
      } else {
        setProductCategoryFilter('');
      }
      markOpenedDrownsToFalse(setShowDropDownForProductName, setShowDropDownForCategory);
    }
  };

  const markOpenedDrownsToFalse = () => {
    setShowDropDownForProductName(false);
    setShowDropDownForCategory(false);
  }

  const filterListForSearchInput = (data, searchInput) => data.filter(item => {
    return item.value.toLowerCase().includes(searchInput.toLowerCase());
  });

  const onChangeOfSearchForFilterInput = (searchInput, type) => {
    if (type === 'productName' && searchInput) {
      setProductNameData(filterListForSearchInput(productNameData, searchInput));
    } else if (type === 'category' && searchInput) {
      setCategoryData(filterListForSearchInput(categoryData, searchInput))
    } else {
      if (type === 'productName') {
        setProductNameData([...productNameReplicaData]);
      } else if (type === 'category') {
        setCategoryData([...categoryReplicaData]);
      } 
    }
  };
  return (
    <div className='inventory'>
      <div className='d-flex justify-content-between'>
        <h2 className='breadcrumb'>INVENTORY </h2>
        <div className='d-flex'>
          {isAuthenticated("addInventory") && (
            <Link to='/newinventory'>
              <button className='btn btn-yellow mt-2'>
                <img src={Add} width='13' height='13' className='mr-2' alt='' />
                <span>
                  <b>Add Inventory</b>
                </span>
              </button>
            </Link>
          )}
        </div>
      </div>
      {isAuthenticated("inventoryAnalytics") && (
        <div className='row mb-4'>
          <div className='col'>
            <Link to='/productcategory'>
              <div className='panel'>
                <div className='picture truck-bg'>
                  <img src={TotalInventoryAdded} alt='truck' />
                </div>
                <div className='d-flex flex-column'>
                  <div className='title truck-text font-weight-bold'>
                    Total Product Category
                  </div>

                  <div className='count truck-text'>
                    {inventoriesCount}{" "}
                    {inventoryAnalytics?.totalProductCategory}
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className='col'>
            <Link to='/productoutofstock'>
              <div className='panel'>
                <div className='picture sent-bg'>
                  <img src={currentinventory} alt='truck' />
                </div>
                <div className='d-flex flex-column'>
                  <div className='title sent-text font-weight-bold'>
                    Product Out Of Stock
                  </div>
                  <div className='sent-text count'>
                    {currentInventoriesCount}
                    {inventoryAnalytics?.stockOut}
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className='col'>
            <Link to='/batchnearexpiry/product'>
              <div className='panel'>
                <div className='picture recived-bg'>
                  <img src={Expiration} alt='truck' />
                </div>
                <div className='d-flex flex-column'>
                  <div className='title recived-text font-weight-bold'>
                    Batch near Expiration
                  </div>
                  {/* <div className="tab-container">
                <div
                  className="tab-item active"
                  onMouseLeave={() =>
                    setInventoryNearExpiration(
                      inventoryAnalytics.batchExpiringInSixMonths
                    )
                  }
                  onMouseEnter={() =>
                    setInventoryNearExpiration(
                      inventoryAnalytics.batchExpiringInSixMonths
                    )
                  }
                >
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setInventoryNearExpiration(
                      inventoryAnalytics.batchExpiringInSixMonths
                    )
                  }
                  onMouseEnter={() =>
                    setInventoryNearExpiration(
                      inventoryAnalytics.batchExpiringInThreeMonths
                    )
                  }
                >
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setInventoryNearExpiration(
                      inventoryAnalytics.batchExpiringInSixMonths
                      )
                  }
                  onMouseEnter={() =>
                    setInventoryNearExpiration(
                      inventoryAnalytics.batchExpiringThisMonth
                    )
                  }
                >
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setInventoryNearExpiration(
                      inventoryAnalytics.batchExpiringInSixMonths
                    )
                  }
                  onMouseEnter={() =>
                    setInventoryNearExpiration(
                      inventoryAnalytics.batchExpiringThisWeek
                    )
                  }
                >
              </div>
              </div> */}
                  <div className='recived-text count'>
                    {inventoryNearExpiration}
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className='col'>
            <Link to='/batchexpired'>
              <div className='panel'>
                <div className='picture transit-bg'>
                  <img src={TotalVaccineExpired} alt='truck' />
                </div>
                <div className='d-flex flex-column'>
                  <div className='title transit-text font-weight-bold'>
                    Batch Expired
                  </div>
                  {/* <div className="tab-container">
                <div
                  className="tab-item active"
                  onMouseLeave={() =>
                    setInventoryExpired(
                      inventoryAnalytics.batchExpiredLastYear
                    )
                  }
                  onMouseEnter={() =>
                    setInventoryExpired(
                      inventoryAnalytics.batchExpiredLastYear
                    )
                  }
                >
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setInventoryExpired(
                      inventoryAnalytics.batchExpiredLastYear
                    )
                  }
                  onMouseEnter={() =>
                    setInventoryExpired(
                      inventoryAnalytics.batchExpiredLastMonth
                    )
                  }
                >
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setInventoryExpired(
                      inventoryAnalytics.batchExpiredLastYear
                    )
                  }
                  onMouseEnter={() =>
                    setInventoryExpired(
                      inventoryAnalytics.batchExpiredLastWeek
                    )
                  }
                >
                </div>
                <div
                  className="tab-item"
                  onMouseLeave={() =>
                    setInventoryExpired(
                      inventoryAnalytics.batchExpiredLastYear
                    )
                  }
                  onMouseEnter={() =>
                    setInventoryExpired(
                      inventoryAnalytics.batchExpiredToday
                    )
                  }
                >
                </div>
              </div> */}
                  <div className='transit-text count'>{inventoryExpired}</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}
      <div className='full-width-ribben'>
        <TableFilter
          // isReportDisabled={!isAuthenticated("inventoryExportReport")}
          isReportDisabled={true}
          data={headers}
          setInventoryStatusFilterOnSelect={setInventoryStatusFilterOnSelect}
          filterTableByCalendar={filterTableByCalendar}
          showCalendar={showCalendar}
          setShowCalendar={setShowCalendar}
          type={'INVENTORY'}
          showDropDownForProductName={showDropDownForProductName}
          setShowDropDownForProductName={setShowDropDownForProductName}
          productNameData={productNameData}
          onSelectionOfDropdownValue={onSelectionOfDropdownValue}
          onChangeOfSearchForFilterInput={onChangeOfSearchForFilterInput}
          categoryData={categoryData}
          showDropDownForCategory={showDropDownForCategory}
          setShowDropDownForCategory={setShowDropDownForCategory}
          startDate={startDate}
          endDate={endDate}
          setDateFilterOnSelect={setDateFilterOnSelect}
          fb='80%'
        />
      </div>
      <div className='ribben-space'>
        <div className='row no-gutter'>
          <div className='col-sm-12 col-xl-9 rTableHeader'>
            <Table
              data={tableHeaders}
              {...props}
              colors={colors}
              inventoryCount={props.inventoriesCount}
              onPageChange={onPageChange}
            />
          </div>
          <div className='col-sm-12 col-xl-3'>
            {isAuthenticated("viewProductList") && (
              <div className='list-container'>
                <div className='d-flex justify-content-between align-items-center ml-3'>
                  <h4>
                    <b>Product List</b>
                  </h4>
                  <Link to='/productcategory'>
                    <button className='btn btn-link mr-1'>
                      <b>View all</b>
                    </button>
                  </Link>
                </div>
                <div
                  className='overflow ml-3'
                  style={{ height: "720px", overflowX: "hidden" }}
                >
                  <div className='row'>
                    {productsList?.map((product, index) => (
                      <div className='col-sm-6' key={index}>
                        <div
                          className='d-flex card flex-column align-items-center'
                          style={{ backgroundColor: colors[index] }}
                        >
                          <div className='round-sign'>
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
                          <h3 className='qty'>
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
    </div>
  );
};

export default Inventory;

function getFormatedDate(date) {
  date = new Date(date);
  return new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    .toISOString()
    .split("T")[0];
}

function setQueryKeyAndQueryValue(setQueryValue, value, setQueryType, type, data, index) {
  if(data[index].checked) {
    setQueryValue(value);
    setQueryType(type);
  } else {
    setQueryValue();
    setQueryType(type);
  }
}