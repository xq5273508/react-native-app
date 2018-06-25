/**
 * Template React Native
 * created by qiangxu on 2018/6/25
 * @flow
 */

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import PropTypes from "prop-types";

export class CountDownComponent extends Component {
  static propTypes = {
    onAnimationComplete: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      max: props.seconds || 10,
      size: props.size || 100,
      process: 0
    };
  }

  onAnimationStart() {
    if (!this.state.timer) {
      this.setState({
        process: 0,
      });
      const timer = setInterval(() => {
        const process = this.state.process + 0.1;
        if (process < this.state.max) {
          this.setState({
            process
          });
        }
        else {
          this.onAnimationComplete();
        }
      }, 100);
      this.setState({
        timer: timer,
      });
    }
  }

  onAnimationComplete() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
      this.setState({
        timer: 0,
        // process: 0,
      });
      this.props.onAnimationComplete();
    }
  }

  componentDidMount() {
    if (this.props.start) {
      this.onAnimationStart();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.start && !this.props.start) {
      this.onAnimationStart();
    }
    else if (!nextProps.start && this.props.start) {
      this.onAnimationComplete();
    }
  }

  componentWillUnmount() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
      this.setState({
        timer: 0,
      });
    }
  }

// <View style={{flex: 1}}>
// <Text style={{lineHeight: 100}}>{Math.ceil(this.state.max-this.state.process)}</Text>
// </View>
  render() {
    const content = () => (
      this.props.children
    );
    return <View style={[style = {
      width: this.state.size,
      height: this.state.size,
      borderRadius: this.state.size / 2,
      backgroundColor: "#fff",
    }, this.props.style]}>
      <AnimatedCircularProgress
        size={this.state.size}
        width={5}
        fill={(this.state.max - this.state.process > 0.5 ? this.state.process : this.state.max) * 100 / this.state.max}
        tintColor="#1078FD"
        backgroundColor="#eee">{content}</AnimatedCircularProgress>
    </View>;
  }
}
