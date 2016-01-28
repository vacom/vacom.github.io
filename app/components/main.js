var React = require('react');
//components
var Introduction = require('./introduction');


var Dashboard = React.createClass({
    render: function() {
        return (
            <div>
                <div className={'row'}>
                    <Introduction></Introduction>
                </div>
            </div>
        );
    }
});


module.exports = Dashboard;
