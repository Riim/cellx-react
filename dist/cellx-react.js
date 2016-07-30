(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("cellx"));
	else if(typeof define === 'function' && define.amd)
		define(["cellx"], factory);
	else if(typeof exports === 'object')
		exports["cellx-react"] = factory(require("cellx"));
	else
		root["cellx-react"] = factory(root["cellx"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var observer = __webpack_require__(1);

	module.exports = {
		observer: observer
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var cellx = __webpack_require__(2);

	var Cell = cellx.Cell;
	var Symbol = cellx.js.Symbol;

	var KEY_RENDERED = observer.KEY_RENDERED = Symbol('rendered');
	var KEY_ON_RENDERED_CHANGE = observer.KEY_ON_RENDERED_CHANGE = Symbol('onRenderedChange');

	function observer(componentConstr) {
		var proto = componentConstr.prototype;
		var origRender = proto.render;
		var origComponentDidMount = proto.componentDidMount;
		var origComponentWillUnmount = proto.componentWillUnmount;
		var origShouldComponentUpdate = proto.shouldComponentUpdate;

		proto[KEY_RENDERED] = cellx(function() {
			return origRender.call(this);
		}); 

		function onRenderedChange() {
			this.forceUpdate();
		}
		proto[KEY_ON_RENDERED_CHANGE] = onRenderedChange;

		proto.render = function() {
			return this[KEY_RENDERED]();
		};

		proto.componentDidMount = function() {
			this[KEY_RENDERED]('addChangeListener', onRenderedChange, this);

			if (origComponentDidMount) {
				origComponentDidMount.call(this);
			}
		};

		proto.componentWillUnmount = function() {
			this[KEY_RENDERED]('removeChangeListener', onRenderedChange, this);

			if (origComponentWillUnmount) {
				origComponentWillUnmount.call(this);
			}
		};

		proto.shouldComponentUpdate = function(nextProps, nextState) {
			if (!origShouldComponentUpdate || origShouldComponentUpdate.call(this, nextProps, nextState)) {
				var component = this;

				Cell.afterRelease(function() {
					component[KEY_RENDERED]('pull', 0);
				});
			}

			return false;
		};

		return componentConstr;
	}

	module.exports = observer;


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;