const knex = require('knex')


function makeKnexInstance(){
    return knex({
        client: 'pg',
        connection: process.env.TEST_DATABASE_URL,
    }) 
}

function makeIndustriesArray(){
    return [
        {
            id: 1,
            industry: 'Industry 1'
        },
        {
            id: 2,
            industry: 'Industry 2'
        },
        {
            id: 3,
            industry: 'Industry 3'
        }
    ]
}

function makeCommentsArray(){
    return [
        {
            id: 1,
            name: 'testuser',
            comment: 'comment 1',
            union: 1,
            date: '2029-01-22T16:28:32.615Z'
        },
        {
            id: 2,
            name: 'testuser',
            comment: 'comment 2',
            union: 1,
            date: '2029-01-22T16:28:32.615Z'
        },
        {
            id: 3,
            name: 'testuser',
            comment: 'comment 3',
            union: 1,
            date: '2029-01-22T16:28:32.615Z'
        }
    ]
}

function makeUnionsArray(){
    return [
        {
            id: 1,
            name: 'union1: app',
            desc: 'a description: bun',
            industry: 1,
            webURL:'http://alink.com'
        },
        {
            id: 2,
            name: 'union2: bun',
            desc: 'a description: cat',
            industry: 1,
            webURL: 'http://alink.com'
        },
        {
            id: 3,
            name: 'union3: cat',
            desc: 'a description: app',
            industry: 2,
            webURL:'http://alink.com'
        }
    ]
}

function makeAuthHeader(){
    return `Bearer ${process.env.API_TOKEN}`
}

function cleanTables(db){
    return db.raw(
            `TRUNCATE
                "comments",
                "unions",
                "industry"
            RESTART IDENTITY CASCADE;`
        )
}

function seedComments(db, comments){
    return db.into('comments').insert(comments)
}

function seedIndustries(db, industries){
     return db.into('industry').insert(industries)
}

function seedUnions(db, unions){
    return db.into('unions').insert(unions)
}
       
module.exports = {
    makeKnexInstance,
    makeIndustriesArray,
    makeUnionsArray,
    makeCommentsArray,
    makeAuthHeader,
    cleanTables,
    seedIndustries,
    seedUnions,
    seedComments
}