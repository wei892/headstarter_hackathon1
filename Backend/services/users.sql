-- users.sql
CREATE TABLE IF NOT EXISTS users (
    auth_id TEXT NOT NULL PRIMARY KEY,
    initial_weight INTEGER NOT NULL,
    goal_weight INTEGER NOT NULL,
    height iNTEGER NOT NULL,
    gender TEXT NOT NULL,
    activity_level TEXT NOT NULL
);



