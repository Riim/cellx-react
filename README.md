cellx-react
===========

## Install

```
npm install cellx cellx-decorators react react-dom cellx-react --save
```

More about cellx-decorators: [cellx-decorators](https://github.com/Riim/cellx-decorators/blob/master/README.md).

## Example

```js
import { observable, computed } from 'cellx-decorators';
import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'cellx-react';

class User {
	@observable name = void 0;

	@observable birthdate = void 0;
	@computed age = function() {
		return birthdateToAge(this.birthdate);
	};

	constructor(name, birthdate) {
		this.name = name;
		this.birthdate = birthdate;
	}
}

let user = new User('Матроскин', '05/03/2006');

@observer
class UserCard extends React.Component {
	@computed ageLess18 = function() {
		return user.age < 18;
	};

	render() {
		return (<p>
			Привет, {user.name}!
			{` Вам ${ this.ageLess18 ? 'ещё нет' : 'уже есть' } 18 лет (вам ${ user.age }).`}
		</p>);
	}
}

ReactDOM.render(
	<UserCard/>,
	document.getElementById('example')
);

// Вычисляет возраст по дате рождения.
function birthdateToAge(birthdate) {
	birthdate = new Date(birthdate);
	let now = new Date();
	let age = now.getFullYear() - birthdate.getFullYear();
	return now.setFullYear(1972) < birthdate.setFullYear(1972) ? age - 1 : age;
}
```
