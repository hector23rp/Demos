import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Auth from "./pages/auth";
import "./style.scss"

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Auth />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
