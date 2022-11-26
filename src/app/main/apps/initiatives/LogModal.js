import React, { useState, useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import LedgerDetailModal from "./LedgerDetailModal";
import { API_BASE_URL } from "app/main/api-config/api";
import apiService from "../../../helper/apiService";
import CancelIcon from "@material-ui/icons/Cancel";
function LogModal(props) {
  // console.log("LOG MODEL PROPS", props);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const [modelStatus, setModelStatus] = useState("");
  let Filter;
  const handleModelStatus = () => {
    setModelStatus("new");
  };
  function CloseMeetingForm() {
    setModelStatus("");
  }
  const openInNewTab = (trxId) => {
    //  console.log("i am here", trxId);
    const url = `https://explorer.stacks.co/txid/${trxId}`;
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const modelClose = () => {};
  return (
    <>
      {console.log("Latitude is :", lat)}
      {props.ledgerData.trxId.length > 2 ? (
        <Fab
          aria-label="Delete"
          variant="contained"
          color="primary"
          className={"hoverEffect"}
          onClick={() => {
            openInNewTab(props.ledgerData.trxId);
          }}
        >
          Block Explorer
        </Fab>
      ) : (
        <>
          {" "}
          <Fab
            variant="extended"
            aria-label="Delete"
            color="primary"
            className={"hoverEffect"}
            onClick={handleModelStatus}
          >
            Details{" "}
          </Fab>
        </>
      )}

      {modelStatus === "new" ? (
        <Dialog
          open={modelStatus === "new" ? true : false}
          maxWidth="lg"
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            <div className="flex justify-between h-48">
              <div className="flex items-center">Logs Data</div>

              <div className="flex items-center justify-end">
                <CancelIcon
                  style={{ cursor: "pointer", color: "red" }}
                  onClick={CloseMeetingForm}
                />
              </div>
            </div>
          </DialogTitle>
          <DialogContent style={{ width: "600px", height: "800px" }}>
            <DialogContentText>
              {/* <MeetingFeedBack handleReload={props.handleReload} handleStatus = {props.handleStatus} CloseMeetingForm = {CloseMeetingForm} handleEntry={props.handleEntry}/> */}
              {/* <ClinicModal   comments={props.comments}   userId={props.userId}  time={props.time} date={props.date} description={props.description} status={props.status} addedBy={props.addedBy} _id={props._id} closeModel={CloseMeetingForm}/> */}
              <LedgerDetailModal
                ledgerId={props.ledgerId}
                ledgerData={props.ledgerData}
                closeModel={setModelStatus}
                trxHandler={props.trxHandler}
              />
            </DialogContentText>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  );
}
export default LogModal;
