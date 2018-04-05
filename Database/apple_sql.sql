#create UserInfo table
DROP TABLE UserInfo;
CREATE TABLE UserInfo (UserID int auto_increment NOT NULL, password varchar(30), primary key (UserID));

#creat UserData table
DROP TABLE UserData;
Create TABLE UserData (user_name varchar(30) NOT NULL, apple_count int, apple_multiplier int NOT NULL, primary key (user_name));

#find user
select * from UserInfo where UserID = "whatever id";
	#after finding user
	insert into UserData (apple_count, apple_multiplier) VALUES ('in apple count', 'in apple multiplier');
    