// Platform: android
// ???
// browserify
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var PLATFORM_VERSION_BUILD_LABEL = '6.2.3';
var define = {moduleMap: []};
require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('cordova/init');

},{"cordova/init":"cordova/init"}],"cordova-plugin-battery-status.battery":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * This class contains information about the current battery status.
 * @constructor
 */
var cordova = require('cordova'),
    exec = require('cordova/exec');

var STATUS_CRITICAL = 5;
var STATUS_LOW = 20;

var Battery = function() {
    this._level = null;
    this._isPlugged = null;
    // Create new event handlers on the window (returns a channel instance)
    this.channels = {
      batterystatus:cordova.addWindowEventHandler("batterystatus"),
      batterylow:cordova.addWindowEventHandler("batterylow"),
      batterycritical:cordova.addWindowEventHandler("batterycritical")
    };
    for (var key in this.channels) {
        this.channels[key].onHasSubscribersChange = Battery.onHasSubscribersChange;
    }
};

function handlers() {
    return battery.channels.batterystatus.numHandlers +
        battery.channels.batterylow.numHandlers +
        battery.channels.batterycritical.numHandlers;
}

/**
 * Event handlers for when callbacks get registered for the battery.
 * Keep track of how many handlers we have so we can start and stop the native battery listener
 * appropriately (and hopefully save on battery life!).
 */
Battery.onHasSubscribersChange = function() {
  // If we just registered the first handler, make sure native listener is started.
  if (this.numHandlers === 1 && handlers() === 1) {
      exec(battery._status, battery._error, "Battery", "start", []);
  } else if (handlers() === 0) {
      exec(null, null, "Battery", "stop", []);
  }
};

/**
 * Callback for battery status
 *
 * @param {Object} info            keys: level, isPlugged
 */
Battery.prototype._status = function (info) {

    if (info) {
        if (battery._level !== info.level || battery._isPlugged !== info.isPlugged) {

            if(info.level === null && battery._level !== null) {
                return; // special case where callback is called because we stopped listening to the native side.
            }

            // Something changed. Fire batterystatus event
            cordova.fireWindowEvent("batterystatus", info);

            if (!info.isPlugged) { // do not fire low/critical if we are charging. issue: CB-4520
                // note the following are NOT exact checks, as we want to catch a transition from
                // above the threshold to below. issue: CB-4519
                if (battery._level > STATUS_CRITICAL && info.level <= STATUS_CRITICAL) {
                    // Fire critical battery event
                    cordova.fireWindowEvent("batterycritical", info);
                }
                else if (battery._level > STATUS_LOW && info.level <= STATUS_LOW) {
                    // Fire low battery event
                    cordova.fireWindowEvent("batterylow", info);
                }
            }
            battery._level = info.level;
            battery._isPlugged = info.isPlugged;
        }
    }
};

/**
 * Error callback for battery start
 */
Battery.prototype._error = function(e) {
    console.log("Error initializing Battery: " + e);
};

var battery = new Battery(); // jshint ignore:line

module.exports = battery;

},{"cordova":"cordova","cordova/exec":"cordova/exec"}],"cordova-plugin-camera.CameraPopoverHandle":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * @ignore in favour of iOS' one
 * A handle to an image picker popover.
 */
var CameraPopoverHandle = function() {
    this.setPosition = function(popoverOptions) {
        console.log('CameraPopoverHandle.setPosition is only supported on iOS.');
    };
};

module.exports = CameraPopoverHandle;

},{}],"cordova-plugin-camera.CameraPopoverOptions":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var Camera = require('cordova-plugin-camera.Camera');

/**
 * @namespace navigator
 */

/**
 * iOS-only parameters that specify the anchor element location and arrow
 * direction of the popover when selecting images from an iPad's library
 * or album.
 * Note that the size of the popover may change to adjust to the
 * direction of the arrow and orientation of the screen.  Make sure to
 * account for orientation changes when specifying the anchor element
 * location.
 * @module CameraPopoverOptions
 * @param {Number} [x=0] - x pixel coordinate of screen element onto which to anchor the popover.
 * @param {Number} [y=32] - y pixel coordinate of screen element onto which to anchor the popover.
 * @param {Number} [width=320] - width, in pixels, of the screen element onto which to anchor the popover.
 * @param {Number} [height=480] - height, in pixels, of the screen element onto which to anchor the popover.
 * @param {module:Camera.PopoverArrowDirection} [arrowDir=ARROW_ANY] - Direction the arrow on the popover should point.
 */
var CameraPopoverOptions = function (x, y, width, height, arrowDir) {
    // information of rectangle that popover should be anchored to
    this.x = x || 0;
    this.y = y || 32;
    this.width = width || 320;
    this.height = height || 480;
    this.arrowDir = arrowDir || Camera.PopoverArrowDirection.ARROW_ANY;
};

module.exports = CameraPopoverOptions;

},{"cordova-plugin-camera.Camera":"cordova-plugin-camera.Camera"}],"cordova-plugin-camera.Camera":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * @module Camera
 */
module.exports = {
  /**
   * @description
   * Defines the output format of `Camera.getPicture` call.
   * _Note:_ On iOS passing `DestinationType.NATIVE_URI` along with
   * `PictureSourceType.PHOTOLIBRARY` or `PictureSourceType.SAVEDPHOTOALBUM` will
   * disable any image modifications (resize, quality change, cropping, etc.) due
   * to implementation specific.
   *
   * @enum {number}
   */
  DestinationType:{
    /** Return base64 encoded string. DATA_URL can be very memory intensive and cause app crashes or out of memory errors. Use FILE_URI or NATIVE_URI if possible */
    DATA_URL: 0,
    /** Return file uri (content://media/external/images/media/2 for Android) */
    FILE_URI: 1,
    /** Return native uri (eg. asset-library://... for iOS) */
    NATIVE_URI: 2
  },
  /**
   * @enum {number}
   */
  EncodingType:{
    /** Return JPEG encoded image */
    JPEG: 0,
    /** Return PNG encoded image */
    PNG: 1
  },
  /**
   * @enum {number}
   */
  MediaType:{
    /** Allow selection of still pictures only. DEFAULT. Will return format specified via DestinationType */
    PICTURE: 0,
    /** Allow selection of video only, ONLY RETURNS URL */
    VIDEO: 1,
    /** Allow selection from all media types */
    ALLMEDIA : 2
  },
  /**
   * @description
   * Defines the output format of `Camera.getPicture` call.
   * _Note:_ On iOS passing `PictureSourceType.PHOTOLIBRARY` or `PictureSourceType.SAVEDPHOTOALBUM`
   * along with `DestinationType.NATIVE_URI` will disable any image modifications (resize, quality
   * change, cropping, etc.) due to implementation specific.
   *
   * @enum {number}
   */
  PictureSourceType:{
    /** Choose image from the device's photo library (same as SAVEDPHOTOALBUM for Android) */
    PHOTOLIBRARY : 0,
    /** Take picture from camera */
    CAMERA : 1,
    /** Choose image only from the device's Camera Roll album (same as PHOTOLIBRARY for Android) */
    SAVEDPHOTOALBUM : 2
  },
  /**
   * Matches iOS UIPopoverArrowDirection constants to specify arrow location on popover.
   * @enum {number}
   */
  PopoverArrowDirection:{
      ARROW_UP : 1,
      ARROW_DOWN : 2,
      ARROW_LEFT : 4,
      ARROW_RIGHT : 8,
      ARROW_ANY : 15
  },
  /**
   * @enum {number}
   */
  Direction:{
      /** Use the back-facing camera */
      BACK: 0,
      /** Use the front-facing camera */
      FRONT: 1
  }
};

},{}],"cordova-plugin-camera.camera":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var argscheck = require('cordova/argscheck'),
    exec = require('cordova/exec'),
    Camera = require('cordova-plugin-camera.Camera');
    // XXX: commented out
    //CameraPopoverHandle = require('./CameraPopoverHandle');

/**
 * @namespace navigator
 */

/**
 * @exports camera
 */
var cameraExport = {};

// Tack on the Camera Constants to the base camera plugin.
for (var key in Camera) {
    cameraExport[key] = Camera[key];
}

/**
 * Callback function that provides an error message.
 * @callback module:camera.onError
 * @param {string} message - The message is provided by the device's native code.
 */

/**
 * Callback function that provides the image data.
 * @callback module:camera.onSuccess
 * @param {string} imageData - Base64 encoding of the image data, _or_ the image file URI, depending on [`cameraOptions`]{@link module:camera.CameraOptions} in effect.
 * @example
 * // Show image
 * //
 * function cameraCallback(imageData) {
 *    var image = document.getElementById('myImage');
 *    image.src = "data:image/jpeg;base64," + imageData;
 * }
 */

/**
 * Optional parameters to customize the camera settings.
 * * [Quirks](#CameraOptions-quirks)
 * @typedef module:camera.CameraOptions
 * @type {Object}
 * @property {number} [quality=50] - Quality of the saved image, expressed as a range of 0-100, where 100 is typically full resolution with no loss from file compression. (Note that information about the camera's resolution is unavailable.)
 * @property {module:Camera.DestinationType} [destinationType=FILE_URI] - Choose the format of the return value.
 * @property {module:Camera.PictureSourceType} [sourceType=CAMERA] - Set the source of the picture.
 * @property {Boolean} [allowEdit=true] - Allow simple editing of image before selection.
 * @property {module:Camera.EncodingType} [encodingType=JPEG] - Choose the  returned image file's encoding.
 * @property {number} [targetWidth] - Width in pixels to scale image. Must be used with `targetHeight`. Aspect ratio remains constant.
 * @property {number} [targetHeight] - Height in pixels to scale image. Must be used with `targetWidth`. Aspect ratio remains constant.
 * @property {module:Camera.MediaType} [mediaType=PICTURE] - Set the type of media to select from.  Only works when `PictureSourceType` is `PHOTOLIBRARY` or `SAVEDPHOTOALBUM`.
 * @property {Boolean} [correctOrientation] - Rotate the image to correct for the orientation of the device during capture.
 * @property {Boolean} [saveToPhotoAlbum] - Save the image to the photo album on the device after capture.
 * @property {module:CameraPopoverOptions} [popoverOptions] - iOS-only options that specify popover location in iPad.
 * @property {module:Camera.Direction} [cameraDirection=BACK] - Choose the camera to use (front- or back-facing).
 */

/**
 * @description Takes a photo using the camera, or retrieves a photo from the device's
 * image gallery.  The image is passed to the success callback as a
 * Base64-encoded `String`, or as the URI for the image file.
 *
 * The `camera.getPicture` function opens the device's default camera
 * application that allows users to snap pictures by default - this behavior occurs,
 * when `Camera.sourceType` equals [`Camera.PictureSourceType.CAMERA`]{@link module:Camera.PictureSourceType}.
 * Once the user snaps the photo, the camera application closes and the application is restored.
 *
 * If `Camera.sourceType` is `Camera.PictureSourceType.PHOTOLIBRARY` or
 * `Camera.PictureSourceType.SAVEDPHOTOALBUM`, then a dialog displays
 * that allows users to select an existing image.
 *
 * The return value is sent to the [`cameraSuccess`]{@link module:camera.onSuccess} callback function, in
 * one of the following formats, depending on the specified
 * `cameraOptions`:
 *
 * - A `String` containing the Base64-encoded photo image.
 * - A `String` representing the image file location on local storage (default).
 *
 * You can do whatever you want with the encoded image or URI, for
 * example:
 *
 * - Render the image in an `<img>` tag, as in the example below
 * - Save the data locally (`LocalStorage`, [Lawnchair](http://brianleroux.github.com/lawnchair/), etc.)
 * - Post the data to a remote server
 *
 * __NOTE__: Photo resolution on newer devices is quite good. Photos
 * selected from the device's gallery are not downscaled to a lower
 * quality, even if a `quality` parameter is specified.  To avoid common
 * memory problems, set `Camera.destinationType` to `FILE_URI` rather
 * than `DATA_URL`.
 *
 * __Supported Platforms__
 *
 * - Android
 * - BlackBerry
 * - Browser
 * - Firefox
 * - FireOS
 * - iOS
 * - Windows
 * - WP8
 * - Ubuntu
 *
 * More examples [here](#camera-getPicture-examples). Quirks [here](#camera-getPicture-quirks).
 *
 * @example
 * navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);
 * @param {module:camera.onSuccess} successCallback
 * @param {module:camera.onError} errorCallback
 * @param {module:camera.CameraOptions} options CameraOptions
 */
cameraExport.getPicture = function(successCallback, errorCallback, options) {
    argscheck.checkArgs('fFO', 'Camera.getPicture', arguments);
    options = options || {};
    var getValue = argscheck.getValue;

    var quality = getValue(options.quality, 50);
    var destinationType = getValue(options.destinationType, Camera.DestinationType.FILE_URI);
    var sourceType = getValue(options.sourceType, Camera.PictureSourceType.CAMERA);
    var targetWidth = getValue(options.targetWidth, -1);
    var targetHeight = getValue(options.targetHeight, -1);
    var encodingType = getValue(options.encodingType, Camera.EncodingType.JPEG);
    var mediaType = getValue(options.mediaType, Camera.MediaType.PICTURE);
    var allowEdit = !!options.allowEdit;
    var correctOrientation = !!options.correctOrientation;
    var saveToPhotoAlbum = !!options.saveToPhotoAlbum;
    var popoverOptions = getValue(options.popoverOptions, null);
    var cameraDirection = getValue(options.cameraDirection, Camera.Direction.BACK);

    var args = [quality, destinationType, sourceType, targetWidth, targetHeight, encodingType,
                mediaType, allowEdit, correctOrientation, saveToPhotoAlbum, popoverOptions, cameraDirection];

    exec(successCallback, errorCallback, "Camera", "takePicture", args);
    // XXX: commented out
    //return new CameraPopoverHandle();
};

/**
 * Removes intermediate image files that are kept in temporary storage
 * after calling [`camera.getPicture`]{@link module:camera.getPicture}. Applies only when the value of
 * `Camera.sourceType` equals `Camera.PictureSourceType.CAMERA` and the
 * `Camera.destinationType` equals `Camera.DestinationType.FILE_URI`.
 *
 * __Supported Platforms__
 *
 * - iOS
 *
 * @example
 * navigator.camera.cleanup(onSuccess, onFail);
 *
 * function onSuccess() {
 *     console.log("Camera cleanup success.")
 * }
 *
 * function onFail(message) {
 *     alert('Failed because: ' + message);
 * }
 */
cameraExport.cleanup = function(successCallback, errorCallback) {
    exec(successCallback, errorCallback, "Camera", "cleanup", []);
};

module.exports = cameraExport;

},{"cordova-plugin-camera.Camera":"cordova-plugin-camera.Camera","cordova/argscheck":"cordova/argscheck","cordova/exec":"cordova/exec"}],"cordova-plugin-contacts.ContactAddress":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
* Contact address.
* @constructor
* @param {DOMString} id unique identifier, should only be set by native code
* @param formatted // NOTE: not a W3C standard
* @param streetAddress
* @param locality
* @param region
* @param postalCode
* @param country
*/

var ContactAddress = function(pref, type, formatted, streetAddress, locality, region, postalCode, country) {
    this.id = null;
    this.pref = (typeof pref != 'undefined' ? pref : false);
    this.type = type || null;
    this.formatted = formatted || null;
    this.streetAddress = streetAddress || null;
    this.locality = locality || null;
    this.region = region || null;
    this.postalCode = postalCode || null;
    this.country = country || null;
};

module.exports = ContactAddress;

},{}],"cordova-plugin-contacts.ContactError":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 *  ContactError.
 *  An error code assigned by an implementation when an error has occurred
 * @constructor
 */
var ContactError = function(err) {
    this.code = (typeof err != 'undefined' ? err : null);
};

/**
 * Error codes
 */
ContactError.UNKNOWN_ERROR = 0;
ContactError.INVALID_ARGUMENT_ERROR = 1;
ContactError.TIMEOUT_ERROR = 2;
ContactError.PENDING_OPERATION_ERROR = 3;
ContactError.IO_ERROR = 4;
ContactError.NOT_SUPPORTED_ERROR = 5;
ContactError.OPERATION_CANCELLED_ERROR = 6;
ContactError.PERMISSION_DENIED_ERROR = 20;

module.exports = ContactError;

},{}],"cordova-plugin-contacts.ContactFieldType":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

    // Possible field names for various platforms.
    // Some field names are platform specific

    var fieldType = {
        addresses:      "addresses",
        birthday:       "birthday",
        categories:     "categories",
        country:        "country",
        department:     "department",
        displayName:    "displayName",
        emails:         "emails",
        familyName:     "familyName",
        formatted:      "formatted",
        givenName:      "givenName",
        honorificPrefix: "honorificPrefix",
        honorificSuffix: "honorificSuffix",
        id:             "id",
        ims:            "ims",
        locality:       "locality",
        middleName:     "middleName",
        name:           "name",
        nickname:       "nickname",
        note:           "note",
        organizations:  "organizations",
        phoneNumbers:   "phoneNumbers",
        photos:         "photos",
        postalCode:     "postalCode",
        region:         "region",
        streetAddress:  "streetAddress",
        title:          "title",
        urls:           "urls"
    };

    module.exports = fieldType;

},{}],"cordova-plugin-contacts.ContactField":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
* Generic contact field.
* @constructor
* @param {DOMString} id unique identifier, should only be set by native code // NOTE: not a W3C standard
* @param type
* @param value
* @param pref
*/
var ContactField = function(type, value, pref) {
    this.id = null;
    this.type = (type && type.toString()) || null;
    this.value = (value && value.toString()) || null;
    this.pref = (typeof pref != 'undefined' ? pref : false);
};

module.exports = ContactField;

},{}],"cordova-plugin-contacts.ContactFindOptions":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * ContactFindOptions.
 * @constructor
 * @param filter used to match contacts against
 * @param multiple boolean used to determine if more than one contact should be returned
 * @param desiredFields
 * @param hasPhoneNumber boolean used to filter the search and only return contacts that have a phone number informed
 */

var ContactFindOptions = function(filter, multiple, desiredFields, hasPhoneNumber) {
    this.filter = filter || '';
    this.multiple = (typeof multiple != 'undefined' ? multiple : false);
    this.desiredFields = typeof desiredFields != 'undefined' ? desiredFields : [];
    this.hasPhoneNumber = typeof hasPhoneNumber != 'undefined' ? hasPhoneNumber : false;
};

module.exports = ContactFindOptions;

},{}],"cordova-plugin-contacts.ContactName":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
* Contact name.
* @constructor
* @param formatted // NOTE: not part of W3C standard
* @param familyName
* @param givenName
* @param middle
* @param prefix
* @param suffix
*/
var ContactName = function(formatted, familyName, givenName, middle, prefix, suffix) {
    this.formatted = formatted || null;
    this.familyName = familyName || null;
    this.givenName = givenName || null;
    this.middleName = middle || null;
    this.honorificPrefix = prefix || null;
    this.honorificSuffix = suffix || null;
};

module.exports = ContactName;

},{}],"cordova-plugin-contacts.ContactOrganization":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
* Contact organization.
* @constructor
* @param pref
* @param type
* @param name
* @param dept
* @param title
*/

var ContactOrganization = function(pref, type, name, dept, title) {
    this.id = null;
    this.pref = (typeof pref != 'undefined' ? pref : false);
    this.type = type || null;
    this.name = name || null;
    this.department = dept || null;
    this.title = title || null;
};

module.exports = ContactOrganization;

},{}],"cordova-plugin-contacts.Contact":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var argscheck = require('cordova/argscheck'),
    exec = require('cordova/exec'),
    ContactError = require('cordova-plugin-contacts.ContactError'),
    utils = require('cordova/utils'),
    convertUtils = require('cordova-plugin-contacts.convertUtils');

/**
* Contains information about a single contact.
* @constructor
* @param {DOMString} id unique identifier
* @param {DOMString} displayName
* @param {ContactName} name
* @param {DOMString} nickname
* @param {Array.<ContactField>} phoneNumbers array of phone numbers
* @param {Array.<ContactField>} emails array of email addresses
* @param {Array.<ContactAddress>} addresses array of addresses
* @param {Array.<ContactField>} ims instant messaging user ids
* @param {Array.<ContactOrganization>} organizations
* @param {DOMString} birthday contact's birthday
* @param {DOMString} note user notes about contact
* @param {Array.<ContactField>} photos
* @param {Array.<ContactField>} categories
* @param {Array.<ContactField>} urls contact's web sites
*/
var Contact = function (id, displayName, name, nickname, phoneNumbers, emails, addresses,
    ims, organizations, birthday, note, photos, categories, urls) {
    this.id = id || null;
    this.rawId = null;
    this.displayName = displayName || null;
    this.name = name || null; // ContactName
    this.nickname = nickname || null;
    this.phoneNumbers = phoneNumbers || null; // ContactField[]
    this.emails = emails || null; // ContactField[]
    this.addresses = addresses || null; // ContactAddress[]
    this.ims = ims || null; // ContactField[]
    this.organizations = organizations || null; // ContactOrganization[]
    this.birthday = birthday || null;
    this.note = note || null;
    this.photos = photos || null; // ContactField[]
    this.categories = categories || null; // ContactField[]
    this.urls = urls || null; // ContactField[]
};

/**
* Removes contact from device storage.
* @param successCB success callback
* @param errorCB error callback
*/
Contact.prototype.remove = function(successCB, errorCB) {
    argscheck.checkArgs('FF', 'Contact.remove', arguments);
    var fail = errorCB && function(code) {
        errorCB(new ContactError(code));
    };
    if (this.id === null) {
        fail(ContactError.UNKNOWN_ERROR);
    }
    else {
        exec(successCB, fail, "Contacts", "remove", [this.id]);
    }
};

/**
* Creates a deep copy of this Contact.
* With the contact ID set to null.
* @return copy of this Contact
*/
Contact.prototype.clone = function() {
    var clonedContact = utils.clone(this);
    clonedContact.id = null;
    clonedContact.rawId = null;

    function nullIds(arr) {
        if (arr) {
            for (var i = 0; i < arr.length; ++i) {
                arr[i].id = null;
            }
        }
    }

    // Loop through and clear out any id's in phones, emails, etc.
    nullIds(clonedContact.phoneNumbers);
    nullIds(clonedContact.emails);
    nullIds(clonedContact.addresses);
    nullIds(clonedContact.ims);
    nullIds(clonedContact.organizations);
    nullIds(clonedContact.categories);
    nullIds(clonedContact.photos);
    nullIds(clonedContact.urls);
    return clonedContact;
};

/**
* Persists contact to device storage.
* @param successCB success callback
* @param errorCB error callback
*/
Contact.prototype.save = function(successCB, errorCB) {
    argscheck.checkArgs('FFO', 'Contact.save', arguments);
    var fail = errorCB && function(code) {
        errorCB(new ContactError(code));
    };
    var success = function(result) {
        if (result) {
            if (successCB) {
                var fullContact = require('cordova-plugin-contacts.contacts').create(result);
                successCB(convertUtils.toCordovaFormat(fullContact));
            }
        }
        else {
            // no Entry object returned
            fail(ContactError.UNKNOWN_ERROR);
        }
    };
    var dupContact = convertUtils.toNativeFormat(utils.clone(this));
    exec(success, fail, "Contacts", "save", [dupContact]);
};


module.exports = Contact;

},{"cordova-plugin-contacts.ContactError":"cordova-plugin-contacts.ContactError","cordova-plugin-contacts.contacts":"cordova-plugin-contacts.contacts","cordova-plugin-contacts.convertUtils":"cordova-plugin-contacts.convertUtils","cordova/argscheck":"cordova/argscheck","cordova/exec":"cordova/exec","cordova/utils":"cordova/utils"}],"cordova-plugin-contacts.contacts":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var argscheck = require('cordova/argscheck'),
    exec = require('cordova/exec'),
    ContactError = require('cordova-plugin-contacts.ContactError'),
    Contact = require('cordova-plugin-contacts.Contact'),
    fieldType = require('cordova-plugin-contacts.ContactFieldType'),
    convertUtils = require('cordova-plugin-contacts.convertUtils');

/**
* Represents a group of Contacts.
* @constructor
*/
var contacts = {
    fieldType: fieldType,
    /**
     * Returns an array of Contacts matching the search criteria.
     * @param fields that should be searched
     * @param successCB success callback
     * @param errorCB error callback
     * @param {ContactFindOptions} options that can be applied to contact searching
     * @return array of Contacts matching search criteria
     */
    find: function(fields, successCB, errorCB, options) {
        argscheck.checkArgs('afFO', 'contacts.find', arguments);
        if (!fields.length) {
            if (errorCB) {
                errorCB(new ContactError(ContactError.INVALID_ARGUMENT_ERROR));
            }
        } else {
            // missing 'options' param means return all contacts
            options = options || { filter: '', multiple: true };
            var win = function(result) {
                var cs = [];
                for (var i = 0, l = result.length; i < l; i++) {
                    cs.push(convertUtils.toCordovaFormat(contacts.create(result[i])));
                }
                successCB(cs);
            };
            exec(win, errorCB, "Contacts", "search", [fields, options]);
        }
    },

    /**
     * This function picks contact from phone using contact picker UI
     * @returns new Contact object
     */
    pickContact: function (successCB, errorCB) {

        argscheck.checkArgs('fF', 'contacts.pick', arguments);

        var win = function (result) {
            // if Contacts.pickContact return instance of Contact object
            // don't create new Contact object, use current
            var contact = result instanceof Contact ? result : contacts.create(result);
            successCB(convertUtils.toCordovaFormat(contact));
        };
        exec(win, errorCB, "Contacts", "pickContact", []);
    },

    /**
     * This function creates a new contact, but it does not persist the contact
     * to device storage. To persist the contact to device storage, invoke
     * contact.save().
     * @param properties an object whose properties will be examined to create a new Contact
     * @returns new Contact object
     */
    create: function(properties) {
        argscheck.checkArgs('O', 'contacts.create', arguments);
        var contact = new Contact();
        for (var i in properties) {
            if (typeof contact[i] !== 'undefined' && properties.hasOwnProperty(i)) {
                contact[i] = properties[i];
            }
        }
        return contact;
    }
};

module.exports = contacts;

},{"cordova-plugin-contacts.Contact":"cordova-plugin-contacts.Contact","cordova-plugin-contacts.ContactError":"cordova-plugin-contacts.ContactError","cordova-plugin-contacts.ContactFieldType":"cordova-plugin-contacts.ContactFieldType","cordova-plugin-contacts.convertUtils":"cordova-plugin-contacts.convertUtils","cordova/argscheck":"cordova/argscheck","cordova/exec":"cordova/exec"}],"cordova-plugin-contacts.convertUtils":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var utils = require('cordova/utils');

module.exports = {
    /**
    * Converts primitives into Complex Object
    * Currently only used for Date fields
    */
    toCordovaFormat: function (contact) {
        var value = contact.birthday;
        if (value !== null) {
            try {
              contact.birthday = new Date(parseFloat(value));

              //we might get 'Invalid Date' which does not throw an error
              //and is an instance of Date.
              if (isNaN(contact.birthday.getTime())) {
                contact.birthday = null;
              }

            } catch (exception){
              console.log("Cordova Contact toCordovaFormat error: exception creating date.");
            }
        }
        return contact;
    },

    /**
    * Converts Complex objects into primitives
    * Only conversion at present is for Dates.
    **/
    toNativeFormat: function (contact) {
        var value = contact.birthday;
        if (value !== null) {
            // try to make it a Date object if it is not already
            if (!utils.isDate(value)){
                try {
                    value = new Date(value);
                } catch(exception){
                    value = null;
                }
            }
            if (utils.isDate(value)){
                value = value.valueOf(); // convert to milliseconds
            }
            contact.birthday = value;
        }
        return contact;
    }
};

},{"cordova/utils":"cordova/utils"}],"cordova-plugin-device-motion.Acceleration":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var Acceleration = function(x, y, z, timestamp) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.timestamp = timestamp || (new Date()).getTime();
};

module.exports = Acceleration;

},{}],"cordova-plugin-device-motion.accelerometer":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * This class provides access to device accelerometer data.
 * @constructor
 */
var argscheck = require('cordova/argscheck'),
    utils = require("cordova/utils"),
    exec = require("cordova/exec"),
    Acceleration = require('cordova-plugin-device-motion.Acceleration');

// Is the accel sensor running?
var running = false;

// Keeps reference to watchAcceleration calls.
var timers = {};

// Array of listeners; used to keep track of when we should call start and stop.
var listeners = [];

// Last returned acceleration object from native
var accel = null;

// Timer used when faking up devicemotion events
var eventTimerId = null;

// Tells native to start.
function start() {
    exec(function (a) {
        var tempListeners = listeners.slice(0);
        accel = new Acceleration(a.x, a.y, a.z, a.timestamp);
        for (var i = 0, l = tempListeners.length; i < l; i++) {
            tempListeners[i].win(accel);
        }
    }, function (e) {
        var tempListeners = listeners.slice(0);
        for (var i = 0, l = tempListeners.length; i < l; i++) {
            tempListeners[i].fail(e);
        }
    }, "Accelerometer", "start", []);
    running = true;
}

// Tells native to stop.
function stop() {
    exec(null, null, "Accelerometer", "stop", []);
    accel = null;
    running = false;
}

// Adds a callback pair to the listeners array
function createCallbackPair(win, fail) {
    return { win: win, fail: fail };
}

// Removes a win/fail listener pair from the listeners array
function removeListeners(l) {
    var idx = listeners.indexOf(l);
    if (idx > -1) {
        listeners.splice(idx, 1);
        if (listeners.length === 0) {
            stop();
        }
    }
}

