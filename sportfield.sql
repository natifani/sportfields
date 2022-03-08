-- Nagy Tifani Franciska 523 ntim1937
CREATE DATABASE IF NOT EXISTS sportsfield_db;
USE sportsfield_db;

DROP TABLE IF EXISTS `reservations`;
DROP TABLE IF EXISTS `images`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `sportFields`;

CREATE TABLE IF NOT EXISTS `users` (
	`userID` INT PRIMARY KEY auto_increment,
	`userName` VARCHAR(255) UNIQUE NOT NULL,
	`email` VARCHAR(255) NOT NULL,
	`name` VARCHAR(255) NOT NULL,
	`birthDate` DATE,
	`education` VARCHAR(255),
	`password` VARCHAR(511) NOT NULL,
	`role` VARCHAR(255) NOT NULL,
	`blocked` INT NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `sportFields` (
	`fieldID` INT PRIMARY KEY auto_increment,
	`fieldType` VARCHAR(255) NOT NULL,
  `isIndoor` INT,
	`wage` FLOAT NOT NULL,
	`name` VARCHAR(255) UNIQUE NOT NULL,
	`fieldDescription` TEXT
) Engine=InnoDB;

CREATE TABLE IF NOT EXISTS `reservations` (
	`reservID` INT PRIMARY KEY auto_increment,
	`fieldID` INT,
  `userName` VARCHAR(255) NOT NULL,
	`startDate` DATETIME,
	`endDate` DATETIME,
  `day` VARCHAR(255),
  `startHour` TIME,
  `endHour` TIME
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `images` (
	`fieldID` INT,
	`imageName` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`fieldID`, `imageName`)
) ENGINE=InnoDB;

INSERT INTO `users` VALUES (default, 'jon_snow', 'jon_snow@example.com', 'Jon Snow', '1998-11-11', NULL, '$2b$10$gNAD.guXwBQHAnY8uRIJOOGJqMSgTKgYnwRb4jS5Y6EI.WPX8iKvS', 'user', 0), (default, 'arya.stark', 'arya.stark@example.com', 'Arya Stark', '2000-05-05', 'UBB Sports', '$2b$10$GIgnqf5aN2ac2sjpe6fHuORNEC6wPh2A5dpgqJ8eaAcTB9Tm3bHeS', 'user', 0), (default, 'cersei.lannister', 'cersei.lannister@example.com', 'Cersei Lannister', '1977-08-08', NULL, '$2b$10$PQvAMcOCVZGPEJOhw61jv.dn9FnbZLbT2hDLqTVAWCLmOXGfVmWIK', 'user', 0), (default, 'theon_greyjoy', 'theon_greyjoy@example.com', 'Theon Greyjoy', '1998-04-04', 'Oxford University Of Law', '$2b$10$ZlpqSGedqc/QWU1EatA5b.YBAqeahxsBrp5V2OzAM/8DXv7lFP/W2', 'user', 0), (default, 'briee', 'briee@example.com', 'Brienne Of Tarth', '1997-12-12', 'Cambridge University Of Sports', '$2b$10$7M2TmLYHDJqtOV3CZHbWHOx5NUsGuSIedFM72eNXZf8zBTtSsXifC', 'user', 0), (default, 'hodor', 'hodor@example.com', 'Hodor', '1979-09-09', NULL, '$2b$10$7Sc.J5mm1PDxu1hkIx0i5.DYPLPbskC8sda5m3V.YugrI9yQZoCE.', 'user', 0), (default, 'night_king', 'night_king@example.com', 'Night King', NULL, NULL, '$2b$10$wQIFFYctJeyeDZJnjOTQ5uf5TknvqL46CJTdliw1bo.KbzAMqinzu', 'admin', 0);
INSERT INTO `sportfields` VALUES (default, 'tennis', 0, 9, 'Wimbledon Tennis Court', 'This is a nice tennis court for professionals and beginners.'), (default, 'football', 0, 5, 'Puskas Ferenc Stadion', 'A big field with a lot of space.'), (default, 'basketball', 1, 6.5, 'NBA Basketball Field', 'A big field with a lot of space.');
select * from `users`;
select * from `reservations`;
select * from `sportfields`;
select * from `images`;


