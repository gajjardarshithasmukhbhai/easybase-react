/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import ebconfig from "./ebconfig.json";
import ebconfig2 from "./ebconfig2";
import { EasybaseProvider, Auth, useEasybase } from 'easybase-react';
import QueryExample from "./QueryExample";
import FunctionExample from "./CloudFunctionExample";
import DbExample from "./DbExample";
import "./styles.css";
import {
  HashRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ProjectUser from "./ProjectUser";
import UseReturnExample from './UseReturnExample';
import UseReturnStressTest from './UseReturnStressTest';
import 'semantic-ui-css/semantic.min.css'

const IntegrationExample = () => {
  React.useEffect(() => console.log("MOUNTING INTEGRATION EXAMPLE"), []);
  return (
    <EasybaseProvider ebconfig={ebconfig} options={{ logging: false }}>
      <h2>Visual Query</h2>
      <QueryExample />
      <hr className="m-4" />
      <h2>Function</h2>
      <FunctionExample />
      <hr className="m-4" />
      <h2>Db</h2>
      <DbExample />
      <hr className="m-4" />
      <h2>Use Return</h2>
      <UseReturnExample />
    </EasybaseProvider>
  )
}

const ProjectExample = () => {
  React.useEffect(() => console.log("MOUNTING PROJECT EXAMPLE"), []);
  return (
    <EasybaseProvider ebconfig={ebconfig2} options={{ logging: true }}>
      <ProjectUser />
    </EasybaseProvider>
  )
}


const AuthExample = () => {
  React.useEffect(() => console.log("MOUNTING AUTH EXAMPLE"), []);
  const { signOut } = useEasybase();
  return (
    <Auth 
      theme="minimal-dark"
      signUpFields={{ 
          lastName: { minLength: { message: "Must be 14 characters", value: 14 }},
          phoneNumber: true,
          gender: true,
          dateOfBirth: { required: true }
      }}
      dictionary={{ signInHeader: "PLEASE SG IN" }}
    > 
      <h2>You're in!</h2>
      <button onClick={signOut}>Sign Out</button>
    </Auth>
  )
}


const App = () => {
  return (
    <HashRouter>
      <ul>
        <li>
          <Link to="/">Integration Example</Link>
        </li>
        <li>
          <Link to="/project">Project Example</Link>
        </li>
        <li>
          <Link to="/usereturnstresstest">useReturn Stress Test</Link>
        </li>
        <li>
          <Link to="/auth">Auth UI</Link>
        </li>
      </ul>

      <Switch>
        <Route path="/" exact>
          <IntegrationExample />
        </Route>
        <Route path="/project" exact >
          <ProjectExample />
        </Route>
        <Route path="/auth" exact >
          <EasybaseProvider ebconfig={ebconfig2} options={{ logging: true }}>
            <AuthExample />
          </EasybaseProvider>
        </Route>
        <Route path="/usereturnstresstest" exact >
          <EasybaseProvider ebconfig={ebconfig} options={{ logging: true }}>
            <UseReturnStressTest />
          </EasybaseProvider>
        </Route>
      </Switch>
    </HashRouter>
  )
}

export default App;
