<?php
	require('Admin connect.php');
	
	if(isset($_POST['submit'])){
		
$league= $_POST['League'];

$query= "INSERT INTO league
		values('','$league')";
mysql_query($query,$connect)or die('could not connect'.mysql_query());		
	
if($query){echo '<script type="text/javascript">
				var msg= "succssfully inserted";
				alert(msg);
				</script>';}	
		

}
	



?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>league Name </title>
<link href="css/adminupload.css" rel="stylesheet" type="text/css" />
<style type="text/css">
a:link {
	color: #333;
	text-decoration: none;
}
a:visited {
	text-decoration: none;
}
a:hover {
	text-decoration: underline;
	color: #278B47;
}
a:active {
	text-decoration: none;
	color: #C61C1C;
}
</style>
</head>

<body bgcolor="#333333">
<div class="wrapper">
<form action="" method="post" enctype="multipart/form-data">
<div class="banner">
<div class="logo_box"><img src="../images/alabi logo.png" width="260" height="63" /></div>
</div>
<div class="left">
<div class="cont_box"><a href="category.php">Select Sports Category</a></div>
<div class="cont_box"><a href="league name.php">Select League Name</a></div>
<div class="cont_box"><a href="country.php">Select Country</a></div>
<div class="cont_box"><a href="Upload live matches.php">Upload Live Match</a></div>
<div class="cont_box"><a href="#">Upload Upcoming Events</a></div>
<div class="cont_box"><a href="#">View Registered Users</a></div>
<div class="cont_box"><a href="#">Select Sports Category</a></div>
<div class="cont_box"><a href="#">Select Sports Category</a></div>
<div class="cont_box"><a href="#">Select Sports Category</a></div>

</div>

<div class="right">
  <div class="category">
  <div class="sport_box">League Name</div>
<div class="long"><input name="League" type="text" class="long_style" id="League" placeholder="input the name of the league" /></div>
  </div>
  <div class="category">
  <div class="submit"><input name="submit" type="submit" value="Submit" id="submit" /></div>

</div>


</div>
</form>
</div>
</body>
</html>