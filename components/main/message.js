/**
 * Template React Native
 * created by qiangxu on 2018/6/11
 * @flow
 */

import React, {Component} from 'react';
import {View, Text,} from 'react-native';
import {GlobalStyle, Touchable, TouchableParams} from "../../service/utils";

export class MessageComponent extends Component {

  render() {
    return <View style={GlobalStyle.container}>
      <Touchable {...TouchableParams}
                 onPress={(() => {
                   this.props.navigation.push("Page.Audio");
                 }).bind(this)}>
        <View style={{width: 50, height: 50,paddingTop: 20, paddingLeft: 20,}}><Text>录音</Text></View>
      </Touchable>
    </View>;
  }
}
