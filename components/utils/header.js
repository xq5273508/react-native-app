/**
 * Template React Native
 * created by qiangxu on 2018/6/11
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  StatusBar as StatusBarOrigin
} from 'react-native';
import PropTypes from "prop-types";
import {Icon} from './icon';

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#d4d4d4",
  },
  icon: {
    lineHeight: 35,
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: "bold",
    fontSize: 26,
  },
  title: {
    lineHeight: 35,
    fontSize: 14,
    paddingLeft: 5,
  }
});

export class HeaderComponent extends Component {
  static propTypes = {
    navigation: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
    rightRender: PropTypes.func,
    willBack: PropTypes.func
  };
  static defaultProps = {
    rightRender() {
    }
  };

  back() {
    if (this.props.willBack && this.props.willBack() === false) {
      return;
    }
    this.props.navigation.pop()
  }

  render() {
    const Touchable = Platform.select({
      "ios": TouchableOpacity,
      "android": TouchableNativeFeedback
    });

    const params = Platform.select({
      "ios": {activeOpacity: 0.7}
    });
    return <View style={styles.header}>
      {/*<StatusBarOrigin />*/}
      {/*<StatusBar/>*/}
      <View style={{flexDirection: "row",}}>
        <Touchable {...params}
                   onPress={this.back.bind(this)}>
          <Icon style={styles.icon} name="ios-arrow-back">
          </Icon>
        </Touchable>
        <View style={{flex: 1}}>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
        {this.props.rightRender(styles.icon)}
      </View>
    </View>;
  }
}
