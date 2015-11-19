var React = require('react');
var ReactDOM = require('react-dom');

const Tablero = require('./Tablero.jsx');
const Cabecera = require('./Cabecera.jsx');
const Reinicio = require('./Reinicio.jsx');
const Alert = require('./Alert.jsx');

const JUGADORX = "jugador 1 - las X";
const JUGADOR0 = "jugador 2 - los O";

var App = React.createClass({
  getInitialState: function(){
    return {
      turno: JUGADORX,
      ganador: "",
      empate: 0,
      valores: [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']
      ]
    };
  },

  setInitialState: function(){
    let nuevoValor = '-';
    this.state.valores= this.state.valores;
    this.state.turno = JUGADORX;
    this.state.ganador = "";
    this.state.empate = 0;

    for( var i = 0; i < 3 ; i++){
      for(var j = 0; j < 3 ; j++){
        this.state.valores[i][j] = nuevoValor;
      }
    }
    this.setState({
      ganador: this.state.ganador,
      turno: this.state.turno === JUGADORX ? JUGADOR0:JUGADORX,
      valores: this.state.valores,
      empate: this.state.empate,
    });
  },

  appClick: function(numeroFila, numeroColumna){
    let valores = this.state.valores;
    let nuevoValor = this.state.turno === JUGADORX ? 'X':'O';
    valores[numeroFila][numeroColumna] = nuevoValor;
    this.state.empate++;

    //Misma columna
    var cuenta = 0;
    for( var i = 0; i < 3 ; i++){
      if(i != numeroFila){
        if(valores[i][numeroColumna] == nuevoValor){
          cuenta++;
        }
      }
    }
    if(cuenta ==2){
      this.state.ganador = this.state.turno;
    }

    //Misma fila
    cuenta = 0;
    for( var i = 0; i < 3 ; i++){
      if(i != numeroColumna){
        if(valores[numeroFila][i] == nuevoValor){
          cuenta++;
        }
      }
    }
    if(cuenta ==2){
      this.state.ganador = this.state.turno;
    }

    //Misma diagonal descendente
    var cuenta = 0;
    for( var i = 0; i < 3 ; i++){
      if((i != numeroColumna) && (i!= numeroFila)){
        if(valores[i][i] == nuevoValor){
          cuenta++;
        }
      }
    }
    if(cuenta ==2){
      this.state.ganador = this.state.turno;
    }
    //Misma diagonal descendente
    var cuenta = 0;
    for( var i = 0; i < 3 ; i++){
      for(var j = 0; j < 3 ; j++){
        if((j != numeroColumna) && (i!= numeroFila)){
          if((valores[i][j] == nuevoValor) && ((i + j) == 2)){
            cuenta++;
          }
        }
      }
    }
    if(cuenta ==2){
      this.state.ganador = this.state.turno;
    }
    if((this.state.empate === 9)&&(this.state.ganador === "")){
      this.state.ganador = "Empate";
    }

    this.setState({
      turno: this.state.turno === JUGADORX ? JUGADOR0:JUGADORX,
      valores: this.state.valores,
      ganador: this.state.ganador,
    });
  },

  render: function(){
    var texto;
    texto = "Turno del " + this.state.turno;
    var ganador = this.state.ganador;

    return (
      <div className="centrado">
      <Cabecera texto={texto}/>
      <Tablero valores={this.state.valores} ganador={ganador}
      manejadorTableroClick={this.appClick}/>
      <Reinicio texto = {"Reinicio"} manejadorReinicioClick={this.setInitialState} />
      <Alert ganador = {ganador}/>
      </div>
    )
  }
});
module.exports = App;