var accelerometer = {
    /**
     * Asynchronously acquires the current acceleration.
     *
     * @param {Function} successCallback    The function to call when the acceleration data is available
     * @param {Function} errorCallback      The function to call when there is an error getting the acceleration data. (OPTIONAL)
     * @param {AccelerationOptions} options The options for getting the accelerometer data such as timeout. (OPTIONAL)
     */
    getCurrentAcceleration: function (successCallback, errorCallback, options) {
        argscheck.checkArgs('fFO', 'accelerometer.getCurrentAcceleration', arguments);

        if (cordova.platformId === "windowsphone") {
            exec(function (a) {
                accel = new Acceleration(a.x, a.y, a.z, a.timestamp);
                successCallback(accel);
            }, function (e) {
                errorCallback(e);
            }, "Accelerometer", "getCurrentAcceleration", []);

            return;
        }

        var p;
        var win = function (a) {
            removeListeners(p);
            successCallback(a);
        };
        var fail = function (e) {
            removeListeners(p);
            if (errorCallback) {
                errorCallback(e);
            }
        };

        p = createCallbackPair(win, fail);
        listeners.push(p);

        if (!running) {
            start();
        }
    },

    /**
     * Asynchronously acquires the acceleration repeatedly at a given interval.
     *
     * @param {Function} successCallback    The function to call each time the acceleration data is available
     * @param {Function} errorCallback      The function to call when there is an error getting the acceleration data. (OPTIONAL)
     * @param {AccelerationOptions} options The options for getting the accelerometer data such as timeout. (OPTIONAL)
     * @return String                       The watch id that must be passed to #clearWatch to stop watching.
     */
    watchAcceleration: function (successCallback, errorCallback, options) {
        argscheck.checkArgs('fFO', 'accelerometer.watchAcceleration', arguments);
        // Default interval (10 sec)
        var frequency = (options && options.frequency && typeof options.frequency == 'number') ? options.frequency : 10000;

        // Keep reference to watch id, and report accel readings as often as defined in frequency
        var id = utils.createUUID();

        var p = createCallbackPair(function () { }, function (e) {
            removeListeners(p);
            if (errorCallback) {
                errorCallback(e);
            }
        });
        listeners.push(p);

        timers[id] = {
            timer: window.setInterval(function () {
                if (accel) {
                    successCallback(accel);
                }
            }, frequency),
            listeners: p
        };

        if (running) {
            // If we're already running then immediately invoke the success callback
            // but only if we have retrieved a value, sample code does not check for null ...
            if (accel) {
                successCallback(accel);
            }
        } else {
            start();
        }

        if (cordova.platformId === "browser" && !eventTimerId) {
            // Start firing devicemotion events if we haven't already
            var devicemotionEvent = new Event('devicemotion');
            eventTimerId = window.setInterval(function() {
                window.dispatchEvent(devicemotionEvent);
            }, 200);
        }

        return id;
    },

    /**
     * Clears the specified accelerometer watch.
     *
     * @param {String} id       The id of the watch returned from #watchAcceleration.
     */
    clearWatch: function (id) {
        // Stop javascript timer & remove from timer list
        if (id && timers[id]) {
            window.clearInterval(timers[id].timer);
            removeListeners(timers[id].listeners);
            delete timers[id];

            if (eventTimerId && Object.keys(timers).length === 0) {
                // No more watchers, so stop firing 'devicemotion' events
                window.clearInterval(eventTimerId);
                eventTimerId = null;
            }
        }
    }
};
module.exports = accelerometer;

},{"cordova-plugin-device-motion.Acceleration":"cordova-plugin-device-motion.Acceleration","cordova/argscheck":"cordova/argscheck","cordova/exec":"cordova/exec","cordova/utils":"cordova/utils"}],"cordova-plugin-device-orientation.CompassError":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 *  CompassError.
 *  An error code assigned by an implementation when an error has occurred
 * @constructor
 */
var CompassError = function(err) {
    this.code = (err !== undefined ? err : null);
};

CompassError.COMPASS_INTERNAL_ERR = 0;
CompassError.COMPASS_NOT_SUPPORTED = 20;

module.exports = CompassError;

},{}],"cordova-plugin-device-orientation.CompassHeading":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var CompassHeading = function(magneticHeading, trueHeading, headingAccuracy, timestamp) {
  this.magneticHeading = magneticHeading;
  this.trueHeading = trueHeading;
  this.headingAccuracy = headingAccuracy;
  this.timestamp = timestamp || new Date().getTime();
};

module.exports = CompassHeading;

},{}],"cordova-plugin-device-orientation.compass":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var argscheck = require('cordova/argscheck'),
    exec = require('cordova/exec'),
    utils = require('cordova/utils'),
    CompassHeading = require('cordova-plugin-device-orientation.CompassHeading'),
    CompassError = require('cordova-plugin-device-orientation.CompassError'),

    timers = {},
    eventTimerId = null,
    compass = {
        /**
         * Asynchronously acquires the current heading.
         * @param {Function} successCallback The function to call when the heading
         * data is available
         * @param {Function} errorCallback The function to call when there is an error
         * getting the heading data.
         * @param {CompassOptions} options The options for getting the heading data (not used).
         */
        getCurrentHeading:function(successCallback, errorCallback, options) {
            argscheck.checkArgs('fFO', 'compass.getCurrentHeading', arguments);

            var win = function(result) {
                var ch = new CompassHeading(result.magneticHeading, result.trueHeading, result.headingAccuracy, result.timestamp);
                successCallback(ch);
            };
            var fail = errorCallback && function(code) {
                var ce = new CompassError(code);
                errorCallback(ce);
            };

            // Get heading
            exec(win, fail, "Compass", "getHeading", [options]);
        },

        /**
         * Asynchronously acquires the heading repeatedly at a given interval.
         * @param {Function} successCallback The function to call each time the heading
         * data is available
         * @param {Function} errorCallback The function to call when there is an error
         * getting the heading data.
         * @param {HeadingOptions} options The options for getting the heading data
         * such as timeout and the frequency of the watch. For iOS, filter parameter
         * specifies to watch via a distance filter rather than time.
         */
        watchHeading:function(successCallback, errorCallback, options) {
            argscheck.checkArgs('fFO', 'compass.watchHeading', arguments);
            // Default interval (100 msec)
            var frequency = (options !== undefined && options.frequency !== undefined) ? options.frequency : 100;
            var filter = (options !== undefined && options.filter !== undefined) ? options.filter : 0;

            var id = utils.createUUID();
            if (filter > 0) {
                // is an iOS request for watch by filter, no timer needed
                timers[id] = "iOS";
                compass.getCurrentHeading(successCallback, errorCallback, options);
            } else {
                // Start watch timer to get headings
                timers[id] = window.setInterval(function() {
                    compass.getCurrentHeading(successCallback, errorCallback);
                }, frequency);
            }

            if (cordova.platformId === 'browser' && !eventTimerId) {
                // Start firing deviceorientation events if haven't already
                var deviceorientationEvent = new Event('deviceorientation');
                eventTimerId = window.setInterval(function() {
                    window.dispatchEvent(deviceorientationEvent);
                }, 200);
            }

            return id;
        },

        /**
         * Clears the specified heading watch.
         * @param {String} id The ID of the watch returned from #watchHeading.
         */
        clearWatch:function(id) {
            // Stop javascript timer & remove from timer list
            if (id && timers[id]) {
                if (timers[id] != "iOS") {
                    clearInterval(timers[id]);
                } else {
                    // is iOS watch by filter so call into device to stop
                    exec(null, null, "Compass", "stopHeading", []);
                }
                delete timers[id];

                if (eventTimerId && Object.keys(timers).length === 0) {
                    // No more watchers, so stop firing 'deviceorientation' events
                    window.clearInterval(eventTimerId);
                    eventTimerId = null;
                }
            }
        }
    };

module.exports = compass;

},{"cordova-plugin-device-orientation.CompassError":"cordova-plugin-device-orientation.CompassError","cordova-plugin-device-orientation.CompassHeading":"cordova-plugin-device-orientation.CompassHeading","cordova/argscheck":"cordova/argscheck","cordova/exec":"cordova/exec","cordova/utils":"cordova/utils"}],"cordova-plugin-device.device":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var argscheck = require('cordova/argscheck'),
    channel = require('cordova/channel'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec'),
    cordova = require('cordova');

channel.createSticky('onCordovaInfoReady');
// Tell cordova channel to wait on the CordovaInfoReady event
channel.waitForInitialization('onCordovaInfoReady');

/**
 * This represents the mobile device, and provides properties for inspecting the model, version, UUID of the
 * phone, etc.
 * @constructor
 */
function Device() {
    this.available = false;
    this.platform = null;
    this.version = null;
    this.uuid = null;
    this.cordova = null;
    this.model = null;
    this.manufacturer = null;
    this.isVirtual = null;
    this.serial = null;

    var me = this;

    channel.onCordovaReady.subscribe(function() {
        me.getInfo(function(info) {
            //ignoring info.cordova returning from native, we should use value from cordova.version defined in cordova.js
            //TODO: CB-5105 native implementations should not return info.cordova
            var buildLabel = cordova.version;
            me.available = true;
            me.platform = info.platform;
            me.version = info.version;
            me.uuid = info.uuid;
            me.cordova = buildLabel;
            me.model = info.model;
            me.isVirtual = info.isVirtual;
            me.manufacturer = info.manufacturer || 'unknown';
            me.serial = info.serial || 'unknown';
            channel.onCordovaInfoReady.fire();
        },function(e) {
            me.available = false;
            utils.alert("[ERROR] Error initializing Cordova: " + e);
        });
    });
}

/**
 * Get device info
 *
 * @param {Function} successCallback The function to call when the heading data is available
 * @param {Function} errorCallback The function to call when there is an error getting the heading data. (OPTIONAL)
 */
Device.prototype.getInfo = function(successCallback, errorCallback) {
    argscheck.checkArgs('fF', 'Device.getInfo', arguments);
    exec(successCallback, errorCallback, "Device", "getDeviceInfo", []);
};

module.exports = new Device();

},{"cordova":"cordova","cordova/argscheck":"cordova/argscheck","cordova/channel":"cordova/channel","cordova/exec":"cordova/exec","cordova/utils":"cordova/utils"}],"cordova-plugin-dialogs.notification_android":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var exec = require('cordova/exec');

/**
 * Provides Android enhanced notification API.
 */
module.exports = {
    activityStart : function(title, message) {
        // If title and message not specified then mimic Android behavior of
        // using default strings.
        if (typeof title === "undefined" && typeof message == "undefined") {
            title = "Busy";
            message = 'Please wait...';
        }

        exec(null, null, 'Notification', 'activityStart', [ title, message ]);
    },

    /**
     * Close an activity dialog
     */
    activityStop : function() {
        exec(null, null, 'Notification', 'activityStop', []);
    },

    /**
     * Display a progress dialog with progress bar that goes from 0 to 100.
     *
     * @param {String}
     *            title Title of the progress dialog.
     * @param {String}
     *            message Message to display in the dialog.
     */
    progressStart : function(title, message) {
        exec(null, null, 'Notification', 'progressStart', [ title, message ]);
    },

    /**
     * Close the progress dialog.
     */
    progressStop : function() {
        exec(null, null, 'Notification', 'progressStop', []);
    },

    /**
     * Set the progress dialog value.
     *
     * @param {Number}
     *            value 0-100
     */
    progressValue : function(value) {
        exec(null, null, 'Notification', 'progressValue', [ value ]);
    }
};

},{"cordova/exec":"cordova/exec"}],"cordova-plugin-dialogs.notification":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var exec = require('cordova/exec');
var platform = require('cordova/platform');

/**
 * Provides access to notifications on the device.
 */

module.exports = {

    /**
     * Open a native alert dialog, with a customizable title and button text.
     *
     * @param {String} message              Message to print in the body of the alert
     * @param {Function} completeCallback   The callback that is called when user clicks on a button.
     * @param {String} title                Title of the alert dialog (default: Alert)
     * @param {String} buttonLabel          Label of the close button (default: OK)
     */
    alert: function(message, completeCallback, title, buttonLabel) {
        var _message = (typeof message === "string" ? message : JSON.stringify(message));
        var _title = (typeof title === "string" ? title : "Alert");
        var _buttonLabel = (buttonLabel && typeof buttonLabel === "string" ? buttonLabel : "OK");
        exec(completeCallback, null, "Notification", "alert", [_message, _title, _buttonLabel]);
    },

    /**
     * Open a native confirm dialog, with a customizable title and button text.
     * The result that the user selects is returned to the result callback.
     *
     * @param {String} message              Message to print in the body of the alert
     * @param {Function} resultCallback     The callback that is called when user clicks on a button.
     * @param {String} title                Title of the alert dialog (default: Confirm)
     * @param {Array} buttonLabels          Array of the labels of the buttons (default: ['OK', 'Cancel'])
     */
    confirm: function(message, resultCallback, title, buttonLabels) {
        var _message = (typeof message === "string" ? message : JSON.stringify(message));
        var _title = (typeof title === "string" ? title : "Confirm");
        var _buttonLabels = (buttonLabels || ["OK", "Cancel"]);

        // Strings are deprecated!
        if (typeof _buttonLabels === 'string') {
            console.log("Notification.confirm(string, function, string, string) is deprecated.  Use Notification.confirm(string, function, string, array).");
        }

        _buttonLabels = convertButtonLabels(_buttonLabels);

        exec(resultCallback, null, "Notification", "confirm", [_message, _title, _buttonLabels]);
    },

    /**
     * Open a native prompt dialog, with a customizable title and button text.
     * The following results are returned to the result callback:
     *  buttonIndex     Index number of the button selected.
     *  input1          The text entered in the prompt dialog box.
     *
     * @param {String} message              Dialog message to display (default: "Prompt message")
     * @param {Function} resultCallback     The callback that is called when user clicks on a button.
     * @param {String} title                Title of the dialog (default: "Prompt")
     * @param {Array} buttonLabels          Array of strings for the button labels (default: ["OK","Cancel"])
     * @param {String} defaultText          Textbox input value (default: empty string)
     */
    prompt: function(message, resultCallback, title, buttonLabels, defaultText) {
        var _message = (typeof message === "string" ? message : JSON.stringify(message));
        var _title = (typeof title === "string" ? title : "Prompt");
        var _buttonLabels = (buttonLabels || ["OK","Cancel"]);

        // Strings are deprecated!
        if (typeof _buttonLabels === 'string') {
            console.log("Notification.prompt(string, function, string, string) is deprecated.  Use Notification.confirm(string, function, string, array).");
        }

        _buttonLabels = convertButtonLabels(_buttonLabels);

        var _defaultText = (defaultText || "");
        exec(resultCallback, null, "Notification", "prompt", [_message, _title, _buttonLabels, _defaultText]);
    },

    /**
     * Causes the device to beep.
     * On Android, the default notification ringtone is played "count" times.
     *
     * @param {Integer} count       The number of beeps.
     */
    beep: function(count) {
        var defaultedCount = count || 1;
        exec(null, null, "Notification", "beep", [ defaultedCount ]);
    }
};

function convertButtonLabels(buttonLabels) {

    // Some platforms take an array of button label names.
    // Other platforms take a comma separated list.
    // For compatibility, we convert to the desired type based on the platform.
    if (platform.id == "amazon-fireos" || platform.id == "android" || platform.id == "ios" ||
        platform.id == "windowsphone" || platform.id == "firefoxos" || platform.id == "ubuntu" ||
        platform.id == "windows8" || platform.id == "windows") {

        if (typeof buttonLabels === 'string') {
            buttonLabels = buttonLabels.split(","); // not crazy about changing the var type here
        }
    } else {
        if (Array.isArray(buttonLabels)) {
            var buttonLabelArray = buttonLabels;
            buttonLabels = buttonLabelArray.toString();
        }
    }

    return buttonLabels;
}

},{"cordova/exec":"cordova/exec","cordova/platform":"cordova/platform"}],"cordova-plugin-file-transfer.FileTransferError":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * FileTransferError
 * @constructor
 */
var FileTransferError = function(code, source, target, status, body, exception) {
    this.code = code || null;
    this.source = source || null;
    this.target = target || null;
    this.http_status = status || null;
    this.body = body || null;
    this.exception = exception || null;
};

FileTransferError.FILE_NOT_FOUND_ERR = 1;
FileTransferError.INVALID_URL_ERR = 2;
FileTransferError.CONNECTION_ERR = 3;
FileTransferError.ABORT_ERR = 4;
FileTransferError.NOT_MODIFIED_ERR = 5;

module.exports = FileTransferError;

},{}],"cordova-plugin-file-transfer.FileTransfer":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/* global cordova, FileSystem */

var argscheck = require('cordova/argscheck'),
    exec = require('cordova/exec'),
    FileTransferError = require('cordova-plugin-file-transfer.FileTransferError'),
    ProgressEvent = require('cordova-plugin-file.ProgressEvent');

function newProgressEvent(result) {
    var pe = new ProgressEvent();
    pe.lengthComputable = result.lengthComputable;
    pe.loaded = result.loaded;
    pe.total = result.total;
    return pe;
}

function getUrlCredentials(urlString) {
    var credentialsPattern = /^https?\:\/\/(?:(?:(([^:@\/]*)(?::([^@\/]*))?)?@)?([^:\/?#]*)(?::(\d*))?).*$/,
        credentials = credentialsPattern.exec(urlString);

    return credentials && credentials[1];
}

function getBasicAuthHeader(urlString) {
    var header =  null;


    // This is changed due to MS Windows doesn't support credentials in http uris
    // so we detect them by regexp and strip off from result url
    // Proof: http://social.msdn.microsoft.com/Forums/windowsapps/en-US/a327cf3c-f033-4a54-8b7f-03c56ba3203f/windows-foundation-uri-security-problem

    if (window.btoa) {
        var credentials = getUrlCredentials(urlString);
        if (credentials) {
            var authHeader = "Authorization";
            var authHeaderValue = "Basic " + window.btoa(credentials);

            header = {
                name : authHeader,
                value : authHeaderValue
            };
        }
    }

    return header;
}

function convertHeadersToArray(headers) {
    var result = [];
    for (var header in headers) {
        if (headers.hasOwnProperty(header)) {
            var headerValue = headers[header];
            result.push({
                name: header,
                value: headerValue.toString()
            });
        }
    }
    return result;
}

var idCounter = 0;

/**
 * FileTransfer uploads a file to a remote server.
 * @constructor
 */
var FileTransfer = function() {
    this._id = ++idCounter;
    this.onprogress = null; // optional callback
};

/**
* Given an absolute file path, uploads a file on the device to a remote server
* using a multipart HTTP request.
* @param filePath {String}           Full path of the file on the device
* @param server {String}             URL of the server to receive the file
* @param successCallback (Function}  Callback to be invoked when upload has completed
* @param errorCallback {Function}    Callback to be invoked upon error
* @param options {FileUploadOptions} Optional parameters such as file name and mimetype
* @param trustAllHosts {Boolean} Optional trust all hosts (e.g. for self-signed certs), defaults to false
*/
FileTransfer.prototype.upload = function(filePath, server, successCallback, errorCallback, options, trustAllHosts) {
    argscheck.checkArgs('ssFFO*', 'FileTransfer.upload', arguments);
    // check for options
    var fileKey = null;
    var fileName = null;
    var mimeType = null;
    var params = null;
    var chunkedMode = true;
    var headers = null;
    var httpMethod = null;
    var basicAuthHeader = getBasicAuthHeader(server);
    if (basicAuthHeader) {
        server = server.replace(getUrlCredentials(server) + '@', '');

        options = options || {};
        options.headers = options.headers || {};
        options.headers[basicAuthHeader.name] = basicAuthHeader.value;
    }

    if (options) {
        fileKey = options.fileKey;
        fileName = options.fileName;
        mimeType = options.mimeType;
        headers = options.headers;
        httpMethod = options.httpMethod || "POST";
        if (httpMethod.toUpperCase() == "PUT"){
            httpMethod = "PUT";
        } else {
            httpMethod = "POST";
        }
        if (options.chunkedMode !== null || typeof options.chunkedMode != "undefined") {
            chunkedMode = options.chunkedMode;
        }
        if (options.params) {
            params = options.params;
        }
        else {
            params = {};
        }
    }

    if (cordova.platformId === "windowsphone") {
        headers = headers && convertHeadersToArray(headers);
        params = params && convertHeadersToArray(params);
    }

    var fail = errorCallback && function(e) {
        var error = new FileTransferError(e.code, e.source, e.target, e.http_status, e.body, e.exception);
        errorCallback(error);
    };

    var self = this;
    var win = function(result) {
        if (typeof result.lengthComputable != "undefined") {
            if (self.onprogress) {
                self.onprogress(newProgressEvent(result));
            }
        } else {
            if (successCallback) {
                successCallback(result);
            }
        }
    };
    exec(win, fail, 'FileTransfer', 'upload', [filePath, server, fileKey, fileName, mimeType, params, trustAllHosts, chunkedMode, headers, this._id, httpMethod]);
};

/**
 * Downloads a file form a given URL and saves it to the specified directory.
 * @param source {String}          URL of the server to receive the file
 * @param target {String}         Full path of the file on the device
 * @param successCallback (Function}  Callback to be invoked when upload has completed
 * @param errorCallback {Function}    Callback to be invoked upon error
 * @param trustAllHosts {Boolean} Optional trust all hosts (e.g. for self-signed certs), defaults to false
 * @param options {FileDownloadOptions} Optional parameters such as headers
 */
FileTransfer.prototype.download = function(source, target, successCallback, errorCallback, trustAllHosts, options) {
    argscheck.checkArgs('ssFF*', 'FileTransfer.download', arguments);
    var self = this;

    var basicAuthHeader = getBasicAuthHeader(source);
    if (basicAuthHeader) {
        source = source.replace(getUrlCredentials(source) + '@', '');

        options = options || {};
        options.headers = options.headers || {};
        options.headers[basicAuthHeader.name] = basicAuthHeader.value;
    }

    var headers = null;
    if (options) {
        headers = options.headers || null;
    }

    if (cordova.platformId === "windowsphone" && headers) {
        headers = convertHeadersToArray(headers);
    }

    var win = function(result) {
        if (typeof result.lengthComputable != "undefined") {
            if (self.onprogress) {
                return self.onprogress(newProgressEvent(result));
            }
        } else if (successCallback) {
            var entry = null;
            if (result.isDirectory) {
                entry = new (require('cordova-plugin-file.DirectoryEntry'))();
            }
            else if (result.isFile) {
                entry = new (require('cordova-plugin-file.FileEntry'))();
            }
            entry.isDirectory = result.isDirectory;
            entry.isFile = result.isFile;
            entry.name = result.name;
            entry.fullPath = result.fullPath;
            entry.filesystem = new FileSystem(result.filesystemName || (result.filesystem == window.PERSISTENT ? 'persistent' : 'temporary'));
            entry.nativeURL = result.nativeURL;
            successCallback(entry);
        }
    };

    var fail = errorCallback && function(e) {
        var error = new FileTransferError(e.code, e.source, e.target, e.http_status, e.body, e.exception);
        errorCallback(error);
    };

    exec(win, fail, 'FileTransfer', 'download', [source, target, trustAllHosts, this._id, headers]);
};

/**
 * Aborts the ongoing file transfer on this object. The original error
 * callback for the file transfer will be called if necessary.
 */
FileTransfer.prototype.abort = function() {
    exec(null, null, 'FileTransfer', 'abort', [this._id]);
};

module.exports = FileTransfer;

},{"cordova-plugin-file-transfer.FileTransferError":"cordova-plugin-file-transfer.FileTransferError","cordova-plugin-file.DirectoryEntry":"cordova-plugin-file.DirectoryEntry","cordova-plugin-file.FileEntry":"cordova-plugin-file.FileEntry","cordova-plugin-file.ProgressEvent":"cordova-plugin-file.ProgressEvent","cordova/argscheck":"cordova/argscheck","cordova/exec":"cordova/exec"}],"cordova-plugin-file.DirectoryEntry":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var argscheck = require('cordova/argscheck'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec'),
    Entry = require('cordova-plugin-file.Entry'),
    FileError = require('cordova-plugin-file.FileError'),
    DirectoryReader = require('cordova-plugin-file.DirectoryReader');

/**
 * An interface representing a directory on the file system.
 *
 * {boolean} isFile always false (readonly)
 * {boolean} isDirectory always true (readonly)
 * {DOMString} name of the directory, excluding the path leading to it (readonly)
 * {DOMString} fullPath the absolute full path to the directory (readonly)
 * {FileSystem} filesystem on which the directory resides (readonly)
 */
var DirectoryEntry = function(name, fullPath, fileSystem, nativeURL) {

    // add trailing slash if it is missing
    if ((fullPath) && !/\/$/.test(fullPath)) {
        fullPath += "/";
    }
    // add trailing slash if it is missing
    if (nativeURL && !/\/$/.test(nativeURL)) {
        nativeURL += "/";
    }
    DirectoryEntry.__super__.constructor.call(this, false, true, name, fullPath, fileSystem, nativeURL);
};

utils.extend(DirectoryEntry, Entry);

/**
 * Creates a new DirectoryReader to read entries from this directory
 */
DirectoryEntry.prototype.createReader = function() {
    return new DirectoryReader(this.toInternalURL());
};

/**
 * Creates or looks up a directory
 *
 * @param {DOMString} path either a relative or absolute path from this directory in which to look up or create a directory
 * @param {Flags} options to create or exclusively create the directory
 * @param {Function} successCallback is called with the new entry
 * @param {Function} errorCallback is called with a FileError
 */
DirectoryEntry.prototype.getDirectory = function(path, options, successCallback, errorCallback) {
    argscheck.checkArgs('sOFF', 'DirectoryEntry.getDirectory', arguments);
    var fs = this.filesystem;
    var win = successCallback && function(result) {
        var entry = new DirectoryEntry(result.name, result.fullPath, fs, result.nativeURL);
        successCallback(entry);
    };
    var fail = errorCallback && function(code) {
        errorCallback(new FileError(code));
    };
    exec(win, fail, "File", "getDirectory", [this.toInternalURL(), path, options]);
};

/**
 * Deletes a directory and all of it's contents
 *
 * @param {Function} successCallback is called with no parameters
 * @param {Function} errorCallback is called with a FileError
 */
DirectoryEntry.prototype.removeRecursively = function(successCallback, errorCallback) {
    argscheck.checkArgs('FF', 'DirectoryEntry.removeRecursively', arguments);
    var fail = errorCallback && function(code) {
        errorCallback(new FileError(code));
    };
    exec(successCallback, fail, "File", "removeRecursively", [this.toInternalURL()]);
};

/**
 * Creates or looks up a file
 *
 * @param {DOMString} path either a relative or absolute path from this directory in which to look up or create a file
 * @param {Flags} options to create or exclusively create the file
 * @param {Function} successCallback is called with the new entry
 * @param {Function} errorCallback is called with a FileError
 */
DirectoryEntry.prototype.getFile = function(path, options, successCallback, errorCallback) {
    argscheck.checkArgs('sOFF', 'DirectoryEntry.getFile', arguments);
    var fs = this.filesystem;
    var win = successCallback && function(result) {
        var FileEntry = require('cordova-plugin-file.FileEntry');
        var entry = new FileEntry(result.name, result.fullPath, fs, result.nativeURL);
        successCallback(entry);
    };
    var fail = errorCallback && function(code) {
        errorCallback(new FileError(code));
    };
    exec(win, fail, "File", "getFile", [this.toInternalURL(), path, options]);
};

module.exports = DirectoryEntry;

},{"cordova-plugin-file.DirectoryReader":"cordova-plugin-file.DirectoryReader","cordova-plugin-file.Entry":"cordova-plugin-file.Entry","cordova-plugin-file.FileEntry":"cordova-plugin-file.FileEntry","cordova-plugin-file.FileError":"cordova-plugin-file.FileError","cordova/argscheck":"cordova/argscheck","cordova/exec":"cordova/exec","cordova/utils":"cordova/utils"}],"cordova-plugin-file.DirectoryReader":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var exec = require('cordova/exec'),
    FileError = require('cordova-plugin-file.FileError') ;

/**
 * An interface that lists the files and directories in a directory.
 */
function DirectoryReader(localURL) {
    this.localURL = localURL || null;
    this.hasReadEntries = false;
}

/**
 * Returns a list of entries from a directory.
 *
 * @param {Function} successCallback is called with a list of entries
 * @param {Function} errorCallback is called with a FileError
 */
DirectoryReader.prototype.readEntries = function(successCallback, errorCallback) {
    // If we've already read and passed on this directory's entries, return an empty list.
    if (this.hasReadEntries) {
        successCallback([]);
        return;
    }
    var reader = this;
    var win = typeof successCallback !== 'function' ? null : function(result) {
        var retVal = [];
        for (var i=0; i<result.length; i++) {
            var entry = null;
            if (result[i].isDirectory) {
                entry = new (require('cordova-plugin-file.DirectoryEntry'))();
            }
            else if (result[i].isFile) {
                entry = new (require('cordova-plugin-file.FileEntry'))();
            }
            entry.isDirectory = result[i].isDirectory;
            entry.isFile = result[i].isFile;
            entry.name = result[i].name;
            entry.fullPath = result[i].fullPath;
            entry.filesystem = new (require('cordova-plugin-file.FileSystem'))(result[i].filesystemName);
            entry.nativeURL = result[i].nativeURL;
            retVal.push(entry);
        }
        reader.hasReadEntries = true;
        successCallback(retVal);
    };
    var fail = typeof errorCallback !== 'function' ? null : function(code) {
        errorCallback(new FileError(code));
    };
    exec(win, fail, "File", "readEntries", [this.localURL]);
};

module.exports = DirectoryReader;

},{"cordova-plugin-file.DirectoryEntry":"cordova-plugin-file.DirectoryEntry","cordova-plugin-file.FileEntry":"cordova-plugin-file.FileEntry","cordova-plugin-file.FileError":"cordova-plugin-file.FileError","cordova-plugin-file.FileSystem":"cordova-plugin-file.FileSystem","cordova/exec":"cordova/exec"}],"cordova-plugin-file.Entry":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var argscheck = require('cordova/argscheck'),
    exec = require('cordova/exec'),
    FileError = require('cordova-plugin-file.FileError'),
    Metadata = require('cordova-plugin-file.Metadata');

/**
 * Represents a file or directory on the local file system.
 *
 * @param isFile
 *            {boolean} true if Entry is a file (readonly)
 * @param isDirectory
 *            {boolean} true if Entry is a directory (readonly)
 * @param name
 *            {DOMString} name of the file or directory, excluding the path
 *            leading to it (readonly)
 * @param fullPath
 *            {DOMString} the absolute full path to the file or directory
 *            (readonly)
 * @param fileSystem
 *            {FileSystem} the filesystem on which this entry resides
 *            (readonly)
 * @param nativeURL
 *            {DOMString} an alternate URL which can be used by native
 *            webview controls, for example media players.
 *            (optional, readonly)
 */
