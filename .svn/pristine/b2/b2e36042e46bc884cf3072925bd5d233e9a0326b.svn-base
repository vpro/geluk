import React from "react";
import ReactDOM from 'react-dom';
import Introduction from "./components/Introduction.jsx";
import "./assets/styling/app.scss";
import { Router, Route, DefaultRoute, IndexRoute, hashHistory } from 'react-router';


import App from "./components/App.jsx";

ReactDOM.render((
	<Router history={hashHistory}>
    <Route path="/" component={App} >
    	<IndexRoute component={Introduction}/>
    </Route>
  </Router>
	), document.getElementById("app"));