CREATE TABLE "unions"(
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "industry" INTEGER REFERENCES "industry"(id)
    "desc" TEXT NOT NULL,
    "webURL" TEXT NOT NULL,
);