function Entry(isFile, isDirectory, name, fullPath, fileSystem, nativeURL) {
    this.isFile = !!isFile;
    this.isDirectory = !!isDirectory;
    this.name = name || '';
    this.fullPath = fullPath || '';
    this.filesystem = fileSystem || null;
    this.nativeURL = nativeURL || null;
}

/**
 * Look up the metadata of the entry.
 *
 * @param successCallback
 *            {Function} is called with a Metadata object
 * @param errorCallback
 *            {Function} is called with a FileError
 */
Entry.prototype.getMetadata = function(successCallback, errorCallback) {
    argscheck.checkArgs('FF', 'Entry.getMetadata', arguments);
    var success = successCallback && function(entryMetadata) {
        var metadata = new Metadata({
            size: entryMetadata.size,
            modificationTime: entryMetadata.lastModifiedDate
        });
        successCallback(metadata);
    };
    var fail = errorCallback && function(code) {
        errorCallback(new FileError(code));
    };
    exec(success, fail, "File", "getFileMetadata", [this.toInternalURL()]);
};

/**
 * Set the metadata of the entry.
 *
 * @param successCallback
 *            {Function} is called with a Metadata object
 * @param errorCallback
 *            {Function} is called with a FileError
 * @param metadataObject
 *            {Object} keys and values to set
 */
Entry.prototype.setMetadata = function(successCallback, errorCallback, metadataObject) {
    argscheck.checkArgs('FFO', 'Entry.setMetadata', arguments);
    exec(successCallback, errorCallback, "File", "setMetadata", [this.toInternalURL(), metadataObject]);
};

/**
 * Move a file or directory to a new location.
 *
 * @param parent
 *            {DirectoryEntry} the directory to which to move this entry
 * @param newName
 *            {DOMString} new name of the entry, defaults to the current name
 * @param successCallback
 *            {Function} called with the new DirectoryEntry object
 * @param errorCallback
 *            {Function} called with a FileError
 */
Entry.prototype.moveTo = function(parent, newName, successCallback, errorCallback) {
    argscheck.checkArgs('oSFF', 'Entry.moveTo', arguments);
    var fail = errorCallback && function(code) {
        errorCallback(new FileError(code));
    };
    var srcURL = this.toInternalURL(),
        // entry name
        name = newName || this.name,
        success = function(entry) {
            if (entry) {
                if (successCallback) {
                    // create appropriate Entry object
                    var newFSName = entry.filesystemName || (entry.filesystem && entry.filesystem.name);
                    var fs = newFSName ? new FileSystem(newFSName, { name: "", fullPath: "/" }) : new FileSystem(parent.filesystem.name, { name: "", fullPath: "/" });
                    var result = (entry.isDirectory) ? new (require('cordova-plugin-file.DirectoryEntry'))(entry.name, entry.fullPath, fs, entry.nativeURL) : new (require('cordova-plugin-file.FileEntry'))(entry.name, entry.fullPath, fs, entry.nativeURL);
                    successCallback(result);
                }
            }
            else {
                // no Entry object returned
                if (fail) {
                    fail(FileError.NOT_FOUND_ERR);
                }
            }
        };

    // copy
    exec(success, fail, "File", "moveTo", [srcURL, parent.toInternalURL(), name]);
};

/**
 * Copy a directory to a different location.
 *
 * @param parent
 *            {DirectoryEntry} the directory to which to copy the entry
 * @param newName
 *            {DOMString} new name of the entry, defaults to the current name
 * @param successCallback
 *            {Function} called with the new Entry object
 * @param errorCallback
 *            {Function} called with a FileError
 */
Entry.prototype.copyTo = function(parent, newName, successCallback, errorCallback) {
    argscheck.checkArgs('oSFF', 'Entry.copyTo', arguments);
    var fail = errorCallback && function(code) {
        errorCallback(new FileError(code));
    };
    var srcURL = this.toInternalURL(),
        // entry name
        name = newName || this.name,
        // success callback
        success = function(entry) {
            if (entry) {
                if (successCallback) {
                    // create appropriate Entry object
                    var newFSName = entry.filesystemName || (entry.filesystem && entry.filesystem.name);
                    var fs = newFSName ? new FileSystem(newFSName, { name: "", fullPath: "/" }) : new FileSystem(parent.filesystem.name, { name: "", fullPath: "/" });
                    var result = (entry.isDirectory) ? new (require('cordova-plugin-file.DirectoryEntry'))(entry.name, entry.fullPath, fs, entry.nativeURL) : new (require('cordova-plugin-file.FileEntry'))(entry.name, entry.fullPath, fs, entry.nativeURL);
                    successCallback(result);
                }
            }
            else {
                // no Entry object returned
                if (fail) {
                    fail(FileError.NOT_FOUND_ERR);
                }
            }
        };

    // copy
    exec(success, fail, "File", "copyTo", [srcURL, parent.toInternalURL(), name]);
};

/**
 * Return a URL that can be passed across the bridge to identify this entry.
 */
Entry.prototype.toInternalURL = function() {
    if (this.filesystem && this.filesystem.__format__) {
      return this.filesystem.__format__(this.fullPath, this.nativeURL);
    }
};

/**
 * Return a URL that can be used to identify this entry.
 * Use a URL that can be used to as the src attribute of a <video> or
 * <audio> tag. If that is not possible, construct a cdvfile:// URL.
 */
Entry.prototype.toURL = function() {
    if (this.nativeURL) {
      return this.nativeURL;
    }
    // fullPath attribute may contain the full URL in the case that
    // toInternalURL fails.
    return this.toInternalURL() || "file://localhost" + this.fullPath;
};

/**
 * Backwards-compatibility: In v1.0.0 - 1.0.2, .toURL would only return a
 * cdvfile:// URL, and this method was necessary to obtain URLs usable by the
 * webview.
 * See CB-6051, CB-6106, CB-6117, CB-6152, CB-6199, CB-6201, CB-6243, CB-6249,
 * and CB-6300.
 */
Entry.prototype.toNativeURL = function() {
    console.log("DEPRECATED: Update your code to use 'toURL'");
    return this.toURL();
};

/**
 * Returns a URI that can be used to identify this entry.
 *
 * @param {DOMString} mimeType for a FileEntry, the mime type to be used to interpret the file, when loaded through this URI.
 * @return uri
 */
Entry.prototype.toURI = function(mimeType) {
    console.log("DEPRECATED: Update your code to use 'toURL'");
    return this.toURL();
};

/**
 * Remove a file or directory. It is an error to attempt to delete a
 * directory that is not empty. It is an error to attempt to delete a
 * root directory of a file system.
 *
 * @param successCallback {Function} called with no parameters
 * @param errorCallback {Function} called with a FileError
 */
Entry.prototype.remove = function(successCallback, errorCallback) {
    argscheck.checkArgs('FF', 'Entry.remove', arguments);
    var fail = errorCallback && function(code) {
        errorCallback(new FileError(code));
    };
    exec(successCallback, fail, "File", "remove", [this.toInternalURL()]);
};

/**
 * Look up the parent DirectoryEntry of this entry.
 *
 * @param successCallback {Function} called with the parent DirectoryEntry object
 * @param errorCallback {Function} called with a FileError
 */
Entry.prototype.getParent = function(successCallback, errorCallback) {
    argscheck.checkArgs('FF', 'Entry.getParent', arguments);
    var fs = this.filesystem;
    var win = successCallback && function(result) {
        var DirectoryEntry = require('cordova-plugin-file.DirectoryEntry');
        var entry = new DirectoryEntry(result.name, result.fullPath, fs, result.nativeURL);
        successCallback(entry);
    };
    var fail = errorCallback && function(code) {
        errorCallback(new FileError(code));
    };
    exec(win, fail, "File", "getParent", [this.toInternalURL()]);
};

module.exports = Entry;

},{"cordova-plugin-file.DirectoryEntry":"cordova-plugin-file.DirectoryEntry","cordova-plugin-file.FileEntry":"cordova-plugin-file.FileEntry","cordova-plugin-file.FileError":"cordova-plugin-file.FileError","cordova-plugin-file.Metadata":"cordova-plugin-file.Metadata","cordova/argscheck":"cordova/argscheck","cordova/exec":"cordova/exec"}],"cordova-plugin-file.FileEntry":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var utils = require('cordova/utils'),
    exec = require('cordova/exec'),
    Entry = require('cordova-plugin-file.Entry'),
    FileWriter = require('cordova-plugin-file.FileWriter'),
    File = require('cordova-plugin-file.File'),
    FileError = require('cordova-plugin-file.FileError');

/**
 * An interface representing a file on the file system.
 *
 * {boolean} isFile always true (readonly)
 * {boolean} isDirectory always false (readonly)
 * {DOMString} name of the file, excluding the path leading to it (readonly)
 * {DOMString} fullPath the absolute full path to the file (readonly)
 * {FileSystem} filesystem on which the file resides (readonly)
 */
var FileEntry = function(name, fullPath, fileSystem, nativeURL) {
    // remove trailing slash if it is present
    if (fullPath && /\/$/.test(fullPath)) {
        fullPath = fullPath.substring(0, fullPath.length - 1);
    }
    if (nativeURL && /\/$/.test(nativeURL)) {
        nativeURL = nativeURL.substring(0, nativeURL.length - 1);
    }

    FileEntry.__super__.constructor.apply(this, [true, false, name, fullPath, fileSystem, nativeURL]);
};

utils.extend(FileEntry, Entry);

/**
 * Creates a new FileWriter associated with the file that this FileEntry represents.
 *
 * @param {Function} successCallback is called with the new FileWriter
 * @param {Function} errorCallback is called with a FileError
 */
FileEntry.prototype.createWriter = function(successCallback, errorCallback) {
    this.file(function(filePointer) {
        var writer = new FileWriter(filePointer);

        if (writer.localURL === null || writer.localURL === "") {
            if (errorCallback) {
                errorCallback(new FileError(FileError.INVALID_STATE_ERR));
            }
        } else {
            if (successCallback) {
                successCallback(writer);
            }
        }
    }, errorCallback);
};

/**
 * Returns a File that represents the current state of the file that this FileEntry represents.
 *
 * @param {Function} successCallback is called with the new File object
 * @param {Function} errorCallback is called with a FileError
 */
FileEntry.prototype.file = function(successCallback, errorCallback) {
    var localURL = this.toInternalURL();
    var win = successCallback && function(f) {
        var file = new File(f.name, localURL, f.type, f.lastModifiedDate, f.size);
        successCallback(file);
    };
    var fail = errorCallback && function(code) {
        errorCallback(new FileError(code));
    };
    exec(win, fail, "File", "getFileMetadata", [localURL]);
};


module.exports = FileEntry;

},{"cordova-plugin-file.Entry":"cordova-plugin-file.Entry","cordova-plugin-file.File":"cordova-plugin-file.File","cordova-plugin-file.FileError":"cordova-plugin-file.FileError","cordova-plugin-file.FileWriter":"cordova-plugin-file.FileWriter","cordova/exec":"cordova/exec","cordova/utils":"cordova/utils"}],"cordova-plugin-file.FileError":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * FileError
 */
function FileError(error) {
  this.code = error || null;
}

// File error codes
// Found in DOMException
FileError.NOT_FOUND_ERR = 1;
FileError.SECURITY_ERR = 2;
FileError.ABORT_ERR = 3;

// Added by File API specification
FileError.NOT_READABLE_ERR = 4;
FileError.ENCODING_ERR = 5;
FileError.NO_MODIFICATION_ALLOWED_ERR = 6;
FileError.INVALID_STATE_ERR = 7;
FileError.SYNTAX_ERR = 8;
FileError.INVALID_MODIFICATION_ERR = 9;
FileError.QUOTA_EXCEEDED_ERR = 10;
FileError.TYPE_MISMATCH_ERR = 11;
FileError.PATH_EXISTS_ERR = 12;

module.exports = FileError;

},{}],"cordova-plugin-file.FileReader":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var exec = require('cordova/exec'),
    modulemapper = require('cordova/modulemapper'),
    utils = require('cordova/utils'),
    FileError = require('cordova-plugin-file.FileError'),
    ProgressEvent = require('cordova-plugin-file.ProgressEvent'),
    origFileReader = modulemapper.getOriginalSymbol(window, 'FileReader');

/**
 * This class reads the mobile device file system.
 *
 * For Android:
 *      The root directory is the root of the file system.
 *      To read from the SD card, the file name is "sdcard/my_file.txt"
 * @constructor
 */
var FileReader = function() {
    this._readyState = 0;
    this._error = null;
    this._result = null;
    this._progress = null;
    this._localURL = '';
    this._realReader = origFileReader ? new origFileReader() : {};
};

/**
 * Defines the maximum size to read at a time via the native API. The default value is a compromise between
 * minimizing the overhead of many exec() calls while still reporting progress frequently enough for large files.
 * (Note attempts to allocate more than a few MB of contiguous memory on the native side are likely to cause
 * OOM exceptions, while the JS engine seems to have fewer problems managing large strings or ArrayBuffers.)
 */
FileReader.READ_CHUNK_SIZE = 256*1024;

// States
FileReader.EMPTY = 0;
FileReader.LOADING = 1;
FileReader.DONE = 2;

utils.defineGetter(FileReader.prototype, 'readyState', function() {
    return this._localURL ? this._readyState : this._realReader.readyState;
});

utils.defineGetter(FileReader.prototype, 'error', function() {
    return this._localURL ? this._error: this._realReader.error;
});

utils.defineGetter(FileReader.prototype, 'result', function() {
    return this._localURL ? this._result: this._realReader.result;
});

function defineEvent(eventName) {
    utils.defineGetterSetter(FileReader.prototype, eventName, function() {
        return this._realReader[eventName] || null;
    }, function(value) {
        this._realReader[eventName] = value;
    });
}
defineEvent('onloadstart');    // When the read starts.
defineEvent('onprogress');     // While reading (and decoding) file or fileBlob data, and reporting partial file data (progress.loaded/progress.total)
defineEvent('onload');         // When the read has successfully completed.
defineEvent('onerror');        // When the read has failed (see errors).
defineEvent('onloadend');      // When the request has completed (either in success or failure).
defineEvent('onabort');        // When the read has been aborted. For instance, by invoking the abort() method.

function initRead(reader, file) {
    // Already loading something
    if (reader.readyState == FileReader.LOADING) {
      throw new FileError(FileError.INVALID_STATE_ERR);
    }

    reader._result = null;
    reader._error = null;
    reader._progress = 0;
    reader._readyState = FileReader.LOADING;

    if (typeof file.localURL == 'string') {
        reader._localURL = file.localURL;
    } else {
        reader._localURL = '';
        return true;
    }

    if (reader.onloadstart) {
        reader.onloadstart(new ProgressEvent("loadstart", {target:reader}));
    }
}

/**
 * Callback used by the following read* functions to handle incremental or final success.
 * Must be bound to the FileReader's this along with all but the last parameter,
 * e.g. readSuccessCallback.bind(this, "readAsText", "UTF-8", offset, totalSize, accumulate)
 * @param readType The name of the read function to call.
 * @param encoding Text encoding, or null if this is not a text type read.
 * @param offset Starting offset of the read.
 * @param totalSize Total number of bytes or chars to read.
 * @param accumulate A function that takes the callback result and accumulates it in this._result.
 * @param r Callback result returned by the last read exec() call, or null to begin reading.
 */
function readSuccessCallback(readType, encoding, offset, totalSize, accumulate, r) {
    if (this._readyState === FileReader.DONE) {
        return;
    }

    var CHUNK_SIZE = FileReader.READ_CHUNK_SIZE;
    if (readType === 'readAsDataURL') {
        // Windows proxy does not support reading file slices as Data URLs
        // so read the whole file at once.
        CHUNK_SIZE = cordova.platformId === 'windows' ? totalSize :
            // Calculate new chunk size for data URLs to be multiply of 3
            // Otherwise concatenated base64 chunks won't be valid base64 data
            FileReader.READ_CHUNK_SIZE - (FileReader.READ_CHUNK_SIZE % 3) + 3;
    }

    if (typeof r !== "undefined") {
        accumulate(r);
        this._progress = Math.min(this._progress + CHUNK_SIZE, totalSize);

        if (typeof this.onprogress === "function") {
            this.onprogress(new ProgressEvent("progress", {loaded:this._progress, total:totalSize}));
        }
    }

    if (typeof r === "undefined" || this._progress < totalSize) {
        var execArgs = [
            this._localURL,
            offset + this._progress,
            offset + this._progress + Math.min(totalSize - this._progress, CHUNK_SIZE)];
        if (encoding) {
            execArgs.splice(1, 0, encoding);
        }
        exec(
            readSuccessCallback.bind(this, readType, encoding, offset, totalSize, accumulate),
            readFailureCallback.bind(this),
            "File", readType, execArgs);
    } else {
        this._readyState = FileReader.DONE;

        if (typeof this.onload === "function") {
            this.onload(new ProgressEvent("load", {target:this}));
        }

        if (typeof this.onloadend === "function") {
            this.onloadend(new ProgressEvent("loadend", {target:this}));
        }
    }
}

/**
 * Callback used by the following read* functions to handle errors.
 * Must be bound to the FileReader's this, e.g. readFailureCallback.bind(this)
 */
function readFailureCallback(e) {
    if (this._readyState === FileReader.DONE) {
        return;
    }

    this._readyState = FileReader.DONE;
    this._result = null;
    this._error = new FileError(e);

    if (typeof this.onerror === "function") {
        this.onerror(new ProgressEvent("error", {target:this}));
    }

    if (typeof this.onloadend === "function") {
        this.onloadend(new ProgressEvent("loadend", {target:this}));
    }
}

/**
 * Abort reading file.
 */
FileReader.prototype.abort = function() {
    if (origFileReader && !this._localURL) {
        return this._realReader.abort();
    }
    this._result = null;

    if (this._readyState == FileReader.DONE || this._readyState == FileReader.EMPTY) {
      return;
    }

    this._readyState = FileReader.DONE;

    // If abort callback
    if (typeof this.onabort === 'function') {
        this.onabort(new ProgressEvent('abort', {target:this}));
    }
    // If load end callback
    if (typeof this.onloadend === 'function') {
        this.onloadend(new ProgressEvent('loadend', {target:this}));
    }
};

/**
 * Read text file.
 *
 * @param file          {File} File object containing file properties
 * @param encoding      [Optional] (see http://www.iana.org/assignments/character-sets)
 */
FileReader.prototype.readAsText = function(file, encoding) {
    if (initRead(this, file)) {
        return this._realReader.readAsText(file, encoding);
    }

    // Default encoding is UTF-8
    var enc = encoding ? encoding : "UTF-8";

    var totalSize = file.end - file.start;
    readSuccessCallback.bind(this)("readAsText", enc, file.start, totalSize, function(r) {
        if (this._progress === 0) {
            this._result = "";
        }
        this._result += r;
    }.bind(this));
};


/**
 * Read file and return data as a base64 encoded data url.
 * A data url is of the form:
 *      data:[<mediatype>][;base64],<data>
 *
 * @param file          {File} File object containing file properties
 */
FileReader.prototype.readAsDataURL = function(file) {
    if (initRead(this, file)) {
        return this._realReader.readAsDataURL(file);
    }

    var totalSize = file.end - file.start;
    readSuccessCallback.bind(this)("readAsDataURL", null, file.start, totalSize, function(r) {
        var commaIndex = r.indexOf(',');
        if (this._progress === 0) {
            this._result = r;
        } else {
            this._result += r.substring(commaIndex + 1);
        }
    }.bind(this));
};

/**
 * Read file and return data as a binary data.
 *
 * @param file          {File} File object containing file properties
 */
FileReader.prototype.readAsBinaryString = function(file) {
    if (initRead(this, file)) {
        return this._realReader.readAsBinaryString(file);
    }

    var totalSize = file.end - file.start;
    readSuccessCallback.bind(this)("readAsBinaryString", null, file.start, totalSize, function(r) {
        if (this._progress === 0) {
            this._result = "";
        }
        this._result += r;
    }.bind(this));
};

/**
 * Read file and return data as a binary data.
 *
 * @param file          {File} File object containing file properties
 */
FileReader.prototype.readAsArrayBuffer = function(file) {
    if (initRead(this, file)) {
        return this._realReader.readAsArrayBuffer(file);
    }

    var totalSize = file.end - file.start;
    readSuccessCallback.bind(this)("readAsArrayBuffer", null, file.start, totalSize, function(r) {
        var resultArray = (this._progress === 0 ? new Uint8Array(totalSize) : new Uint8Array(this._result));
        resultArray.set(new Uint8Array(r), this._progress);
        this._result = resultArray.buffer;
    }.bind(this));
};

module.exports = FileReader;

},{"cordova-plugin-file.FileError":"cordova-plugin-file.FileError","cordova-plugin-file.ProgressEvent":"cordova-plugin-file.ProgressEvent","cordova/exec":"cordova/exec","cordova/modulemapper":"cordova/modulemapper","cordova/utils":"cordova/utils"}],"cordova-plugin-file.FileSystem":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var DirectoryEntry = require('cordova-plugin-file.DirectoryEntry');

/**
 * An interface representing a file system
 *
 * @constructor
 * {DOMString} name the unique name of the file system (readonly)
 * {DirectoryEntry} root directory of the file system (readonly)
 */
var FileSystem = function(name, root) {
    this.name = name;
    if (root) {
        this.root = new DirectoryEntry(root.name, root.fullPath, this, root.nativeURL);
    } else {
        this.root = new DirectoryEntry(this.name, '/', this);
    }
};

FileSystem.prototype.__format__ = function(fullPath, nativeUrl) {
    return fullPath;
};

FileSystem.prototype.toJSON = function() {
    return "<FileSystem: " + this.name + ">";
};

// Use instead of encodeURI() when encoding just the path part of a URI rather than an entire URI.
FileSystem.encodeURIPath = function(path) {
    // Because # is a valid filename character, it must be encoded to prevent part of the
    // path from being parsed as a URI fragment.
    return encodeURI(path).replace(/#/g, '%23');
};

module.exports = FileSystem;

},{"cordova-plugin-file.DirectoryEntry":"cordova-plugin-file.DirectoryEntry"}],"cordova-plugin-file.FileUploadOptions":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * Options to customize the HTTP request used to upload files.
 * @constructor
 * @param fileKey {String}   Name of file request parameter.
 * @param fileName {String}  Filename to be used by the server. Defaults to image.jpg.
 * @param mimeType {String}  Mimetype of the uploaded file. Defaults to image/jpeg.
 * @param params {Object}    Object with key: value params to send to the server.
 * @param headers {Object}   Keys are header names, values are header values. Multiple
 *                           headers of the same name are not supported.
 */
var FileUploadOptions = function(fileKey, fileName, mimeType, params, headers, httpMethod) {
    this.fileKey = fileKey || null;
    this.fileName = fileName || null;
    this.mimeType = mimeType || null;
    this.params = params || null;
    this.headers = headers || null;
    this.httpMethod = httpMethod || null;
};

module.exports = FileUploadOptions;

},{}],"cordova-plugin-file.FileUploadResult":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * FileUploadResult
 * @constructor
 */
module.exports = function FileUploadResult(size, code, content) {
	this.bytesSent = size;
	this.responseCode = code;
	this.response = content;
 };
},{}],"cordova-plugin-file.FileWriter":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var exec = require('cordova/exec'),
    FileError = require('cordova-plugin-file.FileError'),
    ProgressEvent = require('cordova-plugin-file.ProgressEvent');

/**
 * This class writes to the mobile device file system.
 *
 * For Android:
 *      The root directory is the root of the file system.
 *      To write to the SD card, the file name is "sdcard/my_file.txt"
 *
 * @constructor
 * @param file {File} File object containing file properties
 * @param append if true write to the end of the file, otherwise overwrite the file
 */
var FileWriter = function(file) {
    this.fileName = "";
    this.length = 0;
    if (file) {
        this.localURL = file.localURL || file;
        this.length = file.size || 0;
    }
    // default is to write at the beginning of the file
    this.position = 0;

    this.readyState = 0; // EMPTY

    this.result = null;

    // Error
    this.error = null;

    // Event handlers
    this.onwritestart = null;   // When writing starts
    this.onprogress = null;     // While writing the file, and reporting partial file data
    this.onwrite = null;        // When the write has successfully completed.
    this.onwriteend = null;     // When the request has completed (either in success or failure).
    this.onabort = null;        // When the write has been aborted. For instance, by invoking the abort() method.
    this.onerror = null;        // When the write has failed (see errors).
};

// States
FileWriter.INIT = 0;
FileWriter.WRITING = 1;
FileWriter.DONE = 2;

/**
 * Abort writing file.
 */
FileWriter.prototype.abort = function() {
    // check for invalid state
    if (this.readyState === FileWriter.DONE || this.readyState === FileWriter.INIT) {
        throw new FileError(FileError.INVALID_STATE_ERR);
    }

    // set error
    this.error = new FileError(FileError.ABORT_ERR);

    this.readyState = FileWriter.DONE;

    // If abort callback
    if (typeof this.onabort === "function") {
        this.onabort(new ProgressEvent("abort", {"target":this}));
    }

    // If write end callback
    if (typeof this.onwriteend === "function") {
        this.onwriteend(new ProgressEvent("writeend", {"target":this}));
    }
};

/**
 * Writes data to the file
 *
 * @param data text or blob to be written
 * @param isPendingBlobReadResult {Boolean} true if the data is the pending blob read operation result
 */
FileWriter.prototype.write = function(data, isPendingBlobReadResult) {

    var that=this;
    var supportsBinary = (typeof window.Blob !== 'undefined' && typeof window.ArrayBuffer !== 'undefined');
    var isProxySupportBlobNatively = (cordova.platformId === "windows8" || cordova.platformId === "windows");
    var isBinary;

    // Check to see if the incoming data is a blob
    if (data instanceof File || (!isProxySupportBlobNatively && supportsBinary && data instanceof Blob)) {
        var fileReader = new FileReader();
        fileReader.onload = function() {
            // Call this method again, with the arraybuffer as argument
            FileWriter.prototype.write.call(that, this.result, true /* isPendingBlobReadResult */);
        };
        fileReader.onerror = function () {
            // DONE state
            that.readyState = FileWriter.DONE;

            // Save error
            that.error = this.error;

            // If onerror callback
            if (typeof that.onerror === "function") {
                that.onerror(new ProgressEvent("error", {"target":that}));
            }

            // If onwriteend callback
            if (typeof that.onwriteend === "function") {
                that.onwriteend(new ProgressEvent("writeend", {"target":that}));
            }
        };

        // WRITING state
        this.readyState = FileWriter.WRITING;

        if (supportsBinary) {
            fileReader.readAsArrayBuffer(data);
        } else {
            fileReader.readAsText(data);
        }
        return;
    }

    // Mark data type for safer transport over the binary bridge
    isBinary = supportsBinary && (data instanceof ArrayBuffer);
    if (isBinary && cordova.platformId === "windowsphone") {
        // create a plain array, using the keys from the Uint8Array view so that we can serialize it
        data = Array.apply(null, new Uint8Array(data));
    }

    // Throw an exception if we are already writing a file
    if (this.readyState === FileWriter.WRITING && !isPendingBlobReadResult) {
        throw new FileError(FileError.INVALID_STATE_ERR);
    }

    // WRITING state
    this.readyState = FileWriter.WRITING;

    var me = this;

    // If onwritestart callback
    if (typeof me.onwritestart === "function") {
        me.onwritestart(new ProgressEvent("writestart", {"target":me}));
    }

    // Write file
    exec(
        // Success callback
        function(r) {
            // If DONE (cancelled), then don't do anything
            if (me.readyState === FileWriter.DONE) {
                return;
            }

            // position always increases by bytes written because file would be extended
            me.position += r;
            // The length of the file is now where we are done writing.

            me.length = me.position;

            // DONE state
            me.readyState = FileWriter.DONE;

            // If onwrite callback
            if (typeof me.onwrite === "function") {
                me.onwrite(new ProgressEvent("write", {"target":me}));
            }

            // If onwriteend callback
            if (typeof me.onwriteend === "function") {
                me.onwriteend(new ProgressEvent("writeend", {"target":me}));
            }
        },
        // Error callback
        function(e) {
            // If DONE (cancelled), then don't do anything
            if (me.readyState === FileWriter.DONE) {
                return;
            }

            // DONE state
            me.readyState = FileWriter.DONE;

            // Save error
            me.error = new FileError(e);

            // If onerror callback
            if (typeof me.onerror === "function") {
                me.onerror(new ProgressEvent("error", {"target":me}));
            }

            // If onwriteend callback
            if (typeof me.onwriteend === "function") {
                me.onwriteend(new ProgressEvent("writeend", {"target":me}));
            }
        }, "File", "write", [this.localURL, data, this.position, isBinary]);
};

/**
 * Moves the file pointer to the location specified.
 *
 * If the offset is a negative number the position of the file
 * pointer is rewound.  If the offset is greater than the file
 * size the position is set to the end of the file.
 *
 * @param offset is the location to move the file pointer to.
 */
FileWriter.prototype.seek = function(offset) {
    // Throw an exception if we are already writing a file
    if (this.readyState === FileWriter.WRITING) {
        throw new FileError(FileError.INVALID_STATE_ERR);
    }

    if (!offset && offset !== 0) {
        return;
    }

    // See back from end of file.
    if (offset < 0) {
        this.position = Math.max(offset + this.length, 0);
    }
    // Offset is bigger than file size so set position
    // to the end of the file.
    else if (offset > this.length) {
        this.position = this.length;
    }
    // Offset is between 0 and file size so set the position
    // to start writing.
    else {
        this.position = offset;
    }
};

/**
 * Truncates the file to the size specified.
 *
 * @param size to chop the file at.
 */
