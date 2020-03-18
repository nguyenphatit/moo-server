'use strict';
const MemoryCacher = require('./../lib/memory-cacher');

class BaseService {

    getGlobalSetting() {
        return MemoryCacher.retrieve('global-setting');
    }

    populateSearchOptions(query, res) {
        // let options = {};

        // // page index
        // if (isNaN(query.pageIndex)) {
        //     options.pageIndex = undefined;
        // } else {
        //     options.pageIndex = parseInt(query.pageIndex);

        //     if (options.pageIndex < 1) {
        //         options.pageIndex = 1;
        //     }
        // }

        // // paging
        // if (query.pageIndex) {
        //     if (isNaN(query.pageSize)) {
        //         options.pageSize = this.getGlobalSetting().defaultPageSize;
        //     } else {
        //         options.pageSize = parseInt(query.pageSize);
        //     }
        // }

        // // sort
        // if (query.sort) {
        //     let sortData = query.sort.split(' ');
        //     let fieldName = '';
        //     let sortDirection = '';

        //     if (sortData.length > 0) {
        //         fieldName = sortData[0];
        //     }

        //     if (sortData.length > 1) {
        //         sortDirection = sortData[1].toLowerCase();
        //     }
        // }
    }

    handlerError(error, res) {
        res.status(err.status || 500);
        throw error;
    }
}

module.exports = BaseService;