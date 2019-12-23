<?php

/*
	//connect to the database server
	//select the database betting to be use
	$connect= mysql_connect("localhost","root","") or die('could not connect to database'.mysql_error($connect));
	$select= mysql_select_db('Betting',$connect) or die('could not select database'.mysql_error($connect));
*/

	class Connect {
		 var $mysql;
		 var $sel;
		 
		function __constructor(){
			
		$this->mysql = mysql_connect("localhost","root","") or die('could not connect'.mysql_error());
		$this->sel = mysql_select_db("Betting",$this->mysql) or die('could not select database'.mysql_error());
			
			
			}
		
		
		
		}

	//$obj = new con;
	$obj = new  Connect;
	$obj->__constructor();
	//$obj->Access();
	
	
?>

