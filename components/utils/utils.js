import {Dimensions, Platform, StyleSheet, TouchableNativeFeedback, TouchableOpacity} from "react-native";

const NATIVE = Platform.OS === "android" && Platform.Version > 21;

export const Touchable = NATIVE ? TouchableNativeFeedback : TouchableOpacity;
export const TouchableParams = NATIVE ? {
  background: TouchableNativeFeedback.Ripple("#bbb", true) //TouchableNativeFeedback.SelectableBackground()
} : {activeOpacity: 0.5};

export const PageStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    paddingTop: 20
  }
});

export const windowSize = Dimensions.get('window');