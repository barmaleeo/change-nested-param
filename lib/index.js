"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = index;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function index(object, path, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (path === null) {
    return object;
  }

  var keys = path.toString().split('.');
  var currentObject = object;
  var n = 0;
  var key;

  if (!options || !options.createUndefined) {
    for (n; n < keys.length - 1; n += 1) {
      key = keys[n];

      if (_typeof(currentObject[key]) !== 'object' && !Array.isArray(currentObject[key])) {
        return object;
      }

      currentObject = currentObject[key];
    }
  }

  var output = _objectSpread({}, object);

  currentObject = output;
  var minus = false;
  var plus = false;

  for (n = 0; n < keys.length - 1; n += 1) {
    key = keys[n];

    if (key.substring(0, 1) === '-') {
      minus = true;
      key = key.substring(1);
    } else if (key.substring(0, 1) === '+') {
      plus = true;
      key = key.substring(1);
    }

    var nextObject = currentObject[key];

    if (Array.isArray(nextObject)) {
      if (minus) {
        currentObject.splice(key, 1);
        return output;
      }

      if (plus) {
        currentObject.splice(key, 0, value);
        return output;
      }

      currentObject[key] = nextObject.slice();
    } else if (_typeof(nextObject) === 'object') {
      if (minus) {
        currentObject[key] = undefined;
        return output;
      }

      currentObject[key] = _objectSpread({}, nextObject);
    } else if (options.createUndefined) {
      if (!Number.isNaN(+keys[n + 1])) {
        currentObject[key] = [];
      } else if (Array.isArray(currentObject)) {
        currentObject.push({});
        key = currentObject.length - 1;
      } else {
        currentObject[key] = {};
      }
    } else {
      return object;
    }

    currentObject = currentObject[key];
  }

  key = keys[n];

  if (key.substring(0, 1) === '-') {
    minus = true;
    key = key.substring(1);
  } else if (key.substring(0, 1) === '+') {
    plus = true;
    key = key.substring(1);
  }

  if (options.callback && typeof options.callback === 'function') {
    options.callback(currentObject, key);
  } else if (Array.isArray(currentObject)) {
    if (minus) {
      if (currentObject[key] === undefined) {
        return object;
      }

      currentObject.splice(key, 1);
    } else if (plus) {
      currentObject.splice(key, 0, value);
      return output;
    } else if (key === '*') {
      currentObject.unshift(value);
    } else if (currentObject[key] === undefined) {
      currentObject.push(value);
    } else {
      currentObject[key] = value;
    }
  } else if (minus) {
    currentObject[key] = undefined;
  } else {
    if (options.keepInitial) {
      if (currentObject["".concat(key, "Initial")] === undefined) {
        currentObject["".concat(key, "Initial")] = currentObject[key];
      }
    }

    currentObject[key] = value;

    if (options.valid !== undefined) {
      currentObject.valid = options.valid;
    }

    if (options.nameValid !== undefined) {
      currentObject["".concat(key, "Valid")] = options.nameValid;
    }
  }

  return output;
}