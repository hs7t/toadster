const getRandomInteger = require('./getRandomInteger.js')

function getRandomIndex(list) {
    return list[getRandomInteger(list.length - 1)]
}

module.exports = getRandomIndex
