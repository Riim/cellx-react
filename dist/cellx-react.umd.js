(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('cellx')) :
	typeof define === 'function' && define.amd ? define(['exports', 'cellx'], factory) :
	(global = global || self, factory(global['cellx-react'] = {}, global.cellx));
}(this, (function (exports, cellx) { 'use strict';

	const KEY_RENDERED = Symbol('rendered');
	const KEY_ON_RENDERED_CHANGE = Symbol('onRenderedChange');
	function Observer(componentClass) {
	    let proto = componentClass.prototype;
	    let origRender = proto.render;
	    if (!origRender) {
	        return componentClass;
	    }
	    let origComponentDidMount = proto.componentDidMount;
	    let origComponentWillUnmount = proto.componentWillUnmount;
	    let origShouldComponentUpdate = proto.shouldComponentUpdate;
	    proto[KEY_ON_RENDERED_CHANGE] = function () {
	        this.forceUpdate();
	    };
	    proto.render = function () {
	        return (this[KEY_RENDERED] ||
	            (this[KEY_RENDERED] = cellx.cellx(function () {
	                return origRender.call(this);
	            }, { context: this, onChange: () => { } })))();
	    };
	    proto.componentDidMount = function () {
	        this[KEY_RENDERED].onChange(this[KEY_ON_RENDERED_CHANGE], this);
	        if (origComponentDidMount) {
	            origComponentDidMount.call(this);
	        }
	    };
	    proto.componentWillUnmount = function () {
	        this[KEY_RENDERED].off();
	        if (origComponentWillUnmount) {
	            origComponentWillUnmount.call(this);
	        }
	    };
	    proto.shouldComponentUpdate = function (nextProps, nextState) {
	        if (!origShouldComponentUpdate ||
	            origShouldComponentUpdate.call(this, nextProps, nextState)) {
	            cellx.Cell.afterRelease(() => {
	                this[KEY_RENDERED].pull();
	            });
	        }
	        return false;
	    };
	    return componentClass;
	}
	Observer.KEY_RENDERED = KEY_RENDERED;
	Observer.KEY_ON_RENDERED_CHANGE = KEY_ON_RENDERED_CHANGE;

	exports.KEY_ON_RENDERED_CHANGE = KEY_ON_RENDERED_CHANGE;
	exports.KEY_RENDERED = KEY_RENDERED;
	exports.Observer = Observer;
	exports.observer = Observer;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