FileWriter.prototype.truncate = function(size) {
    // Throw an exception if we are already writing a file
    if (this.readyState === FileWriter.WRITING) {
        throw new FileError(FileError.INVALID_STATE_ERR);
    }

    // WRITING state
    this.readyState = FileWriter.WRITING;

    var me = this;

    // If onwritestart callback
    if (typeof me.onwritestart === "function") {
        me.onwritestart(new ProgressEvent("writestart", {"target":this}));
    }

    // Write file
    exec(
        // Success callback
        function(r) {
            // If DONE (cancelled), then don't do anything
            if (me.readyState === FileWriter.DONE) {
                return;
            }

            // DONE state
            me.readyState = FileWriter.DONE;

            // Update the length of the file
            me.length = r;
            me.position = Math.min(me.position, r);

            // If onwrite callback
            if (typeof me.onwrite === "function") {
                me.onwrite(new ProgressEvent("write", {"target":me}));
            }

            // If onwriteend callback
            if (typeof me.onwriteend === "function") {
                me.onwriteend(new ProgressEvent("writeend", {"target":me}));
            }
        },
        // Error callback
        function(e) {
            // If DONE (cancelled), then don't do anything
            if (me.readyState === FileWriter.DONE) {
                return;
            }

            // DONE state
            me.readyState = FileWriter.DONE;

            // Save error
            me.error = new FileError(e);

            // If onerror callback
            if (typeof me.onerror === "function") {
                me.onerror(new ProgressEvent("error", {"target":me}));
            }

            // If onwriteend callback
            if (typeof me.onwriteend === "function") {
                me.onwriteend(new ProgressEvent("writeend", {"target":me}));
            }
        }, "File", "truncate", [this.localURL, size]);
};

module.exports = FileWriter;

},{"cordova-plugin-file.FileError":"cordova-plugin-file.FileError","cordova-plugin-file.ProgressEvent":"cordova-plugin-file.ProgressEvent","cordova/exec":"cordova/exec"}],"cordova-plugin-file.File":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * Constructor.
 * name {DOMString} name of the file, without path information
 * fullPath {DOMString} the full path of the file, including the name
 * type {DOMString} mime type
 * lastModifiedDate {Date} last modified date
 * size {Number} size of the file in bytes
 */

var File = function(name, localURL, type, lastModifiedDate, size){
    this.name = name || '';
    this.localURL = localURL || null;
    this.type = type || null;
    this.lastModified = lastModifiedDate || null;
    // For backwards compatibility, store the timestamp in lastModifiedDate as well
    this.lastModifiedDate = lastModifiedDate || null;
    this.size = size || 0;

    // These store the absolute start and end for slicing the file.
    this.start = 0;
    this.end = this.size;
};

/**
 * Returns a "slice" of the file. Since Cordova Files don't contain the actual
 * content, this really returns a File with adjusted start and end.
 * Slices of slices are supported.
 * start {Number} The index at which to start the slice (inclusive).
 * end {Number} The index at which to end the slice (exclusive).
 */
File.prototype.slice = function(start, end) {
    var size = this.end - this.start;
    var newStart = 0;
    var newEnd = size;
    if (arguments.length) {
        if (start < 0) {
            newStart = Math.max(size + start, 0);
        } else {
            newStart = Math.min(size, start);
        }
    }

    if (arguments.length >= 2) {
        if (end < 0) {
            newEnd = Math.max(size + end, 0);
        } else {
            newEnd = Math.min(end, size);
        }
    }

    var newFile = new File(this.name, this.localURL, this.type, this.lastModified, this.size);
    newFile.start = this.start + newStart;
    newFile.end = this.start + newEnd;
    return newFile;
};


module.exports = File;

},{}],"cordova-plugin-file.Flags":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * Supplies arguments to methods that lookup or create files and directories.
 *
 * @param create
 *            {boolean} file or directory if it doesn't exist
 * @param exclusive
 *            {boolean} used with create; if true the command will fail if
 *            target path exists
 */
function Flags(create, exclusive) {
    this.create = create || false;
    this.exclusive = exclusive || false;
}

module.exports = Flags;

},{}],"cordova-plugin-file.LocalFileSystem":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

exports.TEMPORARY = 0;
exports.PERSISTENT = 1;

},{}],"cordova-plugin-file.Metadata":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * Information about the state of the file or directory
 *
 * {Date} modificationTime (readonly)
 */
var Metadata = function(metadata) {
    if (typeof metadata == "object") {
        this.modificationTime = new Date(metadata.modificationTime);
        this.size = metadata.size || 0;
    } else if (typeof metadata == "undefined") {
        this.modificationTime = null;
        this.size = 0;
    } else {
        /* Backwards compatiblity with platforms that only return a timestamp */
        this.modificationTime = new Date(metadata);
    }
};

module.exports = Metadata;

},{}],"cordova-plugin-file.ProgressEvent":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

// If ProgressEvent exists in global context, use it already, otherwise use our own polyfill
// Feature test: See if we can instantiate a native ProgressEvent;
// if so, use that approach,
// otherwise fill-in with our own implementation.
//
// NOTE: right now we always fill in with our own. Down the road would be nice if we can use whatever is native in the webview.
var ProgressEvent = (function() {
    /*
    var createEvent = function(data) {
        var event = document.createEvent('Events');
        event.initEvent('ProgressEvent', false, false);
        if (data) {
            for (var i in data) {
                if (data.hasOwnProperty(i)) {
                    event[i] = data[i];
                }
            }
            if (data.target) {
                // TODO: cannot call <some_custom_object>.dispatchEvent
                // need to first figure out how to implement EventTarget
            }
        }
        return event;
    };
    try {
        var ev = createEvent({type:"abort",target:document});
        return function ProgressEvent(type, data) {
            data.type = type;
            return createEvent(data);
        };
    } catch(e){
    */
        return function ProgressEvent(type, dict) {
            this.type = type;
            this.bubbles = false;
            this.cancelBubble = false;
            this.cancelable = false;
            this.lengthComputable = false;
            this.loaded = dict && dict.loaded ? dict.loaded : 0;
            this.total = dict && dict.total ? dict.total : 0;
            this.target = dict && dict.target ? dict.target : null;
        };
    //}
})();

module.exports = ProgressEvent;

},{}],"cordova-plugin-file.androidFileSystem":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

FILESYSTEM_PROTOCOL = "cdvfile";

module.exports = {
    __format__: function(fullPath, nativeUrl) {
        var path;
        var contentUrlMatch = /^content:\/\//.exec(nativeUrl);
        if (contentUrlMatch) {
            // When available, use the path from a native content URL, which was already encoded by Android.
            // This is necessary because JavaScript's encodeURI() does not encode as many characters as
            // Android, which can result in permission exceptions when the encoding of a content URI
            // doesn't match the string for which permission was originally granted.
            path = nativeUrl.substring(contentUrlMatch[0].length - 1);
        } else {
            path = FileSystem.encodeURIPath(fullPath);
            if (!/^\//.test(path)) {
                path = '/' + path;
            }

            var m = /\?.*/.exec(nativeUrl);
            if (m) {
                path += m[0];
            }
        }

        return FILESYSTEM_PROTOCOL + '://localhost/' + this.name + path;
    }
};


},{}],"cordova-plugin-file.fileSystemPaths":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var exec = require('cordova/exec');
var channel = require('cordova/channel');

exports.file = {
    // Read-only directory where the application is installed.
    applicationDirectory: null,
    // Root of app's private writable storage
    applicationStorageDirectory: null,
    // Where to put app-specific data files.
    dataDirectory: null,
    // Cached files that should survive app restarts.
    // Apps should not rely on the OS to delete files in here.
    cacheDirectory: null,
    // Android: the application space on external storage.
    externalApplicationStorageDirectory: null,
    // Android: Where to put app-specific data files on external storage.
    externalDataDirectory: null,
    // Android: the application cache on external storage.
    externalCacheDirectory: null,
    // Android: the external storage (SD card) root.
    externalRootDirectory: null,
    // iOS: Temp directory that the OS can clear at will.
    tempDirectory: null,
    // iOS: Holds app-specific files that should be synced (e.g. to iCloud).
    syncedDataDirectory: null,
    // iOS: Files private to the app, but that are meaningful to other applications (e.g. Office files)
    documentsDirectory: null,
    // BlackBerry10: Files globally available to all apps
    sharedDirectory: null
};

channel.waitForInitialization('onFileSystemPathsReady');
channel.onCordovaReady.subscribe(function() {
    function after(paths) {
        for (var k in paths) {
            exports.file[k] = paths[k];
        }
        channel.initializationComplete('onFileSystemPathsReady');
    }
    exec(after, null, 'File', 'requestAllPaths', []);
});


},{"cordova/channel":"cordova/channel","cordova/exec":"cordova/exec"}],"cordova-plugin-file.fileSystems-roots":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

// Map of fsName -> FileSystem.
var fsMap = null;
var FileSystem = require('cordova-plugin-file.FileSystem');
var exec = require('cordova/exec');

// Overridden by Android, BlackBerry 10 and iOS to populate fsMap.
require('cordova-plugin-file.fileSystems').getFs = function(name, callback) {
    function success(response) {
        fsMap = {};
        for (var i = 0; i < response.length; ++i) {
            var fsRoot = response[i];
            var fs = new FileSystem(fsRoot.filesystemName, fsRoot);
            fsMap[fs.name] = fs;
        }
        callback(fsMap[name]);
    }

    if (fsMap) {
        callback(fsMap[name]);
    } else {
        exec(success, null, "File", "requestAllFileSystems", []);
    }
};


},{"cordova-plugin-file.FileSystem":"cordova-plugin-file.FileSystem","cordova-plugin-file.fileSystems":"cordova-plugin-file.fileSystems","cordova/exec":"cordova/exec"}],"cordova-plugin-file.fileSystems":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

// Overridden by Android, BlackBerry 10 and iOS to populate fsMap.
module.exports.getFs = function(name, callback) {
    callback(null);
};

},{}],"cordova-plugin-file.isChrome":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */

module.exports = function () {
    // window.webkitRequestFileSystem and window.webkitResolveLocalFileSystemURL are available only in Chrome and
    // possibly a good flag to indicate that we're running in Chrome
    return window.webkitRequestFileSystem && window.webkitResolveLocalFileSystemURL;
};

},{}],"cordova-plugin-file.requestFileSystem":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

(function() {
    //For browser platform: not all browsers use this file.
    function checkBrowser() {
        if (cordova.platformId === "browser" && require('cordova-plugin-file.isChrome')()) {
            module.exports = window.requestFileSystem || window.webkitRequestFileSystem;
            return true;
        }
        return false;
    }
    if (checkBrowser()) {
        return;
    }

    var argscheck = require('cordova/argscheck'),
        FileError = require('cordova-plugin-file.FileError'),
        FileSystem = require('cordova-plugin-file.FileSystem'),
        exec = require('cordova/exec');
    var fileSystems = require('cordova-plugin-file.fileSystems');

    /**
     * Request a file system in which to store application data.
     * @param type  local file system type
     * @param size  indicates how much storage space, in bytes, the application expects to need
     * @param successCallback  invoked with a FileSystem object
     * @param errorCallback  invoked if error occurs retrieving file system
     */
    var requestFileSystem = function(type, size, successCallback, errorCallback) {
        argscheck.checkArgs('nnFF', 'requestFileSystem', arguments);
        var fail = function(code) {
            if (errorCallback) {
                errorCallback(new FileError(code));
            }
        };

        if (type < 0) {
            fail(FileError.SYNTAX_ERR);
        } else {
            // if successful, return a FileSystem object
            var success = function(file_system) {
                if (file_system) {
                    if (successCallback) {
                        fileSystems.getFs(file_system.name, function(fs) {
                            // This should happen only on platforms that haven't implemented requestAllFileSystems (windows)
                            if (!fs) {
                                fs = new FileSystem(file_system.name, file_system.root);
                            }
                            successCallback(fs);
                        });
                    }
                }
                else {
                    // no FileSystem object returned
                    fail(FileError.NOT_FOUND_ERR);
                }
            };
            exec(success, fail, "File", "requestFileSystem", [type, size]);
        }
    };

    module.exports = requestFileSystem;
})();

},{"cordova-plugin-file.FileError":"cordova-plugin-file.FileError","cordova-plugin-file.FileSystem":"cordova-plugin-file.FileSystem","cordova-plugin-file.fileSystems":"cordova-plugin-file.fileSystems","cordova-plugin-file.isChrome":"cordova-plugin-file.isChrome","cordova/argscheck":"cordova/argscheck","cordova/exec":"cordova/exec"}],"cordova-plugin-file.resolveLocalFileSystemURI":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/
(function() {
    //For browser platform: not all browsers use overrided `resolveLocalFileSystemURL`.
    function checkBrowser() {
        if (cordova.platformId === "browser" && require('cordova-plugin-file.isChrome')()) {
            module.exports.resolveLocalFileSystemURL = window.resolveLocalFileSystemURL || window.webkitResolveLocalFileSystemURL;
            return true;
        }
        return false;
    }
    if (checkBrowser()) {
        return;
    }

    var argscheck = require('cordova/argscheck'),
        DirectoryEntry = require('cordova-plugin-file.DirectoryEntry'),
        FileEntry = require('cordova-plugin-file.FileEntry'),
        FileError = require('cordova-plugin-file.FileError'),
        exec = require('cordova/exec');
    var fileSystems = require('cordova-plugin-file.fileSystems');

    /**
     * Look up file system Entry referred to by local URI.
     * @param {DOMString} uri  URI referring to a local file or directory
     * @param successCallback  invoked with Entry object corresponding to URI
     * @param errorCallback    invoked if error occurs retrieving file system entry
     */
    module.exports.resolveLocalFileSystemURL = module.exports.resolveLocalFileSystemURL || function(uri, successCallback, errorCallback) {
        argscheck.checkArgs('sFF', 'resolveLocalFileSystemURI', arguments);
        // error callback
        var fail = function(error) {
            if (errorCallback) {
                errorCallback(new FileError(error));
            }
        };
        // sanity check for 'not:valid:filename' or '/not:valid:filename'
        // file.spec.12 window.resolveLocalFileSystemURI should error (ENCODING_ERR) when resolving invalid URI with leading /.
        if(!uri || uri.split(":").length > 2) {
            setTimeout( function() {
                fail(FileError.ENCODING_ERR);
            },0);
            return;
        }
        // if successful, return either a file or directory entry
        var success = function(entry) {
            if (entry) {
                if (successCallback) {
                    // create appropriate Entry object
                    var fsName = entry.filesystemName || (entry.filesystem && entry.filesystem.name) || (entry.filesystem == window.PERSISTENT ? 'persistent' : 'temporary');
                    fileSystems.getFs(fsName, function(fs) {
                        // This should happen only on platforms that haven't implemented requestAllFileSystems (windows)
                        if (!fs) {
                            fs = new FileSystem(fsName, {name:"", fullPath:"/"});
                        }
                        var result = (entry.isDirectory) ? new DirectoryEntry(entry.name, entry.fullPath, fs, entry.nativeURL) : new FileEntry(entry.name, entry.fullPath, fs, entry.nativeURL);
                        successCallback(result);
                    });
                }
            }
            else {
                // no Entry object returned
                fail(FileError.NOT_FOUND_ERR);
            }
        };

        exec(success, fail, "File", "resolveLocalFileSystemURI", [uri]);
    };

    module.exports.resolveLocalFileSystemURI = function() {
        console.log("resolveLocalFileSystemURI is deprecated. Please call resolveLocalFileSystemURL instead.");
        module.exports.resolveLocalFileSystemURL.apply(this, arguments);
    };
})();

},{"cordova-plugin-file.DirectoryEntry":"cordova-plugin-file.DirectoryEntry","cordova-plugin-file.FileEntry":"cordova-plugin-file.FileEntry","cordova-plugin-file.FileError":"cordova-plugin-file.FileError","cordova-plugin-file.fileSystems":"cordova-plugin-file.fileSystems","cordova-plugin-file.isChrome":"cordova-plugin-file.isChrome","cordova/argscheck":"cordova/argscheck","cordova/exec":"cordova/exec"}],"cordova-plugin-geolocation.PositionError":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * Position error object
 *
 * @constructor
 * @param code
 * @param message
 */
var PositionError = function(code, message) {
    this.code = code || null;
    this.message = message || '';
};

PositionError.prototype.PERMISSION_DENIED = PositionError.PERMISSION_DENIED = 1;
PositionError.prototype.POSITION_UNAVAILABLE = PositionError.POSITION_UNAVAILABLE = 2;
PositionError.prototype.TIMEOUT = PositionError.TIMEOUT = 3;

module.exports = PositionError;

},{}],"cordova-plugin-geolocation.geolocation":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var exec = cordova.require('cordova/exec');
var utils = require('cordova/utils');
var PositionError = require('cordova-plugin-geolocation.PositionError');

// Native watchPosition method is called async after permissions prompt.
// So we use additional map and own ids to return watch id synchronously.
var pluginToNativeWatchMap = {};

module.exports = {
    getCurrentPosition: function(success, error, args) {
        var win = function() {
          var geo = cordova.require('cordova/modulemapper').getOriginalSymbol(window, 'navigator.geolocation');
          geo.getCurrentPosition(success, error, args);
        };
        var fail = function() {
            if (error) {
                error(new PositionError (PositionError.PERMISSION_DENIED, 'Illegal Access'));
            }
        };
        exec(win, fail, "Geolocation", "getPermission", []);
    },

    watchPosition: function(success, error, args) {
        var pluginWatchId = utils.createUUID();

        var win = function() {
            var geo = cordova.require('cordova/modulemapper').getOriginalSymbol(window, 'navigator.geolocation');
            pluginToNativeWatchMap[pluginWatchId] = geo.watchPosition(success, error, args);
        };

        var fail = function() {
            if (error) {
                error(new PositionError(PositionError.PERMISSION_DENIED, 'Illegal Access'));
            }
        };
        exec(win, fail, "Geolocation", "getPermission", []);

        return pluginWatchId;
    },

    clearWatch: function(pluginWatchId) {
        var win = function() {
            var nativeWatchId = pluginToNativeWatchMap[pluginWatchId];
            var geo = cordova.require('cordova/modulemapper').getOriginalSymbol(window, 'navigator.geolocation');
            geo.clearWatch(nativeWatchId);
        };

        exec(win, null, "Geolocation", "getPermission", []);
    }
};

},{"cordova-plugin-geolocation.PositionError":"cordova-plugin-geolocation.PositionError","cordova/utils":"cordova/utils"}],"cordova-plugin-image-picker.ImagePicker":[function(require,module,exports){
/*global cordova,window,console*/
/**
 * An Image Picker plugin for Cordova
 *
 * Developed by Wymsee for Sync OnSet
 */

var ImagePicker = function() {

};

/*
*	success - success callback
*	fail - error callback
*	options
*		.maximumImagesCount - max images to be selected, defaults to 15. If this is set to 1,
*		                      upon selection of a single image, the plugin will return it.
*		.width - width to resize image to (if one of height/width is 0, will resize to fit the
*		         other while keeping aspect ratio, if both height and width are 0, the full size
*		         image will be returned)
*		.height - height to resize image to
*		.quality - quality of resized image, defaults to 100
*/
ImagePicker.prototype.getPictures = function(success, fail, options) {
	if (!options) {
		options = {};
	}

	var params = {
		maximumImagesCount: options.maximumImagesCount ? options.maximumImagesCount : 15,
		width: options.width ? options.width : 0,
		height: options.height ? options.height : 0,
		quality: options.quality ? options.quality : 100
	};

	return cordova.exec(success, fail, "ImagePicker", "getPictures", [params]);
};

window.imagePicker = new ImagePicker();

},{}],"cordova-plugin-inappbrowser.inappbrowser":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

(function() {
    // special patch to correctly work on Ripple emulator (CB-9760)
    if (window.parent && !!window.parent.ripple) { // https://gist.github.com/triceam/4658021
        module.exports = window.open.bind(window); // fallback to default window.open behaviour
        return;
    }

    var exec = require('cordova/exec');
    var channel = require('cordova/channel');
    var modulemapper = require('cordova/modulemapper');
    var urlutil = require('cordova/urlutil');

    function InAppBrowser() {
       this.channels = {
            'loadstart': channel.create('loadstart'),
            'loadstop' : channel.create('loadstop'),
            'loaderror' : channel.create('loaderror'),
            'exit' : channel.create('exit')
       };
    }

    InAppBrowser.prototype = {
        _eventHandler: function (event) {
            if (event && (event.type in this.channels)) {
                this.channels[event.type].fire(event);
            }
        },
        close: function (eventname) {
            exec(null, null, "InAppBrowser", "close", []);
        },
        show: function (eventname) {
            exec(null, null, "InAppBrowser", "show", []);
        },
        hide: function (eventname) {
            exec(null, null, "InAppBrowser", "hide", []);
        },
        addEventListener: function (eventname,f) {
            if (eventname in this.channels) {
                this.channels[eventname].subscribe(f);
            }
        },
        removeEventListener: function(eventname, f) {
            if (eventname in this.channels) {
                this.channels[eventname].unsubscribe(f);
            }
        },

        executeScript: function(injectDetails, cb) {
            if (injectDetails.code) {
                exec(cb, null, "InAppBrowser", "injectScriptCode", [injectDetails.code, !!cb]);
            } else if (injectDetails.file) {
                exec(cb, null, "InAppBrowser", "injectScriptFile", [injectDetails.file, !!cb]);
            } else {
                throw new Error('executeScript requires exactly one of code or file to be specified');
            }
        },

        insertCSS: function(injectDetails, cb) {
            if (injectDetails.code) {
                exec(cb, null, "InAppBrowser", "injectStyleCode", [injectDetails.code, !!cb]);
            } else if (injectDetails.file) {
                exec(cb, null, "InAppBrowser", "injectStyleFile", [injectDetails.file, !!cb]);
            } else {
                throw new Error('insertCSS requires exactly one of code or file to be specified');
            }
        }
    };

    module.exports = function(strUrl, strWindowName, strWindowFeatures, callbacks) {
        // Don't catch calls that write to existing frames (e.g. named iframes).
        if (window.frames && window.frames[strWindowName]) {
            var origOpenFunc = modulemapper.getOriginalSymbol(window, 'open');
            return origOpenFunc.apply(window, arguments);
        }

        strUrl = urlutil.makeAbsolute(strUrl);
        var iab = new InAppBrowser();

        callbacks = callbacks || {};
        for (var callbackName in callbacks) {
            iab.addEventListener(callbackName, callbacks[callbackName]);
        }

        var cb = function(eventname) {
           iab._eventHandler(eventname);
        };

        strWindowFeatures = strWindowFeatures || "";

        exec(cb, cb, "InAppBrowser", "open", [strUrl, strWindowName, strWindowFeatures]);
        return iab;
    };
})();

},{"cordova/channel":"cordova/channel","cordova/exec":"cordova/exec","cordova/modulemapper":"cordova/modulemapper","cordova/urlutil":"cordova/urlutil"}],"cordova-plugin-media-capture.CaptureAudioOptions":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * Encapsulates all audio capture operation configuration options.
 */
var CaptureAudioOptions = function(){
    // Upper limit of sound clips user can record. Value must be equal or greater than 1.
    this.limit = 1;
    // Maximum duration of a single sound clip in seconds.
    this.duration = 0;
};

module.exports = CaptureAudioOptions;

},{}],"cordova-plugin-media-capture.CaptureError":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * The CaptureError interface encapsulates all errors in the Capture API.
 */
var CaptureError = function(c) {
   this.code = c || null;
};

// Camera or microphone failed to capture image or sound.
CaptureError.CAPTURE_INTERNAL_ERR = 0;
// Camera application or audio capture application is currently serving other capture request.
CaptureError.CAPTURE_APPLICATION_BUSY = 1;
// Invalid use of the API (e.g. limit parameter has value less than one).
CaptureError.CAPTURE_INVALID_ARGUMENT = 2;
// User exited camera application or audio capture application before capturing anything.
CaptureError.CAPTURE_NO_MEDIA_FILES = 3;
// User denied permissions required to perform the capture request.
CaptureError.CAPTURE_PERMISSION_DENIED = 4;
// The requested capture operation is not supported.
CaptureError.CAPTURE_NOT_SUPPORTED = 20;

module.exports = CaptureError;

},{}],"cordova-plugin-media-capture.CaptureImageOptions":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * Encapsulates all image capture operation configuration options.
 */
var CaptureImageOptions = function(){
    // Upper limit of images user can take. Value must be equal or greater than 1.
    this.limit = 1;
};

module.exports = CaptureImageOptions;

},{}],"cordova-plugin-media-capture.CaptureVideoOptions":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * Encapsulates all video capture operation configuration options.
 */
var CaptureVideoOptions = function(){
    // Upper limit of videos user can record. Value must be equal or greater than 1.
    this.limit = 1;
    // Maximum duration of a single video clip in seconds.
    this.duration = 0;
    // Video quality parameter, 0 means low quality, suitable for MMS messages, and value 1 means high quality.
    this.quality = 1;
};

module.exports = CaptureVideoOptions;

},{}],"cordova-plugin-media-capture.MediaFileData":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * MediaFileData encapsulates format information of a media file.
 *
 * @param {DOMString} codecs
 * @param {long} bitrate
 * @param {long} height
 * @param {long} width
 * @param {float} duration
 */
var MediaFileData = function(codecs, bitrate, height, width, duration){
    this.codecs = codecs || null;
    this.bitrate = bitrate || 0;
    this.height = height || 0;
    this.width = width || 0;
    this.duration = duration || 0;
};

module.exports = MediaFileData;

},{}],"cordova-plugin-media-capture.MediaFile":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var utils = require('cordova/utils'),
    exec = require('cordova/exec'),
    File = require('cordova-plugin-file.File'),
    CaptureError = require('cordova-plugin-media-capture.CaptureError');
/**
 * Represents a single file.
 *
 * name {DOMString} name of the file, without path information
 * fullPath {DOMString} the full path of the file, including the name
 * type {DOMString} mime type
 * lastModifiedDate {Date} last modified date
 * size {Number} size of the file in bytes
 */
var MediaFile = function(name, localURL, type, lastModifiedDate, size){
    MediaFile.__super__.constructor.apply(this, arguments);
};

utils.extend(MediaFile, File);

/**
 * Request capture format data for a specific file and type
 *
 * @param {Function} successCB
 * @param {Function} errorCB
 */
MediaFile.prototype.getFormatData = function(successCallback, errorCallback) {
    if (typeof this.fullPath === "undefined" || this.fullPath === null) {
        errorCallback(new CaptureError(CaptureError.CAPTURE_INVALID_ARGUMENT));
    } else {
        exec(successCallback, errorCallback, "Capture", "getFormatData", [this.fullPath, this.type]);
    }
};

module.exports = MediaFile;

},{"cordova-plugin-file.File":"cordova-plugin-file.File","cordova-plugin-media-capture.CaptureError":"cordova-plugin-media-capture.CaptureError","cordova/exec":"cordova/exec","cordova/utils":"cordova/utils"}],"cordova-plugin-media-capture.capture":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var exec = require('cordova/exec'),
    helpers = require('cordova-plugin-media-capture.helpers');

/**
 * Launches a capture of different types.
 *
 * @param (DOMString} type
 * @param {Function} successCB
 * @param {Function} errorCB
 * @param {CaptureVideoOptions} options
 */
function _capture(type, successCallback, errorCallback, options) {
    var win = function(pluginResult) {
        successCallback(helpers.wrapMediaFiles(pluginResult));
    };
    exec(win, errorCallback, "Capture", type, [options]);
}


/**
 * The Capture interface exposes an interface to the camera and microphone of the hosting device.
 */
function Capture() {
    this.supportedAudioModes = [];
    this.supportedImageModes = [];
    this.supportedVideoModes = [];
}

/**
 * Launch audio recorder application for recording audio clip(s).
 *
 * @param {Function} successCB
 * @param {Function} errorCB
 * @param {CaptureAudioOptions} options
 */
Capture.prototype.captureAudio = function(successCallback, errorCallback, options){
    _capture("captureAudio", successCallback, errorCallback, options);
};

/**
 * Launch camera application for taking image(s).
 *
 * @param {Function} successCB
 * @param {Function} errorCB
 * @param {CaptureImageOptions} options
 */
Capture.prototype.captureImage = function(successCallback, errorCallback, options){
    _capture("captureImage", successCallback, errorCallback, options);
};

/**
 * Launch device camera application for recording video(s).
 *
 * @param {Function} successCB
 * @param {Function} errorCB
 * @param {CaptureVideoOptions} options
 */
Capture.prototype.captureVideo = function(successCallback, errorCallback, options){
    _capture("captureVideo", successCallback, errorCallback, options);
};


module.exports = new Capture();

},{"cordova-plugin-media-capture.helpers":"cordova-plugin-media-capture.helpers","cordova/exec":"cordova/exec"}],"cordova-plugin-media-capture.helpers":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var MediaFile = require('cordova-plugin-media-capture.MediaFile');

function wrapMediaFiles(pluginResult) {
    var mediaFiles = [];
    var i;
    for (i = 0; i < pluginResult.length; i++) {
        var mediaFile = new MediaFile();
        mediaFile.name = pluginResult[i].name;

        // Backwards compatibility
        mediaFile.localURL = pluginResult[i].localURL || pluginResult[i].fullPath;
        mediaFile.fullPath = pluginResult[i].fullPath;
        mediaFile.type = pluginResult[i].type;
        mediaFile.lastModifiedDate = pluginResult[i].lastModifiedDate;
        mediaFile.size = pluginResult[i].size;
        mediaFiles.push(mediaFile);
    }
    return mediaFiles;
}

module.exports = {
    wrapMediaFiles: wrapMediaFiles
};
},{"cordova-plugin-media-capture.MediaFile":"cordova-plugin-media-capture.MediaFile"}],"cordova-plugin-media-capture.init":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var cordova = require('cordova'),
    helpers = require('cordova-plugin-media-capture.helpers');

var SUCCESS_EVENT = "pendingcaptureresult";
var FAILURE_EVENT = "pendingcaptureerror";

var sChannel = cordova.addStickyDocumentEventHandler(SUCCESS_EVENT);
var fChannel = cordova.addStickyDocumentEventHandler(FAILURE_EVENT);

