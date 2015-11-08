(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Tablero = require('./Tablero.jsx');
var Cabecera = require('./Cabecera.jsx');
var Resultado = require('./Resultado.jsx');
var JUGADORX = "jugador 1 - las X";
var JUGADOR0 = "jugador 2 - los 0";

var App = React.createClass({
  displayName: 'App',

  getInitialState: function getInitialState() {
    return {
      turno: JUGADORX,
      ganador: "",
      dataJugadorX: [],
      dataJugadorY: [],
      valores: [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]
    };
  },

  appClick: function appClick(numeroFila, numeroColumna) {
    var valores = this.state.valores;
    var nuevoValor = this.state.turno === JUGADORX ? 'X' : '0';
    valores[numeroFila][numeroColumna] = nuevoValor;

    //Misma columna
    var cuenta = 0;
    for (var i = 0; i < 3; i++) {
      if (i != numeroFila) {
        if (valores[i][numeroColumna] == nuevoValor) {
          cuenta++;
        }
      }
    }
    if (cuenta == 2) {
      alert("Tres en raya vertical!!!");
    }
    //Misma fila
    cuenta = 0;
    for (var i = 0; i < 3; i++) {
      if (i != numeroColumna) {
        if (valores[numeroFila][i] == nuevoValor) {
          cuenta++;
        }
      }
    }
    if (cuenta == 2) {
      alert("Tres en raya horizontal!!!");
    }
    //Misma diagonal descendente
    var cuenta = 0;
    for (var i = 0; i < 3; i++) {
      if (i != numeroColumna && i != numeroFila) {
        if (valores[i][i] == nuevoValor) {
          cuenta++;
        }
      }
    }
    if (cuenta == 2) {
      alert("Tres en raya diagonal 1!!!");
    }
    //Misma diagonal descendente
    var cuenta = 0;
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (j != numeroColumna && i != numeroFila) {
          if (valores[i][j] == nuevoValor && i + j == 2) {
            cuenta++;
          }
        }
      }
    }
    if (cuenta == 2) {
      alert("Tres en raya diagonal 2!!!");
    }
    console.log(cuenta);
    this.setState({
      turno: this.state.turno === JUGADORX ? JUGADOR0 : JUGADORX,
      valores: this.state.valores,
      dataJugadorX: this.state.dataJugadorX,
      dataJugadorY: this.state.dataJugadorY,
      ganador: this.state.ganador
    });
  },

  render: function render() {
    var texto;
    texto = "Turno del " + this.state.turno;
    var resultado = "El ganador es " + this.state.ganador;
    return React.createElement(
      'div',
      null,
      React.createElement(Cabecera, { texto: texto }),
      React.createElement(Tablero, { valores: this.state.valores,
        manejadorTableroClick: this.appClick }),
      React.createElement(Resultado, { texto: resultado })
    );
  }
});
module.exports = App;

},{"./Cabecera.jsx":2,"./Resultado.jsx":4,"./Tablero.jsx":5}],2:[function(require,module,exports){
"use strict";

var Cabecera = React.createClass({
  displayName: "Cabecera",

  render: function render() {
    return React.createElement(
      "header",
      { className: "cabecera" },
      this.props.texto
    );
  }
});
module.exports = Cabecera;

},{}],3:[function(require,module,exports){
'use strict';

var casillaStyle = {
  height: '100px',
  width: '100px'
};
var Casilla = React.createClass({
  displayName: 'Casilla',

  casillaClick: function casillaClick() {
    if (this.props.valor === "-") {
      this.props.manejadorCasillaClick(this.props.indiceFila, this.props.indiceColumna);
    }
  },
  render: function render() {
    return React.createElement(
      'button',
      { style: casillaStyle, className: this.props.valor === "-" ? "clickable" : "no_clickable", className: this.props.valor === "X" ? "black" : "white", onClick: this.casillaClick },
      this.props.valor
    );
  }
});
module.exports = Casilla;

},{}],4:[function(require,module,exports){
"use strict";

var Resultado = React.createClass({
  displayName: "Resultado",

  render: function render() {
    return React.createElement(
      "header",
      { className: "resultado" },
      this.props.texto
    );
  }
});
module.exports = Resultado;

},{}],5:[function(require,module,exports){
"use strict";

var Casilla = require("./Casilla.jsx");
var Tablero = React.createClass({
  displayName: "Tablero",

  tableroClick: function tableroClick(numeroFila, numeroColumna) {
    this.props.manejadorTableroClick(numeroFila, numeroColumna);
  },
  render: function render() {
    var casillas = this.props.valores.map((function (valoresFila, indiceFila) {
      var fila = valoresFila.map((function (valor, indiceColumna) {
        var mykey = "" + indiceFila + indiceColumna;
        return React.createElement(Casilla, { valor: valor, indiceFila: indiceFila,
          indiceColumna: indiceColumna, key: mykey, manejadorCasillaClick: this.tableroClick });
      }).bind(this));
      return React.createElement(
        "div",
        { key: "fila" + indiceFila },
        fila
      );
    }).bind(this));
    return React.createElement(
      "div",
      null,
      casillas
    );
  }
});
module.exports = Tablero;

},{"./Casilla.jsx":3}],6:[function(require,module,exports){
"use strict";

var App = require("./App.jsx");
ReactDOM.render(React.createElement(App, null), document.getElementById('contenedor'));

},{"./App.jsx":1}]},{},[6]);
