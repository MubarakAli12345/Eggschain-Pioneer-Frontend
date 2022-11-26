import firebaseService from "app/services/firebaseService";
import * as UserActions from "./user.actions";
import * as Actions from "app/store/actions";
import jwtService from "app/services/jwtService";
import { API_BASE_URL } from "app/main/api-config/api";
import Axios from "axios";
// import { useState } from "react";

export const REGISTER_ERROR = "REGISTER_ERROR";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";

export function submitRegister({ displayName, password, email }) {
  return (dispatch) =>
    jwtService
      .createUser({
        displayName,
        password,
        email,
      })
      .then((user) => {
        dispatch(UserActions.setUserData(user));
        return dispatch({
          type: REGISTER_SUCCESS,
        });
      })
      .catch((error) => {
        return dispatch({
          type: REGISTER_ERROR,
          payload: error,
        });
      });
}

export function registerWithFirebase(model, dateString) {
  // const [dateString,setDateString]=useState({date:'',month:'',year:''})
  const { email, password, fullName, phoneNumber, role } = model;
  console.log("Date String", dateString);

  var showDate = new Date();

  var dateStringg = {
    date: showDate.getDate().toString(),
    month: showDate.getMonth().toString(),
    year: showDate.getFullYear().toString(),
  };
  // setDateString({date:showDate.getDate(),month:showDate.getMonth(),year:showDate.getFullYear()})
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
  return (dispatch) =>
    firebaseService.auth &&
    firebaseService.auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        Axios({
          method: "post",
          url: `${API_BASE_URL}auth/signup`,
          data: {
            fullName: fullName,
            email: email,
            phoneNumber: phoneNumber,
            role: "user",
            firebaseId: response.user.uid,
            isUserDisabled: false,
            time: displayTime,
            date: displayTodayDate,
            dateString: dateString,
            firstLogin: "true",
          },
        }).then((res) => {
          if (res.status === 200) {
            window.location.reload();
            dispatch(
              Actions.showMessage({
                message: "Your account has been successfully created",
                variant: "success",
              })
            );
          } else {
            dispatch(
              Actions.showMessage({
                message: res.errorMessage,
                variant: "error",
              })
            );
          }
        });

        dispatch(
          UserActions.createUserSettingsFirebase({
            ...response.user,
            fullName,
            email,
          })
        );

        return dispatch({
          type: REGISTER_SUCCESS,
        });
      })
      .catch((error) => {
        const usernameErrorCodes = [
          "auth/operation-not-allowed",
          "auth/user-not-found",
          "auth/user-disabled",
        ];

        const emailErrorCodes = [
          "auth/email-already-in-use",
          "auth/invalid-email",
        ];

        const passwordErrorCodes = [
          "auth/weak-password",
          "auth/wrong-password",
        ];

        const response = {
          email: emailErrorCodes.includes(error.code) ? error.message : null,
          displayName: usernameErrorCodes.includes(error.code)
            ? error.message
            : null,
          password: passwordErrorCodes.includes(error.code)
            ? error.message
            : null,
        };

        if (error.code === "auth/invalid-api-key") {
          dispatch(Actions.showMessage({ message: error.message }));
        }

        return dispatch({
          type: REGISTER_ERROR,
          payload: response,
        });
      });
}
