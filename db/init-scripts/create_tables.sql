CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Tables (
    table_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    creator_id INT NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES Users(user_id)
);

CREATE TABLE TableMembers (
    table_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (table_id, user_id),
    FOREIGN KEY (table_id) REFERENCES Tables(table_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE Columns (
    column_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    table_id INT NOT NULL,
    FOREIGN KEY (table_id) REFERENCES Tables(table_id) ON DELETE CASCADE
);

CREATE TABLE Items (
    item_id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    column_id INT NOT NULL,
    created_by INT NOT NULL,
    FOREIGN KEY (column_id) REFERENCES Columns(column_id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES Users(user_id) ON DELETE SET NULL
);
