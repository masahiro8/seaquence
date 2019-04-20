import * as _ from "lodash";
import { ASSETS_TYPE } from "../model/assets";
import { Fps } from "../sequence/fps";

const getTime = function() {
  return new Date().getTime();
};

/**
 * 個々のアセットのアニメーションを制御
 * @param {array} files
 */
const animationPlayer = asset => {
  let isPlaying = false;

  let startTime = 0; //開始時間
  let elaspedTime = 0; //経過時間

  //アニメーション時間
  let alltime = 0;
  //アニメーション総フレーム数
  let animationFrames = 0;
  //アニメーション１コマあたりのミリ秒
  let msecPerFrame = 0;
  //アニメーション内のFPS取得用
  let time = { start: 0, end: 0 };

  const emit = schedule => {
    if (!isPlaying) return;

    time.end = getTime();
    //経過時間
    elaspedTime = getTime() - startTime;
    //経過時間から現在のループ回数を算出
    const nloop = Math.floor(elaspedTime / (msecPerFrame * asset.files.length));
    //経過時間からループ時間を引いて端数を算出
    const pframe = Math.floor(nloop * asset.files.length * msecPerFrame);
    //ファイルのindex
    const index = Math.floor((elaspedTime - pframe) / msecPerFrame);
    console.log("asset.files=", asset.files[index]);
    time.start = getTime();
  };

  const play = schedule => {
    isPlaying = true;
    startTime = getTime();

    //アニメーション時間
    alltime = (schedule.time.end - schedule.time.start) * 1000;
    //アニメーション総フレーム数
    animationFrames = asset.files.length * schedule.loop;
    //アニメーション１コマあたりのミリ秒
    msecPerFrame = alltime / animationFrames;

    //asset_type===animの場合はフレームレートを作成
    //fps計測
    if (asset.type === ASSETS_TYPE.ANIM) {
      Fps.setCallback(_fps => {
        if (isPlaying) {
          emit(schedule);
        }
      });
    }
  };

  const stop = () => {
    isPlaying = false;
  };

  return {
    play,
    stop
  };
};

const filePlayer = asset => {
  const play = schedule => {
    console.log("start ", asset.files[0]);
  };
  const stop = schedule => {
    console.log("stop ", asset.files[0]);
  };
  return {
    play,
    stop
  };
};
const imagePlayer = filePlayer;
const soundPlayer = filePlayer;
const moviePlayer = filePlayer;
const textPlayer = filePlayer;

const getPlayer = asset => {
  if (asset.type === ASSETS_TYPE.ANIM) {
    return animationPlayer(_.cloneDeep(asset));
  } else if (asset.type == ASSETS_TYPE.IMAGE) {
    return imagePlayer(_.cloneDeep(asset));
  } else if (asset.type == ASSETS_TYPE.SOUND) {
    return soundPlayer(_.cloneDeep(asset));
  } else if (asset.type == ASSETS_TYPE.MOVIE) {
    return moviePlayer(_.cloneDeep(asset));
  } else if (asset.type == ASSETS_TYPE.TEXT) {
    return textPlayer(_.cloneDeep(asset));
  }
};

/**
 * アセットの再生と停止を制御
 * @param {} asset
 */
export const assetsPlayer = (asset, schedule) => {
  let prevStatus = false;
  let player = getPlayer(asset);
  let isPlaying = false;

  // console.log("schedule = ", asset, schedule);

  //再生開始
  const playAsset = () => {
    player.play(_.cloneDeep(schedule));
  };

  //再生停止
  const stopAsset = () => {
    player.stop();
    player = null; //GC解放
  };

  //statusの変更を比較
  const statusDidUpdate = status => {
    if (prevStatus !== status) {
      prevStatus = status;
      return true;
    }
    return false;
  };

  const update = status => {
    //状態変更 & 表示の判定
    const isUpdated = statusDidUpdate(status);
    // //初期化
    if (isUpdated && status) {
      if (!isPlaying) {
        playAsset();
        console.log("start");
        isPlaying = true;
      }
    }
    // //停止
    if (isUpdated && !status) {
      if (isPlaying) {
        stopAsset();
        console.log("stop");
        isPlaying = false;
      }
    }
  };

  return {
    update
  };
};
