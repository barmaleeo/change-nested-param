

export default function index(object, path, value, options = {}){
    if(path === null){
        return object;
    }
    const keys = (path.toString()).split('.')
    let currentObject = object;
    let n = 0;
    let key;
    if(!options || !options.createUndefined) {
        for (n; n < keys.length - 1; n += 1) {
            key = keys[n];
            if (typeof currentObject[key] !== 'object' && !Array.isArray(currentObject[key])) {
                return object;
            }
            currentObject = currentObject[key];
        }
    }
    const output = {...object}
    currentObject = output;
    let minus = false;
    let plus = false;
    for(n = 0; n < keys.length - 1; n += 1){
        key = keys[n];
        if(key.substring(0,1) === '-'){
            minus = true;
            key = key.substring(1);
        }else if(key.substring(0,1) === '+'){
            plus = true;
            key = key.substring(1);
        }

        const nextObject = currentObject[key];
        if(Array.isArray(nextObject)){
            if(minus){
                currentObject.splice(key, 1)
                return output;
            }
            if(plus){
                currentObject.splice(key, 0, value)
                return output;
            }
            currentObject[key] = nextObject.slice()
        }else if (typeof nextObject === 'object'){
            if(minus){
                currentObject[key] = undefined;
                return output;
            }
            currentObject[key] = {...nextObject}

        } else if(options.createUndefined) {
            if(!Number.isNaN(+keys[n+1])){
                currentObject[key] = [];
            }else if(Array.isArray(currentObject)){
                currentObject.push({})
                key = currentObject.length - 1;
            }else {
                currentObject[key] = {}
            }
        }else{
            return object;
        }

        currentObject = currentObject[key];
    }
    key = keys[n]

    if(key.substring(0,1) === '-'){
        minus = true;
        key = key.substring(1);
    }else if(key.substring(0,1) === '+'){
        plus = true;
        key = key.substring(1);
    }

    if(Array.isArray(currentObject)){
        if(minus){
            if(currentObject[key] === undefined){
                return object;
            }
            currentObject.splice(key, 1)
        }else if(plus){
            currentObject.splice(key, 0, value)
            return output;
        }else if(key === '*'){
            currentObject.unshift(value)
        }else if(currentObject[key] === undefined){
            currentObject.push(value)
        }else{
            currentObject[key] = value;
        }
    }else if(minus){
        currentObject[key] = undefined;
    }else{
        if(options.keepInitial){
            if(currentObject[key+'Initial'] === undefined){
                currentObject[key+'Initial'] = currentObject['key'];
            }
        }
        currentObject[key] = value;
        if(options.valid !== undefined){
            currentObject.valid = options.valid
        }
        if(options.nameValid !== undefined){
            currentObject[`${key}Valid`] = options.nameValid;
        }
    }
    return output;
}
