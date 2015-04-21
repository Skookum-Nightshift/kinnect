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
  AsyncStorage
} = React;

var Utils = require('./lib/utils');

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
        var data = { id: info.id, expirationDate: info.expirationDate };
        AsyncStorage.setItem("user", JSON.stringify(data))
        .then(() => {
          var data = { user: {} };
          data.user.email =  info.userEmail;
          data.user.name = info.userName;
          data.user.token = info.token;
          data.user.id = info.userId;

          Utils.postRequest('users/sign_in', data, () => {
            this.setState({result: "signed in"});
          });
        })
        .catch((error) => { this.setState({result: "Error while loging in"}); })
        .done();
      }
    });
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.box}>
        <Image
          source={require('image!Icon')}
          style={styles.image}/>
          <Text style={styles.kinnect}>
          KINNECT
          </Text>
          <Text style={styles.welcome}>
          {JSON.stringify(this.state.result)}
        </Text>
        <TouchableHighlight onPress={this.login} style={styles.login} >
          <Text style={styles.text}>Login with Facebook</Text>
        </TouchableHighlight>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  image:{
    borderWidth: 0.25,
    borderColor:'#FFFFFF',
    position: 'relative',
    width: 40,
    height: 40,
    alignSelf:'center',
    opacity: 100,
  },
  container: {
    borderWidth: 0.25,
    borderColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000FFF',
  },
  box:{
    borderBottomWidth: 0.25,
    borderTopWidth: 0.25,
    borderColor: '#FFFFFF',
    height: 300,
    justifyContent: 'center',
    padding: 25,
  },
  welcome: {
    fontSize: 10,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  kinnect: {
    fontFamily: 'Futura',
    textAlign: 'center',
    fontSize: 10,
    color: '#FFFFFF',
  },
  instructions: {
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  login:{
    borderWidth: 0.25,
    borderColor:'#FFFFFF',
    alignSelf: 'center',
    height: 50,
    width: 100,
    padding: 5,
  },
  text:{
    textAlign:'center',
    color:'#000000',
  },
});

AppRegistry.registerComponent('Kinnect', () => Kinnect);
