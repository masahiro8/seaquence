import { ASSETS_TYPE } from "./model/assets";
import {
  MOVIE_POSITION_TYPE,
  ASSET_POSITION_TYPE
} from "./model/assets_schedule";

const steps = [
  {
    step_id: 1001,
    title: "step1",
    time: {
      start: 0,
      end: 10
    }
  },
  {
    step_id: 1002,
    title: "step2",
    time: {
      start: 10,
      end: 15
    }
  },
  {
    step_id: 1003,
    title: "step3",
    time: {
      start: 15,
      end: 20
    }
  },
  {
    step_id: 1004,
    title: "step4",
    time: {
      start: 21,
      end: 40
    }
  }
];

const assets = [
  {
    id: 1,
    type: ASSETS_TYPE.SOUND,
    name: "音声",
    files: ["/sound/se.mp3"]
  },
  {
    id: 2,
    type: ASSETS_TYPE.MOVIE,
    name: "動画",
    files: ["/movie/mv.mp4"]
  },
  {
    id: 3,
    type: ASSETS_TYPE.IMAGE,
    name: "画像",
    files: ["/image/image.png"]
  },
  {
    id: 4,
    type: ASSETS_TYPE.ANIM,
    name: "アニメ",
    files: [
      "/image/arrow1.png",
      "/image/arrow2.png",
      "/image/arrow3.png",
      "/image/arrow4.png",
      "/image/arrow5.png",
      "/image/arrow6.png",
      "/image/arrow7.png"
    ]
  },
  {
    id: 5,
    type: ASSETS_TYPE.TEXT,
    name: "テキスト画像",
    files: ["/text/text-1.png"]
  }
];

const assets_schedule = [
  {
    schedule_id: 1,
    title: "image",
    step_id: 1001,
    asset_id: 3,
    asset_type: ASSETS_TYPE.IMAGE,
    time: {
      start: 0,
      end: 5
    }
  },
  {
    schedule_id: 2,
    title: "sound",
    step_id: 1001,
    asset_id: 1,
    asset_type: ASSETS_TYPE.SOUND,
    time: {
      start: 3,
      end: 5
    }
  },
  {
    schedule_id: 3,
    title: "anim",
    step_id: 1002,
    asset_id: 4,
    asset_type: ASSETS_TYPE.ANIM,
    loop: 3,
    time: {
      start: 0,
      end: 5
    }
  },
  {
    schedule_id: 4,
    title: "movie",
    step_id: 1003,
    asset_id: 2,
    asset_type: ASSETS_TYPE.MOVIE,
    time: {
      start: 1,
      end: 4
    }
  },
  {
    schedule_id: 5,
    title: "text",
    step_id: 1004,
    asset_id: 5,
    asset_type: ASSETS_TYPE.TEXT,
    time: {
      start: 1,
      end: 5
    }
  }
];

export const project = {
  id: 0, //Number プロジェクトid [必須]
  title: "", //Strgin プロジェクト名 [必須]
  url: "", //String プレビュー用のURL [必須]
  bgm: 0, //Number BGM用のassetid [必須]
  steps: steps, //Array stepモデル [必須]
  assets: assets, //Array assetsモデル [必須]
  assets_schedule: assets_schedule //Array assets_scheduleモデル [必須]
};
