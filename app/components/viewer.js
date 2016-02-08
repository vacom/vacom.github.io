var React = require('react');
var Link = require('react-router').Link;
//components

var Viewer = React.createClass({
    render() {
        return (
            <div>
                <div className={'row'}>
                    <div className={'col-md-6'}>
                        <div className={'introduction'}>
                            <h1>Viewer</h1>
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




module.exports = Viewer;
