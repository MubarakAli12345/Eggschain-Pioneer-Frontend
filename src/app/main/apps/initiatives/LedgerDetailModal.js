import { FusePageSimple } from "@fuse";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Fab from "@material-ui/core/Fab";
import { API_BASE_URL } from "app/main/api-config/api";
import apiService from "../../../helper/apiService";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import logo from "./logo.PNG";
import {
  AppConfig,
  UserSession,
  showConnect,
  openContractCall,
} from "@stacks/connect";
import { StacksTestnet } from "@stacks/network";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PrincipalCV, intCV, stringUtf8CV } from "@stacks/transactions";
import { LinearProgress, Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import { SnackbarContent } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
const appConfig = new AppConfig(["store_write", "publish_data"]);
const userSession = new UserSession({ appConfig });

function LedgerDetailModal(props) {
  const [Status, setStatus] = useState("");
  const [approvedLedgerData, setApprovedLedgerData] = useState("");
  const [open, setOpen] = useState(false);
  const [btndisable, setbtndisable] = useState(false);
  const [loader, setloader] = useState(false);
  const [cricularLoader, setcricularLoader] = useState(false);
  const [walletLoader, setwalletLoader] = useState(false);
  const [walletConnection, setWalletConnection] = useState(false);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const customIdConnect = "custom-id-connected";

  const userData = useSelector(({ auth }) => auth.user.data);

  var senderAddress;
  const useStyles = makeStyles((theme) => ({
    button: {
      marginRight: theme.spacing(1),
      marginTop: "2%",
      width: "200px",
      minWidth: "100px",
      marginRight: "30px",
    },
    containerFlex: {
      display: "flex",
      justifyContent: "center",
    },
  }));
  let data;
  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const classes = useStyles();

  // const {closeModel}=props
  const { ViewNotify } = props;

  // console.log("Props ", props);

  const buttonDisableHandler = (status) => {
    // console.log(status);
    if (status === "pending" || status === "rejected") {
      setbtndisable(true);
    }
  };
  const authenticate = () => {
    // navigator.geolocation.getCurrentPosition(function (position) {
    //   console.log("Latitude is :", position.coords.latitude);
    //   console.log("Longitude is :", position.coords.longitude);
    //   setLng(parseFloat(position.coords.longitude));
    //   setLat(parseFloat(position.coords.latitude));
    // });
    setcricularLoader(true);
    setwalletLoader(true);
    // console.log("usestate", loader);
    showConnect({
      appDetails: {
        name: "EggsChain Pioneer",
        icon: window.location.origin + `${logo}`,
      },
      redirectTo: "/apps/initiatives",
      onFinish: () => {
        setWalletConnection(true);
        // notifyConnection();

        let userData = userSession.loadUserData();
        // console.log("user data", userData);
        // console.log("wallet connection status", walletConnection);
        senderAddress = userData.profile.stxAddress.testnet;
        // console.log("sender Adressss:", senderAddress); //mainnet for release
        contractCall();
        setcricularLoader(false);
      },
      onCancel: () => {
        setwalletLoader(false);
        setcricularLoader(false);
      },

      userSession: userSession,
    });
  };
  const contractCall = () => {
    setcricularLoader(true);
    openContractCall({
      contractAddress: process.env.REACT_APP_CONTRACT_ADDRESS,
      contractName: process.env.REACT_APP_CONTRACT_NAME,
      functionName: process.env.REACT_APP_FUNCTION_NAME,
      network: new StacksTestnet(),
      functionArgs: [
        stringUtf8CV(approvedLedgerData.date),
        stringUtf8CV(approvedLedgerData.time),
        stringUtf8CV(approvedLedgerData.clinic),
        stringUtf8CV(approvedLedgerData.description),
        stringUtf8CV(approvedLedgerData.comments),
      ],
      sponsored: false,
      onFinish: (data) => {
        // console.log("smartcontract@@@@@@@@@@@@@@@@@@@@@@@@@", data);
        updateTrx(data.txId);

        props.trxHandler();
        setcricularLoader(false);
      },
      onCancel: () => {
        setcricularLoader(false);
      },
    });
  };

  const updateTrx = async (trxId) => {
    const payLoad = {
      trxId: trxId,
    };
  
    let logs = await apiService
      .putApi(`${API_BASE_URL}ledger/updateTrxId/${props.ledgerId}`, payLoad)
      .then(async(res) => {
        // console.log(res);
        let logs2=await apiService.putApi(`${API_BASE_URL}approval/updateTrxId/${props.ledgerId}`, payLoad).then((res)=>{
          console.log("Succesfully Update Approval Trx Id",res)
        })
        props.trxHandler();
        props.closeModel();
        toast.success("Log Sucessfully added to Block Chain!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      });
     

    setloader(false);
  };
  const openInNewTab = (trxId) => {
    const url = `https://explorer.stacks.co/txid/${trxId}`;
    const newWindow = window.open(`https://explorer.stacks.co/txid/${trxId}`);
    if (newWindow) newWindow.opener = null;
  };
  const filterLedgerData = async () => {
    setloader(true);
    let use;
    use = await apiService.getApi(`${API_BASE_URL}approval/getAllApprovals`);
    // console.log("Useeeeeeeeeeeee", use);
    let Filter = use.filter((data) => data.userId === props.ledgerId);
    // console.log("This is Filter", Filter);
    setApprovedLedgerData(Filter[0]);
    data = Filter;
    buttonDisableHandler(approvedLedgerData.status);
    setloader(false);
  };
  const closeModel = () => {
    props.closeModel();
    //this is toaster call it in .then wotherwise it gives error
    // ViewNotify()
  };

  const notifyConnection = () => {
    toast.success(
      "Stacks Wallet Connected!",
      {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      },
      {
        toastId: customIdConnect,
      }
    );
  };

  useEffect(() => {
    filterLedgerData();
  }, []);

  return (
    <>
      {loader && (
        <div style={{ marginTop: "120px" }}>
          <LinearProgress />
        </div>
      )}

      {!loader && (
        <FusePageSimple
          content={
            <>
              <ToastContainer />
              <div className="p-16 sm:p-24 max-w-2xl">
                <div>
                  <div>
                    <ValidatorForm
                      // onSubmit={handleSubmit}
                      // onError={formError}
                      // className={classes.root}
                      noValidate
                      autoComplete="off"
                      // onSubmit={handleSubmit}
                      // ref={formRef}
                    >
                      <div className="pt-20">
                        <TextValidator
                          id="Date"
                          name="date"
                          label="Date"
                          className="mb-2"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          readOnly="true"
                          variant="outlined"
                          autoFocus
                          required
                          fullWidth
                          disabled="true"
                          value={approvedLedgerData.date}
                        />
                      </div>
                      <div className="pt-20">
                        <TextValidator
                          id="Time"
                          name="time"
                          label="time"
                          className="mb-2"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          readOnly="true"
                          variant="outlined"
                          autoFocus
                          required
                          fullWidth
                          disabled="true"
                          value={approvedLedgerData.time}
                        />
                      </div>
                      <div className="pt-20">
                        <TextValidator
                          id="clinic"
                          name="clinic"
                          label="Clinic"
                          className="mb-2"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          readOnly="true"
                          variant="outlined"
                          autoFocus
                          required
                          fullWidth
                          disabled="true"
                          value={approvedLedgerData.clinic}
                        />
                      </div>
                      <div className="pt-20">
                        <TextValidator
                          id="status"
                          name="status"
                          label="Status"
                          className="mb-2"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          readOnly="true"
                          variant="outlined"
                          autoFocus
                          required
                          fullWidth
                          disabled="true"
                          value={approvedLedgerData.status}
                        />
                      </div>
                      <div className="pt-20">
                        <TextValidator
                          id="address"
                          name="address"
                          label="Address of Specimen"
                          className="mb-2"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          readOnly="true"
                          variant="outlined"
                          autoFocus
                          required
                          fullWidth
                          disabled="true"
                          value={approvedLedgerData.address?.label}
                        />
                      </div>
                      <div className="pt-20">
                        <TextValidator
                          id="description"
                          name="description"
                          label="Description"
                          className="mb-2"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          readOnly="true"
                          variant="outlined"
                          autoFocus
                          required
                          fullWidth
                          disabled="true"
                          value={approvedLedgerData.description}
                          multiline
                          rows={3}
                        />
                      </div>
                      <div className="pt-20">
                        <TextValidator
                          id="cliniComments"
                          name="clinicComments"
                          label="Clinic Comments"
                          className="mb-2"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          readOnly="true"
                          variant="outlined"
                          autoFocus
                          required
                          fullWidth
                          disabled="true"
                          value={approvedLedgerData.comments}
                          multiline
                          rows={3}
                        />
                      </div>
                      <div className="pt-20">
                        <TextValidator
                          id="reviewedDate"
                          name="reviewedDatw"
                          label="Review Date"
                          className="mb-2"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          readOnly="true"
                          variant="outlined"
                          autoFocus
                          required
                          fullWidth
                          disabled="true"
                          value={approvedLedgerData.reviewedDate}
                        />
                      </div>
                      <div className={classes.containerFlex}>
                        {approvedLedgerData.status === "approved" &&
                        props.ledgerData.trxId.length <= 1 ? (
                          <>
                            {" "}
                            <Fab
                              aria-label="Delete"
                              variant="contained"
                              color="primary"
                              disabled={btndisable}
                              className={classes.button}
                              onClick={authenticate}
                            >
                              {cricularLoader == true ? (
                                <CircularProgress size={19} color="#00fe9b" />
                              ) : (
                                <p>Send</p>
                              )}
                            </Fab>
                          </>
                        ) : (
                          <>
                            {/* {approvedLedgerData.status !== "pending" ||
                            approvedLedgerData.status !== "rejected" ? (
                              <Fab
                                aria-label="Delete"
                                variant="contained"
                                color="primary"
                                disabled={btndisable}
                                className={classes.button}
                                onClick={openInNewTab(props.ledgerData.trxId)}
                              >
                                View on Block Explorer
                              </Fab>
                            ) : (
                              <></>
                            )} */}
                          </>
                        )}
                        {/* {walletConnection === true ? (
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
                        )} */}

                        {/* { props.ledgerData.trxId.length >2 ? (
                          <Fab
                            aria-label="Delete"
                            variant="contained"
                            color="primary"
                            disabled={btndisable}
                            className={classes.button}
                            onClick={openInNewTab(props.ledgerData.trxId)}
                          >
                            View on Block Explorer
                          </Fab>
                        ) : (
                          <></>
                        )} */}
                      </div>
                    </ValidatorForm>
                  </div>
                </div>
              </div>
            </>
          }
        />
      )}
    </>
  );
}
export default LedgerDetailModal;
