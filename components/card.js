/**
 * Template React Native
 * created by qiangxu on 2018/6/11
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, Image, Platform, StatusBar} from 'react-native';
import {Icon} from './utils/icon';

import {Touchable, TouchableParams} from "./utils/utils";

export class CardComponent extends Component {
  static navigationOptions() {
    return {
      // headerTintColor: "#fff",
      // headerTitle: <Text style={{color: "#fff"}}>CardComponent111</Text>,
      // // header: Platform.OS === 'ios' ? undefined : null,
      // headerRight: <Icon style={{color: "#fff", fontSize: 20, paddingRight: 10, paddingLeft: 10}}
      //                    name={"ios-more"}></Icon>,
      // headerStyle: [{backgroundColor: '#3478f6'},],
      headerTintColor: "#666",
      headerTitle: <Text style={{color: "#666"}}>CardComponent</Text>,
      headerRight: <Icon style={{color: "#666", fontSize: 20, paddingRight: 10, paddingLeft: 10}}
                         name={"ios-more"}></Icon>,
      headerStyle: [{backgroundColor: '#fff'},],
    };
  };

  render() {
    return <View>
      <View style={{flex: 1}}>
        <Text>Card</Text>
      </View>
    </View>
      ;
  }
}
