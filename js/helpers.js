export const countInArray = (element, array) => {
    // Count the element in the array
    return array.filter(x => x === element).length;
};

export const isSequential = (array) => {
    // check if array is sequential (number +1)
    array.sort();
    for (let i = 0; i < (array.length - 1); i++) {
        if ( array[i] + 1 !== array[i + 1] ) return false;
    }
    return true;
}

export const sumOfItems = (array) => {
    return array.reduce((sum, item) => sum + item);
}