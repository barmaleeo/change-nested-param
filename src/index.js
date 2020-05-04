

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
    for(n = 0; n < keys.length - 1; n += 1){
        key = keys[n];
        if(key.substring(0,1) === '-'){
            minus = true;
            key = key.substring(1);
        }

        const nextObject = currentObject[key];
        if(Array.isArray(nextObject)){
            if(minus){
                currentObject.splice(key, 1)
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
    }

    if(Array.isArray(currentObject)){
        if(minus){
            if(currentObject[key] === undefined){
                return object;
            }
            currentObject.splice(key, 1)
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
        currentObject[key] = value;
    }
    return output;
}
