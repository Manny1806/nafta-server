const express = require('express')
const mongoose = require('mongoose')
const cloudinary = require('cloudinary');
var multer  = require('multer')
var upload = multer()
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', {session: false, failWithError: true})

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

router.get('/search', (req, res, next) => {
  
    const term = req.query.term ? req.query.term : "";
    const filter = req.query.filter === 'all' ? "" : req.query.filter
  
    Pro.find({ "title": { "$regex": `${term}`, "$options": "i" }, "type": { "$regex": `${filter}`, "$options": "i" }})
      .sort({ createdAt: 'desc' })
      .then(results => {
          // console.log(results)
        res.json(results);
      })
      .catch(err => {
        next(err);
      });
  });

router.get('/:id', (req, res, next) => {
    const { id } = req.params
    Pro.findById(id)
        .then(results => {
            res.json(results)
        })
        .catch(err => {
            next(err)
        })
})

router.post('/', jwtAuth, (req, res, next) => {
    const {title, type, quote, quoteReference, quoteLink, description, imgUrl} = req.body

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

    if(!type) {
        const err = new Error('Missing `type` in request body')
        err.status = 400
        return next(err)
    }

    const newPro = { title, type, quote, quoteReference, quoteLink, description, imgUrl}

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

router.post('/img', jwtAuth, upload.single('file'),(req, res, next) => {
    // console.log(req)
    cloudinary.v2.uploader.upload_stream({resource_type: 'raw'}, 
    function(error, result){
        console.log(result)
        res.json(result)
    })
    .end(req.file.buffer);

    

})

router.put('/:id', jwtAuth, (req, res, next) => {
    const { id } = req.params
    const { title, type, quote, quoteReference, quoteLink, description, imgUrl} = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error('The `id` is not valid')
        err.status = 400
        return next(err)
    }

    const updatePro = { title, type, quote, quoteReference, quoteLink, description, imgUrl }

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

router.delete('/:id', jwtAuth, (req, res, next) => {
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