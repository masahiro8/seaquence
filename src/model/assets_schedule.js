import { ASSETS_TYPE } from "./assets";

/**
 * アセットの設定
 */
const model_schedule = {
  title: "", //String アセット名 [必須]
  step_id: 0, //Number 紐付くステップ [必須]
  asset_id: 0, //Number 紐付くアセット [必須]
  asset_type: ASSETS_TYPE, //Type  アセットの種類 [必須]
  asset_position: ASSET_POSITION_TYPE, //Type アセットの位置 [必須]
  loop: 0, //Number 時間内にループする数 [ オプショナル / ANIM ]
  movie_position: MOVIE_POSITION_TYPE, //Type 動画の位置 [ オプショナル / MOVIE必須]
  time: {
    start: 0, //Number 開始時間 [ 必須 ]
    end: 0 //Number 終了時間 [ 必須 ]
  },
  custom_position: {
    x: 0, //Number [ASSET_POSITION_TYPE = CUSTOM の場合必須]
    y: 0 //Number　[ASSET_POSITION_TYPE = CUSTOM の場合必須]
  }
};

//動画表示位置
export const MOVIE_POSITION_TYPE = {
  LEFT: "left",
  RIGHT: "right"
};

//アセット表示位置
export const ASSET_POSITION_TYPE = {
  EYE: "eye",
  NOSE: "nose",
  CUSTOM: "custom"
};
