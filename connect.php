<?php


//i want to use Object oriented Programming with class

class DatabaseConnect{
	//variable declaration called properties in OOP
	private static $_instance = null;
	public $connect;
	public $txt, $pwd;
	
	//declare a function construct
	function __construct() {
		try {
			$this->connect = new PDO('mysql:host=127.0.0.1;dbname=Betting','root','');
			} catch (PDOException $e) {
				die($e->getMessage());
			 
		}
		
	}	
	//a method to instantiate the class
	public function getInstance() {
		//we use self to access the property $_instance then we return the output
		if(isset(self::$_instance)){
			return self::$_instance;
		}
		//we use self to call the property i the same class
		self::$_instance = new DatabaseConnect();
		return self::$_instance;
	}
		

	// to secure user input
	public function secureTxt($txt) {
		$txt = htmlentities($txt);
		$txt= stripslashes($txt);
		$this->txt = $txt;
		return $this->txt; // return the output
	}

	//to secure user password
	public function securePwd($pwd) {
		//$pwd= sha1($pwd);
		$pwd = htmlentities($pwd);
		$pwd = stripslashes($pwd);
		$this->pwd = $pwd;
		return $this->pwd; // return the output
		
	}
	
	//to update the date
	public function currentDate() {
		//getting current date and time
		$d = date("d-m-Y");
		$t = date("h:i:sa");
		$date = $d.' | '.$t;
		$now =  time();	
	}
	
}
	
	
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