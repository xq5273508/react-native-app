/**
 * Template React Native
 * created by qiangxu on 2018/6/11
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform, View, Text, Image, StyleSheet, Dimensions, ScrollView
} from 'react-native';
import {getCommon, getMod} from "../../service/main/menu";
import {PageStyle, Touchable, TouchableParams} from "../utils/utils";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomColor: "#d4d4d4",
    borderBottomWidth: 1
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    paddingTop: 15,
    paddingLeft: 15,
  },
  menu: {
    alignItems: "center",
    width: Dimensions.get('window').width / 4,
    marginTop: 10,
    marginBottom: 10,
  },
  menu_icon: {
    width: 48,
    height: 48
  },
  menu_title: {
    paddingTop: 10,
    fontSize: 13,
  }
});

export class WorkComponent extends Component {

  state = {
    commons: [],
    mods: []
  };

  componentWillMount() {
    getCommon().then((commons) => {
      this.setState({commons});
    });
    getMod().then((mods) => {
      this.setState({mods});
    });
  }

  menuRender(_menu) {
    return <Touchable {...TouchableParams} key={_menu.action}>
      <View style={styles.menu}>
        <Image style={styles.menu_icon} source={_menu.icon}></Image>
        <Text style={styles.menu_title}>{_menu.title}</Text>
      </View>
    </Touchable>;
  }


  render() {
    const {commons, mods} = this.state;
    return <View style={PageStyle.container}>
      <ScrollView style={{flex: 1}}>
        <View>
          <View style={[styles.container]}>
            {commons.map((_menu) => this.menuRender(_menu))}
          </View>
          <View>
            {mods.map((_mod) => {
              return <View key={_mod.title}>
                <Text style={styles.title}>{_mod.title}</Text>
                <View style={styles.container}>
                  {_mod.menus.map((_menu) => this.menuRender(_menu))}
                </View>
              </View>;
            })}
          </View>
        </View>
      </ScrollView>
    </View>;
  }
}
