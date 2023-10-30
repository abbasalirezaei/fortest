import React from 'react'

import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import PrivateRoute from "./utils/PrivateRoute"

import { AuthProvider } from './context/AuthContext'

import Homepage from './views/Homepage'
import Registerpage from './views/Registerpage'
import Loginpage from './views/Loginpage'
import Dashboard from './views/Dashboard'
import Navbar from './views/Navbar'
import TodoList from './views/Todo/TodoList'

import { QueryClientProvider,queryClient1 } from './utils/queryClient';


function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient1}>
      <AuthProvider>
        < Navbar/>
        <Switch>
          <PrivateRoute component={Dashboard} path="/dashboard" exact />
          <Route component={Registerpage} path="/register" exact />
          <Route component={Loginpage} path="/login" />
          <Route component={TodoList} path="/todos" />
          <Route component={Homepage} path="/" exact />
        </Switch>
      </AuthProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
