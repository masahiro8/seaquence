import * as _ from "lodash";

export const searchAsset = assets => {
  const get = asset_id => {
    const _asset = _.filter(assets, asset => {
      return asset.id === asset_id;
    });
    return _asset[0];
  };
  return {
    get
  };
};
