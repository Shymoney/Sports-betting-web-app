<?php

	require('Admin connect.php');
	
$obj = new Connect;
$obj->__constructor();
	
if(isset($_COOKIE['user'])) $cook = $_COOKIE['user']; else{header('location:Admin login.php');}

	if(isset($_POST['submit']))
	{
		
	$category = $_POST['category'];
	$league = $_POST['leaguename'];
	$country = $_POST['country'];
	$home = mysql_real_escape_string( $_POST['home']);
	$draw = mysql_real_escape_string($_POST['draw']);
	$away = mysql_real_escape_string($_POST['away']);
	$over = mysql_real_escape_string($_POST['over']);
	$under = mysql_real_escape_string($_POST['under']);
	$score = mysql_real_escape_string($_POST['score']);
	$score_1 = mysql_real_escape_string($_POST['score1']);
	$time = mysql_real_escape_string($_POST['time']);
	$club_home = mysql_real_escape_string($_POST['hometeam']);
	$club_away = mysql_real_escape_string($_POST['awayteam']);
	
	$match_id= rand(1000,9999);
	$valid= mysql_query("SELECT * FROM livematches 
						WHERE match_id = '$match_id'") 
						or die('could not select'.mysql_error());
						
	$num= mysql_num_rows($valid);
	
	if($num >0)
	{
	$match_id= -1;
	}
	elseif($num==0)
		{
//this is the normal insert query that sends the info to the database 
$insert= "INSERT INTO livematches 
values('$match_id','$category','$league','$country','$home','$draw','$away','$over','$under','$score','$score_1','$time','$club_home','$club_away')";	
mysql_query($insert) or die('could not select'.mysql_error());



		
	if($insert){echo '<script type="text/javascript">
						var msg = "successfully inserted";
						alert(msg);
						</script>';}
		}
	
	
	
	
	}
if(isset($_GET['match_id']))
	{
	$id= $_GET['match_id'];
	
$sql= mysql_query("select * from livematches order by id desc ",$connect) or die('could not select'.mysql_error);
		$num=mysql_num_rows($sql);
		while($row=mysql_fetch_array($sql,MYSQL_ASSOC))
			{
				$mtch_id[]= $row['match_id'];
				$scor[]= $row['score'];
				$scor_2[]= $row['score1'];
				$tyme[]= $row['time'];
			}

}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Upload live match</title>
<link href="css/adminupload.css" rel="stylesheet" type="text/css" />
<style type="text/css">
a:link {
	text-decoration: none;
	color: #000;
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
<div class="cont_box"><a href="view live match.php">View live matches</a></div>
<div class="cont_box"><a href="#">Select Sports Category</a></div>
<div class="cont_box"><a href="#">Select Sports Category</a></div>

</div>

<div class="right">
<div class="category">
<div class="sport_box">Sports Category</div>
<div class="long"><select name="category" size="1" class="long_style" id="category">
<?php $sport= array(
'Soccer',
'basketball',
'Tennis',
'Boxing',
'Snooker',
'Cricket',
'Hockey',
'Handball',
'Rugby',
'Horseracing',
'Cycling',
'Golf',
'Beach soccer',
'Ameriacan football',
'Darts');

foreach($sport as $sp){echo $sp;
?>
    <option  value="<?php echo $sp?>"selected="selected"><?php echo $sp ?></option>
  <?php ;}?>
</select></div>
</div>

<div class="category">
<div class="sport_box">League Name</div>
<div class="sport_box">
  <label for="leaguename"></label>
  <select name="leaguename" class="stylelayout" id="leaguename">
  <option>-Please Select-</option>
  <?php 
$league= array('Premier League','Laliga BBVA','Bundesliga','Seria A','Ligue 1','Eredivise','Championship league','FA cup','Capital One cup','Community Shield','UEFA Champions League','UEFA Super Cup','FIFA Club World Cup','UEFA Europa League','Major League Soccer');
foreach($league as $lg){echo $lg;
?>
	
    <option  value="<?php echo $lg?>"><?php echo $lg ?></option>
    <?php ;}?>
  </select>
</div>
<div class="sport_box">Country</div>
<div class="sport_box"><select name="country" class="stylelayout" id="country" >
<option>-Please Select-</option>
<?php 
$country= array('England','France','Spain','Holland','Italy','Germany','Turkey','Ukraine','Greece','Belgium','Portugal','Russia');
foreach($country as $count){echo $count;
?>
  <option value="<?php echo $count?>"><?php echo $count?></option>
 <?php ;}?>
</select></div>
</div>
<div class="category">
<div class="sport_box">Odds</div>
<div class="odd_box"><input name="home" type="text" class="odds_style" id="home"  placeholder="Home" required="home"/></div>
<div class="odd_box"><input name="draw" type="text" class="odds_style" id="draw"  placeholder="Away" required="draw"/></div>
<div class="odd_box"><input name="away" type="text" class="odds_style" id="away"  placeholder="Draw" required="away"/></div>
<div class="odd_box"><input name="over" type="text" class="odds_style" id="over"  placeholder="Over1.5" required="over"/></div>
<div class="odd_box"><input name="under" type="text" class="odds_style" id="under"  placeholder="Under1.5" required="under"/></div>

</div>

<div class="category">
<div class="sport_box">Score</div>
<div class="sport_box"><input name="score" type="text" class="odds_style" id="score"  required="score"/></div>
<div class="sport_box"><input name="score1" type="text" class="odds_style" id="score1" required="score1" /></div>
</div>
<div class="category">
<div class="sport_box">Time</div>
<div class="odd_box"><input name="time" type="text" class="odds_style" id="time"  placeholder="match time" required="time"/></div>
</div>
<div class="category">
<div class="sport_box">Club Name</div>
<div class="club"><input name="hometeam" type="text" class="club_style" id="hometeam"  placeholder="Home Club" required="hometeam"/></div>
<div class="club"><input name="awayteam" type="text" class="club_style" id="awayteam"  placeholder="Away Club" required="awayteam"/></div>


</div>

<div class="category">
<div class="submit"><input name="submit" type="submit" value="Load Live Match" id="submit" /></div>

</div>


</div>
</form>
</div>
</body>
</html>