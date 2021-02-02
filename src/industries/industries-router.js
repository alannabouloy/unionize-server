const express = require('express')
const IndustryService = require('./industries-service')



const industryRouter = express.Router()

industryRouter
    .get('/', async (req, res, next) => {
        try{
            const industries = await IndustryService.getIndustries(req.app.get('db'))
            res
                .status(200)
                .json(industries)

            next()
        } catch(error){
            next(error)
        }
    })
industryRouter
    .get('/:industryId', async (req, res, next) => {
        const db = req.app.get('db')
        const industryId = req.params.industryId

        try {
            const industry = await IndustryService.getIndustryById(db, industryId)

            if(!industry){
                return res
                    .status(404)
                    .json({error: 'Industry Not Found'})
            }

            res
                .status(200)
                .json(industry)

            next()
        } catch(error){
            next(error)
        }
    })
module.exports = industryRouter