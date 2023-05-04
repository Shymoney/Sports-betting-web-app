<?php
    session_start();
    ob_start();

     require_once "Admin connect.php";

    /*
    * check if the session is set and not empty
    * assign the session to a variable
    */
    if(isset($_SESSION['Username']) && !empty ($_SESSION['Username'])) {
        $user_session = $_SESSION['Username'];
            // var_dump($user_session); exit();
    }else {
        //redirect the user
        header("Location:Admin login.php");
    }
?>
<?php
	//create an instance of the class
	$call_db = DatabaseConnect::getInstance();

	if(isset($_POST['submit'])) {
			
		$category = $call_db->secureTxt($_POST['category']); 
		$league = $call_db->secureTxt( $_POST['leaguename']);
		$country = $call_db->secureTxt( $_POST['country']);
		$home = $call_db->secureTxt( $_POST['home']);
		$draw = $call_db->secureTxt($_POST['draw']);
		$away = $call_db->secureTxt($_POST['away']);
		$over = $call_db->secureTxt($_POST['over']);
		$under = $call_db->secureTxt($_POST['under']);
		$score = $call_db->secureTxt($_POST['score']);
		$score_1 = $call_db->secureTxt($_POST['score1']);
		$time = $call_db->secureTxt($_POST['time']);
		$club_home = $call_db->secureTxt($_POST['hometeam']);
		$club_away = $call_db->secureTxt($_POST['awayteam']);
		
		//generate a unique id
		$match_id= rand(1000,9999);
		
		//prepare the select query
		$valid= $call_db->connect->prepare("SELECT * FROM livematches WHERE match_id = '$match_id'");
		//bind parameters
		$valid->bindParam(':match_id', $match_id);
		//execute query
		$valid->execute();

		//$valid->rowCount();					
		//$num= mysql_num_rows($valid);
		
		if($valid->rowCount() > 0) {
			$match_id= -1;

		}elseif($valid->rowCount() == 0) {
		//prepare the insert query 
		$query = $call_db->connect-> prepare("INSERT INTO livematches(match_id,Category,leaguename,country,home,draw,away,over,under,score,score1,time,hometeam,awayteam)
		VALUES('$match_id','$category','$league','$country','$home','$draw','$away','$over','$under','$score','$score_1','$time','$club_home','$club_away')");	
		
		//bind parameters
		$query->bindParam(':match_id', $match_id, PDO::PARAM_INT);
		$query->bindParam(':category', $category, PDO::PARAM_STR);
		$query->bindParam(':leaguename', $league, PDO::PARAM_STR);
		$query->bindParam(':country', $country, PDO::PARAM_STR);
		$query->bindParam(':home', $home, PDO::PARAM_STR);
		$query->bindParam(':draw', $draw, PDO::PARAM_STR);
		$query->bindParam(':away', $away, PDO::PARAM_STR);
		$query->bindParam(':over', $over, PDO::PARAM_STR);
		$query->bindParam(':under', $under, PDO::PARAM_STR);
		$query->bindParam(':score', $score, PDO::PARAM_STR);
		$query->bindParam(':score1', $score_1, PDO::PARAM_STR);
		$query->bindParam(':time', $time, PDO::PARAM_STR);
		$query->bindParam(':hometeam', $club_home, PDO::PARAM_STR);
		$query->bindParam(':awayteam', $club_home, PDO::PARAM_STR);

		$result = $query->execute();
					
				if($result ){
					echo '<script type="text/javascript">
									var msg = "successfully inserted";
									alert(msg);
									</script>';
				}
			}
		
		
		
		
	}


	// if(isset($_GET['match_id'])) {
	// 	$id= $_GET['match_id'];
		
	// 	$sql= $call_db->connect-> prepare("SELECT * FROM livematches ORDER BY id DESC ");
	// 	$sql->execute();

	// 		//$num=mysql_num_rows($sql);
	// 		$sql->rowCount();
	// 		while($row = $sql->fetch(PDO::FETCH_ASSOC))
	// 			{
	// 				$mtch_id[]= $row['match_id'];
	// 				$scor[]= $row['score'];
	// 				$scor_2[]= $row['score1'];
	// 				$tyme[]= $row['time'];
	// 			}

	// }
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