/**
 * Template React Native
 * created by qiangxu on 2018/6/11
 * @flow
 */

import React, {Component} from 'react';
import {Text} from 'react-native';
import PropTypes from "prop-types";
import {FontCode} from "./Icon-font";

export class Icon extends Component {
  static propTypes = {
    style: PropTypes.any,
    name: PropTypes.string.isRequired
  };

  render() {
    return <Text style={[this.props.style, {fontFamily: "iconfont"}]}>{FontCode[this.props.name]}</Text>;
  }
}
