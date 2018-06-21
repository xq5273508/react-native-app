/**
 * Template React Native
 * created by qiangxu on 2018/6/11
 * @flow
 */

import React, {Component} from 'react';
import {Platform, View} from 'react-native';
import {GlobalStyle} from "../../service/utils";

export class MyComponent extends Component {
  render() {
    return <View style={GlobalStyle.container}>
    </View>;
  }
}
