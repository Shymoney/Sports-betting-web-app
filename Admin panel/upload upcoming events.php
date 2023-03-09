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

    }else {
        //redirect the user
        header("Location:Admin login.php");
    }
?>
<?php
	
	//create an instance of the object
	$call_db = DatabaseConnect::getInstance();
	
if(isset($_POST['submit']))
{
	//prevent sql injection
	$time = $call_db->secureTxt($_POST['time']);
	$day= $call_db->secureTxt($_POST["day"]);						// day
	$month= $call_db->secureTxt($_POST['month']);					//month
	$year= $call_db->secureTxt($_POST['year']);						//year
	$date= $year.' '.$month.' '.$day;								//concatenate
	$home_win = $call_db->secureTxt($_POST['homewin']);
	$draw = $call_db->secureTxt($_POST['draw']);
	$away_win = $call_db->secureTxt($_POST['awaywin']);
	$home_draw = $call_db->secureTxt($_POST['homedraw']);
	$double = $call_db->secureTxt($_POST['doublechance']);
	$away_draw = $call_db->secureTxt($_POST['awaydraw']);
	$over = $call_db->secureTxt($_POST['over']);
	$under = $call_db->secureTxt($_POST['under']);
	$GG = $call_db->secureTxt($_POST['GoalGoal']);
	$NG = $call_db->secureTxt($_POST['NoGoal']);
	$club_home = $call_db->secureTxt($_POST['hometeam']);
	$club_away = $call_db->secureTxt($_POST['awayteam']);
	
	$match_id= rand(100,999);
	$query = $call_db->connect->prepare("SELECT * FROM upcomingevents WHERE match_id = '$match_id'");
	
	//bindparameters with form placeholders
	$query->bindParam(':match_id', $match_id, PDO::PARAM_INT);
	//execute the query
	$result = $query->execute();

	
	if($query->rowCount() > 0)
	{
		$match_id= -2;
	}
	elseif($query->rowCount() ==0)
		{
		
	$query = $call_db->connect->prepare("INSERT INTO upcomingevents()
				values('$match_id','$time','$date','$home_win','$draw','$away_win','$home_draw','$double','$away_draw','$over','$under','$GG',
				'$NG','$club_home','$club_away')");
				
	

	//bindparameters
	$query->bindParam('match_id', $match_id, PDO::PARAM_STR);
	$query->bindParam(':time', $time, PDO::PARAM_STR);
	$query->bindParam(':date', $date, PDO::PARAM_STR);
	$query->bindParam(':homewin', $home_win, PDO::PARAM_STR);
	$query->bindParam(':draw', $draw, PDO::PARAM_STR);
	$query->bindParam('awaywin', $away_win, PDO::PARAM_STR);
	$query->bindParam(':homedraw', $home_draw, PDO::PARAM_STR);
	$query->bindParam(':doublechance', $double, PDO::PARAM_STR);
	$query->bindParam(':awaydraw', $away_draw, PDO::PARAM_STR);
	$query->bindParam(':over', $over, PDO::PARAM_STR);
	$query->bindParam(':under', $under, PDO::PARAM_STR);
	$query->bindParam(':GoalGoal', $GG, PDO::PARAM_STR);
	$query->bindParam(':NoGoal', $NG, PDO::PARAM_STR);
	$query->bindParam(':hometeam', $club_home, PDO::PARAM_STR);
	$query->bindParam(':awayteam', $club_away, PDO::PARAM_STR);
	
	$result  = $query->execute();
		
			
			if($result == true) {
				echo '<script type="text/javascript">
								var msg = "successfully inserted upcomig matches";
								alert(msg);
								</script>';
			}
		}//elseif
	
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