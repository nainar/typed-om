// Copyright 2016 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//     You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//     See the License for the specific language governing permissions and
// limitations under the License.

(function(internal, scope) {

  function ColorValue(r, g, b, a) {
    this._aFlag = true;
    if (a === undefined) {
      a = 1;
      this._aFlag = false;
    }

    if (typeof r != 'number' || typeof g != 'number'
      || typeof b != 'number' || typeof a != 'number') {
      throw new TypeError('r, g, b and a must be a numbers.');
    }

    if (r % 1 !== 0 || g % 1 !== 0 || b % 1 !== 0) {
      throw new TypeError('r, g, b must be integers.');
    }

    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
      throw new TypeError('r, g, b and a must be a number between 0 and 255.');
    }

    if (a < 0 || a > 1) {
      throw new TypeError('a must be a number between 0 and 1.');
    }
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    this.cssString = this._generateCssString();
  }
  internal.inherit(ColorValue, StyleValue);

  ColorValue.parse = function(value) {
    return null;
  };

  ColorValue.prototype._generateCssString = function() {
    var cssString = this._aFlag ? 'rgba(' : 'rgb(';
    cssString = cssString + this.r + ',' + this.g + ',' + this.b;
    
    if (this._aFlag) {
      cssString  = cssString + ',' + this.a;
    }
    cssString = cssString + ')'
    return cssString;
  };

  scope.ColorValue = ColorValue;

})(typedOM.internal, window);
