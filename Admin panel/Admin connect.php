<?php

class DatabaseConnect {

	private static $_instance = null;
	public $connect;
	public $txt, $pwd;

	public function __construct() {
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



