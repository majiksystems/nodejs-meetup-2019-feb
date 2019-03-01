
/**
 * PageIterator tracks the current index and page read for some data source 
*/
async function* PageIterator(getPageData) {
  let currentIndex = 0;
  const pageSize = 10;

  while(true) {
    let result = await getPageData(currentIndex, pageSize);  
    if (result.length === 0) return;
    yield result;
    
    currentIndex += pageSize;
  }
}

module.exports = PageIterator;