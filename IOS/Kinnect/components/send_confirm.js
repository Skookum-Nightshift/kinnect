/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

var React = require('react-native');
var {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} = React;

var LinearGradient = require('react-native-linear-gradient');
var SendConfirm = React.createClass({
  render: function() {
    return (
      <LinearGradient key="sendConfirm" colors={['#0ba0d3', '#0774b7', '#023692']}
        style={styles.container}>
        <Image source={require('image!Icon')} style={styles.icon} />
        <Text style={styles.instruct}>
          Success! Your memories are being shared!
        </Text>
      </LinearGradient>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  icon:{
    position: 'relative',
    width: 60,
    height: 60,
    alignSelf:'center',
    opacity: 50,
    padding: 25,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: 'white',
  },
  instruct: {
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
    color: '#FFFFFF',
    width: 200,
    flex: 2,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  text: {
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
    color: '#FFFFFF',
    justifyContent: 'center',
    width: 200,
    backgroundColor: 'rgba(0,0,0,0)',
  },

});

module.exports = SendConfirm;
