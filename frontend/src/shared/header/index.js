import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import bellIcon from "../../assets/icons/notification_blue.png";
import dropdownIcon from "../../assets/icons/dropdown_selected.png";
import Location from "../../assets/icons/location_blue.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useHistory } from "react-router-dom";
import "./Header.css";
import { CircularProgress, Divider } from "@mui/material";
import { MenuOutlined } from "@mui/icons-material";
import {
  getActiveWareHouses,
  getUserInfo,
  logoutUser,
  setUserLocation,
  postUserLocation,
} from "../../actions/userActions";
import logo from "../../assets/brands/VACCINELEDGER.png";
import { turnOff, turnOn } from "../../actions/spinnerActions";
import useOnclickOutside from "react-cool-onclickoutside";
import { config } from "../../config";
import {
  getShippingOrderIds,
  fetchAllairwayBillNumber,
} from "../../actions/shippingOrderAction";
import { getImage } from "../../actions/notificationActions";
import { getOrderIds } from "../../actions/poActions";
import DropdownButton from "../../shared/dropdownButtonGroup";
import setAuthToken from "../../utils/setAuthToken";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import userIcon from "../../assets/icons/brand.png";
import inventoryIcon from "../../assets/icons/inventorynew.png";
import shipmentIcon from "../../assets/icons/TotalShipmentsCompleted.png";
import alertIcon from "../../assets/icons/alert.png";
import orderIcon from "../../assets/icons/Orders.png";
import { formatDistanceToNow } from "date-fns";
import { useTranslation } from "react-i18next";
import EnglishFlag from "../../assets/files/images/flags/English.webp";
import SpanishFlag from "../../assets/files/images/flags/Spanish.webp";
import SearchIcon from "@mui/icons-material/Search";

let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};

