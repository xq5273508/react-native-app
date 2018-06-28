import React, {Component} from "react";
import {View, Text, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {AudioService} from "../../service/Audio";
import {GlobalStyle} from "../../service/utils";
import {Icon} from '../utils/icon';
import {AudioItemComponent} from "./AudioItem";
import {CountDownComponent} from "../utils/CountDown";


export class AudioComponent extends Component {

  static navigationOptions = {
    title: "长按录音",
    headerStyle: [{backgroundColor: '#fff'},],
  };
  state = {
    files: [],
    recording: false,
  };

  onPressIn() {
    AudioService.record();
    this.setState({
      recording: true,
    });
  }

  onAnimationComplete() {
    if (this.state.recording) {
      this.setState({
        recording: false,
      });
      AudioService.stop().then((file) => {
        if (file.size >= 1) {
          const files = this.state.files;
          files.push(file);
          this.setState({files})
        }
      }, error => {
        console.warn(error);
      });
    }
  }

  render() {
    return (<View style={GlobalStyle.container}>
      <ScrollView style={{flex: 1}}>
        {this.state.files.map(_file => {
          return <AudioItemComponent key={_file.name} file={_file}/>;
        })}
      </ScrollView>
      <View style={{
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        justifyContent: 'center',
      }}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={{
            alignSelf: 'center',
          }}
          onPressIn={this.onPressIn.bind(this)}
          onPressOut={this.onAnimationComplete.bind(this)}>
          <CountDownComponent
            start={this.state.recording}
            onAnimationComplete={this.onAnimationComplete.bind(this)}>
            <View style={{
              width: 88,
              height: 88,
              borderRadius: 44,
              backgroundColor: "#1078FD"
            }}>
              <Icon style={{fontSize: 40, lineHeight: 88, color: "#fff", textAlign: "center"}} name="shengyin"/>
            </View>
          </CountDownComponent>
        </TouchableOpacity>
      </View>
    </View>);
  }
}