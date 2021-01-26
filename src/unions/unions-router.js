const express = require('express')
const UnionService = require('./unions-service')


const unionRouter = express.Router()

unionRouter
    .get('/', async (req, res, next) => {
        try {
            const unions = await UnionService.getAllUnions(req.app.get('db'))
            res
                .status(200)
                .json(unions)

            next()
        } catch(error){
            next(error)
        }
    })

unionRouter
    .get('/industry', (req, res, next) => {
        res.send('ok')
        next()
    })

module.exports = unionRouter 