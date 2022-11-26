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
import { EventNote } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
    marginTop: "2%",
  },
}));

const appConfig = new AppConfig(["store_write", "publish_data"]);
const userSession = new UserSession({ appConfig });
const StacksClinic = (props) => {
  const {
    disableFlag,
    date,
    time,
    metaData,
    clinicFirebaseId,
    location,
    handleEntry,
    notify,
    biorepositoryName,
    biorepositoryLocation,
    numberOfSamples,
    tankId,
    canisterId,
    caneId,
    strawId,
    colorCode,
    indicator,
  } = props;
  const userData = useSelector(({ auth }) => auth.user.data);
  const [walletConnection, setWalletConnection] = useState(false);
  const [open, setOpen] = useState(false);
  const [loader, setloader] = useState(false);

  const classes = useStyles();
  var senderAddress;

  const authenticate = () => {
    console.log("Propssssssssss", props);
    setloader(true);
    // console.log("usestate", loader);
    showConnect({
      appDetails: {
        name: "EggsChain Pioneer",
        icon: window.location.origin + `${logo}`,
      },
      redirectTo: "/apps/clinic/logs",
      onFinish: () => {
        setWalletConnection(true);
        handleClick();
        const userData = userSession.loadUserData();
        // console.log("user data", userData);
        // console.log("wallet connection status", walletConnection);
        senderAddress = userData.profile.stxAddress.testnet;
        //  console.log("sender Adressss:", senderAddress); //mainnet for release
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
      contractAddress: `ST1KJ3V5CTWVHHSXZ6E1WEQCXKBMKAX55JGWBBRGS`,
      contractName: `eggschain-pioneer-approver-log-V1`,
      functionName: `set-message`,
      network: new StacksTestnet(),
      functionArgs: [
        stringUtf8CV(date),
        stringUtf8CV(time),
        stringUtf8CV(metaData),
        stringUtf8CV(biorepositoryName),
        stringUtf8CV(biorepositoryLocation),
        stringUtf8CV(numberOfSamples),
        stringUtf8CV(tankId),
      ],
      sponsored: false,
      onFinish: (data) => {
        console.log("smartcontract@@@@@@@@", data);
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

  //   const sendForApproval =async(userId)=>{

  //     let clinicFirebaseId= clinicNames.filter(data => data.title===selectedClinics)
  //       // console.log("Filtered",filteredPerson)
  //       //  FirebaseId:filteredData.FirebaseId

  //   let singleClinicFiebaseId;
  //    singleClinicFiebaseId=clinicFirebaseId[0].FirebaseId
  //   // console.log("Clinic After filter",singleClinicFiebaseId)
  //     setloader(true)
  //     const payload={
  //       date:date,
  //       time:time,
  //       userFirebaseId:userData.firebaseId,
  //       addedBy:userData.fullName,
  //       status:"pending",
  //       clinic:selectedClinics,
  //       description:metaData,
  //       clinicFirebaseId:singleClinicFiebaseId,
  //       userId:userId,
  //       address:address
  //     }
  //     // console.log("Payload ",payload)

  //     let approve= await apiService.postApi(`${API_BASE_URL}approval/addApproval`,payload)
  //     .then((res)=>{
  //       // console.log("Response from approval by clinic",res)
  //       props.formClose();
  //       setloader(false);

  //     }).catch((err)=>{
  //       console.log(err)
  //       setloader(false);
  //     })

  //     setloader(false);

  //     //  props.formClose();

  //   }

  const postLedger = async (trxId, date, time, fullName, firebaseId) => {
    let status = "pending";
    const payLoad = {
      trxDate: date,
      trxTime: time,
      trxId: trxId,
      addedBy: fullName,
      firebaseId: firebaseId,
      description: metaData,
      biorepositoryName: biorepositoryName,
      biorepositoryLocation: biorepositoryLocation,
      numberOfSamples: numberOfSamples,
      tankId: tankId,
      canisterId: canisterId,
      caneId: caneId,
      strawId: strawId,
      colorCode: colorCode,
      indicator: indicator,
    };
    console.log("Post Payload Ledger", payLoad);
    setloader(true);
    let logs = await apiService
      .postApi(`${API_BASE_URL}clinicLedger/addLedger`, payLoad)
      .then((res) => {
        // console.log("Response from post ledger",res);
        // console.log("Res id",res._id)
        //    sendForApproval(res._id);
        handleEntry();
        notify();
        // authenticate();

        props.formClose();
      });
    // console.log("logs",logs)

    setloader(false);
    console.log("Check Data", metaData);
    // return logs;
  };

  return (
    <div>
      <Button
        disabled={disableFlag}
        variant="contained"
        color="secondary"
        type="submit"
        className={classes.button}
        onClick={authenticate}
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

export default StacksClinic;
