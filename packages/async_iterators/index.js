const contactDataSource = require('./get_page_data');

/** 
 * Problem: We have an api that will return pages of different user contact information
 * We will like to log each contact, across all pages in the data set.
 * The data set could have millions of records
*/
const dataPaginator = require('./data_processor_async_iterator');

async function start() {
  for await (let contact of dataPaginator(contactDataSource)) {
    console.log(contact)
  }
}

start();
