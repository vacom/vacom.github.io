var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;



var Footer = React.createClass({
    render: function() {
        return (
            <footer>
                <ul>
                    <li><Link to="https://www.facebook.com/vacom.web/" target="_blank"><span className={'fa fa-facebook'}></span></Link></li>
                    <li><Link to="https://twitter.com/VitorAmaral_Dev" target="_blank"><span className={'fa fa-twitter'}></span></Link></li>
                </ul>
                <p>© Copyright 2016 vacom.me. All Rights Reserved.</p>
            </footer>
        );
    }
});


module.exports = Footer;
