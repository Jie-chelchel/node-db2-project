const express = require("express");
const { nextTick } = require("process");
const router = express.Router();
const Cars = require("./cars-model");
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
} = require("./cars-middleware");
router.get("/", (req, res, next) => {
  Cars.getAll()
    .then((cars) => res.json(cars))
    .catch((err) => next(err));
});

router.get("/:id", checkCarId, (req, res, next) => {
  res.json(req.car);
});

router.post(
  "/",
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
  (req, res, next) => {
    console.log(req.body);
    Cars.create(req.body)
      .then((newCar) => {
        console.log(newCar);
        res.json(newCar);
      })
      .catch(next);
  }
);

//eslint-disable-next-line
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});
module.exports = router;
