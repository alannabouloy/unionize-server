CREATE TABLE "industry-union"(
    "id" SERIAL PRIMARY KEY,
    "industry" INTEGER REFERENCES "industry"(id),
    "union" INTEGER REFERENCES "unions"(id),
);