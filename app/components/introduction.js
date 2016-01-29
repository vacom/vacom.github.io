var React = require('react');
var ReactDOM = require('react-dom');



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
    mixins: [ReactFireMixin],
    componentWillMount: function() {
        var ref = new Firebase("https://vacom.firebaseio.com/items");
        this.bindAsObject(ref, "items");

    },
    componentWillUnmount: function() {
        this.firebaseRef.off();
    },
    getInitialState: function() {
        return {data: []};
    },
    render: function() {


        console.log(this.state.items);
        console.log(JSON.stringify(this.state.items));

        var teste = JSON.stringify(this.state.items);
        console.log(teste);

        return (

            <div className={'col-md-12'}>
                <div className={'introduction'}>
                    <h1>My creative and simplicity modern projects</h1>
                    <p>Please check my portfolio. All project is clean and simplicity modern style. You can download this template.</p>
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
                    <a href="#" className={'thumbnail'}>
                        <img src="http://xn--28jud8bn.com/wp-content/uploads/2015/09/social_media_apps-319x180.jpg"/>
                    </a>
                </div>
                <div className={'col-xs-6 col-md-3'}>
                    <a href="#" className={'thumbnail'}>
                        <img src="http://xn--28jud8bn.com/wp-content/uploads/2015/09/social_media_apps-319x180.jpg"/>
                    </a>
                </div>
           </div>
        );
    }
});




module.exports = Introduction;
