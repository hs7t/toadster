const getRandomInteger = import('./getRandomInteger.js')

export function getRandomIndex(array) {
    return array[getRandomInteger(array.length - 1)]
}
