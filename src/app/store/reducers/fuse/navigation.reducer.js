import * as Actions from "../../actions/fuse/index";
import navigationConfig from "app/fuse-configs/navigationConfig";

const initialState = navigationConfig;

const navigation = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_NAVIGATION: {
      console.log("Get", localStorage.getItem("role"));
      if (localStorage.getItem("role" === "clinic")) {
        return [...state];
      }
    }
    case Actions.SET_NAVIGATION: {
      console.log("Set", localStorage.getItem("role"));
      if (localStorage.getItem("role" === "clinic")) {
        return [...action.navigation];
      }
    }
    case Actions.RESET_NAVIGATION: {
      return [...initialState];
    }
    default: {
      return state;
    }
  }
};

export default navigation;
