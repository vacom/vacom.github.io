var React = require('react');
//components
var Introduction = require('./introduction');
var Nav = require('./navigation');
var Footer = require('./Footer');

var App = React.createClass({
    render() {
        return (
            <div>
                <Nav></Nav>

                <section className={'wrapper'}>
                    <div className={'container app'}>
                        {this.props.children}
                    </div>

                    <Footer></Footer>
                </section>

            </div>
        )
    }
});


module.exports = App;
