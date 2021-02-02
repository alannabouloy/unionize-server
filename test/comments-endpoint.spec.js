const { before } = require('mocha')
const supertest = require('supertest')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Comments endpoint', () => {
    let db

    const testIndustries = helpers.makeIndustriesArray()
    const testUnions = helpers.makeUnionsArray()
    const testComments = helpers.makeCommentsArray()

    before('make knex instance', () => {
        db = helpers.makeKnexInstance()
        app.set('db', db)
    })

    after('disconnect from db', () =>  db.destroy())

    before('cleanup', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))

    describe('GET /api/comments', () => {
        
        beforeEach('insert industries', () => {
            return helpers.seedIndustries(db, testIndustries)
        })

        beforeEach('insert unions', () => {
            return helpers.seedUnions(db, testUnions)
        })

        context('with no comments', () => {
            it('returns an empty array', () => {
                return supertest(app)
                .get('/api/comments/?union=union1:%20app')
                .set('Authorization', helpers.makeAuthHeader())
                .expect(200)
                .expect([])
            })
        })

        context('with comments', () => {
            beforeEach('insert comments', () => {
                return helpers.seedComments(db, testComments)
            })

            it('returns expected array', () => {
                return supertest(app)
                .get('/api/comments/?union=union1:%20app')
                .set('Authorization', helpers.makeAuthHeader())
                .expect(200)
                .expect(testComments)
            })
        })
    })

    describe('POST /api/comments', () => {

        beforeEach('insert industries', () => {
            return helpers.seedIndustries(db, testIndustries)
        })

        beforeEach('insert unions', () => {
            return helpers.seedUnions(db, testUnions)
        })

        it('returns the new comment and adds to db', () => {
            const newComment = {
                name: 'testuser',
                comment: 'a test comment',
                date: '2029-01-22T16:28:32.615Z'
            }

            const unionName = testUnions[0].name

            const expectedResults = {
                ...newComment,
                union: 1,
                id: 1
            }

            return supertest(app)
                .post('/api/comments')
                .set('Authorization', helpers.makeAuthHeader())
                .send({
                    ...newComment,
                    unionName
                })
                .expect(201)
                .expect(expectedResults)
                .then(() => {
                    return supertest(app)
                    .get('/api/comments/?union=union1:%20app')
                    .set('Authorization', helpers.makeAuthHeader())
                    .expect(200)
                    .expect([expectedResults])
                })


        })
    })
})