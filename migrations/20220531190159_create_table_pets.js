/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema
    .createTable('pets', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('race').notNullable();
        table.integer('age');
        table.string('observation')
        table.string('imageUrl', 1000);
        table.string('tutor').notNullable()
        
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable('pets')
  
  
  
};
