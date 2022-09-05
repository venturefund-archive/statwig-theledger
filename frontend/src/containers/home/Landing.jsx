import React from "react";
import Client from "../../components/landingpage/clients/Client";
import Contact from "../../components/landingpage/contact/Contact";
import Features from "../../components/landingpage/features/Features";
import Landingfooter from "../../components/landingpage/landing-footer/Landingfooter";
import Landingheader from "../../components/landingpage/landing-header/Landingheader";
import Services from "../../components/landingpage/services/Services";
import Showcase from "../../components/landingpage/showcase/Showcase";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

export default function Landing() {
  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState("sm");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Landingheader />
      <Showcase handleClickOpen={handleClickOpen} />
      <Client />
      <Features />
      <Services />
      <Landingfooter />
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogContent sx={{ padding: "0rem !important" }}>
          <Contact handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
