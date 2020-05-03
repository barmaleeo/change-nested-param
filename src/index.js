

export default function index(object, path, value, options = {}){
    if(path === null){
        return object;
    }
    const keys = (path.toString()).split('.')
    let currentObject = object;
    let n = 0;
    if(!options && options.createUndefined) {
        for (n; n < keys.length - 1; n += 1) {
            if (typeof currentObject[keys[n]] !== 'object' && !Array.isArray(currentObject[keys[n]])) {
                return object;
            }
            currentObject = currentObject[keys[n]];
        }
    }
    const output = {...object}
    currentObject = output;
    let key;
    for(n = 0; n < keys.length - 1; n += 1){
        key = keys[n];
        const nextObject = currentObject[key];
        if(Array.isArray(nextObject)){
            currentObject[key] = nextObject.slice()
        }else if (typeof nextObject === 'object'){
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
    currentObject[keys[n]] = value;
    return output;
}
