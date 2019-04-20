import React, { Component } from "react";
import * as _ from "lodash";
import {
  assetInterval,
  mergeAssetTimeWithStepTime
} from "../../sequence/assetInterval";
import { assetsPlayer } from "../../sequence/assetsPlayer";
import { Asset } from "./asset";
import { status } from "../../sequence/status";
import { Fps } from "../../sequence/fps";

export class AssetManager extends React.Component {
  constructor(props) {
    super(props);

    //表示用
    this.state = {
      assets: []
    };

    //変換後のデータ
    this.assets_schedule = null;
    this.assets = []; //クロージャ格納
  }
  componentDidMount() {
    //assetの時間にstepの時間を加算してグローバル時間に変換
    const _assets_schedule = mergeAssetTimeWithStepTime(
      this.props.assets_schedule,
      this.props.steps
    );

    this.assets_schedule = _.map(_assets_schedule, schedule => {
      const assetObj = _.filter(this.props.assets, { id: schedule.asset_id });
      schedule.asset = _.clone(assetObj[0]);
      schedule.player = assetsPlayer(assetObj[0], schedule);
      schedule.status = new status(schedule.time);
      return schedule;
    });

    this.assets_schedule.map(schedule => {
      schedule.status.update(status => {
        schedule.player.update(status);
        //console.log(">>", schedule.schedule_id, status);
      });
    });
  }
  render() {
    return (
      <div>
        {_.map(this.state.assets, asset => {
          return <Asset title={asset.title} />;
        })}
      </div>
    );
  }
}
