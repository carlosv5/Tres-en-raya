var Reinicio = React.createClass({
  reinicioClick: function(){
      this.props.manejadorReinicioClick();
  },
  render: function(){
    return (
      <button className="btnReinicio" onClick={this.reinicioClick}>
      {this.props.texto}
      </button>
    )
  }
});
module.exports = Reinicio;
