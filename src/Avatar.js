export default class Avatar {
  constructor(options = {}) {
    this._config = {
      ...options,
    };
  }

  get baseColor() {
    return this._config.baseColor;
  }
}
