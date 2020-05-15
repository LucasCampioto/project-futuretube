import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import videos from './videoReducer'

export const generateReducers = history =>
  combineReducers({
    router: connectRouter(history),
    videos,
  });