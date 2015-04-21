/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

var React = require('react-native');
var {
  AppRegistry,
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
      result: '...'
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
        <TouchableHighlight onPress={this.login} >
          <Text>Login</Text>
        </TouchableHighlight>
        <Text style={styles.welcome}>
          {JSON.stringify(this.state.result)}
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Kinnect', () => Kinnect);
