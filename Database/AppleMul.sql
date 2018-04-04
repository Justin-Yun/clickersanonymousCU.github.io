DROP TABLE Apples ; 
CREATE TABLE  AppleMul  
   (
   UserID       int   unique  NOT NULL ,
   Multiplier   int   NOT NULL ,
   PRIMARY KEY (UserID) 
   ) 
   CHARACTER SET utf8 COLLATE utf8_general_ci;
