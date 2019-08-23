'use strict';

const { Model } = require('objection');

class Defense extends Model {
    static get tableName() {
        return 'defense';
    }
}

module.exports = Defense;