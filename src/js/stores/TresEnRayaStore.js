const EventEmitter = require('events').EventEmitter;
var TresEnRayaDispatcher = require('../dispatchers/TresEnRayaDispatcher.js');
var Constants = require('../constants/TresEnRayaConstants.js');
var turno = Constants.JUGADORX;
var valoresTablero = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
var ganador = "";
var empate = 0;

var TresEnRayaStore = Object.assign({}, EventEmitter.prototype, {
  getTurno: function () {
    return turno;
  },
  getValores: function () {
    return valoresTablero;
  },
  getGanador: function() {
    return ganador;
  },
  getEmpate: function() {
    return empate;
  },
  addChangeListener(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },
  emitChange() {
    this.emit(Constants.CHANGE_EVENT);
  }
});

TresEnRayaDispatcher.register(function (payload) {
  switch (payload.type) {
    case Constants.ActionTypes.JUGAR_POSICION:
    let nuevoValor = turno === Constants.JUGADORX ? 'X' : '0';
    turno = turno === Constants.JUGADORX ? Constants.JUGADOR0 : Constants.JUGADORX;
    valoresTablero[payload.x][payload.y] = nuevoValor;
    empate++;
    //Misma columna
    var cuenta = 0;
    for( var i = 0; i < 3 ; i++){
      if(i != payload.x){
        if(valoresTablero[i][payload.y] == nuevoValor){
          cuenta++;
        }
      }
    }
    if(cuenta ==2){
      ganador = turno === Constants.JUGADORX ? Constants.JUGADOR0 : Constants.JUGADORX;
    }

    //Misma fila
    cuenta = 0;
    for( var i = 0; i < 3 ; i++){
      if(i != payload.y){
        if(valoresTablero[payload.x][i] == nuevoValor){
          cuenta++;
        }
      }
    }
    if(cuenta ==2){
      ganador = turno === Constants.JUGADORX ? Constants.JUGADOR0 : Constants.JUGADORX;
    }

    //Misma diagonal descendente
    var cuenta = 0;
    for( var i = 0; i < 3 ; i++){
      if((i != payload.y) && (i!= payload.x)){
        if(valoresTablero[i][i] == nuevoValor){
          cuenta++;
        }
      }
    }
    if(cuenta ==2){
      ganador = turno === Constants.JUGADORX ? Constants.JUGADOR0 : Constants.JUGADORX;
    }
    //Misma diagonal descendente
    var cuenta = 0;
    for( var i = 0; i < 3 ; i++){
      for(var j = 0; j < 3 ; j++){
        if((j != payload.y) && (i!= payload.x)){
          if((valoresTablero[i][j] == nuevoValor) && ((i + j) == 2)){
            cuenta++;
          }
        }
      }
    }
    if(cuenta ==2){
      ganador = turno === Constants.JUGADORX ? Constants.JUGADOR0 : Constants.JUGADORX;
    }
    if((empate === 9)&&(ganador === "")){
      ganador = "Empate";
    }
    TresEnRayaStore.emitChange();
    break;
    case Constants.ActionTypes.REINICIAR:
      nuevoValor = '-';
      var valores= valoresTablero;
      turno = Constants.JUGADORX;
      ganador = "";
      empate = 0;

      for( var i = 0; i < 3 ; i++){
        for(var j = 0; j < 3 ; j++){
          valoresTablero[i][j] = nuevoValor;
        }
      }
      TresEnRayaStore.emitChange();
      break;

  }
});
module.exports = TresEnRayaStore;
