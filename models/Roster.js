'use strict';

const { Model } = require('objection');

class Roster extends Model {
    static get tableName() {
        return 'roster';
    }
}

module.exports = Roster;