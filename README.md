cellx-react
===========

## Install

```
npm install cellx cellx-decorators react react-dom cellx-react --save
```

More about cellx-decorators: [cellx-decorators](https://github.com/Riim/cellx-decorators/blob/master/README.md).

## Example

```js
import { Observable, Computed } from 'cellx-decorators';
import React from 'react';
import ReactDOM from 'react-dom';
import { Observer } from 'cellx-react';

class User {
	@Observable name = void 0;
	@Observable birthdate = void 0;

	@Computed
	get age() {
		return birthdateToAge(this.birthdate);
	}

	constructor(name, birthdate) {
		this.name = name;
		this.birthdate = birthdate;
	}
}

let user = new User('Матроскин', '05/03/2006');

@Observer
class UserCard extends React.Component {
	@Computed
	get ageLess18() {
		return user.age < 18;
	}

	render() {
		return (
			<p>
				Привет, {user.name}!
				{` Вам ${ this.ageLess18 ? 'ещё нет' : 'уже есть' } 18 лет (вам ${ user.age }).`}
			</p>
		);
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
