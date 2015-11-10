const Tablero = require('./Tablero.jsx');
const Cabecera = require('./Cabecera.jsx');
const Reinicio = require('./Reinicio.jsx');
const JUGADORX = "jugador 1 - las X";
const JUGADOR0 = "jugador 2 - los 0";

var App = React.createClass({
  getInitialState: function(){
    return {
      turno: JUGADORX,
      rellenas : 0,
      valores: [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']
      ]
    };
  },

  setInitialState: function(){
      let nuevoValor = '-';
      let valores= this.state.valores;
      let turno = JUGADORX;
      for( var i = 0; i < 3 ; i++){
        for(var j = 0; j < 3 ; j++){
          valores[i][j] = nuevoValor;
        }
      }
      let rellenas = 0;
      this.setState({
        turno: this.state.turno === JUGADORX ? JUGADOR0:JUGADORX,
        valores: this.state.valores,
        rellenas: this.state.rellenas,
      });
  },

  appClick: function(numeroFila, numeroColumna){
    var rellenas = this.state.rellenas++;
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
  if(rellenas === 9){
    alert("Empate!!!");
  }
    this.setState({
      turno: this.state.turno === JUGADORX ? JUGADOR0:JUGADORX,
      valores: this.state.valores,
    });
  },

  render: function(){
    var texto;
    texto = "Turno del " + this.state.turno;
    return (
      <div>
      <Cabecera texto={texto}/>
      <Tablero valores={this.state.valores}
      manejadorTableroClick={this.appClick}/>
      <Reinicio texto = "Reinicio" manejadorReinicioClick={this.setInitialState}/>
      </div>
    )
  }
});
module.exports = App;
