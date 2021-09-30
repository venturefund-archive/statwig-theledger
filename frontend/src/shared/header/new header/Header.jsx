import React from "react";
import logo from "../assets/brands/VACCINELEDGER.png";
import "./Header.css";
import {
  Avatar,
  Badge,
  Divider,
  IconButton,
  Menu,
  InputBase,
  ListItemIcon,
  MenuItem,
  Tooltip,
} from "@mui/material";
import {
  ExpandMore,
  LocationOnOutlined,
  Logout,
  MenuOutlined,
  NotificationsOutlined,
  PersonAdd,
  Search,
  Settings,
  Storage,
} from "@mui/icons-material";

function Header() {
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
  return (
    // Header Bar
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
              <Tooltip title="Notifications">
                <Badge
                  badgeContent={434}
                  max={999}
                  color="error"
                  className="navIcons"
                >
                  <NotificationsOutlined className="notify" />
                </Badge>
              </Tooltip>
            </li>

            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              className="divider"
            />

            {/* Location */}

            <li className="navItems location">
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
                <Tooltip title="Choose Location">
                  <ExpandMore className="navIcons" onClick={handleClick2} />
                </Tooltip>
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
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
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
              <Tooltip title="Account settings">
                <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                  <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                </IconButton>
              </Tooltip>
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
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem>
                  <div className="profileName">
                    <h1 className="nav-heading">Bharat India</h1>
                    <p className="nav-subheading">Seram Inc</p>
                  </div>
                </MenuItem>
                <Divider />
                <MenuItem style={{ fontSize: "13px" }}>Warehouse</MenuItem>
                <Divider />
                <MenuItem style={{ fontSize: "13px" }}>Settings</MenuItem>
                <Divider />
                <MenuItem style={{ fontSize: "13px" }}>Logout</MenuItem>
              </Menu>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
