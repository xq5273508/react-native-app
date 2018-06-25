/**
 * Template React Native
 * created by qiangxu on 2018/6/11
 * @flow
 */

import {MainComponent} from "../components/main";
import {CardComponent} from "../components/card";
import {AudioComponent} from "../components/audio";
import {CameraComponent} from "../components/camera";
import {ScanComponent} from "../components/scan";

export const Router = {
  "Main": {
    screen: MainComponent,
    navigationOptions: {
      header: null
    }
  },
  "Card.Component": CardComponent,
  "Page.Audio": AudioComponent,
  "Page.Camera": CameraComponent,
  "Page.Scan": ScanComponent
};
