const path = require('path');
const includeAll = require('include-all');
const SEED_DATA_PATH = './seed-data';

const bulkCreateOptions = { ignoreDuplicates: true };

const GlobalSetting = require('./../models').GlobalSetting;

class SeedDataHelper {

    seed(callback) {
        const self = this;

        includeAll.optional({
            dirname: path.resolve(SEED_DATA_PATH),
            filter: /(.+)\.(json)$/,
            depth: 1,
            caseSensitive: true
        }, function onLoad(err, data) {
            if (err) {
                throw err;
            }

            GlobalSetting.bulkCreate(data['global-setting'], bulkCreateOptions).then(() => {
                callback();
            })
        });
    }
}

module.exports = new SeedDataHelper();