var React = require('react');
var Link = require('react-router').Link;
//components

var Viewer = React.createClass({
    render() {
        return (
            <div>
                <div className={'row'}>
                    <div className={'col-md-6 col-xs-12'}>
                        <div className={'introduction animated fadeInUp'}>
                            <h1>Sinote</h1>
                            <p>Website, Web App</p>
                            <p>Sinote is a note-taking service, which allows you to create and access the notes.
                                It consists of the site and application. Site is the "image" of the brand and its informative features.
                                The application allows account creation and store notes in the cloud and sync.</p>
                        </div>
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
    render() {
        return (
            <div>
                <div className={'project-content animated fadeInUp'}>
                    <img className={'project-img img-responsive'} src="img/projects/sinote/c1.png" alt=""/>
                    <img className={'project-img img-responsive'} src="img/projects/sinote/c2.png" alt=""/>
                    <img className={'project-img img-responsive'} src="img/projects/sinote/c3.png" alt=""/>
                    <img className={'project-img img-responsive'} src="img/projects/sinote/c4.png" alt=""/>
                </div>
            </div>
        )
    }
});


module.exports = Viewer;
