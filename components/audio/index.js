import React, {Component} from "react";
import {View, Text, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {RecordingView} from "./recording";
import {AudioService} from "../../service/Audio";
import {GlobalStyle} from "../../service/utils";
import {Icon} from '../utils/icon';
import {AudioItemComponent} from "./AudioItem";

const styles = StyleSheet.create({
  list: {},
  record: {}
});

export class AudioComponent extends Component {

  static navigationOptions = {
    title: "长按录音",
    // headerRight: <Touchable {...TouchableParamsNormal}>
    //   <Icon style={{color: "#1078FD", fontSize: 20, paddingRight: 10, paddingLeft: 10}}
    //         name={"more"}></Icon>
    // </Touchable>,
    headerStyle: [{backgroundColor: '#fff'},],
  };
  state = {
    animated: false,
    files: [],
  };

  longPress() {
    console.log("longPress", Date.now());
    AudioService.record().then(() => {
      console.log("recording", Date.now())
    });
    this.setState({
      animated: true,
    });
  }

  pressOut() {
    if (this.state.animated) {
      AudioService.stop().then((file) => {
        const files = this.state.files;
        files.push(file);
        this.setState({files})
      }, error => {
        console.warn(error);
      });
      this.setState({
        animated: false,
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
      <View style={{height: 150, justifyContent: "center", alignItems: "center"}}>
        <TouchableOpacity activeOpacity={0.7}
                          style={{backgroundColor: "#1078FD", height: 100, width: 100, borderRadius: 50, padding: 0}}
                          onLongPress={this.longPress.bind(this)}
                          onPressOut={this.pressOut.bind(this)}>
          <Icon style={{fontSize: 40, lineHeight: 100, color: "#fff", textAlign: "center"}} name="shengyin"/>
        </TouchableOpacity></View>
      {this.state.animated ? <RecordingView/> : null}
    </View>);
  }
}