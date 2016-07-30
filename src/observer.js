var cellx = require('cellx');

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
