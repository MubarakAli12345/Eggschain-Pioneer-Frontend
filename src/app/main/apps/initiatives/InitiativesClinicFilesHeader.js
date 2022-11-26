import { FuseAnimate } from "@fuse";
import { Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    bottom: "18px",
    right: "14px",
    width: "104%",
  },
}));
export default function InitiativesClinicFilesHeader() {
  const classes = useStyles();
  return (
    <div className="flex flex-1 items-center justify-between p-8 sm:p-24">
      <div className="flex flex-1 items-center justify-between ">
        <div className="flex justify-start">
          <FuseAnimate animation="transition.slideLeftIn" delay={300}>
            <Typography variant="h6" className="hidden sm:flex mt-8">
              My Files
            </Typography>
          </FuseAnimate>
        </div>
      </div>
    </div>
  );
}
