(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@ruhnn/constant"), require("@ruhnn/util/device"), require("@ruhnn/util/promise"), require("@ruhnn/util/type"), require("@ruhnn/util/url"), require("antd"), require("antd-mobile"));
	else if(typeof define === 'function' && define.amd)
		define(["@ruhnn/constant", "@ruhnn/util/device", "@ruhnn/util/promise", "@ruhnn/util/type", "@ruhnn/util/url", "antd", "antd-mobile"], factory);
	else if(typeof exports === 'object')
		exports["@ruhnn/fetcher"] = factory(require("@ruhnn/constant"), require("@ruhnn/util/device"), require("@ruhnn/util/promise"), require("@ruhnn/util/type"), require("@ruhnn/util/url"), require("antd"), require("antd-mobile"));
	else
		root["@ruhnn/fetcher"] = factory(root["@ruhnn/constant"], root["@ruhnn/util/device"], root["@ruhnn/util/promise"], root["@ruhnn/util/type"], root["@ruhnn/util/url"], root["antd"], root["antd-mobile"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__ruhnn_constant__, __WEBPACK_EXTERNAL_MODULE__ruhnn_util_device__, __WEBPACK_EXTERNAL_MODULE__ruhnn_util_promise__, __WEBPACK_EXTERNAL_MODULE__ruhnn_util_type__, __WEBPACK_EXTERNAL_MODULE__ruhnn_util_url__, __WEBPACK_EXTERNAL_MODULE_antd__, __WEBPACK_EXTERNAL_MODULE_antd_mobile__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../../git/ruhnn-pack/node_modules/process/browser.js":
/*!***************************************************************************!*\
  !*** /Users/ZenYu/Desktop/git/ruhnn-pack/node_modules/process/browser.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {}; // cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n  throw new Error('setTimeout has not been defined');\n}\n\nfunction defaultClearTimeout() {\n  throw new Error('clearTimeout has not been defined');\n}\n\n(function () {\n  try {\n    if (typeof setTimeout === 'function') {\n      cachedSetTimeout = setTimeout;\n    } else {\n      cachedSetTimeout = defaultSetTimout;\n    }\n  } catch (e) {\n    cachedSetTimeout = defaultSetTimout;\n  }\n\n  try {\n    if (typeof clearTimeout === 'function') {\n      cachedClearTimeout = clearTimeout;\n    } else {\n      cachedClearTimeout = defaultClearTimeout;\n    }\n  } catch (e) {\n    cachedClearTimeout = defaultClearTimeout;\n  }\n})();\n\nfunction runTimeout(fun) {\n  if (cachedSetTimeout === setTimeout) {\n    //normal enviroments in sane situations\n    return setTimeout(fun, 0);\n  } // if setTimeout wasn't available but was latter defined\n\n\n  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n    cachedSetTimeout = setTimeout;\n    return setTimeout(fun, 0);\n  }\n\n  try {\n    // when when somebody has screwed with setTimeout but no I.E. maddness\n    return cachedSetTimeout(fun, 0);\n  } catch (e) {\n    try {\n      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n      return cachedSetTimeout.call(null, fun, 0);\n    } catch (e) {\n      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n      return cachedSetTimeout.call(this, fun, 0);\n    }\n  }\n}\n\nfunction runClearTimeout(marker) {\n  if (cachedClearTimeout === clearTimeout) {\n    //normal enviroments in sane situations\n    return clearTimeout(marker);\n  } // if clearTimeout wasn't available but was latter defined\n\n\n  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n    cachedClearTimeout = clearTimeout;\n    return clearTimeout(marker);\n  }\n\n  try {\n    // when when somebody has screwed with setTimeout but no I.E. maddness\n    return cachedClearTimeout(marker);\n  } catch (e) {\n    try {\n      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n      return cachedClearTimeout.call(null, marker);\n    } catch (e) {\n      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n      // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n      return cachedClearTimeout.call(this, marker);\n    }\n  }\n}\n\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n  if (!draining || !currentQueue) {\n    return;\n  }\n\n  draining = false;\n\n  if (currentQueue.length) {\n    queue = currentQueue.concat(queue);\n  } else {\n    queueIndex = -1;\n  }\n\n  if (queue.length) {\n    drainQueue();\n  }\n}\n\nfunction drainQueue() {\n  if (draining) {\n    return;\n  }\n\n  var timeout = runTimeout(cleanUpNextTick);\n  draining = true;\n  var len = queue.length;\n\n  while (len) {\n    currentQueue = queue;\n    queue = [];\n\n    while (++queueIndex < len) {\n      if (currentQueue) {\n        currentQueue[queueIndex].run();\n      }\n    }\n\n    queueIndex = -1;\n    len = queue.length;\n  }\n\n  currentQueue = null;\n  draining = false;\n  runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n  var args = new Array(arguments.length - 1);\n\n  if (arguments.length > 1) {\n    for (var i = 1; i < arguments.length; i++) {\n      args[i - 1] = arguments[i];\n    }\n  }\n\n  queue.push(new Item(fun, args));\n\n  if (queue.length === 1 && !draining) {\n    runTimeout(drainQueue);\n  }\n}; // v8 likes predictible objects\n\n\nfunction Item(fun, array) {\n  this.fun = fun;\n  this.array = array;\n}\n\nItem.prototype.run = function () {\n  this.fun.apply(null, this.array);\n};\n\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\n\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) {\n  return [];\n};\n\nprocess.binding = function (name) {\n  throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () {\n  return '/';\n};\n\nprocess.chdir = function (dir) {\n  throw new Error('process.chdir is not supported');\n};\n\nprocess.umask = function () {\n  return 0;\n};\n\n//# sourceURL=webpack://@ruhnn/fetcher//Users/ZenYu/Desktop/git/ruhnn-pack/node_modules/process/browser.js?");

/***/ }),

/***/ "../../../../git/ruhnn-pack/node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (originalModule) {\n  if (!originalModule.webpackPolyfill) {\n    var module = Object.create(originalModule); // module.parent = undefined by default\n\n    if (!module.children) module.children = [];\n    Object.defineProperty(module, \"loaded\", {\n      enumerable: true,\n      get: function get() {\n        return module.l;\n      }\n    });\n    Object.defineProperty(module, \"id\", {\n      enumerable: true,\n      get: function get() {\n        return module.i;\n      }\n    });\n    Object.defineProperty(module, \"exports\", {\n      enumerable: true\n    });\n    module.webpackPolyfill = 1;\n  }\n\n  return module;\n};\n\n//# sourceURL=webpack://@ruhnn/fetcher/(webpack)/buildin/harmony-module.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: oriFetch, fetcherWithMsg, fetcherForm, downloadWithFetcher, jsonp, jsonPromise, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module, process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"oriFetch\", function() { return oriFetch; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetcherWithMsg\", function() { return fetcherWithMsg; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetcherForm\", function() { return fetcherForm; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"downloadWithFetcher\", function() { return downloadWithFetcher; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"jsonp\", function() { return jsonp; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"jsonPromise\", function() { return jsonPromise; });\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ \"antd\");\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var antd_mobile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd-mobile */ \"antd-mobile\");\n/* harmony import */ var antd_mobile__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_mobile__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _ruhnn_util_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ruhnn/util/url */ \"@ruhnn/util/url\");\n/* harmony import */ var _ruhnn_util_url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ruhnn_util_url__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _ruhnn_util_promise__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ruhnn/util/promise */ \"@ruhnn/util/promise\");\n/* harmony import */ var _ruhnn_util_promise__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ruhnn_util_promise__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _ruhnn_util_device__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ruhnn/util/device */ \"@ruhnn/util/device\");\n/* harmony import */ var _ruhnn_util_device__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ruhnn_util_device__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _ruhnn_util_type__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ruhnn/util/type */ \"@ruhnn/util/type\");\n/* harmony import */ var _ruhnn_util_type__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ruhnn_util_type__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _ruhnn_constant__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ruhnn/constant */ \"@ruhnn/constant\");\n/* harmony import */ var _ruhnn_constant__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_ruhnn_constant__WEBPACK_IMPORTED_MODULE_6__);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\n\n\n\n\nconst {\n  ios,\n  android,\n  isLCAPP,\n  mobile\n} = Object(_ruhnn_util_device__WEBPACK_IMPORTED_MODULE_4__[\"whichDevice\"])();\nlet Message = null;\n\nif (mobile) {\n  Message = antd_mobile__WEBPACK_IMPORTED_MODULE_1__[\"Toast\"];\n  Message.error = antd_mobile__WEBPACK_IMPORTED_MODULE_1__[\"Toast\"].fail;\n} else {\n  Message = antd__WEBPACK_IMPORTED_MODULE_0__[\"message\"];\n}\n\nconst LOGIN_URL = _ruhnn_constant__WEBPACK_IMPORTED_MODULE_6___default.a.login;\n\nclass DataFormatError extends Error {\n  constructor(errorMessage) {\n    super();\n    this.message = 'Data Format Invalid';\n    this.errorMessage = errorMessage;\n  }\n\n  // @ts-ignore\n  __reactstandin__regenerateByEval(key, code) {\n    // @ts-ignore\n    this[key] = eval(code);\n  }\n\n}\n\nconst {\n  toString\n} = Object.prototype;\n/**\n * 功能等同于 fetch 只做了 content-type 和 请求参数 处理 和 Token 设置\n * @param url\n * @param option\n */\n\nfunction oriFetch(url, option = {}) {\n  const opt = {\n    credentials: 'same-origin',\n    ...(Object(_ruhnn_util_type__WEBPACK_IMPORTED_MODULE_5__[\"isObject\"])(option) ? option : {})\n  };\n  opt.headers = opt.headers || {};\n  let urlObj = {}; // 针对不同请求方式 添加请求头 或 参数处理\n\n  switch ((opt.method || 'get').toLowerCase()) {\n    case 'get':\n      // get 请求 body 可以传入一个对象\n      if (!opt.body || typeof opt.body !== 'object') break;\n      urlObj = Object(_ruhnn_util_url__WEBPACK_IMPORTED_MODULE_2__[\"parse\"])(url);\n      urlObj.query = Object.assign(urlObj.query, opt.body);\n      delete opt.body;\n      url = Object(_ruhnn_util_url__WEBPACK_IMPORTED_MODULE_2__[\"stringify\"])(urlObj);\n      break;\n\n    case 'post':\n    case 'put':\n    case 'delete':\n      // post、put 请求 根据请求头类型自动处理 body\n      if (opt.FormData || opt.body instanceof FormData) {\n        for (const i in opt.body) {\n          if (opt.body[i] === undefined) delete opt.body[i];\n        }\n\n        break;\n      }\n\n      if (~(opt.headers['Content-Type'] || '').toLowerCase().indexOf('x-www-form-urlencoded')) {\n        opt.body = Object(_ruhnn_util_url__WEBPACK_IMPORTED_MODULE_2__[\"stringifyParameter\"])(opt.body);\n      } else {\n        opt.body = JSON.stringify(opt.body);\n        opt.headers['Content-Type'] = 'application/json';\n      }\n\n      break;\n\n    default:\n      break;\n  } // 请求头带上Token\n\n\n  if (window.token) {\n    opt.headers.Token = 'token' in opt.headers || 'Token' in opt.headers ? opt.headers.Token : window.token;\n  }\n\n  return fetch(url, opt);\n}\n/**\n * 登录验证\n * @param data\n * @return {*}\n */\n\nconst loginFulfill = data => {\n  // 未登录会跳转登录页\n  const delay = () => new Promise((resolve, reject) => setTimeout(reject, 99999, data));\n\n  const errorCallback = () => {\n    try {\n      if (isLCAPP) {\n        android && window.jsObj.loginApp();\n        ios && window.webkit.messageHandlers.loginApp.postMessage({});\n      } else {\n        window.location.href = `${LOGIN_URL}?redirect=${encodeURIComponent(window.location.href)}`;\n      }\n\n      return data;\n    } catch (e) {// console.log('device', e);\n    }\n  };\n\n  if (!Object(_ruhnn_util_type__WEBPACK_IMPORTED_MODULE_5__[\"isObject\"])(data)) return data;\n\n  if (data.errorCode === 'LOGIN_ERROR' || data.errorCode === 'C10') {\n    Message.error('登录信息过期，请重新登录', 1.5, errorCallback);\n    return delay();\n  } // TODO lc 不用后再删\n\n\n  if (data.errorMessage === '登录失败' && process.env.ori) {\n    setTimeout(() => {\n      window.location.href = `/login.html?last=${window.location.href}`;\n    }, 1000);\n    return delay();\n  }\n\n  return data;\n};\n/**\n * 服务端错误信息提示\n * @param error         String|Object|Boolean|data => String\n *  String|Boolean|Function<String> 时，值作为 error.message\n * @param error.message  {String|Boolean} 提示服务端错误信息 errorMessage为空时，用error.message提示\n *  1. String           提示 error.message\n *  2. false            不提示\n *  3. true             提示服务端错误信息，若错误信息为空则提示 '操作失败'\n *  3. data => String   提示函数返回值\n * @param error.always  Boolean  默认：false。 是否忽略后端错误信息，总是提示 error.message\n * @return {Function}\n */\n\n\nconst errorFulfill = error => data => {\n  const {\n    always\n  } = error;\n  let msg = error.message; // 请求错误或响应成功 则不提示\n\n  if (!Object(_ruhnn_util_type__WEBPACK_IMPORTED_MODULE_5__[\"isPlainObject\"])(data) || data.success) return data; // 服务端错误处理\n\n  let serverError = data.errorMessage || data.errorMsg;\n  if (serverError === '系统错误') serverError = '操作失败';\n  if (data.errorCode === 'B10') serverError = '没有权限'; // 错误信息不存在 且 message===false 则不提示\n\n  if (msg === false && !serverError) return data; // error.message 处理\n\n  if (Object(_ruhnn_util_type__WEBPACK_IMPORTED_MODULE_5__[\"isFunction\"])(msg)) msg = msg(data);\n  if (msg === true) msg = serverError || '操作失败';\n  Message.error(always ? msg : serverError || msg);\n  return data;\n};\n\nconst typeDefault = {\n  array: [],\n  object: {},\n  string: '',\n  boolean: undefined,\n  number: undefined,\n  null: null\n};\n/**\n * 数据格式校验，若验证失败，则抛出 '数据错误' 提示\n *  1. data 字段验证 包含：success=true result|errorCode|errorMessage 存在\n *  2. data.result 数据类型验证\n *  3. data.result===null 时补充默认值（typeDefault）\n *\n * @param dataType {String|Object}   String 类型时，值作为 dataType.type\n * @param dataType.type       String  数据类型，array/object/string/boolean/number/null\n * @param dataType.message    String  默认：'数据错误'，数据类型验证失败提示\n * @param dataType.canBeNull  Boolean 默认：true，data.result 为 null 时，根据 dataType.type 补全默认数据\n * @param dataType.always     Boolean 默认：false .catch是否给业务端返回值 {result: 补全默认值}\n * @return {Function}\n */\n\nconst validateFulfill = dataType => data => {\n  const {\n    canBeNull = true,\n    message = '数据错误',\n    type\n  } = dataType;\n  const dataFormatError = new DataFormatError(message); // 1\n\n  if (!Object(_ruhnn_util_type__WEBPACK_IMPORTED_MODULE_5__[\"isObject\"])(data)) throw dataFormatError;\n  if (data.success !== true) return data;\n\n  if (!('result' in data || 'errorCode' in data || 'errorMessage' in data)) {\n    throw dataFormatError;\n  } //  canBeNull 为 false 或者 data.result 不是null 则报错\n  //  canBeNull 为 true 且 data.result 为 null 则补全默认值\n\n\n  const resultType = toString.call(data.result).toLowerCase();\n\n  if (resultType !== `[object ${type}]`) {\n    // 2\n    if (canBeNull === false || !Object(_ruhnn_util_type__WEBPACK_IMPORTED_MODULE_5__[\"isNull\"])(data.result)) {\n      throw dataFormatError;\n    }\n\n    data.result = typeDefault[type]; // 3\n  }\n\n  return data;\n};\n\nlet timeSpan = 0;\n/**\n * 错误处理\n * @param type\n * @param always\n * @return {Function}\n */\n\nconst errorReject = ({\n  type,\n  always\n}) => e => {\n  console.log('Fetcher', e); // 合并错误提示\n\n  if (new Date() - timeSpan < 3000) return e;\n  timeSpan = new Date().getTime();\n  Message.error(e.constructor === DataFormatError ? e.errorMessage : '网络错误');\n  if (always) return {\n    result: type ? typeDefault[type] : undefined\n  };\n  return e;\n};\n/**\n * 一般 json 请求接口\n * @param url\n * @param option\n * @param option.method\n * @param option.body\n * @param option.headers\n * @param option....     原生 fetch 的第二个参数\n * ************************ 自定义参数 ************************\n * @param option.error 参考 errorFulfill ↑↑↑\n * @param option.dataType 参考 validateFulfill ↑↑↑\n */\n\n\nfunction fetcher(url, option = {}) {\n  // 自定义参数处理\n  let {\n    dataType,\n    error\n  } = option; // dataType\n\n  if (Object(_ruhnn_util_type__WEBPACK_IMPORTED_MODULE_5__[\"isString\"])(dataType)) dataType = {\n    type: dataType\n  };\n  if (!Object(_ruhnn_util_type__WEBPACK_IMPORTED_MODULE_5__[\"isObject\"])(dataType) || !(dataType.type in typeDefault)) dataType = null;\n  const toValid = Object(_ruhnn_util_type__WEBPACK_IMPORTED_MODULE_5__[\"isObject\"])(dataType); // error\n\n  if (Object(_ruhnn_util_type__WEBPACK_IMPORTED_MODULE_5__[\"isString\"])(error) || Object(_ruhnn_util_type__WEBPACK_IMPORTED_MODULE_5__[\"isBoolean\"])(error) || Object(_ruhnn_util_type__WEBPACK_IMPORTED_MODULE_5__[\"isFunction\"])(error)) error = {\n    message: error\n  };\n  if (!Object(_ruhnn_util_type__WEBPACK_IMPORTED_MODULE_5__[\"isObject\"])(error)) error = null;\n  const toMessage = Object(_ruhnn_util_type__WEBPACK_IMPORTED_MODULE_5__[\"isObject\"])(error); // 过滤自定义参数\n\n  const opt = { ...option,\n    dataType: undefined,\n    error: undefined\n  };\n\n  const func = () => oriFetch(url, opt).then(res => res.json()) // 登录验证\n  .then(loginFulfill) // 服务端错误提示\n  .then(toMessage ? errorFulfill(error) : undefined) // 数据格式验证\n  .then(toValid ? validateFulfill(dataType) : undefined) // 错误处理\n  .catch(errorReject(toValid ? dataType : {}));\n\n  return Object(_ruhnn_util_promise__WEBPACK_IMPORTED_MODULE_3__[\"abort\"])(func, true)();\n}\n/**\n *\n * @param url\n * @param option\n * @param eMsg {String|Function}\n * @returns {*}\n */\n\n\nfunction fetcherWithMsg(url, option = {}, eMsg) {\n  const abortPromise = fetcher(url, option);\n  abortPromise.then(data => {\n    if (!Object(_ruhnn_util_type__WEBPACK_IMPORTED_MODULE_5__[\"isPlainObject\"])(data) && !data.success) {\n      // 业务端用errorMessage，基础服务貌似用的errorMsg\n      let msg = data.errorMessage || data.errorMsg;\n\n      if (msg === '系统异常' || !msg) {\n        msg = '操作失败';\n      }\n\n      eMsg = typeof eMsg === 'function' ? eMsg(data) : eMsg;\n\n      if (data.errorCode === 'B10') {\n        eMsg = '没有权限';\n      }\n\n      Message.error(eMsg || msg);\n    }\n\n    return data;\n  });\n  return abortPromise;\n}\n/**\n * 接口要提交form形式的参数\n * @param url\n * @param option\n * @returns {*}\n */\n\nfunction fetcherForm(url, option = {}) {\n  option.headers = option.headers || {};\n  option.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=gbk';\n  return fetcher(url, option);\n}\n/**\n * 使用fetcher下载文件\n * @param url\n * @param option\n * @param option.method\n * @param option.body\n * @param option.headers\n */\n\nfunction downloadWithFetcher(url, option = {}) {\n  return oriFetch(url, option).then(res => res.blob().then(blob => {\n    const a = document.createElement('a');\n    const url = window.URL.createObjectURL(blob);\n    const filename = res.headers.get('Content-Disposition');\n    a.download = filename ? decodeURIComponent(/filename=(.+)/.exec(filename)[1]) : filename;\n    a.href = url;\n    document.body.appendChild(a);\n    a.click();\n    document.body.removeChild(a);\n    window.URL.revokeObjectURL(url);\n  }));\n}\nlet count = 0;\n\nfunction noop() {}\n/**\n * jsonp 请求\n * @param opts {Object}\n * @param opts.url {String} 请求路径\n * @param opts.data {Object} 请求参数\n * @param opts.withoutTime {boolean} 是否加时间戳  默认：true\n * @param opts.name {String} 回调函数名 若缺省则取 data.callback\n * @param opts.timeout {Number} 超时事件\n * @param fn\n */\n\n\nfunction jsonp(opts, fn) {\n  const data = opts.data || {};\n  const id = opts.name || data.callback || `callback_${count += 1}`;\n  const timeout = opts.timeout != null ? opts.timeout : 16000; // enc = encodeURIComponent,\n\n  const target = document.getElementsByTagName('script')[0] || document.head;\n  const script = document.createElement('script');\n  let timer;\n  let {\n    url\n  } = opts;\n  let params = opts.withoutTime === false ? [] : [`_t=${new Date() - 0}`];\n  if (!opts.url) return fn(new Error('url required')); // timeout 不是 falsy\n\n  if (timeout) {\n    timer = setTimeout(() => {\n      cleanup();\n      if (fn) fn(new Error('Timeout'));\n    }, timeout);\n  } // 封装jsonp 回调函数\n\n\n  window[id] = data => {\n    cleanup();\n    if (fn) fn(null, data);\n  };\n\n  for (const i in data) {\n    if (Object.prototype.hasOwnProperty.call(data, i)) {\n      typeof data[i] !== 'undefined' && params.push(`${i}=${data[i]}`);\n    }\n  }\n\n  params = params.join('&');\n  url += `${~url.indexOf('?') ? '&' : '?'}${params}`;\n  url = url.replace('?&', '?'); // script标签\n\n  script.src = url;\n  target.parentNode.insertBefore(script, target);\n\n  function cleanup() {\n    if (script.parentNode) script.parentNode.removeChild(script); // 防止响应时报错\n\n    window[id] = noop;\n    if (timer) clearTimeout(timer);\n  } // 取消\n\n\n  function cancel() {\n    if (window[id]) {\n      cleanup();\n    }\n  }\n\n  return cancel;\n}\n/**\n * 对JSONP请求封装Promise\n * @param opts\n * @returns {Promise<any>}\n */\n\nfunction jsonPromise(opts) {\n  return new Promise((resolve, reject) => {\n    jsonp(opts, (err, data) => {\n      if (err) return reject(err);\n      resolve(data);\n    });\n  });\n}\nconst _default = fetcher;\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(ios, \"ios\", \"/Users/ZenYu/Desktop/ZenYu/lerna-demo/packages/fetcher/src/index.js\");\n  reactHotLoader.register(android, \"android\", \"/Users/ZenYu/Desktop/ZenYu/lerna-demo/packages/fetcher/src/index.js\");\n  reactHotLoader.register(isLCAPP, \"isLCAPP\", \"/Users/ZenYu/Desktop/ZenYu/lerna-demo/packages/fetcher/src/index.js\");\n  reactHotLoader.register(mobile, \"mobile\", \"/Users/ZenYu/Desktop/ZenYu/lerna-demo/packages/fetcher/src/index.js\");\n  reactHotLoader.register(Message, \"Message\", \"/Users/ZenYu/Desktop/ZenYu/lerna-demo/packages/fetcher/src/index.js\");\n  reactHotLoader.register(LOGIN_URL, \"LOGIN_URL\", \"/Users/ZenYu/Desktop/ZenYu/lerna-demo/packages/fetcher/src/index.js\");\n  reactHotLoader.register(DataFormatError, \"DataFormatError\", \"/Users/ZenYu/Desktop/ZenYu/lerna-demo/packages/fetcher/src/index.js\");\n  reactHotLoader.register(toString, \"toString\", \"/Users/ZenYu/Desktop/ZenYu/lerna-demo/packages/fetcher/src/index.js\");\n  reactHotLoader.register(oriFetch, \"oriFetch\", \"/Users/ZenYu/Desktop/ZenYu/lerna-demo/packages/fetcher/src/index.js\");\n  reactHotLoader.register(loginFulfill, \"loginFulfill\", \"/Users/ZenYu/Desktop/ZenYu/lerna-demo/packages/fetcher/src/index.js\");\n  reactHotLoader.register(errorFulfill, \"errorFulfill\", \"/Users/ZenYu/Desktop/ZenYu/lerna-demo/packages/fetcher/src/index.js\");\n  reactHotLoader.register(typeDefault, \"typeDefault\", \"/Users/ZenYu/Desktop/ZenYu/lerna-demo/packages/fetcher/src/index.js\");\n  reactHotLoader.register(validateFulfill, \"validateFulfill\", \"/Users/ZenYu/Desktop/ZenYu/lerna-demo/packages/fetcher/src/index.js\");\n  reactHotLoader.register(timeSpan, \"timeSpan\", \"/Users/ZenYu/Desktop/ZenYu/lerna-demo/packages/fetcher/src/index.js\");\n  reactHotLoader.register(errorReject, \"errorReject\", \"/Users/ZenYu/Desktop/ZenYu/lerna-demo/packages/fetcher/src/index.js\");\n  reactHotLoader.register(fetcher, \"fetcher\", \"/Users/ZenYu/Desktop/ZenYu/lerna-demo/packages/fetcher/src/index.js\");\n  reactHotLoader.register(fetcherWithMsg, \"fetcherWithMsg\", \"/Users/ZenYu/Desktop/ZenYu/lerna-demo/packages/fetcher/src/index.js\");\n  reactHotLoader.register(fetcherForm, \"fetcherForm\", \"/Users/ZenYu/Desktop/ZenYu/lerna-demo/packages/fetcher/src/index.js\");\n  reactHotLoader.register(downloadWithFetcher, \"downloadWithFetcher\", \"/Users/ZenYu/Desktop/ZenYu/lerna-demo/packages/fetcher/src/index.js\");\n  reactHotLoader.register(count, \"count\", \"/Users/ZenYu/Desktop/ZenYu/lerna-demo/packages/fetcher/src/index.js\");\n  reactHotLoader.register(noop, \"noop\", \"/Users/ZenYu/Desktop/ZenYu/lerna-demo/packages/fetcher/src/index.js\");\n  reactHotLoader.register(jsonp, \"jsonp\", \"/Users/ZenYu/Desktop/ZenYu/lerna-demo/packages/fetcher/src/index.js\");\n  reactHotLoader.register(jsonPromise, \"jsonPromise\", \"/Users/ZenYu/Desktop/ZenYu/lerna-demo/packages/fetcher/src/index.js\");\n  reactHotLoader.register(_default, \"default\", \"/Users/ZenYu/Desktop/ZenYu/lerna-demo/packages/fetcher/src/index.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../git/ruhnn-pack/node_modules/webpack/buildin/harmony-module.js */ \"../../../../git/ruhnn-pack/node_modules/webpack/buildin/harmony-module.js\")(module), __webpack_require__(/*! ./../../../../../git/ruhnn-pack/node_modules/process/browser.js */ \"../../../../git/ruhnn-pack/node_modules/process/browser.js\")))\n\n//# sourceURL=webpack://@ruhnn/fetcher/./src/index.js?");

