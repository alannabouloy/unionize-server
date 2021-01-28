const express = require('express')
const UnionService = require('./unions-service')
const url = require('url')
const querystring = require('querystring')

const jsonParser = express.json()
const unionRouter = express.Router()

unionRouter
    .get('/', jsonParser, async (req, res, next) => {
        const db = req.app.get('db')
        const page  = req.query.page
        const search = (req.query.q) ? req.query.q : ''

        if(page < 1 || isNaN(page)){
            return res
                .status(400)
                .json({error: 'Request must include a valid page number in url'})
        }

        try {
            let unions = await UnionService.getPaginatedUnions(db, page, search)
            let count = await UnionService.countAllUnions(db, search)
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
    .get('/industry', jsonParser, async (req, res, next) => {
        const db = req.app.get('db')
        const page = req.query.page
        const search = (req.query.q) ? req.query.q : ''
        const industry  = req.query.industry

        if(page < 1 || isNaN(page)){
            return res
                .status(400)
                .json({error: 'Request must include a valid page number in url'})
        }

        if(!industry){
            return res
                .status(400)
                .json({error: 'Request must include a valid industry type in url'})
        }
        const hasIndustry = await UnionService.checkIndustry(db, industry)
        if(!hasIndustry){
            return res
                .status(400)
                .json({error: 'Request must include a valid industry type in url'})
        }
        try {
            let unions = await UnionService.getPaginatedUnionsByIndustry(db, hasIndustry.id, page, search)
            let count = await UnionService.countUnionsByIndustry(db, hasIndustry.id, search)
            count = parseInt(count[0].count)
            const pageCount = Math.ceil(count / 10 )
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


module.exports = unionRouter 