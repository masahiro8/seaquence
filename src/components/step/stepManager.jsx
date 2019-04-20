import React, { Component } from "react";
import * as _ from "lodash";
import { StepWrapper } from "./stepWrapper";
import { interval } from "../../sequence/interval";

export class StepManager extends Component {
  constructor(props) {
    super(props);
    //表示用
    this.state = {
      steps: []
    };

    //変換後のデータ
    this.step = null;
  }
  componentDidMount() {
    //step  時間経過バーの表示用
    this.step = interval(this.props.model, value => {
      this.setState({ steps: value });
    }).step();
  }
  render() {
    return (
      <div>
        <StepWrapper steps={this.state.steps} />
      </div>
    );
  }
}
