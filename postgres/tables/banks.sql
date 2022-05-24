BEGIN TRANSACTION;

CREATE TABLE banks(
    id serial PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    balance integer,
    created_at timestamptz DEFAULT Now(),
    updated_at timestamptz
);

COMMIT;
