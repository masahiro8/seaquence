const getTime = function() {
  return new Date().getTime();
};
const animationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.setTimeout;

//基本FPS、早い場合はこの値で丸める
const DEFAULT_FPS = 30;

const getfps = () => {
  let prev = 0;
  let fps = 0;
  let callbacks = [];

  const setCallback = callback => {
    callbacks.push(callback);
  };

  const publish = () => {
    callbacks.map(callback => {
      //callback(Math.floor(fps));
      if (fps >= DEFAULT_FPS) {
        callback(DEFAULT_FPS);
      } else {
        callback(fps);
      }
    });
  };

  //fps計測
  const update = () => {
    let now = getTime();
    fps = 1000 / (now - prev);
    publish();
    prev = now;
    requestAnimationFrame(update);
  };
  update();

  return {
    setCallback
  };
};

export const Fps = getfps();
