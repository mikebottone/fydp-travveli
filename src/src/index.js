/*!

=========================================================
* Paper Kit PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-pro-react
* Copyright 2019 Creative Tim (http://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss";
import "assets/demo/demo.css";
import "assets/demo/react-demo.css";
// pages
// import ProjectTest from "views/app/ProjectTest.js;"
import ActivitiesPage from "views/app/ActivitiesPage.js";
import ActivityCategoryPage from "views/app/ActivityCategoryPage.js";
import ActivitySpecificPage from "views/app/ActivitySpecificPage.js";
import DetailedActivityPage from "views/app/DetailedActivityPage.js";
import FavouritesPage from "views/app/Favourites.js";
import Homepage from "views/app/Homepage.js";
import LandingPage from "views/app/LandingPage.js";
import LocationCityPage from "views/app/LocationCityPage.js";
import LocationCountryPage from "views/app/LocationCountryPage.js";
import LocationsPage from "views/app/LocationsPage.js";
import LoginPage from "views/app/LoginPage.js";
import MoodsPage from "views/app/MoodsPage.js";
import MoodSpecificPage from "views/app/MoodSpecificPage.js";
import ProfilePage from "views/app/ProfilePage.js";
import RegisterPage from "views/app/RegisterPage.js";
import Settings from "views/app/Settings.js";

import NucleoIcons from "views/NucleoIcons.js";

// others

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/activities" render={props => <ActivitiesPage {...props} />} />
      <Route path="/activity-category" render={props => <ActivityCategoryPage {...props} />} />
      <Route path="/activity-specific" render={props => <ActivitySpecificPage {...props} />} />
      <Route path="/detailed-activity" render={props => <DetailedActivityPage {...props} />} />
      <Route path="/favourites" render={props => <FavouritesPage {...props} />} />
      <Route path="/homepage" render={props => <Homepage {...props} />} />
      <Route path="/city" render={props => <LocationCityPage {...props} />} />
      <Route path="/country" render={props => <LocationCountryPage {...props} />} />
      <Route path="/landing-page" render={props => <LandingPage {...props} />} />
      <Route path="/locations" render={props => <LocationsPage {...props} />} />
      <Route path="/login-page" render={props => <LoginPage {...props} />} />
      <Route path="/moods" render={props => <MoodsPage {...props} />} />
      <Route path="/mood-specific" render={props => <MoodSpecificPage {...props} />} />
      <Route path="/profile-page" render={props => <ProfilePage {...props} />} />
      <Route path="/register-page" render={props => <RegisterPage {...props} />} />
      <Route path="/settings" render={props => <Settings {...props} />} />

      <Route path="/nucleo-icons" render={props => <NucleoIcons {...props} />} />

      <Redirect to="/landing-page" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
