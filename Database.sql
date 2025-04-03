DROP DATABASE IF EXISTS KrishiMitra;

CREATE DATABASE KrishiMitra;

USE KrishiMitra;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username varchar(50),
    PASSWORD varchar(200),
    Email varchar(50),
    mobileNo varchar(10),
    pincode varchar(6)
);

CREATE TABLE equipments (
    userId int,
    equipName varchar(50),
    equipType varchar(50),
    brand varchar(50),
    power varchar(20),
    froms varchar(20),
    tos varchar(20),
    fair varchar(20),
    mobileNo varchar(10),
    pincode varchar(6),
     imagePaths TEXT NOT NULL 
);

CREATE TABLE requests (
    providerId int,
    renterID int,
    mobileNo varchar(10),
    equipName varchar(50),
    equipType varchar(50),
    brand varchar(50),
    power varchar(20),
    froms varchar(20),
    tos varchar(20),
    totalFair varchar(20),
    imagePaths TEXT NOT NULL,
    STATUS varchar(20)
);

CREATE TABLE bookings (
    providerId int,
    renterID int,
    mobileNo varchar(10),
    equipName varchar(50),
    equipType varchar(50),
    brand varchar(50),
    power varchar(20),
    froms varchar(20),
    tos varchar(20),
    totalFair varchar(20),
    imagePaths TEXT NOT NULL ,
    STATUS varchar(20)
);