var React = require('react');
var Link = require('react-router').Link;



//Styles
var viewerImg = {
    marginTop: '30px'
};

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
                    tags: data.val().tags,
                    c1: data.val().c1,
                    c2: data.val().c2,
                    c3: data.val().c3,
                    c4: data.val().c4
                }
                getData.push(newData);
                that.setState({data: getData});
            });
        });
    },
    render() {
        var projectID = localStorage.getItem("projectID");
        return (
            <div>
                <div className={'row'}>
                    <div className={'col-md-6 col-xs-12'}>
                        {this.state.data.map(function(object, i){
                            if(object.id == projectID) {
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
                        {this.state.data.map(function(object, i){
                            if(object.id == projectID) {
                                return <div className={'col-md-12'}>
                                    <div className={'animated fadeInUp'} >
                                        <img src={object.c1} className={'img-responsive'} style={viewerImg} alt=""/>
                                        <img src={object.c2} className={'img-responsive'} style={viewerImg} alt=""/>
                                        <img src={object.c3} className={'img-responsive'} style={viewerImg} alt=""/>
                                        <img src={object.c4} className={'img-responsive'} style={viewerImg} alt=""/>
                                    </div>
                                </div>
                            }
                        })}
                </div>
            </div>
        )
    }
});


module.exports = Viewer;
