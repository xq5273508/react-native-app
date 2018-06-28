import {AudioRecorder, AudioUtils} from "react-native-audio";
import {PermissionsAndroid, Platform} from "react-native";
import {guid} from "./utils";

function checkPermission() {
  if (Platform.OS !== 'android') {
    return Promise.resolve(true);
  }

  const rationale = {
    'title': 'Microphone Permission',
    'message': 'AudioExample needs access to your microphone so you can record audio.'
  };

  return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
  .then((result) => {
    console.log('Permission result:', result);
    return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
  });
}

function prepareRecordingPath(file) {
  AudioRecorder.prepareRecordingAtPath(file, {
    SampleRate: 22050,
    Channels: 1,
    AudioQuality: "Low",
    AudioEncoding: "aac",
    AudioEncodingBitRate: 32000
  });
}

// let recording = false;
// let paused = false;

let file;

class AudioFile {
  constructor(name = guid()) {
    this.state = 0;//0:stop 1:recording 2:paused;    success
    this.name = name;
    this.path = AudioUtils.DocumentDirectoryPath + '/' + this.name + '.aac';
    this.ext = "aac";
    this.size = 0;
  }
}

export class AudioService {

  static finishRecording(didSucceed) {
    // finished = didSucceed;
    console.log(`Finished recording of duration ${file.size} seconds at path: ${file.path}`);
    if (didSucceed) {
      this.onSuccess && this.onSuccess(file);
    }
  }

  static async record(name) {
    let hasPermission = await checkPermission();
    if (!hasPermission) {
      throw('Can\'t record, no permission granted!');
    }
    if (file && file.state !== 0 && file.state !== 3) {
      throw('Already recording!');
    }
    file = new AudioFile(name);
    prepareRecordingPath(file.path);
    file.state = 1;
    await AudioRecorder.startRecording();
  }

  static async stop() {
    if (file.state !== 1 && file.state !== 2) {
      throw('Can\'t stop, not recording!');
    }
    file.state = 3;
    await AudioRecorder.stopRecording();
    if (Platform.OS === 'android') {
      this.finishRecording(true, file);
    }
    return file;
  }

  static async pause() {
    if (file.state !== 1) {
      console.warn('Can\'t pause, not recording!');
      return;
    }
    try {
      await AudioRecorder.pauseRecording();
      file.state = 2;
    } catch (error) {
      console.error(error);
    }
  }

  static async resume() {
    if (file.state !== 2) {
      console.warn('Can\'t resume, not paused!');
      return;
    }
    try {
      await AudioRecorder.resumeRecording();
      file.state = 1;
    } catch (error) {
      console.error(error);
    }
  }
}

AudioRecorder.onProgress = (data) => {
  file.size = Math.floor(data.currentTime);
  AudioService.onProgress && AudioService.onProgress(file);
};
AudioRecorder.onFinished = (data) => {
  // Android callback comes in the form of a promise instead.
  if (Platform.OS === 'ios') {
    AudioService.finishRecording(data.status === "OK", data.audioFileURL);
  }
};