var React = require('react');
var ReactDOM = require('react-dom');

var Cabecera = React.createClass({
  render: function(){
    return (
      <header>
      {this.props.texto}
      </header>
    )
  }
});
module.exports = Cabecera;
