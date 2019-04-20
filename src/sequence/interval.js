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

export const interval = (steps, callback) => {
  console.log("interval");
  /**
   * 時間内に入っているか判定
   */
  const getInTime = (item, time) => {
    return T(item.time.start) <= time && T(item.time.end) > time ? 1 : 0;
  };

  //ステップ内現在時間 ->　この値でアセットを操作
  const getElapse = (item, time) => {
    return time - T(item.time.start);
  };

  //ステップ内進行率(ゲージ用)
  const getRate = (item, time) => {
    const elapsed = getElapse(item, time);
    const rate = elapsed / (T(item.time.end) - T(item.time.start));
    return rate;
  };

  /*
   *Step
   *status = true : 表示 / false : 非表示
   */
  const searchStep = time => {
    return steps.map(item => {
      item.status = getInTime(item, time);
      item.rate = getRate(item, time);
      return item;
    });
  };

  /**
   * ステップのみ
   */
  const step = () => {
    const startTime = getTime();
    const emit = current => {
      let lastTime = getTime();
      callback(searchStep(lastTime - startTime));
      requestAnimationFrame(emit);
    };
    emit();
  };

  return {
    step
  };
};
