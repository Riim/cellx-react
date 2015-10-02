# react-bind-observables

## Example

```js
import { d } from 'cellx';
import React from 'react';
import bindObservables from 'react-bind-observables';

class User {
    @d.observable age = 20;

    @d.computed ageYearLater = function() {
        return this.age + 1;
    };
}

let user = new User();

setInterval(function() {
    user.age++;
}, 1000);

@bindObservables
export default class UserCard extends React.Component {
    @d.computed userAgeTwoYearsLater = function() {
        return user.ageYearLater + 1;
    };

    render() {
        return (<div>
            <p>age: {user.age}</p>
            <p>ageYearLater: {user.ageYearLater}</p>
            <p>ageTwoYearsLater: {this.userAgeTwoYearsLater}</p>
        </div>);
    }
}
```
