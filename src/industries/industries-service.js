const IndustryService = {
    getIndustries(db){
        return db
            .from('industry')
            .select('industry')
    }
}

module.exports = IndustryService