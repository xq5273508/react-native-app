/**
 * Template React Native
 * created by qiangxu on 2018/6/25
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
} from 'react-native';
import {RNCamera} from 'react-native-camera';


export class ScanComponent extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      moveAnim: new Animated.Value(-200),
      type: null,
      data: null
    };
  }

  componentDidMount() {
    this.startAnimation();
  }

  startAnimation = () => {
    this.state.moveAnim.setValue(-200);
    Animated.timing(
      this.state.moveAnim,
      {
        toValue: 0,
        duration: 4000,
        easing: Easing.linear
      }
    ).start(() => this.startAnimation());
  };
  //  识别二维码
  onBarCodeRead = (result) => {
    if (!this.state.data) {
      const {type, data} = result;
      this.setState({type, data});
      alert(JSON.stringify({type, data}));
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          onBarCodeRead={this.onBarCodeRead}
        >
          <View style={styles.rectangleContainer}>
            <View style={styles.rectangle}/>
            <Animated.View style={[
              styles.border,
              {transform: [{translateY: this.state.moveAnim}]}]}/>
            <Text style={styles.rectangleText}>将二维码放入框内，即可自动扫描</Text>
          </View>
        </RNCamera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  rectangle: {
    height: 200,
    width: 200,
    borderWidth: 1,
    borderColor: '#00FF00',
    backgroundColor: 'transparent'
  },
  rectangleText: {
    flex: 0,
    color: '#fff',
    marginTop: 10
  },
  border: {
    flex: 0,
    width: 200,
    height: 5,
    backgroundColor: '#00FF00',
  }
});
