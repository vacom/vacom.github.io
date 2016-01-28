var React = require('react');
var ReactDOM = require('react-dom');

var Introduction = React.createClass({
    render: function() {
        return (
            <div className={'row'}>
                <div className={'col-md-6 animated fadeInUp'}>
                    <h1>My creative and simplicity modern projects</h1>
                    <p>Please check my portfolio. All project is clean and simplicity modern style. You can download this template.</p>
                </div>
            </div>
        );
    }
});

module.exports = Introduction;
