// Grepper
import React, { Component, useState } from "react";
import { useSelector } from "react-redux";
import logo from "./logo.PNG";
import {
  AppConfig,
  UserSession,
  showConnect,
  openContractCall,
} from "@stacks/connect";
import CircularProgress from "@material-ui/core/CircularProgress";
import { StacksTestnet } from "@stacks/network";
import { PrincipalCV, intCV, stringUtf8CV } from "@stacks/transactions";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import apiService from "../../../helper/apiService";
import { API_BASE_URL } from "app/main/api-config/api";
import Snackbar from "@material-ui/core/Snackbar";
import { SnackbarContent } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Button,
  Grid,
  Tab,
  Tabs,
  TextField,
  Avatar,
  Select,
  MenuItem,
  InputAdornment,
  Icon,
  Typography,
} from "@material-ui/core";
import emailjs from "@emailjs/browser";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
    marginTop: "2%",
  },
}));

const appConfig = new AppConfig(["store_write", "publish_data"]);
const userSession = new UserSession({ appConfig });
const Stacks = (props) => {
  const {
    disableFlag,
    date,
    time,
    location,
    metaData,
    selectedClinics,
    clinicFirebaseId,
    clinicNames,
    status,
    address,
    clinicName,
    userEmail,
    clinicEmail,
  } = props;
  const userData = useSelector(({ auth }) => auth.user.data);
  const [walletConnection, setWalletConnection] = useState(false);
  const [open, setOpen] = useState(false);
  const [loader, setloader] = useState(false);
  //#region for setting parameters to send email
  const service_name = "service_7hg8jfa";
  const template_ID = "template_yhjrrkg";
  const public_key = "2BCjIk-dvYalBXVRF";
  const template_ID_Patient = "template_wlu84n9";
  //#end region for setting parameters to send email

  const classes = useStyles();
  var senderAddress;

  const authenticate = () => {
    setloader(true);
    // console.log("usestate", loader);
    showConnect({
      appDetails: {
        name: "EggsChain Pioneer",
        icon: window.location.origin + `${logo}`,
      },
      redirectTo: "/apps/initiatives",
      onFinish: () => {
        setWalletConnection(true);
        handleClick();
        let userData = userSession.loadUserData();
        // console.log("user data", userData);
        // console.log("wallet connection status", walletConnection);
        senderAddress = userData.profile.stxAddress.testnet;
        // console.log("sender Adressss:", senderAddress); //mainnet for release
        contractCall();
      },
      onCancel: () => {
        setloader(false);
        setOpen(false);
      },
      userSession: userSession,
    });
  };

  const contractCall = () => {
    setloader(true);
    openContractCall({
      contractAddress: process.env.REACT_APP_CONTRACT_ADDRESS,
      contractName: process.env.REACT_APP_CONTRACT_NAME,
      functionName: process.env.REACT_APP_FUNCTION_NAME,
      network: new StacksTestnet(),
      functionArgs: [
        stringUtf8CV(date),
        stringUtf8CV(time),
        stringUtf8CV(location),
        stringUtf8CV(metaData),
      ],
      sponsored: false,
      onFinish: (data) => {
        // console.log("smartcontract@@@@@@@@@@@@@@@@@@@@@@@@@", data);
        postLedger(
          data.txId,
          date,
          time,
          userData.fullName,
          userData.firebaseId
        );
        setloader(false);
        // props.handleEntry();
        // props.formClose();
      },
      onCancel: () => {
        setloader(false);
      },
    });
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const sendForApproval = async (userId) => {
    let clinicFirebaseId = clinicNames.filter(
      (data) => data.title === selectedClinics
    );
    // console.log("Filtered",filteredPerson)
    //  FirebaseId:filteredData.FirebaseId

    let singleClinicFiebaseId;
    singleClinicFiebaseId = clinicFirebaseId[0].FirebaseId;
    // console.log("Clinic After filter",singleClinicFiebaseId)
    setloader(true);
    const payload = {
      date: date,
      time: time,
      userFirebaseId: userData.firebaseId,
      addedBy: userData.fullName,
      status: "pending",
      clinic: clinicName,
      description: metaData,
      clinicFirebaseId: singleClinicFiebaseId,
      userId: userId,
      address: address,
    };
    // console.log("Payload ",payload)

    let approve = await apiService
      .postApi(`${API_BASE_URL}approval/addApproval`, payload)
      .then((res) => {
        // console.log("Response from approval by clinic",res)
        props.formClose();
        setloader(false);
      })
      .catch((err) => {
        console.log(err);
        setloader(false);
      });

    setloader(false);

    //  props.formClose();
  };
  //#region to send mail
  const sendEmail = async () => {
    console.log("Clinic Name", clinicName);
    console.log("Selected Clinics", selectedClinics);
    // const { clinicName } = localStorage;
    // let drName = clinicName.toString();
    // let drEmail = localStorage.getItem("clinicEmail");
    let res = await emailjs.send(
      service_name,
      template_ID,
      {
        dr_name: `${clinicName}`,
        send_to: "mbali@cinnova.com",
      },
      public_key
    );
    console.log("Email Response 1", res);
    let res2 = await emailjs.send(
      service_name,
      template_ID_Patient,
      {
        patient_name: `${userData.fullName}`,
        send_to: "mbali@cinnova.com",
      },
      public_key
    );
    console.log("Email Response 2", res2);
  };
  //#end region to send mail
  const postLedger = async () => {
    let status = "pending";
    const payLoad = {
      trxDate: date,
      trxTime: time,
      trxId: "",
      addedBy: userData.fullName,
      firebaseId: userData.firebaseId,
      status: status,
      userEmail: "mbali@cinnova.com",
      clinicEmail: "mbali@cinnova.com",
      clinicName: clinicName,
    };
    // console.log("Post Payload Ledger",payLoad)
    setloader(true);
    let logs = await apiService
      .postApi(`${API_BASE_URL}ledger/addLedger`, payLoad)
      .then((res) => {
        // console.log("Response from post ledger",res);
        // console.log("Res id",res._id)
        sendForApproval(res._id);
        sendEmail();
        props.handleEntry();
        props.formClose();
      });
    // console.log("logs",logs)

    setloader(false);
    return logs;
  };

  return (
    <div>
      <Button
        disabled={disableFlag}
        variant="contained"
        color="secondary"
        type="submit"
        className={classes.button}
        onClick={postLedger}
      >
        {loader == true ? (
          <CircularProgress size={19} color="#00fe9b" />
        ) : (
          <p>Send</p>
        )}
      </Button>

      {walletConnection === true ? (
        <div>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={open}
            autoHideDuration={500}
            onClose={handleCloseSnack}
          >
            <SnackbarContent
              message={"Stacks Wallet Logged in"}
              style={{ backgroundColor: "green" }}
              action={
                <React.Fragment>
                  <Button
                    color="secondary"
                    size="small"
                    onClick={handleCloseSnack}
                  ></Button>
                  <IconButton
                    size="small"
                    aria-label="close"
                    onClick={handleCloseSnack}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            />
          </Snackbar>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Stacks;
