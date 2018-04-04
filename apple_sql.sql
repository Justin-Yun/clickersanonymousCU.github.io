CREATE TABLE UserInfo (UserID int auto_increment NOT NULL, pswd varchar(30), primary key (UserID));
Create TABLE UserData (apple_count int, apple_multiplier int NOT NULL);

#find user
select * from UserInfo where UserID = "whatever id";
	#after finding user
	insert into UserData (apple_count, apple_multiplier) VALUES ('in apple count', 'in apple multiplier');
    