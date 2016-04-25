var React = require('react');
var ReactDOM = require('react-dom').render;

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var IndexRoute = require('react-router').IndexRoute;
//var browserHistory  = require('react-router').browserHistory; url pretty sem isto -># mas com os erros de refresh page

var createHashHistory = require('react-router').hashHistory; //ugly url

//components
var main = require('./components/main');
var about = require('./components/about');
var introduction = require('./components/introduction');
var projects = require('./components/projects');
var viewer = require('./components/viewer');
var contact = require('./components/contact');
var error = require('./components/error');



ReactDOM((
    <Router history={createHashHistory}>
        <Route path="/" component={main}>
            <IndexRoute component={introduction} />
            <Route path="about" component={about}/>
            <Route path="projects" component={projects}/>
            <Route path="viewer" component={viewer}/>
            <Route path="contact" component={contact}/>
            <Route path="*" component={error}/>
        </Route>
    </Router>
), document.getElementById("app"));


