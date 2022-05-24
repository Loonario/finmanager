BEGIN TRANSACTION;

CREATE TYPE transactionType AS ENUM ('profitable', 'consumable');

CREATE TABLE transactions(
    id serial PRIMARY KEY,
    amount integer,
    type transactionType NOT NULL,
    created_at timestamptz DEFAULT Now(),
    updated_at timestamptz
);

COMMIT;
