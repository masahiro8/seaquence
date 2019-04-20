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

const getInTime = (time, schedule) => {
  return T(schedule.start) <= time && T(schedule.end) > time ? 1 : 0;
};

export class status {
  constructor(time) {
    this.time = time;
  }

  update(callback) {
    const startTime = getTime();
    const emit = current => {
      let currentTime = getTime() - startTime;
      //   console.log("currentTime", currentTime);
      callback(getInTime(currentTime, this.time));
      requestAnimationFrame(emit);
    };
    emit();
  }
}
