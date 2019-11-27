--############   DATABASE CREATION   ################
create database navdurga;
use navdurga; 

--############   INITIAL TABLES CREATION   ################
CREATE TABLE users(userid varchar(50), password varchar(255), PRIMARY KEY(userid));
Create Table treatment(id int NOT NULL AUTO_INCREMENT,  name varchar(100) NOT NULL,  description varchar(200), charges int(5), PRIMARY KEY(id));
