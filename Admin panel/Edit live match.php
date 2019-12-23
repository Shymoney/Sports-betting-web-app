<?php
	require('Admin connect.php');
	
	$obj=new Connect;
	$obj->__constructor();
	
	if(isset($_GET['match_id']))
	{
		$a=$_GET['match_id'];
	
	
	$result= mysql_query("select * from livematches where match_id='$a'") or die(''.mysql_error());
	
	while($row= mysql_fetch_array($result,MYSQL_ASSOC))
		{
			$id = $row['match_id'];
			$score = $row['score'];
			$score_2 = $row['score1'];
			$time = $row['time'];
			$home_team= $row['hometeam'];
			$away_team= $row['awayteam'];
		
		}

}		
		
	if(isset($_POST['submit']))
	{
		$sc = $_POST['score'];
		$sc_2 = $_POST['score1'];
		$ti = $_POST['time'];
	
$update = mysql_query("update livematches set score='$sc',score1='$sc_2',time='$ti' where match_id='$a' ",$obj->__constructor()); 

		if($update){echo '<script type="text/javascript">
							var msg="update successfully";
							alert(msg);
							</script>';}
	
	
	}
		

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Edit Live match</title>
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
<div class="cont_box"><a href="#">View Registered Users</a></div>
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
  <select name="leaguename" size="1" class="stylelayout" id="leaguename">
  <?php 
$league= array('Premier League','Laliga BBVA','Bundesliga','Seria A','Ligue 1','Eredivise','Championship league','FA cup','Capital One cup','Community Shield','UEFA Champions League','UEFA Super Cup','FIFA Club World Cup','Europa League','Major League Soccer');
foreach($league as $lg){echo $lg;
?>
    <option value="<?php echo $lg?>"><?php echo $lg ?></option>
    <?php ;}?>
  </select>
</div>
<div class="sport_box">Country</div>
<div class="sport_box"><select name="country" size="1" class="stylelayout" id="country">
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
<div class="odd_box"><input name="home" type="text" class="odds_style" id="home"  placeholder="Home"/></div>
<div class="odd_box"><input name="draw" type="text" class="odds_style" id="draw"  placeholder="Away"/></div>
<div class="odd_box"><input name="away" type="text" class="odds_style" id="away"  placeholder="Draw"/></div>
<div class="odd_box"><input name="over" type="text" class="odds_style" id="over"  placeholder="Over1.5"/></div>
<div class="odd_box"><input name="under" type="text" class="odds_style" id="under"  placeholder="Under1.5"/></div>

</div>

<div class="category">
<div class="sport_box">Score</div>
<div class="sport_box"><input name="score" type="text" class="odds_style" id="score" value="<?php  echo $score?>" /></div>
<div class="sport_box"><input name="score1" type="text" class="odds_style" id="score1" value="<?php echo $score_2?>" /></div>
</div>
<div class="category">
<div class="sport_box">Time</div>
<div class="odd_box">
<select name="time" size="1" id="time">
<?php for($digit = 0; $digit<=90; $digit ++) {?>
<option value="<?php echo $digit?>"><?php echo $digit ?></option>
<?php }?>

</select>
</div>
</div>
<div class="category">
<div class="sport_box">Club Name</div>
<div class="club"><input name="hometeam" type="text" class="club_style" id="hometeam"  placeholder="Home Club" value="<?php echo $home_team ?>"/></div>
<div class="club"><input name="awayteam" type="text" class="club_style" id="awayteam"  placeholder="Away Club" value="<?php echo $away_team ?>"/></div>


</div>

<div class="category">
<div class="submit"><input name="submit" type="submit" value="update Live Match" id="submit" /></div>

</div>


</div>
</form>
</div>
</body>
</html>