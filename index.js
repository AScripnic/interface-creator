module.exports = class Interface {
    constructor() {
        let methodsName = this._interfaceGetMethods(this.__proto__);
        let finalMethods = {};

        methodsName.forEach(el => {
            let parts = el.split('_');

            if (parts.length === 2 && parts[0] !== '') {
                finalMethods[el] = {
                    name: parts[1],
                    type: parts[0]
                };
            } else if (parts.length === 3) {
                finalMethods[el] = {
                    name: `_${parts[2]}`,
                    type: parts[1]
                };
            }
        });

        for (let prototypedMethod in finalMethods) {
            let methodName = finalMethods[prototypedMethod].name;
            let type = finalMethods[prototypedMethod].type;

            if (!this[methodName])
                throw new Error(`Your class must implement ${methodName} method`);

            let originalMehod = this[methodName];
            let params = this._interfaceGetParamNames(this[prototypedMethod]);

            this[methodName] = this._interfaceReplaceMethod.bind(this, originalMehod, methodName, params, type);
        }
    }

    _interfaceReplaceMethod(method, methodName, expectedArgs, returnType, ...args) {
        args.forEach((argument, index) => {
            let expectedArg = expectedArgs[index].split('_')[0];
            if (typeof argument !== expectedArg)
                throw new Error(`The argument on position ${index} of the method ${methodName} should be typeof ${expectedArg}, instead got ${typeof argument}`);
        });

        let returnValue = method(...args);

        if (typeof returnValue !== returnType) {
            throw new Error(`${methodName} must return a ${returnType}`);
        }

        return returnValue;
    }

    _interfaceGetParamNames(func) {
        let fnStr = func.toString().replace(Interface.INTERFACE_STRIP_COMMENTS_REGEX, '');
        let result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(Interface.INTERFACE_ARGUMENT_NAMES_REGEX);
        
        if (result === null)
            result = [];
        
            return result;
    }

    _interfaceGetMethods(proto) {
        let props = [];

        do {
            props = props.concat(Object.getOwnPropertyNames(proto));
            proto = Object.getPrototypeOf(proto);
        } while (proto && proto instanceof Interface);
    
        return props.sort().filter((e, i, arr) => { 
            return e !== arr[i+1] && 
                typeof this[e] === 'function' &&
                e !== 'constructor' && 
                e.toLowerCase().indexOf('_inteface') !== 0 && 
                e.toLowerCase().indexOf('interface') !== 0

         });
    }

    static get INTERFACE_ARGUMENT_NAMES_REGEX() {
        return /([^\s,]+)/g;
    }

    static get INTERFACE_STRIP_COMMENTS_REGEX() {
        return /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    }
}

