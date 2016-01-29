var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;



var Footer = React.createClass({
    render: function() {
        return (
            <footer>
                <ul>
                    <li><Link to=""><span className={'lnr lnr-checkmark-circle'}></span></Link></li>
                    <li><Link to=""><span className={'lnr lnr-layers'}></span></Link></li>
                </ul>
                <p>© Copyright 2016 vacom.me. All Rights Reserved.</p>
            </footer>
        );
    }
});


module.exports = Footer;
