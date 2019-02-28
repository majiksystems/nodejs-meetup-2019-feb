
/**
 * By using iterators, we are able to abstract processing of pagination,
 * and consume the data as a single unified stream
 */
async function* dataProcessor(dataSource) {
  const contactPages = IteratePages(dataSource);

  for await (const batch of contactPages) {
    for (const value of batch) {
      yield value;
    }
  }
}

/**
 * IteratePages tracks the current index and page read for some data source 
*/
async function* IteratePages(getPageData) {
  let currentIndex = 0;
  const pageSize = 10;

  while(true) {
    let result = await getPageData(currentIndex, pageSize);  
    if (result.length === 0) return;

    currentIndex += pageSize;
    yield result;
  }
}

module.exports = dataProcessor;