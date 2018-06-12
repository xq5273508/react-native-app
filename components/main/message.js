/**
 * Template React Native
 * created by qiangxu on 2018/6/11
 * @flow
 */

import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Platform} from 'react-native';
import {PageStyle, Touchable, TouchableParams} from "../utils/utils";

export class MessageComponent extends Component {
  render() {
    return <View style={PageStyle.container}>
      <Touchable {...TouchableParams} onPress={(() => {
        this.props.navigation.push("Card.Component");
      }).bind(this)}>
        <View style={{width: 100, height: 50}}><Text>点击跳转新页</Text></View>
      </Touchable>
      <Touchable {...TouchableParams} onPress={(() => {
        this.props.navigation.push("Widget.Audio");
      }).bind(this)}>
        <View style={{width: 50, height: 50}}><Text>录音</Text></View>
      </Touchable>
    </View>;
  }
}
