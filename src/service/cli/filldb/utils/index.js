function getRandomIntInclusive(min, max) {
  return Math.ceil(Math.random() * (max - min)) + min;
}

function getRandomIntExclusive(min, max) {
  return Math.floor(Math.random() * max);
}

function getRandomSubArray(maxNum, type) {
  const descNum = getRandomIntInclusive(1, maxNum);
  const descObj = new Set();
  Array(descNum).fill().forEach(() => {
    const key = getRandomIntInclusive(0, type.length - 1);
    descObj.add(type[key]);
  });

  return Array.from(descObj);
}

module.exports = {
  getRandomSubArray,
  getRandomIntInclusive,
  getRandomIntExclusive,
}