import React, { useState, useEffect, useRef } from "react";
import Client from "./clients/Client";
import Contact from "./contact/Contact";
import Features from "./features/Features";
import LandingFooter from "./landing-footer/Landingfooter";
import LandingHeader from "./landing-header/Landingheader";
import Services from "./services/Services";
import Showcase from "./showcase/Showcase";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const useClickOutside = (handler) => {
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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Landing(props) {
  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState("sm");
  const [urlChanged, setUrlChanged] = React.useState(false);

  const [state, setState] = React.useState({
    vertical: "top",
    horizontal: "center",
  });

  useEffect(() => {
    const currentUrl = window.location.href;

    // Check if the URL ends with "/contact"
    if (currentUrl.endsWith("/contact")) {
      // Open the contact popup
      setOpen(true);
    }
  }, [urlChanged]);

  const { vertical, horizontal } = state;

  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertDetails, setAlertDetails] = React.useState({});

  const serviceRef = useRef(null);
  const contactRef = useRef(null);
  const history = useHistory();

  const { t, i18n } = useTranslation();

  const [LanguageOpen, setLanguageOpen] = useState(false);
  const [Language, setLanguage] = useState(i18n.language);

  let domNode = useClickOutside(() => {
    setLanguageOpen(false);
  });

  const [LangOption, setLangOption] = React.useState(i18n.language);

  const changeLanguage = (option) => {
    setLangOption(option);
    setLanguage(option);
    setLanguageOpen(false);
    i18n.changeLanguage(option);
  };

  const handleAlertClick = () => {
    setOpenAlert(true);
  };

  const handleAlertClose = (event, reason) => {
    setAlertDetails({});
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handleClickOpen = () => {
    // setOpen(true);
    history.push("/contact");
    setUrlChanged((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
    history.push("/");
  };

  const handleNavClick = (option) => {
    switch (option) {
      case "service":
        serviceRef.current?.scrollIntoView({ behavaiour: "smooth" });
        break;
      case "contact":
        contactRef.current?.scrollIntoView({ behavaiour: "smooth" });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <LandingHeader
        handleNavClick={handleNavClick}
        changeLanguage={changeLanguage}
        domNode={domNode}
        LanguageOpen={LanguageOpen}
        Language={Language}
        setLanguageOpen={setLanguageOpen}
        t={t}
      />
      <Showcase handleClickOpen={handleClickOpen} t={t} />

      <Client t={t} />
      <Features t={t} />
      <Services t={t} serviceRef={serviceRef} />
      <LandingFooter t={t} contactRef={contactRef} />
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogContent sx={{ padding: "0rem !important" }}>
          <Contact
            t={t}
            handleClose={handleClose}
            handleAlertClick={handleAlertClick}
            setAlertDetails={setAlertDetails}
          />
        </DialogContent>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        key={vertical + horizontal}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alertDetails?.type}
          sx={{ width: "100%" }}
        >
          {alertDetails?.message}
        </Alert>
      </Snackbar>
    </>
  );
}
