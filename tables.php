<?php
	require_once "connect.php";
	//instantiate the object 
	$call_db =  DatabaseConnect::getInstance();

	//$alter= mysql_query("alter table registration add User_id varchar(225) unique after REG_id",$connect);
	//creating tables we query
	//mysql_query("drop table REGISTRATION",$connect);
	/*$sql = 'create table if not exists registration(
	
	REG_id int(6) primary key auto_increment not null,
	Username varchar(45) UNIQUE NOT NULL ,
	password1 varchar(25),
	ConfirmPwd varchar(25),
	Email varchar(50) UNIQUE NOT NULL,
	Sname varchar(25),
	Name varchar(225),
	DateofBirth varchar(225),
	gender varchar(6),
	country varchar(15),
	Address varchar(225),
	City varchar(50),
	State varchar(25),
	Mobile varchar(25) UNIQUE NOT NULL,
	agree varchar(6),
	view int
		
	
	)';
		
	mysql_query($sql,$connect) or die('could not create table'.mysql_error());
	if($sql){echo'successfull';}
	*/
	
	/*
	//create table adminlogin
	mysql_query("drop table adminlogin",$connect);
	$sql_2= 'create table if not exists adminlogin(
	
	LoginId int(6) primary key auto_increment not null,
	username varchar(45) ,
	password1 varchar(25) ,
	password2 varchar(25))';
	mysql_query($sql_2,$connect) or die ('could not create'.mysql_error());
	if($sql_2){echo 'succssfully';}
	
	$query= mysql_query("insert into adminlogin(LoginId,username,password1,password2) values('','beni2015','okeke','okeke')",$connect)or die('could not insert'.mysql_error($connect));
	if($query){echo 'successful';}
	*/	
	
	
	
	
	/*
	
	//create table for league
	//mysql_query("drop table league",$connect);
	$query = $call_db->connect->prepare("CREATE table if not exists league(
		id_league int primary key auto_increment not null,
		league varchar(225)
		)");

	$query->execute();
	*/
	
	/*
	
	//table odd
  $query = $call_db->connect->prepare( "create table if not exists odds(
	id_odd int primary key auto_increment not null,
	home varchar(225),
	draw varchar(225),
	away varchar(225),
	over varchar(225),
	under varchar(225))");

	$query->execute();
	*/
	
	
	
	$query = $call_db->connect->prepare("create table if not exists club(
	id_club int primary key auto_increment not null,
	home varchar(225),
	away varchar(225))");

	$query->execute();
	
	/*
	$sql_7= 'create table if not exists category(
	id_category int primary key auto_increment not null,
	category varchar(225))';
	mysql_query($sql_7,$connect) or die('could not select'.mysql_error($connect));
	if($sql_7 ==TRUE){echo "success";}
	elseif($sql_7==FALSE){echo 'unsuccessful';}
	*/
	
	
	$query = $call_db->connect->prepare("create table if not exists country(
	id_score int primary key auto_increment not null,
	country varchar(225))");
	
	$query->execute();
	
	/*
	//mysql_query("drop table livematches");
	//mysql_query("drop table livematches",$connect);
	$sql_9= 'create table if not exists livematches(
	match_id int(6) primary key auto_increment not null,
	category varchar(225) ,
	leaguename varchar(225) ,
	country varchar(225),
	home varchar(225),
	draw varchar(225),
	away varchar(225),
	over varchar(225),
	under varchar(225),
	score varchar(225),
	score1 varchar(225),
	time varchar(225),
	hometeam varchar(225) ,
	awayteam varchar(225)) ';
	mysql_query($sql_9,$connect) or die('could not connect'.mysql_error());
	if($sql_9){echo 'successfully created';}
	
	$insert=mysql_query("LOAD DATA LOCAL INFILE '/path/pet.",$connect);
	if($insert){echo 'loaded successfully';}
	*/
	
	
	//mysql_query("drop table upcomingevents ");
	/*
	$sql_10="create table if not exists upcomingevents(
	
		match_id int(6) primary key auto_increment not null,
		time varchar(8) ,
		date varchar(225),
		homewin varchar(225) ,
		draw varchar(225) ,
		awaywin varchar(225) ,
		homedraw varchar(225) ,
		doublechance varchar(225) ,
		awaydraw varchar(225) ,
		over varchar(225) ,
		under varchar(225) ,
		GoalGoal varchar(225) ,
		NoGoal varchar(225) ,
		hometeam varchar(225),
		awayteam varchar(225)
		)";
		
		$query=mysql_query($sql_10,$connect) or die('could not select'.mysql_error());
		if($query){echo 'successfully';}
	*/
		
		
		$query = $call_db->connect->prepare("create table if not exists betslip(
		
		id int(6) primary key auto_increment not null unique ,
		
		Amountstake int(6),
		NumberofEvents int(10),
		Winnings varchar(225)
		
		)");
		
		$query->execute();
 	
	


		//create table payment
	//mysql_query("drop table payment",$connect);
	
	$query = $call_db->connect->prepare("create table if not exists Payment(
	
	P_id int(6) primary key auto_increment not null,
	Username varchar(45),
	Balance varchar(50),
	Withdraw varchar(50),
	Date varchar(50),
	Time varchar(50))");
	
	$query->execute();
	













?>

