/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk"] = self["webpackChunk"] || []).push([["reactPlayerDailyMotion"],{

/***/ "./node_modules/react-player/lib/players/DailyMotion.js":
/*!**************************************************************!*\
  !*** ./node_modules/react-player/lib/players/DailyMotion.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var __create = Object.create;\nvar __defProp = Object.defineProperty;\nvar __getOwnPropDesc = Object.getOwnPropertyDescriptor;\nvar __getOwnPropNames = Object.getOwnPropertyNames;\nvar __getProtoOf = Object.getPrototypeOf;\nvar __hasOwnProp = Object.prototype.hasOwnProperty;\nvar __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;\nvar __export = (target, all) => {\n  for (var name in all)\n    __defProp(target, name, { get: all[name], enumerable: true });\n};\nvar __copyProps = (to, from, except, desc) => {\n  if (from && typeof from === \"object\" || typeof from === \"function\") {\n    for (let key of __getOwnPropNames(from))\n      if (!__hasOwnProp.call(to, key) && key !== except)\n        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });\n  }\n  return to;\n};\nvar __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(\n  // If the importer is in node compatibility mode or this is not an ESM\n  // file that has been converted to a CommonJS file using a Babel-\n  // compatible transform (i.e. \"__esModule\" has not been set), then set\n  // \"default\" to the CommonJS \"module.exports\" for node compatibility.\n  isNodeMode || !mod || !mod.__esModule ? __defProp(target, \"default\", { value: mod, enumerable: true }) : target,\n  mod\n));\nvar __toCommonJS = (mod) => __copyProps(__defProp({}, \"__esModule\", { value: true }), mod);\nvar __publicField = (obj, key, value) => {\n  __defNormalProp(obj, typeof key !== \"symbol\" ? key + \"\" : key, value);\n  return value;\n};\nvar DailyMotion_exports = {};\n__export(DailyMotion_exports, {\n  default: () => DailyMotion\n});\nmodule.exports = __toCommonJS(DailyMotion_exports);\nvar import_react = __toESM(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\nvar import_utils = __webpack_require__(/*! ../utils */ \"./node_modules/react-player/lib/utils.js\");\nvar import_patterns = __webpack_require__(/*! ../patterns */ \"./node_modules/react-player/lib/patterns.js\");\nconst SDK_URL = \"https://api.dmcdn.net/all.js\";\nconst SDK_GLOBAL = \"DM\";\nconst SDK_GLOBAL_READY = \"dmAsyncInit\";\nclass DailyMotion extends import_react.Component {\n  constructor() {\n    super(...arguments);\n    __publicField(this, \"callPlayer\", import_utils.callPlayer);\n    __publicField(this, \"onDurationChange\", () => {\n      const duration = this.getDuration();\n      this.props.onDuration(duration);\n    });\n    __publicField(this, \"mute\", () => {\n      this.callPlayer(\"setMuted\", true);\n    });\n    __publicField(this, \"unmute\", () => {\n      this.callPlayer(\"setMuted\", false);\n    });\n    __publicField(this, \"ref\", (container) => {\n      this.container = container;\n    });\n  }\n  componentDidMount() {\n    this.props.onMount && this.props.onMount(this);\n  }\n  load(url) {\n    const { controls, config, onError, playing } = this.props;\n    const [, id] = url.match(import_patterns.MATCH_URL_DAILYMOTION);\n    if (this.player) {\n      this.player.load(id, {\n        start: (0, import_utils.parseStartTime)(url),\n        autoplay: playing\n      });\n      return;\n    }\n    (0, import_utils.getSDK)(SDK_URL, SDK_GLOBAL, SDK_GLOBAL_READY, (DM) => DM.player).then((DM) => {\n      if (!this.container)\n        return;\n      const Player = DM.player;\n      this.player = new Player(this.container, {\n        width: \"100%\",\n        height: \"100%\",\n        video: id,\n        params: {\n          controls,\n          autoplay: this.props.playing,\n          mute: this.props.muted,\n          start: (0, import_utils.parseStartTime)(url),\n          origin: window.location.origin,\n          ...config.params\n        },\n        events: {\n          apiready: this.props.onReady,\n          seeked: () => this.props.onSeek(this.player.currentTime),\n          video_end: this.props.onEnded,\n          durationchange: this.onDurationChange,\n          pause: this.props.onPause,\n          playing: this.props.onPlay,\n          waiting: this.props.onBuffer,\n          error: (event) => onError(event)\n        }\n      });\n    }, onError);\n  }\n  play() {\n    this.callPlayer(\"play\");\n  }\n  pause() {\n    this.callPlayer(\"pause\");\n  }\n  stop() {\n  }\n  seekTo(seconds, keepPlaying = true) {\n    this.callPlayer(\"seek\", seconds);\n    if (!keepPlaying) {\n      this.pause();\n    }\n  }\n  setVolume(fraction) {\n    this.callPlayer(\"setVolume\", fraction);\n  }\n  getDuration() {\n    return this.player.duration || null;\n  }\n  getCurrentTime() {\n    return this.player.currentTime;\n  }\n  getSecondsLoaded() {\n    return this.player.bufferedTime;\n  }\n  render() {\n    const { display } = this.props;\n    const style = {\n      width: \"100%\",\n      height: \"100%\",\n      display\n    };\n    return /* @__PURE__ */ import_react.default.createElement(\"div\", { style }, /* @__PURE__ */ import_react.default.createElement(\"div\", { ref: this.ref }));\n  }\n}\n__publicField(DailyMotion, \"displayName\", \"DailyMotion\");\n__publicField(DailyMotion, \"canPlay\", import_patterns.canPlay.dailymotion);\n__publicField(DailyMotion, \"loopOnEnded\", true);\n\n\n//# sourceURL=webpack:///./node_modules/react-player/lib/players/DailyMotion.js?");

/***/ })

}]);