import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import "./style.scss";
import searchingIcon from "../../assets/icons/search.png";
import bellIcon from "../../assets/icons/notification_blue.png";
import dropdownIcon from "../../assets/icons/dropdown_selected.png";
import Location from "../../assets/icons/location_blue.png";
import InfiniteScroll from "react-infinite-scroll-component";
import DrawerMenu from "./drawerMenu";
import { Link } from "react-router-dom";
import Spinner from "../../components/spinner/index.js"
import "./Header.css";
import {
  Avatar,
  Badge,
  Divider,
  IconButton,
  Menu,
  InputBase,
  MenuItem,
} from "@mui/material";
import {
  ExpandMore,
  LocationOnOutlined,
  MenuOutlined,
  NotificationsOutlined,
  Search,
} from "@mui/icons-material";
import {
  getActiveWareHouses,
  getUserInfo,
  logoutUser,
  setUserLocation,
  postUserLocation,
} from "../../actions/userActions";
import logo from "../../assets/brands/VACCINELEDGER.png";
import {
  deleteNotification,
  getImage,
} from "../../actions/notificationActions";
import { turnOff, turnOn } from "../../actions/spinnerActions";
import useOnclickOutside from "react-cool-onclickoutside";
import { config } from "../../config";
import Modal from "../modal/index";
import FailedPopUp from "../PopUp/failedPopUp";
import {
  getShippingOrderIds,
  fetchAllairwayBillNumber,
} from "../../actions/shippingOrderAction";
import { getOrderIds } from "../../actions/poActions";
import DropdownButton from "../../shared/dropdownButtonGroup";
import setAuthToken from "../../utils/setAuthToken";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import axios from "axios";
import userIcon from "../../assets/icons/brand.png";
import inventoryIcon from "../../assets/icons/inventorynew.png";
import SettingIcon from "../../assets/icons/utilitieswhite.png";
import shipmentIcon from "../../assets/icons/TotalShipmentsCompleted.png";
import alertIcon from "../../assets/icons/alert.png";
import orderIcon from "../../assets/icons/Orders.png";
import { formatDistanceToNow } from "date-fns";
const Header = (props) => {
  // console.log(ABC)
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const [location, setLocation] = useState({});
  const [sidebar, openSidebar] = useState(false);
  const [search, setSearch] = useState("");
  const [searchString, setSearchString] = useState("");
  const [searchType, setSearchType] = useState("");
  const [alertType, setAlertType] = useState("ALERT");
  const [invalidSearch, setInvalidSearch] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [image, setImage] = useState("");
  const [activeWarehouses, setActiveWarehouses] = useState([]);
  const [options, setOptions] = useState([]);
  const [count, setCount] = useState(0);
  const [icount, setIcount] = useState(0);
  const [visible, setVisible] = useState("one");
  const [limit, setLimit] = useState(10);
  const [newNotifs, setNewNotifs] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const filterOptions = createFilterOptions({
    //matchFrom: "start",
    stringify: (option) => option._id,
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open2 = Boolean(anchorEl2);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const ref = useOnclickOutside(() => {
    setMenu(false);
  });
  const ref1 = useRef(null);
  useOnclickOutside((ref) => {
    // console.log(ref.target.className)
    if(ref.target.className !== "ignore-react-onclickoutside" && ref.target.className !== "badge badge-light")
    setShowNotifications(false);
  },
  { refs: [ref1] }
  )

  function onSearchChange(e) {
    setSearchString(e._id);
    setSearchType(e.type);
    axios
      .get(`${config().getSuggestions}?searchString=${e}`)
      .then((resp) => setOptions([...resp.data.data]));
  }

  const closeModalFail = () => {
    setInvalidSearch(false);
  };
  function notifIcon(notif) {
    if (notif.eventType === "INVENTORY") {
      return inventoryIcon;
    } else if (notif.eventType === "ORDER") {
      return orderIcon;
    } else if (notif.eventType === "SHIPMENT") {
      return shipmentIcon;
    } else if (notif.eventType === "SHIPMENT_TRACKING") {
      return userIcon;
    } else if (notif.eventType === "NEW_ALERT") {
      return alertIcon;
    } else {
      return alertIcon;
    }
  }

  function notifRouting(notif) {
    if (notif.transactionId == null || undefined || "") {
      return "/#";
    } else if (notif.eventType === "INVENTORY") {
      return "/inventory/" + notif.transactionId;
    } else if (notif.eventType === "ORDER") {
      return "/vieworder/" + notif.transactionId;
    } else if (notif.eventType === "SHIPMENT") {
      return "/viewshipment/" + notif.transactionId;
    } else if (notif.eventType === "SHIPMENT_TRACKING") {
      return "/viewshipment/" + notif.transactionId;
    } else {
      return "/#";
    }
  }
  async function readNotification(id){
    let res = axios.get(`${config().readNotification}${id}`)
    console.log(res)
  }
  async function getAllShipmentIDs() {
    dispatch(turnOn());
    let result = await getShippingOrderIds();
    dispatch(turnOff());
    return result;
  }
  async function getAllOrderIDs() {
    dispatch(turnOn());
    let result = await getOrderIds();
    dispatch(turnOff());
    return result;
  }
  async function getAllAirwayBillNo() {
    dispatch(turnOn());
    const result = await fetchAllairwayBillNumber();
    dispatch(turnOff());
    return result;
  }

  const onSeach = () => {
    if (search.substring(0, 2) === "SH") {
      getAllShipmentIDs().then((result) => {
        let shippingIds = result.map((so) => so.id);
        if (shippingIds.indexOf(search) !== -1) {
          props.history.push("/overview");
          props.history.replace(`/viewshipment/${search}`);
        } else setInvalidSearch(true);
      });
    } else if (search.substring(0, 2) === "PO") {
      getAllOrderIDs().then((result) => {
        let orderIds = result.map((so) => so.id);
        if (orderIds.indexOf(search) !== -1) {
          props.history.push(`/overview`);
          props.history.replace(`/vieworder/${search}`);
        } else setInvalidSearch(true);
      });
    } else if (searchType === "transitNumber") {
      getAllAirwayBillNo().then((result) => {
        dispatch(turnOn());
        let airWayBillNowithshipmentID = result.data;
        let airWayBillNo = result.data.map((so) => so.airWayBillNo);
        dispatch(turnOff());
        if (airWayBillNo.indexOf(search) !== -1) {
          let index = airWayBillNo.indexOf(search);
          props.history.push(
            `/tracing/${airWayBillNowithshipmentID[index].id}`
          );
        } else setInvalidSearch(true);
      });
    } else if (searchType === "productName") {
      axios
        .get(`${config().searchProduct}&productName=${searchString}`)
        .then((resp) => {
          if (resp.data.data.length > 0)
            props.history.push(`/viewproduct`, { data: resp.data.data[0] });
          else
            alert(
              `The product "${searchString}" is not found in the inventory`
            );
        })
        .catch((err) => alert(err.response.data.message));
    } else if (searchType === "productType") {
      axios
        .get(`${config().searchProduct}&productType=${searchString}`)
        .then((resp) => {
          if (resp.data.data.length > 0)
            props.history.push(`/productinventory/${searchString}`);
          else
            alert(
              `Theere are no products belonging to type: "${searchString}" in your inventory`
            );
        })
        .catch((err) => alert(err.response.data.message));
    }
    // if(orderIds.indexOf(search)!=-1)
    // props.history.push(`/vieworder/${search}`);
    // else if(shippingIds.indexOf(search)!=-1)
    // props.history.push(`/viewshipment/${search}`);
    // else if(airWayBillNo.indexOf(search)!=-1){
    //   let index = airWayBillNo.indexOf(search);
    //   props.history.push(`/viewshipment/${airWayBillNowithshipmentID[index].id}`)
    // }
    // else
    // setInvalidSearch(true);
  };

  const profile = useSelector((state) => {
    return state.user;
  });

  if (profile.photoId != null) {
    getImage(profile.photoId).then((r) => {
      const reader = new window.FileReader();
      reader.readAsDataURL(r.data);
      reader.onload = function () {
        setImage(reader.result);
      };
    });
  }

  function changeNotifications(value, num) {   
    turnOn()        
    if(num)
    setLimit(limit+num)
   axios.get(`${config().getAlerts}${value}&skip=0&limit=${limit}`).then((response)=>{
      setNewNotifs(response.data?.data?.new)
      setNotifications(response.data.data?.data?.reverse());
      if(response.data.data?.data?.length === icount)
        setHasMore(false)
      setIcount(response.data.data?.data?.length)
   })
  }

  useEffect(() => {
    dispatch(getUserInfo());
    setLimit(10);
    async function fetchApi() {
      const response = await axios.get(
        `${config().getAlerts}${alertType}&skip=0&limit=11`
      );

      setNotifications(response.data.data?.data?.reverse());
      console.log(response.data?.data)
      if(response.data?.data?.totalNew)
      setNewNotifs(response.data?.data?.totalNew)
      if(response.data?.data?.totalUnRead)
      setNewNotifs(response.data?.data?.totalUnRead)
      else
      setNewNotifs(response.data?.data?.new)
      setCount(response.data.data?.totalRecords);
      setIcount(response.data.data?.data?.length)
      const warehouses = await getActiveWareHouses();
      const active = warehouses
        .filter((i) => i.status === "ACTIVE")
        .map((item) => {
          return {
            title: item.name,
            organisationId: item.name,
            ...item,
          };
        });
      if (localStorage.getItem("location") != null) {
        setLocation((prod) => JSON.parse(localStorage.getItem("location")));
        setActiveWarehouses(active);
      } else {
        if (active.length > 0) {
          setLocation((prod) => active[0]);
          localStorage.setItem("location", JSON.stringify(active[0]));
          setActiveWarehouses(active);
        } else {
          setLocation((prod) => warehouses[0]);
          localStorage.setItem("location", JSON.stringify(warehouses[0]));
          setActiveWarehouses(warehouses);
        }
      }
    }
    fetchApi();
  }, [alertType, dispatch]);


  const handleLocation = async (item) => {
    setLocation(item);
    dispatch(setUserLocation(item));
    localStorage.setItem("location", JSON.stringify(item));
    setLocation((prod) => item);
    const body = { warehouseId: item.id };

    dispatch(turnOn());
    const result = await postUserLocation(body);
    dispatch(turnOff());
    if (result.status === 200) {
      const token = result.data.data.token;
      if (token) {
        setAuthToken(token);
        localStorage.setItem("theLedgerToken", token);
        props.history.push("/neworder");
        props.history.replace(`${props.location.pathname}`);
      }
    }
  };

  const onkeydown = (event) => {
    if (event.keyCode === 13) {
      onSeach();
    }
  };
  const imgs = config().fetchProfileImage;

  return (
    <div className="navBar">
    {/* Container */}

    <div className="navContainer">
      {/* Navbar */}

      <nav className="nav">
        {/* branding */}

        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        {/* Nav Items */}
        <MenuOutlined className="hambergerMenu" />

        <ul className="navList">
          <li className="navItems">
            {/* Search bar */}

            <div className="searchBar">
              <InputBase
                className="searchInput"
                placeholder="Search PO ID/ Shipment ID"
              />
              <Search className="navIcons" />
            </div>
          </li>
          {/* Notification Icons */}

          <li className="navItems notifyList">
              <Badge
                badgeContent={434}
                max={999}
                color="error"
                className="navIcons"
              >
                <NotificationsOutlined className="notify" />
              </Badge>
          </li>

          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            className="divider"
          />

          {/* Location */}

          <li className="navItems location" >
            <div className="navCard">
              <LocationOnOutlined className="navIcons" />
            </div>
            <div className="navCard">
              <div className="locationName">
                <h1 className="nav-heading">Location Test</h1>
                <p className="nav-subheading">Adoni, India...</p>
              </div>
            </div>
            <div className="navCard">
              <ExpandMore className="navIcons" onClick={handleClick2}/>
            </div>

            <Menu
              anchorEl={anchorEl2}
              open={open2}
              onClose={handleClose2}
              onClick={handleClose2}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem>
                <div className="profileName">
                  <h1 className="nav-heading">Location 1</h1>
                  <p className="nav-subheading">Location Address | India</p>
                </div>
              </MenuItem>
              <Divider />
              <MenuItem>
                <div className="profileName">
                  <h1 className="nav-heading">Location 1</h1>
                  <p className="nav-subheading">Location Address | India</p>
                </div>
              </MenuItem>

              <Divider />
              <MenuItem>
                <div className="profileName">
                  <h1 className="nav-heading">Location 1</h1>
                  <p className="nav-subheading">Location Address | India</p>
                </div>
              </MenuItem>

              <Divider />
              <MenuItem>
                <div className="profileName">
                  <h1 className="nav-heading">Location 1</h1>
                  <p className="nav-subheading">Location Address | India</p>
                </div>
              </MenuItem>
              <Divider />
              <MenuItem>
                <div className="profileName">
                  <h1 className="nav-heading">Location 1</h1>
                  <p className="nav-subheading">Location Address | India</p>
                </div>
              </MenuItem>
              <Divider />
              <MenuItem>
                <div className="profileName">
                  <h1 className="nav-heading">Location 1</h1>
                  <p className="nav-subheading">Location Address | India</p>
                </div>
              </MenuItem>
              <Divider />
              <MenuItem>
                <div className="profileName">
                  <h1 className="nav-heading">Location 1</h1>
                  <p className="nav-subheading">Location Address | India</p>
                </div>
              </MenuItem>
            </Menu>
          </li>

          {/* Location */}

          <li className="navItems profile">
            {/* <div className="navCard">
              <div className="profileName">
                <h1 className="nav-heading">Location Test</h1>
                <p className="nav-subheading">Adoni, India...</p>
              </div>
            </div> */}
              <IconButton
                style={{ margin: 0 }}
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
              >
                <Avatar sx={{ width: 32, height: 32 }} src={`${image}`}></Avatar>
              </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem>
                <div className="profileName">
                  <h1 className="nav-heading">{profile.name}</h1>
                  <p className="nav-subheading">{profile?.organisation?.split("/")[0]}</p>
                </div>
              </MenuItem>
              <Divider />
              <MenuItem style={{ fontSize: "13px" }}   onClick={() => props.history.push("/profile")}  >My profile</MenuItem>
              <Divider />
              <MenuItem style={{ fontSize: "13px" }} onClick={() => props.history.push("/settings")}>Settings</MenuItem>
              <Divider />
              <MenuItem style={{ fontSize: "13px" }} onClick={() => dispatch(logoutUser())}>Logout</MenuItem>
            </Menu>
          </li>
        </ul>
      </nav>
    </div>
  </div>
 
  );
};
export default Header;