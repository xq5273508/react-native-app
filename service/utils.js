import {Dimensions, Platform, StyleSheet, TouchableNativeFeedback, TouchableOpacity} from "react-native";

const NATIVE = Platform.OS === "android" && Platform.Version > 21;

export const Touchable = NATIVE ? TouchableNativeFeedback : TouchableOpacity;
export const TouchableParams = NATIVE ? {
  background: TouchableNativeFeedback.Ripple("#bbb", true) //TouchableNativeFeedback.SelectableBackground()
} : {activeOpacity: 0.7};
export const TouchableParamsNormal = NATIVE ? {
  background: TouchableNativeFeedback.SelectableBackground() //TouchableNativeFeedback.SelectableBackground()
} : {activeOpacity: 0.7};

export const GlobalStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    // paddingTop: 20,
  },
});

export const windowSize = Dimensions.get('window');

export function guid() {
  let timestamp = new Date().getTime();
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (timestamp + Math.random() * 16) % 16 | 0;
    timestamp = Math.floor(timestamp / 16);
    return (c === 'x' ? r : (r & 3 | 8)).toString(16);
  });
}