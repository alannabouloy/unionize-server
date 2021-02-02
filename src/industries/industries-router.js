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

module.exports = industryRouter