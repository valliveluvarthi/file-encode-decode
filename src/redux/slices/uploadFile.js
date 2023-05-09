import { createSlice } from '@reduxjs/toolkit';
// utils
import fileDownload from 'js-file-download';
import { isJSDocNullableType } from 'typescript';
import axios from '../../utils/axios';
//
import { dispatch } from '../store';


// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  alertMessage: "",
  base64str: null,
  ext: "",
};

const slice = createSlice({
  name: 'uploadFile',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
      state.base64str = null;
      state.ext = "";
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.alertMessage = action.payload.message || action.payload;
    },


    // call api
    getUploadFileSuccess(state, action) {
      console.log(action.payload);
      state.isLoading = false;
      state.base64str = action.payload.data.base64str;
      state.ext = action.payload.data.sourcetype;
      state.alertMessage = action.payload.data.message;
    },
    getDownloadFileSuccess(state, action) {
      console.log(action.payload);
      state.alertMessage = "File Downloaded";
    },
    getDecodeFileSuccess(state, action) {
      console.log(action.payload);
      state.alertMessage = action.payload.data.message;
    },
    getClearInitialStateSuccess(state, action) {
      state.alertMessage = "";
      state.base64str = null;
      state.ext = "";
      state.isLoading = false;
    }
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

// api calls

export function clearInitialState() {
  return async () => {
    // dispatch(slice.actions.startLoading());
    try {
      dispatch(slice.actions.getClearInitialStateSuccess());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function uploadFile(formData) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/upload`, formData);
      dispatch(slice.actions.getUploadFileSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function decodeFile(postobj) {
  return async () => {
    // dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/decode`, postobj);
      dispatch(slice.actions.getDecodeFileSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function downloadFile(value) {
  return async () => {
    // dispatch(slice.actions.startLoading());
    try {
      //   const response = await axios.post(`/download`, {filename : value});
      //   const response = await axios.get(`/download`);
      // const response = await axios({
      //   url: `http://localhost:4004/download/${value}`,
      //   method: 'GET',
      //   responseType: 'blob', // important
      // }).then((response) => {
      //   console.log(response);
      //   const url = window.URL.createObjectURL(new Blob([response.data]));
      //   const link = document.createElement('a');
      //   link.href = url;
      //   link.setAttribute('download', value);
      //   document.body.appendChild(link);
      //   link.click();
      //   document.body.removeChild(link);
      // });
      const response = await axios.get(`http://localhost:4005/download/${value}`, {
        responseType: 'blob',
      })
      .then((res) => {
        fileDownload(res?.data, value)
      })
      dispatch(slice.actions.getDownloadFileSuccess(response?.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
// ----------------------------------------------------------------------