/***/ }),

/***/ "@ruhnn/constant":
/*!**********************************!*\
  !*** external "@ruhnn/constant" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__ruhnn_constant__;\n\n//# sourceURL=webpack://@ruhnn/fetcher/external_%22@ruhnn/constant%22?");

/***/ }),

/***/ "@ruhnn/util/device":
/*!*************************************!*\
  !*** external "@ruhnn/util/device" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__ruhnn_util_device__;\n\n//# sourceURL=webpack://@ruhnn/fetcher/external_%22@ruhnn/util/device%22?");

/***/ }),

/***/ "@ruhnn/util/promise":
/*!**************************************!*\
  !*** external "@ruhnn/util/promise" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__ruhnn_util_promise__;\n\n//# sourceURL=webpack://@ruhnn/fetcher/external_%22@ruhnn/util/promise%22?");

/***/ }),

/***/ "@ruhnn/util/type":
/*!***********************************!*\
  !*** external "@ruhnn/util/type" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__ruhnn_util_type__;\n\n//# sourceURL=webpack://@ruhnn/fetcher/external_%22@ruhnn/util/type%22?");

/***/ }),

/***/ "@ruhnn/util/url":
/*!**********************************!*\
  !*** external "@ruhnn/util/url" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__ruhnn_util_url__;\n\n//# sourceURL=webpack://@ruhnn/fetcher/external_%22@ruhnn/util/url%22?");

/***/ }),

/***/ "antd":
/*!***********************!*\
  !*** external "antd" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_antd__;\n\n//# sourceURL=webpack://@ruhnn/fetcher/external_%22antd%22?");

/***/ }),

/***/ "antd-mobile":
/*!******************************!*\
  !*** external "antd-mobile" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_antd_mobile__;\n\n//# sourceURL=webpack://@ruhnn/fetcher/external_%22antd-mobile%22?");

/***/ })

/******/ });
});