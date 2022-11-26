import {
  Card,
  Typography,
  Avatar,
  Icon,
  Tooltip,
  Button,
} from "@material-ui/core";
import noResult from "./noResult.png";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Fab from "@material-ui/core/Fab";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CancelIcon from "@material-ui/icons/Cancel";
import ClinicModal from "./ClinicEditModal";
import Approved from "../../../../images/approved.PNG";
import Pending from "../../../../images/pending.PNG";
import Rejected from "../../../../images/rejected.PNG";
const useStyles = makeStyles((theme) => ({
  card: {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    width: "230px",
    height: "270px",
    display: "flex",
    flexDirection: "column",
  },
  labels: {
    padding: "12px",
  },
  cardContent: {
    textAlign: "center",
  },
  trxDiv: {
    maxWidth: "200px",
    overflowWrap: "break-word",
    textAlign: "center",
  },
  buttonHolder: {
    position: "relative",
    top: "10px",
    textAlign: "center",
  },
  imgHolder: {
    width: "300px",
    position: "absolute",
    left: "27%",
    top: "27%",
  },
  imgDiv: {},
  titlediv: {
    textAlign: "center",
  },
}));
function ClinicCard(props) {
  const {
    handleStatus,
    handleReload,
    location,
    handleLogEntry,
    getPendingLedgers,
    check,
  } = props;
  const [FeedBackToggler, setFeedBackToggler] = React.useState(
    location.state && location.state.role ? location.state.role : false
  );
  {
    // console.log("Props", props);
  }
  const classes = useStyles(props);
  const [modelStatus, setModelStatus] = useState("");

  const handleModelStatus = () => {
    setModelStatus("new");
  };
  function CloseMeetingForm() {
    setModelStatus("");
  }
  function handleFeedBackClose() {
    setFeedBackToggler(false);
  }
  return (
    <>
      {/* {console.log("Condition", props.pendingFilter)}
      {console.log("Condition2", props.rejectedFilter)} */}
      {console.log("Props", props)}

      <div className="row">
        <div className="col-4">
          <Card
            className={clsx(
              classes.card,
              "m-16 rounded-4 cursor-pointer border-1 col-md-4"
            )}
            style={{
              display: "flex",
              flexDirection: "column",
              height: "226px",
            }}
          >
            {/* {props.check==1 && props.pending>0 || props.check==2 && props.rejectedFilter>0 || props.approvedFilter>0? */}
            <div className="p-16 pb-0 col-md-4">
              <div className="flex flex-wrap mb-8"></div>
              <div className="flex flex-wrap mb-8">
                <span className={classes.cardContent}>
                  <strong className={classes.labels}>
                    <a style={{ color: "#3C4252" }}> Added on :</a>
                  </strong>
                  <a
                    style={{
                      fontSize: "13px",
                      color: "black",
                      position: "relative",
                      right: "4px",
                    }}
                  >
                    {props.date}
                  </a>
                  <br />
                  <strong className={classes.labels}>
                    <a style={{ color: "#3C4252" }}>Log time:</a>
                  </strong>
                  <a
                    style={{
                      fontSize: "13px",
                      color: "black",
                      position: "relative",
                      right: "4px",
                    }}
                  >
                    {props.time}
                  </a>

                  <br />
                  <strong className={classes.labels}>
                    <a style={{ color: "#3C4252" }}> Added by :</a>
                  </strong>
                  <a
                    style={{
                      fontSize: "13px",
                      color: "black",
                      position: "relative",
                      right: "4px",
                    }}
                  >
                    {props.addedBy}
                  </a>
                  <br />
                  <strong className={classes.labels}>
                    <a style={{ color: "#3C4252" }}>Status :</a>
                  </strong>

                  <a
                    style={{
                      fontSize: "13px",
                      color: "black",
                      position: "relative",
                      right: "4px",
                    }}
                  >
                    {props.status}
                  </a>
                  <img
                    style={{
                      width: "20px",
                      position: "relative",
                      top: "6px",
                      left: "5px",
                    }}
                    src={
                      props.status === "approved"
                        ? Approved
                        : props.status === "pending"
                        ? Pending
                        : Rejected
                    }
                  />

                  <br />
                  {/* <strong className={classes.labels}>
            <a style={{ color: "#3C4252" }}>Tx Id :</a>
          </strong>
          <a
            style={{
              fontSize: "13px",
              color: "black",
              position: "relative",
              right: "4px",
            }}
          >
             {MeetingDetails.trxId} 
          </a> */}
                </span>
                {/* <div className={classes.trxDiv}>
          <code>{MeetingDetails.status}</code>
        </div> */}
              </div>
            </div>
            {/* :
    (
    <div>
    <div className={classes.imgDiv}>
      {" "}
      <img className={classes.imgHolder} src={noResult} />
    </div>
    <div className={classes.titlediv}>   <Typography color="textSecondary" variant="h6">
     Click on the “ADD NEW” button to create your a Log.
    </Typography></div>
 
  </div>
    )
    } */}

            <div className={classes.buttonHolder}>
              {check == 1 ? (
                <Fab
                  variant="extended"
                  aria-label="Delete"
                  color="primary"
                  className={"hoverEffect"}
                  onClick={handleModelStatus}
                >
                  Review {"   "}
                </Fab>
              ) : (
                <Fab
                  variant="extended"
                  aria-label="Delete"
                  color="primary"
                  className={"hoverEffect"}
                  onClick={handleModelStatus}
                >
                  Details {"   "}
                </Fab>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* {console.log(modelStatus)} */}
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
              <ClinicModal
                comments={props.comments}
                userId={props.userId}
                check={check}
                getPendingLedgers={getPendingLedgers}
                handleLogEntry={handleLogEntry}
                time={props.time}
                date={props.date}
                description={props.description}
                status={props.status}
                addedBy={props.addedBy}
                _id={props._id}
                address={props.address}
                closeModel={CloseMeetingForm}
              />
            </DialogContentText>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  );
}
export default ClinicCard;
