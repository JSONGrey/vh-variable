# vh-variable

A small module that declares a css variable that correctly calculates the value of 1vh.

On mobile phones there is a problem with the address bar for items with 1vh height, this package can solve this problem

## Installation

Use the package manager to install vh-variable.

```bash
npm i vh-variable
```

## Usage


```javascript
import 'vh-variable'
```
or Common.js

```javascript
require('vh-variable')
```
Use in code like this:

Before
```
selector{
    height: 100vh;
}
```
After
```
selector{
    height: calc(var(--vh, 1vh) * 100);
}
```
