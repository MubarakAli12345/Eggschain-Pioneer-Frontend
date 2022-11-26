import React, { useEffect, useRef, useState } from "react";
import { FusePageSimple } from "@fuse";
import Grid from "@material-ui/core/Grid";
import InitiativeCard from "./InitiativeCard";
import InitiativeHeader from "./InitiativeHeader";
import InitiativeSideBarContent from "./InitiativeSideBarContent";
import withReducer from "app/store/withReducer";
import { useDispatch, useSelector } from "react-redux";

import reducer from "./store/reducers";
import axios from "axios";

import { FuseLoading } from "@fuse";
import _ from "lodash";
import { createBrowserHistory } from "history";
import apiService from "../../../helper/apiService";
import { API_BASE_URL } from "app/main/api-config/api";
import { makeStyles } from "@material-ui/styles";
import FilterList from "./FilterList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClinicCard from "./ClinicCard";
import { Card, Typography, Avatar, Icon, Tooltip } from "@material-ui/core";
import noResult from "./noResult.png";
import {
  Button,
  Fab,
  LinearProgress,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MeetingsFeedBack from "./MeetingFeedBack";
import AttendeeMeetingsFeedBack from "./AttendeeMeetingFeedBack";
import CancelIcon from "@material-ui/icons/Cancel";
import PrivacyPolicyModal from "./PrivacyPolicyModal";
import { FcApproval, FcDisapprove, FcCancel } from "react-icons/fc";
import firebaseService from "app/services/firebaseService";
import history from "@history";
import emailjs from "@emailjs/browser";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  card: {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    width: "230px",
    height: "270px",
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
  acceptIcon: {
    fontSize: "18px",
    position: "relative",
    right: "5px",
  },
  acceptButton: {
    position: "relative",
    right: "16px",
  },

  buttonsDiv: {
    display: "flex",
    justifyContent: "right",
    position: "relative",
    right: "12px",
    bottom: "7px",
  },
  declineButton: {
    background: "#7D7D7D",
  },
  declineIcon: {
    right: "5px",
    position: "relative",
    fontSize: "19px",
  },
}));

