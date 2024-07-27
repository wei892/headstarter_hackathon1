--User recipes
CREATE TABLE IF NOT EXISTS user_recipies (
    auth_id TEXT,
    recipe_name TEXT NOT NULL, 
    recipe TEXT NOT NULL,    
    FOREIGN KEY (auth_id) REFERENCES users(auth_id), 
    PRIMARY KEY (auth_id, recipe_name)
);