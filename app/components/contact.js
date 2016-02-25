var React = require('react');
//components

var About = React.createClass({
    render() {
        return (
            <div>
                <div className={'row'}>
                    <div className={'col-md-6'}>
                        <div className={'introduction animated fadeInUp'}>
                            <h1>Contact</h1>
                            <p>To contact me please use the following e-mail: vitor.works@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});


module.exports = About;
