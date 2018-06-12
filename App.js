/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {StatusBar} from "react-native";
import {
  View,
  Platform,
  BackHandler,
  ToastAndroid,
  YellowBox,
  StyleSheet,
  Easing,
  Animated
} from "react-native";
import {createStackNavigator} from "react-navigation";

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'You should only render one navigator explicitly in your app']);

import {Router} from "./router/router";
//
export const Navigator = createStackNavigator(Router, {
  // headerMode: 'none',
  // mode: Platform.OS === "ios" ? 'modal' : 'card',
  navigationOptions: {
    gesturesEnabled: true,
  },
  transitionConfig: () => ({
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
    },
    screenInterpolator: sceneProps => {
      const {layout, position, scene} = sceneProps;
      const {index} = scene;
      const width = layout.initWidth;
      const translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [width, 0, 0],
      });

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
      });

      return {opacity, transform: [{translateX}]};
    },
  })
});


const styles = StyleSheet.create({
  navigator: {
    flex: 1,
    ...Platform.select({
      "android": {
        marginTop: 20
      }
    })
  }
});

export class AppComponent extends Component {
  routes = [];
  lastBackPressed = 0;

  onBackAndroid() {
    if (this.routes.length <= 1) {
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        BackHandler.exitApp();
        return false;
      }
      this.lastBackPressed = Date.now();
      ToastAndroid.show('再按一次退出应用', 1000);
      return true;
    }
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      this.backAndroid = this.onBackAndroid.bind(this);
      BackHandler.addEventListener('handwareBackPress', this.backAndroid)
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('handwareBackPress', this.backAndroid)
    }
  }

  render() {
    let statusBar = Platform.select({
      "android": <StatusBar
        animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden
        hidden={false}  //是否隐藏状态栏。
        backgroundColor="#3478f6" //状态栏的背景色
        translucent={true}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。
        barStyle="light-content" // enum('default', 'light-content', 'dark-content')
      ></StatusBar>
    });
    return <View style={styles.navigator}>
      {statusBar}
      <Navigator onNavigationStateChange={(prevNav, nav, action) => {
        this.routes = nav.routes;
      }}/>
    </View>;
  }
}