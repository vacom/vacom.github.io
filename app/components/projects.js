var React = require('react');
var Link = require('react-router').Link;
//components

var Projects = React.createClass({
    render() {
        return (
            <div>
                <div className={'row'}>
                    <div className={'col-md-6'}>
                        <div className={'introduction'}>
                            <h1>Projects</h1>
                            <p>Please check my work.</p>
                        </div>
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col-md-12'}>
                        <Works></Works>
                    </div>
                </div>
            </div>
        )
    }
});

var WorksStyle = {
    paddingLeft: 0
};

var Works = React.createClass({
    render: function() {
        return (
            <div>
                <div className={'col-xs-6 col-md-3'} style={WorksStyle}>
                    <Link to="/viewer" className={'thumbnail'}>
                        <img src="img/projects/sinote/sinote_thumb.jpg"/>
                    </Link>
                </div>
            </div>
        );
    }
});



module.exports = Projects;
