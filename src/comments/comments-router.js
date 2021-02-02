const express = require('express')
const CommentsService = require('./comments-service')
const path = require('path')
const xss = require('xss')
const jsonParser = express.json()

const commentsRouter = express.Router()

commentsRouter
    .get('/', async (req, res, next) => {
        const db = req.app.get('db')
        const unionName  = req.query.union
        if(!unionName) {
            return res
                .status(400)
                .json({error: 'Request body must include a union name'})
        }
        try {
            const union = await CommentsService.checkUnion(db, unionName)

            if(!union.id){
                return res
                    .status(404)
                    .json({error: 'there is no union that matches the name you gave'})
            }

            let comments = await CommentsService.getUnionComments(db, union)

            comments = comments.map(comment => comment.comment = xss(comment.comment))

            res
                .status(200)
                .json(comments)

            next()

        } catch(error){
            next(error)
        }   
    })
    .post('/', jsonParser, async (req, res, next) => {
        const db = req.app.get('db')
        
    })