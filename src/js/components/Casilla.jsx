import {Button}from'react-bootstrap';

var React = require('react');
var ReactDOM = require('react-dom');

var TresEnRayaActions = require('../actions/TresEnRayaActions.js');
const casillaStyle = {
  height: '100px',
  width: '100px'
};
let Casilla = React.createClass({
  casillaClick: function(){
    if((this.props.valor==="-") && (this.props.ganador === "")){
          TresEnRayaActions.jugarPosicion(this.props.indiceFila, this.props.indiceColumna);
    }
  },
  render: function(){
    return (
      <Button bsStyle="primary" style={casillaStyle} className={((this.props.valor ==='-') && (this.props.ganador === "")) ? "clickable":"no_clickable"}
      onClick={this.casillaClick}>
      <span className="letras">{this.props.valor}</span>
      </Button>
    )
  }
});
module.exports = Casilla;
