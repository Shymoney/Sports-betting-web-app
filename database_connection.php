<?php
//connect to database server 
//created a database called betting  
$connect= mysql_connect("localhost","root","") or die('could not connect'.mysql_error($connect));
$database= mysql_query('create database if not exists Betting',$connect) or die('could not create db'.mysql_error($connect));

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