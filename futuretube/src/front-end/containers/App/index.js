import React from "react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import {
  MuiThemeProvider,
  createGenerateClassName,
  jssPreset,
  CssBaseline
} from "@material-ui/core";
import JssProvider from "react-jss/lib/JssProvider";
import { create } from "jss";
import theme from "../../style/theme";
import Router from "../Router/index";
import { createBrowserHistory } from "history";
import { createStore, applyMiddleware, compose } from "redux";
import { generateReducers } from "../../reducers/index";
import { routerMiddleware } from "connected-react-router";
import * as firebase from "firebase/app";

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById("jss-insertion-point")
});

export const history = createBrowserHistory();

const middlewares = [
  applyMiddleware(routerMiddleware(history), thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
];

const store = createStore(generateReducers(history), compose(...middlewares));

var firebaseConfig = {
  apiKey: "AIzaSyAzSE7txxxYpI-GhUk_5z8i06XXNdl8zqQ",
  authDomain: "futuretube-projeto.firebaseapp.com",
  databaseURL: "https://futuretube-projeto.firebaseio.com",
  projectId: "futuretube-projeto",
  storageBucket: "futuretube-projeto.appspot.com",
  messagingSenderId: "111231734594",
  appId: "1:111231734594:web:81e59b86224ddf47f9eedb"
};

firebase.initializeApp(firebaseConfig);

export const App = () => (
  <Provider store={store}>
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router history={history} />
      </MuiThemeProvider>
    </JssProvider>
  </Provider>
);

export default App;