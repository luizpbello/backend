/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('clients', table => {
        table.increments('id').primary();
        table.string('clientName').notNullable();
        table.string('phone').notNullable();
        table.string('adress');
        
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable('clients')
  
  
};
