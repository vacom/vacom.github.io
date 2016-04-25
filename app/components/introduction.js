var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;

var Introduction = React.createClass({
    render: function() {
        return (
            <div className={'section  animated fadeInUp'}>
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
    render: function() {
        return (
            <div className={'col-md-12'}>
                <div className={'introduction'}>
                    <h1>Creativity Is Intelligence Having Fun.</h1>
                    <p>Please check my portfolio. My creative and simplicity modern projects.</p>
                </div>
            </div>
        );
    }
});

var Featured = React.createClass({
    getInitialState: function (){
        return{
            data: []
        }

    },
    handleClick: function(item, e) {
        localStorage.setItem("projectID", item["id"]);
    },
    componentWillMount: function(){
        this.firebaseRef = new Firebase('https://vacom.firebaseio.com/home');
        var that = this;
        this.firebaseRef.once("value", function(snapshot){
            var getData = [];
            snapshot.forEach(function(data){
               var newData = {
                   id: data.val().id,
                   imgsrc: data.val().imgsrc
               }
                getData.push(newData);
                that.setState({data: getData});
            });
        });
    },
    render: function() {
        return (
           <div>
                    {this.state.data.map(function(object, i){
                        return <div className={'col-xs-6 col-md-3 animated fadeInUp'} key={object.id}>
                               <Link to="/viewer"  onClick={this.handleClick.bind(this,object)}  className={'thumbnail project-thumb project ' + object.id}>
                                   <img src={object.imgsrc}/>
                               </Link>
                        </div>
                    }, this)}

           </div>
        );
    }
});




module.exports = Introduction;
