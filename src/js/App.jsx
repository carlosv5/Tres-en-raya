const Tablero = require('./Tablero.jsx');
const Cabecera = require('./Cabecera.jsx');
const Resultado = require('./Resultado.jsx');
const JUGADORX = "jugador 1 - las X";
const JUGADOR0 = "jugador 2 - los 0";

var App = React.createClass({
  getInitialState: function(){
    return {
      turno: JUGADORX,
      ganador: "",
      dataJugadorX: [],
      dataJugadorY: [],
      valores: [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']
      ]
    };
  },

  appClick: function(numeroFila, numeroColumna){
    let valores = this.state.valores;
    let nuevoValor = this.state.turno === JUGADORX ? 'X':'0';
    valores[numeroFila][numeroColumna] = nuevoValor;

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
          alert("Tres en raya vertical!!!");
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
          alert("Tres en raya horizontal!!!");
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
          alert("Tres en raya diagonal 1!!!");
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
    alert("Tres en raya diagonal 2!!!");
  }
            console.log(cuenta);
    this.setState({
      turno: this.state.turno === JUGADORX ? JUGADOR0:JUGADORX,
      valores: this.state.valores,
      dataJugadorX: this.state.dataJugadorX,
      dataJugadorY: this.state.dataJugadorY,
      ganador: this.state.ganador
    });
  },

  render: function(){
    var texto;
    texto = "Turno del " + this.state.turno;
    var resultado = "El ganador es " + this.state.ganador;
    return (
      <div>
      <Cabecera texto={texto}/>
      <Tablero valores={this.state.valores}
      manejadorTableroClick={this.appClick}/>
      <Resultado texto = {resultado}/>
      </div>
    )
  }
});
module.exports = App;
