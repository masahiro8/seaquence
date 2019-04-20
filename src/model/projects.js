/**
 * プロジェクトの設定
 */
const model_project = {
  id: 0, //Number プロジェクトid [必須]
  title: "", //Strgin プロジェクト名 [必須]
  url: "", //String プレビュー用のURL [必須]
  bgm: 0, //Number BGM用のassetid [必須]
  steps: [], //Array stepモデル [必須]
  assets: [], //Array assetsモデル [必須]
  assets_schedule: [] //Array assets_scheduleモデル [必須]
};
