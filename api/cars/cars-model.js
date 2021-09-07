const db = require("../../data/db-config");
const getAll = () => {
  return db("cars");
};

const getById = (id) => {
  return db("cars").where({ id: id }).first();
};

const create = async (car) => {
  return db("cars")
    .insert(car)
    .then((newCarId) => {
      return getById(newCarId);
    });
};

const deleteCar = (id) => {
  return db("cars").where({ id: id }).del();
};

const updateCar = (id, change) => {
  return db("cars").where({ id: id }).update(change);
};
module.exports = {
  getAll,
  getById,
  create,
  deleteCar,
  updateCar,
};
