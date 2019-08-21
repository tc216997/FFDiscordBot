'use strict';

const { Model } = require('objection');

class Players extends Model {
    static get tableName() {
        return 'players';
    }
}

module.exports = Players;