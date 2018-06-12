/**
 * Template React Native
 * created by qiangxu on 2018/6/12
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, Platform, StyleSheet} from 'react-native';
import {Icon} from "../utils/icon";
import {Touchable, TouchableParams} from "../utils/utils";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  search: {
    backgroundColor: "#fff",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#d4d4d4",
    ...Platform.select({
      ios: {
        height: 70,
        paddingTop: 20
      },
      android: {
        height: 50,
      }
    })
  },
  title: {
    flex: 1,
    fontSize: 18,
    lineHeight: 50,
    paddingLeft: 10,
  },
  icon: {
    width: 40,
    textAlign: "center",
    fontSize: 18,
    lineHeight: 50,
  }
});

export class SearchComponent extends Component {
  static propTypes = {
    onAddClick: PropTypes.func
  };
  static defaultProps = {
    onAddClick() {
    }
  }

  render() {
    return <View style={styles.search}>
      <Text style={styles.title}>迈迪信息技术有限公司</Text>
      <Touchable {...TouchableParams} onPress={() => {
        console.log("查询", 1000);
      }}><View><Icon style={styles.icon} name="search-thin"/></View></Touchable>
      <Touchable {...TouchableParams} onPress={() => {
        this.props.onAddClick();
      }}>
        <View><Icon style={styles.icon} name="add"/></View>
      </Touchable>
    </View>;
  }
}
