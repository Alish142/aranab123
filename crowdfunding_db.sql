-- Create the database
CREATE DATABASE crowdfunding_db;

-- Use the created database
USE crowdfunding_db;

-- Create CATEGORY table
CREATE TABLE category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Here the fundraiser table is made
CREATE TABLE fundraiser (
    fundraiser_id INT AUTO_INCREMENT PRIMARY KEY,
    organizer_name VARCHAR(255),
    description TEXT,  
    target_funding INT,  
    current_funding INT,  
    city VARCHAR(100),
    is_active BOOLEAN,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES category(category_id)
);

-- Here the donation table
CREATE TABLE donation (
    donation_id INT AUTO_INCREMENT PRIMARY KEY,
    date DATETIME,
    amount INT,
    giver VARCHAR(255),
    fundraiser_id INT,
    FOREIGN KEY (fundraiser_id) REFERENCES fundraiser(fundraiser_id)
);

--  Here the data is Insert  into CATEGORY table
INSERT INTO category (name) VALUES 
('Education'),
('Environment'),
('Health'),
('Social Work Centre'),
('Animal Centre');

--  Here the data  is insert into FUNDRAISER table
-- Insert records into FUNDRAISER table
INSERT INTO fundraiser (organizer_name, description, target_funding, current_funding, city, is_active, category_id)
VALUES 
('SUNNY SINGH', 'HOMELESS PEOPLE FOR FOOD', 1234, 140000, 'CANBERRA', TRUE, 1),
('ARJUN SINGH', 'OLD AGE PEOPLE FOR HOMESICKNESS', 234555, 211112, 'SOUTH AUSTRALIA', TRUE, 1),
('TEJI SINGH', 'FUNDING FOR CHILDREN WITH NO EDUCATIONAL BACKGROUND', 1231234, 3234322, 'SUNSHINE COAST', TRUE, 1),
('RAHUL SINGH', 'TREATMENT FOR THE CANCER OF OLD PEOPLE', 3454354, 324233, 'TWEED HEAD', TRUE, 1),
('KAUR SINGH', 'PROVIDING TO BUILD NEW HOMES IN AUSTRALIA', 234444, 543543, 'GEELONG', TRUE, 1),
('ANITA RAO', 'EDUCATIONAL PROGRAMS FOR UNDERPRIVILEGED CHILDREN', 500000, 120000, 'MELBOURNE', TRUE, 2),
('MAYA VERMA', 'CLEAN WATER PROJECT FOR RURAL AREAS', 300000, 85000, 'BRISBANE', TRUE, 2),
('RAHUL MEHRA', 'SUPPORT FOR DISABLED VETERANS', 450000, 200000, 'PERTH', TRUE, 3),
('PRIYA GUPTA', 'MEDICAL AID FOR LOW-INCOME FAMILIES', 700000, 350000, 'SYDNEY', TRUE, 4),
('KARAN SHARMA', 'ANIMAL RESCUE AND SHELTER', 150000, 30000, 'GOLD COAST', TRUE, 5);

--  Here the data is insert  into DONATION table
INSERT INTO donation (date, amount, giver, fundraiser_id)
VALUES 
(NOW(), 100, 'Harmn Singh', 1),
(NOW(), 250, 'Rahul Singh', 2),
(NOW(), 500, 'Kamal Kaur', 3),
(NOW(), 75, 'Dilpreet Kaur', 1),
(NOW(), 120, 'Terra Kaur', 2),
(NOW(), 200, 'Jessica Kaur', 3),
(NOW(), 50, 'Ram ', 4),
(NOW(), 300, 'Sham ', 5),
(NOW(), 150, 'Sitta', 1),
(NOW(), 400, 'Gitta', 3);