function Initiatives(props) {
  const classes = useStyles(props);
  const { location } = props;
  const pageLayout = useRef(null);
  const [SignUser, setUser] = useState(null);
  const [LogsData, setLogssData] = useState(null);
  const [reload, setReload] = useState(true);
  const [status, setStatus] = useState("calendar");
  const [linearLoading, setLinearLoading] = useState(false);
  // const [clinicFirebaseId,setClinicFirebaseId]=useState(null);
  let clinicFirebaseId;
  let count = 0;
  let [filteredLedger, setFilteredLedgger] = useState([]);
  let [approvedFilter, setApprovedFilter] = useState([]);
  let [rejectedFilter, setRejectedFilter] = useState([]);
  let [pendingFilter, setPendingFilter] = useState([]);
  let [pendingFilterUser, setPendingFilterUser] = useState([]);
  let [approvedFilterUser, setApprovedFilterUser] = useState([]);
  let [rejectedFilterUser, setRejectedFilterUser] = useState([]);
  const [cardloader, setcardloader] = useState(false);
  const [check, setCheck] = useState(1);
  const [userCheck, setUserCheck] = useState(1);
  // const [pendingLength,setPendingLength]=useState(null);
  // const [rejectedLength,setRejectedLength]=useState(null);
  // const [approvedLength,setApprovedLength]=useState(null);
  let pendingLength;
  let rejectedLength;
  let approvedLength;
  const [searchParams, setSearchParams] = useState(
    location.state ? Object.assign(location.state) : null
  );

  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [firstLogin, setFirstLogin] = useState("");
  const userData = useSelector(({ auth }) => auth.user.data);
  //#region for setting parameters to send email
  // const service_name = "service_7hg8jfa";
  // const template_ID = "template_yhjrrkg";
  // const public_key = "2BCjIk-dvYalBXVRF";
  //#end region for setting parameters to send email
  let filterValue = "all";
  const handleReload = () => {
    setReload(!reload);
  };
  const handleStatus = (value) => {
    setStatus(value);
  };
  const handlesearchParams = (value) => {
    setSearchParams(value);
  };
  const handleSearchText = (value) => {
    setSearchText(value);
  };

  const handleTrxUpdate = async () => {
    let logs;
    setIsLoading(true);
    logs = await apiService.getApi(
      `${API_BASE_URL}ledger/${userData.firebaseId}`
    );

    setLogssData(logs);
    getFilterUserLedgers();
    setIsLoading(false);
  };
  // const sendEmail = async () => {
  //   const { clinicName } = localStorage;
  //   let drName = clinicName.toString();
  //   let drEmail = localStorage.getItem("clinicEmail");
  //   let res = await emailjs.send(
  //     service_name,
  //     template_ID,
  //     {
  //       dr_name: { drName },
  //       send_to: "mbali@cinnova.com",
  //     },
  //     public_key
  //   );
  //   console.log("Email Response", res);
  // };
  const handleLogEntry = async () => {
    // console.log("Calleds");
    let logs;
    setIsLoading(true);
    logs = await apiService.getApi(
      `${API_BASE_URL}ledger/${userData.firebaseId}`
    );
    // sendEmail();
    notify();
    logs.sort(function compare(a, b) {
      var timestampA = `${a.trxDate}` + " " + `${a.trxTime}`;
      var timestampB = `${b.trxDate}` + " " + `${b.trxTime}`;

      return moment(timestampB).diff(timestampA);
    });
    setLogssData(logs);
    getFilterUserLedgers();
  };
  const handleLogEntryClinic = async () => {
    // console.log("Called");
    let logs;
    setIsLoading(true);
    logs = await apiService.getApi(
      `${API_BASE_URL}ledger/${userData.firebaseId}`
    );
    logs.sort(function compare(a, b) {
      var timestampA = `${a.trxDate}` + " " + `${a.trxTime}`;
      var timestampB = `${b.trxDate}` + " " + `${b.trxTime}`;

      return moment(timestampB).diff(timestampA);
    });
    clinicNotify();
    setLogssData(logs);
    getPendingLedgers();
  };
  const filterLedgers = () => {};

  const clinicNotify = () => {
    toast.success("You have successfully updated the Ledger Thanks!", {
      position: "bottom-right",
    });
  };

  function ViewNotify() {
    toast.success("You have successfully viewed the details of ledger!", {
      position: "bottom-right",
    });
  }

  const notify = () => {
    // console.log("Filter", filteredLedger.status);
    if (SignUser === "user") {
      toast.success(
        "Your Ledger is Submitted and required approval from Clinic!",
        {
          position: "bottom-right",
        }
      );
    } else if (SignUser === "clinic" && filteredLedger.status === "approved") {
      toast.success("You have successfully approved a Ledger!", {
        position: "bottom-right",
      });
    } else if (SignUser === "clinic" && filteredLedger.status === "rejected") {
      toast.success("You have successfully rejected a Ledger!", {
        position: "bottom-right",
      });
    }
  };
  const handleChange = (e) => {
    setCheck(e.target.value);
    // console.log(check);
  };
  const handleChangeUser = (e) => {
    setUserCheck(e.target.value);
    // console.log("User Check", userCheck);
  };
  const getSignupUser = async () => {
    setLinearLoading(true);
    let use;
    use = await apiService.getApi(
      `${API_BASE_URL}auth/getUser/${userData.firebaseId}`
    );
    setUser(use.role);
    setFirstLogin(use.firstLogin);
    //  clinicFirebaseId=use.firebaseId
    // console.log("Sign up", clinicFirebaseId);
    setLinearLoading(false);
  };
  const filterChangeHandler = async(value) => {
    filterValue = value;
    //console.log("from the props", filterValue);
    searchLogs();
  };
  const searchLogs = async () => {
    let logs;

    setIsLoading(true);

    if (filterValue == "all") {
      logs = await apiService.getApi(
        `${API_BASE_URL}ledger/${userData.firebaseId}`
      );
    }
    if (filterValue == "today") {
      logs = await apiService.getApi(
        `${API_BASE_URL}ledger/${userData.firebaseId}/today`
      );
    }
    if (filterValue == "yestarday") {
      logs = await apiService.getApi(
        `${API_BASE_URL}ledger/${userData.firebaseId}/yestarday`
      );
    }
    if (filterValue == "this-week") {
      logs = await apiService.getApi(
        `${API_BASE_URL}ledger/${userData.firebaseId}/this-week`
      );
    }
    if (filterValue == "previous-week") {
      logs = await apiService.getApi(
        `${API_BASE_URL}ledger/${userData.firebaseId}/previous-week`
      );
    }

   
    let sortedLogs = logs.sort(function compare(a, b) {
      var timestampA = `${a.trxDate}` + " " + `${a.trxTime}`;
      var timestampB = `${b.trxDate}` + " " + `${b.trxTime}`;

      return moment(timestampB).diff(timestampA);
    });
    console.log("i am the sorted log", sortedLogs);
    await setLogssData(sortedLogs);
    setIsLoading(false);
  };
  const getPendingLedgers = async () => {
    setcardloader(true);
    let allLedgers = await apiService.getApi(
      `${API_BASE_URL}approval/getAllApprovals`
    );
    // console.log("All Ledggers", allLedgers);
    let use;
    use = await apiService.getApi(
      `${API_BASE_URL}auth/getUser/${userData.firebaseId}`
    );
    clinicFirebaseId = use.firebaseId;
    let ledgers = await apiService.getApi(
      `${API_BASE_URL}approval/getAllApprovals`
    );

    // console.log("Ledgers", ledgers);
    let filter;
    // let filteredLedgers= ledgers.filter(data=>data.clinicFirebaseId===clinicFirebaseId)
    filter = ledgers
      .filter((data) => data.clinicFirebaseId === clinicFirebaseId)
      .map((filteredPerson) => {
        return filteredPerson;
      });
    console.log("Before Sorted", filter);
    let sortedFilter = filter.sort(function compare(a, b) {
      var timestampA = `${a.trxDate}` + " " + `${a.trxTime}`;
      var timestampB = `${b.trxDate}` + " " + `${b.trxTime}`;

      return moment(timestampB).diff(timestampA);
    });
    console.log("After Sorted", sortedFilter);
    setFilteredLedgger(sortedFilter);

    let rejectedFilter = filter.sort(function compare(a, b) {
      var timestampA = `${a.trxDate}` + " " + `${a.trxTime}`;
      var timestampB = `${b.trxDate}` + " " + `${b.trxTime}`;

      return moment(timestampB).diff(timestampA);
    });
    setRejectedFilter(rejectedFilter);
    // setRejectedFilter(rejectedFilter.length)
    let pendingFilter = filter.sort(function compare(a, b) {
      var timestampA = a.trxDate + a.trxTime;
      var timestampB = b.trxDate + b.trxTime;
      var formatTimeStampA = moment(timestampA).format();
      var formatTimeStampB = moment(timestampB).format();

      return formatTimeStampA - formatTimeStampB;
    });
    setPendingFilter(pendingFilter);
    // setPendingLength(pendingFilter.length)
    let approvedFilter = filter.sort(function compare(a, b) {
      var timestampA = `${a.trxDate}` + " " + `${a.trxTime}`;
      var timestampB = `${b.trxDate}` + " " + `${b.trxTime}`;

      return moment(timestampB).diff(timestampA);
    });

    // console.log("Approved", approvedFilter);
    setApprovedFilter(approvedFilter);
    // setApprovedFilter(approvedFilter.length)
    pendingLength = pendingFilter.length;
    approvedLength = approvedFilter.length;
    rejectedLength = rejectedFilter.length;

    // console.log("Peding length", pendingLength);
    // console.log("Rejected length", rejectedLength);
    // console.log("Approved length", approvedLength);

    // console.log("Clinic Ledger", filter);
    setcardloader(false);
    setIsLoading(false);
  };
  const getFilterUserLedgers = async () => {
    // console.log("Get All user ledger called");
    let allLedgers = await apiService.getApi(
      `${API_BASE_URL}ledger/allLedgers`
    );
    // console.log("All Ledggers", allLedgers);
    let use;
    use = await apiService.getApi(
      `${API_BASE_URL}auth/getUser/${userData.firebaseId}`
    );
    clinicFirebaseId = use.firebaseId;
    // console.log("Firebase id", use.firebaseId);

    let filter;
    // let filteredLedgers= ledgers.filter(data=>data.clinicFirebaseId===clinicFirebaseId)
    filter = allLedgers
      .filter((data) => data.firebaseId === clinicFirebaseId)
      .map((filteredPerson) => {
        return filteredPerson;
      });

    let rejectedFilter = filter.filter((data) => data.status === "rejected");
    rejectedFilter.sort(function compare(a, b) {
      var timestampA = `${a.trxDate}` + " " + `${a.trxTime}`;
      var timestampB = `${b.trxDate}` + " " + `${b.trxTime}`;

      return moment(timestampB).diff(timestampA);
    });
    setRejectedFilterUser(rejectedFilter);
    // setRejectedFilter(rejectedFilter.length)
    let pendingFilter = filter.filter((data) => data.status === "pending");
    pendingFilter.sort(function compare(a, b) {
      var timestampA = `${a.trxDate}` + " " + `${a.trxTime}`;
      var timestampB = `${b.trxDate}` + " " + `${b.trxTime}`;

      return moment(timestampB).diff(timestampA);
    });
    await setPendingFilterUser(pendingFilter);
    // setPendingLength(pendingFilter.length)
    let approvedFilter = filter.filter((data) => data.status === "approved");
    // console.log("Approved Filter User", approvedFilter);

    approvedFilter.sort(function compare(a, b) {
      var timestampA = `${a.trxDate}` + " " + `${a.trxTime}`;
      var timestampB = `${b.trxDate}` + " " + `${b.trxTime}`;

      return moment(timestampB).diff(timestampA);
    });

    setApprovedFilterUser(approvedFilter);
    setIsLoading(false);
  };

  useEffect(() => {
    getSignupUser();
    getPendingLedgers();
    searchLogs();
     getFilterUserLedgers();

    const history = createBrowserHistory();

    if (history.location.state) {
      let state = {};
      delete state.openDialogue;
      history.replace({ ...history.location, state });
    }
  }, [filterValue, reload]);

  // reload
  function declineHandler() {
    localStorage.removeItem("role");
    history.push({
      pathname: "/login",
    });
    firebaseService.signOut();
  }
  async function acceptHandler() {
    let payLoad = {
      firstLogin: "false",
    };
    let logs2 = await apiService
      .putApi(
        `${API_BASE_URL}auth/updateFirstLogin/${userData.firebaseId}`,
        payLoad
      )
      .then((res) => {
        console.log("Succesfully Update First Login", res);
        getSignupUser();
      });
  }
  return (
    <>
      {linearLoading === false && firstLogin === "false" ? (
        <FusePageSimple
          classes={{
            contentWrapper: "p-0 sm:p-24 pb-80 sm:pb-80 h-full",
            content: "flex flex-col h-full",
            leftSidebar: "w-256 border-0",
            header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
          }}
          header={
            <InitiativeHeader handleSearchText={handleSearchText} {...props} />
          }
          content={
            <>
              <ToastContainer />
              {SignUser === "user" ? (
                <Grid
                  style={{ marginTop: "10px" }}
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <FilterList filterValue={filterChangeHandler} />
                  {isLoading && (
                    <div style={{ marginTop: "120px" }}>
                      <FuseLoading />
                    </div>
                  )}
                  {!isLoading &&
                    (userCheck == 1 ? (
                      <InitiativeCard
                        {...props}
                        role="attendee"
                        MeetingsData={LogsData}
                        handleStatus={handleStatus}
                        handleReload={handleReload}
                        filterValue={filterValue}
                        userCheck={userCheck}
                        rejectedFilterUser={rejectedFilterUser}
                        approvedFilterUser={approvedFilterUser}
                        pendingFilterUser={pendingFilterUser}
                        ViewNotify={ViewNotify}
                        trxHandler={handleTrxUpdate}
                      />
                    ) : userCheck == 2 ? (
                      <InitiativeCard
                        {...props}
                        role="attendee"
                        MeetingsData={pendingFilterUser}
                        handleStatus={handleStatus}
                        handleReload={handleReload}
                        filterValue={filterValue}
                        userCheck={userCheck}
                        ViewNotify={ViewNotify}
                        trxHandler={handleTrxUpdate}
                      />
                    ) : userCheck == 3 ? (
                      <InitiativeCard
                        {...props}
                        role="attendee"
                        MeetingsData={approvedFilterUser}
                        handleStatus={handleStatus}
                        handleReload={handleReload}
                        filterValue={filterValue}
                        userCheck={userCheck}
                        ViewNotify={ViewNotify}
                        trxHandler={handleTrxUpdate}
                      />
                    ) : (
                      <InitiativeCard
                        {...props}
                        role="attendee"
                        MeetingsData={rejectedFilterUser}
                        handleStatus={handleStatus}
                        handleReload={handleReload}
                        filterValue={filterValue}
                        userCheck={userCheck}
                        ViewNotify={ViewNotify}
                        trxHandler={handleTrxUpdate}
                      />
                    ))}
                </Grid>
              ) : (
                <Grid
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "row",
                  }}
                  direction="column"
                  alignItems="center"
                  justify="center"
                  container
                >
                  {cardloader && (
                    <div style={{ marginTop: "120px" }}>
                      <FuseLoading />
                    </div>
                  )}
                  {!cardloader && pendingFilter.length === 0 && check == 1 && (
                    <h1>No Pending Requests</h1>
                  )}
                  {!cardloader && rejectedFilter.length === 0 && check == 2 && (
                    <h1>No rejected request!</h1>
                  )}
                  {!cardloader && approvedFilter.length === 0 && check == 3 && (
                    <h1>No Appoval given yet!</h1>
                  )}

                  {/* {console.log("Data", filteredLedger)}
                  {console.log("Pending", pendingFilter)}
                  {console.log("Check", check)}
                  {console.log("Rejected", rejectedFilter)} */}
                  {/* {pendingFilter>0? */}

                  {check == 1
                    ? pendingFilter.map((data) => {
                        {
                          console.log("Dataaaaa", data);
                        }
                        return (
                          <>
                            {isLoading && (
                              <div style={{ marginTop: "120px" }}></div>
                            )}

                            {!isLoading && (
                              // <>
                              // {console.log("pending filter",pendingFilter)}
                              //   {data !== [] ? (
                              //     <ClinicCard
                              //       {...props}
                              //       addedBy={data.addedBy}
                              //       date={data.date}
                              //       time={data.time}
                              //       description={data.description}
                              //       status={data.status}
                              //       _id={data._id}
                              //       handleStatus={handleStatus}
                              //       handleReload={handleReload}
                              //       handleLogEntry={handleLogEntryClinic}
                              //       getPendingLedgers={getPendingLedgers}
                              //       check={check}
                              //       userId={data.userId}
                              //       data={data}
                              //       pendingLength={pendingLength}
                              //       comments={data.comments}
                              //     />
                              //   ) : (
                              //     <h1>No Pending Requests</h1>
                              //   )}
                              // </>

                              <ClinicCard
                                {...props}
                                addedBy={data.addedBy}
                                date={data.date}
                                time={data.time}
                                description={data.description}
                                status={data.status}
                                _id={data._id}
                                handleStatus={handleStatus}
                                handleReload={handleReload}
                                handleLogEntry={handleLogEntryClinic}
                                getPendingLedgers={getPendingLedgers}
                                check={check}
                                userId={data.userId}
                                data={data}
                                pendingLength={pendingLength}
                                comments={data.comments}
                                address={data.address}
                              />
                            )}
                          </>
                        );
                      })
                    : check == 2
                    ? rejectedFilter.map((data) => {
                        // console.log(data.userId);
                        return (
                          <>
                            {isLoading && (
                              <div style={{ marginTop: "120px" }}></div>
                            )}
                            {!isLoading && (
                              <ClinicCard
                                {...props}
                                addedBy={data.addedBy}
                                date={data.date}
                                time={data.time}
                                description={data.description}
                                status={data.status}
                                // data={data}
                                _id={data._id}
                                handleStatus={handleStatus}
                                handleReload={handleReload}
                                handleLogEntry={handleLogEntryClinic}
                                getPendingLedgers={getPendingLedgers}
                                check={check}
                                userId={data.userId}
                                data={data}
                                rejectedLength={rejectedLength}
                                comments={data.comments}
                                address={data.address}
                              />
                            )}
                          </>
                        );
                      })
                    : approvedFilter.map((data) => {
                        // console.log(data.userId);
                        return (
                          <>
                            {isLoading && (
                              <div style={{ marginTop: "120px" }}></div>
                            )}
                            {!isLoading && (
                              <ClinicCard
                                {...props}
                                addedBy={data.addedBy}
                                date={data.date}
                                time={data.time}
                                description={data.description}
                                status={data.status}
                                _id={data._id}
                                handleStatus={handleStatus}
                                handleReload={handleReload}
                                handleLogEntry={handleLogEntryClinic}
                                getPendingLedgers={getPendingLedgers}
                                comments={data.comments}
                                check={check}
                                userId={data.userId}
                                data={data}
                                approvedLength={approvedLength}
                                address={data.address}
                              />
                            )}
                          </>
                        );
                      })}
                </Grid>
              )}
            </>
          }
          leftSidebarContent={
            <>
              {SignUser === "user" ? (
                <>
                  <InitiativeSideBarContent
                    handleStatus={handleStatus}
                    handlesearchParams={handlesearchParams}
                    handleReload={handleReload}
                    handleEntry={handleLogEntry}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "10px",
                      padding: "10px",
                      marginLeft: "15px",
                    }}
                  >
                    <FormControl component="fieldset">
                      <FormLabel component="legendd">Status</FormLabel>
                      <RadioGroup
                        aria-label="status"
                        name="controlled-radio-buttons-groups"
                        value={userCheck}
                        onChange={handleChangeUser}
                      >
                        <FormControlLabel
                          checked={userCheck == 1}
                          value="1"
                          control={<Radio />}
                          label="All"
                        />
                        <FormControlLabel
                          checked={userCheck == 2}
                          value="2"
                          control={<Radio />}
                          label="Pending"
                        />
                        <FormControlLabel
                          color="success"
                          checked={userCheck == 3}
                          value="3"
                          control={<Radio />}
                          label="Approved"
                        />
                        <FormControlLabel
                          checked={userCheck == 4}
                          value="4"
                          control={<Radio />}
                          label="Rejected"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "41px",
                      padding: "10px",
                      marginLeft: "15px",
                    }}
                  >
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Status</FormLabel>
                      <RadioGroup
                        aria-label="status"
                        name="controlled-radio-buttons-group"
                        value={check}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          checked={check == 1}
                          value="1"
                          control={<Radio />}
                          label="Pending"
                        />
                        <FormControlLabel
                          color="success"
                          checked={check == 3}
                          value="3"
                          control={<Radio />}
                          label="Approved"
                        />
                        <FormControlLabel
                          checked={check == 2}
                          value="2"
                          control={<Radio />}
                          label="Rejected"
                        />
                      </RadioGroup>
                    </FormControl>
                    {/* <div>
   <span>Pending</span>
   <Radio 
   value="1"
   checked={check==1}
   onChange={handleChange}
   />
 </div>
 <div>
   <span>Rejected</span>
   <Radio 
   value="2"
   checked={check==2}
   onChange={handleChange}
   />
 </div>
 <div>
   <span>Approved</span>
   <Radio 
   value="3"
   checked={check==3}
   onChange={handleChange}
   />
 </div> */}
                  </div>
                </>
              )}
            </>
          }
          sidebarInner
          ref={pageLayout}
          innerScroll
        />
      ) : linearLoading === false && firstLogin ? (
        <>
          {console.log("First login of user")}
          <Dialog
            open={userData.firstLogin ? true : false}
            maxWidth="lg"
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              <div
                className="flex justify-center h-48"
                style={{
                  color: "rgba(0, 0, 0, 0.87)",
                  position: "relative",
                  top: "8px",
                  fontWeight: "900",
                }}
              >
                {/* <div className="flex items-center">
                  Terms of use and Privacy Policy
                </div> */}
                Terms of use and Privacy Policy
                {/* <div className="flex items-center justify-end">
                  <CancelIcon
                    style={{ cursor: "pointer", color: "red" }}
                    // onClick={CloseMeetingForm}
                  />
                </div> */}
              </div>
            </DialogTitle>
            <DialogContent
              style={{
                width: "800px",
                height: "800px",
                borderLeft: "1px solid",
                color: "black",
                marginLeft: "15px",
                borderRight: "1px solid",
                color: "black",
                marginRight: "15px",
                borderTop: "1px solid",
                color: "black",
                borderBottom: "1px solid",
                color: "black",
                marginBottom: "15px",
                backgroundColor: "rgb(190, 184, 184)",
              }}
            >
              <DialogContentText>
                <PrivacyPolicyModal getSignupUser={getSignupUser} />
                {/* <MeetingsFeedBack
                  handleReload={handleReload}
                  handleStatus={handleStatus}
                  // handleFeedBackClose={handleFeedBackClose}
                /> */}
                {/* <ClinicModal
                  comments={props.comments}
                  userId={props.userId}
                  time={props.time}
                  date={props.date}
                  description={props.description}
                  status={props.status}
                  addedBy={props.addedBy}
                  _id={props._id}
                  closeModel={CloseMeetingForm}
                /> */}
                {/* <LedgerDetailModal
                  ViewNotify={ViewNotify}
                  MeetingsData={props.MeetingsData}
                /> */}
              </DialogContentText>
            </DialogContent>
            <div className={classes.buttonsDiv}>
              <Fab
                variant="extended"
                aria-label="Delete"
                color="primary"
                className={classes.acceptButton}
                onClick={acceptHandler}
                // className={classes.button}
                // onClick={approveHandle}
                // disabled={btndisabler}
              >
                {/* {approveloader == true ? (
                          <CircularProgress size={19} color="#00fe9b" />
                        ) : (
                          <p>Approve</p>
                        )} */}
                <FcApproval className={classes.acceptIcon} />
                Accept
              </Fab>
              <Fab
                variant="extended"
                aria-label="Delete"
                className={classes.declineButton}
                onClick={declineHandler}
                // className={classes.button}
                // onClick={approveHandle}
                // disabled={btndisabler}
              >
                {/* {approveloader == true ? (
                          <CircularProgress size={19} color="#00fe9b" />
                        ) : (
                          <p>Approve</p>
                        )} */}
                <FcCancel className={classes.declineIcon} />
                Decline
              </Fab>
            </div>
          </Dialog>
        </>
      ) : (
        <LinearProgress />
      )}
    </>
  );
}
export default withReducer("Initiatives", reducer)(Initiatives);
