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
  TextInput,
  TouchableHighlight,
} = React;
var LinearGradient = require('react-native-linear-gradient');
var Kinnect = React.createClass({
  render: function() {
    return (
      <LinearGradient colors={['#0ba0d3', '#0774b7', '#023692']} style={styles.container}>
        <View>
          <Image
            source={require('image!Icon')}
            style={styles.icon}/>
              <View style={styles.email}>
                <Text style={styles.text}>Email 1</Text>
                  <TextInput style={styles.input}
                  onChangeText={(text) => this.setState({input: text})}
                  />
              </View>
              <View style={styles.email}>
                <Text style={styles.text}>Email 2</Text>
                  <TextInput style={styles.input}
                  onChangeText={(text) => this.setState({input: text})}
                  />
              </View>
              <View style={styles.email}>
                <View><Text style={styles.text}>Email 3</Text></View>
                  <TextInput style={styles.input}
                  onChangeText={(text) => this.setState({input: text})}
                  />
                  </View>
                <View style={styles.buttons}>
                <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.submit}>
                  <TouchableHighlight onPress={this.submit}>
                    <Text style={styles.loginText}>SEND</Text>
                  </TouchableHighlight>
                </LinearGradient>
                  <LinearGradient colors={['#ff4040','#cd3333', '#8b2323']} style={styles.submit}>
                    <TouchableHighlight onPress={this.reset}>
                      <Text style={styles.loginText}>RESET</Text>
                    </TouchableHighlight>
                  </LinearGradient>
                  </View>
          </View>
      </LinearGradient>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon:{
    position: 'relative',
    width: 75,
    height:75,
    alignSelf:'center',
    opacity: 50,
    padding: 25,
  },
  submit: {
    paddingVertical: 1,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 0.25,
    borderColor:'#FFFFFF',
    height: 25,
    width: 100,
  },
  email: {
    flex: 2,
    alignSelf: 'center',
    height: 75,
    padding: 20,
  },
    buttons:{
      alignSelf: 'flex-end',
      padding: 10,
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'white',
    borderWidth: 0.3,
    opacity: .5,
  },
  text: {
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 12,
    color: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  login: {
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
    color: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 15,
    textAlign:'center',
    color:'#FFFFFF',
    fontFamily:'Avenir'
  },
});

AppRegistry.registerComponent('Kinnect', () => Kinnect);
