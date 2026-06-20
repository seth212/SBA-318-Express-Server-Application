import express from 'express'
const router = express.Router();

import cars from '../data/cars.js'

router.get('/', (req, res) => {
    console.log(req.query)
  let filteredCars = cars;
  if (req.query.make) {
    filteredCars = filteredCars.filter(
      car => car.make.toLowerCase() === req.query.make.toLowerCase()
    );
  }

  res.json(filteredCars);
});

// allows users to search cars by ID
router.get('/:id', (req, res) => {
    const car = cars.find((car) => car.id == req.params.id);

    if (car) {
        res.json(car);
    } else {
        res.status(404).json({ error: 'Car not found'})
    }
});


router.patch("/:id", (req, res) => {
  const car = cars.find(
    (car) => car.id == req.params.id
  );

  if (!car) {
    return res.status(404).json({
      error: "Car not found"
    });
  }

  for (const key in req.body) {
    car[key] = req.body[key];
  }

  res.json(car);
  console.log(cars)
});

router.delete("/:id", (req, res) => {
  const index = cars.findIndex(
    (car) => car.id == req.params.id
  );

  if (index !== -1) {
    const deletedCar = cars.splice(index, 1)
    res.json(deletedCar[0])
    console.log(cars)
  } else {
    return res.status(404).json({
      error: "Car not found"
    })
  }
});



export default router