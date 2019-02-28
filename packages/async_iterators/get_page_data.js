const faker = require('faker');

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const dataElements = [];
for (let x = 0; x < 535; ++x) {
  dataElements.push(faker.helpers.userCard());
}

/**
 * This file tries to mock network calls to some api that enables pagination 
 */
module.exports = async function (currentIndex, pageSize, callback) {
  console.log('Getting next page')
  const values = dataElements.slice(currentIndex, currentIndex + pageSize);

  await sleep(Math.random() * 1000);
  
  if (callback) callback(null, values);
  return values;
}

