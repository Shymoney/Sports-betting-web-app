<?php
	require('Admin connect.php');
	
	
	function Loadfile() {
		
	if(isset($_POST['submit'])){
		
		
		
		$file = $_FILES['file']['name'];
		//die($file);
		$upload = 'upload/'.$file;
		 move_uploaded_file($_FILES['file']['tmp_name'],$upload);
		$handle = fopen($upload,"r");
		
		//$c = 0;
		
		$filesop = fgetcsv($handle);
		while(!feof($handle))
		{
			$line[]=$filesop;	
		}
		fclose($handle);
		print_r($line);
		/*if($filesop!==false)
		{
			
		}*/
			//$num = count($filesop);
			//for($c; $c < $num; $c++) {
			//$col[$c] = $filesop[$c];		
		//}
			
		/*$match_id = $filesop['match_id'];
		$category = $filesop['category'];
		$leag_name = $filesop['leaguename'];
		$contry = $filesop['country'];
		$home = $filesop['home'];
		$draw = $filesop['draw'];
		$away = $filesop['away'];
		$over = $filesop['over'];
		$under = $filesop['under'];
		$score = $filesop['score'];
		$score1 = $filesop['score1'];
		$time = $filesop['time'];
		$home_team = $filesop['hometeam'];
		$away_team = $filesop['awayteam'];	
		
		$match_id= rand(1000,9999);
		
	$sql = "INSERT INTO livematches(match_id,category,leaguename,country,home,draw,away,over,under,score,score1,time,hometeam,awayteam)
	VALUES('$match_id','$category','$leag_name','$contry','$home','$draw','$away','$over','$under','$score','$score1','$time','$home_team','$away_team')";
			
	*/
	//}
		
		/*if($sql) {
			
		echo "Your data successfully imported";
			
		}else{echo "Sorry! there's some problem.";}*/
	
	}

		
}
	
	
	//return;
	Loadfile();
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/*
	
if(isset($_COOKIE['user'])) $cook = $_COOKIE['user']; else{header('location:Admin login.php');}

	if(isset($_POST['submit']))
	{
		
	$category = $_POST['category'];
	$league = $_POST['leaguename'];
	$country = $_POST['country'];
	$home = $_POST['home'];
	$draw = $_POST['draw'];
	$away = $_POST['away'];
	$over = $_POST['over'];
	$under = $_POST['under'];
	$score = $_POST['score'];
	$score_1 = $_POST['score1'];
	$time = $_POST['time'];
	$club_home = $_POST['hometeam'];
	$club_away = $_POST['awayteam'];
	
	$match_id= rand(1000,9999);
	$valid= mysql_query("SELECT * FROM livematches 
						WHERE match_id = '$match_id'",$connect) 
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
mysql_query($insert,$connect) or die('could not select'.mysql_error());



		
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
*/




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
<form name="import" action="#" method="post" enctype="multipart/form-data">
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
<div class="sport_box"><input name="score" type="text" class="odds_style" id="score" /></div>
<div class="sport_box"><input name="score1" type="text" class="odds_style" id="score1" /></div>
</div>
<div class="category">
<div class="sport_box">Time</div>
<div class="odd_box"><input name="time" type="text" class="odds_style" id="time"  placeholder="match time"/></div>
</div>
<div class="category">
<div class="sport_box">Club Name</div>
<div class="club"><input name="hometeam" type="text" class="club_style" id="hometeam"  placeholder="Home Club"/></div>
<div class="club"><input name="awayteam" type="text" class="club_style" id="awayteam"  placeholder="Away Club"/></div>

<div class="club"><input name="file" type="file" class="club_style" /></div>
</div>

<div class="category">
<div class="submit"><input name="submit" type="submit" value="Load Live Match" id="submit"/></div>

</div>


</div>
</form>
</div>
</body>
</html>