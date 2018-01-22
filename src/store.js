import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import {
  STATUSES,
  FETCHING_STATUSES,
  TITLE_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  DESCRIPTION_MAX_LENGTH,
  SAVE_DATA,
  SAVE_SUCCESS,
  UPDATE_TITLE,
  UPDATE_DESCRIPTION,
  UPDATE_EMAIL,
  VALIDATE,
  SAVE_ERROR
} from "./constants";
import { validationData } from "./validation";

const defaultState = {
  savingState: FETCHING_STATUSES.IDLE,
  id: null,
  title: "",
  email: "",
  description: "",
  errorMessage: "",
  hasErrors: false,
  validationMessages: {}
};

const toIdleState = state => ({
  ...state,
  savingState: FETCHING_STATUSES.IDLE
});

const toRequestingState = state => ({
  ...state,
  savingState: FETCHING_STATUSES.SAVING
});

const savingReducer = (state, action) => {
  switch (action.type) {
    case SAVE_ERROR:
      return {
        ...toIdleState(state),
        errorMessage: "Something went wrong!"
      };
    case SAVE_SUCCESS:
      return toIdleState(state);
    default:
      return state;
  }
};

const updateReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_TITLE:
      return {
        ...state,
        title: action.title
      };
    case UPDATE_DESCRIPTION:
      return {
        ...state,
        description: action.description
      };
    case UPDATE_EMAIL:
      return {
        ...state,
        email: action.email
      };
    default:
      return state;
  }
};

const idleReducer = (state, action) => {
  switch (action.type) {
    case VALIDATE:
      const validationMessages = validationData(state);
      return {
        ...state,
        validationMessages,
        hasErrors: validationMessages.hasErrors
      };
    case SAVE_DATA:
      return toRequestingState(state);
    default:
      return state;
  }
};

const rootReducer = (state = defaultState, action) => {
  const baseState = updateReducer(state, action);
  switch (baseState.savingState) {
    case FETCHING_STATUSES.IDLE:
      return idleReducer(baseState, action);
    case FETCHING_STATUSES.SAVING:
      return savingReducer(baseState, action);
    default:
      return baseState;
  }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const getStore = () => {
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunkMiddleware))
  );
};

export default getStore;
