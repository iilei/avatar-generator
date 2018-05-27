import hsluv from 'hsluv';
import MersenneTwister from 'mersenne-twister';
import _defaultsdeep from 'lodash.defaultsdeep';

import defaults from './config';
import Avatar from './Avatar';

export default class AvatarFactory {
  constructor(options, seed) {
    this.mt = new MersenneTwister(seed);
    this.pastel = !!options.pastel;
    this.constructWith(_defaultsdeep(options, defaults));
  }

  constructWith = (options) => {
    this._config = options;
  }

  generate = () => new Avatar({ baseColor: this.randomColor(), ...this._config })

  randomColor = () => this.luvToHex(this._config.sway.map(sway => this.intInRange(sway)))

  intInRange = (range) => {
    const span = (Math.max(...range) + 1) - Math.min(...range);
    return Math.floor(this.mt.random() * span) + Math.min(...range);
  }

  get baseColor() {
    return this._baseColor;
  }

  set pastel(bool) {
    // use HPLuv or HSLuv
    // HPLuv HPLuvHue HPLuvPastel HPLuvLightness
    // HSLuv HSLuvHue HSLuvSaturation HSLuvLightness
    this.hexToLuv = bool ? hsluv.hexToHpluv : hsluv.hexToHsluv;
    this.luvToHex = bool ? hsluv.hpluvToHex : hsluv.hsluvToHex;
  }
}