// We fire one of two events in the case where the activity gets killed while
// the user is capturing audio, image, video, etc. in a separate activity
document.addEventListener("deviceready", function() {
    document.addEventListener("resume", function(event) {
        if (event.pendingResult && event.pendingResult.pluginServiceName === "Capture") {
            if (event.pendingResult.pluginStatus === "OK") {
                var mediaFiles = helpers.wrapMediaFiles(event.pendingResult.result);
                sChannel.fire(mediaFiles);
            } else {
                fChannel.fire(event.pendingResult.result);
            }
        }
    });
});

},{"cordova":"cordova","cordova-plugin-media-capture.helpers":"cordova-plugin-media-capture.helpers"}],"cordova-plugin-media.MediaError":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * This class contains information about any Media errors.
*/
/*
 According to :: http://dev.w3.org/html5/spec-author-view/video.html#mediaerror
 We should never be creating these objects, we should just implement the interface
 which has 1 property for an instance, 'code'

 instead of doing :
    errorCallbackFunction( new MediaError(3,'msg') );
we should simply use a literal :
    errorCallbackFunction( {'code':3} );
 */

 var _MediaError = window.MediaError;


if(!_MediaError) {
    window.MediaError = _MediaError = function(code, msg) {
        this.code = (typeof code != 'undefined') ? code : null;
        this.message = msg || ""; // message is NON-standard! do not use!
    };
}

_MediaError.MEDIA_ERR_NONE_ACTIVE    = _MediaError.MEDIA_ERR_NONE_ACTIVE    || 0;
_MediaError.MEDIA_ERR_ABORTED        = _MediaError.MEDIA_ERR_ABORTED        || 1;
_MediaError.MEDIA_ERR_NETWORK        = _MediaError.MEDIA_ERR_NETWORK        || 2;
_MediaError.MEDIA_ERR_DECODE         = _MediaError.MEDIA_ERR_DECODE         || 3;
_MediaError.MEDIA_ERR_NONE_SUPPORTED = _MediaError.MEDIA_ERR_NONE_SUPPORTED || 4;
// TODO: MediaError.MEDIA_ERR_NONE_SUPPORTED is legacy, the W3 spec now defines it as below.
// as defined by http://dev.w3.org/html5/spec-author-view/video.html#error-codes
_MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED = _MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED || 4;

module.exports = _MediaError;

},{}],"cordova-plugin-media.Media":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var argscheck = require('cordova/argscheck'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec');

var mediaObjects = {};

/**
 * This class provides access to the device media, interfaces to both sound and video
 *
 * @constructor
 * @param src                   The file name or url to play
 * @param successCallback       The callback to be called when the file is done playing or recording.
 *                                  successCallback()
 * @param errorCallback         The callback to be called if there is an error.
 *                                  errorCallback(int errorCode) - OPTIONAL
 * @param statusCallback        The callback to be called when media status has changed.
 *                                  statusCallback(int statusCode) - OPTIONAL
 */
var Media = function(src, successCallback, errorCallback, statusCallback) {
    argscheck.checkArgs('sFFF', 'Media', arguments);
    this.id = utils.createUUID();
    mediaObjects[this.id] = this;
    this.src = src;
    this.successCallback = successCallback;
    this.errorCallback = errorCallback;
    this.statusCallback = statusCallback;
    this._duration = -1;
    this._position = -1;
    exec(null, this.errorCallback, "Media", "create", [this.id, this.src]);
};

// Media messages
Media.MEDIA_STATE = 1;
Media.MEDIA_DURATION = 2;
Media.MEDIA_POSITION = 3;
Media.MEDIA_ERROR = 9;

// Media states
Media.MEDIA_NONE = 0;
Media.MEDIA_STARTING = 1;
Media.MEDIA_RUNNING = 2;
Media.MEDIA_PAUSED = 3;
Media.MEDIA_STOPPED = 4;
Media.MEDIA_MSG = ["None", "Starting", "Running", "Paused", "Stopped"];

// "static" function to return existing objs.
Media.get = function(id) {
    return mediaObjects[id];
};

/**
 * Start or resume playing audio file.
 */
Media.prototype.play = function(options) {
    exec(null, null, "Media", "startPlayingAudio", [this.id, this.src, options]);
};

/**
 * Stop playing audio file.
 */
Media.prototype.stop = function() {
    var me = this;
    exec(function() {
        me._position = 0;
    }, this.errorCallback, "Media", "stopPlayingAudio", [this.id]);
};

/**
 * Seek or jump to a new time in the track..
 */
Media.prototype.seekTo = function(milliseconds) {
    var me = this;
    exec(function(p) {
        me._position = p;
    }, this.errorCallback, "Media", "seekToAudio", [this.id, milliseconds]);
};

/**
 * Pause playing audio file.
 */
Media.prototype.pause = function() {
    exec(null, this.errorCallback, "Media", "pausePlayingAudio", [this.id]);
};

/**
 * Get duration of an audio file.
 * The duration is only set for audio that is playing, paused or stopped.
 *
 * @return      duration or -1 if not known.
 */
Media.prototype.getDuration = function() {
    return this._duration;
};

/**
 * Get position of audio.
 */
Media.prototype.getCurrentPosition = function(success, fail) {
    var me = this;
    exec(function(p) {
        me._position = p;
        success(p);
    }, fail, "Media", "getCurrentPositionAudio", [this.id]);
};

/**
 * Start recording audio file.
 */
Media.prototype.startRecord = function() {
    exec(null, this.errorCallback, "Media", "startRecordingAudio", [this.id, this.src]);
};

/**
 * Stop recording audio file.
 */
Media.prototype.stopRecord = function() {
    exec(null, this.errorCallback, "Media", "stopRecordingAudio", [this.id]);
};

/**
 * Pause recording audio file.
 */
Media.prototype.pauseRecord = function() {
    exec(null, this.errorCallback, "Media", "pauseRecordingAudio", [this.id]);
};

/**
* Resume recording audio file.
*/
Media.prototype.resumeRecord = function() {
    exec(null, this.errorCallback, "Media", "resumeRecordingAudio", [this.id]);
};

/**
 * Release the resources.
 */
Media.prototype.release = function() {
    exec(null, this.errorCallback, "Media", "release", [this.id]);
};

/**
 * Adjust the volume.
 */
Media.prototype.setVolume = function(volume) {
    exec(null, null, "Media", "setVolume", [this.id, volume]);
};

/**
 * Adjust the playback rate.
 */
Media.prototype.setRate = function(rate) {
    if (cordova.platformId === 'ios'){
        exec(null, null, "Media", "setRate", [this.id, rate]);
    } else {
        console.warn('media.setRate method is currently not supported for', cordova.platformId, 'platform.');
    }
};

/**
 * Get amplitude of audio.
 */
Media.prototype.getCurrentAmplitude = function(success, fail) {
    exec(function(p) {
        success(p);
    }, fail, "Media", "getCurrentAmplitudeAudio", [this.id]);
};

/**
 * Audio has status update.
 * PRIVATE
 *
 * @param id            The media object id (string)
 * @param msgType       The 'type' of update this is
 * @param value         Use of value is determined by the msgType
 */
Media.onStatus = function(id, msgType, value) {

    var media = mediaObjects[id];

    if (media) {
        switch(msgType) {
            case Media.MEDIA_STATE :
                if (media.statusCallback) {
                    media.statusCallback(value);
                }
                if (value == Media.MEDIA_STOPPED) {
                    if (media.successCallback) {
                        media.successCallback();
                    }
                }
                break;
            case Media.MEDIA_DURATION :
                media._duration = value;
                break;
            case Media.MEDIA_ERROR :
                if (media.errorCallback) {
                    media.errorCallback(value);
                }
                break;
            case Media.MEDIA_POSITION :
                media._position = Number(value);
                break;
            default :
                if (console.error) {
                    console.error("Unhandled Media.onStatus :: " + msgType);
                }
                break;
        }
    } else if (console.error) {
        console.error("Received Media.onStatus callback for unknown media :: " + id);
    }

};

module.exports = Media;

function onMessageFromNative(msg) {
    if (msg.action == 'status') {
        Media.onStatus(msg.status.id, msg.status.msgType, msg.status.value);
    } else {
        throw new Error('Unknown media action' + msg.action);
    }
}

if (cordova.platformId === 'android' || cordova.platformId === 'amazon-fireos' || cordova.platformId === 'windowsphone') {

    var channel = require('cordova/channel');

    channel.createSticky('onMediaPluginReady');
    channel.waitForInitialization('onMediaPluginReady');

    channel.onCordovaReady.subscribe(function() {
        exec(onMessageFromNative, undefined, 'Media', 'messageChannel', []);
        channel.initializationComplete('onMediaPluginReady');
    });
}

},{"cordova/argscheck":"cordova/argscheck","cordova/channel":"cordova/channel","cordova/exec":"cordova/exec","cordova/utils":"cordova/utils"}],"cordova-plugin-network-information.Connection":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * Network status
 */
module.exports = {
        UNKNOWN: "unknown",
        ETHERNET: "ethernet",
        WIFI: "wifi",
        CELL_2G: "2g",
        CELL_3G: "3g",
        CELL_4G: "4g",
        CELL:"cellular",
        NONE: "none"
};

},{}],"cordova-plugin-network-information.network":[function(require,module,exports){
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var exec = require('cordova/exec'),
    cordova = require('cordova'),
    channel = require('cordova/channel'),
    utils = require('cordova/utils');

// Link the onLine property with the Cordova-supplied network info.
// This works because we clobber the navigator object with our own
// object in bootstrap.js.
// Browser platform do not need to define this property, because
// it is already supported by modern browsers
if (cordova.platformId !== 'browser' && typeof navigator != 'undefined') {
    utils.defineGetter(navigator, 'onLine', function() {
        return this.connection.type != 'none';
    });
}

function NetworkConnection() {
    this.type = 'unknown';
}

/**
 * Get connection info
 *
 * @param {Function} successCallback The function to call when the Connection data is available
 * @param {Function} errorCallback The function to call when there is an error getting the Connection data. (OPTIONAL)
 */
NetworkConnection.prototype.getInfo = function(successCallback, errorCallback) {
    exec(successCallback, errorCallback, "NetworkStatus", "getConnectionInfo", []);
};

var me = new NetworkConnection();
var timerId = null;
var timeout = 500;

channel.createSticky('onCordovaConnectionReady');
channel.waitForInitialization('onCordovaConnectionReady');

channel.onCordovaReady.subscribe(function() {
    me.getInfo(function(info) {
        me.type = info;
        if (info === "none") {
            // set a timer if still offline at the end of timer send the offline event
            timerId = setTimeout(function(){
                cordova.fireDocumentEvent("offline");
                timerId = null;
            }, timeout);
        } else {
            // If there is a current offline event pending clear it
            if (timerId !== null) {
                clearTimeout(timerId);
                timerId = null;
            }
            cordova.fireDocumentEvent("online");
        }

        // should only fire this once
        if (channel.onCordovaConnectionReady.state !== 2) {
            channel.onCordovaConnectionReady.fire();
        }
    },
    function (e) {
        // If we can't get the network info we should still tell Cordova
        // to fire the deviceready event.
        if (channel.onCordovaConnectionReady.state !== 2) {
            channel.onCordovaConnectionReady.fire();
        }
        console.log("Error initializing Network Connection: " + e);
    });
});

module.exports = me;

},{"cordova":"cordova","cordova/channel":"cordova/channel","cordova/exec":"cordova/exec","cordova/utils":"cordova/utils"}],"cordova-plugin-touch-id.TouchID":[function(require,module,exports){
function TouchID() {
}

TouchID.prototype.isAvailable = function (successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "TouchID", "isAvailable", []);
};

TouchID.prototype.didFingerprintDatabaseChange = function (successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "TouchID", "didFingerprintDatabaseChange", []);
};

TouchID.prototype.verifyFingerprint = function (message, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "TouchID", "verifyFingerprint", [message]);
};

TouchID.prototype.verifyFingerprintWithCustomPasswordFallback = function (message, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "TouchID", "verifyFingerprintWithCustomPasswordFallback", [message]);
};

TouchID.prototype.verifyFingerprintWithCustomPasswordFallbackAndEnterPasswordLabel = function (message, enterPasswordLabel, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, "TouchID", "verifyFingerprintWithCustomPasswordFallbackAndEnterPasswordLabel", [message, enterPasswordLabel]);
};

TouchID.install = function () {
  if (!window.plugins) {
    window.plugins = {};
  }

  window.plugins.touchid = new TouchID();
  return window.plugins.touchid;
};

