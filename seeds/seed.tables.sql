BEGIN;

TRUNCATE
    "industry-union",
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

    INSERT INTO "industry-union" ("id", "industry", "union")
    VALUES
        (1, 1, 1),
        (2, 1, 2),
        (3, 1, 3),
        (4, 1, 4),
        (5, 1, 5),
        (6, 2, 6),
        (7, 2, 7),
        (8, 2, 8),
        (9, 2, 9),
        (10, 2, 10),
        (11, 3, 11),
        (12, 3, 12),
        (13, 3, 13),
        (14, 3, 14),
        (15, 3, 15),
        (16, 4, 16),
        (17, 4, 17),
        (18, 4, 18),
        (19, 4, 19),
        (20, 4, 20),
        (21, 5, 21),
        (22, 5, 22),
        (23, 5, 23),
        (24, 5, 24),
        (25, 5, 25);

COMMIT;