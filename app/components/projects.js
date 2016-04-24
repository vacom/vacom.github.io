var React = require('react');
var Link = require('react-router').Link;
//components

var Projects = React.createClass({
    render() {
        return (
            <div>
                <div className={'row'}>
                    <div className={'col-md-6 '}>
                        <div className={'introduction'}>
                            <h1>Projects</h1>
                            <p>Please check my work.</p>
                        </div>
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col-md-12'}>
                        <Works></Works>
                    </div>
                </div>
            </div>
        )
    }
});

var WorksStyle = {
    paddingLeft: 0
};

var Works = React.createClass({
    getInitialState: function (){
        return{
            data: []
        }
    },
    handleClick: function(item, e) {
        localStorage.setItem("projectID", item["id"]);
    },
    componentWillMount: function(){
        this.firebaseRef = new Firebase('https://vacom.firebaseio.com/projects');
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
                    return <div className={'col-xs-6 col-md-3 animated fadeInUp'} style={WorksStyle}>
                        <Link  to="/viewer" onClick={this.handleClick.bind(this,object)}  className={'thumbnail project-thumb project project_'}>
                            <img id={object.id} src={object.imgsrc}/>
                        </Link>
                    </div>
                }, this)}
            </div>
        );
    }
});


module.exports = Projects;
