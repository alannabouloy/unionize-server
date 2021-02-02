CREATE TABLE "comments"(
    "id" SERIAL PRIMARY KEY,
    "comment" TEXT NOT NULL,
    "union" INTEGER REFERENCES "unions"(id),
    "date" TIMESTAMPTZ DEFAULT NOW() NOT NULL
);