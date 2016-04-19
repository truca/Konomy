var React = require('react');
var ReactDOM = require('react-dom');

var io = require( 'socket.io-client' );
var socket = io.connect( "http://localhost:3000" );

var App = React.createClass({
  componentDidMount(){
    
  },
  render() {
    return (
      <div>
        <p>Hola Mundo!</p>
        <Sidebar></Sidebar>
      </div>
    );
  }
});

var Sidebar = React.createClass({
  getInitialState(){
    return {cities: []}
  },
  componentDidMount(){
    var self = this;
    socket.emit('get all city', null)
    socket.on('return all city', function(cities){
      self.setState({cities: cities});
      console.log(cities)
    });
  },
  render(){
    var self = this;
    return (
      <ul>
        {self.state.cities.map(function(city, i){
          return (<li key={i}>{city.name}</li>)
        })}
      </ul>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('content')
);
