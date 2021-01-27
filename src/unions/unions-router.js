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
                .json({error: 'Request body must include a valid page number'})
        }

        try {
            let unions = await UnionService.getPaginatedUnions(db, page)
            let count = await UnionService.countAllUnions(db)
            count = parseInt(count[0].count)
            const pageCount = Math.ceil(count / 10)
            const data = {
                unions,
                pageCount,
                count
            }
            res
                .status(200)
                .json(data)

            next()
        } catch(error){
            next(error)
        }
    })

unionRouter
    .get('/industry', (req, res, next) => {
        const db = req.app.get('db')
        const { page, industry } = req.body

        if(page < 1 || isNaN(page)){
            return res
                .status(400)
                .json({error: 'Request body must include a valid page number'})
        }

        if(!industry){
            return res
                .status(400)
                .json({error: 'Request body must include a valid industry type'})
        }
        next()
    })


module.exports = unionRouter 