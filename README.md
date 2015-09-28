# react-bind-observables

## Example

```js
import React from 'react';
import { cellx, d } from 'cellx';
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

@bindObservables(React, cellx)
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
