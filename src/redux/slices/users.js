import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  alertMessage : "",
  currentauth0Id : "",
  user: {
    id: "",
    userId: "", userLogin: '',
    password: "",
    confirmPassword: "", email: '',
    firstName: "",
    lastName: "",
    role: "",
    title:"",
    username:"",
    custNoAllowed: "",
    chargeCustAllowed: "",
    // usStatsCustAllowed: "",
    // chargeCust: "",
    // usExceptionCodes: "",
    // usPartsCustNo: "",
    // accountTeamMail: "",
    // usScannedDocsCustNo: "",
    // exportStatsCustNoAllowed: "",
    // exportBookingTemplateCustNo: "",
    // exportBookingNotifyEmailAddress: "",
    // ISFCustNo: "",
    // ISFBranch: "",
    // ISFDepartment: "",
    AGENTBOOK: false,
    AGENTTEMP: false,
    AMAZFBA: false,
    ARSTMT: false,
    BKAPPCN: false,
    BMM_NEW: false,
    BOOKACTION: false,
    BOOKAPP: false,
    CAM_BULK: false,
    CLASSAD: false,
    CUSTPROF: false,
    DASHCNFR: false,
    DASHCONT: false,
    DASHDOAU: false,
    DASHMQC: false,
    DASHORDT: false,
    DASHPOM: false,
    DASHSHIP: false,
    DASHTEST: false,
    DASHTRAN: false,
    EDASH: false,
    EXPBOOK: false,
    EXPLIC: false,
    EXPTEMPL: false,
    EXPTRACK: false,
    IMPPER: false,
    ISFPORTAL: false,
    ISFTEMPL: false,
    IT: false,
    IT_CN: false,
    LANDCOST: false,
    ONLINEPAY: false,
    PARTS: false,
    QUOTE: false,
    REPORT: false,
    SAILADMIN: false,
    SELECTSAIL: false,
    SHIPTRACK: false,
    SNAPSHOT: false,
    TRANDASH: false,
    TRUCKPORT: false,
    USP: false,
    WAREWITH: false,
    FDVAL: false,
    POACTION: false,
    POASSIGN: false,
    POBOOK: false,
    POCONSIG: false,
    POCONSOL: false,
    PODASH: false,
    POINQUIRE: false,
    POINQUIRE_CN: false,
    POTRACK: false,
    POTRANSIT: false,
    POVENDOR: false,
  },
  currentuserId: null,
  usersList: [
    {
      id: "", userId: 1, userLogin: 'Mike', email: 'Mike@gmail.com', programsToAccess: 35,
      custNoAllowed: "FDSALES",
      chargeCustAllowed: "",
      AGENTBOOK: false,
      AGENTTEMP: true,
      AMAZFBA: false,
      ARSTMT: false,
      BKAPPCN: true,
      BMM_NEW: false,
      BOOKACTION: false,
      BOOKAPP: false,
      CAM_BULK: true,
      CLASSAD: false,
      CUSTPROF: true,
      DASHCNFR: false,
      DASHCONT: true,
      DASHDOAU: false,
      DASHMQC: false,
      DASHORDT: true,
      DASHPOM: false,
      DASHSHIP: false,
      DASHTEST: true,
      DASHTRAN: false,
      EDASH: false,
      EXPBOOK: false,
      EXPLIC: false,
      EXPTEMPL: true,
      EXPTRACK: false,
      IMPPER: true,
      ISFPORTAL: false,
      ISFTEMPL: true,
      IT: false,
      IT_CN: true,
      LANDCOST: false,
      ONLINEPAY: false,
      PARTS: true,
      QUOTE: false,
      REPORT: true,
      SAILADMIN: false,
      SELECTSAIL: false,
      SHIPTRACK: false,
      SNAPSHOT: true,
      TRANDASH: false,
      TRUCKPORT: true,
      USP: false,
      WAREWITH: true,
      FDVAL: false,
      POACTION: false,
      POASSIGN: false,
      POBOOK: true,
      POCONSIG: false,
      POCONSOL: true,
      PODASH: false,
      POINQUIRE: true,
      POINQUIRE_CN: false,
      POTRACK: true,
      POTRANSIT: false,
      POVENDOR: true,
    },
    {
      id: "", userId: 2, userLogin: 'Russel', email: 'Russel@gmail.com', programsToAccess: 35,
      custNoAllowed: "FDSALES",
      chargeCustAllowed: "",
      AGENTBOOK: false,
      AGENTTEMP: true,
      AMAZFBA: false,
      ARSTMT: false,
      BKAPPCN: true,
      BMM_NEW: false,
      BOOKACTION: false,
      BOOKAPP: false,
      CAM_BULK: true,
      CLASSAD: false,
      CUSTPROF: true,
      DASHCNFR: false,
      DASHCONT: true,
      DASHDOAU: false,
      DASHMQC: false,
      DASHORDT: true,
      DASHPOM: false,
      DASHSHIP: false,
      DASHTEST: true,
      DASHTRAN: false,
      EDASH: false,
      EXPBOOK: false,
      EXPLIC: false,
      EXPTEMPL: true,
      EXPTRACK: false,
      IMPPER: true,
      ISFPORTAL: false,
      ISFTEMPL: true,
      IT: false,
      IT_CN: true,
      LANDCOST: false,
      ONLINEPAY: false,
      PARTS: true,
      QUOTE: false,
      REPORT: true,
      SAILADMIN: false,
      SELECTSAIL: false,
      SHIPTRACK: false,
      SNAPSHOT: true,
      TRANDASH: false,
      TRUCKPORT: true,
      USP: false,
      WAREWITH: true,
      FDVAL: false,
      POACTION: false,
      POASSIGN: false,
      POBOOK: true,
      POCONSIG: false,
      POCONSOL: true,
      PODASH: false,
      POINQUIRE: true,
      POINQUIRE_CN: false,
      POTRACK: true,
      POTRANSIT: false,
      POVENDOR: true,
    },
    {
      id: "", userId: 3, userLogin: 'Rodolfo', email: 'Rodolfo@gmail.com', programsToAccess: 35,
      custNoAllowed: "FDSALES",
      chargeCustAllowed: "",
      AGENTBOOK: false,
      AGENTTEMP: true,
      AMAZFBA: false,
      ARSTMT: false,
      BKAPPCN: true,
      BMM_NEW: false,
      BOOKACTION: false,
      BOOKAPP: false,
      CAM_BULK: true,
      CLASSAD: false,
      CUSTPROF: true,
      DASHCNFR: false,
      DASHCONT: true,
      DASHDOAU: false,
      DASHMQC: false,
      DASHORDT: true,
      DASHPOM: false,
      DASHSHIP: false,
      DASHTEST: true,
      DASHTRAN: false,
      EDASH: false,
      EXPBOOK: false,
      EXPLIC: false,
      EXPTEMPL: true,
      EXPTRACK: false,
      IMPPER: true,
      ISFPORTAL: false,
      ISFTEMPL: true,
      IT: false,
      IT_CN: true,
      LANDCOST: false,
      ONLINEPAY: false,
      PARTS: true,
      QUOTE: false,
      REPORT: true,
      SAILADMIN: false,
      SELECTSAIL: false,
      SHIPTRACK: false,
      SNAPSHOT: true,
      TRANDASH: false,
      TRUCKPORT: true,
      USP: false,
      WAREWITH: true,
      FDVAL: false,
      POACTION: false,
      POASSIGN: false,
      POBOOK: true,
      POCONSIG: false,
      POCONSOL: true,
      PODASH: false,
      POINQUIRE: true,
      POINQUIRE_CN: false,
      POTRACK: true,
      POTRANSIT: false,
      POVENDOR: true,
    },
    {
      id: "", userId: 4, userLogin: 'Chandu', email: 'Chandu@gmail.com', programsToAccess: 35,
      custNoAllowed: "FDSALES",
      chargeCustAllowed: "",
      AGENTBOOK: false,
      AGENTTEMP: true,
      AMAZFBA: false,
      ARSTMT: false,
      BKAPPCN: true,
      BMM_NEW: false,
      BOOKACTION: false,
      BOOKAPP: false,
      CAM_BULK: true,
      CLASSAD: false,
      CUSTPROF: true,
      DASHCNFR: false,
      DASHCONT: true,
      DASHDOAU: false,
      DASHMQC: false,
      DASHORDT: true,
      DASHPOM: false,
      DASHSHIP: false,
      DASHTEST: true,
      DASHTRAN: false,
      EDASH: false,
      EXPBOOK: false,
      EXPLIC: false,
      EXPTEMPL: true,
      EXPTRACK: false,
      IMPPER: true,
      ISFPORTAL: false,
      ISFTEMPL: true,
      IT: false,
      IT_CN: true,
      LANDCOST: false,
      ONLINEPAY: false,
      PARTS: true,
      QUOTE: false,
      REPORT: true,
      SAILADMIN: false,
      SELECTSAIL: false,
      SHIPTRACK: false,
      SNAPSHOT: true,
      TRANDASH: false,
      TRUCKPORT: true,
      USP: false,
      WAREWITH: true,
      FDVAL: false,
      POACTION: false,
      POASSIGN: false,
      POBOOK: true,
      POCONSIG: false,
      POCONSOL: true,
      PODASH: false,
      POINQUIRE: true,
      POINQUIRE_CN: false,
      POTRACK: true,
      POTRANSIT: false,
      POVENDOR: true,
    },
    {
      id: "", userId: 5, userLogin: 'Pulkit', email: 'Pulkit@gmail.com', programsToAccess: 35,
      custNoAllowed: "FDSALES",
      chargeCustAllowed: "",
      AGENTBOOK: false,
      AGENTTEMP: true,
      AMAZFBA: false,
      ARSTMT: false,
      BKAPPCN: true,
      BMM_NEW: false,
      BOOKACTION: false,
      BOOKAPP: false,
      CAM_BULK: true,
      CLASSAD: false,
      CUSTPROF: true,
      DASHCNFR: false,
      DASHCONT: true,
      DASHDOAU: false,
      DASHMQC: false,
      DASHORDT: true,
      DASHPOM: false,
      DASHSHIP: false,
      DASHTEST: true,
      DASHTRAN: false,
      EDASH: false,
      EXPBOOK: false,
      EXPLIC: false,
      EXPTEMPL: true,
      EXPTRACK: false,
      IMPPER: true,
      ISFPORTAL: false,
      ISFTEMPL: true,
      IT: false,
      IT_CN: true,
      LANDCOST: false,
      ONLINEPAY: false,
      PARTS: true,
      QUOTE: false,
      REPORT: true,
      SAILADMIN: false,
      SELECTSAIL: false,
      SHIPTRACK: false,
      SNAPSHOT: true,
      TRANDASH: false,
      TRUCKPORT: true,
      USP: false,
      WAREWITH: true,
      FDVAL: false,
      POACTION: false,
      POASSIGN: false,
      POBOOK: true,
      POCONSIG: false,
      POCONSOL: true,
      PODASH: false,
      POINQUIRE: true,
      POINQUIRE_CN: false,
      POTRACK: true,
      POTRANSIT: false,
      POVENDOR: true,
    }
  ],
  usersAPIList: [],
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
      state.alertMessage = "";
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.alertMessage = action.payload.message;
    },

    // GET EVENTS
    getUserSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload;
      console.log(state.user.id);
      state.currentuserId = action.payload.id;
      state.currentauth0Id = (action.payload?.auth0Id) ? action.payload?.auth0Id : "";
    },
    postUserSuccess(state, action) {
      state.isLoading = false;
      state.usersAPIList.push(action.payload);
      state.currentuserId = action.payload.userId;
      state.currentauth0Id = (action.payload?.auth0Id) ? action.payload?.auth0Id : "";
      // state.user = initialState.user;
    },
    updateUserSuccess(state, action) {
      state.isLoading = false;
      const index = state.usersAPIList?.findIndex((col) => col.id === action.payload.id);
      if (index > 0 || index === 0) {
        state.usersAPIList.splice(index, 1);
      }
      state.usersAPIList.push(action.payload);
      // state.user = initialState.user;
    },
    deleteUserSuccess(state, action) {
      state.isLoading = false;
      const index = state.usersAPIList?.findIndex((col) => col.id === action.payload);
      if (index > 0 || index === 0) {
        state.usersAPIList.splice(index, 1);
      }
    },
    // api success calls
    getUsersAPISuccess(state, action) {
      state.isLoading = false;
      state.usersAPIList = action.payload;
      state.alertMessage = "";
      state.currentuserId = action.payload[action.payload.length - 1].id;
      state.currentauth0Id = (action.payload[action.payload.length - 1]?.auth0Id) ? action.payload[action.payload.length - 1].auth0Id : "";
    },
    postUsersAPISuccess(state, action) {
      state.alertMessage = action.payload.message;
    },
    putUsersAPISuccess(state, action) {
      state.alertMessage = action.payload.message;
    },
    deleteUsersAPISuccess(state, action) {
      state.alertMessage = action.payload.message;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getUser(userObj) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(slice.actions.getUserSuccess(userObj));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function postUser(userObj) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(slice.actions.postUserSuccess(userObj));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function updateUser(userObj) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(slice.actions.updateUserSuccess(userObj));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function clearUser(userObj) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(slice.actions.getUserSuccess(userObj));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function deleteUser(userObjID) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(slice.actions.deleteUserSuccess(userObjID));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// api calls
export function getUsersAPI() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/users`);
      console.log("API call for get users", response);
      dispatch(slice.actions.getUsersAPISuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };

}
export function postUsersAPI(postObj) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/users`, postObj);
      console.log("API call for post users", response);
      dispatch(slice.actions.postUsersAPISuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };

}
export function putUsersAPI(id, putObj) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/users/${id}`, putObj);
      console.log("API call for post users", response);
      dispatch(slice.actions.putUsersAPISuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };

}
export function deleteUsersAPI(id,auth0Id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`/users/${id}`,{data:{auth0Id}});
      dispatch(slice.actions.deleteUsersAPISuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };

}

// ----------------------------------------------------------------------
