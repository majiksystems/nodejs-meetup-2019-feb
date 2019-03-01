const contactDataSource = require('./get_page_data');
const flattenIterator = require('./flatten_iterator');
const pageIterator = require('./page_iterator');

/** 
 * Problem: We have an api that will return pages of different user contact information
 * We will like to log each contact, across all pages in the data set.
 * The data set could have millions of records
*/
async function start() {
  const contactPages = pageIterator(contactDataSource);
  const flattenedPages = flattenIterator(contactPages);
  
  for await (let contact of flattenedPages) {
    console.log(contact);
  }
}

start();