cordova.addConstructor(TouchID.install);
},{}],"cordova-plugin-wechat.Wechat":[function(require,module,exports){
var exec = require('cordova/exec');

module.exports = {
    Scene: {
        SESSION:  0, // 聊天界面
        TIMELINE: 1, // 朋友圈
        FAVORITE: 2  // 收藏
    },

    Type: {
        APP:     1,
        EMOTION: 2,
        FILE:    3,
        IMAGE:   4,
        MUSIC:   5,
        VIDEO:   6,
        WEBPAGE: 7
    },

    isInstalled: function (onSuccess, onError) {
        exec(onSuccess, onError, "Wechat", "isWXAppInstalled", []);
    },

    /**
     * Share a message to wechat app
     *
     * @example
     * <code>
     * Wechat.share({
     *     message: {
     *        title: "Message Title",
     *        description: "Message Description(optional)",
     *        mediaTagName: "Media Tag Name(optional)",
     *        thumb: "http://YOUR_THUMBNAIL_IMAGE",
     *        media: {
     *            type: Wechat.Type.WEBPAGE,   // webpage
     *            webpageUrl: "https://github.com/xu-li/cordova-plugin-wechat"    // webpage
     *        }
     *    },
     *    scene: Wechat.Scene.TIMELINE   // share to Timeline
     * }, function () {
     *     alert("Success");
     * }, function (reason) {
     *     alert("Failed: " + reason);
     * });
     * </code>
     */
    share: function (message, onSuccess, onError) {
        exec(onSuccess, onError, "Wechat", "share", [message]);
    },

    /**
     * Sending an auth request to Wechat
     *
     * @example
     * <code>
     * Wechat.auth(function (response) { alert(response.code); });
     * </code>
     */
    auth: function (scope, state, onSuccess, onError) {
        if (typeof scope == "function") {
            // Wechat.auth(function () { alert("Success"); });
            // Wechat.auth(function () { alert("Success"); }, function (error) { alert(error); });
            return exec(scope, state, "Wechat", "sendAuthRequest");
        }

        if (typeof state == "function") {
            // Wechat.auth("snsapi_userinfo", function () { alert("Success"); });
            // Wechat.auth("snsapi_userinfo", function () { alert("Success"); }, function (error) { alert(error); });
            return exec(state, onSuccess, "Wechat", "sendAuthRequest", [scope]);
        }

        return exec(onSuccess, onError, "Wechat", "sendAuthRequest", [scope, state]);
    },

    /**
     * Send a payment request
     *
     * @link https://pay.weixin.qq.com/wiki/doc/api/app.php?chapter=9_1
     * @example
     * <code>
     * var params = {
     *     mch_id: '10000100', // merchant id
     *     prepay_id: 'wx201411101639507cbf6ffd8b0779950874', // prepay id returned from server
     *     nonce: '1add1a30ac87aa2db72f57a2375d8fec', // nonce string returned from server
     *     timestamp: '1439531364', // timestamp
     *     sign: '0CB01533B8C1EF103065174F50BCA001', // signed string
     * };
     * Wechat.sendPaymentRequest(params, function () {
     *     alert("Success");
     * }, function (reason) {
     *     alert("Failed: " + reason);
     * });
     * </code>
     */
    sendPaymentRequest: function (params, onSuccess, onError) {
        exec(onSuccess, onError, "Wechat", "sendPaymentRequest", [params]);
    },

    /**
     * jumpToBizProfile （跳转到某个微信公众号）2016-11-11 测试是失效的，囧
     *
     * @link https://segmentfault.com/a/1190000007204624
     * @link https://segmentfault.com/q/1010000003907796
     * @example
     * <code>
     * var params = {
     *     info: 'gh_xxxxxxx', // 公众帐号原始ID
     *     type:  'Normal' // 普通号
     * }
     * or
     * var params = {
     *     info: 'extMsg', // 相关的硬件二维码串
     *     type:  'Device' // 硬件号
     * };
     * Wechat.jumpToBizProfile(params, function () {
     *     alert("Success");
     * }, function (reason) {
     *     alert("Failed: " + reason);
     * });
     * </code>
     */

    jumpToBizProfile: function (params, onSuccess, onError) {
        exec(onSuccess, onError, "Wechat", "jumpToBizProfile", [params]);
    },

    /**
     * jumpToWechat （因为jumpToBizProfile失效了，暂时新增了一个临时的api)
     *
     * @link https://segmentfault.com/a/1190000007204624
     * @example
     * <code>
     * var url = "wechat://" 现阶段貌似只支持这一个协议了
     * Wechat.jumpToWechat(url, function () {
     *     alert("Success");
     * }, function (reason) {
     *     alert("Failed: " + reason);
     * });
     * </code>
     */
    jumpToWechat: function (url, onSuccess, onError) {
        exec(onSuccess, onError, "Wechat", "jumpToWechat", [url]);
    }
};

},{"cordova/exec":"cordova/exec"}],"cordova-plugin-zip.Zip":[function(require,module,exports){
var exec = cordova.require('cordova/exec');

function newProgressEvent(result) {
    var event = {
            loaded: result.loaded,
            total: result.total
    };
    return event;
}

exports.unzip = function(fileName, outputDirectory, callback, progressCallback) {
    var win = function(result) {
        if (result && typeof result.loaded != "undefined") {
            if (progressCallback) {
                return progressCallback(newProgressEvent(result));
            }
        } else if (callback) {
            callback(0);
        }
    };
    var fail = function(result) {
        if (callback) {
            callback(-1);
        }
    };
    exec(win, fail, 'Zip', 'unzip', [fileName, outputDirectory]);
};
},{}],"cordova-sqlite-storage.SQLitePlugin":[function(require,module,exports){
(function() {
  var DB_STATE_INIT, DB_STATE_OPEN, READ_ONLY_REGEX, SQLiteFactory, SQLitePlugin, SQLitePluginTransaction, SelfTest, argsArray, dblocations, iosLocationMap, newSQLError, nextTick, root, txLocks;

  root = this;

  READ_ONLY_REGEX = /^(\s|;)*(?:alter|create|delete|drop|insert|reindex|replace|update)/i;

  DB_STATE_INIT = "INIT";

  DB_STATE_OPEN = "OPEN";

  txLocks = {};

  newSQLError = function(error, code) {
    var sqlError;
    sqlError = error;
    if (!code) {
      code = 0;
    }
    if (!sqlError) {
      sqlError = new Error("a plugin had an error but provided no response");
      sqlError.code = code;
    }
    if (typeof sqlError === "string") {
      sqlError = new Error(error);
      sqlError.code = code;
    }
    if (!sqlError.code && sqlError.message) {
      sqlError.code = code;
    }
    if (!sqlError.code && !sqlError.message) {
      sqlError = new Error("an unknown error was returned: " + JSON.stringify(sqlError));
      sqlError.code = code;
    }
    return sqlError;
  };

  nextTick = window.setImmediate || function(fun) {
    window.setTimeout(fun, 0);
  };


  /*
    Utility that avoids leaking the arguments object. See
    https://www.npmjs.org/package/argsarray
   */

  argsArray = function(fun) {
    return function() {
      var args, i, len;
      len = arguments.length;
      if (len) {
        args = [];
        i = -1;
        while (++i < len) {
          args[i] = arguments[i];
        }
        return fun.call(this, args);
      } else {
        return fun.call(this, []);
      }
    };
  };

  SQLitePlugin = function(openargs, openSuccess, openError) {
    var dbname;
    if (!(openargs && openargs['name'])) {
      throw newSQLError("Cannot create a SQLitePlugin db instance without a db name");
    }
    dbname = openargs.name;
    if (typeof dbname !== 'string') {
      throw newSQLError('sqlite plugin database name must be a string');
    }
    this.openargs = openargs;
    this.dbname = dbname;
    this.openSuccess = openSuccess;
    this.openError = openError;
    this.openSuccess || (this.openSuccess = function() {
      console.log("DB opened: " + dbname);
    });
    this.openError || (this.openError = function(e) {
      console.log(e.message);
    });
    this.open(this.openSuccess, this.openError);
  };

  SQLitePlugin.prototype.databaseFeatures = {
    isSQLitePluginDatabase: true
  };

  SQLitePlugin.prototype.openDBs = {};

  SQLitePlugin.prototype.addTransaction = function(t) {
    if (!txLocks[this.dbname]) {
      txLocks[this.dbname] = {
        queue: [],
        inProgress: false
      };
    }
    txLocks[this.dbname].queue.push(t);
    if (this.dbname in this.openDBs && this.openDBs[this.dbname] !== DB_STATE_INIT) {
      this.startNextTransaction();
    } else {
      if (this.dbname in this.openDBs) {
        console.log('new transaction is waiting for open operation');
      } else {
        console.log('database is closed, new transaction is [stuck] waiting until db is opened again!');
      }
    }
  };

  SQLitePlugin.prototype.transaction = function(fn, error, success) {
    if (!this.openDBs[this.dbname]) {
      error(newSQLError('database not open'));
      return;
    }
    this.addTransaction(new SQLitePluginTransaction(this, fn, error, success, true, false));
  };

  SQLitePlugin.prototype.readTransaction = function(fn, error, success) {
    if (!this.openDBs[this.dbname]) {
      error(newSQLError('database not open'));
      return;
    }
    this.addTransaction(new SQLitePluginTransaction(this, fn, error, success, false, true));
  };

  SQLitePlugin.prototype.startNextTransaction = function() {
    var self;
    self = this;
    nextTick((function(_this) {
      return function() {
        var txLock;
        if (!(_this.dbname in _this.openDBs) || _this.openDBs[_this.dbname] !== DB_STATE_OPEN) {
          console.log('cannot start next transaction: database not open');
          return;
        }
        txLock = txLocks[self.dbname];
        if (!txLock) {
          console.log('cannot start next transaction: database connection is lost');
          return;
        } else if (txLock.queue.length > 0 && !txLock.inProgress) {
          txLock.inProgress = true;
          txLock.queue.shift().start();
        }
      };
    })(this));
  };

  SQLitePlugin.prototype.abortAllPendingTransactions = function() {
    var j, len1, ref, tx, txLock;
    txLock = txLocks[this.dbname];
    if (!!txLock && txLock.queue.length > 0) {
      ref = txLock.queue;
      for (j = 0, len1 = ref.length; j < len1; j++) {
        tx = ref[j];
        tx.abortFromQ(newSQLError('Invalid database handle'));
      }
      txLock.queue = [];
      txLock.inProgress = false;
    }
  };

  SQLitePlugin.prototype.open = function(success, error) {
    var myfn, openerrorcb, opensuccesscb;
    if (this.dbname in this.openDBs) {
      console.log('database already open: ' + this.dbname);
      nextTick((function(_this) {
        return function() {
          success(_this);
        };
      })(this));
    } else {
      console.log('OPEN database: ' + this.dbname);
      opensuccesscb = (function(_this) {
        return function() {
          var txLock;
          console.log('OPEN database: ' + _this.dbname + ' - OK');
          if (!_this.openDBs[_this.dbname]) {
            console.log('database was closed during open operation');
          }
          if (_this.dbname in _this.openDBs) {
            _this.openDBs[_this.dbname] = DB_STATE_OPEN;
          }
          if (!!success) {
            success(_this);
          }
          txLock = txLocks[_this.dbname];
          if (!!txLock && txLock.queue.length > 0 && !txLock.inProgress) {
            _this.startNextTransaction();
          }
        };
      })(this);
      openerrorcb = (function(_this) {
        return function() {
          console.log('OPEN database: ' + _this.dbname + ' FAILED, aborting any pending transactions');
          if (!!error) {
            error(newSQLError('Could not open database'));
          }
          delete _this.openDBs[_this.dbname];
          _this.abortAllPendingTransactions();
        };
      })(this);
      this.openDBs[this.dbname] = DB_STATE_INIT;
      if (!txLocks[this.dbname]) {
        myfn = function(tx) {
          tx.addStatement('ROLLBACK');
        };
        this.addTransaction(new SQLitePluginTransaction(this, myfn, null, null, false, false));
      }
      cordova.exec(opensuccesscb, openerrorcb, "SQLitePlugin", "open", [this.openargs]);
    }
  };

  SQLitePlugin.prototype.close = function(success, error) {
    if (this.dbname in this.openDBs) {
      if (txLocks[this.dbname] && txLocks[this.dbname].inProgress) {
        console.log('cannot close: transaction is in progress');
        error(newSQLError('database cannot be closed while a transaction is in progress'));
        return;
      }
      console.log('CLOSE database: ' + this.dbname);
      delete this.openDBs[this.dbname];
      if (txLocks[this.dbname]) {
        console.log('closing db with transaction queue length: ' + txLocks[this.dbname].queue.length);
      } else {
        console.log('closing db with no transaction lock state');
      }
      cordova.exec(success, error, "SQLitePlugin", "close", [
        {
          path: this.dbname
        }
      ]);
    } else {
      console.log('cannot close: database is not open');
      if (error) {
        nextTick(function() {
          return error();
        });
      }
    }
  };

  SQLitePlugin.prototype.executeSql = function(statement, params, success, error) {
    var myerror, myfn, mysuccess;
    mysuccess = function(t, r) {
      if (!!success) {
        return success(r);
      }
    };
    myerror = function(t, e) {
      if (!!error) {
        return error(e);
      }
    };
    myfn = function(tx) {
      tx.addStatement(statement, params, mysuccess, myerror);
    };
    this.addTransaction(new SQLitePluginTransaction(this, myfn, null, null, false, false));
  };

  SQLitePlugin.prototype.sqlBatch = function(sqlStatements, success, error) {
    var batchList, j, len1, myfn, st;
    if (!sqlStatements || sqlStatements.constructor !== Array) {
      throw newSQLError('sqlBatch expects an array');
    }
    batchList = [];
    for (j = 0, len1 = sqlStatements.length; j < len1; j++) {
      st = sqlStatements[j];
      if (st.constructor === Array) {
        if (st.length === 0) {
          throw newSQLError('sqlBatch array element of zero (0) length');
        }
        batchList.push({
          sql: st[0],
          params: st.length === 0 ? [] : st[1]
        });
      } else {
        batchList.push({
          sql: st,
          params: []
        });
      }
    }
    myfn = function(tx) {
      var elem, k, len2, results;
      results = [];
      for (k = 0, len2 = batchList.length; k < len2; k++) {
        elem = batchList[k];
        results.push(tx.addStatement(elem.sql, elem.params, null, null));
      }
      return results;
    };
    this.addTransaction(new SQLitePluginTransaction(this, myfn, error, success, true, false));
  };

  SQLitePluginTransaction = function(db, fn, error, success, txlock, readOnly) {
    if (typeof fn !== "function") {

      /*
      This is consistent with the implementation in Chrome -- it
      throws if you pass anything other than a function. This also
      prevents us from stalling our txQueue if somebody passes a
      false value for fn.
       */
      throw newSQLError("transaction expected a function");
    }
    this.db = db;
    this.fn = fn;
    this.error = error;
    this.success = success;
    this.txlock = txlock;
    this.readOnly = readOnly;
    this.executes = [];
    if (txlock) {
      this.addStatement("BEGIN", [], null, function(tx, err) {
        throw newSQLError("unable to begin transaction: " + err.message, err.code);
      });
    } else {
      this.addStatement("SELECT 1", [], null, null);
    }
  };

  SQLitePluginTransaction.prototype.start = function() {
    var err;
    try {
      this.fn(this);
      this.run();
    } catch (error1) {
      err = error1;
      txLocks[this.db.dbname].inProgress = false;
      this.db.startNextTransaction();
      if (this.error) {
        this.error(newSQLError(err));
      }
    }
  };

  SQLitePluginTransaction.prototype.executeSql = function(sql, values, success, error) {
    if (this.finalized) {
      throw {
        message: 'InvalidStateError: DOM Exception 11: This transaction is already finalized. Transactions are committed after its success or failure handlers are called. If you are using a Promise to handle callbacks, be aware that implementations following the A+ standard adhere to run-to-completion semantics and so Promise resolution occurs on a subsequent tick and therefore after the transaction commits.',
        code: 11
      };
      return;
    }
    if (this.readOnly && READ_ONLY_REGEX.test(sql)) {
      this.handleStatementFailure(error, {
        message: 'invalid sql for a read-only transaction'
      });
      return;
    }
    this.addStatement(sql, values, success, error);
  };

  SQLitePluginTransaction.prototype.addStatement = function(sql, values, success, error) {
    var j, len1, params, sqlStatement, t, v;
    sqlStatement = typeof sql === 'string' ? sql : sql.toString();
    params = [];
    if (!!values && values.constructor === Array) {
      for (j = 0, len1 = values.length; j < len1; j++) {
        v = values[j];
        t = typeof v;
        params.push((v === null || v === void 0 ? null : t === 'number' || t === 'string' ? v : v.toString()));
      }
    }
    this.executes.push({
      success: success,
      error: error,
      sql: sqlStatement,
      params: params
    });
  };

  SQLitePluginTransaction.prototype.handleStatementSuccess = function(handler, response) {
    var payload, rows;
    if (!handler) {
      return;
    }
    rows = response.rows || [];
    payload = {
      rows: {
        item: function(i) {
          return rows[i];
        },
        length: rows.length
      },
      rowsAffected: response.rowsAffected || 0,
      insertId: response.insertId || void 0
    };
    handler(this, payload);
  };

  SQLitePluginTransaction.prototype.handleStatementFailure = function(handler, response) {
    if (!handler) {
      throw newSQLError("a statement with no error handler failed: " + response.message, response.code);
    }
    if (handler(this, response) !== false) {
      throw newSQLError("a statement error callback did not return false: " + response.message, response.code);
    }
  };

  SQLitePluginTransaction.prototype.run = function() {
    var batchExecutes, handlerFor, i, mycb, mycbmap, request, tropts, tx, txFailure, waiting;
    txFailure = null;
    tropts = [];
    batchExecutes = this.executes;
    waiting = batchExecutes.length;
    this.executes = [];
    tx = this;
    handlerFor = function(index, didSucceed) {
      return function(response) {
        var err;
        if (!txFailure) {
          try {
            if (didSucceed) {
              tx.handleStatementSuccess(batchExecutes[index].success, response);
            } else {
              tx.handleStatementFailure(batchExecutes[index].error, newSQLError(response));
            }
          } catch (error1) {
            err = error1;
            txFailure = newSQLError(err);
          }
        }
        if (--waiting === 0) {
          if (txFailure) {
            tx.executes = [];
            tx.abort(txFailure);
          } else if (tx.executes.length > 0) {
            tx.run();
          } else {
            tx.finish();
          }
        }
      };
    };
    mycbmap = {};
    i = 0;
    while (i < batchExecutes.length) {
      request = batchExecutes[i];
      mycbmap[i] = {
        success: handlerFor(i, true),
        error: handlerFor(i, false)
      };
      tropts.push({
        qid: null,
        sql: request.sql,
        params: request.params
      });
      i++;
    }
    mycb = function(result) {
      var j, q, r, ref, res, resultIndex, type;
      for (resultIndex = j = 0, ref = result.length - 1; 0 <= ref ? j <= ref : j >= ref; resultIndex = 0 <= ref ? ++j : --j) {
        r = result[resultIndex];
        type = r.type;
        res = r.result;
        q = mycbmap[resultIndex];
        if (q) {
          if (q[type]) {
            q[type](res);
          }
        }
      }
    };
    cordova.exec(mycb, null, "SQLitePlugin", "backgroundExecuteSqlBatch", [
      {
        dbargs: {
          dbname: this.db.dbname
        },
        executes: tropts
      }
    ]);
  };

  SQLitePluginTransaction.prototype.abort = function(txFailure) {
    var failed, succeeded, tx;
    if (this.finalized) {
      return;
    }
    tx = this;
    succeeded = function(tx) {
      txLocks[tx.db.dbname].inProgress = false;
      tx.db.startNextTransaction();
      if (tx.error && typeof tx.error === 'function') {
        tx.error(txFailure);
      }
    };
    failed = function(tx, err) {
      txLocks[tx.db.dbname].inProgress = false;
      tx.db.startNextTransaction();
      if (tx.error && typeof tx.error === 'function') {
        tx.error(newSQLError('error while trying to roll back: ' + err.message, err.code));
      }
    };
    this.finalized = true;
    if (this.txlock) {
      this.addStatement("ROLLBACK", [], succeeded, failed);
      this.run();
    } else {
      succeeded(tx);
    }
  };

  SQLitePluginTransaction.prototype.finish = function() {
    var failed, succeeded, tx;
    if (this.finalized) {
      return;
    }
    tx = this;
    succeeded = function(tx) {
      txLocks[tx.db.dbname].inProgress = false;
      tx.db.startNextTransaction();
      if (tx.success && typeof tx.success === 'function') {
        tx.success();
      }
    };
    failed = function(tx, err) {
      txLocks[tx.db.dbname].inProgress = false;
      tx.db.startNextTransaction();
      if (tx.error && typeof tx.error === 'function') {
        tx.error(newSQLError('error while trying to commit: ' + err.message, err.code));
      }
    };
    this.finalized = true;
    if (this.txlock) {
      this.addStatement("COMMIT", [], succeeded, failed);
      this.run();
    } else {
      succeeded(tx);
    }
  };

  SQLitePluginTransaction.prototype.abortFromQ = function(sqlerror) {
    if (this.error) {
      this.error(sqlerror);
    }
  };

  dblocations = ["docs", "libs", "nosync"];

  iosLocationMap = {
    'default': 'nosync',
    'Documents': 'docs',
    'Library': 'libs'
  };

  SQLiteFactory = {

    /*
    NOTE: this function should NOT be translated from Javascript
    back to CoffeeScript by js2coffee.
    If this function is edited in Javascript then someone will
    have to translate it back to CoffeeScript by hand.
     */
    openDatabase: argsArray(function(args) {
      var dblocation, errorcb, okcb, openargs;
      if (args.length < 1 || !args[0]) {
        throw newSQLError('Sorry missing mandatory open arguments object in openDatabase call');
      }
      if (args[0].constructor === String) {
        throw newSQLError('Sorry first openDatabase argument must be an object');
      }
      openargs = args[0];
      if (!openargs.name) {
        throw newSQLError('Database name value is missing in openDatabase call');
      }
      if (!openargs.iosDatabaseLocation && !openargs.location && openargs.location !== 0) {
        throw newSQLError('Database location or iosDatabaseLocation setting is now mandatory in openDatabase call.');
      }
      if (!!openargs.location && !!openargs.iosDatabaseLocation) {
        throw newSQLError('AMBIGUOUS: both location and iosDatabaseLocation settings are present in openDatabase call. Please use either setting, not both.');
      }
      dblocation = !!openargs.location && openargs.location === 'default' ? iosLocationMap['default'] : !!openargs.iosDatabaseLocation ? iosLocationMap[openargs.iosDatabaseLocation] : dblocations[openargs.location];
      if (!dblocation) {
        throw newSQLError('Valid iOS database location could not be determined in openDatabase call');
      }
      openargs.dblocation = dblocation;
      if (!!openargs.createFromLocation && openargs.createFromLocation === 1) {
        openargs.createFromResource = "1";
      }
      if (!!openargs.androidDatabaseImplementation && openargs.androidDatabaseImplementation === 2) {
        openargs.androidOldDatabaseImplementation = 1;
      }
      if (!!openargs.androidLockWorkaround && openargs.androidLockWorkaround === 1) {
        openargs.androidBugWorkaround = 1;
      }
      okcb = null;
      errorcb = null;
      if (args.length >= 2) {
        okcb = args[1];
        if (args.length > 2) {
          errorcb = args[2];
        }
      }
      return new SQLitePlugin(openargs, okcb, errorcb);
    }),
    deleteDatabase: function(first, success, error) {
      var args, dblocation, dbname;
      args = {};
      if (first.constructor === String) {
        throw newSQLError('Sorry first deleteDatabase argument must be an object');
      } else {
        if (!(first && first['name'])) {
          throw new Error("Please specify db name");
        }
        dbname = first.name;
        if (typeof dbname !== 'string') {
          throw newSQLError('delete database name must be a string');
        }
        args.path = dbname;
      }
      if (!first.iosDatabaseLocation && !first.location && first.location !== 0) {
        throw newSQLError('Database location or iosDatabaseLocation setting is now mandatory in deleteDatabase call.');
      }
      if (!!first.location && !!first.iosDatabaseLocation) {
        throw newSQLError('AMBIGUOUS: both location and iosDatabaseLocation settings are present in deleteDatabase call. Please use either setting value, not both.');
      }
      dblocation = !!first.location && first.location === 'default' ? iosLocationMap['default'] : !!first.iosDatabaseLocation ? iosLocationMap[first.iosDatabaseLocation] : dblocations[first.location];
      if (!dblocation) {
        throw newSQLError('Valid iOS database location could not be determined in deleteDatabase call');
      }
      args.dblocation = dblocation;
      delete SQLitePlugin.prototype.openDBs[args.path];
      return cordova.exec(success, error, "SQLitePlugin", "delete", [args]);
    }
  };

  SelfTest = {
    DBNAME: '___$$$___litehelpers___$$$___test___$$$___.db',
    start: function(successcb, errorcb) {
      SQLiteFactory.deleteDatabase({
        name: SelfTest.DBNAME,
        location: 'default'
      }, (function() {
        return SelfTest.step1(successcb, errorcb);
      }), (function() {
        return SelfTest.step1(successcb, errorcb);
      }));
    },
    step1: function(successcb, errorcb) {
      SQLiteFactory.openDatabase({
        name: SelfTest.DBNAME,
        location: 'default'
      }, function(db) {
        var check1;
        check1 = false;
        db.transaction(function(tx) {
          tx.executeSql('SELECT UPPER("Test") AS upperText', [], function(ignored, resutSet) {
            if (!resutSet.rows) {
              return SelfTest.finishWithError(errorcb, 'Missing resutSet.rows');
            }
            if (!resutSet.rows.length) {
              return SelfTest.finishWithError(errorcb, 'Missing resutSet.rows.length');
            }
            if (resutSet.rows.length !== 1) {
              return SelfTest.finishWithError(errorcb, "Incorrect resutSet.rows.length value: " + resutSet.rows.length + " (expected: 1)");
            }
            if (!resutSet.rows.item(0).upperText) {
              return SelfTest.finishWithError(errorcb, 'Missing resutSet.rows.item(0).upperText');
            }
            if (resutSet.rows.item(0).upperText !== 'TEST') {
              return SelfTest.finishWithError(errorcb, "Incorrect resutSet.rows.item(0).upperText value: " + (resutSet.rows.item(0).upperText) + " (expected: 'TEST')");
            }
            check1 = true;
          }, function(ignored, tx_sql_err) {
            return SelfTest.finishWithError(errorcb, "TX SQL error: " + tx_sql_err);
          });
        }, function(tx_err) {
          return SelfTest.finishWithError(errorcb, "TRANSACTION error: " + tx_err);
        }, function() {
          if (!check1) {
            return SelfTest.finishWithError(errorcb, 'Did not get expected upperText result data');
          }
          db.executeSql('BEGIN', null, function(ignored) {
            return nextTick(function() {
              delete db.openDBs[SelfTest.DBNAME];
              delete txLocks[SelfTest.DBNAME];
              nextTick(function() {
                db.transaction(function(tx2) {
                  tx2.executeSql('SELECT 1');
                }, function(tx_err) {
                  if (!tx_err) {
                    return SelfTest.finishWithError(errorcb, 'Missing error object');
                  }
                  SelfTest.step2(successcb, errorcb);
                }, function() {
                  return SelfTest.finishWithError(errorcb, 'Missing error object');
                });
              });
            });
          });
        });
      }, function(open_err) {
        return SelfTest.finishWithError(errorcb, "Open database error: " + open_err);
      });
    },
    step2: function(successcb, errorcb) {
      SQLiteFactory.openDatabase({
        name: SelfTest.DBNAME,
        location: 'default'
      }, function(db) {
        db.transaction(function(tx) {
          tx.executeSql('SELECT ? AS myResult', [null], function(ignored, resutSet) {
            if (!resutSet.rows) {
              return SelfTest.finishWithError(errorcb, 'Missing resutSet.rows');
            }
            if (!resutSet.rows.length) {
              return SelfTest.finishWithError(errorcb, 'Missing resutSet.rows.length');
            }
            if (resutSet.rows.length !== 1) {
              return SelfTest.finishWithError(errorcb, "Incorrect resutSet.rows.length value: " + resutSet.rows.length + " (expected: 1)");
            }
            SelfTest.step3(successcb, errorcb);
          });
        }, function(txError) {
          return SelfTest.finishWithError(errorcb, "UNEXPECTED TRANSACTION ERROR: " + txError);
        });
      }, function(open_err) {
        return SelfTest.finishWithError(errorcb, "Open database error: " + open_err);
      });
    },
    step3: function(successcb, errorcb) {
      SQLiteFactory.openDatabase({
        name: SelfTest.DBNAME,
        location: 'default'
      }, function(db) {
        return db.sqlBatch(['CREATE TABLE TestTable(id integer primary key autoincrement unique, data);', ['INSERT INTO TestTable (data) VALUES (?);', ['test-value']]], function() {
          var firstid;
          firstid = -1;
          return db.executeSql('SELECT id, data FROM TestTable', [], function(resutSet) {
            if (!resutSet.rows) {
              SelfTest.finishWithError(errorcb, 'Missing resutSet.rows');
              return;
            }
            if (!resutSet.rows.length) {
              SelfTest.finishWithError(errorcb, 'Missing resutSet.rows.length');
              return;
            }
            if (resutSet.rows.length !== 1) {
              SelfTest.finishWithError(errorcb, "Incorrect resutSet.rows.length value: " + resutSet.rows.length + " (expected: 1)");
              return;
            }
            if (resutSet.rows.item(0).id === void 0) {
              SelfTest.finishWithError(errorcb, 'Missing resutSet.rows.item(0).id');
              return;
            }
            firstid = resutSet.rows.item(0).id;
            if (!resutSet.rows.item(0).data) {
              SelfTest.finishWithError(errorcb, 'Missing resutSet.rows.item(0).data');
              return;
            }
            if (resutSet.rows.item(0).data !== 'test-value') {
              SelfTest.finishWithError(errorcb, "Incorrect resutSet.rows.item(0).data value: " + (resutSet.rows.item(0).data) + " (expected: 'test-value')");
              return;
            }
            return db.transaction(function(tx) {
              return tx.executeSql('UPDATE TestTable SET data = ?', ['new-value']);
            }, function(tx_err) {
              return SelfTest.finishWithError(errorcb, "UPDATE transaction error: " + tx_err);
            }, function() {
              var readTransactionFinished;
              readTransactionFinished = false;
              return db.readTransaction(function(tx2) {
                return tx2.executeSql('SELECT id, data FROM TestTable', [], function(ignored, resutSet2) {
                  if (!resutSet2.rows) {
                    throw newSQLError('Missing resutSet2.rows');
                  }
                  if (!resutSet2.rows.length) {
                    throw newSQLError('Missing resutSet2.rows.length');
                  }
                  if (resutSet2.rows.length !== 1) {
                    throw newSQLError("Incorrect resutSet2.rows.length value: " + resutSet2.rows.length + " (expected: 1)");
                  }
                  if (!resutSet2.rows.item(0).id) {
                    throw newSQLError('Missing resutSet2.rows.item(0).id');
                  }
                  if (resutSet2.rows.item(0).id !== firstid) {
                    throw newSQLError("resutSet2.rows.item(0).id value " + (resutSet2.rows.item(0).id) + " does not match previous primary key id value (" + firstid + ")");
                  }
                  if (!resutSet2.rows.item(0).data) {
                    throw newSQLError('Missing resutSet2.rows.item(0).data');
                  }
                  if (resutSet2.rows.item(0).data !== 'new-value') {
                    throw newSQLError("Incorrect resutSet2.rows.item(0).data value: " + (resutSet2.rows.item(0).data) + " (expected: 'test-value')");
                  }
                  return readTransactionFinished = true;
                });
              }, function(tx2_err) {
                return SelfTest.finishWithError(errorcb, "readTransaction error: " + tx2_err);
              }, function() {
                if (!readTransactionFinished) {
                  SelfTest.finishWithError(errorcb, 'readTransaction did not finish');
                  return;
                }
                return db.transaction(function(tx3) {
                  tx3.executeSql('DELETE FROM TestTable');
                  return tx3.executeSql('INSERT INTO TestTable (data) VALUES(?)', [123]);
                }, function(tx3_err) {
                  return SelfTest.finishWithError(errorcb, "DELETE transaction error: " + tx3_err);
                }, function() {
                  var secondReadTransactionFinished;
                  secondReadTransactionFinished = false;
                  return db.readTransaction(function(tx4) {
                    return tx4.executeSql('SELECT id, data FROM TestTable', [], function(ignored, resutSet3) {
                      if (!resutSet3.rows) {
                        throw newSQLError('Missing resutSet3.rows');
                      }
                      if (!resutSet3.rows.length) {
                        throw newSQLError('Missing resutSet3.rows.length');
                      }
                      if (resutSet3.rows.length !== 1) {
                        throw newSQLError("Incorrect resutSet3.rows.length value: " + resutSet3.rows.length + " (expected: 1)");
                      }
                      if (!resutSet3.rows.item(0).id) {
                        throw newSQLError('Missing resutSet3.rows.item(0).id');
                      }
                      if (resutSet3.rows.item(0).id === firstid) {
                        throw newSQLError("resutSet3.rows.item(0).id value " + (resutSet3.rows.item(0).id) + " incorrectly matches previous unique key id value value (" + firstid + ")");
                      }
                      if (!resutSet3.rows.item(0).data) {
                        throw newSQLError('Missing resutSet3.rows.item(0).data');
                      }
                      if (resutSet3.rows.item(0).data !== 123) {
                        throw newSQLError("Incorrect resutSet3.rows.item(0).data value: " + (resutSet3.rows.item(0).data) + " (expected 123)");
                      }
                      return secondReadTransactionFinished = true;
                    });
                  }, function(tx4_err) {
                    return SelfTest.finishWithError(errorcb, "second readTransaction error: " + tx4_err);
                  }, function() {
                    if (!secondReadTransactionFinished) {
                      SelfTest.finishWithError(errorcb, 'second readTransaction did not finish');
                      return;
                    }
                    return db.close(function() {
                      return SQLiteFactory.deleteDatabase({
                        name: SelfTest.DBNAME,
                        location: 'default'
                      }, successcb, function(cleanup_err) {
                        if (/Windows /.test(navigator.userAgent) || /IEMobile/.test(navigator.userAgent)) {
                          console.log("IGNORE CLEANUP (DELETE) ERROR: " + (JSON.stringify(cleanup_err)) + " (Windows/WP8)");
                          successcb();
                          return;
                        }
                        return SelfTest.finishWithError(errorcb, "Cleanup error: " + cleanup_err);
                      });
                    }, function(close_err) {
                      if (/Windows /.test(navigator.userAgent) || /IEMobile/.test(navigator.userAgent)) {
                        console.log("IGNORE close ERROR: " + (JSON.stringify(close_err)) + " (Windows/WP8)");
                        SQLiteFactory.deleteDatabase({
                          name: SelfTest.DBNAME,
                          location: 'default'
                        }, successcb, successcb);
                        return;
                      }
                      return SelfTest.finishWithError(errorcb, "close error: " + close_err);
                    });
                  });
                });
              });
            });
          }, function(select_err) {
            return SelfTest.finishWithError(errorcb, "SELECT error: " + select_err);
          });
        }, function(batch_err) {
          return SelfTest.finishWithError(errorcb, "sql batch error: " + batch_err);
        });
      }, function(open_err) {
        return SelfTest.finishWithError(errorcb, "Open database error: " + open_err);
      });
    },
    finishWithError: function(errorcb, message) {
      console.log("selfTest ERROR with message: " + message);
      SQLiteFactory.deleteDatabase({
        name: SelfTest.DBNAME,
        location: 'default'
      }, function() {
        return errorcb(newSQLError(message));
      }, function(err2) {
        return errorcb(newSQLError("Cleanup error: " + err2 + " for error: " + message));
      });
    }
  };

  root.sqlitePlugin = {
    sqliteFeatures: {
      isSQLitePlugin: true
    },
    echoTest: function(okcb, errorcb) {
      var error, ok;
      ok = function(s) {
        if (s === 'test-string') {
          return okcb();
        } else {
          return errorcb("Mismatch: got: '" + s + "' expected 'test-string'");
        }
      };
      error = function(e) {
        return errorcb(e);
      };
      return cordova.exec(ok, error, "SQLitePlugin", "echoStringValue", [
        {
          value: 'test-string'
        }
      ]);
    },
    selfTest: SelfTest.start,
    openDatabase: SQLiteFactory.openDatabase,
    deleteDatabase: SQLiteFactory.deleteDatabase
  };

}).call(this);

},{}],"cordova/android/nativeapiprovider":[function(require,module,exports){
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
*/

/**
 * Exports the ExposedJsApi.java object if available, otherwise exports the PromptBasedNativeApi.
 */

var nativeApi = this._cordovaNative || require('cordova/android/promptbasednativeapi');
var currentApi = nativeApi;

module.exports = {
    get: function() { return currentApi; },
    setPreferPrompt: function(value) {
        currentApi = value ? require('cordova/android/promptbasednativeapi') : nativeApi;
    },
    // Used only by tests.
    set: function(value) {
        currentApi = value;
    }
};

},{"cordova/android/promptbasednativeapi":"cordova/android/promptbasednativeapi"}],"cordova/android/promptbasednativeapi":[function(require,module,exports){
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
*/

/**
 * Implements the API of ExposedJsApi.java, but uses prompt() to communicate.
 * This is used pre-JellyBean, where addJavascriptInterface() is disabled.
 */

module.exports = {
    exec: function(bridgeSecret, service, action, callbackId, argsJson) {
        return prompt(argsJson, 'gap:'+JSON.stringify([bridgeSecret, service, action, callbackId]));
    },
    setNativeToJsBridgeMode: function(bridgeSecret, value) {
        prompt(value, 'gap_bridge_mode:' + bridgeSecret);
    },
    retrieveJsMessages: function(bridgeSecret, fromOnlineEvent) {
        return prompt(+fromOnlineEvent, 'gap_poll:' + bridgeSecret);
    }
};

},{}],"cordova/argscheck":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var utils = require('cordova/utils');

var moduleExports = module.exports;

var typeMap = {
    'A': 'Array',
    'D': 'Date',
    'N': 'Number',
    'S': 'String',
    'F': 'Function',
    'O': 'Object'
};

function extractParamName (callee, argIndex) {
    return (/.*?\((.*?)\)/).exec(callee)[1].split(', ')[argIndex];
}

function checkArgs (spec, functionName, args, opt_callee) {
    if (!moduleExports.enableChecks) {
        return;
    }
    var errMsg = null;
    var typeName;
    for (var i = 0; i < spec.length; ++i) {
        var c = spec.charAt(i);
        var cUpper = c.toUpperCase();
        var arg = args[i];
        // Asterix means allow anything.
        if (c === '*') {
            continue;
        }
        typeName = utils.typeName(arg);
        if ((arg === null || arg === undefined) && c === cUpper) {
            continue;
        }
        if (typeName !== typeMap[cUpper]) {
            errMsg = 'Expected ' + typeMap[cUpper];
            break;
        }
    }
    if (errMsg) {
        errMsg += ', but got ' + typeName + '.';
        errMsg = 'Wrong type for parameter "' + extractParamName(opt_callee || args.callee, i) + '" of ' + functionName + ': ' + errMsg;
        // Don't log when running unit tests.
        if (typeof jasmine === 'undefined') {
            console.error(errMsg);
        }
        throw TypeError(errMsg);
    }
}

function getValue (value, defaultValue) {
    return value === undefined ? defaultValue : value;
}

moduleExports.checkArgs = checkArgs;
moduleExports.getValue = getValue;
moduleExports.enableChecks = true;

},{"cordova/utils":"cordova/utils"}],"cordova/base64":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var base64 = exports;

base64.fromArrayBuffer = function (arrayBuffer) {
    var array = new Uint8Array(arrayBuffer);
    return uint8ToBase64(array);
};

base64.toArrayBuffer = function (str) {
    var decodedStr = typeof atob !== 'undefined' ? atob(str) : Buffer.from(str, 'base64').toString('binary'); // eslint-disable-line no-undef
    var arrayBuffer = new ArrayBuffer(decodedStr.length);
    var array = new Uint8Array(arrayBuffer);
    for (var i = 0, len = decodedStr.length; i < len; i++) {
        array[i] = decodedStr.charCodeAt(i);
    }
    return arrayBuffer;
};

// ------------------------------------------------------------------------------

/* This code is based on the performance tests at http://jsperf.com/b64tests
 * This 12-bit-at-a-time algorithm was the best performing version on all
 * platforms tested.
 */

var b64_6bit = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
var b64_12bit;

var b64_12bitTable = function () {
    b64_12bit = [];
    for (var i = 0; i < 64; i++) {
        for (var j = 0; j < 64; j++) {
            b64_12bit[i * 64 + j] = b64_6bit[i] + b64_6bit[j];
        }
    }
    b64_12bitTable = function () { return b64_12bit; };
    return b64_12bit;
};

function uint8ToBase64 (rawData) {
    var numBytes = rawData.byteLength;
    var output = '';
    var segment;
    var table = b64_12bitTable();
    for (var i = 0; i < numBytes - 2; i += 3) {
        segment = (rawData[i] << 16) + (rawData[i + 1] << 8) + rawData[i + 2];
        output += table[segment >> 12];
        output += table[segment & 0xfff];
    }
    if (numBytes - i === 2) {
        segment = (rawData[i] << 16) + (rawData[i + 1] << 8);
        output += table[segment >> 12];
        output += b64_6bit[(segment & 0xfff) >> 6];
        output += '=';
    } else if (numBytes - i === 1) {
        segment = (rawData[i] << 16);
        output += table[segment >> 12];
        output += '==';
    }
    return output;
}

},{}],"cordova/builder":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var utils = require('cordova/utils');

function each (objects, func, context) {
    for (var prop in objects) {
        if (objects.hasOwnProperty(prop)) {
            func.apply(context, [objects[prop], prop]);
        }
    }
}

function clobber (obj, key, value) {
    exports.replaceHookForTesting(obj, key);
    var needsProperty = false;
    try {
        obj[key] = value;
    } catch (e) {
        needsProperty = true;
    }
    // Getters can only be overridden by getters.
    if (needsProperty || obj[key] !== value) {
        utils.defineGetter(obj, key, function () {
            return value;
        });
    }
}

function assignOrWrapInDeprecateGetter (obj, key, value, message) {
    if (message) {
        utils.defineGetter(obj, key, function () {
            console.log(message);
            delete obj[key];
            clobber(obj, key, value);
            return value;
        });
    } else {
        clobber(obj, key, value);
    }
}

function include (parent, objects, clobber, merge) {
    each(objects, function (obj, key) {
        try {
            var result = obj.path ? require(obj.path) : {};

            if (clobber) {
                // Clobber if it doesn't exist.
                if (typeof parent[key] === 'undefined') {
                    assignOrWrapInDeprecateGetter(parent, key, result, obj.deprecated);
                } else if (typeof obj.path !== 'undefined') {
                    // If merging, merge properties onto parent, otherwise, clobber.
                    if (merge) {
                        recursiveMerge(parent[key], result);
                    } else {
                        assignOrWrapInDeprecateGetter(parent, key, result, obj.deprecated);
                    }
                }
                result = parent[key];
            } else {
                // Overwrite if not currently defined.
                if (typeof parent[key] === 'undefined') {
                    assignOrWrapInDeprecateGetter(parent, key, result, obj.deprecated);
                } else {
                    // Set result to what already exists, so we can build children into it if they exist.
                    result = parent[key];
                }
            }

            if (obj.children) {
                include(result, obj.children, clobber, merge);
            }
        } catch (e) {
            utils.alert('Exception building Cordova JS globals: ' + e + ' for key "' + key + '"');
        }
    });
}

/**
 * Merge properties from one object onto another recursively.  Properties from
 * the src object will overwrite existing target property.
 *
 * @param target Object to merge properties into.
 * @param src Object to merge properties from.
 */
function recursiveMerge (target, src) {
    for (var prop in src) {
        if (src.hasOwnProperty(prop)) {
            if (target.prototype && target.prototype.constructor === target) {
                // If the target object is a constructor override off prototype.
                clobber(target.prototype, prop, src[prop]);
            } else {
                if (typeof src[prop] === 'object' && typeof target[prop] === 'object') {
                    recursiveMerge(target[prop], src[prop]);
                } else {
                    clobber(target, prop, src[prop]);
                }
            }
        }
    }
}

exports.buildIntoButDoNotClobber = function (objects, target) {
    include(target, objects, false, false);
};
exports.buildIntoAndClobber = function (objects, target) {
    include(target, objects, true, false);
};
exports.buildIntoAndMerge = function (objects, target) {
    include(target, objects, true, true);
};
exports.recursiveMerge = recursiveMerge;
exports.assignOrWrapInDeprecateGetter = assignOrWrapInDeprecateGetter;
exports.replaceHookForTesting = function () {};

},{"cordova/utils":"cordova/utils"}],"cordova/channel":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var utils = require('cordova/utils');
var nextGuid = 1;

/**
 * Custom pub-sub "channel" that can have functions subscribed to it
 * This object is used to define and control firing of events for
 * cordova initialization, as well as for custom events thereafter.
 *
 * The order of events during page load and Cordova startup is as follows:
 *
 * onDOMContentLoaded*         Internal event that is received when the web page is loaded and parsed.
 * onNativeReady*              Internal event that indicates the Cordova native side is ready.
 * onCordovaReady*             Internal event fired when all Cordova JavaScript objects have been created.
 * onDeviceReady*              User event fired to indicate that Cordova is ready
 * onResume                    User event fired to indicate a start/resume lifecycle event
 * onPause                     User event fired to indicate a pause lifecycle event
 *
 * The events marked with an * are sticky. Once they have fired, they will stay in the fired state.
 * All listeners that subscribe after the event is fired will be executed right away.
 *
 * The only Cordova events that user code should register for are:
 *      deviceready           Cordova native code is initialized and Cordova APIs can be called from JavaScript
 *      pause                 App has moved to background
 *      resume                App has returned to foreground
 *
 * Listeners can be registered as:
 *      document.addEventListener("deviceready", myDeviceReadyListener, false);
 *      document.addEventListener("resume", myResumeListener, false);
 *      document.addEventListener("pause", myPauseListener, false);
 *
 * The DOM lifecycle events should be used for saving and restoring state
 *      window.onload
 *      window.onunload
 *
 */

/**
 * Channel
 * @constructor
 * @param type  String the channel name
 */
var Channel = function (type, sticky) {
    this.type = type;
    // Map of guid -> function.
    this.handlers = {};
    // 0 = Non-sticky, 1 = Sticky non-fired, 2 = Sticky fired.
    this.state = sticky ? 1 : 0;
    // Used in sticky mode to remember args passed to fire().
    this.fireArgs = null;
    // Used by onHasSubscribersChange to know if there are any listeners.
    this.numHandlers = 0;
    // Function that is called when the first listener is subscribed, or when
    // the last listener is unsubscribed.
    this.onHasSubscribersChange = null;
};
var channel = {
    /**
     * Calls the provided function only after all of the channels specified
     * have been fired. All channels must be sticky channels.
     */
    join: function (h, c) {
        var len = c.length;
        var i = len;
        var f = function () {
            if (!(--i)) h();
        };
        for (var j = 0; j < len; j++) {
            if (c[j].state === 0) {
                throw Error('Can only use join with sticky channels.');
            }
            c[j].subscribe(f);
        }
        if (!len) h();
    },
    /* eslint-disable no-return-assign */
    create: function (type) {
        return channel[type] = new Channel(type, false);
    },
    createSticky: function (type) {
        return channel[type] = new Channel(type, true);
    },
    /* eslint-enable no-return-assign */
    /**
     * cordova Channels that must fire before "deviceready" is fired.
     */
    deviceReadyChannelsArray: [],
    deviceReadyChannelsMap: {},

    /**
     * Indicate that a feature needs to be initialized before it is ready to be used.
     * This holds up Cordova's "deviceready" event until the feature has been initialized
     * and Cordova.initComplete(feature) is called.
     *
     * @param feature {String}     The unique feature name
     */
    waitForInitialization: function (feature) {
        if (feature) {
            var c = channel[feature] || this.createSticky(feature);
            this.deviceReadyChannelsMap[feature] = c;
            this.deviceReadyChannelsArray.push(c);
        }
    },

    /**
     * Indicate that initialization code has completed and the feature is ready to be used.
     *
     * @param feature {String}     The unique feature name
     */
    initializationComplete: function (feature) {
        var c = this.deviceReadyChannelsMap[feature];
        if (c) {
            c.fire();
        }
    }
};

