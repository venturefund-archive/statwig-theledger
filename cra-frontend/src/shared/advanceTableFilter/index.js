import React from "react";
import updownarrow from "../../assets/icons/up-and-down-1.svg";
import FilterIcon from "../../assets/icons/Filter.svg";
import ExportIcon from "../../assets/icons/Export.svg";
import dropdownIcon from "../../assets/icons/drop-down.svg";
import "./style.scss";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FilterDropDown from "../../components/filterDropDown";
import Calendar from '../calendar';
import DropDownFilter from "../../shared/dropDownFilter";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #D3D4D5",
    width: "10%",
    borderRadius: "15px",
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
const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      /* backgroundColor: theme.palette.primary.main, */
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);
const AdvanceTableFilter = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [statusAnchorEl, setStatusAnchorEl] = React.useState(null);
  const [toShipmentAnchorEl, setToShipmentAnchorEl] = React.useState(null);
  const [fromShipmentAnchorEl, setFromShipmentAnchorEl] = React.useState(null);
  const [shipmentIdAnchorEl, setShipmentIdAnchorEl] = React.useState(null);
  const [poDeliveryLocationAnchorEl, setPoDeliveryLocationAnchorEl] =
    React.useState(null);
  const [poProductNameAnchorEl, setPoProductNameAnchorEl] =
    React.useState(null);
  const [poOrderIdAnchorEl, setPoOrderIdAnchorEl] = React.useState(null);
  const [poFromAnchorEl, setPoFromAnchorEl] = React.useState(null);
  const [poToAnchorEl, setPoToAnchorEl] = React.useState(null);
  const [inventoryStatusAnchorEl, setInventoryStatusAnchorEl] =
    React.useState(null);
  const [inventoryProductNameAnchorEl, setInventoryProductNameAnchorEl] =
    React.useState(null);
  const [
    inventoryProductCategoryAnchorEl,
    setInventoryProductCategoryAnchorEl,
  ] = React.useState(null);
  const [inventoryManufacturerAnchorEl, setInventoryManufacturerAnchorEl] =
    React.useState(null);
  const [inventoryfiFilterOnSelect, setInventoryfiFilterOnSelect] =
    React.useState(null);

    const {
      onChangeOfSearchForFilterInput,
      onSelectionOfDropdownValue,
      showDropDownForToFilter,
      setShowDropDownForToFilter,
      toFilterData,
      fromFilterData,
      showDropDownForFromFilter,
      setShowDropDownForFromFilter,
      shipmentIdData,
      setShowDropDownForShipmentId,
      showDropDownForShipmentId,
      orderIdData,
      setShowDropDownForOrderId,
      showDropDownForOrderId,
      productNameData,
      setShowDropDownForProductName,
      showDropDownForProductName,
      deliveryLocationData,
      setShowDropDownForDeliveryLocation,
      showDropDownForDeliveryLocation,
      orderSentToData,
      setShowDropDownForOrderSentTo,
      showDropDownForOrderSentTo,
      setShowCalendar,
      showCalendar
    } = props;

    const renderColumn6 = (columnData) => {
      if (columnData === "Status") {
        return (<div className="box col-1">
          <span className="divider" />
          <a className="filter-item ml-4" onClick={handleInventoryStatusClick}>
            <div className="icon mr-2">
              {props.data.img6}
            </div>
            <div className="filterTitle">{props.data.coloumn6}</div>
            <img src={updownarrow} width="10" height="10" className="ml-3" />
          </a>
          <StyledMenu
            className="ml-5 mt-3"
            style={{ width: "140rem" }}
            id="customized-menu"
            anchorEl={inventoryStatusAnchorEl}
            keepMounted
            onBlur={handleInventoryStatusClose}
            open={Boolean(inventoryStatusAnchorEl)}
            onClose={handleInventoryStatusClose}
          >
            <div className="d-flex flex-column align-items-center">
              <StyledMenuItem>
                <Button style={{ padding: "10px", height: "40px", width: "180px", borderRadius: "10px" }} class="btn btn-outline-success btn-sm font-weight-bold" color="primary" onClick={() => setStatusFilterOnSelect("ACCEPTED")}>Accepted</Button>
              </StyledMenuItem>
              <StyledMenuItem>
                <Button style={{ padding: "10px", height: "40px", width: "180px", borderRadius: "10px" }} class="btn btn-outline-primary btn-sm font-weight-bold" color="primary" onClick={() => setStatusFilterOnSelect("CREATED")}>{props.visible == "one" ? "Sent" : "Received"}</Button>
              </StyledMenuItem>
  
              <StyledMenuItem>
                <Button style={{ padding: "10px", height: "40px", width: "180px", borderRadius: "10px" }} class="btn btn-outline-warning btn-sm font-weight-bold" color="primary" onClick={() => setStatusFilterOnSelect("TRANSIT%26PARTIALLYFULFILLED")}>Transit & Partially Fulfilled</Button>
              </StyledMenuItem>
  
              <StyledMenuItem>
                <Button style={{ padding: "10px", height: "40px", width: "180px", borderRadius: "10px" }} class="btn btn-outline-info btn-sm font-weight-bold" color="primary" onClick={() => setStatusFilterOnSelect("TRANSIT%26FULLYFULFILLED")}>Transit & Fullyfilled</Button>
              </StyledMenuItem>
  
              <StyledMenuItem>
                <Button style={{ padding: "10px", height: "40px", width: "180px", borderRadius: "10px" }} class="btn btn-outline-info btn-sm font-weight-bold" color="primary" onClick={() => setStatusFilterOnSelect("FULLYFULFILLED")}>Fullyfilled</Button>
              </StyledMenuItem>
              <StyledMenuItem>
                <Button style={{ padding: "10px", height: "40px", width: "180px", borderRadius: "10px" }} class="btn btn-outline-secondary btn-sm font-weight-bold" color="primary" onClick={() => setStatusFilterOnSelect("REJECTED")}>Rejected</Button>
              </StyledMenuItem>
              <StyledMenuItem>
                <Button class="btn btn-link btn-sm font-weight-bold" color="primary" onClick={() => setStatusFilterOnSelect("")}>Clear</Button>
              </StyledMenuItem>
            </div>
          </StyledMenu>
  
        </div>);
        //   return (  <div className="box col">
        //   <span className="divider" />
        //   <div className="filter-item">
        //     <div className="icon mr-2">
        //       {props.data.img6}
        //     </div>
        //     <div className="filterTitle">{props.data.coloumn6}</div>
        //     <div className="filterAction">
        //       {/* <img src={updownarrow} width="9" height="9" /> */}
        //      </div>
        //   </div>
        // </div>
        //   );
      } else {
        return (<div className="box col">
          <span className="divider" />
          <a className="filter-item ml-4" onClick={handleInventoryStatusClick}>
            <div className="icon mr-2">
              {props.data.img6}
            </div>
            <div className="filterTitle">{props.data.coloumn6}</div>
            <img src={updownarrow} width="10" height="10" className="ml-3" />
          </a>
          <StyledMenu
            className="filter-dropdown"
            style={{ width: "100rem" }}
            id="customized-menu"
            anchorEl={inventoryStatusAnchorEl}
            keepMounted
            onBlur={handleInventoryStatusClose}
            open={Boolean(inventoryStatusAnchorEl)}
            onClose={handleInventoryStatusClose}
          >
            <div className="d-flex flex-column align-items-center">
              <StyledMenuItem>
                <Button style={{ padding: "0px", height: "40px", width: "130px", borderRadius: "10px" }} class="btn btn-outline-primary btn-sm font-weight-bold" variant="outlined" color="primary" onClick={() => setStatusFilterOnSelect("CREATED")}>Shipped</Button>
              </StyledMenuItem>
              <StyledMenuItem>
                <Button style={{ padding: "0px", height: "40px", width: "130px", borderRadius: "10px" }} class="btn btn-outline-success btn-sm font-weight-bold" variant="outlined" color="primary" onClick={() => setStatusFilterOnSelect("RECEIVED")}>Delivered</Button>
              </StyledMenuItem>
              <StyledMenuItem>
                <Button class="btn btn-link btn-sm font-weight-bold" color="primary" onClick={() => setStatusFilterOnSelect("")}>Clear</Button>
              </StyledMenuItem>
            </div>
          </StyledMenu>
        </div>
        );
      }
    }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (props.type === 'ORDERS') {
      setShowDropDownForDeliveryLocation(false);
      setShowDropDownForProductName(false);
      setShowDropDownForOrderId(false);
      setShowCalendar(false);
      setShowDropDownForOrderSentTo(false);
      props.setShowExportFilter(false);
    } else if(props.type === 'INVENTORY') {
      props.setShowDropDownForCategory(false);
      props.setShowDropDownForProductName(false);
      props.setShowCalendar(false);
    } else if(props.type === "SHIPMENT"){
      setShowDropDownForFromFilter(false);
      setShowDropDownForToFilter(false);
      setShowDropDownForShipmentId(false);
      props.setShowExportFilter(false);
      setShowCalendar(false);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const setDateFilterOnSelect = (selectedVal) => {
    props.setDateFilterOnSelect(selectedVal);
    handleClose();
  };

  // const handleStatusClick = (event) => {
  //   setStatusAnchorEl(event.currentTarget);
  // };

  const handleStatusClose = () => {
    setStatusAnchorEl(null);
  };

  const setStatusFilterOnSelect = (selectedVal) => {
    props.setStatusFilterOnSelect(selectedVal);
    handleStatusClose();
  };

  const handlePoDeliveryLocationClick = (event) => {
    setPoDeliveryLocationAnchorEl(event.currentTarget);
  };

  const handlePoDeliveryLocationClose = () => {
    setPoDeliveryLocationAnchorEl(null);
  };

  const setPoDeliveryLocationFilterOnSelect = (selectedVal) => {
    props.setLocationFilterOnSelect(selectedVal);
    handlePoDeliveryLocationClose();
  };
  
  const renderColumn5 = (columnData) => {
    if (columnData == "Status") {
      return (<div className="box col-2">
        {/* <span className="divider" /> */}
        <a className="filter-item mr-5" onClick={handleInventoryStatusClick}>
          <div className="icon mr-2">
            {props.data.img5}
          </div>
          <div className="filterTitle">{props.data.coloumn5}</div>
          <img src={updownarrow} width="10" height="10" className="ml-3" />
        </a>
        <StyledMenu
          className="mt-3"
          id="customized-menu"
          anchorEl={inventoryStatusAnchorEl}
          keepMounted
          open={Boolean(inventoryStatusAnchorEl)}
          onClose={handleInventoryStatusClose}
        >
          <div className="d-flex flex-column align-items-center">
            <StyledMenuItem>
              <Button style={{ padding: "10px", height: "40px", width: "130px", borderRadius: "10px" }} class="btn btn-outline-primary btn-sm font-weight-bold" variant="outlined" color="primary" onClick={() => setInventoryStatusFilterOnSelect("ADD")}>Added</Button>
            </StyledMenuItem>
            <StyledMenuItem>
              <Button style={{ padding: "10px", height: "40px", width: "130px", borderRadius: "10px" }} class="btn btn-outline-warning btn-sm font-weight-bold" variant="outlined" color="primary" onClick={() => setInventoryStatusFilterOnSelect("CREATE")}>Sent</Button>
            </StyledMenuItem>
            <StyledMenuItem>
              <Button style={{ padding: "10px", height: "40px", width: "130px", borderRadius: "10px" }} class="btn btn-outline-success btn-sm font-weight-bold" variant="outlined" color="primary" onClick={() => setInventoryStatusFilterOnSelect("RECEIVE")}>Received</Button>
            </StyledMenuItem>
            <StyledMenuItem>
              <Button class="btn btn-link btn-sm font-weight-bold" color="primary" onClick={() => setInventoryStatusFilterOnSelect("")}>Clear</Button>
            </StyledMenuItem>
          </div>
        </StyledMenu>

      </div>);
      //   return (  <div className="box col">
      //   <span className="divider" />
      //   <div className="filter-item">
      //     <div className="icon mr-2">
      //       {props.data.img6}
      //     </div>
      //     <div className="filterTitle">{props.data.coloumn6}</div>
      //     <div className="filterAction">
      //       {/* <img src={updownarrow} width="9" height="9" /> */}
      //      </div>
      //   </div>
      // </div>
      //   );
    } else if (columnData == "Status") {
      return (<div className="box col">
        {/* <span className="divider" /> */}
        <a className="filter-item" onClick={handleInventoryStatusClick}>
          <div className="icon mr-2">
            {props.data.img5}
          </div>
          <div className="filterTitle">{props.data.coloumn5}</div>
          <img src={updownarrow} width="10" height="10" className="ml-3" />
        </a>
        <StyledMenu
          className="filter-dropdown"
          id="customized-menu"
          anchorEl={inventoryStatusAnchorEl}
          keepMounted
          onBlur={handleInventoryStatusClose}
          open={Boolean(inventoryStatusAnchorEl)}
          onClose={handleInventoryStatusClose}
        >
          <div className="d-flex flex-column align-items-center">
            <StyledMenuItem>
              <Button style={{ padding: "10px", height: "40px", width: "130px", borderRadius: "10px" }} class="btn btn-outline-primary btn-sm font-weight-bold" variant="outlined" color="primary" onClick={() => setStatusFilterOnSelect("CREATED")}>Shipped</Button>
            </StyledMenuItem>
            <StyledMenuItem>
              <Button style={{ padding: "10px", height: "40px", width: "130px", borderRadius: "10px" }} class="btn btn-outline-primary btn-sm font-weight-bold" variant="outlined" color="primary" onClick={() => setStatusFilterOnSelect("RECEIVED")}>Delivered</Button>
            </StyledMenuItem>
            <StyledMenuItem>
              <Button class="btn btn-link btn-sm font-weight-bold" color="primary" onClick={() => setStatusFilterOnSelect("")}>Clear</Button>
            </StyledMenuItem>
          </div>
        </StyledMenu>

      </div>);
    } else if (columnData == "Delivery Location") {
      return (<div className="box col">
        <a className="filter-item ml-5"
          onClick={() => {
            setShowDropDownForDeliveryLocation(!showDropDownForDeliveryLocation);
            if (!showDropDownForDeliveryLocation) {
              setShowDropDownForProductName(false);
              setShowDropDownForOrderSentTo(false);
              setShowDropDownForOrderId(false);
              setShowCalendar(false);
              setInventoryStatusAnchorEl(null);
              props.setShowExportFilter(false);
            }
          }}
          style={{ position: "relative", left: "-35px" }}>
          <div className="icon mr-2">
            {props.data.img5}
          </div>
          <div className="filterTitle">{props.data.coloumn5}</div>
          <img src={updownarrow} width="10" height="10" className="ml-3" style={{ position: "relative", left: "20px" }} />
        </a>
        {showDropDownForDeliveryLocation && deliveryLocationData &&
          <DropDownFilter
            onChangeOfSearchInput={onChangeOfSearchForFilterInput}
            data={deliveryLocationData}
            type={'deliveryLocation'}
            onClickOfDropDownItem={onSelectionOfDropdownValue}
          />
        }
      </div>);
    } else {
      return (<div className="box col">
        <div className="filter-item">
          <div className="icon mr-2">
            {props.data.img5}
          </div>
          <div className="filterTitle">{props.data.coloumn5}</div>
          <div className="filterAction">
            {/* <img src={updownarrow} width="9" height="9" /> */}
          </div>
        </div>
      </div>);
    }
  }

  const handleToShipmentClick = (event) => {
    setToShipmentAnchorEl(event.currentTarget);
  };

  const handleToShipmentClose = () => {
    setToShipmentAnchorEl(null);
  };

  const setToShipmentFilterOnSelect = (selectedVal) => {
    props.setToShipmentFilterOnSelect(selectedVal);
    handleToShipmentClose();
  };

  const handlePoProductNameClick = (event) => {
    setPoProductNameAnchorEl(event.currentTarget);
  };

  const handlePoProductNameClose = () => {
    setPoProductNameAnchorEl(null);
  };

  const setPoProductNameFilterOnSelect = (selectedVal) => {
    props.setProductNameFilterOnSelect(selectedVal);
    handlePoProductNameClose();
  };

  const handleInventoryStatusClick = (event) => {
    setInventoryStatusAnchorEl(event.currentTarget);
    if (props.type === 'ORDERS') {
      setShowDropDownForDeliveryLocation(false);
      setShowDropDownForProductName(false);
      setShowDropDownForOrderId(false);
      setShowCalendar(false);
      setShowDropDownForOrderSentTo(false);
      props.setShowExportFilter(false);
    } else if(props.type === "INVENTORY") {
      props.setShowDropDownForCategory(false);
      props.setShowDropDownForProductName(false);
      props.setShowCalendar(false);
    } else if(props.type === "SHIPMENT"){
      setShowDropDownForFromFilter(false);
      setShowDropDownForToFilter(false);
      setShowDropDownForShipmentId(false);
      setShowCalendar(false);
      props.setShowExportFilter(false);
    }
  };


  const handleInventoryStatusClose = () => {
    setInventoryStatusAnchorEl(null);
  };

  const setInventoryStatusFilterOnSelect = (selectedVal) => {
    props.setInventoryStatusFilterOnSelect(selectedVal);
    handleInventoryStatusClose();
  };

  // const setInventoryfiFilterOnSelect = (selectedVal) => {
  //   props.setInventoryfiFilterOnSelect(selectedVal);
  //   handleInventoryStatusClose();
  // }

  const renderColumn4 = (columnData) => {
    if (columnData == "To") {
      return (<div className="box col-3">
        <a className="filter-item"
          onClick={() =>
            {
              setShowDropDownForToFilter(!showDropDownForToFilter);
              if(!showDropDownForToFilter){
                setShowDropDownForShipmentId(false);
                setShowCalendar(false);
                setShowDropDownForFromFilter(false);
                props.setShowExportFilter(false);
              }
            }
          }
          style={{ position: "relative", left: "-80px" }}>
          <div className="icon mr-0">
            {props.data.img4}
          </div>
          <div className="filterTitle" >{props.data.coloumn4}</div>
          <img src={updownarrow} width="10" height="10" style={{ position: "relative", left: "220px" }} />
        </a>
        {showDropDownForToFilter && toFilterData &&
          <DropDownFilter
            onChangeOfSearchInput={onChangeOfSearchForFilterInput}
            data={toFilterData}
            type={'toFilter'}
            onClickOfDropDownItem={onSelectionOfDropdownValue}
          />
        }
      </div>);
    } else if (columnData == "Product") {
      return (<div className="box col-3" >
        <a className="filter-item" onClick={() => {
          setShowDropDownForProductName(!showDropDownForProductName)
          if (!showDropDownForProductName) {
            setShowDropDownForDeliveryLocation(false);
            setShowDropDownForOrderSentTo(false);
            setShowDropDownForOrderId(false);
            setShowCalendar(false);
            setInventoryStatusAnchorEl(null);
            props.setShowExportFilter(false);
          }
        }}
          style={{ position: "relative", left: "-50px" }}>
          <div className="icon mr-2">
            {props.data.img4}
          </div>
          <div className="filterTitle">{props.data.coloumn4}</div>
          <img src={updownarrow} width="10" height="10" className="ml-3" style={{ position: "relative", left: "100px" }} />
        </a>
        {showDropDownForProductName && productNameData &&
          <DropDownFilter
            onChangeOfSearchInput={onChangeOfSearchForFilterInput}
            data={productNameData}
            type={'product'}
            onClickOfDropDownItem={onSelectionOfDropdownValue}
          />
        }
      </div>);
    } else if (columnData == "Status") {
      return (<div className="box col">
        <a className="filter-item" onClick={handleInventoryStatusClick}>
          <div className="icon mr-2">
            {props.data.img4}
          </div>
          <div className="filterTitle">{props.data.coloumn4}</div>
          <img src={updownarrow} width="10" height="10" className="ml-3" />
        </a>
        <StyledMenu
          id="customized-menu"
          anchorEl={inventoryStatusAnchorEl}
          keepMounted
          open={Boolean(inventoryStatusAnchorEl)}
          onClose={handleInventoryStatusClose}
        >
          <div className="d-flex flex-column align-items-center">
            <StyledMenuItem>
              <Button style={{ padding: "10px", height: "40px", width: "130px" }} class="btn btn-outline-primary btn-sm font-weight-bold" variant="outlined" color="primary" onClick={() => setInventoryfiFilterOnSelect("ADD")}>Add</Button>
            </StyledMenuItem>
            <StyledMenuItem>
              <Button style={{ padding: "10px", height: "40px", width: "130px" }} class="btn btn-outline-primary btn-sm font-weight-bold" variant="outlined" color="primary" onClick={() => setInventoryStatusFilterOnSelect("CREATE")}>Create</Button>
            </StyledMenuItem>
            <StyledMenuItem>
              <Button style={{ padding: "10px", height: "40px", width: "130px" }} class="btn btn-link btn-sm font-weight-bold" variant="outlined" color="primary" onClick={() => setInventoryStatusFilterOnSelect("")}>Clear</Button>
            </StyledMenuItem>
          </div>
        </StyledMenu>
      </div>);
    } else {
      return (<div className="box col">
        <div className="filter-item">
          <div className="icon mr-2">
            {props.data.img4}
          </div>
          <div className="filterTitle">{props.data.coloumn4}</div>
          <div className="filterAction">
            {/* <img src={updownarrow} width="9" height="9" /> */}
          </div>
        </div>
      </div>);
    }
  }

  const handleFromShipmentClick = (event) => {
    setFromShipmentAnchorEl(event.currentTarget);
  };

  const handleFromShipmentClose = () => {
    setFromShipmentAnchorEl(null);
  };

  const setFromShipmentFilterOnSelect = (selectedVal) => {
    props.setFromShipmentFilterOnSelect(selectedVal);
    handleFromShipmentClose();
  };

  const handlePoOrderIdClick = (event) => {
    setPoOrderIdAnchorEl(event.currentTarget);
  };

  const handlePoOrderIdClose = () => {
    setPoOrderIdAnchorEl(null);
  };

  const setPoOrderIdFilterOnSelect = (selectedVal) => {
    props.setOrderIdNameFilterOnSelect(selectedVal);
    handlePoOrderIdClose();
  };

  // const handleInventoryManufacturerClose = () => {
  //   setInventoryManufacturerAnchorEl(null);
  // };

  const renderColumn3 = (columnData) => {
    if (columnData == "From") {
      return (<div className="box col-4">
        <a className="filter-item ml-4" onClick={() =>
         {
          setShowDropDownForFromFilter(!showDropDownForFromFilter);
          if(!showDropDownForFromFilter){
            setShowDropDownForShipmentId(false);
            setShowDropDownForToFilter(false);
            setShowCalendar(false);
            props.setShowExportFilter(false);
          }
         }
        } style={{ position: "relative", left: "-70px" }}>
          <div className="icon mr-2">
            {props.data.img3}
          </div>
          <div className="filterTitle">{props.data.coloumn3}</div>
          <img src={updownarrow} width="10" height="10" className="ml-3" style={{ position: "relative", left: "140px" }} />
        </a>
        {showDropDownForFromFilter && fromFilterData &&
          <DropDownFilter
            onChangeOfSearchInput={props.onChangeOfSearchForFilterInput}
            data={fromFilterData}
            type={'fromFilter'}
            onClickOfDropDownItem={onSelectionOfDropdownValue}
          />
        }
      </div>);
    } else if (columnData == "Order ID") {
      return (<div className="box col-2">
        <a className="filter-item" onClick={() => {
          setShowDropDownForOrderId((prev) => !prev);
          if (!showDropDownForOrderId) {
            setShowDropDownForDeliveryLocation((prev) => prev = false);
            setShowDropDownForProductName((prev) => prev = false);
            setShowDropDownForOrderSentTo((prev) => prev = false);
            setShowCalendar((prev) => prev = false);
            setInventoryStatusAnchorEl(null);
            props.setShowExportFilter((prev) => prev = false);
          }
        }

        }>
          <div className="icon mr-2">
            {props.data.img3}
          </div>
          <div className="filterTitle">{props.data.coloumn3}</div>
          <img src={updownarrow} width="10" height="10" className="ml-3" />
        </a>
        {showDropDownForOrderId && orderIdData &&
          <DropDownFilter
            onChangeOfSearchInput={props.onChangeOfSearchForFilterInput}
            data={orderIdData}
            type={'orderId'}
            onClickOfDropDownItem={onSelectionOfDropdownValue}
          />
        }
      </div>);
    } else {
      return (
        <div className="box"
          style={{
            position: 'relative',
            cursor: 'pointer',
            width: '144px',
          }}>
          <a
            className="filter-item"
            onClick={() => {
              props.setShowCalendar(!showCalendar);
              if(!showCalendar) {
                props.setShowDropDownForProductName(false);
                props.setShowDropDownForCategory(false);
              }
            }}>
            <div className="icon mr-2">
              {props.data.img3}
            </div>
            <div className="filterTitle">{props.data.coloumn3}</div>
            <img src={updownarrow} width="10" height="10" className="ml-3" style={{ position: "relative", left: "20px" }} />
          </a>
          {
            props.showCalendar && props.type === 'INVENTORY' &&
            <div style={{
              position: 'absolute',
              zIndex: 1,
              top: '43px',
              left: '0px'
            }}>
              <Calendar
                filterTableByCalendar={props.filterTableByCalendar}
                startDate={props.startDate}
                endDate={props.endDate}
              />
            </div>
          }
        </div>);
    }
  }

  const setInventoryProductCategoryFilterOnSelect = (selectedVal) => {
    props.setInventoryProductCategoryFilterOnSelect(selectedVal);
    handleInventoryProductCategoryClose();
  };

  const handleInventoryProductCategoryClick = (event) => {
    setInventoryProductCategoryAnchorEl(event.currentTarget);
  };

  const handleInventoryProductCategoryClose = () => {
    setInventoryProductCategoryAnchorEl(null);
  };
  const renderColumn2 = (columnData) => {
    if (columnData == "Product Category") {
      return (<div className="box col-3">
        <div className="filter-item" onClick={() => {
          props.setShowDropDownForCategory(!props.showDropDownForCategory);
          if(!props.showDropDownForCategory) {
            props.setShowDropDownForProductName(false);
            props.setShowCalendar(false);
          }
        }
        }>
          <div className="icon mr-2">
            {props.data.img2}
          </div>
          <div className="filterTitle">{props.data.coloumn2}</div>
          <img src={updownarrow} width="10" height="10" className="ml-3" style={{ position: "relative", left: "20px" }} />
        </div>
        {props.showDropDownForCategory && props.categoryData &&
          <DropDownFilter
            onChangeOfSearchInput={props.onChangeOfSearchForFilterInput}
            data={props.categoryData}
            type={'category'}
            onClickOfDropDownItem={props.onSelectionOfDropdownValue}
          />
        }
      </div>);
    } else {
      return (
        <div className="box col-2">
          <a className="filter-item" onClick={() => {
            setShowCalendar(!showCalendar)
            if (!showCalendar) {
              if(props.type === 'ORDERS') {
                setShowDropDownForDeliveryLocation(false);
                setShowDropDownForProductName(false);
                setShowDropDownForOrderId(false);
                setShowDropDownForOrderSentTo(false);
                props.setShowExportFilter(false);
              } else {
                setShowDropDownForFromFilter(false);
                setShowDropDownForToFilter(false);
                setShowDropDownForShipmentId(false);
                props.setShowExportFilter(false);
              } 
            }
          }
          }>
            <div className="icon mr-2">
              {props.data.img2}
            </div>
            <div className="filterTitle">{props.data.coloumn2}</div>
            <img src={updownarrow} width="10" height="10" className="ml-1" />
          </a>
          {
            showCalendar && (props.type === 'SHIPMENT' || props.type === 'ORDERS') &&
            <div style={{
              position: 'absolute',
              zIndex: 1,
              top: '43px',
              left: '0px'
            }}>
              <Calendar
                filterTableByCalendar={props.filterTableByCalendar}
                startDate={props.startDate}
                endDate={props.endDate}
              />
            </div>
          }
        </div>);
    }
  };

  const handleShipmentIdClick = (event) => {
    setShipmentIdAnchorEl(event.currentTarget);
  };

  const handleShipmentIdClose = () => {
    setShipmentIdAnchorEl(null);
  };

  const setShipmentIdFilterOnSelect = (selectedVal) => {
    props.setShipmentIdFilterOnSelect(selectedVal);
    handleShipmentIdClose();
  };

  const handlePoToClick = (event) => {
    setPoToAnchorEl(event.currentTarget);
  };

  const handlePoToClose = () => {
    setPoToAnchorEl(null);
  };

  const setPoToFilterOnSelect = (selectedVal) => {
    props.setFromToFilterOnSelect(selectedVal);
    handlePoToClose();
  };

  const handlePoFromClick = (event) => {
    setPoFromAnchorEl(event.currentTarget);
  };

  const handlePoFromClose = () => {
    setPoFromAnchorEl(null);
  };

  const setInventoryProductNameFilterOnSelect = (selectedVal) => {
    props.setInventoryProductNameFilterOnSelect(selectedVal);
    handleInventoryProductNameClose();
  };

  const handleInventoryProductNameClick = (event) => {
    setInventoryProductNameAnchorEl(event.currentTarget);
  };

  const handleInventoryProductNameClose = () => {
    setInventoryProductNameAnchorEl(null);
  };

  const setPoFromFilterOnSelect = (selectedVal) => {
    props.setFromToFilterOnSelect(selectedVal);
    handlePoFromClose();
  };

  const renderColumn1 = (columnData) => {
    if (columnData == "Shipment ID") {
      return (<div className="box col-2">
        <a className="filter-item ml-4 mr-3" onClick={() =>
          {
            setShowDropDownForShipmentId(!showDropDownForShipmentId);
            if(!showDropDownForShipmentId) {
              props.setShowCalendar(false);
              props.setShowDropDownForFromFilter(false);
              props.setShowDropDownForToFilter(false);
              props.setShowExportFilter(false);
            }
          }
        }>
          <div className="icon mr-2">
            {props.data.img1}
          </div>
          <div className="filterTitle">{props.data.coloumn1}</div>
          <img src={updownarrow} width="10" height="10" class="ml-1" />
        </a>
        {showDropDownForShipmentId && shipmentIdData &&
          <DropDownFilter
            onChangeOfSearchInput={props.onChangeOfSearchForFilterInput}
            data={shipmentIdData}
            type={'shipmentId'}
            onClickOfDropDownItem={onSelectionOfDropdownValue}
          />
        }
      </div>);
    } else if (columnData == "To") {
      return (<div className="box col" style={{ position: "relative", left: "-30px" }}>
        <a className="filter-item ml-4" onClick={handlePoToClick}>
          <div className="icon mr-2">
            {props.data.img1}
          </div>
          <div className="filterTitle">{props.data.coloumn1}</div>
          <img src={updownarrow} width="10" height="10" className="ml-3" style={{ position: "relative", left: "70px" }} />
        </a>
        <StyledMenu
          id="customized-menu"
          anchorEl={poToAnchorEl}
          keepMounted
          open={Boolean(poToAnchorEl)}
          onClose={handlePoToClose}
        >
          <div className="d-flex flex-column align-items-center">
            <StyledMenuItem>
              <Button style={{ padding: "10px", height: "40px", width: "130px" }} class="btn btn-link btn-sm font-weight-bold" variant="outlined" color="primary" onClick={() => setPoToFilterOnSelect("")}>Clear</Button>
            </StyledMenuItem>
            {poToAnchorEl ?
              // props.poOrganisationsList.map((org) => {
              //   let orgNameDisplay = org.name + " (" + org.id + ")";
              //   return (
              //     <div>
              //       <StyledMenuItem>
              //         <Button variant="outlined" color="primary" onClick={() => setPoToFilterOnSelect(org.id)}>{orgNameDisplay}</Button>
              //       </StyledMenuItem>
              //     </div>
              //   )
              // }) 
              <Autocomplete
                id="toOrder"
                options={props.poOrganisationsList}
                getOptionLabel={(options) => options.name}
                onChange={(event, newValue) => {
                  setPoToFilterOnSelect(newValue.id)
                }}
                style={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label={'Search Customer'} variant="outlined" />}
              />
              :
              <div>
                Empty List
            </div>
            }
          </div>
        </StyledMenu>
      </div>);
    } else if (columnData == "From") {
      return (<div className="box col-2">
        <a className="filter-item ml-4" onClick={handlePoFromClick}>
          <div className="icon mr-2">
            {props.data.img1}
          </div>
          <div className="filterTitle">{props.data.coloumn1}</div>
          <img src={updownarrow} width="10" height="10" className="ml-3" />
        </a>
        <StyledMenu
          id="customized-menu"
          anchorEl={poFromAnchorEl}
          keepMounted
          open={Boolean(poFromAnchorEl)}
          onClose={handlePoFromClose}
        >
          <div className="d-flex flex-column align-items-center">
            <StyledMenuItem>
              <Button style={{ padding: "10px", height: "40px", width: "130px" }} class="btn btn-link btn-sm font-weight-bold" variant="outlined" color="primary" onClick={() => setPoFromFilterOnSelect("")}>Clear</Button>
            </StyledMenuItem>
            {poFromAnchorEl ?
              // props.poOrganisationsList.map((org) => {
              //   let orgNameDisplay = org.name + " (" + org.id + ")";
              //   return (
              //     <div>
              //       <StyledMenuItem>
              //         <Button variant="outlined" color="primary" onClick={() => setPoFromFilterOnSelect(org.id)}>{orgNameDisplay}</Button>
              //       </StyledMenuItem>
              //     </div>
              //   )
              // }) 
              <Autocomplete
                id="fromOrder"
                options={props.poOrganisationsList}
                getOptionLabel={(options) => options.name}
                onChange={(event, newValue) => {
                  setPoFromFilterOnSelect(newValue.id)
                }}
                style={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label={'Search Supplier'} variant="outlined" />}
              />
              :
              <div>
                Empty List
            </div>
            }
          </div>
        </StyledMenu>
      </div>);
    } else if (columnData == "Product Name") {
      return (<div className="box col-4">
        <a className="filter-item ml-4" onClick={() => {
          props.setShowDropDownForProductName(!props.showDropDownForProductName);
          if(!props.showDropDownForProductName) {
            props.setShowDropDownForCategory(false);
            props.setShowCalendar(false);
          }
        }} style={{ position: "relative", left: "-70px" }}>
          <div className="icon mr-2">
            {props.data.img1}
          </div>
          <div className="filterTitle">{props.data.coloumn1}</div>
          <img src={updownarrow} width="10" height="10" className="ml-3" style={{ position: "relative", left: "140px" }} />
        </a>
        {props.showDropDownForProductName && props.productNameData &&
          <DropDownFilter
            onChangeOfSearchInput={props.onChangeOfSearchForFilterInput}
            data={props.productNameData}
            type={'productName'}
            onClickOfDropDownItem={props.onSelectionOfDropdownValue}
          />
        }
      </div>);
    } else {
      return (<div className="box col">
        <a className="filter-item" onClick={() => {
          setShowDropDownForOrderSentTo(!showDropDownForOrderSentTo)
          if (!showDropDownForOrderSentTo) {
            setShowDropDownForDeliveryLocation(false);
            setShowDropDownForProductName(false);
            setShowDropDownForOrderId(false);
            setShowCalendar(false);
            setInventoryStatusAnchorEl(null);
            props.setShowExportFilter(false);
          }
        }
        }>
          <div className="icon mr-2">
            {props.data.img1}
          </div>
          <div className="filterTitle">{props.data.coloumn1}</div>
          <img src={updownarrow} width="10" height="10" className="ml-3" style={{ position: "relative", left: "140px" }} />
        </a>
        {showDropDownForOrderSentTo && orderSentToData &&
          <DropDownFilter
            onChangeOfSearchInput={props.onChangeOfSearchForFilterInput}
            data={orderSentToData}
            type={'orderSentTo'}
            onClickOfDropDownItem={onSelectionOfDropdownValue}
          />
        }
      </div>);
    }
  }

  return (
    <div className='filter'>
      <div className='d-flex justify-content-between' style={{ alignItems: 'center' }}>
        <div className='row' style={{ flexBasis: props.fb }}>
          {/* <div className="box col">
            <div className="filter-item">
              <div className="icon mr-2">
                {props.data.img1}
              </div>
              <div className="filterTitle">{props.data.coloumn1}</div>
              <div className="filterAction"> */}
          {/* <img src={updownarrow} width="9" height="9" /> */}
          {/* </div>
            </div>
          </div> */}
          {props.data.img1 ? renderColumn1(props.data.coloumn1) : null}
          <span className='divider' />
          {/* <div className="box col">
            <div className="filter-item">
              <div className="icon mr-2">
                {props.data.img2}
              </div>
              <div className="filterTitle">{props.data.coloumn2}</div>
              <div className="filterAction">
              </div>
            </div>
          </div> */}
          {props.data.img2 ? renderColumn2(props.data.coloumn2) : null}
          <span className='divider' />

          {/* <div className="box col">
            <div className="filter-item">
              <div className="icon mr-2">
                {props.data.img3}
              </div>
              <div className="filterTitle">{props.data.coloumn3}</div>
              <div className="filterAction"> */}
          {/* <img src={updownarrow} width="9" height="9" /> */}
          {/* </div>
            </div>
          </div> */}
          {props.data.img3 ? renderColumn3(props.data.coloumn3) : null}
          {props.data.img4 ? <span className='divider' /> : null}
          {props.data.img4
            ? // <div className="box col">
              //   <div className="filter-item">
              //     <div className="icon mr-2">
              //       {props.data.img4}
              //     </div>
              //     <div className="filterTitle">{props.data.coloumn4}</div>
              //     <div className="filterAction">
              //       {/* <img src={updownarrow} width="9" height="9" /> */}
              //     </div>
              //   </div>
              // </div>
              renderColumn4(props.data.coloumn4)
            : null}
          {props.data.img5 ? <span className='divider' /> : null}
          {props.data.img5
            ? // <div className="box col">
              //   <div className="filter-item">
              //       <div className="icon mr-2">
              //         {props.data.img5}
              //       </div>
              //       <div className="filterTitle">{props.data.coloumn5}</div>
              //     <div className="filterAction">
              //       {/* <img src={updownarrow} width="9" height="9" /> */}
              //     </div>
              //   </div>
              // </div>
              renderColumn5(props.data.coloumn5)
            : null}
        </div>
        {props.data.img6 ? renderColumn6(props.data.coloumn6) : null}
        {/* <div className="box col">
          <span className="divider" />
          <div className="filter-item">
            <div className="icon mr-2">
              {props.data.img6}
            </div>
            <div className="filterTitle">{props.data.coloumn6}</div>
            <div className="filterAction">
              {/* <img src={updownarrow} width="9" height="9" /> */}
        {/* </div>
          </div>
        </div> */}
        <div className=''>
          <div className='box col'>
            {/* <button className="btn btn-md btn-blue mr-2">
            <div className="d-flex align-items-center">
              <img src={FilterIcon} width="10" height="10" className="mr-3" />
              <span className="text">Filter</span>
              <img src={dropdownIcon} width="10" height="10" className="ml-3" />
            </div>
          </button> */}
            <button className='btn-filter-info' onClick={handleClick}>
              <div className='d-flex align-items-center'>
                <img
                  src={FilterIcon}
                  width='14'
                  height='14'
                  className='mr-2'
                  alt='FilterIcon'
                />
                <span className='text'>Filter</span>
                <img
                  src={dropdownIcon}
                  width='10'
                  height='10'
                  className='ml-2'
                  alt='Drop Down Icon'
                />
              </div>
            </button>
            <StyledMenu
              id='customized-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <div className='d-flex flex-column align-items-center'>
                <StyledMenuItem>
                  <Button
                    type='button'
                    style={{ padding: "10px", height: "40px", width: "130px" }}
                    className='btn btn-outline-primary btn-sm'
                    onClick={() => setDateFilterOnSelect("today")}
                  >
                    <b>Today</b>
                  </Button>
                </StyledMenuItem>
                <StyledMenuItem>
                  <Button
                    type='button'
                    style={{ height: "40px", width: "130px" }}
                    className='btn btn-outline-primary btn-sm'
                    onClick={() => setDateFilterOnSelect("week")}
                  >
                    <b>This Week</b>
                  </Button>
                </StyledMenuItem>
                <StyledMenuItem>
                  <Button
                    type='button'
                    style={{ height: "40px", width: "130px" }}
                    className='btn btn-outline-primary btn-sm'
                    onClick={() => setDateFilterOnSelect("month")}
                  >
                    <b>This Month</b>
                  </Button>
                </StyledMenuItem>
                <StyledMenuItem>
                  <Button
                    type='button'
                    style={{ height: "40px", width: "130px" }}
                    className='btn btn-outline-primary btn-sm'
                    onClick={() => setDateFilterOnSelect("threeMonth")}
                  >
                    <b>Last 3 Months</b>
                  </Button>
                </StyledMenuItem>
                <StyledMenuItem>
                  <Button
                    type='button'
                    style={{ height: "40px", width: "130px" }}
                    className='btn btn-outline-primary btn-sm'
                    onClick={() => setDateFilterOnSelect("sixMonth")}
                  >
                    <b>Last 6 Months</b>
                  </Button>
                </StyledMenuItem>
                <StyledMenuItem>
                  <Button
                    type='button'
                    style={{ height: "40px", width: "130px" }}
                    className='btn btn-outline-primary btn-sm'
                    onClick={() => setDateFilterOnSelect("year")}
                  >
                    <b>This Year</b>
                  </Button>
                </StyledMenuItem>
              </div>
            </StyledMenu>
            {!props?.isReportDisabled && (
              <button
                className='btn-filter-blue ml-2'
                onClick={() =>
                  props.setShowExportFilter(!props.showExportFilter)
                }
              >
                <div className='d-flex  align-items-center'>
                  <img
                    src={ExportIcon}
                    width='14'
                    height='14'
                    className='mr-2'
                    alt='Export Icon'
                  />
                  <span>Export</span>
                  <img
                    src={dropdownIcon}
                    width='10'
                    height='10'
                    className='ml-2'
                    alt='DropDownIcon'
                  />
                  {props.showExportFilter && props.exportFilterData && (
                    <FilterDropDown
                      data={props.exportFilterData}
                      onChangeOfFilterDropDown={
                        props.onSelectionOfDropdownValue
                      }
                      type={"export"}
                    />
                  )}
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdvanceTableFilter;
