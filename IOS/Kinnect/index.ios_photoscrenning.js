/**
 * Kinnect App Photo Screening
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
  RenderPagination,
  } = React;
var Swiper = require('react-native-swiper');
var LinearGradient = require('react-native-linear-gradient');
var renderPagination = function (index, total) {
    return (
      <View style={{
        position: 'absolute',
        bottom: -25,
        right: 10,
      }}>
      </View>
    )
  }
  var Kinnect = React.createClass({
  render: function() {
   return (
     <LinearGradient colors={['#0ba0d3', '#0774b7', '#023692']} style={styles.container}>
     <View>
     <Image
       source={require('image!Icon')}
       style={styles.icon}/>
   </View>
   <View style={styles.button}>
   <Text style={styles.instruct}>Select the images you want to add to you Kinnection</Text>
     <Image style={styles.img} source={{uri:this.props.uri}} />
   </View>
   <View>
       <Swiper style={styles.wrapper} height={240}
         renderPagination={renderPagination}
         paginationStyle={{
           bottom: 0, left: null, right: 10,
         }} loop={false}>
         <View style={styles.slide}>
           <Image style={styles.image} source={{uri: 'http://c.hiphotos.baidu.com/image/w%3D310/sign=0dff10a81c30e924cfa49a307c096e66/7acb0a46f21fbe096194ceb468600c338644ad43.jpg'}} />
         </View>
         <View style={styles.slide}>
           <Image style={styles.image} source={{uri: 'http://a.hiphotos.baidu.com/image/w%3D310/sign=4459912736a85edffa8cf822795509d8/bba1cd11728b4710417a05bbc1cec3fdfc032374.jpg'}} />
         </View>
         <View style={styles.slide}>
           <Image style={styles.image} source={{uri: 'http://e.hiphotos.baidu.com/image/w%3D310/sign=9a8b4d497ed98d1076d40a30113eb807/0823dd54564e9258655f5d5b9e82d158ccbf4e18.jpg'}} />
         </View>
         <View style={styles.slide}>
           <Image style={styles.image} source={{uri: 'http://e.hiphotos.baidu.com/image/w%3D310/sign=2da0245f79ec54e741ec1c1f89399bfd/9d82d158ccbf6c818c958589be3eb13533fa4034.jpg'}} />
         </View>
       </Swiper>
     </View>
     <Text style={styles.instruct}>Once you have made your selections... go ahead and share the love...</Text>
     </LinearGradient>
   )
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
    flex: 1,
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
  },
  wrapper: {
    position: 'relative',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    borderColor: '#192f6a',
    borderWidth: 20,
    position: 'relative',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    flex: 2,
    }
})

  AppRegistry.registerComponent('Kinnect', () => Kinnect);
