const UnionService = {
    getAllUnions(db, page, search){
        return db
            .from('unions')
            .select('name', 'industry', 'desc', 'webURL')
        //function to get all of the unions from db
        //should be paginated to 10 at a time 
        //if there are search terms, filter unions out by search function
    },

    getUnionsByIndustry(db, industry, page, search){
        //returns all unions based on industry,
        //returns in paginated format of 10 at a time
        //if there are search terms, filter unions out by search
    },

    searchUnions(db, search){
        //takes list of unions given and filters by search term
    }
}

module.exports = UnionService