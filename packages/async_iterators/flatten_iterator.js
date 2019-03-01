

/**
 * flattenIterator
 * @description Given an iterator that returns arrays, this function loops over each array 
 * and returns one element at a time.
 * @param {iterator} An iterator that returns arrays. 
*/
async function* flattenIterator(iterator) {

  // Unwrap batches
  for await (const batch of iterator) {
    for (const value of batch) {
      yield value;
    }
  }
}


module.exports = flattenIterator;