// STRETCH
const cars = [
  {
    vin: "11111111111111111",
    make: "subaru",
    model: "forest",
    mileage: 55555,
    title: "clean",
    transmission: "auto",
  },
  {
    vin: "22222222222222222",
    make: "subaru",
    model: "impreza",
    mileage: 22222,
    title: "clean",
    transmission: "auto",
  },
];

exports.seed = async function (knex) {
  await knex("cars").truncate();
  await knex("cars").insert(cars);
};