const Header = (props) => {
  const { t } = props;
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [openModal, setOpenModal] = useState(false);
  const [AlertModalData, setAlertModalData] = useState({});
  const [location, setLocation] = useState({});
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
  const [icount, setIcount] = useState(0);
  const [visible, setVisible] = useState("one");
  const [limit, setLimit] = useState(10);
  const [newNotifs, setNewNotifs] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [ProfileClickBtn, setProfileClickBtn] = useState(false);

  const domNode = useClickOutside(() => {
    setProfileClickBtn(false);
  });

  const ref1 = useRef(null);
  useOnclickOutside(
    (ref) => {
      if (
        ref.target.className !== "ignore-react-onclickoutside" &&
        ref.target.className !== "badge badge-light"
      )
        setShowNotifications(false);
    },
    { refs: [ref1] }
  );

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
  async function readNotification(id) {
    await axios.get(`${config().readNotification}${id}`);
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

  const onSeach = async (searchValue) => {
    if (search.substring(0, 2) === "SH") {
      getAllShipmentIDs().then((result) => {
        let shippingIds = result.map((so) => so.id);
        if (shippingIds.indexOf(search) !== -1) {
          props.history.push(`/viewshipment/${search}`);
        } else setInvalidSearch(true);
      });
    } else if (search.substring(0, 2) === "PO") {
      console.log("po");
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
          props.history.push(`/track/${airWayBillNowithshipmentID[index].id}`);
        } else setInvalidSearch(true);
      });
    } else if (searchType === "productName") {
      // const response = await axios.get(`${config().searchProduct}&productName=${searchString}`);
      axios
        .get(`${config().searchProduct}&productName=${searchValue}`)
        .then((resp) => {
          if (resp.data.data.length > 0)
            props.history.push(`/viewproduct`, { data: resp.data.data });
          else
            alert(
              `${t("the_product")} "${searchValue}" ${t(
                "not_found_in_inventory"
              )}`
            );
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    } else if (searchType === "productType") {
      axios
        .get(`${config().searchProduct}&productType=${searchValue}`)
        .then((resp) => {
          if (resp.data.data.length > 0)
            props.history.push(`/productinventory/${searchValue}`);
          else
            alert(
              `${t("there_no_products_type")} "${searchValue}" ${t(
                "in_your_inventory"
              )}`
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
  useEffect(() => {
    if (profile?.photoId) {
      getImage(profile?.photoId).then((result) => {
        setImage(result?.data);
      });
    }
  }, [profile]);

  function changeNotifications(value, num) {
    turnOn();
    if (num) setLimit(limit + num);
    axios
      .get(`${config().getAlerts}${value}&skip=0&limit=${limit}`)
      .then((response) => {
        setNewNotifs(response.data?.data?.new);
        setNotifications(response.data.data?.data?.reverse());
        if (response.data.data?.data?.length === icount) setHasMore(false);
        setIcount(response.data.data?.data?.length);
      });
  }

  useEffect(() => {
    dispatch(getUserInfo());
    setLimit(10);
    async function fetchApi() {
      const response = await axios.get(
        `${config().getAlerts}${alertType}&skip=0&limit=11`
      );

      setNotifications(response.data.data?.data?.reverse());
      if (response.data?.data?.totalNew)
        setNewNotifs(response.data?.data?.totalNew);
      if (response.data?.data?.totalUnRead)
        setNewNotifs(response.data?.data?.totalUnRead);
      else setNewNotifs(response.data?.data?.new);
      setIcount(response.data.data?.data?.length);
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
      if (
        localStorage.getItem("location") &&
        localStorage.getItem("location") !== "undefined"
      ) {
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

  const search_placeholder =
    t("search") + " " + t("po_id") + "/" + t("shipment_id");

  // const [value, setValue] = useState(null);
  const onSearchChange = async (e) => {
    const response = await axios.get(
      `${config().getSuggestions}?searchString=${e}`
    );
    // console.log(response, "response from search API");
    setOptions([...response.data.data]);
    // setValue(e);
    // setSearchString(e);
  };

  useEffect(() => {
    setSearchType(options[0]?.type);
  }, [options]);

  const defaultProps = {
    options,
    getOptionLabel: (option) => {
      if (option._id === undefined) {
        return option;
      }
      return option._id;
    },
  };

  // const searchPermissions = props.user?.permissions?.search;

  // const [allowSearch, setAllowSearch] = useState(false);

  // useEffect(() => {
  //   if (searchPermissions) {
  //     for (const property in searchPermissions) {
  //       if (searchPermissions[property]) {
  //         setAllowSearch(true);
  //         break;
  //       }
  //     }
  //   }
  // }, [searchPermissions]);

  const allowSearch = props.user?.type !== "Third Party Logistics";

  const handleUiSwitch = () => {
    // Check whether user has enough rights
    if (
      profile.type === "CENTRAL_AUTHORITY" ||
      profile.role === "GoverningBody"
    ) {
      history.push("/statwig/dashboard");
    } else if (profile.role === "admin") {
      history.push("/org/dashboard");
    }
  };

  const [LangOption, setLangOption] = React.useState(i18n.language);

  const changeLanguage = (option) => {
    setLangOption(option);
    i18n.changeLanguage(option);
    setProfileClickBtn(false);
  };

  return (
    <div className="navBar">
      {/* Container */}

      <div className="navContainer">
        {/* Navbar */}

        <nav className="navContent">
          {/* branding */}
          <Link to="/overview">
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
          </Link>

          {/* Nav Items */}
          <MenuOutlined className="hambergerMenu" />

          <ul className="navList">
            {allowSearch && (
              <li className="navItems">
                <div
                  className="search-form"
                  tabIndex="-1"
                  onKeyDown={onkeydown}
                >
                  <Autocomplete
                    {...defaultProps}
                    id="controlled-demo"
                    // value={searchString}
                    // disableClearable
                    popupIcon={<SearchIcon />}
                    // placeholder={search_placeholder}
                    // onFocus={(e) => (e.target.placeholder = "")}
                    // onBlur={(e) =>
                    //   (e.target.placeholder = { search_placeholder })
                    // }
                    onInputChange={(event, newInputValue) => {
                      setSearch(newInputValue);
                      onSearchChange(newInputValue);
                    }}
                    onChange={(event, newValue) => {
                      setSearchString(newValue._id);
                      onSeach(newValue._id);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder={search_placeholder}
                        sx={{ width: "7rem" }}
                        margin="normal"
                        variant="outlined"
                      />
                    )}
                  />
                </div>
              </li>
            )}
            {/* Notification Icons */}

            {(profile?.role === "admin" ||
              profile?.type === "CENTRAL_AUTHORITY" ||
              profile?.role === "GoverningBody") && (
              <li className="admin-nav-item configure-link user-switch-btn">
                <div className="switch-button">
                  <p className="vl-note">{t("user")}</p>
                  <i className="fa-solid fa-caret-down"></i>
                </div>
                <div className={`configure-list width-change active `}>
                  <button
                    onClick={handleUiSwitch}
                    className="vl-btn vl-btn-sm vl-btn-full vl-btn-primary"
                  >
                    {t("switch_to_admin")}
                  </button>
                </div>
              </li>
            )}

            <li className="navItems notifyList">
              <div className="notifications cursorP">
                <img
                  width="20px"
                  height="20px"
                  id="notification"
                  className="ignore-react-onclickoutside"
                  src={bellIcon}
                  onClick={() => setShowNotifications(!showNotifications)}
                  alt="notification"
                />
                <div
                  id="notification"
                  className="bellicon-wrap"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  {notifications?.length && (
                    <span className="badge badge-light">{newNotifs}</span>
                  )}
                </div>
                {showNotifications && <div className="triangle-up"></div>}
                {showNotifications && (
                  <div
                    ref={ref1}
                    outsideClickIgnoreClass={"ignore-react-onclickoutside"}
                    className="slider-menu"
                    id="scrollableDiv"
                  >
                    <div
                      className="nheader"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #0092e8, #0a6bc6)",
                      }}
                    >
                      <div className="user-notification-head">
                        {t("user_notification")}
                      </div>
                      {notifications?.length >= 0 && (
                        <span
                          style={{
                            position: "relative",
                            left: "40px",
                            backgroundColor: "#fa7a23",
                            padding: "6px",
                            color: "white",
                            borderRadius: "8px",
                            fontSize: "14px",
                          }}
                        >
                          {newNotifs} {t("new")}
                        </span>
                      )}

                      <div className="noti-tab">
                        <ul className="nav nav-pills">
                          <li
                            className={
                              visible === "one" ? "nav-item-active" : "nav-item"
                            }
                            onClick={() => {
                              setLimit(10);
                              setAlertType("ALERT");
                              changeNotifications("ALERT", 1);
                              setVisible("one");
                              setHasMore(true);
                              ref1.current.scrollTop = 0;
                            }}
                          >
                            <div
                              className={
                                visible === "one"
                                  ? "nav-link"
                                  : "nav-link tab-text"
                              }
                            >
                              {t("alerts")}
                            </div>
                          </li>
                          <li
                            className={
                              visible === "two"
                                ? "nav-item-active "
                                : "nav-item"
                            }
                            onClick={() => {
                              setLimit(10);
                              setAlertType("TRANSACTION");
                              changeNotifications("TRANSACTION", 1);
                              setVisible("two");
                              setHasMore(true);
                              ref1.current.scrollTop = 0;
                            }}
                          >
                            <div
                              className={
                                visible === "two"
                                  ? "nav-link"
                                  : "nav-link tab-text"
                              }
                            >
                              {t("transactions")}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="slider-item">
                      <InfiniteScroll
                        dataLength={notifications?.length || 0}
                        next={() => changeNotifications(alertType, 10)}
                        style={{
                          display: "flex",
                          flexDirection: "column-reverse",
                        }} //To put endMessage and loader to the top.
                        hasMore={hasMore}
                        // loader={
                        //   <h4>
                        //     <Spinner />
                        //   </h4>
                        // }
                        scrollThreshold={1}
                        scrollableTarget="scrollableDiv"
                      >
                        {notifications?.length >= 0 ? (
                          notifications?.map((notifications) =>
                            notifications.transactionId ? (
                              notifications.eventType !== "REQUEST" ? (
                                <Link
                                  key={notifications.id}
                                  to={notifRouting(notifications)}
                                  // style={{ textDecoration: "none" }}
                                  className={
                                    notifications.isRead ? "read" : "unRead"
                                  }
                                  style={{ textDecoration: "none" }}
                                  onClick={() =>
                                    readNotification(notifications.id)
                                  }
                                >
                                  <div
                                    className="col-sm-10"
                                    style={{ display: "flex" }}
                                  >
                                    <img
                                      className="notification-icons"
                                      src={notifIcon(notifications)}
                                      alt="Icon"
                                    />
                                    <div className="notification-events">
                                      {notifications.message}
                                    </div>
                                  </div>
                                  <div className="text-secondary notif-time">
                                    {formatDistanceToNow(
                                      new Date(
                                        parseInt(
                                          notifications._id
                                            .toString()
                                            .substr(0, 8),
                                          16
                                        ) * 1000
                                      )
                                    )}
                                  </div>
                                  <img
                                    className="toggle-icon"
                                    alt="Drop Down Icon"
                                    src={dropdownIcon}
                                  ></img>
                                </Link>
                              ) : (
                                <Link>
                                  <div
                                    className={
                                      notifications.isRead ? "read" : "unRead"
                                    }
                                    onClick={() => {
                                      setAlertModalData(notifications);
                                      setOpenModal(true);
                                    }}
                                  >
                                    <div
                                      className="col-sm-10"
                                      style={{ display: "flex" }}
                                    >
                                      <img
                                        className="notification-icons"
                                        src={notifIcon(notifications)}
                                        alt="Icon"
                                      />
                                      <div className="notification-events">
                                        {notifications.message}
                                      </div>
                                    </div>
                                    <div className="text-secondary notif-time">
                                      {formatDistanceToNow(
                                        new Date(
                                          parseInt(
                                            notifications._id
                                              .toString()
                                              .substr(0, 8),
                                            16
                                          ) * 1000
                                        )
                                      )}{" "}
                                      {t("ago")}
                                    </div>
                                    <img
                                      className="toggle-icon"
                                      alt="Drop Down Icon"
                                      src={dropdownIcon}
                                    ></img>
                                  </div>
                                  <div className="text-secondary notif-time">
                                    {formatDistanceToNow(
                                      new Date(
                                        parseInt(
                                          notifications._id
                                            .toString()
                                            .substr(0, 8),
                                          16
                                        ) * 1000
                                      )
                                    )}{" "}
                                    {t("ago")}
                                  </div>
                                  <img
                                    className="toggle-icon"
                                    alt="Drop Down Icon"
                                    src={dropdownIcon}
                                  ></img>
                                </Link>
                              )
                            ) : (
                              <div
                                key={notifications.id}
                                style={{ cursor: "not-allowed" }}
                              >
                                <div
                                  className="col-sm-10"
                                  style={{ display: "flex" }}
                                >
                                  <img
                                    className="notification-icons"
                                    src={notifIcon(notifications)}
                                    alt="Icon"
                                  />
                                  <div className="notification-events">
                                    {notifications.message}
                                  </div>
                                </div>
                                <div className="text-secondary notif-time">
                                  {formatDistanceToNow(
                                    new Date(
                                      parseInt(
                                        notifications._id
                                          .toString()
                                          .substr(0, 8),
                                        16
                                      ) * 1000
                                    )
                                  )}
                                </div>
                              </div>
                            )
                          )
                        ) : (
                          <div
                            className="slider-item-no-notify"
                            style={{ overflow: "hidden" }}
                          >
                            <div
                              className="row"
                              style={{ margin: "0 !important" }}
                            >
                              <div className="col text-center mt-3 mr-5">
                                <div style={{ overflow: "hidden !important" }}>
                                  <span className="no-notification">
                                    {t("no_notifications")}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </InfiniteScroll>
                    </div>
                  </div>
                )}
              </div>
            </li>
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              className="divider"
            />
            {/* Location */}
            <li className="navItems location">
              <img className="locationimg" src={Location} alt="Location" />
              <div className="navCard navlocation">
                <DropdownButton
                  name={(
                    location?.title +
                    "|" +
                    location?.warehouseAddress?.city +
                    "," +
                    location?.warehouseAddress?.country
                  )
                    .substr(0, 30)
                    .concat("...")}
                  arrowImg={dropdownIcon}
                  onSelect={(item) => {
                    handleLocation(item);
                  }}
                  groups={activeWarehouses}
                />
              </div>
            </li>

            {/* Location */}

            {/* <li className="navItems">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
              >
                <Avatar
                  sx={{
                    width: 42,
                    height: 42,
                    outline: "5px solid #ddd",
                    outlineOffset: "1px",
                  }}
                  src={image}
                ></Avatar>
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
                    <h1 className="nav-heading">{profile?.firstName}</h1>
                    <p className="nav-subheading">
                      {profile?.organisation?.split("/")[0]}
                    </p>
                  </div>
                </MenuItem>
                <Divider />
                <MenuItem
                  style={{ fontSize: "13px" }}
                  onClick={() => props.history.push("/profile")}
                >
                  {t("my_profile")}
                </MenuItem>
                <Divider />
                <MenuItem
                  style={{ fontSize: "13px" }}
                  onClick={() => props.history.push("/settings")}
                >
                  {t("settings")}
                </MenuItem>
                <Divider />
                {LangOption === "en" ? (
                  <MenuItem
                    style={{ fontSize: "13px" }}
                    onClick={() => {
                      changeLanguage("es");
                    }}
                  >
                    Change to Spanish
                  </MenuItem>
                ) : (
                  <MenuItem
                    style={{ fontSize: "13px" }}
                    onClick={() => {
                      changeLanguage("en");
                    }}
                  >
                    {t("change_to_english")}
                  </MenuItem>
                )}

                <Divider />
                <MenuItem
                  style={{ fontSize: "13px" }}
                  onClick={() => dispatch(logoutUser())}
                >
                  {t("logout")}
                </MenuItem>
              </Menu>
            </li> */}

            <li className="navItems">
              <div className="header__profile_menu" ref={domNode}>
                <div
                  className="header__profile_icon_btn"
                  onClick={() => setProfileClickBtn(!ProfileClickBtn)}
                >
                  {image ? (
                    <>
                      <div className="green__active_sm"></div>
                      <img src={image} alt="Profile" />
                    </>
                  ) : (
                    <CircularProgress className="progress__bar" />
                  )}
                </div>
                <div
                  className={`header__profile_dropdown ${
                    ProfileClickBtn && "active"
                  }`}
                >
                  <div className="header__profile_top">
                    <div className="header__inner_profile_icon">
                      <div className="green__active"></div>
                      <img src={image} alt="Profile" />
                    </div>
                    <div className="header__inner_profile_content">
                      <h1 className="vl-name-header f-500 profile__black">
                        {profile?.firstName}{" "}
                        {profile?.lastName && profile?.lastName}
                      </h1>
                      <p className="vl-note f-400 vl-grey-sm">
                        {" "}
                        {profile?.organisation?.split("/")[0]}
                      </p>
                    </div>
                  </div>
                  <div className="header__profile_middle">
                    <div
                      className="header__link__card"
                      onClick={() => props.history.push("/profile")}
                    >
                      <i className="fa-solid fa-user"></i>
                      <p className="vl-body f-400">{t("my_profiles")}</p>
                    </div>
                    <div
                      className="header__link__card"
                      onClick={() => props.history.push("/rewards")}
                    >
                      <i className="fa-solid fa-trophy"></i>
                      <p className="vl-body f-400">My Rewards</p>
                    </div>
                    <div
                      className="header__link__card"
                      onClick={() => props.history.push("/settings")}
                    >
                      <i className="fa-solid fa-gear"></i>
                      <p className="vl-body f-400">{t("account_setting")}</p>
                    </div>
                    <div
                      className="header__link__card"
                      onClick={() => {
                        if (LangOption === "en") {
                          changeLanguage("es");
                        } else {
                          changeLanguage("en");
                        }
                      }}
                    >
                      <i className="fa-solid fa-earth-americas"></i>
                      <div className="langugae__option">
                        <p className="vl-body f-400">{t("switch_lang")}</p>
                        <div className="lang__logo">
                          <p className="vl-small f-400">
                            {LangOption === "en" ? "SPA" : "ENG"}
                          </p>
                          <img
                            src={
                              LangOption === "en" ? SpanishFlag : EnglishFlag
                            }
                            className="lang__flag"
                            alt="flag"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="header__profile_bottom">
                    <div
                      className="header__link__card"
                      onClick={() => dispatch(logoutUser())}
                    >
                      <i className="fa-solid fa-arrow-right-from-bracket"></i>
                      <p className="vl-body f-400">{t("sign_out")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Header;
