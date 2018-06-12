/**
 * Template React Native
 * created by qiangxu on 2018/6/11
 * @flow
 */

import {MainComponent} from "../components/main";
import {CardComponent} from "../components/card";

export const Router = {
  "Main": {
    screen: MainComponent,
    navigationOptions: {
      header: null
    }
  }, "Card.Component": {
    screen: CardComponent
  }
};
