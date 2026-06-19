import express from 'express'
const router = express.Router();

import cars from '../data/cars.js'

router.get('/', (req, res) => {
    res.json(cars)
})

// allows users to search cars by ID
router.get('/:id', (req, res) => {
    const car = cars.find((car) => car.id == req.params.id);

    if (car) {
        res.json(car);
    } else {
        res.status(404).json({ error: 'Car not found'})
    }
});




export default router