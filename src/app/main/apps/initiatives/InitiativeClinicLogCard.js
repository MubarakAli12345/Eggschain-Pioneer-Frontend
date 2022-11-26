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
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";
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
function ClinicLogCard(props) {
  const { handleStatus, handleReload, location, ViewNotify } = props;
  const [modelStatus, setModelStatus] = useState("");
  // const [FeedBackToggler, setFeedBackToggler] = React.useState(
  //   location.state && location.state.role ? location.state.role : false
  // );
  // const userRole = React.useState(
  //   location.state && location.state.role ? location.state.role : "attendee"
  // );
  const userData = useSelector(({ auth }) => auth.user.data);
  // const [role, setRole] = React.useState(userRole);
  const classes = useStyles(props);

  const [meetingFeedback, setMeetingsFeedback] = React.useState(null);

  // function handleFeedBackToggler() {
  //   setFeedBackToggler(true);
  // }

  // function handleFeedBackClose() {
  //   setFeedBackToggler(false);
  // }
  const handleModelStatus = () => {
    setModelStatus("new");
  };
  // const openInNewTab = (trxId) => {
  //   // console.log("i am here", trxId);
  //   const url = `https://explorer.stacks.co/txid/${trxId}`;
  //   const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  //   if (newWindow) newWindow.opener = null;
  // };
  function CloseMeetingForm() {
    setModelStatus("");
  }
  useEffect(() => {
    console.log("Data", props.MeetingsData);
  }, [1]);
  //console.log("Initiative card ke props", props.MeetingsData);
  const meetingCards =
    props.MeetingsData && props.MeetingsData.length > 0 ? (
      props.MeetingsData.map((MeetingDetails) => {
        return (
          <Card
            className={clsx(
              classes.card,
              "m-16 rounded-4 cursor-pointer border-1 col-md-4"
            )}
            style={{
              display: "flex",
              flexDirection: "column",
              height: "250px",
            }}
          >
            <div className="p-16 pb-0 mr-8">
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
                    {MeetingDetails.trxDate}
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
                    {MeetingDetails.trxTime}
                  </a>

                  {/* <br />
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
                    {MeetingDetails.addedBy}
                  </a> */}
                  {/* <br /> */}
                  {/* <strong className={classes.labels}>
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
                    {MeetingDetails.status}
                  </a>
                  <img
                    style={{
                      width: "20px",
                      position: "relative",
                      top: "6px",
                      left: "5px",
                    }}
                    src={
                      MeetingDetails.status === "approved"
                        ? Approved
                        : MeetingDetails.status === "pending"
                        ? Pending
                        : Rejected
                    }
                  /> */}

                  <br />
                  <strong className={classes.labels}>
                    <a style={{ color: "#3C4252" }}>Tx Id :</a>
                  </strong>
                </span>
                <div className={classes.trxDiv}>
                  <code>{MeetingDetails.trxId}</code>
                </div>
                {/* <div className={classes.trxDiv}>
                  <code>{MeetingDetails.status}</code>
                </div> */}
              </div>
            </div>
            <div className={classes.buttonHolder}>
              <Fab
                variant="extended"
                aria-label="Delete"
                color="primary"
                className={"hoverEffect"}
                // onClick={() => {
                //   openInNewTab(MeetingDetails.trxId);
                // }}
                onClick={() => {
                  const url = `https://explorer.stacks.co/txid/${MeetingDetails.trxId}`;
                  const newWindow = window.open(
                    url,
                    "_blank",
                    "noopener,noreferrer"
                  );
                  if (newWindow) newWindow.opener = null;
                }}
                // disabled={MeetingDetails.status!=='approved'}
              >
                Block Explorer{" "}
              </Fab>

              {/* <LogModal
                ledgerId={MeetingDetails._id}
                ledgerData={MeetingDetails}
                closeModel={CloseMeetingForm}
                trxHandler={props.trxHandler}
              /> */}
            </div>
          </Card>
        );
      })
    ) : (
      <div>
        <div className={classes.imgDiv}>
          {" "}
          <img className={classes.imgHolder} src={noResult} />
        </div>
        <div className={classes.titlediv}>
          {" "}
          <Typography color="textSecondary" variant="h6">
            Click on the “ADD NEW” button to create your a Log.
          </Typography>
        </div>
      </div>
    );
  // <div className="mt-32 flex flex-1 items-center justify-center h-full"></div>
  return <Grid container>{meetingCards}</Grid>;
}
export default ClinicLogCard;
