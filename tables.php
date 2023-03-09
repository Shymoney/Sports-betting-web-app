<?php
	require_once "connect.php";

		//instantiate the object 
		$call_db =  DatabaseConnect::getInstance();

		$alter_table = $call_db->connect->prepare("ALTER table registration add User_id varchar(225) unique after REG_id");

		$alter_table->execute();

		//creating tables Registration

		$sql_1 = $call_db->connect->prepare("CREATE table if not exists registration(
		
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
				
			
			)");
			
		$sql_1->execute();
		
		
		
		//create table adminlogin

		$sql_2 = $call_db->connect->prepare("CREATE table if not exists adminlogin(
		
			LoginId int(6) primary key auto_increment not null,
			username varchar(45),
			email varchar(150),
			password1 varchar(25),
			password2 varchar(25)

			)");
		
		$sql_2->execute();
		
			
		
		//create table  league

		$sql_3 = $call_db->connect->prepare("CREATE table if not exists league(
			id_league int primary key auto_increment not null,
			league varchar(225)
			)");

		$sql_3->execute();
		
		
		
		// creat table odd
		$sql_4 = $call_db->connect->prepare( "CREATE table if not exists odds(
			id_odd int primary key auto_increment not null,
			home varchar(225),
			draw varchar(225),
			away varchar(225),
			over varchar(225),
			under varchar(225)
			
			)");

		$sql_4->execute();
		
		
		
		//create table club
		$sql_5 = $call_db->connect->prepare("CREATE table if not exists club(
		id_club int primary key auto_increment not null,
		home varchar(225),
		away varchar(225)
		)");

		$sql_5->execute();
		
		
		//create table category
		$sql_6 = $call_db->connect->prepare("CREATE table if not exists category(
		id_category int primary key auto_increment not null,
		category varchar(225)
		
		)");

		$sql_6->execute();
		
		//create table country
		$sql_7 = $call_db->connect->prepare("CREATE table if not exists country(
		id_score int primary key auto_increment not null,
		country varchar(225))");
		
		$sql_7->execute();

		
		
		//crete table livematches
		
		$sql_8 = $call_db->connect->prepare("CREATE table if not exists livematches(
			match_id int(6) primary key auto_increment not null,
			category varchar(225) ,
			leaguename varchar(225),
			country varchar(225),
			home varchar(225),
			draw varchar(225),
			away varchar(225),
			over varchar(225),
			under varchar(225),
			score varchar(225),
			score1 varchar(225),
			time varchar(225),
			hometeam varchar(225),
			awayteam varchar(225) 
			
			) ");
		
		
		$sql_8->execute();
	
	
	
		//create table upcomingevents
	
		$sql_9 = $call_db->connect->prepare("CREATE table if not exists upcomingevents(
	
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

		)");

		$sql_9->execute();

		
		//create table betslip
		$sql_10 = $call_db->connect->prepare("CREATE TABLE if not exists betslip(
		
		id int(6) primary key auto_increment not null unique ,
		user_id int(6) unique,
		Amountstake int(6),
		NumberofEvents int(10),
		Winnings varchar(225)
		
		)");
		
		$sql_10->execute();
 	
	

		//create table payment
		
		$sql_11 = $call_db->connect->prepare("CREATE TABLE if not exists Payment(
		
		P_id int(6) primary key auto_increment not null,
		user_id int(6) unique,
		Username varchar(45),
		Balance varchar(50),
		Withdraw varchar(50),
		Date varchar(50),
		Time varchar(50))");
		
		$sql_11->execute();
	













?>

