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
import InitiativesClinicFilesHeader from "./InitiativesClinicFilesHeader";
import InitiativeClinicFilesSideBarContent from "./InitiativeClinicFilesSidebar";
import ClinicFileCard from "./InitiativeClinicFileCard";
import { ToastContainer, toast } from "react-toastify";
function InitiativesClinicFiles() {
  const [logsData, setLogsData] = useState("");
  const userData = useSelector(({ auth }) => auth.user.data);
  const pageLayout = useRef(null);
  useEffect(() => {
    handleLogEntry();
  }, []);
  const notify = () => {
    toast.success("You file has been successfully uploaded on Azure Blob", {
      position: "bottom-right",
    });
  };
  const handleLogEntry = async () => {
    // console.log("Calleds");
    let logs;
    // setIsLoading(true);
    logs = await apiService.getApi(
      `${API_BASE_URL}file/${userData.firebaseId}`
    );

    // notify();
    setLogsData(logs);
    console.log("Clinic Logs", logs);
    // getFilterUserLedgers();
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
        header={<InitiativesClinicFilesHeader />}
        content={
          <>
            <ToastContainer />
            {logsData ? (
              <ClinicFileCard MeetingsData={logsData} />
            ) : (
              <FuseLoading />
            )}
          </>
        }
        leftSidebarContent={
          <InitiativeClinicFilesSideBarContent
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
export default InitiativesClinicFiles;
