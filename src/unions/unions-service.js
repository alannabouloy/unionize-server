
const UnionService = {
    getPaginatedUnions(db, page, search){
        const unionsPerPage = 10
        const offset = unionsPerPage * (page - 1)
        return db
            .from('unions')
            .select('name', 'industry', 'desc', 'webURL')
            .limit(unionsPerPage)
            .offset(offset)
        //function to get all of the unions from db
        //should be paginated to 10 at a time 
        //if there are search terms, filter unions out by search function
    },

    countAllUnions(db, search){
        return db
            .from('unions')
            .count('id')
    },

    countUnionsByIndustry(db, industry, search){
        return db
            .from('unions')
            .count('id')
            .where({industry})
    },

    getPaginatedUnionsByIndustry(db, industry, page, search){
        const unionsPerPage = 10
        const offset = unionsPerPage * (page - 1)
        return db
            .from('unions')
            .select('name', 'industry', 'desc', 'webURL')
            .where({industry})
            .limit(unionsPerPage)
            .offset(offset)
        //returns all unions based on industry,
        //returns in paginated format of 10 at a time
        //if there are search terms, filter unions out by search
    },

    checkIndustry(db, industry){
        return db
            .from('industry')
            .select('*')
            .where({industry})
            .first()
    }

}

module.exports = UnionService