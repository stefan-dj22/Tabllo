CREATE TABLE Users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Tables (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    creator_id INT NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES Users(id)
);

CREATE TABLE TableMembers (
    table_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    PRIMARY KEY (table_id, user_id),
    FOREIGN KEY (table_id) REFERENCES Tables(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE Columns (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    table_id INT NOT NULL,
    FOREIGN KEY (table_id) REFERENCES Tables(id) ON DELETE CASCADE
);

CREATE TABLE Items (
    id BIGSERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    column_id INT NOT NULL,
    created_by INT NOT NULL,
    FOREIGN KEY (column_id) REFERENCES Columns(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES Users(id) ON DELETE SET NULL
);
