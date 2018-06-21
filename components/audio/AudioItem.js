/**
 * Template React Native
 * created by qiangxu on 2018/6/21
 * @flow
 */

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Touchable, TouchableParamsNormal} from "../../service/utils";
import {Icon} from "../utils/icon";
import propTypes from "prop-types";
import {AudioService} from "../../service/Audio";

function Format(number) {
  return (number > 9 ? "" : "0") + number;
}

function TimeFormat(seconds) {
  return Format(Math.floor(seconds / 60)) + ":" + Format(seconds % 60);
}

export class AudioItemComponent extends Component {
  static propTypes = {
    file: propTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      countDown: props.file.size,
      countDownFormat: TimeFormat(props.file.size),
      timer: 0,
    };
  }

  play() {
    if (!this.state.timer) {
      const timer = setInterval(() => {
        let countDown = this.state.countDown;
        countDown = countDown - 1;
        if (countDown <= 0) {
          clearInterval(timer);
          countDown = this.props.file.size;
        }
        const countDownFormat = TimeFormat(countDown);
        this.setState({
          countDownFormat,
          countDown,
        });
      }, 1000);
      AudioService.play(this.props.file.path);
      this.setState({
        timer,
      });
    }
  }

  stop() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
      const countDown = this.props.file.size;
      const countDownFormat = TimeFormat(countDown);
      this.setState({
        timer: 0,
        countDownFormat,
        countDown,
      });
    }
  }

  render() {
    return <View style={{
      flexDirection: "row",
      height: 50,
      borderBottomColor: "#eee",
      borderBottomWidth: 1,
    }}>
      <Touchable {...TouchableParamsNormal} style={{flex: 1, paddingLeft: 10,}} onPress={() => {
        this.state.timer ? this.stop() : this.play();
      }}>
        <Icon style={{lineHeight: 50, fontSize: 30, color: "#666"}} name={this.state.timer ? "bofang1" : "bofang"}/>
      </Touchable>
      <Text style={{lineHeight: 50, paddingRight: 15,}}>{this.state.countDownFormat}</Text>
    </View>;
  }
}
