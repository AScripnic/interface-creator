# Interface creator

## Attention!
 - This interface won't work if uglified
 - The methods validation are done on class initialization
 - Methods parameters and return value is validated on during the method execution

## How to install
Install via npm:

`npm install --save interface-creator`

## How to use

To create an interface you should extend Interface class.
```javascript
let Interface = require('interface-creator');

class MyInterface extends Interface {
    constructor() {
        //You must call super to make the interface work
        super();
    }

    /**
     * First part of the method name should be in snake case 
     * which means the type of the value a method should return.
     * Every parameter should as well be first part in snake case
     * and the first part defines what type is the parameter
     */
    string_getValue(number_value) {}

    /**
     * You can define a private property with an underscore in the start
     * Parameters are not required
     */
    _string_getRandomString() {}
}
```

And the interface implementation must look like this:

```javascript
class MyClass extends MyInterface {
    constructor() {
        //You must call super to make the interface work
        super();
    }

    // Interface implementation doesn't require the type in it's name
    // As well as it's arguments
    getValue(value) {
        return value.toString();
    }

    _getRandomString() {
        return 'random string';
    }
}
```

## Conctact

If you are interested in this module, please write an email and I'll create a public git repo for it.