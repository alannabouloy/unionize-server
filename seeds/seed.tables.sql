BEGIN;

TRUNCATE
    "unions",
    "industry";


INSERT INTO "industry" ("id", "industry")
VALUES
    (1, 'Industry 1'),
    (2, 'Industry 2'),
    (3, 'Industry 3'),
    (4, 'Industry 4'),
    (5, 'Industry 5');

INSERT INTO "unions" ("id", "name", "industry", "desc", "webURL")
VALUES
    (1, 'Union 1', 1, 'This is a test union: app', 'http://www.testunion.test'),
    (2, 'Union 2', 1, 'This is a test union: app', 'http://www.testunion.test'),
    (3, 'Union 3', 1, 'This is a test union: app', 'http://www.testunion.test'),
    (4, 'Union 4', 1, 'This is a test union: app', 'http://www.testunion.test'),
    (5, 'Union 5', 1, 'This is a test union: app', 'http://www.testunion.test'),
    (6, 'Union 6', 2, 'This is a test union: bun', 'http://www.testunion.test'),
    (7, 'Union 7', 2, 'This is a test union: bun', 'http://www.testunion.test'),
    (8, 'Union 8', 2, 'This is a test union: bun', 'http://www.testunion.test'),
    (9, 'Union 9', 2, 'This is a test union: bun', 'http://www.testunion.test'),
    (10, 'Union 10', 2, 'This is a test union: bun', 'http://www.testunion.test'),
    (11, 'Union 11', 3, 'This is a test union: cat', 'http://www.testunion.test'),
    (12, 'Union 12', 3, 'This is a test union: cat', 'http://www.testunion.test'),
    (13, 'Union 13', 3, 'This is a test union: cat', 'http://www.testunion.test'),
    (14, 'Union 14', 3, 'This is a test union: cat', 'http://www.testunion.test'),
    (15, 'Union 15', 3, 'This is a test union: cat', 'http://www.testunion.test'),
    (16, 'Union 16', 4, 'This is a test union: dog', 'http://www.testunion.test'),
    (17, 'Union 17', 4, 'This is a test union: dog', 'http://www.testunion.test'),
    (18, 'Union 18', 4, 'This is a test union: dog', 'http://www.testunion.test'),
    (19, 'Union 19', 4, 'This is a test union: dog', 'http://www.testunion.test'),
    (20, 'Union 20', 4, 'This is a test union: dog', 'http://www.testunion.test'),
    (21, 'Union 21', 5, 'This is a test union: emu', 'http://www.testunion.test'),
    (22, 'Union 22', 5, 'This is a test union: emu', 'http://www.testunion.test'),
    (23, 'Union 23', 5, 'This is a test union: emu', 'http://www.testunion.test'),
    (24, 'Union 24', 5, 'This is a test union: emu', 'http://www.testunion.test'),
    (25, 'Union 25', 5, 'This is a test union: emu', 'http://www.testunion.test');

COMMIT;