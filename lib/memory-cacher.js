const cache = require('memory-cache');

class MemoryCacher {
    /**
     * Put value to memory cache: Simply stores a value
     * @param  {string} key    key of the data save into cache
     * @param  {string} value    value of the data save into cache
     * @param  {string} timeOut    If time isn't passed in, it is stored forever
     */
    put(key, value, timeOut) {
        cache.put(key, value, timeOut);
    }

    /**
     * Retrieves a value for a given key
     * @param  {string} key    key of the data which is get
     * @returns {object} If value isn't cached, returns null
     */
    retrieve(key) {
        return cache.get(key);
    }

    /**
     * Delete cache item by key
     * @param  {string} key     The key to be deleted
     */
    delete(key) {
        cache.del(key);
    }

    /**
     * Deletes all keys
     */
    clear() {
        cache.clear();
    }
}

module.exports = new MemoryCacher();