/**
 * Kinnect App Photo Screening
 * https://github.com/facebook/react-native
 */

var React = require('react-native');
var {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RenderPagination,
} = React;

var Swiper = require('react-native-swiper');
var LinearGradient = require('react-native-linear-gradient');
var Utils = require('../lib/utils');

var ImageSelectionView = React.createClass({
  getInitialState() {
    return {
      images: []
    }
  },

  componentWillMount() {
    Utils.getRequest('users/get_photos', {}, this.handleGetImagesCallback, this.props.user);
  },

  handleGetImagesCallback(err, res) {
    if (!err) {
      var data = JSON.parse(res.text);
      this.setState({ images: data });
    }
  },

  renderPagination(index, total) {
    return (
      <View style={{
        position: 'absolute',
        bottom: -25,
        right: 10,
      }}>
      </View>
    )
  },

  render: function() {
    var slides = this.state.images.map((image) => {
      console.log(image.source.replace('https', 'http'));
      return (
        <View style={styles.slide}>
          <Image style={styles.image} source={{ uri: image.source.replace('https', 'http') }} />
        </View>
      );
    });

    if (slides.length > 0) {
      var swipper = (
        <Swiper height={240} loop={false} renderPagination={this.renderPagination}
          paginationStyle={{
            bottom: 0, left: null, right: 10,
          }} >
          {slides}
        </Swiper>
      );
    }

    return (
      <LinearGradient colors={['#0ba0d3', '#0774b7', '#023692']}
        style={styles.container}>
          <Image source={require('image!Icon')} style={styles.icon} />
          <View style={styles.button}>
            <Text style={styles.instruct}>
              Select the images you want to add to you Kinnection
            </Text>
            <Image style={styles.img} source={{uri:this.props.uri}} />
          </View>
          <View>
          {swipper}
        </View>
        <Text style={styles.instruct}>
          Once you have made your selections... go ahead and share the love...
        </Text>
        <TouchableOpacity onPress={this.submit}>
          <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.submit}>
            <Text style={styles.loginText}>SEND</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
})

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
    height:60,
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
  loginText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  submit: {
    position: 'relative',
    bottom: 100,
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 0,
    height: 35,
    width: 100,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    flex: 1,
  }
})

module.exports = ImageSelectionView;
