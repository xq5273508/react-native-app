/**
 * Template React Native
 * created by qiangxu on 2018/6/11
 * @flow
 */

import React, {Component} from "react";
import {View, Text, Image, StyleSheet, Platform, TouchableOpacity} from "react-native";
import {createBottomTabNavigator} from "react-navigation";
import {MessageComponent} from "./main/message";
import {FindComponent} from "./main/find";
import {WorkComponent} from "./main/work";
import {ContactsComponent} from "./main/contacts";
import {MyComponent} from "./main/my";
import {SearchComponent} from "./main/search";
import Popover from "./utils/popover";
import {windowSize} from "./utils/utils";
import {Icon} from "./utils/icon";

const TabsComponent = createBottomTabNavigator({
  "Main.Message": {
    screen: MessageComponent,
    navigationOptions: ({navigation}) => {
      return {
        tabBarLabel({focused}) {
          return <Text style={[styles.label, {color: (focused ? "#3296FA" : "#AEAEAE")}]}>消息</Text>;
        },
        tabBarIcon({focused}) {
          const uri = focused ? require("../images/msg-ck.png") : require("../images/msg.png");
          return <Image style={styles.icon} source={uri}>
          </Image>;
        }
      };
    }
  },
  // FindComponent: {
  //   screen: FindComponent,
  //   navigationOptions: ({navigation}) => {
  //     return {
  //       tabBarLabel({focused}) {
  //         return <Text style={[styles.label, {color: (focused ? "#3296FA" : "#AEAEAE")}]}>发现</Text>;
  //       },
  //       tabBarIcon({focused}) {
  //         const uri = focused ? require("../../images/find-ck.png") : require("../../images/find.png");
  //         return <Image style={styles.icon} source={uri}>
  //         </Image>;
  //       }
  //     };
  //   }
  // },
  "Main.Work": {
    screen: WorkComponent,
    navigationOptions: ({navigation}) => {
      return {
        tabBarLabel({focused}) {
          return <Text style={[styles.label, {color: (focused ? "#3296FA" : "#AEAEAE")}]}>工作</Text>;
        },
        tabBarIcon({focused}) {
          const uri = focused ? require("../images/work-ck.png") : require("../images/work.png");
          return <Image style={styles.icon} source={uri}>
          </Image>;
        }
      };
    }
  },
  "Main.Contacts": {
    screen: ContactsComponent,
    navigationOptions: ({navigation}) => {
      return {
        tabBarLabel({focused}) {
          return <Text style={[styles.label, {color: (focused ? "#3296FA" : "#AEAEAE")}]}>联系人</Text>;
        },
        tabBarIcon({focused, tintColor}) {
          const uri = focused ? require("../images/cont-ck.png") : require("../images/cont.png");
          return <Image style={styles.icon} source={uri}>
          </Image>;
        }
      };
    }
  },
  "Main.My": {
    screen: MyComponent,
    navigationOptions: ({navigation}) => {
      return {
        tabBarLabel({focused}) {
          return <Text style={[styles.label, {color: (focused ? "#3296FA" : "#AEAEAE")}]}>我的</Text>;
        },
        tabBarIcon({focused, tintColor}) {
          const uri = focused ? require("../images/mine-ck.png") : require("../images/mine.png");
          return <Image style={styles.icon} source={uri}>
          </Image>;
        }
      };
    }
  },
});

console.log(windowSize);

export class MainComponent extends Component {
  static router = {
    ...TabsComponent.router,
    getStateForAction: (action, lastState) => {
      return TabsComponent.router.getStateForAction(action, lastState);
    },
  };

  state = {
    isVisible: false,
    buttonRect: {x: windowSize.width - 20, y: Platform.OS === "ios" ? 65 : 45, width: 0, height: 0}
  };

  render() {
    const {navigation} = this.props;
    return <View style={{flex: 1}}>
      <SearchComponent onAddClick={() => {
        this.setState({isVisible: true});
      }}/>
      <TabsComponent navigation={navigation}/>
      <Popover
        placement="bottom"
        isVisible={this.state.isVisible}
        fromRect={this.state.buttonRect}
        onClose={() => {
          this.setState({
            isVisible: false
          });
        }}>
        <View style={{width: 140}}>
          <TouchableOpacity activeOpacity={0.5}>
            <View style={[styles.menu, styles.menu_split]}>
              <Icon style={styles.menu_icon} name={"saomiao"}/>
              <Text style={styles.menu_text}>扫一扫</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <View style={[styles.menu, styles.menu_split]}>
              <Icon style={styles.menu_icon} name={"goumaijilu"}/>
              <Text style={styles.menu_text}>工作日志</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <View style={styles.menu}>
              <Icon style={styles.menu_icon} name={"fenxiang"}/>
              <Text style={styles.menu_text}>分享</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Popover>
    </View>;
  }
}

const styles = StyleSheet.create({
  label: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontSize: 10,
    marginBottom: 1.5,
  },
  icon: {
    width: 20,
    height: 20
  },
  menu: {
    flexDirection: "row"
  },
  menu_split: {
    borderBottomWidth: 1,
    borderBottomColor: "#d4d4d4",
  },
  menu_icon: {
    lineHeight: 35,
    paddingLeft: 10,
    paddingRight: 10,
    color: "#666"
  },
  menu_text: {
    lineHeight: 35,
    color: "#666"
  }
});
