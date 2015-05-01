/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

var React = require('react-native');
var {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
} = React;

var LinearGradient = require('react-native-linear-gradient');
var FacebookLoginManager = require('NativeModules').FacebookLoginManager;

var Kinnect = React.createClass({
  getInitialState() {
    return {
      result: 'Thanks for using Kinnect to share memories with your loved ones. Log into Facebook to get started'
    }
  },
  login() {
    FacebookLoginManager.newSession((error, info) => {
      if (error) {
        this.setState({result: error});
      } else {
        console.log(info);
        this.setState({result: info});
      }
    });
  },
  render: function() {
    return (
      <LinearGradient colors={['#0ba0d3', '#0774b7', '#023692']} style={styles.container}>
        <View style={styles.box}>
          <Image
            source={require('image!Icon')}
            style={styles.icon}/>
          <Text style={styles.kinnect}>
            KINNECT
          </Text>
          <Text style={styles.welcome}>
            {JSON.stringify(this.state.result)}
          </Text>
          <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.login}>
            <TouchableHighlight onPress={this.login}>
              <Text style={styles.loginText}>Login with Facebook</Text>
            </TouchableHighlight>
          </LinearGradient>
        </View>
      </LinearGradient>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    borderWidth: 0.25,
    borderColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 0.25,
    borderColor:'#FFFFFF',
    alignSelf: 'center',
    alignItems: 'center',
    height: 35,
    width: 200,
  },
  loginText: {
    textAlign:'center',
    color:'#FFFFFF',
    fontFamily:'Avenir'
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

  welcome: {
    fontSize: 12,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Avenir'
  },
  kinnect: {
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
    color: '#FFFFFF',
    padding: 10,
  },
  instruct: {
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  text:{
    textAlign:'center',
    color:'#000000',
  },
});

AppRegistry.registerComponent('Kinnect', () => Kinnect);
