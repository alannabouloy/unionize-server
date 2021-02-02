const IndustryService = {
    getIndustries(db){
        return db
            .from('industry')
            .select('industry')
    },

    getIndustryById(db, industryId){
        return db
            .from('industry')
            .where({id: industryId})
            .first()
    }
}

module.exports = IndustryService