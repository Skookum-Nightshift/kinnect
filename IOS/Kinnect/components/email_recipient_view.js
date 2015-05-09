var React = require('react-native');
var {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  AlertIOS,
  ActivityIndicatorIOS,
} = React;

var LinearGradient = require('react-native-linear-gradient');
var Utils = require('../lib/utils');
var RecipientConfirmationView = require('./recipient_confirmation_view');
var EmailRecipientView = React.createClass({

  getInitialState() {
    return {
      emails: [ '' ],
      sending: false,
      createdSuccessfully: false
    };
  },

  updateEmail(index, text) {
    var emails = this.state.emails;
    emails[index] = text;
    this.setState({ emails: emails });
  },

  addEmail() {
    var emails = this.state.emails;
    emails.push("");
    this.setState({ emails: emails });
  },

  reset() {
    this.setState({ emails: [ '' ] });
  },

  submit() {
    this.setState({ sending: true }, () => {
      Utils.postRequest('users/add_recipients', {
        emails: this.state.emails
      }, this.handleSubmitCallback, this.props.user);
    });
  },

  handleSubmitCallback(err, res) {
    var data = JSON.parse(res.text);
    if (data.state === 'ok') {
      this.setState({ createdSuccessfully: true });
    } else {
      AlertIOS.alert(
        'Issue adding recipients',
        data.message
      );
    }
  },

  render() {
    if (this.state.createdSuccessfully) {
      return <RecipientConfirmationView />;
    }

    var emails = this.state.emails.map((email, index) => {
      return (
        <View style={styles.email}>
          <Text style={styles.text}>Email {index+1}</Text>
          <TextInput style={styles.input}
            onChangeText={this.updateEmail.bind(this, index)} />
        </View>
      );
    });

    var viewContent = (
      <ScrollView style={styles.emailsWrapper}>
        <ActivityIndicatorIOS size="large" />
      </ScrollView>
    );

    if (!this.state.sending) {
      viewContent = (
        <ScrollView style={styles.emailsWrapper}>
          {emails}
          <View style={styles.buttonGroup}>
            <TouchableOpacity onPress={this.addEmail}>
              <View style={styles.singleButton}>
                <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']}
                  style={styles.addButton}>
                  <Text style={styles.loginText}>Add Email</Text>
                </LinearGradient>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    }

    return (
      <LinearGradient colors={['#0ba0d3', '#0774b7', '#023692']}
        style={styles.container}>
        <Image source={require('image!Icon')} style={styles.icon} />
        <Text style={styles.instruct}>
          Enter your recipient emails below.
        </Text>
        {viewContent}
        <View style={styles.buttonGroup}>
          <TouchableOpacity onPress={this.submit}>
            <View style={styles.buttons}>
              <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.submit}>
                <Text style={styles.loginText}>SEND</Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.reset}>
            <View style={styles.buttons}>
              <LinearGradient colors={['#ff4040','#cd3333', '#8b2323']}
                style={styles.submit}>
                <Text style={styles.loginText}>RESET</Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start',
    padding: 50,
  },
  emailsWrapper: {
    flex: 8
  },
  icon:{
    position: 'relative',
    width: 60,
    height: 60,
    alignSelf:'center',
    opacity: 50,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: 'white',
  },
  submit: {
    paddingVertical: 1,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 0,
    borderColor:'#FFFFFF',
    height: 25,
    marginHorizontal: 5,
  },
  addButton: {
    paddingVertical: 1,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 0,
    borderColor:'#FFFFFF',
    height: 25,
  },
  email: {
    alignSelf: 'center',
    height: 75,
    padding: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    flex: 1,
  },
  buttons:{
    alignSelf: 'flex-end',
    flex: 3,
    height: 10,
    padding: 20,
  },
  singleButton: {
    flex: 1,
    height: 20,
    padding: 20,
  },
  input: {
    backgroundColor:'white',
    height: 40,
    width: 275,
    borderColor: '#192f6a',
    borderWidth: 1,
    opacity: .25,
    paddingHorizontal: 5,
  },
  instruct: {
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
    color: '#FFFFFF',
    padding: 25,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  text: {
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 12,
    color: '#FFFFFF',
    backgroundColor: 'rgba(0,0,0,0)',
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
    fontFamily:'Avenir',
    backgroundColor: 'rgba(0,0,0,0)',
  },
});

module.exports = EmailRecipientView;