function checkSubscriptionArgument (argument) {
    if (typeof argument !== 'function' && typeof argument.handleEvent !== 'function') {
        throw new Error(
            'Must provide a function or an EventListener object ' +
                'implementing the handleEvent interface.'
        );
    }
}

/**
 * Subscribes the given function to the channel. Any time that
 * Channel.fire is called so too will the function.
 * Optionally specify an execution context for the function
 * and a guid that can be used to stop subscribing to the channel.
 * Returns the guid.
 */
Channel.prototype.subscribe = function (eventListenerOrFunction, eventListener) {
    checkSubscriptionArgument(eventListenerOrFunction);
    var handleEvent, guid;

    if (eventListenerOrFunction && typeof eventListenerOrFunction === 'object') {
        // Received an EventListener object implementing the handleEvent interface
        handleEvent = eventListenerOrFunction.handleEvent;
        eventListener = eventListenerOrFunction;
    } else {
        // Received a function to handle event
        handleEvent = eventListenerOrFunction;
    }

    if (this.state === 2) {
        handleEvent.apply(eventListener || this, this.fireArgs);
        return;
    }

    guid = eventListenerOrFunction.observer_guid;
    if (typeof eventListener === 'object') {
        handleEvent = utils.close(eventListener, handleEvent);
    }

    if (!guid) {
        // First time any channel has seen this subscriber
        guid = '' + nextGuid++;
    }
    handleEvent.observer_guid = guid;
    eventListenerOrFunction.observer_guid = guid;

    // Don't add the same handler more than once.
    if (!this.handlers[guid]) {
        this.handlers[guid] = handleEvent;
        this.numHandlers++;
        if (this.numHandlers === 1) {
            this.onHasSubscribersChange && this.onHasSubscribersChange();
        }
    }
};

/**
 * Unsubscribes the function with the given guid from the channel.
 */
Channel.prototype.unsubscribe = function (eventListenerOrFunction) {
    checkSubscriptionArgument(eventListenerOrFunction);
    var handleEvent, guid, handler;

    if (eventListenerOrFunction && typeof eventListenerOrFunction === 'object') {
        // Received an EventListener object implementing the handleEvent interface
        handleEvent = eventListenerOrFunction.handleEvent;
    } else {
        // Received a function to handle event
        handleEvent = eventListenerOrFunction;
    }

    guid = handleEvent.observer_guid;
    handler = this.handlers[guid];
    if (handler) {
        delete this.handlers[guid];
        this.numHandlers--;
        if (this.numHandlers === 0) {
            this.onHasSubscribersChange && this.onHasSubscribersChange();
        }
    }
};

/**
 * Calls all functions subscribed to this channel.
 */
Channel.prototype.fire = function (e) {
    var fail = false; // eslint-disable-line no-unused-vars
    var fireArgs = Array.prototype.slice.call(arguments);
    // Apply stickiness.
    if (this.state === 1) {
        this.state = 2;
        this.fireArgs = fireArgs;
    }
    if (this.numHandlers) {
        // Copy the values first so that it is safe to modify it from within
        // callbacks.
        var toCall = [];
        for (var item in this.handlers) {
            toCall.push(this.handlers[item]);
        }
        for (var i = 0; i < toCall.length; ++i) {
            toCall[i].apply(this, fireArgs);
        }
        if (this.state === 2 && this.numHandlers) {
            this.numHandlers = 0;
            this.handlers = {};
            this.onHasSubscribersChange && this.onHasSubscribersChange();
        }
    }
};

// defining them here so they are ready super fast!
// DOM event that is received when the web page is loaded and parsed.
channel.createSticky('onDOMContentLoaded');

// Event to indicate the Cordova native side is ready.
channel.createSticky('onNativeReady');

// Event to indicate that all Cordova JavaScript objects have been created
// and it's time to run plugin constructors.
channel.createSticky('onCordovaReady');

// Event to indicate that all automatically loaded JS plugins are loaded and ready.
// FIXME remove this
channel.createSticky('onPluginsReady');

// Event to indicate that Cordova is ready
channel.createSticky('onDeviceReady');

// Event to indicate a resume lifecycle event
channel.create('onResume');

// Event to indicate a pause lifecycle event
channel.create('onPause');

// Channels that must fire before "deviceready" is fired.
channel.waitForInitialization('onCordovaReady');
channel.waitForInitialization('onDOMContentLoaded');

module.exports = channel;

},{"cordova/utils":"cordova/utils"}],"cordova/exec/proxy":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

// internal map of proxy function
var CommandProxyMap = {};

module.exports = {

    // example: cordova.commandProxy.add("Accelerometer",{getCurrentAcceleration: function(successCallback, errorCallback, options) {...},...);
    add: function (id, proxyObj) {
        console.log('adding proxy for ' + id);
        CommandProxyMap[id] = proxyObj;
        return proxyObj;
    },

    // cordova.commandProxy.remove("Accelerometer");
    remove: function (id) {
        var proxy = CommandProxyMap[id];
        delete CommandProxyMap[id];
        CommandProxyMap[id] = null;
        return proxy;
    },

    get: function (service, action) {
        return (CommandProxyMap[service] ? CommandProxyMap[service][action] : null);
    }
};

},{}],"cordova/exec":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * Execute a cordova command.  It is up to the native side whether this action
 * is synchronous or asynchronous.  The native side can return:
 *      Synchronous: PluginResult object as a JSON string
 *      Asynchronous: Empty string ""
 * If async, the native side will cordova.callbackSuccess or cordova.callbackError,
 * depending upon the result of the action.
 *
 * @param {Function} success    The success callback
 * @param {Function} fail       The fail callback
 * @param {String} service      The name of the service to use
 * @param {String} action       Action to be run in cordova
 * @param {String[]} [args]     Zero or more arguments to pass to the method
 */
var cordova = require('cordova'),
    nativeApiProvider = require('cordova/android/nativeapiprovider'),
    utils = require('cordova/utils'),
    base64 = require('cordova/base64'),
    channel = require('cordova/channel'),
    jsToNativeModes = {
        PROMPT: 0,
        JS_OBJECT: 1
    },
    nativeToJsModes = {
        // Polls for messages using the JS->Native bridge.
        POLLING: 0,
        // For LOAD_URL to be viable, it would need to have a work-around for
        // the bug where the soft-keyboard gets dismissed when a message is sent.
        LOAD_URL: 1,
        // For the ONLINE_EVENT to be viable, it would need to intercept all event
        // listeners (both through addEventListener and window.ononline) as well
        // as set the navigator property itself.
        ONLINE_EVENT: 2,
        EVAL_BRIDGE: 3
    },
    jsToNativeBridgeMode,  // Set lazily.
    nativeToJsBridgeMode = nativeToJsModes.EVAL_BRIDGE,
    pollEnabled = false,
    bridgeSecret = -1;

var messagesFromNative = [];
var isProcessing = false;
var resolvedPromise = typeof Promise == 'undefined' ? null : Promise.resolve();
var nextTick = resolvedPromise ? function(fn) { resolvedPromise.then(fn); } : function(fn) { setTimeout(fn); };

function androidExec(success, fail, service, action, args) {
    if (bridgeSecret < 0) {
        // If we ever catch this firing, we'll need to queue up exec()s
        // and fire them once we get a secret. For now, I don't think
        // it's possible for exec() to be called since plugins are parsed but
        // not run until until after onNativeReady.
        throw new Error('exec() called without bridgeSecret');
    }
    // Set default bridge modes if they have not already been set.
    // By default, we use the failsafe, since addJavascriptInterface breaks too often
    if (jsToNativeBridgeMode === undefined) {
        androidExec.setJsToNativeBridgeMode(jsToNativeModes.JS_OBJECT);
    }

    // If args is not provided, default to an empty array
    args = args || [];

    // Process any ArrayBuffers in the args into a string.
    for (var i = 0; i < args.length; i++) {
        if (utils.typeName(args[i]) == 'ArrayBuffer') {
            args[i] = base64.fromArrayBuffer(args[i]);
        }
    }

    var callbackId = service + cordova.callbackId++,
        argsJson = JSON.stringify(args);
    if (success || fail) {
        cordova.callbacks[callbackId] = {success:success, fail:fail};
    }

    var msgs = nativeApiProvider.get().exec(bridgeSecret, service, action, callbackId, argsJson);
    // If argsJson was received by Java as null, try again with the PROMPT bridge mode.
    // This happens in rare circumstances, such as when certain Unicode characters are passed over the bridge on a Galaxy S2.  See CB-2666.
    if (jsToNativeBridgeMode == jsToNativeModes.JS_OBJECT && msgs === "@Null arguments.") {
        androidExec.setJsToNativeBridgeMode(jsToNativeModes.PROMPT);
        androidExec(success, fail, service, action, args);
        androidExec.setJsToNativeBridgeMode(jsToNativeModes.JS_OBJECT);
    } else if (msgs) {
        messagesFromNative.push(msgs);
        // Always process async to avoid exceptions messing up stack.
        nextTick(processMessages);
    }
}

androidExec.init = function() {
    //CB-11828
    //This failsafe checks the version of Android and if it's Jellybean, it switches it to
    //using the Online Event bridge for communicating from Native to JS
    //
    //It's ugly, but it's necessary.
    var check = navigator.userAgent.toLowerCase().match(/android\s[0-9].[0-9]/);
    var version_code = check && check[0].match(/4.[0-3].*/);
    if (version_code != null && nativeToJsBridgeMode == nativeToJsModes.EVAL_BRIDGE) {
      nativeToJsBridgeMode = nativeToJsModes.ONLINE_EVENT;
    }

    bridgeSecret = +prompt('', 'gap_init:' + nativeToJsBridgeMode);
    channel.onNativeReady.fire();
};

function pollOnceFromOnlineEvent() {
    pollOnce(true);
}

function pollOnce(opt_fromOnlineEvent) {
    if (bridgeSecret < 0) {
        // This can happen when the NativeToJsMessageQueue resets the online state on page transitions.
        // We know there's nothing to retrieve, so no need to poll.
        return;
    }
    var msgs = nativeApiProvider.get().retrieveJsMessages(bridgeSecret, !!opt_fromOnlineEvent);
    if (msgs) {
        messagesFromNative.push(msgs);
        // Process sync since we know we're already top-of-stack.
        processMessages();
    }
}

function pollingTimerFunc() {
    if (pollEnabled) {
        pollOnce();
        setTimeout(pollingTimerFunc, 50);
    }
}

function hookOnlineApis() {
    function proxyEvent(e) {
        cordova.fireWindowEvent(e.type);
    }
    // The network module takes care of firing online and offline events.
    // It currently fires them only on document though, so we bridge them
    // to window here (while first listening for exec()-releated online/offline
    // events).
    window.addEventListener('online', pollOnceFromOnlineEvent, false);
    window.addEventListener('offline', pollOnceFromOnlineEvent, false);
    cordova.addWindowEventHandler('online');
    cordova.addWindowEventHandler('offline');
    document.addEventListener('online', proxyEvent, false);
    document.addEventListener('offline', proxyEvent, false);
}

hookOnlineApis();

androidExec.jsToNativeModes = jsToNativeModes;
androidExec.nativeToJsModes = nativeToJsModes;

androidExec.setJsToNativeBridgeMode = function(mode) {
    if (mode == jsToNativeModes.JS_OBJECT && !window._cordovaNative) {
        mode = jsToNativeModes.PROMPT;
    }
    nativeApiProvider.setPreferPrompt(mode == jsToNativeModes.PROMPT);
    jsToNativeBridgeMode = mode;
};

androidExec.setNativeToJsBridgeMode = function(mode) {
    if (mode == nativeToJsBridgeMode) {
        return;
    }
    if (nativeToJsBridgeMode == nativeToJsModes.POLLING) {
        pollEnabled = false;
    }

    nativeToJsBridgeMode = mode;
    // Tell the native side to switch modes.
    // Otherwise, it will be set by androidExec.init()
    if (bridgeSecret >= 0) {
        nativeApiProvider.get().setNativeToJsBridgeMode(bridgeSecret, mode);
    }

    if (mode == nativeToJsModes.POLLING) {
        pollEnabled = true;
        setTimeout(pollingTimerFunc, 1);
    }
};

function buildPayload(payload, message) {
    var payloadKind = message.charAt(0);
    if (payloadKind == 's') {
        payload.push(message.slice(1));
    } else if (payloadKind == 't') {
        payload.push(true);
    } else if (payloadKind == 'f') {
        payload.push(false);
    } else if (payloadKind == 'N') {
        payload.push(null);
    } else if (payloadKind == 'n') {
        payload.push(+message.slice(1));
    } else if (payloadKind == 'A') {
        var data = message.slice(1);
        payload.push(base64.toArrayBuffer(data));
    } else if (payloadKind == 'S') {
        payload.push(window.atob(message.slice(1)));
    } else if (payloadKind == 'M') {
        var multipartMessages = message.slice(1);
        while (multipartMessages !== "") {
            var spaceIdx = multipartMessages.indexOf(' ');
            var msgLen = +multipartMessages.slice(0, spaceIdx);
            var multipartMessage = multipartMessages.substr(spaceIdx + 1, msgLen);
            multipartMessages = multipartMessages.slice(spaceIdx + msgLen + 1);
            buildPayload(payload, multipartMessage);
        }
    } else {
        payload.push(JSON.parse(message));
    }
}

// Processes a single message, as encoded by NativeToJsMessageQueue.java.
function processMessage(message) {
    var firstChar = message.charAt(0);
    if (firstChar == 'J') {
        // This is deprecated on the .java side. It doesn't work with CSP enabled.
        eval(message.slice(1));
    } else if (firstChar == 'S' || firstChar == 'F') {
        var success = firstChar == 'S';
        var keepCallback = message.charAt(1) == '1';
        var spaceIdx = message.indexOf(' ', 2);
        var status = +message.slice(2, spaceIdx);
        var nextSpaceIdx = message.indexOf(' ', spaceIdx + 1);
        var callbackId = message.slice(spaceIdx + 1, nextSpaceIdx);
        var payloadMessage = message.slice(nextSpaceIdx + 1);
        var payload = [];
        buildPayload(payload, payloadMessage);
        cordova.callbackFromNative(callbackId, success, status, payload, keepCallback);
    } else {
        console.log("processMessage failed: invalid message: " + JSON.stringify(message));
    }
}

function processMessages() {
    // Check for the reentrant case.
    if (isProcessing) {
        return;
    }
    if (messagesFromNative.length === 0) {
        return;
    }
    isProcessing = true;
    try {
        var msg = popMessageFromQueue();
        // The Java side can send a * message to indicate that it
        // still has messages waiting to be retrieved.
        if (msg == '*' && messagesFromNative.length === 0) {
            nextTick(pollOnce);
            return;
        }
        processMessage(msg);
    } finally {
        isProcessing = false;
        if (messagesFromNative.length > 0) {
            nextTick(processMessages);
        }
    }
}

function popMessageFromQueue() {
    var messageBatch = messagesFromNative.shift();
    if (messageBatch == '*') {
        return '*';
    }

    var spaceIdx = messageBatch.indexOf(' ');
    var msgLen = +messageBatch.slice(0, spaceIdx);
    var message = messageBatch.substr(spaceIdx + 1, msgLen);
    messageBatch = messageBatch.slice(spaceIdx + msgLen + 1);
    if (messageBatch) {
        messagesFromNative.unshift(messageBatch);
    }
    return message;
}

module.exports = androidExec;

},{"cordova":"cordova","cordova/android/nativeapiprovider":"cordova/android/nativeapiprovider","cordova/base64":"cordova/base64","cordova/channel":"cordova/channel","cordova/utils":"cordova/utils"}],"cordova/init":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var channel = require('cordova/channel');
var cordova = require('cordova');
var modulemapper = require('cordova/modulemapper');
var platform = require('cordova/platform');
var pluginloader = require('cordova/pluginloader');
var utils = require('cordova/utils');

var platformInitChannelsArray = [channel.onDOMContentLoaded, channel.onNativeReady, channel.onPluginsReady];

// setting exec
cordova.exec = require('cordova/exec');

function logUnfiredChannels (arr) {
    for (var i = 0; i < arr.length; ++i) {
        if (arr[i].state !== 2) {
            console.log('Channel not fired: ' + arr[i].type);
        }
    }
}

window.setTimeout(function () {
    if (channel.onDeviceReady.state !== 2) {
        console.log('deviceready has not fired after 5 seconds.');
        logUnfiredChannels(platformInitChannelsArray);
        logUnfiredChannels(channel.deviceReadyChannelsArray);
    }
}, 5000);

// Replace navigator before any modules are required(), to ensure it happens as soon as possible.
// We replace it so that properties that can't be clobbered can instead be overridden.
function replaceNavigator (origNavigator) {
    var CordovaNavigator = function () {};
    CordovaNavigator.prototype = origNavigator;
    var newNavigator = new CordovaNavigator();
    // This work-around really only applies to new APIs that are newer than Function.bind.
    // Without it, APIs such as getGamepads() break.
    if (CordovaNavigator.bind) {
        for (var key in origNavigator) {
            if (typeof origNavigator[key] === 'function') {
                newNavigator[key] = origNavigator[key].bind(origNavigator);
            } else {
                (function (k) {
                    utils.defineGetterSetter(newNavigator, key, function () {
                        return origNavigator[k];
                    });
                })(key);
            }
        }
    }
    return newNavigator;
}
if (window.navigator) {
    window.navigator = replaceNavigator(window.navigator);
}

if (!window.console) {
    window.console = {
        log: function () {}
    };
}
if (!window.console.warn) {
    window.console.warn = function (msg) {
        this.log('warn: ' + msg);
    };
}

// Register pause, resume and deviceready channels as events on document.
channel.onPause = cordova.addDocumentEventHandler('pause');
channel.onResume = cordova.addDocumentEventHandler('resume');
channel.onActivated = cordova.addDocumentEventHandler('activated');
channel.onDeviceReady = cordova.addStickyDocumentEventHandler('deviceready');

// Listen for DOMContentLoaded and notify our channel subscribers.
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    channel.onDOMContentLoaded.fire();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        channel.onDOMContentLoaded.fire();
    }, false);
}

// _nativeReady is global variable that the native side can set
// to signify that the native code is ready. It is a global since
// it may be called before any cordova JS is ready.
if (window._nativeReady) {
    channel.onNativeReady.fire();
}

// Call the platform-specific initialization.
platform.bootstrap && platform.bootstrap();

// Wrap in a setTimeout to support the use-case of having plugin JS appended to cordova.js.
// The delay allows the attached modules to be defined before the plugin loader looks for them.
setTimeout(function () {
    pluginloader.load(function () {
        channel.onPluginsReady.fire();
    });
}, 0);

/**
 * Create all cordova objects once native side is ready.
 */
channel.join(function () {
    modulemapper.mapModules(window);

    platform.initialize && platform.initialize();

    // Fire event to notify that all objects are created
    channel.onCordovaReady.fire();

    // Fire onDeviceReady event once page has fully loaded, all
    // constructors have run and cordova info has been received from native
    // side.
    channel.join(function () {
        require('cordova').fireDocumentEvent('deviceready');
    }, channel.deviceReadyChannelsArray);

}, platformInitChannelsArray);

},{"cordova":"cordova","cordova/channel":"cordova/channel","cordova/exec":"cordova/exec","cordova/modulemapper":"cordova/modulemapper","cordova/platform":"cordova/platform","cordova/pluginloader":"cordova/pluginloader","cordova/utils":"cordova/utils"}],"cordova/modulemapper":[function(require,module,exports){
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var builder = require('cordova/builder');
var symbolList = [];
var deprecationMap;

exports.reset = function () {
    symbolList = [];
    deprecationMap = {};
};

function addEntry (strategy, moduleName, symbolPath, opt_deprecationMessage) {
    symbolList.push(strategy, moduleName, symbolPath);
    if (opt_deprecationMessage) {
        deprecationMap[symbolPath] = opt_deprecationMessage;
    }
}

// Note: Android 2.3 does have Function.bind().
exports.clobbers = function (moduleName, symbolPath, opt_deprecationMessage) {
    addEntry('c', moduleName, symbolPath, opt_deprecationMessage);
};

exports.merges = function (moduleName, symbolPath, opt_deprecationMessage) {
    addEntry('m', moduleName, symbolPath, opt_deprecationMessage);
};

exports.defaults = function (moduleName, symbolPath, opt_deprecationMessage) {
    addEntry('d', moduleName, symbolPath, opt_deprecationMessage);
};

exports.runs = function (moduleName) {
    addEntry('r', moduleName, null);
};

function prepareNamespace (symbolPath, context) {
    if (!symbolPath) {
        return context;
    }
    var parts = symbolPath.split('.');
    var cur = context;
    for (var i = 0, part; part = parts[i]; ++i) { // eslint-disable-line no-cond-assign
        cur = cur[part] = cur[part] || {};
    }
    return cur;
}

exports.mapModules = function (context) {
    var origSymbols = {};
    context.CDV_origSymbols = origSymbols;
    for (var i = 0, len = symbolList.length; i < len; i += 3) {
        var strategy = symbolList[i];
        var moduleName = symbolList[i + 1];
        var module = require(moduleName);
        // <runs/>
        if (strategy === 'r') {
            continue;
        }
        var symbolPath = symbolList[i + 2];
        var lastDot = symbolPath.lastIndexOf('.');
        var namespace = symbolPath.substr(0, lastDot);
        var lastName = symbolPath.substr(lastDot + 1);

        var deprecationMsg = symbolPath in deprecationMap ? 'Access made to deprecated symbol: ' + symbolPath + '. ' + deprecationMsg : null;
        var parentObj = prepareNamespace(namespace, context);
        var target = parentObj[lastName];

        if (strategy === 'm' && target) {
            builder.recursiveMerge(target, module);
        } else if ((strategy === 'd' && !target) || (strategy !== 'd')) {
            if (!(symbolPath in origSymbols)) {
                origSymbols[symbolPath] = target;
            }
            builder.assignOrWrapInDeprecateGetter(parentObj, lastName, module, deprecationMsg);
        }
    }
};

exports.getOriginalSymbol = function (context, symbolPath) {
    var origSymbols = context.CDV_origSymbols;
    if (origSymbols && (symbolPath in origSymbols)) {
        return origSymbols[symbolPath];
    }
    var parts = symbolPath.split('.');
    var obj = context;
    for (var i = 0; i < parts.length; ++i) {
        obj = obj && obj[parts[i]];
    }
    return obj;
};

exports.reset();

},{"cordova/builder":"cordova/builder"}],"cordova/platform":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

// The last resume event that was received that had the result of a plugin call.
var lastResumeEvent = null;

module.exports = {
    id: 'android',
    bootstrap: function() {
        var channel = require('cordova/channel'),
            cordova = require('cordova'),
            exec = require('cordova/exec'),
            modulemapper = require('cordova/modulemapper');

        // Get the shared secret needed to use the bridge.
        exec.init();

        // TODO: Extract this as a proper plugin.
        modulemapper.clobbers('cordova/plugin/android/app', 'navigator.app');

        var APP_PLUGIN_NAME = Number(cordova.platformVersion.split('.')[0]) >= 4 ? 'CoreAndroid' : 'App';

        // Inject a listener for the backbutton on the document.
        var backButtonChannel = cordova.addDocumentEventHandler('backbutton');
        backButtonChannel.onHasSubscribersChange = function() {
            // If we just attached the first handler or detached the last handler,
            // let native know we need to override the back button.
            exec(null, null, APP_PLUGIN_NAME, "overrideBackbutton", [this.numHandlers == 1]);
        };

        // Add hardware MENU and SEARCH button handlers
        cordova.addDocumentEventHandler('menubutton');
        cordova.addDocumentEventHandler('searchbutton');

        function bindButtonChannel(buttonName) {
            // generic button bind used for volumeup/volumedown buttons
            var volumeButtonChannel = cordova.addDocumentEventHandler(buttonName + 'button');
            volumeButtonChannel.onHasSubscribersChange = function() {
                exec(null, null, APP_PLUGIN_NAME, "overrideButton", [buttonName, this.numHandlers == 1]);
            };
        }
        // Inject a listener for the volume buttons on the document.
        bindButtonChannel('volumeup');
        bindButtonChannel('volumedown');

        // The resume event is not "sticky", but it is possible that the event
        // will contain the result of a plugin call. We need to ensure that the
        // plugin result is delivered even after the event is fired (CB-10498)
        var cordovaAddEventListener = document.addEventListener;

        document.addEventListener = function(evt, handler, capture) {
            cordovaAddEventListener(evt, handler, capture);

            if (evt === 'resume' && lastResumeEvent) {
                handler(lastResumeEvent);
            }
        };

        // Let native code know we are all done on the JS side.
        // Native code will then un-hide the WebView.
        channel.onCordovaReady.subscribe(function() {
            exec(onMessageFromNative, null, APP_PLUGIN_NAME, 'messageChannel', []);
            exec(null, null, APP_PLUGIN_NAME, "show", []);
        });
    }
};

function onMessageFromNative(msg) {
    var cordova = require('cordova');
    var action = msg.action;

    switch (action)
    {
        // Button events
        case 'backbutton':
        case 'menubutton':
        case 'searchbutton':
        // App life cycle events
        case 'pause':
        // Volume events
        case 'volumedownbutton':
        case 'volumeupbutton':
            cordova.fireDocumentEvent(action);
            break;
        case 'resume':
            if(arguments.length > 1 && msg.pendingResult) {
                if(arguments.length === 2) {
                    msg.pendingResult.result = arguments[1];
                } else {
                    // The plugin returned a multipart message
                    var res = [];
                    for(var i = 1; i < arguments.length; i++) {
                        res.push(arguments[i]);
                    }
                    msg.pendingResult.result = res;
                }

                // Save the plugin result so that it can be delivered to the js
                // even if they miss the initial firing of the event
                lastResumeEvent = msg;
            }
            cordova.fireDocumentEvent(action, msg);
            break;
        default:
            throw new Error('Unknown event action ' + action);
    }
}

},{"cordova":"cordova","cordova/channel":"cordova/channel","cordova/exec":"cordova/exec","cordova/modulemapper":"cordova/modulemapper"}],"cordova/plugin/android/app":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var exec = require('cordova/exec');
var APP_PLUGIN_NAME = Number(require('cordova').platformVersion.split('.')[0]) >= 4 ? 'CoreAndroid' : 'App';

