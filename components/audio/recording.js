import React, {Component} from "react";
import {View, Text, Image, Animated, StyleSheet, Easing} from "react-native";
import {windowSize} from "../../service/utils";

const styles = StyleSheet.create({
    waiting: {
      position: "absolute",
      top: 200,
      left: (windowSize.width - 120) / 2,
      width: 120,
      height: 120,
      backgroundColor: "rgba(0,0,0,0.7)",
      borderRadius: 5,
    },
    image: {
      width: 30,
      height: 30,
      position: "absolute",
      left: 45,
      top: 35,
    },
    desc: {
      fontSize: 12,
      color: "#bbb",
      textAlign: "center",
      position: "absolute",
      borderRadius: 5,
      width: 110,
      margin: 5,
      padding: 5,
      left: 0,
      bottom: 0,
    },
    round: {
      width: 46,
      height: 46,
      position: "absolute",
      left: 37,
      top: 27,
      borderWidth: 5,
      borderColor: "rgba(0, 183, 229, 0.9)",
      borderLeftColor: "rgba(0,0,0,0)",
      borderRightColor: "rgba(0,0,0,0)",
      borderRadius: 46,
      elevation: 20,
      shadowOffset: {width: 0, height: 0},
      shadowColor: "#2187e7",
      shadowOpacity: 1,
      shadowRadius: 15,
    },
    shadow: {}
  });

export class RecordingView extends Component {

  state = {
    rotateVal: new Animated.Value(0),
    animationLoading: null
  };

  componentDidMount() {
    const animationLoading = Animated.timing(
      this.state.rotateVal, // 初始值
      {
        toValue: 1, // 终点值
        duration: 800,
        easing: Easing.linear, // 这里使用匀速曲线，详见RN-api-Easing
      }
    );
    this.setState({
      animationLoading: animationLoading
    });
    Animated.loop(animationLoading).start(); // 开始动画
  }

  componentWillUnmount() {
    this.state.animationLoading && Animated.loop(this.state.animationLoading).stop();
  }

  render() {
    return <View style={styles.waiting}>
      <Animated.View
        style={[styles.round, {
          transform: [{ // 动画属性
            rotate: this.state.rotateVal.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg'],
            })
          }]
        }]}>
      </Animated.View>
      <Image source={require("../../images/voice-record.png")} style={styles.image}></Image>
      <Text style={styles.desc}>正在录音，请讲话</Text>
    </View>;
  }
}
