const supertest = require('supertest')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Industries endpoint', () => {
    let db

    const testIndustries = helpers.makeIndustriesArray()

    before('make knex instance', () => {
        db = helpers.makeKnexInstance()
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))

    describe('GET /api/industries', () => {
        
        beforeEach('insert industries', () => {
            return helpers.seedIndustries(db, testIndustries)
        })

        it('gets list of industries', () => {
            const expectedResponse = testIndustries.map(i => {
                return {industry: i.industry}
            })

            return supertest(app)
                .get('/api/industries')
                .expect(200)
                .expect(expectedResponse)
        })
    })
    
})