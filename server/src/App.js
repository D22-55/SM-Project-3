import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AddService from "./components/AddService";
import Reports from "./components/Reports";
import ServicesList from "./components/ServicesList";

const App = () => {
  return (
    <Router>
      <div>
        <h1>Admin Dashboard</h1>
        <Switch>
          <Route path="/users" component={Dashboard} />
          <Route path="/add-service" component={AddService} />
          <Route path="/reports" component={Reports} />
          <Route path="/services" component={ServicesList} />
        </Switch>
      </div>
    </Router>
  );
};

export default App; 