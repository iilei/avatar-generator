import hsluv from 'hsluv';
import MersenneTwister from 'mersenne-twister';
import _defaultsdeep from 'lodash.defaultsdeep';

import defaults from './config';

export default class Avatar {
  constructor(options, seed) {
    this.mt = new MersenneTwister(seed || defaults.SEED);
    this.pastel = options && options.pastel;
    this._config = _defaultsdeep(options, defaults);

    return this.generate;
  }

  // eslint-disable-next-line
  generate = (specimen = this.randomSpecimen(), baseColor = this.randomColor()) => {
    return ({ specimen, baseColor });
  }

  randomColor = () => this.luvToHex(this._config.sway.map(sway => this.intInRange(sway)))

  randomSpecimen = () => {
    const specimen = Object.keys(this._config.creatures);
    const Idx = Math.floor(this.mt.random() * specimen.length);
    return specimen[Idx];
  }

  intInRange = (range) => {
    const span = (Math.max(...range) + 1) - Math.min(...range);
    return Math.floor(this.mt.random() * span) + Math.min(...range);
  }

  set pastel(bool) {
    // use HPLuv or HSLuv
    // HPLuv HPLuvHue HPLuvPastel HPLuvLightness
    // HSLuv HSLuvHue HSLuvSaturation HSLuvLightness
    this.hexToLuv = bool ? hsluv.hexToHpluv : hsluv.hexToHsluv;
    this.luvToHex = bool ? hsluv.hpluvToHex : hsluv.hsluvToHex;
  }
}
