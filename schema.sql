-- Create the database
CREATE DATABASE SYSadm_db;

-- Connect to the database
-- \c SYSadm_db;

-- Create the assets table
CREATE TABLE assets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) CHECK (status IN ('active', 'inactive', 'maintenance', 'decommissioned')) NOT NULL,
    location VARCHAR(255) NOT NULL,
    ip_address INET NOT NULL,
    next_preventive_maintenance DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the interventions table
CREATE TABLE interventions (
    id SERIAL PRIMARY KEY,
    asset_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (asset_id) REFERENCES assets (id) ON DELETE CASCADE
);

-- Create the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) CHECK (role IN ('admin', 'user')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the certificates table
CREATE TABLE certificates (
    id SERIAL PRIMARY KEY,
    organization_name VARCHAR(255) NOT NULL,
    domain_name VARCHAR(255) NOT NULL,
    expiration_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Check tables in database
-- \dt

-- View table details
-- \d

-- Execute a script sql
-- \i path/

-- Exit
-- \q
