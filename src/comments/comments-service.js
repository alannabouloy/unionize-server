const CommentsService = {
    addComent(db, newComment){
        return db
            .into('comments')
            .insert(newComment)
            .returning('*')
            .then(rows => rows[0])
    },

    checkUnion(db, union){
        return db
            .select('*')
            .from('unions')
            .where({name: union})
            .first()
    },

    getUnionComments(db, union){
        return db
            .select('comment', 'union', 'date')
            .from('comments')
            .where({union: union.id})
    }
}