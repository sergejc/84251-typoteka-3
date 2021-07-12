function getRandomIntInclusive(min, max) {
  return Math.ceil(Math.random() * (max - min)) + min;
}

function getRandomIntExclusive(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomSubArray(maxLength, sourceArray) {
  return sourceArray
    .sort(() => 0.5 - Math.random())
    .slice(0, getRandomIntExclusive(1, maxLength));
}

module.exports = {
  getRandomSubArray,
  getRandomIntInclusive,
  getRandomIntExclusive,
}