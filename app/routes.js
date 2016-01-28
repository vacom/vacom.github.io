var React = require('react');
var ReactDOM = require('react-dom').render;

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var browserHistory  = require('react-router').browserHistory;
//var createBrowserHistory = require('history/lib/createBrowserHistory');

//components
var main = require('./components/main');
var userApp = require('./components/userApp');

/*function requireAuth(nextState, replaceState) {
    if (!auth.loggedIn())
        replaceState({ nextPathname: nextState.location.pathname }, '/login')
 onEnter={requireAuth}
}*/

ReactDOM((
    <Router history={browserHistory}>
        <Route path="/" component={main} />
        <Route path="/login" component={userApp}/>
        <Route path="/app" component={userApp}/>
    </Router>
), document.getElementById("app"));


