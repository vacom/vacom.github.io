var React = require('react');
var Link = require('react-router').Link;
//components

var About = React.createClass({
    render() {
        return (
            <div>
                <div className={'row'}>
                    <div className={'col-md-6'}>
                        <div className={'introduction animated fadeInUp'}>
                            <h1>About Me</h1>
                            <p>Full stack developer</p>
                            <p>Hello, my name is Vitor Amaral. I'm a Full Stack Developer. I invite you to look at my  <Link to="/projects"><span>work</span></Link>.</p>
                            <p>Knowledge Management and Programming, I do my work a fun place mixed with essential ingredients: imagination, creativity and design.</p>
                        </div>
                    </div>
                    <div className={'col-md-6'}>
                        <div className={'introduction animated fadeInUp'}>
                            <h1>Awards</h1>
                            <ul>
                                <li>Quadro de Excelência em Escola Profissional da Povoação</li>
                                <li>Prémio BES Açores</li>
                                <li>Honours Certificate: Third Quarter 2007</li>
                                <li>Honours Certificate: Third Quarter 2006</li>
                                <li>Business Studies 2007</li>
                                <li>Drama 2007</li>
                                <li>Certificado Azores Skills</li>
                            </ul>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
});



module.exports = About;
