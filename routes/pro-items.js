const express = require('express')
const mongoose = require('mongoose')

const Pro = require('../models/pro');

const router = express.Router()

router.get('/', (req, res, next) => {
    Pro.find()
        .sort({title: 'asc'})
        .then(results => {
            res.json(results)
        })
        .catch(err => {
            next(err)
        })
})

router.post('/', (req, res, next) => {
    const {title, quote, quoteReference, quoteLink, type, description, imageUrl} = req.body

    if(!title) {
        const err = new Error('Missing `title` in request body')
        err.status = 400
        return next(err)
    }

    if(!quote) {
        const err = new Error('Missing `quote` in request body')
        err.status = 400
        return next(err)
    }

    const newPro = { title, quote, quoteReference, quoteLink, type, description, imageUrl}

    Pro.create(newPro)
        .then(result => {
            res
                .status(201)
                .json(result)
        })
        .catch(err => {
            next(err)
        })
})

router.put('/:id', (req, res, next) => {
    const { id } = req.params
    const { title, quote, quoteReference, quoteLink, type, description, imageUrl} = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error('The `id` is not valid')
        err.status = 400
        return next(err)
    }

    const updatePro = { title, quote, quoteReference, quoteLink, type, description, imageUrl }

    Pro.findByIdAndUpdate(id, updatePro, {new: true})
        .then(result => {
            if (result) {
                res.json(result)
            }
            else {
                next()
            }
        })
        .catch(err => {
            next(err)
        })
})

router.delete('/:id', (req, res, next) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error('The `id` is not valid')
        err.status = 400
        return next(err)
    }

    Pro.findByIdAndRemove(id)
        .then(() => {
            res.sendStatus(204)
        })
        .catch(err => {
            next(err)
        })
})

module.exports = router