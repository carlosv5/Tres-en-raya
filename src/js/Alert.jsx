var Alert = React.createClass({
  render: function(){
    if(this.props.ganador != ""){
      alert(this.props.ganador + " ha ganado");
    }
    return (
      <div >
      </div>
    )
  }
});
module.exports = Alert;
