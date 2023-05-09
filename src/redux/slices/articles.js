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
  article: {
    category: "",
    name: "",
    codeLoc: "",
    appCode: "",
    popup: "",
    bootstrap: "",
    catSeq: "",
    pageSeq: "",
    newModal: "",
  },
  currentArticleID: null,
  articlesList: [],
};

const slice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.alertMessage = action.payload.message;
    },

    // GET EVENTS
    getArticleSuccess(state, action) {
      state.isLoading = false;
      state.article = action.payload;
      state.currentArticleID = action.payload.id || action.payload.pageSeq;
    },
    postArticleSuccess(state, action) {
      state.isLoading = false;
      state.articlesList.push(action.payload);
      state.article = initialState.article;
    },
    updateArticleSuccess(state, action) {
      state.isLoading = false;
      const index = state.articlesList?.findIndex((col) => col.id === action.payload.id || col.pageSeq === action.payload.pageSeq);
      if (index > 0 || index === 0) {
        state.articlesList.splice(index, 1);
      }
      state.articlesList.push(action.payload);
      state.article = initialState.article;
    },
    deleteArticleSuccess(state, action) {
      state.isLoading = false;
      const index = state.articlesList?.findIndex((col) => col.id === action.payload || col.pageSeq === action.payload.pageSeq);
      if (index > 0 || index === 0) {
        state.articlesList.splice(index, 1);
      }
    },
    // call api
    getArticlesAPISuccess(state,action){
      state.isLoading = false;
      state.articlesList = action.payload;
      // state.currentArticleID = action.payload[action.payload.length - 1].id || action.payload[action.payload.length - 1].pageSeq ;
      state.alertMessage = "";
    },
    postArticlesAPISuccess(state, action) {
      state.alertMessage = action.payload.message;
    },
    putArticlesAPISuccess(state, action) {
      state.alertMessage = action.payload.message;
    },
    deleteArticlesAPISuccess(state, action) {
      state.alertMessage = action.payload.message;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getArticle(articleObj) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(slice.actions.getArticleSuccess(articleObj));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function postArticle(articleObj) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(slice.actions.postArticleSuccess(articleObj));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function updateArticle(articleObj) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(slice.actions.updateArticleSuccess(articleObj));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function clearArticle(articleObj) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(slice.actions.getArticleSuccess(articleObj));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function deleteArticle(articleObjID) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(slice.actions.deleteArticleSuccess(articleObjID));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// api calls
export function getArticlesAPI() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/articles`);
      dispatch(slice.actions.getArticlesAPISuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };

}



export function postArticlesAPI(postObj) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/articles`, postObj);
      dispatch(slice.actions.postArticlesAPISuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };

}
export function putArtilcesAPI(id, putObj) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/articles/${id}`, putObj);
      dispatch(slice.actions.putArticlesAPISuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };

}
export function deleteArticlesAPI(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`/articles/${id}`);
      dispatch(slice.actions.deleteArticlesAPISuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };

}
// ----------------------------------------------------------------------
