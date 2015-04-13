// Copyright (c) 2015 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var helpers = require('org.chromium.common.helpers');

var uiWindowFirstCallError = null;

exports.createUiWindow = function(callback) {
  if (uiWindowFirstCallError) {
    throw new Error('createUiWindow called multiple times. first from: ' + uiWindowFirstCallError);
  }
  uiWindowFirstCallError = new Error();

  if (!helpers.isChromeApp) {
    console.log('This is not running in a Chrome App, do not create the window');
    return;
  }

  chrome.app.window.create('index.html', {
    id: 'tests'
  }, function(appWindow) {
    if (callback) {
      callback(appWindow);
    }
  });
};