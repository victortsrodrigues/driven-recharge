CREATE TABLE clients (
	id SERIAL PRIMARY KEY,
	cpf VARCHAR(11) NOT NULL UNIQUE
);

CREATE TABLE phones (
	id SERIAL PRIMARY KEY,
	client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
	carrier VARCHAR(255) NOT NULL,
	name VARCHAR(255) NOT NULL,
	description TEXT NOT NULL,
	number VARCHAR(11) NOT NULL UNIQUE,
	CONSTRAINT unique_number UNIQUE (client_id, number),
	CHECK (number ~ '^[0-9]{11}$')
);

SELECT * FROM phones;

CREATE TABLE recharges (
	id SERIAL PRIMARY KEY,
	phone_id INTEGER NOT NULL REFERENCES phones(id) ON DELETE CASCADE,
	value DECIMAL(10,2) NOT NULL,
	CHECK (value >= 10 AND value <= 1000)
);