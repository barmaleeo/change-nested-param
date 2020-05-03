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
  if (path === null) {
    return object;
  }

  var keys = path.toString().split('.');
  var currentObject = object;
  var n = 0;

  for (n; n < keys.length - 1; n += 1) {
    if (_typeof(currentObject[keys[n]]) !== 'object' && !Array.isArray(currentObject[keys[n]])) {
      return object;
    }

    currentObject = currentObject[keys[n]];
  }

  var output = _objectSpread({}, object);

  currentObject = output;

  for (n = 0; n < keys.length - 1; n += 1) {
    if (Array.isArray(currentObject[keys[n]])) {
      currentObject[keys[n]] = currentObject[keys[n]].slice();
    } else {
      currentObject[keys[n]] = _objectSpread({}, currentObject[keys[n]]);
    }

    currentObject = currentObject[keys[n]];
  }

  currentObject[keys[n]] = value;
  return output;
}