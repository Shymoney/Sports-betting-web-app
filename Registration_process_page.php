<?php
ob_start();
require_once('connect.php');
	
	//if all the condition is set submit to the database
	if(isset($_POST['Submit'])) {
		$username = mysql_real_escape_string( $_POST['Username']);
		$Pwd = crypt(mysql_real_escape_string($_POST['password1']));
		$confirm_Pwd = crypt(mysql_real_escape_string( $_POST['Confirm_pwd']));
		$email = mysql_real_escape_string($_POST['Email']);
		$sname = mysql_real_escape_string($_POST['Sname']);
		$name = mysql_real_escape_string($_POST['Name']);
		$day = $_POST['day'];
		$month = $_POST['month'];
		$year = $_POST['year'];
		$date= $day.'/'.$month.'/'.$year;//concatenate day/month/year
		$gender = mysql_real_escape_string($_POST['gender']);
		$contry = $_POST['country'];
		$address = mysql_real_escape_string($_POST['Address']);
		$city = mysql_real_escape_string($_POST['City']);
		$state = mysql_real_escape_string($_POST['State']);
		$mobile = mysql_real_escape_string($_POST['Mobile']);	
		$check = $_POST['agree'];	
		
	$user_id= uniqid(rand(100000,999999));
	$validate= mysql_query("select * from registration where User_id='$user_id'",$connect);
	$num= mysql_num_rows($validate);
	
	if($num>0)
	{
		$user_id-= 1;
		
		}
		elseif($num==0)
		{
	
	$insert= mysql_query("INSERT INTO registration
	 
	
	values('','$user_id','$username','$Pwd','$confirm_Pwd','$email','$sname','$name','$date','$gender','$contry','$address','$city','$state','$mobile','$check','')",$connect) or die(''.mysql_error());
	

  header("location:welcome registration.php?= $user_id ");
		}
}
mysql_close();



?>