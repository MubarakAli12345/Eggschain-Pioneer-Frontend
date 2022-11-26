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

function MeetingFeedBack(props) {
  const [MetaDataLimit, setMetaDataLimit] = useState(140);
  const [LocationLimit, setLocationLimit] = useState(50);

  const [MetaData, setMetaData] = useState("");
  const [LocationData, setLocationData] = useState("");
  const [clinicNames, setClinicNames] = useState([]);
  const { CloseMeetingForm } = props;
  const [selectedClinics, setSelectedClinics] = useState("");
  const [open, setOpen] = useState(false);
  const [addressLoc, setAddressLoc] = useState("");
  const [address, setAddress] = useState({ label: "", value: "" });
  const [clinicEmail, setClinicEmail] = useState("");
  const [clinicName, setClinicName] = useState("");

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
      .filter((person) => person.role === "clinic")
      .map((filteredPerson) => ({
        // console.log("Filtered",filteredPerson)
        id: filteredPerson.fullName,
        title: filteredPerson.fullName,
        FirebaseId: filteredPerson.firebaseId,
      }));

    //  const jsonn=await setClinic.json();
    setClinicNames(setClinic);
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
    const MAX_CHARS = 140;
    const remaining = MAX_CHARS - e.target.value.length;
    setMetaData(e.target.value);
    setMetaDataLimit(remaining);
  };
  const handleLocationChange = (input) => (e) => {
    const MAX_CHARS = 50;
    const remaining = MAX_CHARS - e.target.value.length;
    setLocationData(e.target.value);

    setLocationLimit(remaining);
  };

  const handleFileUpload = () => (e) => {
    // console.log("EVENT", e.target);
  };
  const handleSelect = (value) => {
    console.log("Valueeeeeeeeeeeeeeeeeeees", value);
    setAddressLoc(value);
    setAddress({ label: value, value: value });

    setTimeout(() => {
      console.log("Adrees Hook", address);
    }, 2000);
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
  useEffect(() => {
    getSignupUser();
  }, []);
  const selectedClinicsOnChange = async (e) => {
    setSelectedClinics(e.target.value);
    let use;
    use = await apiService.getApi(`${API_BASE_URL}auth/getUsers`);
    let filter = use.filter((res) => res.fullName === e.target.value);
    setClinicName(filter[0].fullName);
    setClinicEmail(filter[0].email);
    console.log("Filterssss", filter[0].email);
    // localStorage.setItem("clinicName", filter[0].fullName);
    // localStorage.setItem("clinicEmail", filter[0].email);
    console.log(
      "Check Storage Clinic Name",
      localStorage.getItem("clinicName")
    );
  };
  const placeHolderFlag = () => {
    if (MetaDataLimit == 140 || !addressLoc || !selectedClinics) {
      return true;
    } else {
      return false;
    }
  };
  const location_search_input = {
    height: "30px",
    marginTop: "37px",
    width: "98.5%",
  };
  const input_suggestions = {
    width: "80%",
    height: "auto",
    // background: 'none',
    // border: '1px solid black',
    // borderRadius: '5px',
    // fontSize: '1.5rem',
    // color: 'black',

    // marginTop: '14px',
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
                    Clinics
                  </InputLabel>
                  <Select
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    label="Clinics"
                    name="clinics"
                    required
                    multiline
                    rows={1}
                    variant="outlined"
                    fullWidth
                    inputProps={{ maxLength: 50 }}
                    onChange={selectedClinicsOnChange}
                    value={selectedClinics}
                  >
                    {clinicNames.map((categoria) => (
                      <MenuItem key={categoria.id} value={categoria.title}>
                        {categoria.title} {categoria.firebaseId}
                      </MenuItem>
                    ))}
                  </Select>
                </div>

                {/* <PlacesAutocomplete
                value={address}
                onChange={handleChange}
                // onSelect={this.handleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <input
                      style={location_search_input}
                      {...getInputProps({
                        placeholder: "Search Places ...",
                        className: "location-search-input",
                      })}
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: "#fafafa", cursor: "pointer" }
                          : { backgroundColor: "#ffffff", cursor: "pointer" };
                        return (
                          <div
                            style={input_suggestions}
                            {...getSuggestionItemProps(suggestion, {})}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>  */}
                {console.log("Address", address)}
                <PlacesAutocomplete
                  value={addressLoc}
                  onChange={setAddressLoc}
                  onSelect={handleSelect}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => (
                    <div>
                      <input
                        style={location_search_input}
                        {...getInputProps({
                          placeholder: "Address of Specimen",
                          className: "location-search-input",
                        })}
                      />
                      <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion) => {
                          const className = suggestion.active
                            ? "suggestion-item--active"
                            : "suggestion-item";
                          // inline style for demonstration purpose
                          const style = suggestion.active
                            ? { backgroundColor: "#fafafa", cursor: "pointer" }
                            : { backgroundColor: "#ffffff", cursor: "pointer" };
                          return (
                            <div
                              style={input_suggestions}
                              {...getSuggestionItemProps(suggestion, {})}
                            >
                              <span>{suggestion.description}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>

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
                    inputProps={{ maxLength: 140 }}
                  />
                  <div>
                    <p className={classes.remainingCounter}>
                      {MetaDataLimit} characters remaining
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
                  <Stacks
                    disableFlag={placeHolderFlag()}
                    date={displayTodayDate}
                    time={displayTime}
                    location={LocationData}
                    metaData={MetaData}
                    selectedClinics={selectedClinics.toString()}
                    formClose={CloseMeetingForm}
                    handleFeedBackClose={handleFeedBackClose}
                    handleEntry={props.handleEntry}
                    clinicFirebaseId={clinicFirebaseId}
                    clinicNames={clinicNames}
                    address={address}
                    clinicEmail={clinicEmail}
                    clinicName={clinicName.toString()}
                    userEmail={userData.email}
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

export default withReducer("eCommerceApp", reducer)(MeetingFeedBack);
