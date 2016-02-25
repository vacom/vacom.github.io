var React = require('react');
var classNames = require('classnames');
//var ReactDOM = require('react-dom');

//App from the user components - show the app tools and features - main
var Userapp = React.createClass({
    render: function() {
        return (
                <div>
                    <Tools></Tools>
                    <div className={'costero-body-content'}>
                        <DataTable></DataTable>
                    </div>
                </div>

                );
    }
});

//App - Second Navbar
var Tools = React.createClass({
    render: function() {
        return (
            <div className={'navbar navbar-default navbar-fixed-top costero-second-navbar'}>
                <div className={'container'}>
                    <div className={'navbar-header'}>
                        <button type="button" className={'navbar-toggle'} data-toggle="collapse" data-target=".main-nav">
                            <span className={'icon-bar'}></span>
                            <span className={'icon-bar'}></span>
                            <span className={'icon-bar'}></span>
                        </button>
                    </div>
                    <div className={'collapse navbar-collapse main-nav'}>
                        <ul className={'nav navbar-nav'}>
                            <li><a href="/app">Apps</a></li>
                        </ul>
                        <ul className={'nav navbar-nav navbar-right'}>
                            <li><a href="">Fixed top <span className={'sr-only'}>(current)</span></a></li>
                            <li className={'dropdown'}>
                                <a href="#" className={'dropdown-toggle'} data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Vitor Amaral <span className={'caret'}></span></a>
                                <ul className={'dropdown-menu'}>
                                    <li><a href="">Action</a></li>
                                    <li><a href="">Another action</a></li>
                                    <li><a href="">Something else here</a></li>
                                    <li role="separator" className={'divider'}></li>
                                    <li className={'dropdown-header'}>Nav header</li>
                                    <li><a href="">Separated link</a></li>
                                    <li><a href="">One more separated link</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
});





var DataTable = React.createClass({
    loadData: function() {
        $.ajax({
            url: "http://jsonplaceholder.typicode.com/posts?userId=1",
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                // data = this.state.data.concat([data]);
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        this.loadData();
    },
    render: function() {
        return (
                <div className={'row'}>
                    <div className={'col-md-12'}>
                        <table className={'table table-striped'}>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Body</th>
                            </tr>
                            </thead>
                            <tbody>
                                  {this.state.data.map(function(result) {
                                      return <TableItemWrapper key={result.id} data={result}/>;
                                  })}
                            </tbody>
                        </table>
                    </div>
                </div>
        );
    }
});

var TableItemWrapper = React.createClass({
    render: function() {
        return <tr>
            <td>{this.props.data.id}</td>
            <td>{this.props.data.userId}</td>
            <td>{this.props.data.title}</td>
            <td>{this.props.data.body}</td>
        </tr>;
    }
});


module.exports = Userapp;
