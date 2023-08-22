export function objectIsEmpty(obj){
    if (typeof obj !== "object"){
        return null
    } else {
        return !Object.keys(obj).length > 0 // returns true if object has 0 keys
    }
}
