import { Button } from 'react-bootstrap';

var React = require('react');
var ReactDOM = require('react-dom');

var TresEnRayaActions = require('../actions/TresEnRayaActions.js');

var Reinicio = React.createClass({
  reinicioClick: function(){
      TresEnRayaActions.reiniciar();
  },
  render: function(){
    return (
      <Button bsStyle="info" bsSize="large" className="btnReinicio" onClick={this.reinicioClick}>
      {this.props.texto}
      </Button>
    )
  }
});
module.exports = Reinicio;
