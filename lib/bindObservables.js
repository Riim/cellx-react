module.exports = function(React, cellx) {
	var nextTick = cellx.nextTick;

	function bindObservables(Component) {
		var proto = Component.prototype;
		var origRender = proto.render;
		var origComponentDidMount = proto.componentDidMount;
		var origComponentWillUnmount = proto.componentWillUnmount;
		var origShouldComponentUpdate = proto.shouldComponentUpdate;

		proto._dom = cellx(function() {
			return origRender.call(this);
		});

		proto.render = function() {
			return this._dom();
		};

		proto.componentDidMount = function() {
			this._dom('on', 'change', this._onDOMChange);

			if (origComponentDidMount) {
				origComponentDidMount.call(this);
			}
		};

		proto.componentWillUnmount = function() {
			this._dom('off', 'change', this._onDOMChange);

			if (origComponentWillUnmount) {
				origComponentWillUnmount.call(this);
			}
		};

		proto.shouldComponentUpdate = function() {
			var component = this;

			nextTick(function() {
				component._dom('recalc', 0);
			});

			return false;
		};

		proto._onDOMChange = function() {
			this.forceUpdate();
		};

		if (origShouldComponentUpdate) {
			(console.warn || console.log).call(console, "'shouldComponentUpdate' was replaced");
		}

		return Component;
	}

	return bindObservables;
};
