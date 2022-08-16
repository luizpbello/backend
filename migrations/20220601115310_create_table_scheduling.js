/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("scheduling", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("date").notNullable();
    table.string("time").notNullable();
    table.string("service").notNullable();
    table.integer("value").notNullable();
    table.string("observation");
    table.string("status").defaultTo("Pendente");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("scheduling");
};
