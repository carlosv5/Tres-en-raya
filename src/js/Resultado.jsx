var Reinicio = React.createClass({
  reinicioClick: function(){
      this.props.manejadorReinicioClick();
  },
  render: function(){
    return (
      <button className="btnReinicio">
      {this.props.texto}
      </button>
    )
  }
});
module.exports = Resultado;
