const getRandomInteger = require('./getRandomInteger.js')

function getRandomItem(array) {
    return array[getRandomInteger(array.length - 1)]
}

module.exports = getRandomItem
