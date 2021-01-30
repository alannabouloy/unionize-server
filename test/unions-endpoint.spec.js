const supertest = require('supertest')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe.only('Unions endpoints', () => {
    let db

    const testIndustries = helpers.makeIndustriesArray()
    const testUnions = helpers.makeUnionsArray()

    before('make knex instance', () => {
        db = helpers.makeKnexInstance()
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))

    describe('GET /api/unions', () => {

        beforeEach('insert industries', () => {
            return helpers.seedIndustries(db, testIndustries)
        })

        beforeEach('insert unions',() => {
            return helpers.seedUnions(db, testUnions)
        })

        context('without search', () => {
            it('returns array of unions', () => {
                const unions = testUnions.map(u => {
                    return {
                       name: u.name,
                       desc: u.desc,
                       industry: u.industry,
                       webURL: u.webURL
                    }
                })

                const expectedResults = {
                    unions,
                    pageCount: 1,
                    count: 3
                }

                return supertest(app)
                    .get('/api/unions/?page=1')
                    .expect(200)
                    .expect(expectedResults)
            })
        })

        context('with search', () => {
            it('returns array of unions matching search', () => {
                let unions = [testUnions[0], testUnions[2]]
                unions = unions.map(u => {
                    return {
                       name: u.name,
                       desc: u.desc,
                       industry: u.industry,
                       webURL: u.webURL
                    }
                })  
                
                const expectedResults = {
                    unions,
                    pageCount: 1,
                    count: 2
                }

                return supertest(app)
                    .get('/api/unions/?page=1&q=app')
                    .expect(200)
                    .expect(expectedResults)
            })
        })
    })
})