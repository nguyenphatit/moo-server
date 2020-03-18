/**
 * @description :: Custom library to process date time format
 * like get date, month, year or concat time together
 */

/**
 * Module dependencies.
 */
const moment = require('moment');

/**
 * Define a DateUtil that supports some functions to work with date time
 */
class DateUtil {
    /**
    * Get current datetime using moment
    * @return {Date} The current date
    */
    getNow() {
        return moment().toDate();
    }

    /**
     * Get current UTC datetime using moment
     * @return {string} A string that represent current UTC datetime (i.e. 2016-11-13T04:40:08Z)
     */
    getUTCDateTime() {
        return moment.utc().format();
    }

    /**
     * To get the difference in another unit of measurement, pass that measurement as the second argument.
     * @param {Date} date           The date to difference
     * @param {Date} diffDate       The date to be diff
     * @param {string} unitOfTime   The unit of time (months, years, days, etc... )
     * @return {string} The difference in another unit of measurement
     */
    diffDate(date, diffDate, unitOfTime) {
        return moment(date).diff(diffDate, unitOfTime);
    }
}

module.exports = DateUtil.prototype;

