-- Create the database
CREATE DATABASE school_management;

-- Use the newly created database
USE school_management;

-- Create the schools table
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);

-- Insert dummy data
INSERT INTO schools (name, address, latitude, longitude) VALUES
('Greenwood International School', '123 Main St, New York, NY', 40.7128, -74.0060),
('Blue Ocean Academy', '456 Elm St, Los Angeles, CA', 34.0522, -118.2437),
('Sunshine Public School', '789 Oak St, Chicago, IL', 41.8781, -87.6298),
('Horizon High School', '321 Pine St, Houston, TX', 29.7604, -95.3698),
('Evergreen Academy', '567 Maple St, San Francisco, CA', 37.7749, -122.4194);
