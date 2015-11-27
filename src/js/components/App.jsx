var React = require('react');
var ReactDOM = require('react-dom');

const Tablero = require('./Tablero.jsx');
const Cabecera = require('./Cabecera.jsx');
const Reinicio = require('./Reinicio.jsx');
const Alert = require('./Alert.jsx');

var TresEnRayaStore = require('../stores/TresEnRayaStore.js');
function getAppStateFromStore() {
  return {
    turno: TresEnRayaStore.getTurno(),
    valores: TresEnRayaStore.getValores(),
    ganador: TresEnRayaStore.getGanador(),
    empate: TresEnRayaStore.getEmpate()
  };
}
var App = React.createClass({
  getInitialState: function(){
    return getAppStateFromStore();
  },

  componentDidMount() {
    TresEnRayaStore.addChangeListener(this._onChange);
  },
  componentWillUnmount() {
    TresEnRayaStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(getAppStateFromStore());
  },
  render: function(){
    var texto = "Turno del " + this.state.turno;
    return (
      <div>
      <Cabecera texto={texto}/>
      <Tablero valores={this.state.valores} ganador ={this.state.ganador}/>
      <Alert ganador = {this.state.ganador}/>
      </div>
    )
  }
});
module.exports = App;
