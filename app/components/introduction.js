var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;

var Introduction = React.createClass({
    render: function() {
        return (
            <div className={'section'}>
                <div className={'row'}>
                    <Header></Header>
                </div>
                <div className={'row'}>
                    <Featured></Featured>
                </div>
            </div>
        );
    }
});

var Header = React.createClass({
    render: function() {
        return (
            <div className={'col-md-12'}>
                <div className={'introduction'}>
                    <h1>Creativity Is Intelligence Having Fun.</h1>
                    <p>Please check my portfolio. My creative and simplicity modern projects.</p>
                </div>
            </div>
        );
    }
});

var Featured = React.createClass({
    render: function() {
        return (
           <div>
                <div className={'col-xs-6 col-md-3'}>
                    <Link to="/viewer" className={'thumbnail'}>
                        <img src="img/projects/sinote/sinote_thumb.jpg"/>
                    </Link>
                </div>
           </div>
        );
    }
});




module.exports = Introduction;
