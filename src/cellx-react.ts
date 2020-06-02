import { Cell, cellx, ICellx } from 'cellx';

export const KEY_RENDERED = Symbol('rendered');
export const KEY_ON_RENDERED_CHANGE = Symbol('onRenderedChange');

export function Observer<T extends Function>(componentClass: T): T {
	let proto = componentClass.prototype;
	let origRender = proto.render;
	let origComponentDidMount = proto.componentDidMount;
	let origComponentWillUnmount = proto.componentWillUnmount;
	let origShouldComponentUpdate = proto.shouldComponentUpdate;

	proto[KEY_RENDERED] = cellx(function () {
		return origRender.call(this);
	});

	function onRenderedChange() {
		this.forceUpdate();
	}
	proto[KEY_ON_RENDERED_CHANGE] = onRenderedChange;

	proto.render = function () {
		return this[KEY_RENDERED]();
	};

	proto.componentDidMount = function () {
		this[KEY_RENDERED].onChange(onRenderedChange, this);

		if (origComponentDidMount) {
			origComponentDidMount.call(this);
		}
	};

	proto.componentWillUnmount = function () {
		this[KEY_RENDERED].offChange(onRenderedChange, this);

		if (origComponentWillUnmount) {
			origComponentWillUnmount.call(this);
		}
	};

	proto.shouldComponentUpdate = function (nextProps: any, nextState: any) {
		if (
			!origShouldComponentUpdate ||
			origShouldComponentUpdate.call(this, nextProps, nextState)
		) {
			Cell.afterRelease(() => {
				(this[KEY_RENDERED] as ICellx).pull();
			});
		}

		return false;
	};

	return componentClass;
}

Observer.KEY_RENDERED = KEY_RENDERED;
Observer.KEY_ON_RENDERED_CHANGE = KEY_ON_RENDERED_CHANGE;

export { Observer as observer };