module.exports = {
    /**
    * Clear the resource cache.
    */
    clearCache:function() {
        exec(null, null, APP_PLUGIN_NAME, "clearCache", []);
    },

    /**
    * Load the url into the webview or into new browser instance.
    *
    * @param url           The URL to load
    * @param props         Properties that can be passed in to the activity:
    *      wait: int                           => wait msec before loading URL
    *      loadingDialog: "Title,Message"      => display a native loading dialog
    *      loadUrlTimeoutValue: int            => time in msec to wait before triggering a timeout error
    *      clearHistory: boolean              => clear webview history (default=false)
    *      openExternal: boolean              => open in a new browser (default=false)
    *
    * Example:
    *      navigator.app.loadUrl("http://server/myapp/index.html", {wait:2000, loadingDialog:"Wait,Loading App", loadUrlTimeoutValue: 60000});
    */
    loadUrl:function(url, props) {
        exec(null, null, APP_PLUGIN_NAME, "loadUrl", [url, props]);
    },

    /**
    * Cancel loadUrl that is waiting to be loaded.
    */
    cancelLoadUrl:function() {
        exec(null, null, APP_PLUGIN_NAME, "cancelLoadUrl", []);
    },

    /**
    * Clear web history in this web view.
    * Instead of BACK button loading the previous web page, it will exit the app.
    */
    clearHistory:function() {
        exec(null, null, APP_PLUGIN_NAME, "clearHistory", []);
    },

    /**
    * Go to previous page displayed.
    * This is the same as pressing the backbutton on Android device.
    */
    backHistory:function() {
        exec(null, null, APP_PLUGIN_NAME, "backHistory", []);
    },

    /**
    * Override the default behavior of the Android back button.
    * If overridden, when the back button is pressed, the "backKeyDown" JavaScript event will be fired.
    *
    * Note: The user should not have to call this method.  Instead, when the user
    *       registers for the "backbutton" event, this is automatically done.
    *
    * @param override        T=override, F=cancel override
    */
    overrideBackbutton:function(override) {
        exec(null, null, APP_PLUGIN_NAME, "overrideBackbutton", [override]);
    },

    /**
    * Override the default behavior of the Android volume button.
    * If overridden, when the volume button is pressed, the "volume[up|down]button"
    * JavaScript event will be fired.
    *
    * Note: The user should not have to call this method.  Instead, when the user
    *       registers for the "volume[up|down]button" event, this is automatically done.
    *
    * @param button          volumeup, volumedown
    * @param override        T=override, F=cancel override
    */
    overrideButton:function(button, override) {
        exec(null, null, APP_PLUGIN_NAME, "overrideButton", [button, override]);
    },

    /**
    * Exit and terminate the application.
    */
    exitApp:function() {
        return exec(null, null, APP_PLUGIN_NAME, "exitApp", []);
    }
};

},{"cordova":"cordova","cordova/exec":"cordova/exec"}],"cordova/plugin_list":[function(require,module,exports){
module.exports = [
  {
    "file": "www/device.js",
    "id": "cordova-plugin-device.device",
    "name": "device",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  },
  {
    "file": "www/CameraConstants.js",
    "id": "cordova-plugin-camera.Camera",
    "name": "Camera",
    "pluginId": "cordova-plugin-camera",
    "clobbers": [
      "Camera"
    ]
  },
  {
    "file": "www/CameraPopoverOptions.js",
    "id": "cordova-plugin-camera.CameraPopoverOptions",
    "name": "CameraPopoverOptions",
    "pluginId": "cordova-plugin-camera",
    "clobbers": [
      "CameraPopoverOptions"
    ]
  },
  {
    "file": "www/Camera.js",
    "id": "cordova-plugin-camera.camera",
    "name": "camera",
    "pluginId": "cordova-plugin-camera",
    "clobbers": [
      "navigator.camera"
    ]
  },
  {
    "file": "www/CameraPopoverHandle.js",
    "id": "cordova-plugin-camera.CameraPopoverHandle",
    "name": "CameraPopoverHandle",
    "pluginId": "cordova-plugin-camera",
    "clobbers": [
      "CameraPopoverHandle"
    ]
  },
  {
    "file": "www/DirectoryEntry.js",
    "id": "cordova-plugin-file.DirectoryEntry",
    "name": "DirectoryEntry",
    "pluginId": "cordova-plugin-file",
    "clobbers": [
      "window.DirectoryEntry"
    ]
  },
  {
    "file": "www/DirectoryReader.js",
    "id": "cordova-plugin-file.DirectoryReader",
    "name": "DirectoryReader",
    "pluginId": "cordova-plugin-file",
    "clobbers": [
      "window.DirectoryReader"
    ]
  },
  {
    "file": "www/Entry.js",
    "id": "cordova-plugin-file.Entry",
    "name": "Entry",
    "pluginId": "cordova-plugin-file",
    "clobbers": [
      "window.Entry"
    ]
  },
  {
    "file": "www/File.js",
    "id": "cordova-plugin-file.File",
    "name": "File",
    "pluginId": "cordova-plugin-file",
    "clobbers": [
      "window.File"
    ]
  },
  {
    "file": "www/FileEntry.js",
    "id": "cordova-plugin-file.FileEntry",
    "name": "FileEntry",
    "pluginId": "cordova-plugin-file",
    "clobbers": [
      "window.FileEntry"
    ]
  },
  {
    "file": "www/FileError.js",
    "id": "cordova-plugin-file.FileError",
    "name": "FileError",
    "pluginId": "cordova-plugin-file",
    "clobbers": [
      "window.FileError"
    ]
  },
  {
    "file": "www/FileReader.js",
    "id": "cordova-plugin-file.FileReader",
    "name": "FileReader",
    "pluginId": "cordova-plugin-file",
    "clobbers": [
      "window.FileReader"
    ]
  },
  {
    "file": "www/FileSystem.js",
    "id": "cordova-plugin-file.FileSystem",
    "name": "FileSystem",
    "pluginId": "cordova-plugin-file",
    "clobbers": [
      "window.FileSystem"
    ]
  },
  {
    "file": "www/FileUploadOptions.js",
    "id": "cordova-plugin-file.FileUploadOptions",
    "name": "FileUploadOptions",
    "pluginId": "cordova-plugin-file",
    "clobbers": [
      "window.FileUploadOptions"
    ]
  },
  {
    "file": "www/FileUploadResult.js",
    "id": "cordova-plugin-file.FileUploadResult",
    "name": "FileUploadResult",
    "pluginId": "cordova-plugin-file",
    "clobbers": [
      "window.FileUploadResult"
    ]
  },
  {
    "file": "www/FileWriter.js",
    "id": "cordova-plugin-file.FileWriter",
    "name": "FileWriter",
    "pluginId": "cordova-plugin-file",
    "clobbers": [
      "window.FileWriter"
    ]
  },
  {
    "file": "www/Flags.js",
    "id": "cordova-plugin-file.Flags",
    "name": "Flags",
    "pluginId": "cordova-plugin-file",
    "clobbers": [
      "window.Flags"
    ]
  },
  {
    "file": "www/LocalFileSystem.js",
    "id": "cordova-plugin-file.LocalFileSystem",
    "name": "LocalFileSystem",
    "pluginId": "cordova-plugin-file",
    "clobbers": [
      "window.LocalFileSystem"
    ],
    "merges": [
      "window"
    ]
  },
  {
    "file": "www/Metadata.js",
    "id": "cordova-plugin-file.Metadata",
    "name": "Metadata",
    "pluginId": "cordova-plugin-file",
    "clobbers": [
      "window.Metadata"
    ]
  },
  {
    "file": "www/ProgressEvent.js",
    "id": "cordova-plugin-file.ProgressEvent",
    "name": "ProgressEvent",
    "pluginId": "cordova-plugin-file",
    "clobbers": [
      "window.ProgressEvent"
    ]
  },
  {
    "file": "www/fileSystems.js",
    "id": "cordova-plugin-file.fileSystems",
    "name": "fileSystems",
    "pluginId": "cordova-plugin-file"
  },
  {
    "file": "www/requestFileSystem.js",
    "id": "cordova-plugin-file.requestFileSystem",
    "name": "requestFileSystem",
    "pluginId": "cordova-plugin-file",
    "clobbers": [
      "window.requestFileSystem"
    ]
  },
  {
    "file": "www/resolveLocalFileSystemURI.js",
    "id": "cordova-plugin-file.resolveLocalFileSystemURI",
    "name": "resolveLocalFileSystemURI",
    "pluginId": "cordova-plugin-file",
    "merges": [
      "window"
    ]
  },
  {
    "file": "www/browser/isChrome.js",
    "id": "cordova-plugin-file.isChrome",
    "name": "isChrome",
    "pluginId": "cordova-plugin-file",
    "runs": true
  },
  {
    "file": "www/android/FileSystem.js",
    "id": "cordova-plugin-file.androidFileSystem",
    "name": "androidFileSystem",
    "pluginId": "cordova-plugin-file",
    "merges": [
      "FileSystem"
    ]
  },
  {
    "file": "www/fileSystems-roots.js",
    "id": "cordova-plugin-file.fileSystems-roots",
    "name": "fileSystems-roots",
    "pluginId": "cordova-plugin-file",
    "runs": true
  },
  {
    "file": "www/fileSystemPaths.js",
    "id": "cordova-plugin-file.fileSystemPaths",
    "name": "fileSystemPaths",
    "pluginId": "cordova-plugin-file",
    "merges": [
      "cordova"
    ],
    "runs": true
  },
  {
    "file": "www/FileTransferError.js",
    "id": "cordova-plugin-file-transfer.FileTransferError",
    "name": "FileTransferError",
    "pluginId": "cordova-plugin-file-transfer",
    "clobbers": [
      "window.FileTransferError"
    ]
  },
  {
    "file": "www/FileTransfer.js",
    "id": "cordova-plugin-file-transfer.FileTransfer",
    "name": "FileTransfer",
    "pluginId": "cordova-plugin-file-transfer",
    "clobbers": [
      "window.FileTransfer"
    ]
  },
  {
    "file": "www/android/geolocation.js",
    "id": "cordova-plugin-geolocation.geolocation",
    "name": "geolocation",
    "pluginId": "cordova-plugin-geolocation",
    "clobbers": [
      "navigator.geolocation"
    ]
  },
  {
    "file": "www/PositionError.js",
    "id": "cordova-plugin-geolocation.PositionError",
    "name": "PositionError",
    "pluginId": "cordova-plugin-geolocation",
    "runs": true
  },
  {
    "file": "www/network.js",
    "id": "cordova-plugin-network-information.network",
    "name": "network",
    "pluginId": "cordova-plugin-network-information",
    "clobbers": [
      "navigator.connection",
      "navigator.network.connection"
    ]
  },
  {
    "file": "www/Connection.js",
    "id": "cordova-plugin-network-information.Connection",
    "name": "Connection",
    "pluginId": "cordova-plugin-network-information",
    "clobbers": [
      "Connection"
    ]
  },
  {
    "file": "www/inappbrowser.js",
    "id": "cordova-plugin-inappbrowser.inappbrowser",
    "name": "inappbrowser",
    "pluginId": "cordova-plugin-inappbrowser",
    "clobbers": [
      "cordova.InAppBrowser.open",
      "window.open"
    ]
  },
  {
    "file": "www/MediaError.js",
    "id": "cordova-plugin-media.MediaError",
    "name": "MediaError",
    "pluginId": "cordova-plugin-media",
    "clobbers": [
      "window.MediaError"
    ]
  },
  {
    "file": "www/Media.js",
    "id": "cordova-plugin-media.Media",
    "name": "Media",
    "pluginId": "cordova-plugin-media",
    "clobbers": [
      "window.Media"
    ]
  },
  {
    "file": "www/CaptureAudioOptions.js",
    "id": "cordova-plugin-media-capture.CaptureAudioOptions",
    "name": "CaptureAudioOptions",
    "pluginId": "cordova-plugin-media-capture",
    "clobbers": [
      "CaptureAudioOptions"
    ]
  },
  {
    "file": "www/CaptureImageOptions.js",
    "id": "cordova-plugin-media-capture.CaptureImageOptions",
    "name": "CaptureImageOptions",
    "pluginId": "cordova-plugin-media-capture",
    "clobbers": [
      "CaptureImageOptions"
    ]
  },
  {
    "file": "www/CaptureVideoOptions.js",
    "id": "cordova-plugin-media-capture.CaptureVideoOptions",
    "name": "CaptureVideoOptions",
    "pluginId": "cordova-plugin-media-capture",
    "clobbers": [
      "CaptureVideoOptions"
    ]
  },
  {
    "file": "www/CaptureError.js",
    "id": "cordova-plugin-media-capture.CaptureError",
    "name": "CaptureError",
    "pluginId": "cordova-plugin-media-capture",
    "clobbers": [
      "CaptureError"
    ]
  },
  {
    "file": "www/MediaFileData.js",
    "id": "cordova-plugin-media-capture.MediaFileData",
    "name": "MediaFileData",
    "pluginId": "cordova-plugin-media-capture",
    "clobbers": [
      "MediaFileData"
    ]
  },
  {
    "file": "www/MediaFile.js",
    "id": "cordova-plugin-media-capture.MediaFile",
    "name": "MediaFile",
    "pluginId": "cordova-plugin-media-capture",
    "clobbers": [
      "MediaFile"
    ]
  },
  {
    "file": "www/helpers.js",
    "id": "cordova-plugin-media-capture.helpers",
    "name": "helpers",
    "pluginId": "cordova-plugin-media-capture",
    "runs": true
  },
  {
    "file": "www/capture.js",
    "id": "cordova-plugin-media-capture.capture",
    "name": "capture",
    "pluginId": "cordova-plugin-media-capture",
    "clobbers": [
      "navigator.device.capture"
    ]
  },
  {
    "file": "www/android/init.js",
    "id": "cordova-plugin-media-capture.init",
    "name": "init",
    "pluginId": "cordova-plugin-media-capture",
    "runs": true
  },
  {
    "file": "www/notification.js",
    "id": "cordova-plugin-dialogs.notification",
    "name": "notification",
    "pluginId": "cordova-plugin-dialogs",
    "merges": [
      "navigator.notification"
    ]
  },
  {
    "file": "www/android/notification.js",
    "id": "cordova-plugin-dialogs.notification_android",
    "name": "notification_android",
    "pluginId": "cordova-plugin-dialogs",
    "merges": [
      "navigator.notification"
    ]
  },
  {
    "file": "www/Acceleration.js",
    "id": "cordova-plugin-device-motion.Acceleration",
    "name": "Acceleration",
    "pluginId": "cordova-plugin-device-motion",
    "clobbers": [
      "Acceleration"
    ]
  },
  {
    "file": "www/accelerometer.js",
    "id": "cordova-plugin-device-motion.accelerometer",
    "name": "accelerometer",
    "pluginId": "cordova-plugin-device-motion",
    "clobbers": [
      "navigator.accelerometer"
    ]
  },
  {
    "file": "www/CompassError.js",
    "id": "cordova-plugin-device-orientation.CompassError",
    "name": "CompassError",
    "pluginId": "cordova-plugin-device-orientation",
    "clobbers": [
      "CompassError"
    ]
  },
  {
    "file": "www/CompassHeading.js",
    "id": "cordova-plugin-device-orientation.CompassHeading",
    "name": "CompassHeading",
    "pluginId": "cordova-plugin-device-orientation",
    "clobbers": [
      "CompassHeading"
    ]
  },
  {
    "file": "www/compass.js",
    "id": "cordova-plugin-device-orientation.compass",
    "name": "compass",
    "pluginId": "cordova-plugin-device-orientation",
    "clobbers": [
      "navigator.compass"
    ]
  },
  {
    "file": "www/contacts.js",
    "id": "cordova-plugin-contacts.contacts",
    "name": "contacts",
    "pluginId": "cordova-plugin-contacts",
    "clobbers": [
      "navigator.contacts"
    ]
  },
  {
    "file": "www/Contact.js",
    "id": "cordova-plugin-contacts.Contact",
    "name": "Contact",
    "pluginId": "cordova-plugin-contacts",
    "clobbers": [
      "Contact"
    ]
  },
  {
    "file": "www/convertUtils.js",
    "id": "cordova-plugin-contacts.convertUtils",
    "name": "convertUtils",
    "pluginId": "cordova-plugin-contacts"
  },
  {
    "file": "www/ContactAddress.js",
    "id": "cordova-plugin-contacts.ContactAddress",
    "name": "ContactAddress",
    "pluginId": "cordova-plugin-contacts",
    "clobbers": [
      "ContactAddress"
    ]
  },
  {
    "file": "www/ContactError.js",
    "id": "cordova-plugin-contacts.ContactError",
    "name": "ContactError",
    "pluginId": "cordova-plugin-contacts",
    "clobbers": [
      "ContactError"
    ]
  },
  {
    "file": "www/ContactField.js",
    "id": "cordova-plugin-contacts.ContactField",
    "name": "ContactField",
    "pluginId": "cordova-plugin-contacts",
    "clobbers": [
      "ContactField"
    ]
  },
  {
    "file": "www/ContactFindOptions.js",
    "id": "cordova-plugin-contacts.ContactFindOptions",
    "name": "ContactFindOptions",
    "pluginId": "cordova-plugin-contacts",
    "clobbers": [
      "ContactFindOptions"
    ]
  },
  {
    "file": "www/ContactName.js",
    "id": "cordova-plugin-contacts.ContactName",
    "name": "ContactName",
    "pluginId": "cordova-plugin-contacts",
    "clobbers": [
      "ContactName"
    ]
  },
  {
    "file": "www/ContactOrganization.js",
    "id": "cordova-plugin-contacts.ContactOrganization",
    "name": "ContactOrganization",
    "pluginId": "cordova-plugin-contacts",
    "clobbers": [
      "ContactOrganization"
    ]
  },
  {
    "file": "www/ContactFieldType.js",
    "id": "cordova-plugin-contacts.ContactFieldType",
    "name": "ContactFieldType",
    "pluginId": "cordova-plugin-contacts",
    "merges": [
      ""
    ]
  },
  {
    "file": "www/battery.js",
    "id": "cordova-plugin-battery-status.battery",
    "name": "battery",
    "pluginId": "cordova-plugin-battery-status",
    "clobbers": [
      "navigator.battery"
    ]
  },
  {
    "file": "www/SQLitePlugin.js",
    "id": "cordova-sqlite-storage.SQLitePlugin",
    "name": "SQLitePlugin",
    "pluginId": "cordova-sqlite-storage",
    "clobbers": [
      "SQLitePlugin"
    ]
  },
  {
    "file": "www/TouchID.js",
    "id": "cordova-plugin-touch-id.TouchID",
    "name": "TouchID",
    "pluginId": "cordova-plugin-touch-id",
    "clobbers": [
      "window.plugins.touchid"
    ]
  },
  {
    "file": "zip.js",
    "id": "cordova-plugin-zip.Zip",
    "name": "Zip",
    "pluginId": "cordova-plugin-zip",
    "clobbers": [
      "zip"
    ]
  },
  {
    "file": "www/wechat.js",
    "id": "cordova-plugin-wechat.Wechat",
    "name": "Wechat",
    "pluginId": "cordova-plugin-wechat",
    "clobbers": [
      "Wechat"
    ]
  },
  {
    "file": "www/imagepicker.js",
    "id": "cordova-plugin-image-picker.ImagePicker",
    "name": "ImagePicker",
    "pluginId": "cordova-plugin-image-picker",
    "clobbers": [
      "plugins.imagePicker"
    ]
  }
];
module.exports.metadata = {
  "cordova-plugin-whitelist": "1.3.2",
  "cordova-plugin-device": "1.1.6",
  "cordova-plugin-camera": "2.4.1",
  "cordova-plugin-compat": "1.1.0",
  "cordova-plugin-file": "4.3.3",
  "cordova-plugin-file-transfer": "1.6.3",
  "cordova-plugin-geolocation": "2.4.3",
  "cordova-plugin-network-information": "1.3.3",
  "cordova-plugin-inappbrowser": "1.7.1",
  "cordova-plugin-media": "3.0.1",
  "cordova-plugin-media-capture": "1.4.3",
  "cordova-plugin-dialogs": "1.3.3",
  "cordova-plugin-device-motion": "1.2.5",
  "cordova-plugin-device-orientation": "1.0.7",
  "cordova-plugin-contacts": "2.3.1",
  "cordova-plugin-console": "1.0.7",
  "cordova-plugin-battery-status": "1.2.4",
  "cordova-sqlite-storage": "2.0.4",
  "cordova-plugin-touch-id": "3.2.0",
  "cordova-plugin-zip": "3.1.0",
  "cordova-plugin-wechat": "2.0.0",
  "cordova-plugin-image-picker": "1.1.1"
};

},{}],"cordova/pluginloader":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var modulemapper = require('cordova/modulemapper');

// Handler for the cordova_plugins.js content.
// See plugman's plugin_loader.js for the details of this object.
function handlePluginsObject (moduleList) {
    // if moduleList is not defined or empty, we've nothing to do
    if (!moduleList || !moduleList.length) {
        return;
    }

    // Loop through all the modules and then through their clobbers and merges.
    for (var i = 0, module; module = moduleList[i]; i++) { // eslint-disable-line no-cond-assign
        if (module.clobbers && module.clobbers.length) {
            for (var j = 0; j < module.clobbers.length; j++) {
                modulemapper.clobbers(module.id, module.clobbers[j]);
            }
        }

        if (module.merges && module.merges.length) {
            for (var k = 0; k < module.merges.length; k++) {
                modulemapper.merges(module.id, module.merges[k]);
            }
        }

        // Finally, if runs is truthy we want to simply require() the module.
        if (module.runs) {
            modulemapper.runs(module.id);
        }
    }
}

// Loads all plugins' js-modules. Plugin loading is syncronous in browserified bundle
// but the method accepts callback to be compatible with non-browserify flow.
// onDeviceReady is blocked on onPluginsReady. onPluginsReady is fired when there are
// no plugins to load, or they are all done.
exports.load = function (callback) {
    var moduleList = require('cordova/plugin_list');
    handlePluginsObject(moduleList);

    callback();
};

},{"cordova/modulemapper":"cordova/modulemapper","cordova/plugin_list":"cordova/plugin_list"}],"cordova/urlutil":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * For already absolute URLs, returns what is passed in.
 * For relative URLs, converts them to absolute ones.
 */
exports.makeAbsolute = function makeAbsolute (url) {
    var anchorEl = document.createElement('a');
    anchorEl.href = url;
    return anchorEl.href;
};

},{}],"cordova/utils":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var utils = exports;

/**
 * Defines a property getter / setter for obj[key].
 */
utils.defineGetterSetter = function (obj, key, getFunc, opt_setFunc) {
    if (Object.defineProperty) {
        var desc = {
            get: getFunc,
            configurable: true
        };
        if (opt_setFunc) {
            desc.set = opt_setFunc;
        }
        Object.defineProperty(obj, key, desc);
    } else {
        obj.__defineGetter__(key, getFunc);
        if (opt_setFunc) {
            obj.__defineSetter__(key, opt_setFunc);
        }
    }
};

/**
 * Defines a property getter for obj[key].
 */
utils.defineGetter = utils.defineGetterSetter;

utils.arrayIndexOf = function (a, item) {
    if (a.indexOf) {
        return a.indexOf(item);
    }
    var len = a.length;
    for (var i = 0; i < len; ++i) {
        if (a[i] === item) {
            return i;
        }
    }
    return -1;
};

/**
 * Returns whether the item was found in the array.
 */
utils.arrayRemove = function (a, item) {
    var index = utils.arrayIndexOf(a, item);
    if (index !== -1) {
        a.splice(index, 1);
    }
    return index !== -1;
};

utils.typeName = function (val) {
    return Object.prototype.toString.call(val).slice(8, -1);
};

/**
 * Returns an indication of whether the argument is an array or not
 */
utils.isArray = Array.isArray ||
                function (a) { return utils.typeName(a) === 'Array'; };

/**
 * Returns an indication of whether the argument is a Date or not
 */
utils.isDate = function (d) {
    return (d instanceof Date);
};

/**
 * Does a deep clone of the object.
 */
utils.clone = function (obj) {
    if (!obj || typeof obj === 'function' || utils.isDate(obj) || typeof obj !== 'object') {
        return obj;
    }

    var retVal, i;

    if (utils.isArray(obj)) {
        retVal = [];
        for (i = 0; i < obj.length; ++i) {
            retVal.push(utils.clone(obj[i]));
        }
        return retVal;
    }

    retVal = {};
    for (i in obj) {
        // https://issues.apache.org/jira/browse/CB-11522 'unknown' type may be returned in
        // custom protocol activation case on Windows Phone 8.1 causing "No such interface supported" exception
        // on cloning.
        if ((!(i in retVal) || retVal[i] !== obj[i]) && typeof obj[i] !== 'undefined' && typeof obj[i] !== 'unknown') { // eslint-disable-line valid-typeof
            retVal[i] = utils.clone(obj[i]);
        }
    }
    return retVal;
};

/**
 * Returns a wrapped version of the function
 */
utils.close = function (context, func, params) {
    return function () {
        var args = params || arguments;
        return func.apply(context, args);
    };
};

// ------------------------------------------------------------------------------
function UUIDcreatePart (length) {
    var uuidpart = '';
    for (var i = 0; i < length; i++) {
        var uuidchar = parseInt((Math.random() * 256), 10).toString(16);
        if (uuidchar.length === 1) {
            uuidchar = '0' + uuidchar;
        }
        uuidpart += uuidchar;
    }
    return uuidpart;
}

/**
 * Create a UUID
 */
utils.createUUID = function () {
    return UUIDcreatePart(4) + '-' +
        UUIDcreatePart(2) + '-' +
        UUIDcreatePart(2) + '-' +
        UUIDcreatePart(2) + '-' +
        UUIDcreatePart(6);
};

/**
 * Extends a child object from a parent object using classical inheritance
 * pattern.
 */
utils.extend = (function () {
    // proxy used to establish prototype chain
    var F = function () {};
    // extend Child from Parent
    return function (Child, Parent) {

        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.__super__ = Parent.prototype;
        Child.prototype.constructor = Child;
    };
}());

/**
 * Alerts a message in any available way: alert or console.log.
 */
utils.alert = function (msg) {
    if (window.alert) {
        window.alert(msg);
    } else if (console && console.log) {
        console.log(msg);
    }
};

},{}],"cordova":[function(require,module,exports){
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

// Workaround for Windows 10 in hosted environment case
// http://www.w3.org/html/wg/drafts/html/master/browsers.html#named-access-on-the-window-object
if (window.cordova && !(window.cordova instanceof HTMLElement)) { // eslint-disable-line no-undef
    throw new Error('cordova already defined');
}

var channel = require('cordova/channel');
var platform = require('cordova/platform');

/**
 * Intercept calls to addEventListener + removeEventListener and handle deviceready,
 * resume, and pause events.
 */
var m_document_addEventListener = document.addEventListener;
var m_document_removeEventListener = document.removeEventListener;
var m_window_addEventListener = window.addEventListener;
var m_window_removeEventListener = window.removeEventListener;

/**
 * Houses custom event handlers to intercept on document + window event listeners.
 */
var documentEventHandlers = {};
var windowEventHandlers = {};

document.addEventListener = function (evt, handler, capture) {
    var e = evt.toLowerCase();
    if (typeof documentEventHandlers[e] !== 'undefined') {
        documentEventHandlers[e].subscribe(handler);
    } else {
        m_document_addEventListener.call(document, evt, handler, capture);
    }
};

window.addEventListener = function (evt, handler, capture) {
    var e = evt.toLowerCase();
    if (typeof windowEventHandlers[e] !== 'undefined') {
        windowEventHandlers[e].subscribe(handler);
    } else {
        m_window_addEventListener.call(window, evt, handler, capture);
    }
};

document.removeEventListener = function (evt, handler, capture) {
    var e = evt.toLowerCase();
    // If unsubscribing from an event that is handled by a plugin
    if (typeof documentEventHandlers[e] !== 'undefined') {
        documentEventHandlers[e].unsubscribe(handler);
    } else {
        m_document_removeEventListener.call(document, evt, handler, capture);
    }
};

window.removeEventListener = function (evt, handler, capture) {
    var e = evt.toLowerCase();
    // If unsubscribing from an event that is handled by a plugin
    if (typeof windowEventHandlers[e] !== 'undefined') {
        windowEventHandlers[e].unsubscribe(handler);
    } else {
        m_window_removeEventListener.call(window, evt, handler, capture);
    }
};

function createEvent (type, data) {
    var event = document.createEvent('Events');
    event.initEvent(type, false, false);
    if (data) {
        for (var i in data) {
            if (data.hasOwnProperty(i)) {
                event[i] = data[i];
            }
        }
    }
    return event;
}

/* eslint-disable no-undef */
var cordova = {
    platformVersion: PLATFORM_VERSION_BUILD_LABEL,
    version: PLATFORM_VERSION_BUILD_LABEL,
    require: require,
    platformId: platform.id,

    /* eslint-enable no-undef */

    /**
     * Methods to add/remove your own addEventListener hijacking on document + window.
     */
    addWindowEventHandler: function (event) {
        return (windowEventHandlers[event] = channel.create(event));
    },
    addStickyDocumentEventHandler: function (event) {
        return (documentEventHandlers[event] = channel.createSticky(event));
    },
    addDocumentEventHandler: function (event) {
        return (documentEventHandlers[event] = channel.create(event));
    },
    removeWindowEventHandler: function (event) {
        delete windowEventHandlers[event];
    },
    removeDocumentEventHandler: function (event) {
        delete documentEventHandlers[event];
    },
    /**
     * Retrieve original event handlers that were replaced by Cordova
     *
     * @return object
     */
    getOriginalHandlers: function () {
        return {'document': {'addEventListener': m_document_addEventListener, 'removeEventListener': m_document_removeEventListener},
            'window': {'addEventListener': m_window_addEventListener, 'removeEventListener': m_window_removeEventListener}};
    },
    /**
     * Method to fire event from native code
     * bNoDetach is required for events which cause an exception which needs to be caught in native code
     */
    fireDocumentEvent: function (type, data, bNoDetach) {
        var evt = createEvent(type, data);
        if (typeof documentEventHandlers[type] !== 'undefined') {
            if (bNoDetach) {
                documentEventHandlers[type].fire(evt);
            } else {
                setTimeout(function () {
                    // Fire deviceready on listeners that were registered before cordova.js was loaded.
                    if (type === 'deviceready') {
                        document.dispatchEvent(evt);
                    }
                    documentEventHandlers[type].fire(evt);
                }, 0);
            }
        } else {
            document.dispatchEvent(evt);
        }
    },
    fireWindowEvent: function (type, data) {
        var evt = createEvent(type, data);
        if (typeof windowEventHandlers[type] !== 'undefined') {
            setTimeout(function () {
                windowEventHandlers[type].fire(evt);
            }, 0);
        } else {
            window.dispatchEvent(evt);
        }
    },

    /**
     * Plugin callback mechanism.
     */
    // Randomize the starting callbackId to avoid collisions after refreshing or navigating.
    // This way, it's very unlikely that any new callback would get the same callbackId as an old callback.
    callbackId: Math.floor(Math.random() * 2000000000),
    callbacks: {},
    callbackStatus: {
        NO_RESULT: 0,
        OK: 1,
        CLASS_NOT_FOUND_EXCEPTION: 2,
        ILLEGAL_ACCESS_EXCEPTION: 3,
        INSTANTIATION_EXCEPTION: 4,
        MALFORMED_URL_EXCEPTION: 5,
        IO_EXCEPTION: 6,
        INVALID_ACTION: 7,
        JSON_EXCEPTION: 8,
        ERROR: 9
    },
    /**
     * Called by native code when returning successful result from an action.
     */
    callbackSuccess: function (callbackId, args) {
        this.callbackFromNative(callbackId, true, args.status, [args.message], args.keepCallback);
    },
    /**
     * Called by native code when returning error result from an action.
     */
    callbackError: function (callbackId, args) {
        // TODO: Deprecate callbackSuccess and callbackError in favour of callbackFromNative.
        // Derive success from status.
        this.callbackFromNative(callbackId, false, args.status, [args.message], args.keepCallback);
    },
    /**
     * Called by native code when returning the result from an action.
     */
    callbackFromNative: function (callbackId, isSuccess, status, args, keepCallback) {
        try {
            var callback = cordova.callbacks[callbackId];
            if (callback) {
                if (isSuccess && status === cordova.callbackStatus.OK) {
                    callback.success && callback.success.apply(null, args);
                } else if (!isSuccess) {
                    callback.fail && callback.fail.apply(null, args);
                }
                /*
                else
                    Note, this case is intentionally not caught.
                    this can happen if isSuccess is true, but callbackStatus is NO_RESULT
                    which is used to remove a callback from the list without calling the callbacks
                    typically keepCallback is false in this case
                */

                // Clear callback if not expecting any more results
                if (!keepCallback) {
                    delete cordova.callbacks[callbackId];
                }
            }
        } catch (err) {
            var msg = 'Error in ' + (isSuccess ? 'Success' : 'Error') + ' callbackId: ' + callbackId + ' : ' + err;
            console && console.log && console.log(msg);
            this.fireWindowEvent('cordovacallbackerror', { 'message': msg });
            throw err;
        }
    },
    addConstructor: function (func) {
        channel.onCordovaReady.subscribe(function () {
            try {
                func();
            } catch (e) {
                console.log('Failed to run constructor: ' + e);
            }
        });
    }
};

window.cordova = module.exports = cordova;

},{"cordova/channel":"cordova/channel","cordova/platform":"cordova/platform"}]},{},["cordova/plugin_list",1]);
