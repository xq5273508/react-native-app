import ReactNative from "react-native";
import Sound from "react-native-sound";
import {EventHubs} from "./EventHubs";

const RNSound = ReactNative.NativeModules.RNSound;
const eventEmitter = new ReactNative.NativeEventEmitter(RNSound);

const Pool = [];

export class SoundService {
  static async play(_path) {
    return new Promise((resolve, reject) => {
      if (!_path) {
        reject("音频路径不能为空");
      }
      setTimeout(() => {
        const sound = new Sound(_path, '', (error) => {
          if (error) {
            reject('音频加载失败:' + error);
          }
          else {
            resolve(sound);
          }
        });
        Pool.push(sound);
        setTimeout(() => {
          sound.play((success) => {
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
          });
        }, 100);
      }, 100);
    });
  }

  static stop(_sound) {
    if (_sound) {
      _sound.stop();
      EventHubs.emit("onSoundStop", _sound._key);
    }
    else {
      Pool.forEach(_sound => {
        _sound.stop();
        EventHubs.emit("onSoundStop", _sound._key);
      });
    }
  }
}

eventEmitter.addListener(
  'onPlayChange',
  (param) => {
    const {isPlaying, playerKey} = param;
    if (!isPlaying) {
      const _index = Pool.findIndex(_item => _item._key === playerKey);
      ~_index && Pool.splice(_index, 1);
      EventHubs.emit("onSoundStop", playerKey);
    }
  },
);