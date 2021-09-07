const Cars = require("./cars-model");
var vinValidator = require("vin-validator");
const checkCarId = (req, res, next) => {
  Cars.getById(req.params.id)
    .then((car) => {
      if (car) {
        req.car = car;
        next();
      } else {
        res
          .status(404)
          .json({ message: `car with id ${req.params.id} is not found` });
      }
    })
    .catch(next);
};

const checkCarPayload = (req, res, next) => {
  if (!req.body.make) {
    res.status(400).json({ message: `make is missing` });
  } else if (!req.body.model) {
    res.status(400).json({ message: `model is missing` });
  } else if (!req.body.mileage) {
    res.status(400).json({ message: `mileage is missing` });
  } else if (!req.body.vin) {
    res.status(400).json({ message: `vin is missing` });
  } else next();
};

const checkVinNumberValid = (req, res, next) => {
  var isValidVin = vinValidator.validate(req.body.vin);
  if (!isValidVin) {
    res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
  } else {
    next();
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  const allCars = await Cars.getAll();
  const vinExist = allCars.find((car) => car.vin === req.body.vin);
  if (vinExist) {
    res.status(400).json({ message: `vin ${req.body.vin} already exists` });
  } else {
    next();
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
