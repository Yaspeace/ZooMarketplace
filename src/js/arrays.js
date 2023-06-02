/**
 * Return new instance of passed array, with passed element (or array of elements) at the end of new array.
 * @param {Array} arr An instance of source array.
 * @param {*} item An element (or array of elements) to add.
 * @returns New instance of array.
 */
export function append(arr, item) {
    if(arr == null || item == null) return arr;

    if(item instanceof Array) {
        return item.length > 0 ? [...arr, ...item] : arr;
    } else {
        return [...arr, item];
    }
}

/**
 * Return new instance of passed array, with passed element (or array of elements) at the start of new array.
 * @param {Array} arr An instance of source array.
 * @param {*} item An element (or array of elements) to add.
 * @returns New array instance.
 */
export function appendFront(arr, item) {
    if(item instanceof Array) {
        return [...item, ...arr];
    } else {
        return [item, ...arr];
    }
}

/**
 * Returns new instance of array without element on passed index of source array.
 * @param {Array} array A source array. 
 * @param {*} index An index of element to be removed.
 * @returns New array instance.
 */
export function removeByIndex(array, index) {
    return array.filter((_, i) => i != index);
}