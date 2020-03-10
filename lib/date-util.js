const moment = require('moment');

class DateUtil {

    getNow() {
        return moment.getNow();
    }

    getUTCDateTime() {
        return moment.utc().format();
    }
}

module.exports = DateUtil.prototype;