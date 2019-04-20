import * as _ from "lodash";
import { ASSETS_TYPE } from "../model/assets";
import { FRAME_RATE } from "../util/constants";
import { searchAsset } from "../util/searchAsset";
import { project } from "../json";

//入力された秒数を変換
const T = num => {
  return num * 1000;
};

//現在時間
const getTime = () => {
  return new Date().getTime();
};

const animationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.setTimeout;

export const assetInterval = (schedule, callback) => {
  console.log("interval");

  // let startTime = 0;

  /**
   * 時間内に入っているか判定
   */
  const getInTime = (item, time) => {
    return T(item.time.start) <= time && T(item.time.end) > time ? 1 : 0;
  };

  /*
   *Step
   *status = true : 表示 / false : 非表示
   */
  const searchStep = time => {
    return schedule.map(item => {
      item.status = getInTime(item, time);
      return item;
    });
  };

  const get = () => {
    const startTime = getTime();
    const emit = current => {
      let lastTime = getTime();
      callback(searchStep(lastTime - startTime));
      requestAnimationFrame(emit);
    };
    emit();
  };
  return {
    get
  };
};

/**
 * assetの時間に、対応するstepの時間を加算して、グローバル時間に変更する
 * @param {*} assets_schedule
 * @param {*} steps
 */
export const mergeAssetTimeWithStepTime = (assets_schedule, steps) => {
  //assetのデータをstepで更新
  return _.map(_.cloneDeep(assets_schedule), asset => {
    const step = _.find(steps, { step_id: asset.step_id });
    const time = _.cloneDeep(asset.time);
    let _asset = _.cloneDeep(asset);
    _asset.time.start = time.start + step.time.start;
    _asset.time.end = time.end + step.time.start;
    return _asset;
  });
};
