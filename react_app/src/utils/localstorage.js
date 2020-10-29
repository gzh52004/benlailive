
export function getItem (key) {
    let value = localStorage.getItem(key);
    if(value) {
        try{
            value = JSON.parse(value);
        } catch(err) {
            value = value
        }

    }
    return value
}

export function setItem (key,value) {
    value = JSON.stringify(value)
    localStorage.setItem(key,value)

}

export function clearItem(key) {
    localStorage.removeItem(key)
}