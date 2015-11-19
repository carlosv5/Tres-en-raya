var React = require('react');
var ReactDOM = require('react-dom');

var Alert = React.createClass({
  render: function(){
    if(this.props.ganador === "Empate"){
      alert(this.props.ganador + ", ¿Queréis jugar otra partida?");
    }
    else if(this.props.ganador != ""){
      alert(this.props.ganador + " ha ganado");
    }
    return (
      <div >

      </div>
    )
  }
});
module.exports = Alert;
