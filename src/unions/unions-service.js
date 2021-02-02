const UnionService = {
  getPaginatedUnions(db, page, search) {
    const unionsPerPage = 10;
    const offset = unionsPerPage * (page - 1);
    if (search) {
      return db
        .from("unions")
        .select("*")
        .where("name", "ILIKE", `%${search}%`)
        .orWhere("desc", "ILIKE", `%${search}%`)
        .limit(unionsPerPage)
        .offset(offset);
    }
    return db.from("unions").select("*").limit(unionsPerPage).offset(offset);
    //function to get all of the unions from db
    //should be paginated to 10 at a time
    //if there are search terms, filter unions out by search function
  },

  countAllUnions(db, search) {
    if (search) {
      return db
        .from("unions")
        .count("id")
        .where("name", "ILIKE", `%${search}%`)
        .orWhere("desc", "ILIKE", `%${search}%`);
    }
    return db.from("unions").count("id");
  },

  countUnionsByIndustry(db, industry, search) {
    if (search) {
      return db
        .from("unions")
        .count("id")
        .where({ industry })
        .andWhere(function () {
          this.where("name", "ILIKE", `%${search}%`).orWhere(
            "desc",
            "ILIKE",
            `%${search}%`
          );
        });
    }
    return db.from("unions").count("id").where({ industry });
  },

  getPaginatedUnionsByIndustry(db, industry, page, search) {
    const unionsPerPage = 10;
    const offset = unionsPerPage * (page - 1);
    if (search) {
      return db
        .from("unions")
        .select("*")
        .where({ industry })
        .andWhere(function () {
          this.where("name", "ILIKE", `%${search}%`).orWhere(
            "desc",
            "ILIKE",
            `%${search}%`
          );
        })
        .limit(unionsPerPage)
        .offset(offset);
    }
    return db
      .from("unions")
      .select("*")
      .where({ industry })
      .limit(unionsPerPage)
      .offset(offset);
    //returns all unions based on industry,
    //returns in paginated format of 10 at a time
    //if there are search terms, filter unions out by search
  },

  checkIndustry(db, industry) {
    return db.from("industry").select("*").where({ industry }).first();
  },

  getUnionById(db, unionId) {
    return db.from("unions").select("*").where({ id: unionId }).first();
  },
};

module.exports = UnionService;
