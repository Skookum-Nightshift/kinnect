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
  TouchableOpacity,
  AsyncStorage
} = React;

var Icon = require('FAKIconImage');
var EmailRecipientView = require('./components/email_recipient_view');
var ImageSelectionView = require('./components/image_selection_view');
var Utils = require('./lib/utils');
var LinearGradient = require('react-native-linear-gradient');
var FacebookLoginManager = require('NativeModules').FacebookLoginManager;

var Kinnect = React.createClass({
  getInitialState() {
    return {
      loggedIn: false,
      newUser: false,
      users: {},
      result: 'Thanks for using Kinnect to share memories with your loved ones. Log into Facebook to get started'
    }
  },

  login() {
    FacebookLoginManager.newSession((error, info) => {
      if (error) {
        this.setState({ result: 'Was unable to sign in' });
      } else {
        var data = { id: info.id, expirationDate: info.expirationDate };
        AsyncStorage.setItem('user', JSON.stringify(data))
        .then(() => {
          var data = { user: {} };
          data.user.email =  info.userEmail;
          data.user.name = info.userName;
          data.user.token = info.token;
          data.user.id = info.userId;

          Utils.postRequest('users/sign_in', data, (err, res) => {
            if (!err) {
              var data  = JSON.parse(res.text);
              this.setState({
                loggedIn: true,
                user: { token: info.token, id: info.userId },
                newUser: data.newUser
              });
            }
          });
        })
        .catch((error) => { this.setState({ result: 'Was unable to sign in' }); })
        .done();
      }
    });
  },

  render: function() {
    if (this.state.loggedIn) {
      if (!this.state.newUser) {
        return <ImageSelectionView user={this.state.user} />;
      }
      return <EmailRecipientView user={this.state.user} />;
    }

    return (
      <LinearGradient colors={['#0ba0d3', '#0774b7', '#023692']}
        style={styles.container}>
        <View style={styles.box}>
          <Image source={require('image!Icon')} style={styles.image} />
          <Text style={styles.kinnect}>
            KINNECT
          </Text>
          <Text style={styles.welcome}>
            {this.state.result}
          </Text>
          <TouchableOpacity onPress={this.login}>
            <View style={styles.login}>
              <Icon name='fontawesome|facebook' style={styles.faIcon} size={30} color='#FFFFFF' />
              <Text style={styles.loginText}>
                Login with Facebook
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
});

var styles = StyleSheet.create({
  faIcon: {
    width: 30,
    height: 35,
    flex: 1,
  },
  login: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
    height: 35,
    width: 200,
    backgroundColor: '#023692',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loginText: {
    flex: 9,
    fontSize: 15,
    textAlign:'center',
    color:'#FFFFFF',
    fontFamily:'Avenir',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  image:{
    position: 'relative',
    width: 75,
    height: 75,
    alignSelf:'center',
    opacity: 100,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#3b5998',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderColor: '#FFFFFF',
    height: 200,
    justifyContent: 'center',
    padding: 25,
  },
  welcome: {
    fontSize: 12,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  kinnect: {
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
    color: '#FFFFFF',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  instructions: {
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
