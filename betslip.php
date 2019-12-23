<?php
	require('connect.php');
	
	
if(isset($_COOKIE['user']))  $logid= $_COOKIE['user']; else{header('Location:Userprofile.php');}
 


 $query2= mysqli_query($obj->connect,"SELECT * from registration
 						WHERE Username='$logid'")or die('could not select'.mysqli_error($obj->connect));
 while($row= mysqli_fetch_array($query2,MYSQL_ASSOC))
 	{
	 
	 $uid= $row['User_id'];
	 $user= $row['Sname'];
	 $name= $row['Name'];

 
	
}

	
 	
if(isset($_GET['match_id'])) /*&& isset( $_GET['home'])&& isset( $_GET['draw'])&& isset($_GET['away']) && isset( $_GET['over'])&& isset( $_GET['under']) && isset( $_GET['hometeam']) && isset($_GET['awayteam']))*/
{	
	$reg_id= $_GET['match_id'];
	/*
	$home= $_GET['home'];
	$draw= $_GET['draw'];
	$away= $_GET['away'];
	$over= $_GET['over'];
	$under= $_GET['under'];
	$h_team= $_GET['hometeam'];
	$a_team= $_GET['awayteam'];
	*/
	
	
	$result= mysqli_query($obj->connect,"SELECT * from livematches WHERE match_id='$reg_id'") or die ('could not select'.mysqli_error($obj->connect));
	while($row = mysqli_fetch_array($result,MYSQL_ASSOC))
	{
		$id= $row['match_id'];
		$home_team= $row['hometeam'];
		$away_team= $row['awayteam'];
		$hm= $row['home'];
		$drw= $row['draw'];
		$aw= $row['away'];
		$ovr= $row['over'];
		$undr= $row['under'];
		
				
		
	 }
	 
	 
	 
	 $hm=$home_team;
	 $aw= $away_team;
	 





	if(isset($_POST['Submit']))
{

	$stk=$_POST['Amountstake'];	
	

$sql=mysqli_query($obj->connect,"insert into betslip values('$uid','$stk','','')",$con) or die ('could not insert'.mysqli_error($obj->connect));
		
/* here we have select from payment table*/
$query=mysqli_query($obj->connect,"select * from payment ",$connect) or die ('could not select'.mysqli_error($obj->connect));
//
while($rw = mysqli_fetch_array($query,MYSQL_ASSOC))
	{
		$p_id = $rw['P_id'];
		$bal = $rw['Balance'];
	}

/* now we have carry out our calculation*/
 
 $calculate = $bal - $stk; 

		
	}	 




}	
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Bet slip</title>
<link href="css/betslip.css" rel="stylesheet" type="text/css" />
<style type="text/css">
body {
	margin-top: 0px;
	margin-left: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
}
</style>
</head>

<body>
<script type="text/javascript" language="javascript">





</script>
<div class="wrapper">
  <div class="banner_box">
<div class="logo_box"><img src="images/alabi logo.png" width="260" height="63" /></div> 
	
    <div class="navbar">
    	<div class="button"><a href="#" title="Sport">SPORT</a></div>
        <div class="button"><a href="#" title="Live">LIVE</a></div>
        <div class="button"><a href="#" title="Casino">CASINO</a></div>
        <div class="button"><a href="#" title="Bet Odds">BET ODDS</a></div>
        <div class="button"><a href="#" title="Mobile">MOBILE</a></div>
    </div>
   	<div class="sign_in">
    
    <div class="user_box"><?php echo $uid; ?></div>
    <div class="user_box"><?php echo $user; ?></div>
    <div class="user_box"><?php echo $name; ?></div>
    <div class="money_box">
    <div class="user_box">
    <form action="" method="post" enctype="multipart/form-data">
    <div class="refresh_box"><input type="image" src="images/Refresh_ico.png" align="right" /></div>
    </form>
    </div>
    <div class="user_box">Availability:</div>
    <div class="user_box"><?php if(isset($calculate)) echo $calculate;?>.00NGN</div>
    </div>
    <div class="money_box2">
    <div class="user_box">Balance</div>
    <div class="user_box"><?php if(isset($bal)){echo $bal;}?>.00NGN</div>
    </div>
   	</div>


<nav style="top: 101px">
	<ul>
    	<li><a href="index.php" title="Home">Home</a></li>
        <li><a href="#" title="Live Scores">Live Scores</a></li>
        <li><a href="How to Deposit.php" title="How to Deposit/Withdrawal">How to Deposit/Withdrawal</a></li>
        <li><a href="#" title="Results">Results</a></li>
        <li><a href="#" title="Statistics">Statistics</a></li>
        <li><a href="#" title="User guide">User guide</a></li>
        <li><a href="#" title="Live Centre">Live Centre</a></li>
        <li><a href="Contact us.php" title="Contact Us">Contact Us</a></li>
      <li><a href="FAQ.php" title="FAQs">FAQs</a></li>
    </ul>
</nav>
</div>
<div class="social_box"><img src="images/images.png" width="30" height="30" /></div>
<div class="small">Like</div>
<div class="small_1">Share</div>

<div class="container">
<div class="left_side">
<div class="holder">
	<div class="srch"><form action="" method="post" enctype="multipart/form-data"><input name="search" type="text" class="srch" id="search" placeholder="Search by Name"  title="Search"/> </form></div>
    <a href="#"title="LiveBetting">
    <div class="live_betting"> LiveBetting</div>
    </a>
    
    <a href="#" title="Soccer">
    <div class="colapse">
    	<div class="sport_img"><img src="images/football.png" width="25" height="20" /></div>
        <div class="sport_text">Soccer</div>
    </div>
    </a>
    <a href="#" title="Basketbal">
    <div class="colapse">
    	<div class="sport_img"><img src="images/basketball.png" width="25" height="20" /></div>
        <div class="sport_text">Basketball</div>
    </div>
    </a>
    <a href="#" title="American Football">
    <div class="colapse">
    	<div class="sport_img"><img src="images/ameriacan fotbal.png" width="30" height="20" /></div>
        <div class="sport_text">American Football</div>
    </div>
    </a>
    <a href="#" title="Rugby">
    <div class="colapse">
    	<div class="sport_img"><img src="images/rugby.png" width="30" height="20" /></div>
        <div class="sport_text">Rugby</div>
    </div>
    </a>
    
    <a href="#" title="Tennis">
    <div class="colapse">
    	<div class="sport_img"><img src="images/tennis.png" width="25" height="20" /></div>
        <div class="sport_text">Tennis</div>
    </div>
    </a>
    <a href="#" title="Boxing">
    <div class="colapse">
    	<div class="sport_img"><img src="images/dart.png" width="25" height="20" /></div>
        <div class="sport_text">Boxing</div>
    </div>
    </a>
    <a href="#" title="Snooker">
    <div class="colapse">
    	<div class="sport_img"><img src="images/snooker.png" width="25" height="20" /></div>
        <div class="sport_text">Snooker</div>
    </div>
    </a>
    <a href="#" title="Handball">
    <div class="colapse">
    	<div class="sport_img"><img src="images/handball.png" width="25" height="20" /></div>
        <div class="sport_text">Handball</div>
    </div>
    </a>
    <a href="#" title="BeachSoccer">
    <div class="colapse">
    	<div class="sport_img"><img src="images/beach.png" width="25" height="20" /></div>
        <div class="sport_text">BeachSoccer</div>
    </div>
    </a>
    
    <a href="#" title="Volleybal">
    <div class="colapse">
    	<div class="sport_img"><img src="images/volley.png" width="25" height="20" /></div>
        <div class="sport_text">Volleyball</div>
    </div>
    </a>
    <a href="#" title="Cricket">
    <div class="colapse">
    	<div class="sport_img"><img src="images/cricket.png" width="25" height="20" /></div>
        <div class="sport_text">Cricket</div>
    </div>
    </a>
    <a href="#" title="Ice Hockey">
    <div class="colapse">
    	<div class="sport_img"><img src="images/hockey.png" width="30" height="25" /></div>
        <div class="sport_text">Ice Hockey</div>
    </div>
    </a>
    <a href="#" title="Horse Racing">
    <div class="colapse">
    	<div class="sport_img"><img src="images/horse racing.png" width="30" height="27" /></div>
        <div class="sport_text">Horse Racing</div>
    </div>
    </a>
    <a href="#" title="Cycling">
    <div class="colapse">
    	<div class="sport_img"><img src="images/cycling.png" width="30" height="25" /></div>
        <div class="sport_text">Cycling</div>
    </div>
    </a>
    <a href="#" title="Golf">
    <div class="colapse">
    	<div class="sport_img"><img src="images/golf.png" width="25" height="20" /></div>
        <div class="sport_text">Golf</div>
    </div>
    </a>
    
     <a href="#" title="Darts">
    <div class="colapse">
    	<div class="sport_img"></div>
        <div class="sport_text">Darts</div>
    </div>
    </a>
    
     <a href="#" title="Darts">
    <div class="colapse">
    	<div class="sport_img"></div>
        <div class="sport_text">Darts</div>
    </div>
    </a></div>
</div>
<div class="middle">

<div class="inner_left">
<div class="club_name"><?php echo $home_team.'  -  '.$away_team?></div>
<div class="odds_type"><?php ?></div>
<div class="the_stake_odds">
<?php if($hm==$home_team) {echo $home_team;}
		elseif($aw==$away_team) {echo $away_team;}
		else{echo $draw;}
?>


</div>
<div class="odds_for_the_bet"><?php  ?></div>
</div>

<div class="odds_calculation">
<form action="#" method="post" enctype="multipart/form-data">
<div class="stake">Stake:</div>
<div class="txt_box">
  <label for="Amountstake"></label>
  <input name="Amountstake" type="text" class="txt_box" id="Amountstake" />
</div>
<div class="stake">Odds</div>
<div class="stake">
<?php if(isset($home)) {echo $home;} ?>
<?php if(isset($draw)) {echo $draw;}?>
<?php if(isset($away)) {echo $away;}?>
<?php if(isset($over)) {echo $over;}?>
<?php if(isset($under)) {echo $under;}?>
</div>
<div class="win">
<div class="bonus">Bonus:<?php ?></div>
<div class="wining">Winning:<?php  ?></div>
<div class="total">Total winning:<?php ?></div>
<div class="but_box"><input name="Submit" type="submit" class="but_box" value="Calculate"  onclick=""/></div>
<div class="but_box"><input name="Submit" type="submit" class="but_box" value="Submit" onclick="" /></div>

</div>
</form>
</div>
</div>
<div class="right_side">
<a href="Registration.php">
<div class="register_now">Register Now! Now!! </div>
</a>
</div>
</div>

<div class="footer">
	<ul>
    	<h4><span><a href="#">ALABI BET</a></span>
      </h4>
    	<li><a href="index.php" title="Home">Home</a></li>
        <li><a href="Contact us.php" title="Contact Us">Contact Us</a></li>
        <li><a href="#" title="Userguide">Userguide</a></li>
        <li><a href="about us.php" title="About Us">About Us</a></li>
        <li><a href="#" title="Livescores">Livescore</a></li>
        <li><a href="#" title="Franchise">Franchise</a></li>
        <li><a href="#" title="Web Affiliates">Web Affiliates</a></li>
        <li><a href="How to Deposit.php" title="Payment Method">Payment Method</a></li>
    </ul>
    
    <ul>
    	<h4><span><a href="#">TERMS AND CONDITIONS</a></span>
      </h4>
    	<li><a href="Rules.php" title="Rules">Rules</a></li>
        <li><a href="Responsiblegaming.php" title="Responsible Gaming">Responsible Gaming</a></li>
        <li><a href="Anti-laundering.php" title="Anti-laundering">Anti-laundering</a></li>
        <li><a href="Generalterms&cond.php" title="General T&C">General T&C</a></li>
        <li><a href="Privacy.php" title="Privacy">Privacy</a></li>
        <li><a href="#" title="Work With Us">Work With Us</a></li>
        
    </ul>
    <div class="reserved">
      <p>&copy;Copy Right.2015&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;All Rights Reserved &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Alabi Bet is regulated by Enugu State lotteries Board with the Company Name:AUG group Limited</p>
    </div>
</div>

</div>
</body>
</html>