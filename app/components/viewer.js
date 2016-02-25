var React = require('react');
var Link = require('react-router').Link;
//components

var Viewer = React.createClass({
    getInitialState: function (){
        return{
            data: []
        }
    },
    componentWillMount: function(){
        this.firebaseRef = new Firebase('https://vacom.firebaseio.com/viewer');
        var that = this;
        this.firebaseRef.once("value", function(snapshot){
            var getData = [];
            snapshot.forEach(function(data){
                var newData = {
                    id: data.val().id,
                    title: data.val().title,
                    description: data.val().description,
                    tags: data.val().tags
                }
                getData.push(newData);
                that.setState({data: getData});
            });
        });
    },
    render() {
        return (
            <div>
                <div className={'row'}>
                    <div className={'col-md-6 col-xs-12'}>
                        {this.state.data.map(function(object, i){
                            if(object.id == 1) {
                                return <div className={'introduction animated fadeInUp'}>
                                    <h1>{object.title}</h1>
                                    <p>{object.tags}</p>
                                    <p>{object.description}</p>
                                </div>
                            }
                        })}
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col-md-12'}>
                        <ViewerContent></ViewerContent>
                    </div>
                </div>
            </div>
        )
    }
});

var ViewerContent = React.createClass({
    getInitialState: function (){
        return{
            data: []
        }
    },
    componentWillMount: function(){
        this.firebaseRef = new Firebase('https://vacom.firebaseio.com/viewer');
        var that = this;
        this.firebaseRef.once("value", function(snapshot){
            var getData = [];
            snapshot.forEach(function(data){
                var newData = {
                    id: data.val().id,
                    imgs: data.val().imgs
                }
                getData.push(newData);
                that.setState({data: getData});
            });
        });
    },
    render() {
        return (
            <div>
                <div className={'project-content animated fadeInUp'}>
                    {this.state.data.map(function(result) {
                        return <Covers key={result.id} data={result}/>;
                    })}
                </div>
            </div>
        )
    }
});

var Covers = React.createClass({
    render: function() {
        console.log(this.props.data);
        return <span>{this.props.data.text}</span>;
    }
});


module.exports = Viewer;
