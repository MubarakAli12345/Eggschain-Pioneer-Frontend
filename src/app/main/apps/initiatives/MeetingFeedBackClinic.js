import React, { useEffect, useRef, useState } from "react";

import {
  Button,
  Grid,
  Tab,
  Tabs,
  TextField,
  Avatar,
  MenuItem,
  InputAdornment,
  Icon,
  Typography,
  Select,
  InputLabel,
} from "@material-ui/core";

import { orange } from "@material-ui/core/colors";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { FuseAnimate, FusePageCarded, FusePageSimple, FuseUtils } from "@fuse";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useForm } from "@fuse/hooks";
import { Link } from "react-router-dom";
import clsx from "clsx";
import _ from "@lodash";
import { useDispatch, useSelector } from "react-redux";
import withReducer from "app/store/withReducer";
import * as Actions from "./store/actions";
import reducer from "./store/reducers";
import Chip from "@material-ui/core/Chip";
import axios from "axios";
import { API_BASE_URL } from "app/main/api-config/api";
import apiService from "../../../helper/apiService";
import Stacks from "./Stacks";
import PlacesAutoComplete from "react-places-autocomplete";
import { date } from "date-fns/locale/af";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import StacksClinic from "./StacksClinic";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 48,
    padding: "0 30px",
  },
  productImageFeaturedStar: {
    position: "absolute",
    top: 0,
    right: 0,
    color: orange[400],
    opacity: 0,
  },
  button: {
    marginRight: theme.spacing(1),
    marginTop: "2%",
  },
  remainingCounter: {
    float: "right",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  productImageUpload: {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },
  productImageItem: {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    "&:hover": {
      "& $productImageFeaturedStar": {
        opacity: 0.8,
      },
    },
    "&.featured": {
      pointerEvents: "none",
      boxShadow: theme.shadows[3],
      "& $productImageFeaturedStar": {
        opacity: 1,
      },
      "&:hover $productImageFeaturedStar": {
        opacity: 1,
      },
    },
  },
}));

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function MeetingFeedBackClinic(props) {
  const [MetaDataLimit, setMetaDataLimit] = useState(45);
  const [LocationLimit, setLocationLimit] = useState(50);

  const [MetaData, setMetaData] = useState("");
  const [LocationData, setLocationData] = useState("");
  const [clinicNames, setClinicNames] = useState([]);
  const { CloseMeetingForm } = props;
  const [selectedClinics, setSelectedClinics] = useState("");
  const [open, setOpen] = useState(false);
  const [addressLoc, setAddressLoc] = useState("");
  const [address, setAddress] = useState({ label: "", value: "" });
  const [biorepositoryName, setBiorepositoryName] = useState("");
  const [biorepositoryLocation, setBiorepositoryLocation] = useState("");
  const [numberOfSamples, setNumberOfSamples] = useState("");
  const [tankId, setTankId] = useState("");
  const [canisterId, setCanisterId] = useState("");
  const [caneId, setCaneId] = useState("");
  const [strawId, setStrawId] = useState("");
  const [colorCode, setColorCode] = useState("");
  const [indicator, setIndicator] = useState("");
  const [biorepositoryNameLimit, setBiorepositoryNameLimit] = useState(140);
  const [biorepositoryLocationLimit, setBiorepositoryLocationLimit] =
    useState(45);
  const [numberOfSamplesLimit, setNumberOfSamplesLimit] = useState(10);
  const [tankIdLimit, setTankIdLimit] = useState(10);
  const [canisterIdLimit, setCanisterIdLimit] = useState(10);
  const [caneIdLimit, setCaneIdLimit] = useState(10);

  const [strawIdLimit, setStrawIdLimit] = useState(10);
  const [colorCodeLimit, setColorCodeLimit] = useState(10);
  const [indicatorLimit, setIndicatorLimit] = useState(10);
  const [biorepositoryList, setBiorepositoryList] = useState([]);

  let clinicFirebaseId;
  let setClinic;
  const formRef = useRef(null);
  const options = [
    {
      value: "Mubarik",
      label: "Mubarak",
    },
    {
      value: "Ali",
      label: "Mubarak Ali",
    },
  ];
  var showDate = new Date();
  let seconds;
  let minutes;
  // console.log(
  //   "helooooooooooooooooooooo",
  //   showDate.getSeconds().toString().length
  // );
  if (showDate.getSeconds().toString().length == 1) {
    seconds = "0" + showDate.getSeconds();
  } else {
    seconds = showDate.getSeconds();
  }
  if (showDate.getMinutes().toString().length == 1) {
    minutes = "0" + showDate.getMinutes();
  } else {
    minutes = showDate.getMinutes();
  }
  var displayTodayDate =
    showDate.getMonth() +
    1 +
    "/" +
    showDate.getDate() +
    "/" +
    showDate.getFullYear();

  if (showDate.getTimezoneOffset() <= -1) {
    var timeZoneOffset = `(UTC+${-(showDate.getTimezoneOffset() / 60)})`;
  }
  if (showDate.getTimezoneOffset() >= 1) {
    var timeZoneOffset = `(UTC-${+(showDate.getTimezoneOffset() / 60)})`;
  }
  if (showDate.getTimezoneOffset() == 0) {
    var timeZoneOffset = `(UTC)`;
  }

  var displayTime =
    showDate.getHours() + ":" + minutes + ":" + seconds + " " + timeZoneOffset;

  const { handleReload, handleFeedBackClose, meetingFeedback } = props;
  const dispatch = useDispatch();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const classes = useStyles(props);
  const userData = useSelector(({ auth }) => auth.user.data);
  const [MeetingInfromationForm, setMeetingInfromationForm] = useState(
    meetingFeedback ? meetingFeedback : null
  );
  const getSignupUser = async () => {
    let use;
    use = await apiService.getApi(`${API_BASE_URL}auth/getUsers`);

    // setUser(use.role);
    const filter = use.map((data) => {
      // console.log("data",data)
      // console.log("filt",data.role)
      return data;
    });
    // const file=use.map(data=>data).filter(filt=>filt[0].status==="clinic")
    //  console.log("Filter",file)
    setClinic = use
      .filter((person) => person.role === "biorepository")
      .map((filteredPerson) => ({
        // console.log("Filtered",filteredPerson)
        id: filteredPerson.fullName,
        title: filteredPerson.fullName,
        FirebaseId: filteredPerson.firebaseId,
      }));
    setBiorepositoryList(setClinic);
    console.log("Biorepository List", setClinic);

    //  const jsonn=await setClinic.json();
    // setClinicNames(setClinic);
    // console.log("Clinic Names",setClinic)
    // console.log("All users",filter)
    // {names.filter(name => name.includes('J')).map(filteredName => (
    //   <li>
    //     {filteredName}
    //   </li>
    // ))}
    // console.log(use);

    // console.log(clinicNames)
  };

  //handle open Select
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    setAddressLoc(e.target.value);
  };
  async function handleSubmit(e) {
    // axios.post(`${API_BASE_URL}initiative/addUpdateInitiative`, Object.assign(MeetingInfromationForm, { host: userData.email }) ).then(() => {
    //     handleReload("NewMeeting");
    //     if (handleFeedBackClose)
    //         handleFeedBackClose();
    //     else
    //         props.CloseMeetingForm();

    // });
    // await apiService.postApi(
    //   `${API_BASE_URL}initiative/addUpdateInitiative`,
    //   Object.assign(MeetingInfromationForm, { host: userData.email })
    // );
    // handleReload("NewMeeting");
    // if (handleFeedBackClose) handleFeedBackClose();
    // else props.CloseMeetingForm();

    //  console.log("E",e)
    let post = apiService.postApi(`${API_BASE_URL}approval/addApproval`);
  }

  const handleMeetingInformationChange = (input) => (e) => {
    const MAX_CHARS = 45;
    const remaining = MAX_CHARS - e.target.value.length;
    setMetaData(e.target.value);
    setMetaDataLimit(remaining);
  };
  const handleChangeGeneric = (e) => {
    const MAX_CHARS = 10;
    const MAX_CHARS_DESCRIPTION = 23;
    const MAX_CHARS_LOCATION = 45;
    if (e.target.name === "biorepositoryLocation") {
      setBiorepositoryLocation(e.target.value);
      const remaining = MAX_CHARS_LOCATION - e.target.value.length;
      setBiorepositoryLocationLimit(remaining);
    } else if (e.target.name === "numberOfSamples") {
      setNumberOfSamples(e.target.value);
      const remaining = MAX_CHARS - e.target.value.length;
      setNumberOfSamplesLimit(remaining);
    } else if (e.target.name === "tankId") {
      setTankId(e.target.value);
      const remaining = MAX_CHARS - e.target.value.length;
      setTankIdLimit(remaining);
    } else if (e.target.name === "canisterId") {
      setCanisterId(e.target.value);
      const remaining = MAX_CHARS - e.target.value.length;
      setCanisterIdLimit(remaining);
    } else if (e.target.name === "caneId") {
      setCaneId(e.target.value);
      const remaining = MAX_CHARS - e.target.value.length;
      setCaneIdLimit(remaining);
    } else if (e.target.name === "strawId") {
      setStrawId(e.target.value);
      const remaining = MAX_CHARS - e.target.value.length;
      setStrawIdLimit(remaining);
    } else if (e.target.name === "colorCode") {
      setColorCode(e.target.value);
      const remaining = MAX_CHARS - e.target.value.length;
      setColorCodeLimit(remaining);
    } else if (e.target.name === "indicator") {
      setIndicator(e.target.value);
      const remaining = MAX_CHARS - e.target.value.length;
      setIndicatorLimit(remaining);
    }
  };
  const validateInitiative = () => {
    if (
      MeetingInfromationForm &&
      MeetingInfromationForm.title &&
      MeetingInfromationForm.description
    )
      return true;
    else return false;
  };
  const selectedBiorepository = (e) => {
    setBiorepositoryName(e.target.value);
  };
  useEffect(() => {
    getSignupUser();
  }, []);
  const placeHolderFlag = () => {
    if (
      MetaDataLimit == 45 ||
      !biorepositoryName ||
      biorepositoryLocationLimit == 45 ||
      tankIdLimit == 10
      // numberOfSamplesLimit == 140 ||
      // canisterIdLimit == 140 ||
      // caneIdLimit == 140 ||
      // strawIdLimit == 140 ||
      // colorCodeLimit == 140 ||
      // indicatorLimit == 140
    ) {
      return true;
    } else {
      return false;
    }
  };

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
                    value={displayTodayDate}
                    variant="outlined"
                    autoFocus
                    required
                    fullWidth
                    disabled="true"
                  />
                </div>

                <div className="pt-20">
                  <TextValidator
                    id="time"
                    name="time"
                    label="Time"
                    className="mb-2"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    readOnly="true"
                    value={displayTime}
                    variant="outlined"
                    autoFocus
                    required
                    fullWidth
                    disabled="true"
                  />
                </div>
                <div className="pt-20">
                  {/* {console.log("labels",clinicNames)}
                  {console.log("Options",options)} */}
                  <InputLabel id="demo-controlled-open-select-label">
                    Select Biorepository
                  </InputLabel>
                  <Select
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    label="Biorepository's"
                    name="Biorepository's"
                    required
                    multiline
                    rows={1}
                    variant="outlined"
                    fullWidth
                    inputProps={{ maxLength: 15 }}
                    onChange={selectedBiorepository}
                    value={biorepositoryName}
                  >
                    {biorepositoryList.map((categoria) => (
                      <MenuItem key={categoria.id} value={categoria.title}>
                        {categoria.title} {categoria.firebaseId}
                      </MenuItem>
                    ))}
                  </Select>
                </div>

                <div className="pt-20">
                  <TextValidator
                    style={{ paddingTop: "15px" }}
                    className="mb-2"
                    id="biorepositoryLocation"
                    label="Biorepository Location"
                    type="text"
                    name="biorepositoryLocation"
                    value={
                      MeetingInfromationForm &&
                      MeetingInfromationForm.biorepositoryLocation
                        ? MeetingInfromationForm.biorepositoryLocation
                        : null
                    }
                    onChange={handleChangeGeneric}
                    required
                    variant="outlined"
                    fullWidth
                    inputProps={{ maxLength: 45 }}
                  />
                  <div>
                    <p className={classes.remainingCounter}>
                      {biorepositoryLocationLimit} characters remaining
                    </p>
                  </div>
                </div>
                <div className="pt-20">
                  <TextValidator
                    style={{ paddingTop: "15px" }}
                    className="mb-2"
                    id="numberOfSamples"
                    label="Number Of Samples"
                    type="text"
                    name="numberOfSamples"
                    value={
                      MeetingInfromationForm &&
                      MeetingInfromationForm.numberOfSamples
                        ? MeetingInfromationForm.numberOfSamples
                        : null
                    }
                    onChange={handleChangeGeneric}
                    required
                    variant="outlined"
                    fullWidth
                    inputProps={{ maxLength: 10 }}
                  />
                  <div>
                    <p className={classes.remainingCounter}>
                      {numberOfSamplesLimit} characters remaining
                    </p>
                  </div>
                </div>

                <div className="pt-20">
                  <TextValidator
                    style={{ paddingTop: "15px" }}
                    className="mb-2"
                    id="tankId"
                    label="Tank Id"
                    type="text"
                    name="tankId"
                    value={
                      MeetingInfromationForm && MeetingInfromationForm.tankId
                        ? MeetingInfromationForm.tankId
                        : null
                    }
                    onChange={handleChangeGeneric}
                    required
                    variant="outlined"
                    fullWidth
                    inputProps={{ maxLength: 10 }}
                  />
                  <div>
                    <p className={classes.remainingCounter}>
                      {tankIdLimit} characters remaining
                    </p>
                  </div>
                </div>
                <div className="pt-20">
                  <TextValidator
                    style={{ paddingTop: "15px" }}
                    className="mb-2"
                    id="desc"
                    label="Description"
                    type="text"
                    name="desc"
                    value={
                      MeetingInfromationForm &&
                      MeetingInfromationForm.description
                        ? MeetingInfromationForm.description
                        : null
                    }
                    onChange={handleMeetingInformationChange("description")}
                    required
                    multiline
                    rows={3}
                    variant="outlined"
                    fullWidth
                    inputProps={{ maxLength: 45 }}
                  />
                  <div>
                    <p className={classes.remainingCounter}>
                      {MetaDataLimit} characters remaining
                    </p>
                  </div>
                </div>
                <div className="pt-20">
                  <TextValidator
                    style={{ paddingTop: "15px" }}
                    className="mb-2"
                    id="canisterId"
                    label="Canister Id"
                    type="text"
                    name="canisterId"
                    value={
                      MeetingInfromationForm &&
                      MeetingInfromationForm.canisterId
                        ? MeetingInfromationForm.canisterId
                        : null
                    }
                    onChange={handleChangeGeneric}
                    variant="outlined"
                    fullWidth
                    inputProps={{ maxLength: 10 }}
                  />
                  <div>
                    <p className={classes.remainingCounter}>
                      {canisterIdLimit} characters remaining
                    </p>
                  </div>
                </div>
                <div className="pt-20">
                  <TextValidator
                    style={{ paddingTop: "15px" }}
                    className="mb-2"
                    id="caneId"
                    label="Cane Id"
                    type="text"
                    name="caneId"
                    value={
                      MeetingInfromationForm && MeetingInfromationForm.caneId
                        ? MeetingInfromationForm.caneId
                        : null
                    }
                    onChange={handleChangeGeneric}
                    variant="outlined"
                    fullWidth
                    inputProps={{ maxLength: 10 }}
                  />
                  <div>
                    <p className={classes.remainingCounter}>
                      {caneIdLimit} characters remaining
                    </p>
                  </div>
                </div>
                <div className="pt-20">
                  <TextValidator
                    style={{ paddingTop: "15px" }}
                    className="mb-2"
                    id="strawId"
                    label="Straw Id"
                    type="text"
                    name="strawId"
                    value={
                      MeetingInfromationForm && MeetingInfromationForm.strawId
                        ? MeetingInfromationForm.strawId
                        : null
                    }
                    onChange={handleChangeGeneric}
                    variant="outlined"
                    fullWidth
                    inputProps={{ maxLength: 10 }}
                  />
                  <div>
                    <p className={classes.remainingCounter}>
                      {strawIdLimit} characters remaining
                    </p>
                  </div>
                </div>
                <div className="pt-20">
                  <TextValidator
                    style={{ paddingTop: "15px" }}
                    className="mb-2"
                    id="colorCode"
                    label="Color Code"
                    type="text"
                    name="colorCode"
                    value={
                      MeetingInfromationForm && MeetingInfromationForm.colorCode
                        ? MeetingInfromationForm.colorCode
                        : null
                    }
                    onChange={handleChangeGeneric}
                    variant="outlined"
                    fullWidth
                    inputProps={{ maxLength: 10 }}
                  />
                  <div>
                    <p className={classes.remainingCounter}>
                      {colorCodeLimit} characters remaining
                    </p>
                  </div>
                </div>
                <div className="pt-20">
                  <TextValidator
                    style={{ paddingTop: "15px" }}
                    className="mb-2"
                    id="indicator"
                    label="Other Indicators"
                    type="text"
                    name="indicator"
                    value={
                      MeetingInfromationForm && MeetingInfromationForm.indicator
                        ? MeetingInfromationForm.indicator
                        : null
                    }
                    onChange={handleChangeGeneric}
                    variant="outlined"
                    fullWidth
                    inputProps={{ maxLength: 10 }}
                  />
                  <div>
                    <p className={classes.remainingCounter}>
                      {indicatorLimit} characters remaining
                    </p>
                  </div>
                </div>

                {/* <div className="pt-20">
                                    <input
                                        accept="image/*"
                                        className={classes.input}
                                        // style={{ display: 'none' }}
                                        id="raised-button-file"
                                        multiple
                                        type="file"
                                        onChange={handleFileUpload()}
                                    />
                                     <label htmlFor="raised-button-file">
                                        <Button variant="raised" component="span" className={classes.button}>
                                            Upload
                                    </Button>
                                    </label> 
                                </div> */}
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <StacksClinic
                    disableFlag={placeHolderFlag()}
                    date={displayTodayDate}
                    time={displayTime}
                    location={LocationData}
                    metaData={MetaData}
                    // selectedClinics={selectedClinics}
                    formClose={CloseMeetingForm}
                    // handleFeedBackClose={handleFeedBackClose}
                    handleEntry={props.handleEntry}
                    notify={props.notify}
                    biorepositoryName={biorepositoryName}
                    biorepositoryLocation={biorepositoryLocation}
                    numberOfSamples={numberOfSamples}
                    tankId={tankId}
                    canisterId={canisterId}
                    caneId={caneId}
                    strawId={strawId}
                    colorCode={colorCode}
                    indicator={indicator}
                    // clinicFirebaseId={clinicFirebaseId}
                    // clinicNames={clinicNames}
                    // address={address}
                  />
                </Grid>
              </ValidatorForm>
            </div>
          </div>
        </div>
      }
      innerScroll
    />
  );
}

export default withReducer("eCommerceApp", reducer)(MeetingFeedBackClinic);
