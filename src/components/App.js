import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Landing from './Landing/Landing';
import Dashboard from './Dashboard/Dashboard';

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <>
        <Switch>
          <Route exact path="/" component={Landing} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/dashboard/journals/new" component={Dashboard} />
        </Switch>
      </>
    );
  }
}

export default App;
