(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ChangeNestedParam"] = factory();
	else
		root["ChangeNestedParam"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return index; });\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction index(object, path, value) {\n  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};\n\n  if (path === null) {\n    return object;\n  }\n\n  var keys = path.toString().split('.');\n  var currentObject = object;\n  var n = 0;\n  var key;\n\n  if (!options || !options.createUndefined) {\n    for (n; n < keys.length - 1; n += 1) {\n      key = keys[n];\n\n      if (_typeof(currentObject[key]) !== 'object' && !Array.isArray(currentObject[key])) {\n        return object;\n      }\n\n      currentObject = currentObject[key];\n    }\n  }\n\n  var output = _objectSpread({}, object);\n\n  currentObject = output;\n  var minus = false;\n\n  for (n = 0; n < keys.length - 1; n += 1) {\n    key = keys[n];\n\n    if (key.substring(0, 1) === '-') {\n      minus = true;\n      key = key.substring(1);\n    }\n\n    var nextObject = currentObject[key];\n\n    if (Array.isArray(nextObject)) {\n      if (minus) {\n        currentObject.splice(key, 1);\n        return output;\n      }\n\n      currentObject[key] = nextObject.slice();\n    } else if (_typeof(nextObject) === 'object') {\n      if (minus) {\n        currentObject[key] = undefined;\n        return output;\n      }\n\n      currentObject[key] = _objectSpread({}, nextObject);\n    } else if (options.createUndefined) {\n      if (!Number.isNaN(+keys[n + 1])) {\n        currentObject[key] = [];\n      } else if (Array.isArray(currentObject)) {\n        currentObject.push({});\n        key = currentObject.length - 1;\n      } else {\n        currentObject[key] = {};\n      }\n    } else {\n      return object;\n    }\n\n    currentObject = currentObject[key];\n  }\n\n  key = keys[n];\n\n  if (key.substring(0, 1) === '-') {\n    minus = true;\n    key = key.substring(1);\n  }\n\n  if (Array.isArray(currentObject)) {\n    if (minus) {\n      if (currentObject[key] === undefined) {\n        return object;\n      }\n\n      currentObject.splice(key, 1);\n    } else if (key === '*') {\n      currentObject.unshift(value);\n    } else if (currentObject[key] === undefined) {\n      currentObject.push(value);\n    } else {\n      currentObject[key] = value;\n    }\n  } else if (minus) {\n    currentObject[key] = undefined;\n  } else {\n    currentObject[key] = value;\n\n    if (options.valid !== undefined) {\n      currentObject.valid = options.valid;\n    }\n\n    if (options.nameValid !== undefined) {\n      currentObject[\"\".concat(key, \"Valid\")] = options.nameValid;\n    }\n  }\n\n  return output;\n}\n\n//# sourceURL=webpack://ChangeNestedParam/./src/index.js?");

/***/ }),

/***/ 0:
/*!*************************!*\
  !*** multi ./src/index ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/index */\"./src/index.js\");\n\n\n//# sourceURL=webpack://ChangeNestedParam/multi_./src/index?");

/***/ })

/******/ });
});