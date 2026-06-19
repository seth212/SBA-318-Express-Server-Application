import express from 'express';
const router = express.Router();

import reviews from '../data/reviews.js';

router.get('/', (req, res) => {
    res.json(reviews)
})

export default router