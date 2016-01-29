var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;



var Nav = React.createClass({
    render: function() {
        return (
            <nav className={'navbar navbar-inverse navbar-fixed-top vacom-nav'}>
                <div className={'container'}>
                    <div className={'navbar-header'}>
                        <button type="button" className={'navbar-toggle collapsed'} data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className={'sr-only'}>Toggle navigation</span>
                            <span className={'icon-bar'}></span>
                            <span className={'icon-bar'}></span>
                            <span className={'icon-bar'}></span>
                        </button>
                        <a className={'navbar-brand'} href="/">vacom</a>
                    </div>
                    <div id="navbar" className={'collapse navbar-collapse'}>
                        <div className={'cd-stretchy-nav'}>
                            <a className={'cd-nav-trigger'} href="#0">
                                <span aria-hidden="true"></span>
                            </a>
                            <ul>
                                <li><Link to="/" className={'active'}><span>Home</span></Link></li>
                                <li><Link to="/about"><span>About</span></Link></li>
                                <li><Link to="/projects"><span>Portfolio</span></Link></li>
                                <li><Link to="/contact"><span>Contact</span></Link></li>
                                <li><Link to="/outro"><span>Outro</span></Link></li>
                            </ul>

                            <span aria-hidden="true"  className={'stretchy-nav-bg'}></span>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
});


module.exports = Nav;
