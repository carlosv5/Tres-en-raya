(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var Alert = React.createClass({
  displayName: "Alert",

  render: function render() {
    if (this.props.ganador === "Empate") {
      alert(this.props.ganador + ", ¿Queréis jugar otra partida?");
    } else if (this.props.ganador != "") {
      alert(this.props.ganador + " ha ganado");
    }
    return React.createElement("div", null);
  }
});
module.exports = Alert;

},{}],2:[function(require,module,exports){
'use strict';

var Tablero = require('./Tablero.jsx');
var Cabecera = require('./Cabecera.jsx');
var Reinicio = require('./Reinicio.jsx');
var Alert = require('./Alert.jsx');

var JUGADORX = "jugador 1 - las X";
var JUGADOR0 = "jugador 2 - los 0";

var App = React.createClass({
  displayName: 'App',

  getInitialState: function getInitialState() {
    return {
      turno: JUGADORX,
      ganador: "",
      empate: 0,
      valores: [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]
    };
  },

  setInitialState: function setInitialState() {
    var nuevoValor = '-';
    this.state.valores = this.state.valores;
    this.state.turno = JUGADORX;
    this.state.ganador = "";
    this.state.empate = 0;

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        this.state.valores[i][j] = nuevoValor;
      }
    }
    this.setState({
      ganador: this.state.ganador,
      turno: this.state.turno === JUGADORX ? JUGADOR0 : JUGADORX,
      valores: this.state.valores,
      empate: this.state.empate
    });
  },

  appClick: function appClick(numeroFila, numeroColumna) {
    var valores = this.state.valores;
    var nuevoValor = this.state.turno === JUGADORX ? 'X' : '0';
    valores[numeroFila][numeroColumna] = nuevoValor;
    this.state.empate++;

    //Misma columna
    var cuenta = 0;
    for (var i = 0; i < 3; i++) {
      if (i != numeroFila) {
        if (valores[i][numeroColumna] == nuevoValor) {
          cuenta++;
        }
      }
    }
    if (cuenta == 2 && this.state.ganador === "") {
      this.state.ganador = this.state.turno;
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
    if (cuenta == 2 && this.state.ganador === "") {
      this.state.ganador = this.state.turno;
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
    if (cuenta == 2 && this.state.ganador === "") {
      this.state.ganador = this.state.turno;
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
    if (cuenta == 2 && this.state.ganador === "") {
      this.state.ganador = this.state.turno;
    }
    if (this.state.empate === 9 && this.state.ganador === "") {
      this.state.ganador = "Empate";
    }

    this.setState({
      turno: this.state.turno === JUGADORX ? JUGADOR0 : JUGADORX,
      valores: this.state.valores,
      ganador: this.state.ganador
    });
  },

  render: function render() {
    var texto;
    texto = "Turno del " + this.state.turno;
    var victoria = this.state.ganador;

    return React.createElement(
      'div',
      null,
      React.createElement(Cabecera, { texto: texto }),
      React.createElement(Tablero, { valores: this.state.valores,
        manejadorTableroClick: this.appClick }),
      React.createElement(Reinicio, { texto: "Reinicio", manejadorReinicioClick: this.setInitialState }),
      React.createElement(Alert, { ganador: victoria })
    );
  }
});
module.exports = App;

},{"./Alert.jsx":1,"./Cabecera.jsx":3,"./Reinicio.jsx":5,"./Tablero.jsx":6}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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
      { style: casillaStyle, className: this.props.valor === '-' ? "clickable" : "no_clickable", onClick: this.casillaClick },
      this.props.valor
    );
  }
});
module.exports = Casilla;

},{}],5:[function(require,module,exports){
"use strict";

var Reinicio = React.createClass({
  displayName: "Reinicio",

  reinicioClick: function reinicioClick() {
    this.props.manejadorReinicioClick();
  },
  render: function render() {
    return React.createElement(
      "button",
      { className: "btnReinicio", onClick: this.reinicioClick },
      this.props.texto
    );
  }
});
module.exports = Reinicio;

},{}],6:[function(require,module,exports){
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

},{"./Casilla.jsx":4}],7:[function(require,module,exports){
"use strict";

var App = require("./App.jsx");
ReactDOM.render(React.createElement(App, null), document.getElementById('contenedor'));

},{"./App.jsx":2}]},{},[7]);
