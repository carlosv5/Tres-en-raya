const casillaStyle = {
  height: '100px',
  width: '100px'
};
let Casilla = React.createClass({
  casillaClick: function(){
    if(this.props.valor==="-"){
      this.props.manejadorCasillaClick(this.props.indiceFila, this.props.indiceColumna);
    }
  },
  render: function(){
    return (
      <button style={casillaStyle} className={this.props.valor==="-" ?
      "clickable":"no_clickable"} className={this.props.valor==="X" ? "black":"white"} onClick={this.casillaClick}>
      {this.props.valor}
      </button>
    )
  }
});
module.exports = Casilla;
