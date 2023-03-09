<?php
	require_once('connect.php');
	//creating tables we query
	//mysql_query("drop table REGISTRATION",$connect);
	$sql = 'create table if not exists Registration(
	
	REG_id int(6) primary key auto_increment not null,
	Username varchar(45),
	Password varchar(25),
	ConfirmPwd varchar(25),
	Email varchar(50),
	Surname varchar(25),
	Name varchar(225),
	DOB varchar(225),
	Gender varchar(6),
	Country varchar(15),
	Address varchar(225),
	City varchar(50),
	State varchar(25),
	Mobile varchar(25),
	agree varchar(6)
	
	)';
	mysql_query($sql,$connect) or die('could not create table'.mysql_error());
	if($sql){echo'successfull';}
	//create table login
	//mysql_query("drop table login",$connect);
	$sql_2= 'create table if not exists Login(
	
	Login_id int(6) primary key auto_increment not null,
	Username varchar(45),
	Password varchar(25),
	view int(1)
		
	)';
	mysql_query($sql_2,$connect) or die ('could not create'.mysql_error());
	if($sql_2){echo 'succssfully';}
	//create table payment
	//mysql_query("drop table payment",$connect);
	$sql_3= 'create table if not exists Payment(
	
	P_id int(6) primary key auto_increment not null,
	Username varchar(45),
	Amount varchar(50),
	Withdraw varchar(50),
	Date varchar(50),
	Time varchar(50)		
	
	)';
	mysql_query($sql_3,$connect) or die ('could not create'.mysql_error());
	if($sql_3){echo 'sucessfully';}
	

?>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
</head>

<body>
</body>
</html>