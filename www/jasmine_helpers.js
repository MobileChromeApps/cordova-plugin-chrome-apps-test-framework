// Copyright (c) 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

exports.addJasmineHelpers = function(jasmineInterface) {
  jasmineInterface.isOnCordova = function() {
    return typeof window.cordova !== 'undefined';
  };

  jasmineInterface.isOnChromeRuntime = function() {
    return typeof window.chrome.runtime !== 'undefined';
  };

  jasmineInterface.describeChromeOnly = function(){};
  jasmineInterface.describeAndroidOnly = function(){};
  jasmineInterface.describeIosOnly = function(){};
  jasmineInterface.describeExcludeChrome = function(){};
  jasmineInterface.describeExcludeIos = function(){};
  jasmineInterface.describeExcludeAndroid = function(){};

  if (!jasmineInterface.isOnCordova()) {
    jasmineInterface.describeChromeOnly = jasmineInterface.describe;
    jasmineInterface.describeExcludeIos = jasmineInterface.describe;
    jasmineInterface.describeExcludeAndroid = jasmineInterface.describe;
  } else {
    jasmineInterface.describeExcludeChrome = jasmineInterface.describe;

    var platform = cordova.require('cordova/platform');
    if (platform.id == "android") {
      jasmineInterface.describeAndroidOnly = jasmineInterface.describe;
      jasmineInterface.describeExcludeIos = jasmineInterface.describe;
    } else if (platform.id == "ios") {
      jasmineInterface.describeIosOnly = jasmineInterface.describe;
      jasmineInterface.describeExcludeAndroid = jasmineInterface.describe;
    }
  }

  jasmineInterface.itShouldHaveAnEvent = function(obj, eventName) {
    jasmineInterface.it('should have an event called ' + eventName, function() {
      jasmineInterface.expect(obj[eventName]).toEqual(jasmineInterface.jasmine.any(chrome.Event));
    });
  };

  jasmineInterface.itShouldHaveAPropertyOfType = function(obj, propName, typeName) {
    jasmineInterface.it('should have a "' + propName + '" ' + typeName, function() {
      jasmineInterface.expect(typeof obj[propName]).toBe(typeName);
    });
  };
};