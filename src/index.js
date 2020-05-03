

export default function index(object, path, value){
    if(path === null){
        return object;
    }
    const keys = (path.toString()).split('.')
    let currentObject = object;
    let n = 0;
    for(n; n < keys.length - 1; n += 1) {
        if (typeof currentObject[keys[n]] !== 'object' && !Array.isArray(currentObject[keys[n]])){
            return object;
        }
        currentObject = currentObject[keys[n]];
    }
    const output = {...object}
    currentObject = output;
    for(n = 0; n < keys.length - 1; n += 1){
        if(Array.isArray(currentObject[keys[n]])){
            currentObject[keys[n]] = currentObject[keys[n]].slice()
        }else {
            currentObject[keys[n]] = {...currentObject[keys[n]]}
        }
        currentObject = currentObject[keys[n]];
    }
    currentObject[keys[n]] = value;
    return output;
}
