<?php
	require_once('Admin connect.php');
	
	//restrict the user from accessing this page without login
	if(isset($_COOKIE['user'])) $cook = $_COOKIE['user']; else{header('location:Admin login.php');}
	
	if(isset($_POST['submit']))
	{
		
	$time = $_POST['time'];
	$day= $_POST["day"];						// day
	$month= $_POST['month'];					//month
	$year= $_POST['year'];						//year
	$date= $year.' '.$month.' '.$day;			//concatenate
	$home_win = $_POST['homewin'];
	$draw = $_POST['draw'];
	$away_win = $_POST['awaywin'];
	$home_draw = $_POST['homedraw'];
	$double = $_POST['doublechance'];
	$away_draw = $_POST['awaydraw'];
	$over = $_POST['over'];
	$under = $_POST['under'];
	$GG = $_POST['GoalGoal'];
	$NG = $_POST['NoGoal'];
	$club_home = $_POST['hometeam'];
	$club_away = $_POST['awayteam'];
	
	$match_id= rand(100,999);
	$valid= mysql_query("SELECT * FROM upcomingevents 
						WHERE match_id = '$match_id'",$connect) 
						or die('could not select'.mysql_error());
						
	$num= mysql_num_rows($valid);
	
	if($num >0)
	{
	$match_id= -2;
	}
	elseif($num==0)
		{
		
$insert= "INSERT INTO upcomingevents
			values('$match_id','$time','$date','$home_win','$draw','$away_win','$home_draw','$double','$away_draw','$over','$under','$GG',
			'$NG','$club_home','$club_away')";
			
$query= mysql_query($insert,$connect) or die('could not insert values'.mysql_error($connect));
	
		
	if($query){echo '<script type="text/javascript">
						var msg = "successfully inserted upcomig matches";
						alert(msg);
						</script>';}
		}
	
	}
	



?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Upload upcoming events</title>
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
	color: #000;
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
<div class="cont_box"><a href="view live match.php">View Live Match  </a></div>
<div class="cont_box"><a href="#">Select Sports Category</a></div>
<div class="cont_box"><a href="#">Select Sports Category</a></div>

</div>

<div class="right">
  


<div class="category">
<div class="sport_box">Time</div>
<div class="odd_box"><input name="time" type="text" class="odds_style" id="time"  placeholder="match time"/></div>
</div>

<div class="category">
<div class="sport_box">Day</div>
<div class="sport_box">
<select name="day" class="date_style" id="day">
<?php for($a=1; $a<=31; $a++) { $a?>
  <option value="<?php echo $a ?>"><?php echo $a ?></option>
<?php ;}?>  
</select>
</div>
<div class="sport_box_date">Month</div>
<div class="sport_box">
<select name="month" class="date_style" id="month">
<?php $month=array('January','Febuary','March','April','May',
					'June','July','August','September','October','November','December');
foreach($month as $m){ echo $m
?>

  <option value="<?php echo $m;	?>"><?php echo $m?></option>
<?php ;}?>
</select>
</div>
<div class="sport_box_date">Year</div>
<div class="sport_box">
<select name="year" size="1" class="date_style" id="year">
<?php  for($y=2015; $y<=2020; $y++){ $y?>
<option value="<?php echo $y?>"><?php echo $y?></option>
<?php ;}?>
</select>
</div>
</div>

<div class="category">
    <div class="sport_box">Odds</div>
<div class="odd_box"><input name="homewin" type="text" class="odds_style" id="homewin"  placeholder="Home win"/></div>
<div class="odd_box"><input name="draw" type="text" class="odds_style" id="draw"  placeholder="Draw"/></div>
<div class="odd_box"><input name="awaywin" type="text" class="odds_style" id="awaywin"  placeholder="Away win"/></div>
<div class="odd_box"><input name="homedraw" type="text" class="odds_style" id="homedraw"  placeholder="Home draw"/></div>
<div class="odd_box"><input name="doublechance" type="text" class="odds_style" id="doublechance"  placeholder="double chances"/></div>

</div>


<div class="category">
    <div class="sport_box">Odds</div>
<div class="odd_box"><input name="awaydraw" type="text" class="odds_style" id="awaydraw"  placeholder="Away draw"/></div>
<div class="odd_box"><input name="over" type="text" class="odds_style" id="over"  placeholder="Over"/></div>
<div class="odd_box"><input name="under" type="text" class="odds_style" id="under"  placeholder="Under"/></div>
<div class="odd_box"><input name="GoalGoal" type="text" class="odds_style" id="GoalGoal"  placeholder="Goal Goal"/></div>
<div class="odd_box"><input name="NoGoal" type="text" class="odds_style" id="NoGoal"  placeholder="No Goal"/></div>

</div>

<div class="category">
<div class="sport_box">Club Name</div>
<div class="club"><input name="hometeam" type="text" class="club_style" id="hometeam"  placeholder="Home Club"/></div>
<div class="club"><input name="awayteam" type="text" class="club_style" id="awayteam"  placeholder="Away Club"/></div>


</div>

<div class="category">
<div class="submit"><input name="submit" type="submit" value="Load upcoming Matches" id="submit" /></div>

</div>


</div>
</form>
</div>
</body>
</html>