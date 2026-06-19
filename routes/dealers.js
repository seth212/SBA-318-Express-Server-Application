import express from 'express'
const router = express.Router();

import dealers from '../data/dealers.js'

router.get('/', (req, res) => {
    res.json(dealers)
})

export default router