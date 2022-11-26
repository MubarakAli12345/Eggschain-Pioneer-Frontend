import { FuseLoading, FusePageSimple } from "@fuse";
import React, { useEffect, useRef, useState } from "react";
import InitiativeHeader from "./InitiativeHeader";
import InitiativesClinicLogHeader from "./InitiativesClinicLogHeader";
import "./InitiativesClinicLog.css";
import InitiativeSideBarContent from "./InitiativeSideBarContent";
import InitiativeClinicLogSideBarContent from "./InitiativesClinicLogSidebarContent";
import apiService from "../../../helper/apiService";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "app/main/api-config/api";
import ClinicLogCard from "./InitiativeClinicLogCard";
import { ToastContainer, toast } from "react-toastify";
import FilterListClinic from "./FilterListClinic";
import Grid from "@material-ui/core/Grid";
import FilterList from "./FilterList";

function InitiativesClinicLog() {
  const [logsData, setLogsData] = useState("");
  const userData = useSelector(({ auth }) => auth.user.data);
  const pageLayout = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  let filterValue = "all";

  useEffect(() => {
    handleLogEntry();
    return () => {
      console.log("Component is Removed");
    };
  }, []);
  const notify = () => {
    toast.success("You transaction has successfully listed on blockchain!", {
      position: "bottom-right",
    });
  };
  const handleLogEntry = async () => {
    // console.log("Calleds");
    let logs;
    // setIsLoading(true);
    logs = await apiService.getApi(
      `${API_BASE_URL}clinicLedger/${userData.firebaseId}`
    );
    logs.sort(function compare(a, b) {
      var timestampA = a._id.toString().substring(0, 8);
      var timestampB = b._id.toString().substring(0, 8);
      var dateA = new Date(parseInt(timestampA, 16) * 1000);
      var dateB = new Date(parseInt(timestampB, 16) * 1000);

      return dateB - dateA;
    });
    //  notify();
    setLogsData(logs);
    console.log("Clinic Logs", logs);
    // getFilterUserLedgers();
  };
  const filterChangeHandler = (value) => {
    filterValue = value;
    //console.log("from the props", filterValue);
    searchLogs();
  };
  const searchLogs = async () => {
    let logs;
    setIsLoading(true);
    if (filterValue == "all") {
      logs = await apiService.getApi(
        `${API_BASE_URL}clinicLedger/${userData.firebaseId}`
      );
    }
    if (filterValue == "today") {
      logs = await apiService.getApi(
        `${API_BASE_URL}clinicLedger/${userData.firebaseId}/today`
      );
    }
    if (filterValue == "yestarday") {
      logs = await apiService.getApi(
        `${API_BASE_URL}clinicLedger/${userData.firebaseId}/yestarday`
      );
    }
    if (filterValue == "this-week") {
      logs = await apiService.getApi(
        `${API_BASE_URL}clinicLedger/${userData.firebaseId}/this-week`
      );
    }
    if (filterValue == "previous-week") {
      logs = await apiService.getApi(
        `${API_BASE_URL}clinicLedger/${userData.firebaseId}/previous-week`
      );
    }

    setIsLoading(false);
    setLogsData(logs);
  };
  return (
    <>
      {/* <FusePageSimple
        classes={{
          contentWrapper: "p-0 sm:p-24 pb-80 sm:pb-80 h-full",
          content: "flex flex-col h-full",
          leftSidebar: "w-256 border-0",
          header: "min-h-72 h-72 sm:h-136 sm:min-h-136 styling",
        }}
        header={<InitiativesClinicLogHeader />}
        content={
          <>
            <h1>Hello</h1>
          </>
        }
      /> */}
      <FusePageSimple
        classes={{
          // leftSidebar: "w-256 border-0 mt-80",
          contentWrapper: "p-0 sm:p-24 pb-80 sm:pb-80 h-full",
          content: "flex flex-col h-full",
          leftSidebar: "w-256 border-0",
          header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
        }}
        header={<InitiativesClinicLogHeader />}
        content={
          <>
            <ToastContainer />
            <Grid
              style={{ marginTop: "10px" }}
              direction="column"
              alignItems="center"
              justify="center"
            >
              {<FilterList filterValue={filterChangeHandler} />}
              {logsData && !isLoading ? (
                <ClinicLogCard MeetingsData={logsData} />
              ) : (
                <FuseLoading />
              )}
            </Grid>
          </>
        }
        leftSidebarContent={
          <InitiativeClinicLogSideBarContent
            handleEntry={handleLogEntry}
            notify={notify}
          />
        }
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
    </>
  );
}
export default InitiativesClinicLog;
