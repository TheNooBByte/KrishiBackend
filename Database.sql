DROP DATABASE IF EXISTS KrishiMitra;

CREATE DATABASE KrishiMitra;

USE KrishiMitra;
-- drop database railway;

-- create database railway;

-- use railway;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username varchar(50),
    PASSWORD varchar(200),
    Email varchar(50),
    mobileNo varchar(10),
    pincode varchar(6),
    aadhaarNo varchar(12),
    aadhaarFront TEXT NOT NULL,
    aadhaarBack TEXT NOT NULL
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
    id int AUTO_INCREMENT PRIMARY KEY,
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