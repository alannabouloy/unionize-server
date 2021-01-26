const express = require('express')
const UnionService = require('./unions-service')

const jsonParser = express.json()
const unionRouter = express.Router()

unionRouter
    .get('/', jsonParser, async (req, res, next) => {
        const db = req.app.get('db')
        const { page } = req.body
        if(page < 1 || isNaN(page)){
            return res
                .status(400)
                .json({error: 'Request must include a valid page number'})
        }

        try {
            let unions = await UnionService.getAllUnions(db, page)
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