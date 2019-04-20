/**
 * Asset
 */
const model_asset = {
  id: 0, //Number  アセットid  [必須]
  type: ASSETS_TYPE, //Type アセットの種類 [必須]
  name: "", //String アセット名 [必須]
  files: [] //Array アセットと紐付くファイル [必須]
};

export const ASSETS_TYPE = {
  MOVIE: "movie", //動画
  SOUND: "sound", //音声
  IMAGE: "image", //画像
  ANIM: "anim", //アニメ
  TEXT: "text" //テキスト画像
};
