let Interface = require('./index');

class MyInterface extends Interface {
    constructor() {
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

class MyClass extends MyInterface {
    constructor() {
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

let myInstance = new MyClass();