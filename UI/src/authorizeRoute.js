import React from "react";

import { AUTHOR_STORAGE } from "./common/author";
import { getItem } from "common/storage";
import { Redirect, Route } from "react-router-dom";

const AuthorizeRoute = ({ ...rest }) => {
  const token = getItem(AUTHOR_STORAGE.TOKEN);

  if (!token) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} />;
};

export default AuthorizeRoute;
