<?php
	require('Admin connect.php');
	
	$reg_id= $_GET['REG_id'];
	
	$result= mysql_query("select * from registration order by REG_id desc",$connect) or die ('could not select'.mysql_error());
	$count = 0;
	while($row = mysql_fetch_array($result,MYSQL_ASSOC))
	{
		$user_id[]= $row['User_id'];
		$name[]= $row['Name'];
		$email[]= $row['Email'];
		$count ++;
		
		
	 }

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>View Reg Users</title>
<link href="css/adminupload.css" rel="stylesheet" type="text/css" />
<style type="text/css">
a:hover {
	color: #278B47;
	text-decoration: underline;
}
a:active {
	color: #966;
	text-decoration: none;
}
a:link {
	color: #333;
	text-decoration: none;
}
a:visited {
	text-decoration: none;
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
<div class="cont_box"><a href="upload upcoming events.php">Upload Upcoming Events</a></div>
<div class="cont_box"><a href="View reg users.php">View Registered Users</a></div>
<div class="cont_box"><a href="view live match.php">View Live Match</a></div>
<div class="cont_box"><a href="#">Select Sports Category</a></div>
<div class="cont_box"><a href="#">Select Sports Category</a></div>
<div class="cont_box"><a href="#">Select Sports Category</a></div>

</div>

<div class="right">
  <div class="category">
    <table width="736" border="0">
      <tr>
    <td width="118" bgcolor="#C61C1C">User_id</td>
    <td width="171" bgcolor="#C61C1C">Name</td>
    <td width="254" bgcolor="#C61C1C">Gender</td>
    <td width="39" bgcolor="#C61C1C">View</td>
    <td width="39" bgcolor="#C61C1C">Edit</td>
    <td width="39" bgcolor="#C61C1C">Del</td>
  </tr>
  <?php for($a=0; $a<$count; $a++) {?>
  <tr>
    <td height="39" bgcolor="#FFFFFF"><?php echo $user_id[$a]?></td>
    <td bgcolor="#FFFFFF"><?php echo $name[$a] ?></td>
    <td bgcolor="#FFFFFF"><?php echo $email[$a] ?></td>
    <td bgcolor="#FFFFFF"><a href="#">View</a></td>
    <td bgcolor="#FFFFFF"><a href="#">Edit</a></td>
    <td bgcolor="#FFFFFF"><a href="#">Del</a></td>
  </tr>
  <?php ;}?>
</table>


  </div>
</div>
</form>.

</div>
</body>
</html>