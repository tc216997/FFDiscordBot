
exports.up = function(knex) {
  return Promise.all([
    // create table
    knex.schema.createTable('players', (table) => {
      table.string('team')
      table.string('symbol')
      table.string('fullname')
      table.string('first')
      table.string('last')
      table.string('position')
      table.integer('rotowire_id')
      table.integer('espn_id')
      table.integer('yahoo_id')
    })
  ])   
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('players')
  ])
};
