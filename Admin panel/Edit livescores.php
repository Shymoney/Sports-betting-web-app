<?php
	require('Admin connect.php');
	
	if(isset($_GET['match_id']))
	{
	$get=$_GET['match_id'];
	}
	
	$query=mysql_query("SELECT * FROM livematches 
						WHERE match_id='$get'",$connect) or die('could not select'.mysql_error());
						
	while($row= mysql_fetch_array($query,MYSQL_ASSOC))
	{
		
	$id= $row['match_id'];
	$home = $_POST['home'];
	$draw = $_POST['draw'];
	$away = $_POST['away'];
	$over = $_POST['over'];
	$under = $_POST['under'];
	$score = $_POST['score'];
	$score_1 = $_POST['score1'];
	$time = $_POST['time'];
	
	}
	
	
	
	
	
	if(isset($_POST['submit']))
	{
	$hme = $_POST['home'];
	$drw = $_POST['draw'];
	$awy = $_POST['away'];
	$ovr = $_POST['over'];
	$undr = $_POST['under'];
	$sco = $_POST['score'];
	$sco_1 = $_POST['score1'];
	$tyme = $_POST['time'];
	
		
$insert= mysql_query("UPDATE livematches SET home='$hme',draw='$drw',away='$awy',over='$ovr',under='$undr',score='$sco',score1='$sco_1',time='$tyme'
WHERE match_id='$get'",$connect) or die(''.mysql_error());
	
		

		
	if($insert){echo '<script type="text/javascript">
						var msg = "successfully inserted";
						alert(msg);
						</script>';}
		}
	
	
	
	
	
	



?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
<link href="css/adminupload.css" rel="stylesheet" type="text/css" />
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
<div class="cont_box"><a href="#">View Registered Users</a></div>
<div class="cont_box"><a href="#">Edit live Scores</a></div>
<div class="cont_box"><a href="#">Select Sports Category</a></div>
<div class="cont_box"><a href="#">Select Sports Category</a></div>

</div>

<div class="right">
  <div class="category">
  <div class="sport_box">Odds</div>
<div class="odd_box"><input name="home" type="text" class="odds_style" id="home"  value="<?php echo $home?>" placeholder="Home"/></div>
<div class="odd_box"><input name="draw" type="text" class="odds_style" id="draw"  value="<?php echo $draw?>" placeholder="Away"/></div>
<div class="odd_box"><input name="away" type="text" class="odds_style" id="away"  value="<?php echo $away?>" placeholder="Draw"/></div>
<div class="odd_box"><input name="over" type="text" class="odds_style" id="over"  value="<?php echo $over?>" placeholder="Over1.5"/></div>
<div class="odd_box"><input name="under" type="text" class="odds_style" id="under"  value="<?php echo $under?>" placeholder="Under1.5"/></div>

</div>

<div class="category">
<div class="sport_box">Score</div>
<div class="sport_box"><input name="score" type="text" class="odds_style" id="score"  value="<?php echo $score?>"/></div>
<div class="sport_box"><input name="score1" type="text" class="odds_style" id="score1"  value="<?php echo $score_1?>"/></div>
</div>
<div class="category">
<div class="sport_box">Time</div>
<div class="odd_box"><input name="time" type="text" class="odds_style" id="time"  value="<?php echo $time?>" placeholder="match time"/></div>
</div>
<div class="category">
  <div class="submit"><input name="submit" type="submit" value="Update Live Scores" id="submit" /></div>

</div>


</div>
</form>
</div>
</body>
</html>