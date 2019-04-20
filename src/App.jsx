import React from "react";
import * as _ from "lodash";
import { project } from "./json.js";
import { StepManager } from "./components/step/stepManager";
import { AssetManager } from "./components/asset/assetManager";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    //元のデータ
    this.project = project;
  }

  componentDidMount() {
    //指定fpsでコールバック
    // fps(1).update(() => {
    //   console.log("fps 10");
    // });
  }

  render() {
    return (
      <div>
        <div>App</div>
        <StepManager model={this.project.steps} />
        <AssetManager
          assets={this.project.assets}
          assets_schedule={this.project.assets_schedule}
          steps={this.project.steps}
        />
      </div>
    );
  }
}
