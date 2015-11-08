var Resultado = React.createClass({
  render: function(){
    return (
      <header className="resultado">
      {this.props.texto}
      </header>
    )
  }
});
module.exports = Resultado;
