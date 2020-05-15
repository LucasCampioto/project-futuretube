import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../LoginPage/index";
import SignUp from "../SignUpPage/index"
import FeedPage from "../FeedPage";
import SendVideo from "../SendVideo";
import EditVideoPage from "../EditVideoPage";
import {ChangePassword} from "../ChangePassword";
import VideosDetails from "../VideosDetails";

export const routes = {
    loginPage: "/",
    signUpPage: "/signup",
    feed:"/feed",
    sendVideo:"/sendvideo",
    editVideo:"/editvideo",
    videosDetails: "/videodetails",
    changePassword:"/changePassword"
}; 

function Router(props) {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
          <Route exact path={routes.loginPage} component={LoginPage} />
          <Route exact path={routes.signUpPage} component={SignUp} />
          <Route exact path={routes.feed} component={FeedPage} />
          <Route exact path={routes.sendVideo} component={SendVideo} />
          <Route exact path={routes.editVideo} component={EditVideoPage} />
          <Route exact path={routes.videosDetails} component={VideosDetails} />
          <Route exact path={routes.changePassword} component={ChangePassword} />
      </Switch>
    </ConnectedRouter>
  );
}

export default Router;