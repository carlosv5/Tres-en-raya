import { Button } from 'react-bootstrap';

var React = require('react');
var ReactDOM = require('react-dom');

var Reinicio = React.createClass({
  reinicioClick: function(){
      this.props.manejadorReinicioClick();
  },
  render: function(){
    return (
      <Button bsStyle="info" className="btnReinicio" onClick={this.reinicioClick}>
      {this.props.texto}
      </Button>
    )
  }
});
module.exports = Reinicio;
