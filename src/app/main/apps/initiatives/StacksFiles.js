// Grepper
import React, { Component, useEffect, useState } from "react";
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
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
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
import { toArray } from "lodash";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
    marginTop: "2%",
  },
}));

const appConfig = new AppConfig(["store_write", "publish_data"]);
const userSession = new UserSession({ appConfig });
const StacksFiles = (props) => {
  const {
    disableFlag,
    date,
    time,
    metaData,
    clinicFirebaseId,
    location,
    file,
    handleEntry,
    notify,
  } = props;
  const userData = useSelector(({ auth }) => auth.user.data);
  const [walletConnection, setWalletConnection] = useState(false);
  const [open, setOpen] = useState(false);
  const [loader, setloader] = useState(false);
  const [fileCopy, setFileCopy] = useState([{}]);
  const [lastFileCount, setLastFileCount] = useState(false);

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
  useEffect(() => {
    setFileCopy(toArray(file));
  }, []);
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

  const postLedger = async () => {
    console.log("File", file);
    let files = [];
    files = toArray(file);
    setFileCopy(toArray(file));

    let storageAccountName = "eggschainpioneer";
    let sasToken =
      "sv=2021-06-08&ss=bf&srt=sco&sp=rwlacitfx&se=2026-03-30T16:12:22Z&st=2022-06-14T08:12:22Z&spr=https&sig=R3wZM6Doy1Nzx%2FT%2FJauHXOLqPk4j0NU8vVFyeN8Iayg%3D";
    const blobService = new BlobServiceClient(
      `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    );
    setTimeout(() => {
      console.log("File Copy", fileCopy);
    }, 3000);
    setloader(true);
    files.map(async (data, i) => {
      console.log("IIII", i);
      //get container - full public read access
      const containerClient = blobService.getContainerClient("files");
      await containerClient.createIfNotExists({
        access: "container",
      });
      //create blob Client for Container
      const blobClient = containerClient.getBlockBlobClient(files[i].name);
      //set mimetype as determined from browser with file upload control
      const options = {
        blobHTTPHeaders: { blobContentType: files[i].type },
      };
      //upload file
      let res = await blobClient.uploadBrowserData(files, options);
      console.log("Response", res);
      let fileUrl = `https://${storageAccountName}.blob.core.windows.net/files/${files[i].name}`;
      const payLoad = {
        trxDate: date,
        trxTime: time,
        addedBy: userData.fullName,
        firebaseId: userData.firebaseId,
        url: fileUrl,
        fileName: files[i].name,
      };
      console.log("Post Payload Ledger", payLoad);
      setloader(true);
      let logs = await apiService
        .postApi(`${API_BASE_URL}file/addFile`, payLoad)
        .then((res) => {
          // console.log("Response from post ledger",res);
          // console.log("Res id",res._id)
          //
          if (i == files.length - 1) {
            notify();
            handleEntry();
          }
          setLastFileCount(true);
          setloader(false);
          props.formClose();
        });
    });
    if (lastFileCount) {
    }
    setTimeout(() => {
      setloader(false);
    }, 2000);
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

export default StacksFiles;
