import { FusePageSimple } from "@fuse";
import React, { useEffect, useRef, useState } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Fab from "@material-ui/core/Fab";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import axios from "axios";
import { API_BASE_URL } from "app/main/api-config/api";
import apiService from "../../../helper/apiService";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
function ClinicModal(props) {
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const { closeModel, getPendingLedgers, handleLogEntry, check } = props;
  const [approveloader, setapproveloader] = useState(false);
  const [rejectLoader, setrejectLoader] = useState(false);
  const [btndisabler, setbtndisabler] = useState(false);
  const [comment, setComment] = useState("");
  const userData = useSelector(({ auth }) => auth.user.data);
  const useStyles = makeStyles((theme) => ({
    button: {
      marginRight: theme.spacing(1),
      marginTop: "2%",
      width: "200px",
      minWidth: "100px",
      marginRight: "30px",
    },
  }));
  const classes = useStyles();
  const approveHandle = async (e) => {
    setapproveloader(true);
    // console.log("Id", props._id);

    const updatee = {
      status: "approved",
      comments: comment,
      reviewedDate: date,
    };
    const status = "approved";
    axios
      .patch(`${API_BASE_URL}approval/updateLedger/${props._id}`, updatee)
      .then((response) => {
        // console.log("Res", response);
        updateApprovedLederHandle();
        // getCurrentLedger();
        // getPendingLedgers();
        //handleLogEntry();

        // closeModel();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCurrentLedger = async () => {
    let use;
    use = await apiService.getApi(
      `${API_BASE_URL}approval/getOneApproval/${props._id}`
    );
    // console.log("Single user", use);
    setComment(use.comments);
  };
  const updateApprovedLederHandle = async (e) => {
    // console.log("Clinic Comments", comment);
    const payload = {
      status: "approved",
      reviewedDate: date,
      comments: comment,
      addedBy: props.addedBy,
    };
    axios
      .put(`${API_BASE_URL}ledger/updateLedgers/${props.userId}`, payload)
      .then((response) => {
        // console.log("Res", response);
        //getPendingLedgers();
        handleLogEntry();
        setapproveloader(false);
        closeModel();
      })
      .catch((err) => {
        console.log(err);
        setapproveloader(false);
      });

    // console.log(props._id)
    // const updatee={
    //   status:'approved'
    // }
    // axios
    //     .patch(`${API_BASE_URL}ledger/updateLedgers/${props._id}`, updatee)
    //     .then((response) => {
    //       console.log("Res",response)

    //     }).catch((err)=>{
    //       console.log(err)
    //     })

    //     const config = { headers: {'Content-Type': 'application/json'} };

    //     const updat={
    //       status:"approved"
    //     }
    //     axios({
    //       url: `${API_BASE_URL}ledger/updateLedgers/${props._id}`,
    //       method: "put",
    //       data:updat,
    //       headers: config.headers
    //     })
    //     .then(response => {

    //  console.log(response);
    //     })
    //     .catch(error => console.error(error));

    //  fetch(`${API_BASE_URL}ledger/updateLedgers/${props._id}`,{
    //    method:'PUT',
    //    headers:{
    //      'Accept':'application/json',
    //      'Content-Type':'application/json'
    //    },
    //    body:JSON.stringify(updatee)
    //  }).then((res)=>{
    //    console.log(res)
    //  }).catch((err)=>{
    //    console.log(err)
    //  })
  };
  const updateRejectedLederHandle = () => {
    // console.log("Comment first", comment);
    const payload = {
      status: "rejected",
      reviewedDate: date,
      comments: comment,
      addedBy: props.addedBy,
    };
    axios
      .put(`${API_BASE_URL}ledger/updateLedgers/${props.userId}`, payload)
      .then((response) => {
        // console.log("Res", response);
        // getPendingLedgers();
        //handleLogEntry();
        //closeModel();
        handleLogEntry();
        setrejectLoader(false);
        closeModel();
      })
      .catch((err) => {
        console.log(err);
        setrejectLoader(false);
      });
  };

  const rejectHandle = async () => {
    setrejectLoader(true);
    // console.log("Comment", comment);
    const updatee = {
      status: "rejected",
      reviewedDate: date,
      comments: comment,
      reviewedDate: date,
    };
    axios
      .patch(`${API_BASE_URL}approval/updateLedger/${props._id}`, updatee)
      .then((response) => {
        // console.log("Res", response);
        updateRejectedLederHandle();
        // getPendingLedgers();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlechange = (e) => {
    if (
      e.target.value === null ||
      e.target.value === undefined ||
      e.target.value === ""
    ) {
      setbtndisabler(true);
    } else {
      setbtndisabler(false);
    }
    setComment(e.target.value);
  };
  useEffect(() => {
    setbtndisabler(true);
  }, []);
  return (
    <FusePageSimple
      content={
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
                    value={props.date}
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
                    value={props.time}
                  />
                </div>
                <div className="pt-20">
                  <TextValidator
                    id="AddedBy"
                    name="addedBy"
                    label="Added By"
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
                    value={props.addedBy}
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
                    value={props.status}
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
                    value={props.address?.label}
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
                    value={props.description}
                    multiline
                    rows={3}
                  />
                </div>
                <div className="pt-20">
                  {check == 1 ? (
                    <TextValidator
                      id="comment"
                      name="comment"
                      label="Add Comments"
                      className="mb-2"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      readOnly="true"
                      variant="outlined"
                      autoFocus
                      required
                      fullWidth
                      onChange={handlechange}
                      multiline
                      rows={3}
                    />
                  ) : (
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
                      value={props.comments}
                      multiline
                      rows={3}
                    />
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "223px",
                    margin: "auto",
                    marginTop: "12px",
                  }}
                >
                  {check == 1 ? (
                    <>
                      <Fab
                        variant="extended"
                        aria-label="Delete"
                        color="primary"
                        className={classes.button}
                        onClick={approveHandle}
                        disabled={btndisabler}
                      >
                        {approveloader == true ? (
                          <CircularProgress size={19} color="#00fe9b" />
                        ) : (
                          <p>Approve</p>
                        )}
                      </Fab>
                      <Fab
                        aria-label="Delete"
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.button}
                        onClick={rejectHandle}
                        disabled={btndisabler}
                      >
                        {rejectLoader == true ? (
                          <CircularProgress size={19} color="#00fe9b" />
                        ) : (
                          <p>Reject</p>
                        )}
                      </Fab>
                    </>
                  ) : (
                    <Fab
                      aria-label="Delete"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={closeModel}
                    >
                      Close{" "}
                    </Fab>
                  )}
                </div>
              </ValidatorForm>
            </div>
          </div>
        </div>
      }
    />
  );
}
export default ClinicModal;
