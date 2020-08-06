import React from 'react';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import { Switch, Route } from 'react-router-dom'
import AuthenticatedRoute from './session/AuthenticatedRoute';



function App() {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <AuthenticatedRoute exact path="/dashboard" component={Dashboard} />
    </Switch>

  );
}

export default App;
