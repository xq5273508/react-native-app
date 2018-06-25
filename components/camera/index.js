/**
 * Template React Native
 * created by qiangxu on 2018/6/25
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {CountDownComponent} from "../utils/CountDown";


export class CameraComponent extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      image: "",
      video: "",
      start: false,
      cameraType: RNCamera.Constants.Type.back,
      flashMode: RNCamera.Constants.FlashMode.off
    };
  }

  onPressIn() {
    this.setState({
      start: false,
    });
  }

  onLongPress() {
    this.setState({
      start: true,
    });
    this.recordAsync().then(() => {

    });
  }

  onPressOut() {
    if (this.state.start) {
      this.setState({
        start: false,
      });
      this.onAnimationComplete();
    }
    else {
      this.takePicture();
    }
  }

  onAnimationComplete() {
    this.stopRecording();
  }

  //切换前后摄像头
  switchCameraType() {
    let cameraType = this.state;
    if (cameraType === RNCamera.Constants.Type.back) {
      cameraType = RNCamera.Constants.Type.front;
    } else {
      cameraType = RNCamera.Constants.Type.back;
    }
    this.setState({cameraType});
  }

  switchFlashMode() {
    let flashMode = this.state.flashMode;
    if (flashMode === RNCamera.Constants.FlashMode.off) {
      flashMode = RNCamera.Constants.FlashMode.on;
    } else {
      flashMode = RNCamera.Constants.FlashMode.off;
    }
    this.setState({flashMode});
  }

  async recordAsync() {
    if (this.camera) {
      let data = await this.camera.recordAsync();
      this.state.video = data.uri;
    }
  }

  stopRecording() {
    this.camera.stopRecording();
  }

  async takePicture() {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options)
      this.setState({image: data.uri})
    }
  }

  render() {
    let content;
    if (this.state.image) {
      content = <Image style={{flex: 1}}
                       source={{uri: this.state.image}}></Image>;
    }
    else if (this.state.video) {
      content = <Image style={{flex: 1}}
                       source={{uri: this.state.image}}></Image>;
    }
    else {
      content = <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={styles.preview}
        type={this.state.cameraType}
        flashMode={this.state.flashMode}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera phone'}
      />;
    }
    return (
      <View style={styles.container}>
        {content}
        <View style={{
          position: "absolute",
          bottom: 30,
          left: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>

          {/*<Text style={styles.button} onPress={this.switchCameraType.bind(this)}>[切换摄像头]</Text>*/}
          {/*<Text style={styles.button} onPress={this.switchFlashMode.bind(this)}>[打开/关闭闪光灯]</Text>*/}
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.touchable}
            onPressIn={this.onPressIn.bind(this)}
            onLongPress={this.onLongPress.bind(this)}
            onPressOut={this.onPressOut.bind(this)}>
            <CountDownComponent start={this.state.start}
                                onAnimationComplete={this.onAnimationComplete.bind(this)}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: 'black'
//   },
//   preview: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center'
//   },
//   touchable: {
//     alignSelf: 'center',
//     flex: 1,
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolBar: {
    width: 200,
    margin: 40,
    backgroundColor: '#000000',
    justifyContent: 'space-between',

  },
  button: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40,
  }
});

